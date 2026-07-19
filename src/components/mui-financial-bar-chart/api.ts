export const muiApi = {
  "mui-financial-bar-chart": {
    description: "Displays time-based financial or economic values as a responsive histogram.",
    attributes: [
      { name: "variant", values: ["neutral", "directional"], default: "neutral", description: "Uses one neutral color or positive and negative colors around the baseline." },
      { name: "label", description: "Accessible instrument, indicator, or metric label." },
      { name: "value-format", values: ["decimal", "percent", "currency", "volume"], default: "decimal", description: "Formats values on the price scale and accessible summary." },
      { name: "currency", default: "USD", description: "Currency code used by currency formatting." },
      { name: "baseline", default: "0", description: "Numeric threshold used by directional coloring and the baseline price line." },
      { name: "height", default: "20rem", description: "CSS length applied to the plot region." },
      { name: "scale", values: ["both", "time", "price", "none"], default: "both", description: "Controls visible time and price scales." },
      { name: "interactive", type: "boolean", description: "Enables crosshair, scrolling, and scale gestures." },
      { name: "attribution", values: ["logo", "none"], default: "logo", description: "Controls the TradingView attribution logo. Use none only when the consuming page provides the required attribution." },
      { name: "header-stroke", values: ["none"], description: "Removes the divider between a populated header and the plot." },
      { name: "loading", type: "boolean", description: "Displays the loading state over the plot." },
      { name: "error", description: "Displays an error message over the plot." },
    ],
    properties: [{ name: "data", description: "Array of `{ time: string | number, value: number }` objects. When composing in Redactd, populate the Data field with this array through `props.data`; Redactd passes it to the component. The component sorts a copied array before rendering." }],
    methods: [
      { name: "update", description: "Adds or replaces one datum for streaming updates." },
      { name: "fitContent", description: "Fits all current data into the visible time scale." },
    ],
    events: [{ name: "financial-bar-chart-crosshair-change", description: "Fires with the matching datum when an interactive crosshair moves." }],
    slots: [
      { name: "header", description: "Muibook content rendered in the component-padded region before the plot." },
      { name: "footer", description: "Muibook content rendered in the component-padded region after the plot." },
    ],
    cssParts: [
      { name: "header", description: "Component-padded header region." },
      { name: "plot", description: "Chart and state-overlay region." },
      { name: "footer", description: "Component-padded footer region." },
    ],
    cssProperties: [
      { name: "--financial-bar-chart-background", description: "Canvas and state background." },
      { name: "--financial-bar-chart-grid-color", description: "Canvas grid lines." },
      { name: "--financial-bar-chart-crosshair-color", description: "Interactive crosshair." },
      { name: "--financial-bar-chart-neutral-color", description: "Neutral bars." },
      { name: "--financial-bar-chart-positive-color", description: "Directional bars above the baseline." },
      { name: "--financial-bar-chart-negative-color", description: "Directional bars below the baseline." },
      { name: "--financial-bar-chart-baseline-color", description: "Directional baseline." },
      { name: "--financial-bar-chart-border", description: "Header divider border shorthand." },
    ],
  },
};
