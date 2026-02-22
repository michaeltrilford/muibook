import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Radio: {
    title: "Radio",
    description: "A radio control for selecting exactly one option from a set.",

    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-radio"],
    website: ["https://muibook.com/#/radio"],
    guides: [""],

    usage: {
      list: [
        "Use radio when users must choose one option from a known set.",
        "Group related radios using mui-radio-group for shared name and state handling.",
        "Use label / hide-label / optional on mui-radio-group to align with other fielded controls.",
        "Use size='x-small|small|medium|large' on radio or radio-group to scale controls consistently.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [
        "Use mui-radio-group to provide radiogroup semantics and shared selection state.",
        "Each radio should include visible text or aria-label when no visible label is present.",
      ],
    },

    anatomy: {
      image: "",
      list: ["Unchecked", "Checked", "Disabled"],
    },

    variants: {
      items: [{ key: "", title: "", description: "", image: "" }],
    },

    compositions: {
      description: "",
      items: [],
    },

    related: {
      items: [
        { name: "Checkbox", link: "https://guides.muibook.com/checkbox" },
        { name: "Field", link: "https://guides.muibook.com/field" },
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

    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
