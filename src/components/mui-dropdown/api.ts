export const muiApi = {
  "mui-dropdown": {
    description: "Displays a triggered overlay menu with configurable alignment, direction, and persistent interaction behaviour.",
    attributes: [
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Enforces a shared size on the trigger action and slotted `mui-menu` surface.",
      },
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
      {
        name: "offset",
        type: { text: "string" },
        description: "Vertical distance between the trigger and menu. Accepts any valid CSS length, including tokens and `calc()`.",
      },
    ],
    slots: [
      { name: "action", description: "Dropdown trigger, typically a `mui-button`." },
      { name: "", description: "A required `mui-menu` surface containing menu actions and grouped overlay content. Menus without an explicit width use min(100%, 18rem) while portaled." },
    ],
    events: [
      { name: "dropdown-toggle", description: "Dispatched when the dropdown opens or closes with `detail.open`." },
    ],
    cssProperties: [
      { name: "--dropdown-offset", description: "Default vertical distance used when the `offset` attribute is absent." },
    ],
  },
};
