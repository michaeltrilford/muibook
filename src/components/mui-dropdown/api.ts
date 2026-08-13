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
        name: "usage",
        type: { text: '"header-bar"' },
        description: "Inherits Header Bar size when size is not explicitly authored and applies Header Bar usage to the trigger Button.",
      },
      {
        name: "zindex",
        type: { text: "string | number" },
        default: "1",
        description: "Stacking level applied within the resolved portal root. Dropdowns in an open native dialog are promoted to the browser top layer; z-index only orders content within that context.",
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
      { name: "", description: "A required `mui-menu` surface containing menu actions and grouped overlay content. Width is optional; a portaled Menu without it uses a viewport-safe 18rem fallback that preserves its usable measure when inset padding is present." },
    ],
    events: [
      { name: "dropdown-toggle", description: "Dispatched when the dropdown opens or closes with `detail.open`." },
    ],
    cssProperties: [
      { name: "--dropdown-offset", description: "Default vertical distance used when the `offset` attribute is absent." },
    ],
  },
};
