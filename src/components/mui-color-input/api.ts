export const muiApi = {
  "mui-color-input": {
    description: "Captures a hexadecimal colour value through a native colour picker with accessible labelling and supporting guidance.",
    members: [
      {
        kind: "field",
        name: "value",
        type: { text: "string" },
        description: "Gets or sets the current six-digit hexadecimal colour value.",
      },
    ],
    attributes: [
      { name: "value", type: { text: "string" }, default: "#000000", description: "Current six-digit hexadecimal colour value." },
      { name: "name", type: { text: "string" }, description: "Form field name forwarded to the native colour input." },
      { name: "id", type: { text: "string" }, description: "Input identifier used to associate the visible label and supporting description." },
      { name: "label", type: { text: "string" }, default: "Colour", description: "Accessible label displayed above the colour control." },
      {
        name: "description",
        type: { text: "string" },
        description: "Persistent supporting text displayed between the label and colour control and associated with the native input.",
      },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Colour control and supporting text size scale.",
      },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables colour selection." },
      {
        name: "hide-label",
        type: { text: "boolean" },
        default: "false",
        description: "Visually hides the supplied label while preserving it as the accessible name.",
      },
      {
        name: "hide-value",
        type: { text: "boolean" },
        default: "false",
        description: "Visually hides the hexadecimal text inside the control, presenting a clean solid colour surface.",
      },
      {
        name: "hide-text",
        type: { text: "boolean" },
        default: "false",
        description: "Alias for `hide-value`.",
      },
      {
        name: "gap",
        type: { text: "string" },
        default: "var(--space-400)",
        description: "Spacing between the color control and slotted before/after elements.",
      },
      {
        name: "no-copy",
        type: { text: "boolean" },
        default: "false",
        description: "Disables the default click-to-copy interaction on the displayed colour code.",
      },
      {
        name: "copyable",
        type: { text: "boolean" },
        default: "true",
        description: "Enables clicking the displayed colour code to copy it to clipboard (enabled by default).",
      },
    ],
    slots: [
      {
        name: "description",
        description: "Rich supporting content displayed between the label and control. Prefer `mui-body`; it replaces the description attribute fallback.",
      },
      {
        name: "before",
        description: "Companion elements rendered before the color control, separated by the configured gap.",
      },
      {
        name: "after",
        description: "Companion elements rendered after the color control, separated by the configured gap (e.g. preview avatar, typography sample, icon).",
      },
    ],
    events: [
      { name: "input", description: "Composed, bubbling event dispatched while the native colour value changes with `detail.value`." },
      { name: "change", description: "Composed, bubbling event dispatched when colour selection commits with `detail.value`." },
      { name: "copy", description: "Composed, bubbling event dispatched when the colour value is copied to the clipboard with `detail.value`." },
    ],
    methods: [
      { name: "focus", description: "Moves focus to the internal native colour input." },
      { name: "blur", description: "Removes focus from the internal native colour input." },
    ],
  },
};
