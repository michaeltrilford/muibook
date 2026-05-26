export const muiApi = {
  "mui-chip-input": {
    description: "Captures multiple selected values as removable chips with optional searchable or custom additions.",
    members: [
      { kind: "field", name: "value", type: { text: "ChipInputOption[]" }, description: "Gets or sets selected option objects." },
    ],
    attributes: [
      { name: "id", type: { text: "string" }, description: "Identifier linked with the internal labelled input." },
      { name: "label", type: { text: "string" }, description: "Visible and accessible field label." },
      { name: "hide-label", type: { text: "boolean" }, default: "false", description: "Visually hides the label while preserving accessibility." },
      { name: "placeholder", type: { text: "string" }, default: "Type to add", description: "Placeholder displayed in the entry field." },
      {
        name: "options",
        type: { text: "string" },
        default: "[]",
        description: "JSON array or comma-separated options. Objects support `value`, `label` and additional metadata.",
      },
      {
        name: "value",
        type: { text: "string" },
        default: "[]",
        description: "JSON array or comma-separated selected values. Object metadata is preserved in change events.",
      },
      { name: "allow-custom", type: { text: "boolean" }, default: "false", description: "Allows entry of values not supplied in `options`." },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables entry and chip interaction." },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Size scale shared by the internal input and selected chips.",
      },
      { name: "name", type: { text: "string" }, description: "Form field name." },
      { name: "placement", type: { text: '"before" | "after"' }, default: "before", description: "Places selected chips before or after the entry field." },
      { name: "mobile-stack", type: { text: "boolean" }, default: "false", description: "Always stacks chip content and entry field." },
      { name: "breakpoint", type: { text: "number | string" }, description: "Pixel breakpoint at which the layout stacks." },
    ],
    events: [
      { name: "chip-input-query-change", description: "Dispatched while query text changes with `detail.query`." },
      { name: "chip-input-change", description: "Dispatched after selected chips change with action, values, items, added and removed detail." },
      { name: "input", description: "Compatibility change event carrying the same selected-chip detail as `chip-input-change`." },
      { name: "change", description: "Compatibility change event carrying the same selected-chip detail as `chip-input-change`." },
    ],
    cssProperties: [
      { name: "--chip-input-background", description: "Background of the composed chip entry surface." },
      { name: "--chip-input-shell-border", description: "Border applied to the composed chip entry surface." },
      { name: "--chip-input-before-max-width", description: "Maximum selected-chip area width before the entry field." },
      { name: "--chip-input-after-max-width", description: "Maximum selected-chip area width after the entry field." },
    ],
  },
};
