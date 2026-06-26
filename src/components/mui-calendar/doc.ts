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
      designerList: [
        "When overriding theme colors, the contrast of today's date and the selected date still meets WCAG AA standards.",
        "The component inherently avoids using only color to indicate selection, providing a solid background shape.",
      ],
      engineerList: [
        "The component natively implements arrow key navigation to move between days, weeks, and months.",
        "The component automatically ensures the current month and year are announced to screen readers when navigating.",
      ],
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
      items: [
        { name: "Date Picker", link: "https://guides.muibook.com/date-picker" },
        { name: "Time", link: "https://guides.muibook.com/time" },
      ],
    },

    rules: [],

    behaviour: {
      list: [
        "Clicking a day selects that date.",
        "Clicking the next/previous arrows changes the displayed month.",
        "Days outside the current month may be visible but disabled or styled differently.",
      ],
    },

    writing: {
      list: [""],
    },
  },
};
