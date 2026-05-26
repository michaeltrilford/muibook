export const muiApi = {
  "mui-tab-bar": {
    description: "Groups related tab items and renders an active selection highlight.",
    attributes: [
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Size applied to child tab items." },
      { name: "variant", type: { text: '"default" | "dots" | "ghost"' }, default: "default", description: "Visual treatment for the tab bar and its children." },
      { name: "orientation", type: { text: '"horizontal" | "vertical"' }, default: "horizontal", description: "ARIA orientation and keyboard navigation axis." },
      { name: "speed", type: { text: "string" }, default: "200", description: "Active indicator transition duration in milliseconds." },
      { name: "full-width", type: { text: "boolean" }, default: "false", description: "Expands the tab bar across the available width." },
      { name: "controlsPosition", type: { text: '"top" | "right" | "bottom" | "left" | "top-right" | "top-left" | "bottom-right" | "bottom-left"' }, default: "bottom", description: "Positions tab controls when the tab bar is slotted into a `mui-carousel-controller`." },
    ],
    slots: [{ name: "", description: "Tab items controlled by the tab bar." }],
    events: [{ name: "tab-change", description: "Dispatched when the active tab changes." }],
    cssProperties: [
      { name: "--tab-shadow-active-color", description: "Default color used to construct the active highlight shadow." },
      { name: "--tab-shadow-active", description: "Full box-shadow value for the active tab highlight, allowing geometry and color overrides." },
    ],
  },
  "mui-tab-controller": {
    description: "Coordinates a tab bar and related tab panels by matching selected tab IDs to panel item values.",
    slots: [{ name: "", description: "A `mui-tab-bar` followed by related `mui-tab-panel` elements." }],
  },
  "mui-tab-item": {
    description: "Interactive tab label controlled by a parent `mui-tab-bar`.",
    attributes: [
      { name: "active", type: { text: "boolean" }, default: "false", description: "Marks the selected tab item." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Tab item size, normally forwarded by `mui-tab-bar`." },
      { name: "variant", type: { text: '"default" | "dots" | "ghost"' }, default: "default", description: "Tab item presentation, normally forwarded by `mui-tab-bar`." },
      { name: "id", type: { text: "string" }, description: "Identifier matched by a related `mui-tab-panel[item]`." },
    ],
    slots: [
      { name: "", description: "Visible tab label." },
      { name: "before", description: "Optional leading icon, badge or custom affordance." },
      { name: "after", description: "Optional trailing icon, badge or custom affordance." },
    ],
  },
  "mui-tab-panel": {
    description: "Displays content associated with the selected tab item inside `mui-tab-controller`.",
    members: [{ kind: "field", name: "item", type: { text: "string | null" }, description: "Gets or sets the matching tab item identifier." }],
    attributes: [{ name: "item", type: { text: "string" }, description: "ID of the `mui-tab-item` whose selection displays this panel." }],
    slots: [{ name: "", description: "Panel content." }],
    cssProperties: [{ name: "--tab-panel-padding", description: "Inner padding applied to panel content." }],
  },
};
