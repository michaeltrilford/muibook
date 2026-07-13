import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Time: {
    title: "Time",
    description: "The Time component allows users to select a specific time of day.",

    hero: [],
    figma: [],
    storybook: [],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-time"],
    website: ["https://muibook.com/time"],
    guides: ["https://guides.muibook.com/time"],
    usage: {
      list: [
        "Use the Time component when a specific hour and minute is required.",
        "Can be formatted to 12h or 24h formats based on region.",
      ],
    },
    accessibility: {
      designerList: [
        "The component natively sizes time slots to be large enough for reliable touch targets.",
        "Overridden styles clearly distinguish selected slots from unavailable slots.",
      ],
      engineerList: [
        "The component automatically handles arrow key navigation between time slots or wheels.",
        "The component natively prevents disabled slots from receiving keyboard focus.",
      ],
    },

    anatomy: {
      image: "",
      list: [
        "Hours Column: Scrolling list of hours.",
        "Minutes Column: Scrolling list of minutes, configurable by steps.",
        "AM/PM Column: Scrolling list for meridiem selection in 12h format.",
      ],
    },

    variants: {
      items: [
        {
          key: "wheels",
          title: "Wheels",
          description: "A columnar, scrolling picker (the default variant) suitable for desktop or dense layouts.",
        },
        {
          key: "slots",
          title: "Slots",
          description: "A chip-based layout for time slots, suitable for quick selection from a limited set of options (e.g. appointment times).",
        }
      ],
    },

    stories: {
      items: [
        {
          "key": "default-dial",
          "title": "Default (Dial)",
          "description": "The default time picker uses a scrolling wheel dial interface.",
          "list": [
            "Use Time for a dial or predefined time-slot selection experience."
          ]
        },
        {
          "key": "time-slots",
          "title": "Time Slots",
          "description": "Use variant='slots' to show discrete time chips.",
          "list": [
            "Use Time for a dial or predefined time-slot selection experience."
          ]
        }
      ],
    },

    compositions: {
      description: "Time Picker can be composed with a Calendar to form a Date Picker.",
      items: [],
    },

    related: {
      items: [
        { name: "Time Picker", link: "https://guides.muibook.com/time-picker" },
        { name: "Date Picker", link: "https://guides.muibook.com/date-picker" },
        { name: "Calendar", link: "https://guides.muibook.com/calendar" },
      ],
    },

    rules: [],

    behaviour: {
      list: [
        "Users can scroll the wheels to select hours and minutes.",
        "In slot mode, clicking a chip selects that specific time.",
        "The component automatically formats to 12h or 24h based on locale settings.",
      ],
    },

    writing: {
      list: [""],
    },
  },
};
