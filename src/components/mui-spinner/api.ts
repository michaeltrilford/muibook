export const muiApi = {
  "mui-spinner": {
    description: "Shows an indeterminate loading spinner with scalable size, color, and timing control.",
    attributes: [
      {
        name: "size",
        type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Controls the spinner dimensions.",
      },
      { name: "color", type: { text: "string" }, default: "var(--icon-color-default)", description: "Overrides the spinner stroke color." },
      { name: "duration", type: { text: "string" }, default: "0.8s", description: "Controls the spinner rotation speed." },
      { name: "label", type: { text: "string" }, default: "Loading", description: "Provides an accessible label for assistive technology." },
    ],
  },
};
