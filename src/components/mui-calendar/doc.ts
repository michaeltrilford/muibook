import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Calendar: {
    title: "Calendar",
    description: "The Calendar allows users to view and select dates.",

    hero: [],
    figma: [],
    storybook: [],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-calendar"],
    website: ["https://muibook.com/calendar"],
    guides: ["https://guides.muibook.com/calendar"],

    usage: {
      list: [
        "Use the Calendar to allow users to select a single date.",
        "Provide a double view when selecting date ranges or comparing distant dates.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image: "",
      list: [
        "Header: Navigation controls to move between months and years.",
        "Grid Header: The days of the week.",
        "Grid Body: The selectable days of the month.",
      ],
    },

    variants: {
      items: [],
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
