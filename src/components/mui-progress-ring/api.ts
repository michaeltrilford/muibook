export const muiApi = {
  "mui-progress-ring": {
    description:
      "Displays circular determinate progress with optional generated center text. Use for compact progress summaries in dashboards, cards, tables, and responsive summaries.",
    attributes: [
      { name: "progress", type: { text: "number" }, default: "0", description: "Sets determinate progress, clamped from 0 to 100." },
      { name: "value", type: { text: "number" }, description: "Sets the completed value when using count-based progress." },
      { name: "max", type: { text: "number" }, default: "100", description: "Sets the total value when using count-based progress." },
      { name: "label", type: { text: "string" }, description: "Accessible label for the progress ring." },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Controls the ring size.",
      },
      {
        name: "display",
        type: { text: '"auto" | "value" | "none"' },
        default: "auto",
        description:
          "Controls the generated center text. Auto keeps center text empty, value derives compact text from value/max or rounded progress, and completion uses a checkmark. Ignored for size='x-small'.",
      },
      {
        name: "display-value",
        type: { text: "string" },
        description:
          "Overrides generated center text with a short custom value while progress, value, max, and tooltip continue to describe the underlying progress.",
      },
      {
        name: "color",
        type: { text: '"positive" | "warning" | "attention"' },
        description:
          "Applies a semantic progress color to the ring indicator. Use for score bands or stateful progress summaries.",
      },
      {
        name: "tooltip",
        type: { text: "string" },
        description:
          "Overrides the embedded tooltip text. When omitted, progress ring derives tooltip text from progress, such as '50% complete', or value/max.",
      },
      {
        name: "tooltip-trigger",
        type: { text: '"hover" | "click"' },
        default: "hover",
        description: "Controls whether the embedded tooltip opens on hover/focus or click/keyboard activation.",
      },
      {
        name: "tooltip-placement",
        type: { text: '"top" | "bottom" | "left" | "right"' },
        default: "top",
        description: "Preferred embedded tooltip placement. The tooltip flips when there is not enough viewport space.",
      },
    ],
    cssProperties: [
      { name: "--progress-track-background", description: "Stroke color of the progress ring track." },
      { name: "--progress-bar-background", description: "Stroke color of the default progress ring indicator." },
      { name: "--progress-bar-background-positive", description: "Stroke color of positive semantic progress ring indicators." },
      { name: "--progress-bar-background-warning", description: "Stroke color of warning semantic progress ring indicators." },
      { name: "--progress-bar-background-attention", description: "Stroke color of attention semantic progress ring indicators." },
    ],
  },
};
