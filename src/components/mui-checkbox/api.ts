export const muiApi = {
  "mui-checkbox": {
    description: "Selects a boolean or indeterminate option with optional slotted label content.",
    members: [{ kind: "field", name: "checked", type: { text: "boolean" }, description: "Gets or sets the checked state." }],
    attributes: [
      { name: "checked", type: { text: "boolean" }, default: "false", description: "Controls selected state." },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables checkbox interaction." },
      { name: "id", type: { text: "string" }, description: "Identifier for the internal checkbox control." },
      { name: "indeterminate", type: { text: "boolean" }, default: "false", description: "Displays a mixed selection state until the user selects a value." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Checkbox control and label size scale." },
    ],
    slots: [{ name: "", description: "Visible label content for the checkbox." }],
    events: [{ name: "change", description: "Dispatched when user interaction changes state with `detail.checked`." }],
  },
};
