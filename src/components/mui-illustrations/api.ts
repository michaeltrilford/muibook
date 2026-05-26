export const muiApi = {
  "mui-illustration-trash": {
    description: "Representative API for Muibook illustration elements.",
    attributes: [
      {
        name: "size",
        type: { text: '"small" | "medium" | "large" | "x-large"' },
        default: "medium",
        description: "Sets the illustration footprint.",
      },
      {
        name: "color",
        type: { text: '"default" | "inverted" | string' },
        default: "default",
        description: "Sets an illustration color preset or accepts any valid CSS color.",
      },
    ],
    cssProperties: [
      { name: "--illustration-main-color-default", description: "Primary color used by default illustrations." },
      { name: "--illustration-main-color-inverted", description: "Primary color used by inverted illustrations." },
    ],
  },
};
