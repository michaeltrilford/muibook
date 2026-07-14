import {
  ColorType,
  CrosshairMode,
  HistogramSeries,
  LineStyle,
  createChart,
  type HistogramData,
  type IChartApi,
  type ISeriesApi,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import "../mui-body";

export type MuiFinancialBarChartVariant = "neutral" | "directional";
export type MuiFinancialBarChartValueFormat = "decimal" | "percent" | "currency" | "volume";
export type MuiFinancialBarChartScale = "both" | "time" | "price" | "none";

export interface MuiFinancialBarChartDatum {
  time: number | string;
  value: number;
}

class MuiFinancialBarChart extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "label", "value-format", "currency", "baseline", "height", "scale", "interactive", "attribution", "loading", "error"];
  }

  private chart: IChartApi | null = null;
  private series: ISeriesApi<"Histogram"> | null = null;
  private chartContainer: HTMLElement | null = null;
  private themeObserver: MutationObserver | null = null;
  private attributionObserver: MutationObserver | null = null;
  private chartFrame = 0;
  private chartData: MuiFinancialBarChartDatum[] = [];

  get data() {
    return this.chartData;
  }

  set data(value: MuiFinancialBarChartDatum[]) {
    this.chartData = Array.isArray(value)
      ? [...value].sort((a, b) => this.timeValue(a.time) - this.timeValue(b.time))
      : [];
    this.applyData();
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
    this.chartFrame = requestAnimationFrame(() => {
      this.chartFrame = 0;
      this.createBarChart();
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
    this.series = null;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue || !this.isConnected) return;

    if (name === "height") {
      this.style.setProperty("--financial-bar-chart-height-current", newValue || "20rem");
      return;
    }

    if (["variant", "baseline", "value-format", "currency"].includes(name)) this.rebuildSeries();
    if (["scale", "interactive", "attribution"].includes(name)) this.chart?.applyOptions(this.chartOptions());
    if (["label", "loading", "error"].includes(name)) this.renderState();
  }

  update(datum: MuiFinancialBarChartDatum) {
    const existingIndex = this.chartData.findIndex((item) => this.timeValue(item.time) === this.timeValue(datum.time));
    if (existingIndex >= 0) this.chartData[existingIndex] = datum;
    else this.chartData.push(datum);
    this.chartData.sort((a, b) => this.timeValue(a.time) - this.timeValue(b.time));
    this.applyData(false);
  }

  fitContent() {
    this.chart?.timeScale().fitContent();
  }

  private get variant(): MuiFinancialBarChartVariant {
    return this.getAttribute("variant") === "directional" ? "directional" : "neutral";
  }

  private get scale(): MuiFinancialBarChartScale {
    const scale = this.getAttribute("scale");
    return scale === "time" || scale === "price" || scale === "none" ? scale : "both";
  }

  private render() {
    if (!this.shadowRoot) return;
    this.style.setProperty("--financial-bar-chart-height-current", this.getAttribute("height") || "20rem");
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
          height: var(--financial-bar-chart-height-current);
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
          background: var(--financial-bar-chart-background);
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
        <div class="plot" part="plot">
          <div class="chart" role="img"></div>
          <mui-body class="state loading" size="x-small" variant="secondary" role="status" hidden>Loading financial data</mui-body>
          <mui-body class="state empty" size="x-small" variant="secondary" role="status" hidden>No financial data available</mui-body>
          <mui-body class="state error" size="x-small" variant="attention" role="alert" hidden></mui-body>
        </div>
        <slot name="footer" part="footer"></slot>
        <p class="sr-only" aria-live="polite"></p>
      </section>
    `;
    this.chartContainer = this.shadowRoot.querySelector(".chart");
    this.renderState();
  }

  private createBarChart() {
    if (!this.chartContainer) return;
    this.attributionObserver = new MutationObserver(() => this.suppressAttributionFocus());
    this.attributionObserver.observe(this.chartContainer, { childList: true, subtree: true });
    this.chart = createChart(this.chartContainer, this.chartOptions());
    this.suppressAttributionFocus();
    this.rebuildSeries();
    this.chart.subscribeCrosshairMove((event) => {
      if (!this.hasAttribute("interactive") || event.time === undefined) return;
      const eventTime = this.timeValue(event.time);
      const datum = this.chartData.find((item) => this.timeValue(item.time) === eventTime);
      if (!datum) return;
      this.dispatchEvent(new CustomEvent("financial-bar-chart-crosshair-change", { detail: { datum }, bubbles: true }));
    });
  }

  private rebuildSeries() {
    if (!this.chart) {
      this.renderState();
      return;
    }
    if (this.series) this.chart.removeSeries(this.series);
    const colors = this.colors();
    this.series = this.chart.addSeries(HistogramSeries, {
      color: colors.neutral,
      base: this.baselineValue(),
      priceFormat: { type: "custom", formatter: (value: number) => this.formatValue(value) },
      priceLineVisible: false,
      lastValueVisible: false,
    });
    this.series.priceScale().applyOptions({ scaleMargins: { top: 0.12, bottom: 0.08 } });
    if (this.variant === "directional") {
      this.series.createPriceLine({
        price: this.baselineValue(),
        color: colors.baseline,
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: false,
        title: "",
      });
    }
    this.applyData();
  }

  private applyData(fit = true) {
    if (!this.series) {
      this.renderState();
      return;
    }
    const colors = this.colors();
    const baseline = this.baselineValue();
    const data = this.chartData.map<HistogramData>((item) => ({
      time: this.chartTime(item.time),
      value: item.value,
      color: this.variant === "neutral" ? colors.neutral : item.value >= baseline ? colors.positive : colors.negative,
    }));
    this.series.setData(data);
    if (fit) this.chart?.timeScale().fitContent();
    this.renderState();
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

  private baselineValue() {
    const value = Number(this.getAttribute("baseline") || 0);
    return Number.isFinite(value) ? value : 0;
  }

  private valueFormat(): MuiFinancialBarChartValueFormat {
    const format = this.getAttribute("value-format");
    return format === "percent" || format === "currency" || format === "volume" ? format : "decimal";
  }

  private formatValue(value: number) {
    if (this.valueFormat() === "percent") return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value)}%`;
    if (this.valueFormat() === "currency") {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: this.getAttribute("currency") || "USD",
        notation: Math.abs(value) >= 1_000_000 ? "compact" : "standard",
        maximumFractionDigits: 2,
      }).format(value);
    }
    if (this.valueFormat() === "volume") {
      return new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 2 }).format(value);
    }
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: Math.abs(value) < 10 ? 4 : 2 }).format(value);
  }

  private renderState() {
    const root = this.shadowRoot;
    if (!root) return;
    const loading = this.hasAttribute("loading");
    const error = this.getAttribute("error") || "";
    const empty = !loading && !error && this.chartData.length === 0;
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
    const label = this.getAttribute("label") || "Financial values";
    const latest = this.chartData[this.chartData.length - 1];
    const message = latest
      ? `${label} ${this.variant} bar chart. Latest value ${this.formatValue(latest.value)}. ${this.chartData.length} periods.`
      : `${label} ${this.variant} bar chart. No financial data available.`;
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
      background: this.resolveColor("--financial-bar-chart-background"),
      text: this.resolveColor("--financial-bar-chart-text-color"),
      border: this.resolveColor("--financial-bar-chart-border-color"),
      grid: this.resolveColor("--financial-bar-chart-grid-color"),
      crosshair: this.resolveColor("--financial-bar-chart-crosshair-color"),
      neutral: this.resolveColor("--financial-bar-chart-neutral-color"),
      positive: this.resolveColor("--financial-bar-chart-positive-color"),
      negative: this.resolveColor("--financial-bar-chart-negative-color"),
      baseline: this.resolveColor("--financial-bar-chart-baseline-color"),
    };
  }

  private resolveColor(name: string) {
    const rawColor = getComputedStyle(this).getPropertyValue(name).trim();
    if (!rawColor.includes("color-mix(")) return this.toSrgb(rawColor);
    const probe = document.createElement("span");
    probe.style.color = rawColor;
    probe.style.display = "none";
    this.shadowRoot?.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return this.toSrgb(color);
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

if (!customElements.get("mui-financial-bar-chart")) {
  customElements.define("mui-financial-bar-chart", MuiFinancialBarChart);
}

export { MuiFinancialBarChart };
