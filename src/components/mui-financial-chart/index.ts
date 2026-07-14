import {
  AreaSeries,
  CandlestickSeries,
  ColorType,
  HistogramSeries,
  createChart,
  type AreaData,
  type CandlestickData,
  type HistogramData,
  type IChartApi,
  type ISeriesApi,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import "../mui-body";
import "../mui-responsive";
import "../mui-stack";
import "../mui-tabs";
import { hasSurfaceOwner } from "../../utils/surface-usage";

export type MuiFinancialChartType = "candlestick" | "area";

export interface MuiFinancialChartDatum {
  time: number | string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

class MuiFinancialChart extends HTMLElement {
  static get observedAttributes() {
    return ["type", "symbol", "currency", "interval", "height", "selected-range", "ranges", "loading", "error"];
  }

  private chart: IChartApi | null = null;
  private priceSeries: ISeriesApi<"Candlestick"> | ISeriesApi<"Area"> | null = null;
  private volumeSeries: ISeriesApi<"Histogram"> | null = null;
  private chartContainer: HTMLElement | null = null;
  private themeObserver: MutationObserver | null = null;
  private attributionObserver: MutationObserver | null = null;
  private chartFrame = 0;
  private chartData: MuiFinancialChartDatum[] = [];
  private handleRangeChange = (event: Event) => {
    const activeRange = (event.currentTarget as HTMLElement | null)?.querySelector<HTMLElement>("mui-tab-item[active]")
      ?.dataset.range;
    if (activeRange) this.setAttribute("selected-range", activeRange);
  };

  get data() {
    return this.chartData;
  }

  set data(value: MuiFinancialChartDatum[]) {
    this.chartData = Array.isArray(value)
      ? [...value].sort((a, b) => this.timeValue(a.time) - this.timeValue(b.time))
      : [];
    this.updateSummary();
    this.applyData();
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
    this.chartFrame = requestAnimationFrame(() => {
      this.chartFrame = 0;
      this.createFinancialChart();
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
    this.priceSeries = null;
    this.volumeSeries = null;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue || !this.isConnected) return;

    if (name === "height") {
      this.style.setProperty("--financial-chart-height-current", newValue || "32rem");
      return;
    }

    if (["symbol", "currency", "interval", "ranges", "loading", "error"].includes(name)) {
      this.renderChrome();
    }

    if (name === "selected-range") {
      this.syncRangeButtons();
      this.applyData();
      this.dispatchEvent(
        new CustomEvent("financial-chart-range-change", {
          detail: { range: this.selectedRange },
          bubbles: true,
        }),
      );
    }

    if (name === "type") this.rebuildSeries();
  }

  update(datum: MuiFinancialChartDatum) {
    const existingIndex = this.chartData.findIndex((item) => this.timeValue(item.time) === this.timeValue(datum.time));
    if (existingIndex >= 0) this.chartData[existingIndex] = datum;
    else this.chartData.push(datum);
    this.chartData.sort((a, b) => this.timeValue(a.time) - this.timeValue(b.time));
    this.updateSummary();
    this.applyData(false);
  }

  fitContent() {
    this.chart?.timeScale().fitContent();
  }

  private get type(): MuiFinancialChartType {
    return this.getAttribute("type") === "area" ? "area" : "candlestick";
  }

  private get selectedRange() {
    return (this.getAttribute("selected-range") || "1M").toUpperCase();
  }

  private render() {
    if (!this.shadowRoot) return;
    const tabUsage = hasSurfaceOwner(this) ? ' usage="surface"' : "";
    this.style.setProperty("--financial-chart-height-current", this.getAttribute("height") || "32rem");
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          min-width: 0;
          font-family: var(--font-family);
          color: var(--financial-chart-text-color);
        }

        * {
          box-sizing: border-box;
        }

        .chart-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto minmax(0, 1fr);
          width: 100%;
          min-width: 0;
        }

        [part="toolbar"] {
          min-width: 0;
          border-bottom: var(--financial-chart-border);
        }

        mui-responsive {
          width: 100%;
          min-width: 0;
        }

        [part="summary"] {
          min-width: 0;
        }

        .chart-region {
          position: relative;
          width: 100%;
          min-width: 0;
          height: var(--financial-chart-height-current);
          min-height: 20rem;
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
          padding: var(--space-400);
          background: var(--financial-chart-background);
          color: var(--financial-chart-text-color-secondary);
          text-align: center;
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
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
      <section class="chart-shell">
        <mui-responsive variant="container" observe="parent" breakpoint="608">
          <mui-v-stack
            slot="showBelow"
            part="toolbar"
            width="100%"
            space="var(--space-300)"
            padding="var(--space-400)"
            alignx="stretch"
          >
            <mui-v-stack part="summary" space="var(--space-050)"></mui-v-stack>
            <mui-tab-bar${tabUsage} data-range-layout="compact" size="x-small" stroke="none" aria-label="Chart time range" active-inset full-width></mui-tab-bar>
          </mui-v-stack>
          <mui-h-stack
            slot="showAbove"
            part="toolbar"
            width="100%"
            space="var(--space-300)"
            padding="var(--space-400)"
            alignx="space-between"
            aligny="flex-start"
          >
            <mui-v-stack part="summary" space="var(--space-050)"></mui-v-stack>
            <mui-tab-bar${tabUsage} data-range-layout="wide" size="x-small" stroke="none" aria-label="Chart time range" active-inset></mui-tab-bar>
          </mui-h-stack>
        </mui-responsive>
        <div class="chart-region" part="chart-region">
          <div class="chart" role="img"></div>
          <div class="state loading" role="status" hidden>Loading market data</div>
          <div class="state empty" role="status" hidden>No market data available</div>
          <div class="state error" role="alert" hidden></div>
        </div>
        <p class="sr-only" aria-live="polite"></p>
      </section>
    `;
    this.chartContainer = this.shadowRoot.querySelector(".chart");
    this.shadowRoot
      .querySelectorAll("mui-tab-bar")
      .forEach((tabBar) => tabBar.addEventListener("tab-change", this.handleRangeChange));
    this.renderChrome();
  }

  private renderChrome() {
    const root = this.shadowRoot;
    if (!root) return;

    const filteredData = this.filteredData();
    const latest = filteredData[filteredData.length - 1];
    const previous = filteredData[filteredData.length - 2];
    const change = latest && previous ? latest.close - previous.close : 0;
    const changePercent = previous?.close ? (change / previous.close) * 100 : 0;
    const changeVariant = change < 0 ? "attention" : "positive";
    root.querySelectorAll('[part="summary"]').forEach((summary) => {
      summary.innerHTML = /*html*/ `
        <mui-h-stack space="var(--space-100)" aligny="baseline" wrap>
          <mui-body size="small" weight="bold">${this.escape(this.getAttribute("symbol") || "Instrument")}</mui-body>
          <mui-body size="x-small" variant="secondary">${this.escape(this.getAttribute("interval") || "1D")}</mui-body>
        </mui-h-stack>
        <mui-h-stack space="var(--space-100)" aligny="baseline" wrap>
          <mui-body size="medium" weight="bold">${latest ? this.formatPrice(latest.close) : "--"}</mui-body>
          <mui-body size="x-small" variant="secondary">${this.escape(this.getAttribute("currency") || "USD")}</mui-body>
          <mui-body size="x-small" weight="medium" variant="${changeVariant}">${latest && previous ? `${change >= 0 ? "+" : ""}${this.formatPrice(change)} (${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%)` : ""}</mui-body>
        </mui-h-stack>
      `;
    });

    const ranges = this.rangeValues();
    root.querySelectorAll("mui-tab-bar").forEach((rangeContainer) => {
      const renderedRanges = Array.from(rangeContainer.querySelectorAll<HTMLElement>("mui-tab-item"), (item) =>
        item.dataset.range,
      );
      const rangesChanged = renderedRanges.length !== ranges.length || ranges.some((range, index) => range !== renderedRanges[index]);

      if (rangesChanged) {
        const layout = rangeContainer.getAttribute("data-range-layout") || "default";
        rangeContainer.innerHTML = ranges
          .map(
            (range) =>
              `<mui-tab-item id="range-${layout}-${this.escape(range)}" data-range="${this.escape(range)}"${range === this.selectedRange ? " active" : ""}>${this.escape(range)}</mui-tab-item>`,
          )
          .join("");
      } else {
        this.syncRangeButtons();
      }
    });

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

  private createFinancialChart() {
    if (!this.chartContainer) return;
    this.attributionObserver = new MutationObserver(() => this.suppressAttributionFocus());
    this.attributionObserver.observe(this.chartContainer, { childList: true, subtree: true });
    this.chart = createChart(this.chartContainer, this.chartOptions());
    this.suppressAttributionFocus();
    this.rebuildSeries();
    this.chart.subscribeCrosshairMove((event) => {
      if (event.time === undefined) return;
      const eventTime = this.timeValue(event.time);
      const datum = this.chartData.find((item) => this.timeValue(item.time) === eventTime);
      if (!datum) return;
      this.dispatchEvent(new CustomEvent("financial-chart-crosshair-change", { detail: { datum }, bubbles: true }));
    });
  }

  private suppressAttributionFocus() {
    const attribution = this.chartContainer?.querySelector<HTMLElement>("#tv-attr-logo");
    if (!attribution) return;
    attribution.setAttribute("tabindex", "-1");
    this.attributionObserver?.disconnect();
    this.attributionObserver = null;
  }

  private rebuildSeries() {
    if (!this.chart) return;
    if (this.priceSeries) this.chart.removeSeries(this.priceSeries);
    if (this.volumeSeries) this.chart.removeSeries(this.volumeSeries);
    this.priceSeries = null;
    this.volumeSeries = null;

    const colors = this.colors();
    if (this.type === "area") {
      this.priceSeries = this.chart.addSeries(AreaSeries, {
        lineColor: colors.series,
        topColor: colors.areaTop,
        bottomColor: colors.areaBottom,
        lineWidth: 2,
        priceLineVisible: true,
      });
    } else {
      this.priceSeries = this.chart.addSeries(CandlestickSeries, {
        upColor: colors.positive,
        downColor: colors.negative,
        borderUpColor: colors.positive,
        borderDownColor: colors.negative,
        wickUpColor: colors.positive,
        wickDownColor: colors.negative,
      });
    }

    this.volumeSeries = this.chart.addSeries(
      HistogramSeries,
      {
        priceFormat: { type: "volume" },
        priceScaleId: "",
      },
      1,
    );
    this.applyData();
  }

  private applyData(fit = true) {
    if (!this.priceSeries || !this.volumeSeries) {
      this.renderChrome();
      return;
    }

    const data = this.filteredData();
    if (this.type === "area") {
      (this.priceSeries as ISeriesApi<"Area">).setData(
        data.map<AreaData>((item) => ({ time: this.chartTime(item.time), value: item.close })),
      );
    } else {
      (this.priceSeries as ISeriesApi<"Candlestick">).setData(
        data.map<CandlestickData>((item) => ({
          time: this.chartTime(item.time),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        })),
      );
    }

    const colors = this.colors();
    this.volumeSeries.setData(
      data.map<HistogramData>((item) => ({
        time: this.chartTime(item.time),
        value: item.volume || 0,
        color: item.close >= item.open ? colors.volumePositive : colors.volumeNegative,
      })),
    );
    if (fit) this.chart?.timeScale().fitContent();
    this.renderChrome();
  }

  private filteredData() {
    if (this.selectedRange === "ALL" || this.chartData.length === 0) return this.chartData;
    const rangeDays: Record<string, number> = { "1D": 1, "1W": 7, "1M": 30, "3M": 90, "1Y": 365 };
    const days = rangeDays[this.selectedRange];
    if (!days) return this.chartData;
    const latest = this.timeValue(this.chartData[this.chartData.length - 1].time);
    const threshold = latest - days * 86_400_000;
    return this.chartData.filter((item) => this.timeValue(item.time) >= threshold);
  }

  private rangeValues() {
    return (this.getAttribute("ranges") || "1D,1W,1M,3M,1Y,ALL")
      .split(",")
      .map((range) => range.trim().toUpperCase())
      .filter(Boolean);
  }

  private syncRangeButtons() {
    this.shadowRoot?.querySelectorAll<HTMLElement>("[data-range]").forEach((button) => {
      button.toggleAttribute("active", button.dataset.range === this.selectedRange);
    });
  }

  private chartOptions() {
    const colors = this.colors();
    return {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
        fontFamily: getComputedStyle(this).fontFamily,
        attributionLogo: true,
      },
      grid: {
        vertLines: { color: colors.grid },
        horzLines: { color: colors.grid },
      },
      crosshair: {
        vertLine: { color: colors.crosshair },
        horzLine: { color: colors.crosshair },
      },
      rightPriceScale: { borderColor: colors.border },
      timeScale: { borderColor: colors.border, timeVisible: true, secondsVisible: false },
      localization: { priceFormatter: (price: number) => this.formatPrice(price) },
    };
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

  private colors() {
    return {
      background: this.resolveColor("--financial-chart-background"),
      text: this.resolveColor("--financial-chart-text-color-secondary"),
      border: this.resolveColor("--financial-chart-border-color"),
      grid: this.resolveColor("--financial-chart-grid-color"),
      crosshair: this.resolveColor("--financial-chart-crosshair-color"),
      positive: this.resolveColor("--financial-chart-positive-color"),
      negative: this.resolveColor("--financial-chart-negative-color"),
      series: this.resolveColor("--financial-chart-series-color"),
      areaTop: this.resolveColor("--financial-chart-area-top-color"),
      areaBottom: this.resolveColor("--financial-chart-area-bottom-color"),
      volumePositive: this.resolveColor("--financial-chart-volume-positive-color"),
      volumeNegative: this.resolveColor("--financial-chart-volume-negative-color"),
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

  private formatPrice(value: number) {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: Math.abs(value) < 10 ? 2 : 0,
      maximumFractionDigits: Math.abs(value) < 10 ? 4 : 2,
    }).format(value);
  }

  private updateSummary() {
    const root = this.shadowRoot;
    if (!root) return;
    const filteredData = this.filteredData();
    const latest = filteredData[filteredData.length - 1];
    const summary = root.querySelector<HTMLElement>(".sr-only");
    const chart = root.querySelector<HTMLElement>(".chart");
    const symbol = this.getAttribute("symbol") || "Instrument";
    const message = latest
      ? `${symbol} ${this.type} chart. Latest close ${this.formatPrice(latest.close)} ${this.getAttribute("currency") || "USD"}. ${this.filteredData().length} data points shown for ${this.selectedRange}.`
      : `${symbol} ${this.type} chart. No market data available.`;
    if (summary) summary.textContent = message;
    chart?.setAttribute("aria-label", message);
  }

  private escape(value: string) {
    return value.replace(
      /[&<>'"]/g,
      (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!,
    );
  }
}

if (!customElements.get("mui-financial-chart")) {
  customElements.define("mui-financial-chart", MuiFinancialChart);
}

export { MuiFinancialChart };
