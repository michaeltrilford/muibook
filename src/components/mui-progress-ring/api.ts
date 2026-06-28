export const muiApi = {
  "mui-progress-ring": {
    description:
      "Displays circular determinate progress with optional center content. Use for compact progress summaries in dashboards, cards, tables, and responsive summaries.",
    attributes: [
      { name: "progress", type: { text: "number" }, default: "0", description: "Sets determinate progress, clamped from 0 to 100." },
      { name: "value", type: { text: "number" }, description: "Sets the completed value when using count-based progress." },
      { name: "max", type: { text: "number" }, default: "100", description: "Sets the total value when using count-based progress." },
      { name: "label", type: { text: "string" }, description: "Accessible label for the progress ring." },
      { name: "size", type: { text: '"small" | "medium" | "large"' }, default: "medium", description: "Controls the ring size." },
    ],
    slots: [{ name: "", description: "Optional center content, such as `2/4` or a short percentage." }],
  },
};
