export const muiApi = {
  "mui-date-picker": {
    description: "A composed date and time picker input.",
    attributes: [
      {
        name: "value",
        type: { text: "string" },
        description: "The selected date/time value.",
      },
      {
        name: "type",
        type: { text: '"date" | "datetimeslot"' },
        default: "date",
        description: "The layout of the picker. 'date' shows just a calendar, 'datetimeslot' shows a calendar and a time slot selection.",
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
    cssProperties: []
  }
};
