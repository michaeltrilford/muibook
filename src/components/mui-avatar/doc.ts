import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Avatar: {
    title: "Avatar",
    description:
      "Avatar components are used to represent users or entities visually, often through images, initials, or icons.",

    hero: ["https://images.ctfassets.net/i5uwscj4pkk2/2Qj1aPRsHVZZs6eF8XO6XC/54dd3c04d5a0ac379050cfa6f45d9732/Avatar_-_Home_Image.png"],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1498-15366&t=2P2nhh7B70fl6xQ4-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-avatar--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-avatar/index.ts"],
    website: ["https://muibook.com/#/avatar"],
    guides: ["https://guides.muibook.com/avatar"],

    usage: {
      list: [
        "Represent a user or entity visually in lists, chats, comments, or profiles.",
        "Display a profile photo, initials, or icon associated with a person or object.",
        "Use in compact UI elements where space is limited (e.g., tables, cards).",
        "Pair with user metadata (name, role, status) for context.",
        "Indicate presence, status, or selection in collaborative interfaces.",
      ],
    },

    accessibility: {
      designerList: [
        "Avatars should always include an accessible label via the label attribute to ensure screen readers can convey their purpose.",
        "When using images, ensure they are clear and appropriately sized for the avatar component.",
        "For avatars representing users, consider using initials or icons when images are not available to maintain visual consistency.",
      ],
      engineerList: [
        "Avatars should always include an accessible label via the label attribute to ensure screen readers can convey their purpose.",
        "When using images, ensure they are clear and appropriately sized for the avatar component.",
        "For avatars representing users, consider using initials or icons when images are not available to maintain visual consistency.",
      ],
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
