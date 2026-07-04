export const muiApi = {
  "mui-date-picker": {
    description: "A composed date and time picker input.",
    members: [{ kind: "field", name: "value", type: { text: "string" }, description: "Gets or sets the selected date or date-time value." }],
    attributes: [
      {
        name: "value",
        type: { text: "string" },
        description: "The selected date/time value.",
      },
      {
        name: "type",
        type: { text: '"date" | "datetime" | "datetimeslot"' },
        default: "date",
        description: "The layout of the picker. 'date' shows just a calendar, 'datetime' and 'datetimeslot' show a calendar and a time slot selection.",
      },
      {
        name: "label",
        type: { text: "string" },
        description: "Label for the input field.",
      },
      {
        name: "size",
        type: { text: '"x-small" | "small" | "medium" | "large"' },
        default: "medium",
        description: "Size of the input field.",
      }
    ],
    slots: [],
    events: [
      { name: "change", description: "Composed, bubbling event dispatched when the selected date or date-time value changes with `detail.value`." },
    ],
    methods: [{ name: "focus", description: "Moves focus to the visible picker input." }],
    cssProperties: []
  }
};
