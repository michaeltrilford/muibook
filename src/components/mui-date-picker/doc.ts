import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  DatePicker: {
    title: "Date Picker",
    description: "The Date Picker combines the Calendar and Time Picker into a dropdown input.",

    hero: [],
    figma: [],
    storybook: [],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-date-picker"],
    website: ["https://muibook.com/date-picker"],
    guides: ["https://guides.muibook.com/date-picker"],

    usage: {
      list: [
        "Use the Date Picker when users need to input dates or dates with timeslots in a form.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image: "",
      list: [
        "Input Trigger: Displays the current value and opens the dropdown.",
        "Popover: Contains the Calendar and/or Time Picker depending on the configured type.",
      ],
    },

    variants: {
      items: [
        {
          title: "Date",
          description: "Default type. Shows just the calendar.",
        },
        {
          title: "Date & Timeslot",
          description: "type='datetimeslot'. Shows the calendar alongside a list of time chips, perfect for scheduling appointments.",
        }
      ],
    },

    compositions: {
      description: "",
      items: [],
    },

    related: {
      items: [],
    },

    rules: [],

    behaviour: {
      list: [""],
    },

    writing: {
      list: [""],
    },
  },
};
