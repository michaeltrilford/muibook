import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Illustrations: {
    title: "Illustrations",
    description:
      "Large-format decorative visuals used to support empty states, onboarding moments, and explanatory content without competing with the primary interface.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1945-4584&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/visuals-illustrations--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-illustrations"],
    website: ["https://muibook.com/illustrations"],
    guides: ["https://guides.muibook.com/illustrations"],

    usage: {
      list: [
        "Use illustrations to add tone and clarity to empty states, helper panels, and onboarding screens.",
        "Prefer one illustration per message area so the visual supports the content instead of competing with it.",
        "Use color='default' for light contexts and color='inverted' when the illustration needs to sit on dark surfaces.",
        "Use a custom CSS color only when the illustration needs to inherit a specific product accent.",
        "Keep illustration sizing consistent within the same product area.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [
        "Treat illustrations as decorative unless they communicate unique meaning that is not already present in adjacent text.",
      ],
    },

    anatomy: {
      image: "",
      list: [""],
    },

    variants: {
      items: [
        {
          key: "trash",
          title: "Trash",
          description: "A single illustration export for destructive, discard, or empty-bin related moments.",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "Renders an illustration with its standard palette.",
          "list": [
            "Import from @muibook/components/mui-illustrations and use the named illustration tag directly.",
            "Use the default palette for standard light surfaces."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Compares the supported Illustration size scale.",
          "list": [
            "Use one illustration size consistently within the same surface or flow."
          ]
        },
        {
          "key": "custom-color",
          "title": "Custom Color",
          "description": "Applies a custom illustration accent.",
          "list": [
            "Pass a direct CSS color when the illustration needs to align to a product accent or special state."
          ]
        },
        {
          "key": "empty-state",
          "title": "Empty State",
          "description": "Composes Illustration with empty-state content and an action.",
          "list": [
            "Pair illustrations with a heading, supporting body copy, and a single clear action."
          ]
        }
      ],
    },

    compositions: {
      description: "Illustrations are typically paired with heading, body copy, and one primary action.",
      items: [
        {
          key: "empty-state",
          name: "Empty State",
          description: "A compact empty-state composition using an illustration to anchor the message.",
          image: "",
        },
      ],
    },

    related: {
      items: [
        { name: "Icons", link: "https://guides.muibook.com/icons" },
        { name: "Message", link: "https://guides.muibook.com/message" },
        { name: "Card", link: "https://guides.muibook.com/card" },
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
