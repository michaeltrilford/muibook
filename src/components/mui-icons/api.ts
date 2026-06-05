export const muiApi = {
  "mui-icon-add": {
    description: "Representative API for Muibook icon glyph elements.",
    attributes: [
      {
        name: "size",
        type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large"' },
        default: "small",
        description: "Sets the icon footprint.",
      },
      {
        name: "color",
        type: { text: '"default" | "inverted" | string' },
        default: "default",
        description: "Sets an icon color preset or accepts any valid CSS color.",
      },
    ],
  },
  "mui-icon-toggle": {
    description: "Transitions between two slotted icons to communicate an active or expanded state.",
    attributes: [
      {
        name: "toggle",
        type: { text: "boolean" },
        default: "false",
        description: "Displays the end icon instead of the start icon.",
      },
      {
        name: "rotate",
        type: { text: "boolean" },
        default: "false",
        description: "Rotates the icon when switching state.",
      },
      {
        name: "size",
        type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large"' },
        default: "medium",
        description: "Sets the icon toggle footprint.",
      },
    ],
    slots: [
      { name: "start", description: "Icon displayed when the toggle is inactive." },
      { name: "end", description: "Icon displayed when the toggle is active." },
    ],
  },
};
