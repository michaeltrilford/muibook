export const muiApi = {
  "mui-calendar": {
    description: "A flexible, accessible calendar grid for selecting dates.",
    attributes: [
      {
        name: "value",
        type: { text: "string" },
        description: "The selected date in ISO format (YYYY-MM-DD).",
      },
      {
        name: "view",
        type: { text: '"single" | "double"' },
        default: "single",
        description: "Controls whether one or two consecutive months are displayed.",
      },
      {
        name: "min-date",
        type: { text: "string" },
        description: "Optional ISO date string to prevent selection of past dates.",
      },
      {
        name: "max-date",
        type: { text: "string" },
        description: "Optional ISO date string to prevent selection of future dates.",
      }
    ],
    slots: [],
    cssProperties: [
      {
        name: "--calendar-width",
        description: "Controls the width of a single month view.",
      },
      {
        name: "--calendar-day-size",
        description: "Controls the size of individual day buttons.",
      }
    ]
  }
};
