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
      designerList: [
        "The label clearly conveys the input's required format and purpose.",
        "The component natively avoids relying solely on color to indicate the current date or selected state in the popover.",
      ],
      engineerList: [
        "When composing, the trigger input has an appropriate aria-label if a visible label is not used.",
        "The popover automatically traps focus when open and supports ESC to close.",
      ],
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
          key: "date",
          title: "Date",
          description: "Default type. Shows just the calendar.",
        },
        {
          key: "date-timeslot",
          title: "Date & Timeslot",
          description: "type='datetime' or type='datetimeslot'. Shows the calendar alongside a list of time chips, perfect for scheduling appointments.",
        }
      ],
    },

    compositions: {
      description: "",
      items: [],
    },

    related: {
      items: [
        { name: "Calendar", link: "https://guides.muibook.com/calendar" },
        { name: "Time Picker", link: "https://guides.muibook.com/time-picker" },
        { name: "Input", link: "https://guides.muibook.com/input" },
      ],
    },

    rules: [],

    behaviour: {
      list: [
        "Clicking the trigger opens the dropdown containing the calendar and optional time picker.",
        "Clicking outside the popover closes it.",
        "Selecting a date automatically updates the input to a human-readable display string.",
      ],
    },

    writing: {
      list: [""],
    },
  },
};
