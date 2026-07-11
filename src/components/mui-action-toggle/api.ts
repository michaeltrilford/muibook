export const muiApi = {
  "mui-action-toggle": {
    description: "Switches a prompt action between its compact trigger and expanded active content.",
    attributes: [
      {
        name: "mode",
        type: { text: '"icon" | "chip"' },
        default: "icon",
        description: "Shows collapsed trigger content in icon mode and active, chip, close, or spinner content in chip mode.",
      },
    ],
    slots: [
      {
        name: "",
        description: "Prompt action controls marked with `context-toggle`, `context-active`, `context-chip`, `context-close`, or `context-spinner`.",
      },
    ],
  },
};
