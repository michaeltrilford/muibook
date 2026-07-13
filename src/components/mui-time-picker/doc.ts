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
      designerList: [
        "Any custom time options passed to the slots variant are clear and sequential.",
        "Overridden styles maintain high contrast between selected and unselected time slots.",
      ],
      engineerList: [
        "The component provides native keyboard navigation (Up/Down/Left/Right) within time columns.",
        "The component automatically announces the selected time via standard input bindings.",
      ],
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
          key: "time",
          title: "Time",
          description: "Default type. Shows columnar scrolling lists for hours and minutes.",
        },
        {
          key: "time-slot",
          title: "Time Slot",
          description: "type='timeslot'. Shows a flat list of time chips, perfect for appointments.",
        }
      ],
    },

    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "A composition time picker input with a scrolling wheels popover.",
          "list": [
            "Use Time Picker when users need to enter or choose a specific time."
          ]
        },
        {
          "key": "time-slot",
          "title": "Time Slot",
          "description": "Use type='timeslot' to show discrete time chips.",
          "list": [
            "Use Time Picker when users need to enter or choose a specific time."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Time Picker supports x-small, small, medium, and large input sizes.",
          "list": [
            "Use Time Picker when users need to enter or choose a specific time."
          ]
        }
      ],
    },

    compositions: {
      description: "Time Picker is composed of an Input, Dropdown, and Time component.",
      items: [],
    },

    related: {
      items: [
        { name: "Time", link: "https://guides.muibook.com/time" },
        { name: "Date Picker", link: "https://guides.muibook.com/date-picker" },
        { name: "Dropdown", link: "https://guides.muibook.com/dropdown" },
      ],
    },

    rules: [],

    behaviour: {
      list: [
        "Clicking the trigger opens the dropdown containing the time component.",
        "In slot mode, selecting a time chip immediately updates the value.",
        "In wheel mode, scrolling updates the time selection smoothly.",
      ],
    },

    writing: {
      list: [""],
    },
  },
};
