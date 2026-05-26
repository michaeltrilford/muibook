export const muiApi = {
  "mui-textarea": {
    description: "Captures multi-line text with label, validation state, visible rows and optional character counting.",
    attributes: [
      { name: "name", type: { text: "string" }, description: "Form field name." },
      { name: "value", type: { text: "string" }, default: "", description: "Current textarea value." },
      { name: "placeholder", type: { text: "string" }, description: "Hint displayed when no value is entered." },
      { name: "id", type: { text: "string" }, description: "Textarea identifier used to associate the visible label." },
      { name: "label", type: { text: "string" }, description: "Accessible textarea label." },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables text entry." },
      { name: "hide-label", type: { text: "boolean" }, default: "false", description: "Visually hides the supplied label while preserving it as the accessible name." },
      { name: "variant", type: { text: '"default" | "success" | "warning" | "error"' }, default: "default", description: "Visual validation state." },
      { name: "rows", type: { text: "number | string" }, default: "4", description: "Initial visible row count." },
      { name: "optional", type: { text: "boolean" }, default: "false", description: "Displays an optional marker beside the label." },
      { name: "max-length", type: { text: "number | string" }, description: "Maximum character length. Providing it displays a live count." },
      { name: "size", type: { text: '"x-small" | "small" | "medium" | "large"' }, default: "medium", description: "Textarea size scale." },
    ],
    events: [
      { name: "input", description: "Dispatched during value entry with `detail.value`." },
      { name: "change", description: "Dispatched when the native textarea change event occurs with `detail.value`." },
    ],
  },
};
