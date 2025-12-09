import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  ButtonGroup: {
    title: "Button Group",
    description: "Example of actions that are present at the top of a page or card footer use.",

    hero: [""],
    figma: [""],
    storybook: [""],
    github: [""],
    website: [""],
    guides: [""],

    usage: {
      list: [
        "Use small (default) size icon when paired with text-based action is used in a button group.",
        "Use medium size icon when the icon-only action appears on its own. E.g. Menu.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image: "",
      list: [""],
    },

    variants: {
      items: [
        {
          key: "",
          title: "",
          description: "",
          image: "",
        },
      ],
    },

    compositions: {
      description: "",
      items: [
        {
          key: "",
          name: "",
          description: "",
          image: "",
        },
      ],
    },

    related: {
      items: [
        {
          name: "",
          link: "",
        },
      ],
    },

    rules: [
      {
        heading: "",
        description: "",
        doContent: [{ description: "", image: "" }],
        dontContent: [{ description: "", image: "" }],
      },
    ],

    behaviour: {
      list: [""],
    },

    writing: {
      list: [""],
    },
  },
};
