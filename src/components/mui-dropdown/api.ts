export const muiApi = {
  "mui-dropdown": {
    description: "Displays a triggered overlay menu with configurable alignment, direction, and persistent interaction behaviour.",
    attributes: [
      {
        name: "zindex",
        type: { text: "string | number" },
        default: "1",
        description: "Stacking level applied to the dropdown menu surface.",
      },
      {
        name: "position",
        type: { text: '"left" | "center" | "right"' },
        default: "left",
        description: "Horizontal menu alignment relative to its trigger.",
      },
      {
        name: "vertical-position",
        type: { text: '"auto" | "up" | "down"' },
        default: "auto",
        description: "Preferred vertical direction with viewport-aware fallback.",
      },
      {
        name: "persistent",
        type: { text: "boolean" },
        default: "false",
        description: "Keeps the menu open while users interact with slotted menu content.",
      },
    ],
    slots: [
      { name: "action", description: "Dropdown trigger, typically a `mui-button`." },
      { name: "", description: "Menu contents, typically `mui-button` options and separating rules." },
    ],
    events: [
      { name: "dropdown-toggle", description: "Dispatched when the dropdown opens or closes with `detail.open`." },
    ],
    cssProperties: [
      { name: "--dropdown-offset", description: "Vertical distance between the trigger and menu surface." },
      { name: "--dropdown-min-width", description: "Minimum menu width." },
    ],
  },
};
