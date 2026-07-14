import {
  AreaSeries,
  BaselineSeries,
  ColorType,
  CrosshairMode,
  LineSeries,
  createChart,
  type AreaData,
  type BaselineData,
  type IChartApi,
  type ISeriesApi,
  type LineData,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import "../mui-body";

export type MuiMarketSparklineType = "line" | "area" | "baseline";
export type MuiMarketSparklineTrend = "auto" | "positive" | "negative" | "neutral";

export interface MuiMarketSparklineDatum {
  time: number | string;
  value: number;
}

class MuiMarketSparkline extends HTMLElement {
  static get observedAttributes() {
    return ["type", "trend", "label", "currency", "height", "baseline", "interactive", "attribution", "loading", "error"];
  }

  private chart: IChartApi | null = null;
  private series: ISeriesApi<"Line"> | ISeriesApi<"Area"> | ISeriesApi<"Baseline"> | null = null;
  private chartContainer: HTMLElement | null = null;
  private themeObserver: MutationObserver | null = null;
  private attributionObserver: MutationObserver | null = null;
  private chartFrame = 0;
  private chartData: MuiMarketSparklineDatum[] = [];

  get data() {
    return this.chartData;
  }

  set data(value: MuiMarketSparklineDatum[]) {
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
      this.createSparkline();
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
      this.style.setProperty("--market-sparkline-height-current", newValue || "8rem");
      return;
    }

    if (["type", "trend", "baseline"].includes(name)) this.rebuildSeries();
    if (["interactive", "attribution"].includes(name)) this.chart?.applyOptions(this.chartOptions());
    if (["label", "currency", "loading", "error"].includes(name)) this.renderState();
  }

  update(datum: MuiMarketSparklineDatum) {
    const existingIndex = this.chartData.findIndex((item) => this.timeValue(item.time) === this.timeValue(datum.time));
    if (existingIndex >= 0) this.chartData[existingIndex] = datum;
    else this.chartData.push(datum);
    this.chartData.sort((a, b) => this.timeValue(a.time) - this.timeValue(b.time));
    this.applyData(false);
  }

  fitContent() {
    this.chart?.timeScale().fitContent();
  }

  private get type(): MuiMarketSparklineType {
    const type = this.getAttribute("type");
    return type === "line" || type === "baseline" ? type : "area";
  }

  private render() {
    if (!this.shadowRoot) return;
    this.style.setProperty("--market-sparkline-height-current", this.getAttribute("height") || "8rem");
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
          height: var(--market-sparkline-height-current);
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
          background: var(--market-sparkline-background);
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
          <mui-body class="state loading" size="x-small" variant="secondary" role="status" hidden>Loading market data</mui-body>
          <mui-body class="state empty" size="x-small" variant="secondary" role="status" hidden>No market data available</mui-body>
          <mui-body class="state error" size="x-small" variant="attention" role="alert" hidden></mui-body>
        </div>
        <slot name="footer" part="footer"></slot>
        <p class="sr-only" aria-live="polite"></p>
      </section>
    `;
    this.chartContainer = this.shadowRoot.querySelector(".chart");
    this.renderState();
  }

  private createSparkline() {
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
      this.dispatchEvent(new CustomEvent("market-sparkline-crosshair-change", { detail: { datum }, bubbles: true }));
    });
  }

  private rebuildSeries() {
    if (!this.chart) {
      this.renderState();
      return;
    }
    if (this.series) this.chart.removeSeries(this.series);

    const colors = this.colors();
    const trend = this.resolvedTrend();
    const lineColor = trend === "positive" ? colors.positive : trend === "negative" ? colors.negative : colors.neutral;

    if (this.type === "line") {
      this.series = this.chart.addSeries(LineSeries, {
        color: lineColor,
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
      });
    } else if (this.type === "baseline") {
      this.series = this.chart.addSeries(BaselineSeries, {
        baseValue: { type: "price", price: this.baselineValue() },
        topLineColor: colors.positive,
        topFillColor1: colors.positiveAreaTop,
        topFillColor2: colors.positiveAreaBottom,
        bottomLineColor: colors.negative,
        bottomFillColor1: colors.negativeAreaBottom,
        bottomFillColor2: colors.negativeAreaTop,
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
      });
    } else {
      const positive = trend === "positive";
      const negative = trend === "negative";
      this.series = this.chart.addSeries(AreaSeries, {
        lineColor,
        topColor: positive ? colors.positiveAreaTop : negative ? colors.negativeAreaTop : colors.neutralAreaTop,
        bottomColor: positive ? colors.positiveAreaBottom : negative ? colors.negativeAreaBottom : colors.neutralAreaBottom,
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
      });
    }
    this.applyData();
  }

  private applyData(fit = true) {
    if (!this.series) {
      this.renderState();
      return;
    }
    const data = this.chartData.map((item) => ({ time: this.chartTime(item.time), value: item.value }));
    if (this.type === "line") (this.series as ISeriesApi<"Line">).setData(data as LineData[]);
    else if (this.type === "baseline") (this.series as ISeriesApi<"Baseline">).setData(data as BaselineData[]);
    else (this.series as ISeriesApi<"Area">).setData(data as AreaData[]);
    if (fit) this.chart?.timeScale().fitContent();
    this.renderState();
  }

  private chartOptions() {
    const colors = this.colors();
    const interactive = this.hasAttribute("interactive");
    return {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
        fontFamily: getComputedStyle(this).fontFamily,
        attributionLogo: this.getAttribute("attribution") !== "none",
      },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      crosshair: { mode: interactive ? CrosshairMode.Magnet : CrosshairMode.Hidden },
      rightPriceScale: { visible: false },
      leftPriceScale: { visible: false },
      timeScale: { visible: false, borderVisible: false, fixLeftEdge: true, fixRightEdge: true },
      handleScroll: interactive,
      handleScale: interactive,
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

  private resolvedTrend(): Exclude<MuiMarketSparklineTrend, "auto"> {
    const trend = this.getAttribute("trend");
    if (trend === "positive" || trend === "negative" || trend === "neutral") return trend;
    if (this.chartData.length < 2) return "neutral";
    const first = this.chartData[0].value;
    const latest = this.chartData[this.chartData.length - 1].value;
    return latest > first ? "positive" : latest < first ? "negative" : "neutral";
  }

  private baselineValue() {
    const baseline = Number(this.getAttribute("baseline"));
    if (this.hasAttribute("baseline") && Number.isFinite(baseline)) return baseline;
    return this.chartData[0]?.value || 0;
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
    const label = this.getAttribute("label") || "Market trend";
    const latest = this.chartData[this.chartData.length - 1];
    const currency = this.getAttribute("currency");
    const message = latest
      ? `${label} ${this.type} sparkline. Latest value ${this.formatValue(latest.value)}${currency ? ` ${currency}` : ""}. ${this.chartData.length} data points. ${this.resolvedTrend()} trend.`
      : `${label} ${this.type} sparkline. No market data available.`;
    root.querySelector<HTMLElement>(".sr-only")!.textContent = message;
    root.querySelector<HTMLElement>(".chart")?.setAttribute("aria-label", message);
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
      background: this.resolveColor("--market-sparkline-background"),
      text: this.resolveColor("--market-sparkline-text-color"),
      positive: this.resolveColor("--market-sparkline-positive-color"),
      negative: this.resolveColor("--market-sparkline-negative-color"),
      neutral: this.resolveColor("--market-sparkline-neutral-color"),
      positiveAreaTop: this.resolveColor("--market-sparkline-positive-area-top-color"),
      positiveAreaBottom: this.resolveColor("--market-sparkline-positive-area-bottom-color"),
      negativeAreaTop: this.resolveColor("--market-sparkline-negative-area-top-color"),
      negativeAreaBottom: this.resolveColor("--market-sparkline-negative-area-bottom-color"),
      neutralAreaTop: this.resolveColor("--market-sparkline-neutral-area-top-color"),
      neutralAreaBottom: this.resolveColor("--market-sparkline-neutral-area-bottom-color"),
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

  private formatValue(value: number) {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: Math.abs(value) < 10 ? 4 : 2 }).format(value);
  }
}

if (!customElements.get("mui-market-sparkline")) {
  customElements.define("mui-market-sparkline", MuiMarketSparkline);
}

export { MuiMarketSparkline };
