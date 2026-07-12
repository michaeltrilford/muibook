export const muiApi = {
  "mui-time-picker": {
    description: "A time selection input field with an interactive popover.",
    members: [{ kind: "field", name: "value", type: { text: "string" }, description: "Gets or sets the selected time value." }],
    attributes: [
      {
        name: "value",
        type: { text: "string" },
        description: "The selected time value.",
      },
      {
        name: "type",
        type: { text: '"time" | "timeslot"' },
        default: "time",
        description: "The layout of the time picker. 'time' shows scrolling wheels, 'timeslot' shows selectable chips.",
      },
      {
        name: "label",
        type: { text: "string" },
        description: "The label for the input field.",
      },
      {
        name: "hide-label",
        type: { text: "boolean" },
        description: "Visually hides the label while remaining accessible.",
      },
      {
        name: "optional",
        type: { text: "boolean" },
        description: "Displays an (optional) tag next to the label.",
      },
      {
        name: "size",
        type: { text: '"small" | "medium" | "large"' },
        default: "medium",
        description: "The physical size of the input.",
      },
      { name: "padding-block", type: { text: "string" }, description: "Overrides internal Input block padding." },
      { name: "padding-inline", type: { text: "string" }, description: "Overrides internal Input inline padding." },
      {
        name: "variant",
        type: { text: '"default" | "filled" | "ghost"' },
        default: "default",
        description: "The visual variant of the input field.",
      },
      { name: "surface", type: { text: '"default" | "seamless"' }, default: "default", description: "Visual surface style. Seamless removes borders and backgrounds." }
    ],
    slots: [],
    events: [
      { name: "change", description: "Composed, bubbling event dispatched when the selected time value changes with `detail.value`." },
    ],
    methods: [{ name: "focus", description: "Moves focus to the visible picker input." }],
    cssProperties: []
  }
};
