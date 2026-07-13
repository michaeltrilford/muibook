import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Radio: {
    title: "Radio",
    description: "A radio control for selecting exactly one option from a set.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17899&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-radio--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-radio"],
    website: ["https://muibook.com/radio"],
    guides: ["https://guides.muibook.com/radio"],

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

    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "Shows the standard Radio treatment.",
          "list": [
            "Use Radio Group when users must choose exactly one option from a visible set."
          ]
        },
        {
          "key": "checked",
          "title": "Checked",
          "description": "Shows Radio in its selected state.",
          "list": [
            "Use Radio Group when users must choose exactly one option from a visible set."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Compares the supported Radio size scale.",
          "list": [
            "Use Radio Group when users must choose exactly one option from a visible set."
          ]
        },
        {
          "key": "disabled",
          "title": "Disabled",
          "description": "Shows Radio in a disabled state.",
          "list": [
            "Use Radio Group when users must choose exactly one option from a visible set."
          ]
        },
        {
          "key": "radio-group",
          "title": "Radio Group",
          "description": "Demonstrates radio group with Radio.",
          "list": [
            "Use Radio Group when users must choose exactly one option from a visible set."
          ]
        },
        {
          "key": "checkbox-radio-side-by-side",
          "title": "Checkbox + Radio (Side By Side)",
          "description": "Demonstrates checkbox + radio (side by side) with Radio.",
          "list": [
            "Use Radio Group when users must choose exactly one option from a visible set."
          ]
        }
      ],
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
