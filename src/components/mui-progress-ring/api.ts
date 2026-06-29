export const muiApi = {
  "mui-progress-ring": {
    description:
      "Displays circular determinate progress with generated center text. Use for compact progress summaries in dashboards, cards, tables, and responsive summaries.",
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
        type: { text: '"auto" | "fraction" | "percent" | "value" | "none"' },
        default: "auto",
        description:
          "Controls the generated center text. Auto shows value/max fractions, hides plain progress values, and uses a checkmark at completion. Ignored for size='x-small'.",
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
  },
};
