export const muiApi = {
  "mui-range-input": {
    description: "Selects a numeric value on a range track with optional formatted value feedback.",
    members: [{ kind: "field", name: "value", type: { text: "number" }, description: "Gets or sets the numeric range value." }],
    attributes: [
      { name: "min", type: { text: "number | string" }, default: "0", description: "Minimum permitted value." },
      { name: "max", type: { text: "number | string" }, default: "100", description: "Maximum permitted value." },
      { name: "value", type: { text: "number | string" }, default: "0", description: "Current numeric value." },
      { name: "step", type: { text: "number | string" }, default: "1", description: "Permitted value increment." },
      { name: "disabled", type: { text: "boolean" }, default: "false", description: "Disables range interaction." },
      { name: "bubble", type: { text: "boolean" }, default: "false", description: "Displays value feedback while the control is hovered, focused or dragged." },
      { name: "bubble-format", type: { text: '"number" | "time"' }, default: "number", description: "Formats the feedback bubble as a number or `m:ss` time." },
      { name: "label", type: { text: "string" }, default: "Range input", description: "Accessible label for the internal range input." },
    ],
    events: [
      { name: "input", description: "Composed, bubbling event dispatched while the value changes with numeric `detail.value`." },
      { name: "change", description: "Composed, bubbling event dispatched when value interaction commits with numeric `detail.value`." },
    ],
    methods: [{ name: "focus", description: "Moves focus to the internal native range input." }],
    cssProperties: [
      { name: "--range-input-accent-color", description: "Track/thumb accent color." },
      { name: "--range-input-bubble-background", description: "Feedback bubble background." },
      { name: "--range-input-bubble-border-color", description: "Feedback bubble border color." },
    ],
  },
};
