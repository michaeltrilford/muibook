export const muiApi = {
  "mui-market-sparkline": {
    description: "Displays a compact financial time series as a line, area, or baseline chart.",
    attributes: [
      { name: "type", values: ["line", "area", "baseline"], default: "area", description: "Sparkline presentation." },
      { name: "trend", values: ["auto", "positive", "negative", "neutral"], default: "auto", description: "Color direction. Auto compares the first and latest values." },
      { name: "label", description: "Accessible instrument or metric label." },
      { name: "currency", description: "Optional currency included in the accessible summary." },
      { name: "height", default: "8rem", description: "CSS length applied to the plot region." },
      { name: "baseline", description: "Numeric baseline value. Defaults to the first visible value." },
      { name: "interactive", type: "boolean", description: "Enables crosshair, scrolling, and scale gestures." },
      { name: "attribution", values: ["logo", "none"], default: "logo", description: "Controls the TradingView attribution logo. Use none only when the consuming page provides the required attribution." },
      { name: "loading", type: "boolean", description: "Displays the loading state over the plot." },
      { name: "error", description: "Displays an error message over the plot." },
    ],
    properties: [{ name: "data", description: "Array of `{ time: string | number, value: number }` objects. When composing in Redactd, populate the Data field with this array through `props.data`; Redactd passes it to the component. The component sorts a copied array before rendering." }],
    methods: [
      { name: "update", description: "Adds or replaces one datum for streaming updates." },
      { name: "fitContent", description: "Fits all current data into the visible time scale." },
    ],
    events: [{ name: "market-sparkline-crosshair-change", description: "Fires with the matching datum when an interactive crosshair moves." }],
    slots: [
      { name: "header", description: "Muibook content rendered before the plot." },
      { name: "footer", description: "Muibook content rendered after the plot." },
    ],
    cssParts: [
      { name: "header", description: "Header slot." },
      { name: "plot", description: "Chart and state-overlay region." },
      { name: "footer", description: "Footer slot." },
    ],
    cssProperties: [
      { name: "--market-sparkline-background", description: "Canvas and state background." },
      { name: "--market-sparkline-positive-color", description: "Positive trend line." },
      { name: "--market-sparkline-negative-color", description: "Negative trend line." },
      { name: "--market-sparkline-neutral-color", description: "Neutral trend line." },
      { name: "--market-sparkline-positive-area-top-color", description: "Positive area fill nearest the line." },
      { name: "--market-sparkline-positive-area-bottom-color", description: "Positive area fill nearest the baseline." },
      { name: "--market-sparkline-negative-area-top-color", description: "Negative area fill nearest the line." },
      { name: "--market-sparkline-negative-area-bottom-color", description: "Negative area fill nearest the baseline." },
    ],
  },
};
