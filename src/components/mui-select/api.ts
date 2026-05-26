export const muiApi = {
  "mui-select": {
    description: "Captures one selection from a supplied option list with label and validation styling.",
    attributes: [
      { name: "name", type: { text: "string" }, description: "Form field name." },
      { name: "value", type: { text: "string" }, default: "", description: "Value of the selected option." },
      { name: "id", type: { text: "string" }, description: "Select identifier used to associate the visible label." },
      { name: "label", type: { text: "string" }, description: "Accessible select label." },
      {
        name: "options",
        type: { text: "string" },
        default: "[]",
        description: "JSON-encoded array of options, each containing `value` and `label`.",
      },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables selection interaction." },
      {
        name: "hide-label",
        type: { text: "boolean" },
        default: "false",
        description: "Visually hides the supplied label while preserving it as the accessible name.",
      },
      {
        name: "variant",
        type: { text: '"default" | "success" | "warning" | "error"' },
        default: "default",
        description: "Visual validation state.",
      },
      { name: "optional", type: { text: "boolean" }, default: "false", description: "Displays an optional marker beside the label." },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Select size scale.",
      },
    ],
    events: [
      { name: "input", description: "Dispatched during selection updates with `detail.value`." },
      { name: "change", description: "Dispatched when the selected option changes with `detail.value`." },
    ],
  },
};
