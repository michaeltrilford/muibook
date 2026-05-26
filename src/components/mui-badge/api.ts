export const muiApi = {
  "mui-badge": {
    description: "Displays compact status or metadata labels with semantic variants and size scaling.",
    attributes: [
      {
        name: "variant",
        type: { text: '"neutral" | "positive" | "warning" | "attention" | "overlay"' },
        default: "neutral",
        description: "Sets the badge intent style.",
      },
      {
        name: "size",
        type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Controls the badge scale.",
      },
      {
        name: "usage",
        type: { text: '"slat-end"' },
        description: "Applies layout-specific styling for supported parent patterns.",
      },
    ],
    slots: [{ name: "", description: "Badge text content." }],
    cssProperties: [
      { name: "--badge-radius", description: "Controls the badge corner radius." },
      { name: "--badge-font-weight", description: "Controls the badge text weight." },
    ],
  },
};
