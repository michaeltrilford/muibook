export const muiApi = {
  "mui-illustration-trash": {
    description: "Representative API for Muibook illustration elements.",
    members: [
      { kind: "method", name: "play", description: "Starts particle motion. A static illustration switches to one-shot motion." },
      { kind: "method", name: "pause", description: "Pauses the current particle animation." },
      { kind: "method", name: "restart", description: "Restarts the current one-shot or looping particle animation." },
    ],
    attributes: [
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large" | "x-large"' },
        default: "medium",
        description: "Sets the illustration footprint.",
      },
      {
        name: "color",
        type: { text: '"default" | "inverted" | string' },
        default: "default",
        description: "Sets an illustration color preset or accepts any valid CSS color.",
      },
      {
        name: "motion",
        type: { text: '"none" | "once" | "loop"' },
        default: "none",
        description: "Controls optional particle motion without animating the primary illustration subject.",
      },
    ],
    cssProperties: [
      { name: "--illustration-main-color-default", description: "Primary color used by default illustrations." },
      { name: "--illustration-main-color-inverted", description: "Primary color used by inverted illustrations." },
    ],
  },
};
