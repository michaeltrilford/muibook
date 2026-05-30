export const muiApi = {
  "mui-chip": {
    description: "Displays a compact interactive label for selections, tags, filters, or removable values.",
    attributes: [
      {
        name: "active",
        type: { text: "boolean" },
        default: "false",
        description: "Displays the active or selected state.",
      },
      {
        name: "dismiss",
        type: { text: "boolean" },
        default: "false",
        description: "Displays a dismiss action and dispatches `dismiss` when activated.",
      },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Controls chip sizing and automatic slotted icon and text scale. Chip labels truncate when constrained.",
      },
      {
        name: "disabled",
        type: { text: "boolean" },
        default: "false",
        description: "Disables interactive and dismiss behaviour.",
      },
      {
        name: "variant",
        type: { text: '"clickable" | "ghost"' },
        default: "clickable",
        description: "Selects the interactive surface treatment.",
      },
      {
        name: "usage",
        type: { text: '"input"' },
        description: "Adapts chip radius and shell treatment when composed with an input.",
      },
    ],
    slots: [
      { name: "", description: "Chip label content." },
      { name: "before", description: "Leading icon, badge, or avatar content." },
      { name: "after", description: "Trailing icon, badge, or avatar content when dismiss is not enabled." },
    ],
    events: [
      { name: "dismiss", description: "Dispatched when the built-in dismiss action is activated; includes the chip id." },
    ],
  },
};
