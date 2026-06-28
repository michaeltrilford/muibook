export const muiApi = {
  "mui-input": {
    description: "Captures a single text-like form value with label, validation state and composable affordance slots.",
    attributes: [
      {
        name: "type",
        type: { text: '"text" | "password" | "email" | "number" | "search" | "tel" | "url" | "date" | "time" | "datetime-local" | "month" | "week"' },
        default: "text",
        description: "Native input data type.",
      },
      { name: "name", type: { text: "string" }, description: "Form field name." },
      { name: "value", type: { text: "string" }, default: "", description: "Current input value." },
      { name: "placeholder", type: { text: "string" }, description: "Hint displayed when no value is entered." },
      { name: "id", type: { text: "string" }, description: "Input identifier used to associate the visible label." },
      { name: "label", type: { text: "string" }, description: "Accessible input label. Required for labelled form usage." },
      {
        name: "disabled",
        type: { text: "boolean" },
        default: "false",
        description: "Disables input interaction.",
      },
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
      {
        name: "optional",
        type: { text: "boolean" },
        default: "false",
        description: "Displays an optional marker beside the label.",
      },
      {
        name: "max-length",
        type: { text: "number | string" },
        description: "Maximum character length. Providing it displays a live count.",
      },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Input and slotted affordance size scale.",
      },
      {
        name: "slot-layout",
        type: { text: '"inline" | "stack-mobile"' },
        default: "inline",
        description: "Arranges external before and after slots inline or stacked around the input.",
      },
      {
        name: "autofocus",
        type: { text: "boolean" },
        default: "false",
        description: "Focuses the input after it renders.",
      },
    ],
    slots: [
      { name: "before", description: "Flush leading control, such as `mui-addon`, `mui-select`, `mui-button` or `mui-chip`." },
      { name: "after", description: "Flush trailing control, such as `mui-addon`, `mui-select`, `mui-button` or `mui-chip`." },
      { name: "inside-before", description: "Leading content displayed inside the input edge, such as an icon or badge." },
      { name: "inside-after", description: "Trailing content displayed inside the input edge, such as an icon or badge." },
      { name: "hint", description: "Contextual hint content displayed inside the trailing input affordance area." },
    ],
    events: [
      { name: "input", description: "Dispatched during value entry with `detail.value`." },
      { name: "change", description: "Dispatched when the native input change event occurs with `detail.value`." },
    ],
    cssProperties: [
      { name: "--input-before-slot-max-width", description: "Maximum width for leading external slot content." },
      { name: "--input-after-slot-max-width", description: "Maximum width for trailing external slot content." },
      { name: "--input-slot-wrap", description: "Wrapping behaviour for external slot content." },
      { name: "--input-slot-overflow-x", description: "Horizontal overflow behaviour for external slot content." },
    ],
  },
};
