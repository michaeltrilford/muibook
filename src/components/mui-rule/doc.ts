import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Rule: {
    title: "Rule",
    description: "A styling rule that visually separates or divides page elements.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/1MLQoDYuXhKOBDZQRZtBH7/6cd51d6b04fb62f1e04b0383c38d4cce/Rule_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1059-12617&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/layout-rule--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-rule/index.ts"],
    website: ["https://muibook.com/#/rule"],
    guides: ["https://guides.muibook.com/rule"],

    usage: {
      list: [
        "Use horizontal rules to separate sections or create visual breaks in flows.",
        "Use vertical rules to divide elements within a row or dense layout.",
        "Align with spacing and layout conventions to maintain visual rhythm.",
        "Avoid using as decoration—rules should support clarity and structure.",
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
