export const muiApi = {
  "mui-table": {
    description: "Groups row collections into an accessible table layout.",
    slots: [{ name: "", description: "Related `mui-row-group` children." }],
  },
  "mui-row-group": {
    description: "Groups related table rows and optionally presents them as a heading region.",
    attributes: [
      { name: "heading", type: { text: "boolean" }, default: "false", description: "Applies header row styling to the contained rows." },
    ],
    slots: [{ name: "", description: "Related `mui-row` children." }],
  },
  "mui-row": {
    description: "Arranges table cells in a configurable column grid.",
    attributes: [
      { name: "columns", type: { text: "string" }, description: "Sets column sizing using any valid `grid-template-columns` value." },
      { name: "size", type: { text: '"xx-small" | "x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Sets row cell typography and action-column sizing." },
    ],
    slots: [{ name: "", description: "Related `mui-cell` children." }],
    cssProperties: [
      { name: "--row-action-size", description: "Resolved square action-cell size for the current row." },
      { name: "--row-min-height", description: "Minimum row height." },
    ],
  },
  "mui-cell": {
    description: "Displays content inside a table row with optional checkbox or action-column alignment.",
    attributes: [
      { name: "align-y", type: { text: "string" }, default: "initial", description: "Sets vertical alignment using any valid CSS `align-self` value." },
      { name: "action", type: { text: "boolean" }, default: "false", description: "Aligns a final-column action control using the parent row action size." },
      { name: "checkbox", type: { text: "boolean" }, default: "false", description: "Applies compact alignment for a checkbox column." },
    ],
    slots: [{ name: "", description: "Cell text or component content." }],
  },
};
