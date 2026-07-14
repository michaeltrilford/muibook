import {
  ColorType,
  CrosshairMode,
  LineSeries,
  LineStyle,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type LineData,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import "../mui-body";

export type MuiComparisonChartMode = "absolute" | "indexed" | "percent";
export type MuiComparisonChartValueFormat = "decimal" | "percent" | "currency";
export type MuiComparisonChartScale = "both" | "time" | "price" | "none";

export interface MuiComparisonChartDatum {
  time: number | string;
  value: number;
}

export interface MuiComparisonChartSeries {
  id: string;
  label: string;
  color?: string;
  data: MuiComparisonChartDatum[];
}

class MuiComparisonChart extends HTMLElement {
  static get observedAttributes() {
    return ["mode", "label", "value-format", "currency", "height", "scale", "interactive", "attribution", "loading", "error"];
  }

  private chart: IChartApi | null = null;
  private chartSeries = new Map<string, ISeriesApi<"Line">>();
  private chartContainer: HTMLElement | null = null;
  private themeObserver: MutationObserver | null = null;
  private attributionObserver: MutationObserver | null = null;
  private chartFrame = 0;
  private comparisonSeries: MuiComparisonChartSeries[] = [];

  get series() {
    return this.comparisonSeries;
  }

  set series(value: MuiComparisonChartSeries[]) {
    this.comparisonSeries = Array.isArray(value)
      ? value.map((series) => ({
          ...series,
          data: Array.isArray(series.data)
            ? [...series.data].sort((a, b) => this.timeValue(a.time) - this.timeValue(b.time))
            : [],
        }))
      : [];
    this.rebuildSeries();
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
    this.chartFrame = requestAnimationFrame(() => {
      this.chartFrame = 0;
      this.createComparisonChart();
    });
    this.observeTheme();
  }

  disconnectedCallback() {
    if (this.chartFrame) cancelAnimationFrame(this.chartFrame);
    this.chartFrame = 0;
    this.themeObserver?.disconnect();
    this.themeObserver = null;
    this.attributionObserver?.disconnect();
    this.attributionObserver = null;
    this.chart?.remove();
    this.chart = null;
    this.chartSeries.clear();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue || !this.isConnected) return;

    if (name === "height") {
      this.style.setProperty("--comparison-chart-height-current", newValue || "24rem");
      return;
    }

    if (["mode", "value-format", "currency"].includes(name)) this.rebuildSeries();
    if (["scale", "interactive", "attribution"].includes(name)) this.chart?.applyOptions(this.chartOptions());
    if (["label", "loading", "error"].includes(name)) this.renderState();
  }

  update(seriesId: string, datum: MuiComparisonChartDatum) {
    const series = this.comparisonSeries.find((item) => item.id === seriesId);
    if (!series) return;
    const existingIndex = series.data.findIndex((item) => this.timeValue(item.time) === this.timeValue(datum.time));
    if (existingIndex >= 0) series.data[existingIndex] = datum;
    else series.data.push(datum);
    series.data.sort((a, b) => this.timeValue(a.time) - this.timeValue(b.time));
    this.applyData(false);
  }

  fitContent() {
    this.chart?.timeScale().fitContent();
  }

  private get mode(): MuiComparisonChartMode {
    const mode = this.getAttribute("mode");
    return mode === "absolute" || mode === "percent" ? mode : "indexed";
  }

  private get scale(): MuiComparisonChartScale {
    const scale = this.getAttribute("scale");
    return scale === "time" || scale === "price" || scale === "none" ? scale : "both";
  }

  private render() {
    if (!this.shadowRoot) return;
    this.style.setProperty("--comparison-chart-height-current", this.getAttribute("height") || "24rem");
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          min-width: 0;
        }

        * {
          box-sizing: border-box;
        }

        .shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          width: 100%;
          min-width: 0;
        }

        .plot {
          position: relative;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          height: var(--comparison-chart-height-current);
          overflow: hidden;
        }

        .chart {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .state {
          position: absolute;
          z-index: 2;
          inset: 0;
          display: grid;
          place-items: center;
          padding: var(--space-200);
          background: var(--comparison-chart-background);
          text-align: center;
        }

        .state[hidden] {
          display: none;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      </style>
      <section class="shell">
        <slot name="header" part="header"></slot>
        <slot name="legend" part="legend"></slot>
        <div class="plot" part="plot">
          <div class="chart" role="img"></div>
          <mui-body class="state loading" size="x-small" variant="secondary" role="status" hidden>Loading comparison data</mui-body>
          <mui-body class="state empty" size="x-small" variant="secondary" role="status" hidden>No comparison data available</mui-body>
          <mui-body class="state error" size="x-small" variant="attention" role="alert" hidden></mui-body>
        </div>
        <slot name="footer" part="footer"></slot>
        <p class="sr-only" aria-live="polite"></p>
      </section>
    `;
    this.chartContainer = this.shadowRoot.querySelector(".chart");
    this.renderState();
  }

  private createComparisonChart() {
    if (!this.chartContainer) return;
    this.attributionObserver = new MutationObserver(() => this.suppressAttributionFocus());
    this.attributionObserver.observe(this.chartContainer, { childList: true, subtree: true });
    this.chart = createChart(this.chartContainer, this.chartOptions());
    this.suppressAttributionFocus();
    this.rebuildSeries();
    this.chart.subscribeCrosshairMove((event) => {
      if (!this.hasAttribute("interactive") || event.time === undefined) return;
      const eventTime = this.timeValue(event.time);
      const values = this.comparisonSeries
        .map((series) => {
          const datum = series.data.find((item) => this.timeValue(item.time) === eventTime);
          return datum ? { id: series.id, label: series.label, value: datum.value } : null;
        })
        .filter(Boolean);
      this.dispatchEvent(new CustomEvent("comparison-chart-crosshair-change", { detail: { time: event.time, values }, bubbles: true }));
    });
  }

  private rebuildSeries() {
    if (!this.chart) {
      this.renderState();
      return;
    }
    this.chartSeries.forEach((series) => this.chart?.removeSeries(series));
    this.chartSeries.clear();
    const palette = this.palette();

    this.comparisonSeries.forEach((item, index) => {
      const series = this.chart!.addSeries(LineSeries, {
        color: item.color ? this.resolveInputColor(item.color) : palette[index % palette.length],
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
        title: item.label,
      });
      this.chartSeries.set(item.id, series);
    });

    const firstSeries = this.chartSeries.values().next().value as ISeriesApi<"Line"> | undefined;
    if (firstSeries && this.mode !== "absolute") {
      firstSeries.createPriceLine({
        price: this.mode === "indexed" ? 100 : 0,
        color: this.colors().reference,
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: false,
        title: "",
      });
    }
    this.applyData();
  }

  private applyData(fit = true) {
    this.comparisonSeries.forEach((item) => {
      const series = this.chartSeries.get(item.id);
      if (!series) return;
      series.setData(this.transformedData(item));
    });
    if (fit) this.chart?.timeScale().fitContent();
    this.renderState();
  }

  private transformedData(series: MuiComparisonChartSeries): LineData[] {
    const firstValue = series.data.find((item) => Number.isFinite(item.value))?.value;
    return series.data.map((item) => {
      let value = item.value;
      if (firstValue && this.mode === "indexed") value = (item.value / firstValue) * 100;
      if (firstValue && this.mode === "percent") value = ((item.value - firstValue) / firstValue) * 100;
      return { time: this.chartTime(item.time), value };
    });
  }

  private chartOptions() {
    const colors = this.colors();
    const interactive = this.hasAttribute("interactive");
    const showTime = this.scale === "both" || this.scale === "time";
    const showPrice = this.scale === "both" || this.scale === "price";
    return {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
        fontFamily: getComputedStyle(this).fontFamily,
        attributionLogo: this.getAttribute("attribution") !== "none",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: colors.grid, visible: showPrice },
      },
      crosshair: {
        mode: interactive ? CrosshairMode.Magnet : CrosshairMode.Hidden,
        vertLine: { color: colors.crosshair },
        horzLine: { color: colors.crosshair },
      },
      rightPriceScale: { visible: showPrice, borderColor: colors.border },
      leftPriceScale: { visible: false },
      timeScale: { visible: showTime, borderColor: colors.border, timeVisible: false, secondsVisible: false },
      handleScroll: interactive,
      handleScale: interactive,
      localization: { priceFormatter: (value: number) => this.formatValue(value) },
    };
  }

  private valueFormat(): MuiComparisonChartValueFormat {
    const format = this.getAttribute("value-format");
    return format === "percent" || format === "currency" ? format : "decimal";
  }

  private formatValue(value: number) {
    if (this.mode === "percent" || (this.mode === "absolute" && this.valueFormat() === "percent")) {
      return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value)}%`;
    }
    if (this.mode === "indexed") return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value);
    if (this.valueFormat() === "currency") {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: this.getAttribute("currency") || "USD",
        notation: Math.abs(value) >= 1_000_000 ? "compact" : "standard",
        maximumFractionDigits: 2,
      }).format(value);
    }
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: Math.abs(value) < 10 ? 4 : 2 }).format(value);
  }

  private renderState() {
    const root = this.shadowRoot;
    if (!root) return;
    const loading = this.hasAttribute("loading");
    const error = this.getAttribute("error") || "";
    const hasData = this.comparisonSeries.some((series) => series.data.length > 0);
    const empty = !loading && !error && !hasData;
    const loadingState = root.querySelector<HTMLElement>(".loading");
    const emptyState = root.querySelector<HTMLElement>(".empty");
    const errorState = root.querySelector<HTMLElement>(".error");
    if (loadingState) loadingState.hidden = !loading;
    if (emptyState) emptyState.hidden = !empty;
    if (errorState) {
      errorState.hidden = !error;
      errorState.textContent = error;
    }
    this.updateSummary();
  }

  private updateSummary() {
    const root = this.shadowRoot;
    if (!root) return;
    const label = this.getAttribute("label") || "Financial comparison";
    const populated = this.comparisonSeries.filter((series) => series.data.length > 0);
    const message = populated.length
      ? `${label} ${this.mode} comparison chart. ${populated.length} series: ${populated.map((series) => series.label).join(", ")}.`
      : `${label} ${this.mode} comparison chart. No comparison data available.`;
    root.querySelector<HTMLElement>(".sr-only")!.textContent = message;
    root.querySelector<HTMLElement>(".chart")?.setAttribute("aria-label", message);
  }

  private applyTheme = () => {
    if (!this.chart) return;
    this.chart.applyOptions(this.chartOptions());
    this.rebuildSeries();
  };

  private observeTheme() {
    this.themeObserver = new MutationObserver(this.applyTheme);
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-theme", "data-brand"],
    });
  }

  private suppressAttributionFocus() {
    const attribution = this.chartContainer?.querySelector<HTMLElement>("#tv-attr-logo");
    if (!attribution) return;
    attribution.setAttribute("tabindex", "-1");
    this.attributionObserver?.disconnect();
    this.attributionObserver = null;
  }

  private colors() {
    return {
      background: this.resolveColor("--comparison-chart-background"),
      text: this.resolveColor("--comparison-chart-text-color"),
      border: this.resolveColor("--comparison-chart-border-color"),
      grid: this.resolveColor("--comparison-chart-grid-color"),
      crosshair: this.resolveColor("--comparison-chart-crosshair-color"),
      reference: this.resolveColor("--comparison-chart-reference-color"),
    };
  }

  private palette() {
    return [1, 2, 3, 4, 5, 6].map((index) => this.resolveColor(`--comparison-chart-series-${index}`));
  }

  private resolveInputColor(color: string) {
    const probe = document.createElement("span");
    probe.style.color = color;
    probe.style.display = "none";
    this.shadowRoot?.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    return this.toSrgb(resolved || color);
  }

  private resolveColor(name: string) {
    const rawColor = getComputedStyle(this).getPropertyValue(name).trim();
    if (!rawColor.includes("color-mix(")) return this.toSrgb(rawColor);
    return this.resolveInputColor(rawColor);
  }

  private toSrgb(color: string) {
    const srgb = color.match(/^color\(srgb\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)(?:\s*\/\s*([\d.]+))?\)$/);
    if (srgb) {
      const [, red, green, blue, alpha = "1"] = srgb;
      return `rgba(${Number(red) * 255}, ${Number(green) * 255}, ${Number(blue) * 255}, ${alpha})`;
    }
    const oklch = color.match(/^oklch\(([\d.]+)(%)?\s+([\d.]+)\s+([\d.-]+)(?:\s*\/\s*([\d.]+))?\)$/);
    if (!oklch) return color;
    const lightness = Number(oklch[1]) / (oklch[2] ? 100 : 1);
    const chroma = Number(oklch[3]);
    const hue = (Number(oklch[4]) * Math.PI) / 180;
    const alpha = Number(oklch[5] || 1);
    const labA = chroma * Math.cos(hue);
    const labB = chroma * Math.sin(hue);
    const lRoot = lightness + 0.3963377774 * labA + 0.2158037573 * labB;
    const mRoot = lightness - 0.1055613458 * labA - 0.0638541728 * labB;
    const sRoot = lightness - 0.0894841775 * labA - 1.291485548 * labB;
    const l = lRoot ** 3;
    const m = mRoot ** 3;
    const s = sRoot ** 3;
    const linear = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    const channel = (value: number) => {
      const encoded = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
      return Math.round(Math.min(1, Math.max(0, encoded)) * 255);
    };
    const [red, green, blue] = linear.map(channel);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  private chartTime(value: number | string): Time {
    if (typeof value === "number") return (value > 10_000_000_000 ? Math.floor(value / 1000) : value) as UTCTimestamp;
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    return Math.floor(new Date(value).getTime() / 1000) as UTCTimestamp;
  }

  private timeValue(value: number | string | Time | null | undefined) {
    if (value == null) return 0;
    if (typeof value === "number") return value > 10_000_000_000 ? value : value * 1000;
    if (typeof value === "string") return new Date(value).getTime();
    return new Date(value.year, value.month - 1, value.day).getTime();
  }
}

if (!customElements.get("mui-comparison-chart")) {
  customElements.define("mui-comparison-chart", MuiComparisonChart);
}

export { MuiComparisonChart };
