import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  TimePicker: {
    title: "Time Picker",
    description: "The Time Picker allows users to enter a time via an input field and interactive popover.",

    hero: [],
    figma: [],
    storybook: [],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-time-picker"],
    website: ["https://muibook.com/time-picker"],
    guides: ["https://guides.muibook.com/time-picker"],

    usage: {
      list: [
        "Use the Time Picker when you need users to input a time in a form.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image: "",
      list: [
        "Input: The field showing the selected time.",
        "Dropdown: The popover containing the mui-time UI.",
      ],
    },

    variants: {
      items: [
        {
          title: "Time",
          description: "Default type. Shows columnar scrolling lists for hours and minutes.",
        },
        {
          title: "Time Slot",
          description: "type='timeslot'. Shows a flat list of time chips, perfect for appointments.",
        }
      ],
    },

    compositions: {
      description: "Time Picker is composed of an Input, Dropdown, and Time component.",
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
