export const muiApi = {
  "mui-time": {
    description: "A scrolling columnar interface for selecting a specific time of day.",
    attributes: [
      {
        name: "value",
        type: { text: "string" },
        description: "The selected time. Format depends on `format` attribute (e.g. '14:30' or '02:30 PM').",
      },
      {
        name: "format",
        type: { text: '"12h" | "24h"' },
        default: "12h",
        description: "Controls the display and value format of the time.",
      },
      {
        name: "step",
        type: { text: "string" },
        default: "1",
        description: "The interval size for the minutes column (e.g., '15' for 00, 15, 30, 45).",
      },
      {
        name: "variant",
        type: { text: '"wheels" | "slots"' },
        default: '"wheels"',
        description: "The visual layout of the time picker. 'wheels' shows columnar scrolling lists, 'slots' shows a flat list of time chips.",
      },
      {
        name: "start",
        type: { text: "string" },
        default: "00:00",
        description: "The start time for the 'slots' variant (e.g. '09:00').",
      },
      {
        name: "end",
        type: { text: "string" },
        default: "23:59",
        description: "The end time for the 'slots' variant (e.g. '17:00').",
      },
      {
        name: "header",
        type: { text: "string" },
        description: "An optional header string displayed above the time slots.",
      }
    ],
    slots: [],
    cssProperties: [
      {
        name: "--time-picker-height",
        description: "Controls the overall height of the scrolling columns.",
      },
      {
        name: "--time-item-height",
        description: "Controls the height of individual time slots in the columns.",
      }
    ]
  }
};
