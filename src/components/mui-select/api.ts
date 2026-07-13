export const muiApi = {
  "mui-select": {
    description: "Captures one selection from a supplied option list with label and validation styling.",
    members: [{ kind: "field", name: "value", type: { text: "string" }, description: "Gets or sets the selected option value." }],
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
      {
        name: "appearance",
        type: { text: '"native" | "custom"' },
        default: "native",
        description:
          "Controls the select rendering model. Use `custom` for the experimental native customizable select appearance with rich option content.",
      },
      {
        name: "selected-content",
        type: { text: '"rich" | "label"' },
        default: "rich",
        description:
          "Controls how custom appearance renders the closed selected value. Use `label` when rich picker options should collapse to plain option text in the trigger.",
      },
      {
        name: "col",
        type: { text: "string" },
        default: "1fr",
        description:
          "Custom appearance picker grid columns. The custom picker uses grid layout by default, so `col` maps to `grid-template-columns`.",
      },
      {
        name: "space",
        type: { text: "string" },
        default: "var(--space-100)",
        description: "Custom appearance picker gap between options.",
      },
      {
        name: "max-height",
        type: { text: "string" },
        description: "Optional max height for the custom appearance picker before it scrolls.",
      },
      {
        name: "padding-block",
        type: { text: "string" },
        description: "Custom appearance trigger and option vertical padding. Accepts one or two CSS padding values.",
      },
      {
        name: "padding-inline",
        type: { text: "string" },
        description: "Custom appearance trigger and option horizontal padding. Accepts one or two CSS padding values.",
      },
      { name: "optional", type: { text: "boolean" }, default: "false", description: "Displays an optional marker beside the label." },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Select size scale.",
      },
      {
        name: "surface",
        type: { text: '"default" | "seamless"' },
        default: "default",
        description: "Visual surface style. Seamless removes borders and backgrounds.",
      },
    ],
    events: [
      { name: "input", description: "Composed, bubbling event dispatched during selection updates with `detail.value`." },
      { name: "change", description: "Composed, bubbling event dispatched when the selected option changes with `detail.value`." },
    ],
    methods: [{ name: "focus", description: "Moves focus to the internal native select." }],
    cssProperties: [
      { name: "--select-focus-outline", description: "Overrides the size-specific focus outline, including `none` when another visible focus treatment is provided." },
    ],
  },
};
