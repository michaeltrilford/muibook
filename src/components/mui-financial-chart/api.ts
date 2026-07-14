export const muiApi = {
  "mui-financial-chart": {
    description: "Displays responsive candlestick or area market data with volume and time-range controls.",
    attributes: [
      { name: "type", values: ["candlestick", "area"], default: "candlestick", description: "Price-series presentation." },
      { name: "symbol", description: "Instrument or market symbol shown in the chart summary." },
      { name: "currency", default: "USD", description: "Currency label shown beside the current price." },
      { name: "interval", default: "1D", description: "Market interval label shown beside the symbol." },
      { name: "height", default: "32rem", description: "CSS length applied to the interactive chart region." },
      { name: "selected-range", default: "1M", description: "Selected local time range." },
      { name: "ranges", default: "1D,1W,1M,3M,1Y,ALL", description: "Comma-separated range controls." },
      { name: "loading", type: "boolean", description: "Displays the loading state over the chart." },
      { name: "error", description: "Displays an error message over the chart." },
    ],
    properties: [
      { name: "data", description: "Array of OHLCV data ordered by time. The component sorts a copied array before rendering." },
    ],
    methods: [
      { name: "update", description: "Adds or replaces one OHLCV datum for streaming updates." },
      { name: "fitContent", description: "Fits the active data range into the visible time scale." },
    ],
    events: [
      { name: "financial-chart-range-change", description: "Fires when a range control is selected." },
      { name: "financial-chart-crosshair-change", description: "Fires with the matching OHLCV datum as the crosshair moves." },
    ],
    cssParts: [
      { name: "toolbar", description: "Instrument summary and range-control region." },
      { name: "summary", description: "Symbol, interval, price, and change summary." },
      { name: "chart-region", description: "Interactive chart and state-overlay region." },
    ],
    cssProperties: [
      { name: "--financial-chart-background", description: "Chart canvas and state-overlay surface." },
      { name: "--financial-chart-border", description: "Toolbar divider border shorthand." },
      { name: "--financial-chart-grid-color", description: "Canvas grid-line color." },
      { name: "--financial-chart-crosshair-color", description: "Canvas crosshair color." },
      { name: "--financial-chart-positive-color", description: "Positive candles and values." },
      { name: "--financial-chart-negative-color", description: "Negative candles and values." },
      { name: "--financial-chart-series-color", description: "Area-series line color." },
    ],
  },
};
