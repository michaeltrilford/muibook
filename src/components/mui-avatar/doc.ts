// UX guideline documentation is stored in each component’s Doc.ts file.
// We include generic content that supports the Muibook storefront, but we intentionally
// exclude Storybook-specific data since it isn’t reused across the system.

interface VariantItem {
  key: string;
  title: string;
  description: string;
  image?: string;
}

interface CompositionItem {
  key: string;
  name: string;
  description: string;
  image?: string;
}

interface RuleItem {
  description?: string;
  image?: string;
}

interface ComponentDoc {
  title?: string;
  hero?: string[];
  figma?: string[];
  github?: string[];
  guides?: string[];
  storybook?: string[];
  website?: string[];
  description: string;

  usage?: {
    list: string[];
  };

  accessibility?: {
    designerList?: string[];
    engineerList?: string[];
  };

  anatomy?: {
    image?: string;
    list: string[];
  };

  variants?: {
    items: VariantItem[];
  };

  compositions?: {
    description?: string;
    items: CompositionItem[];
  };

  related?: {
    items: { name: string; link: string }[];
  };

  rules?: {
    heading: string;
    description: string;
    doContent?: RuleItem[];
    dontContent?: RuleItem[];
  }[];

  behaviour?: {
    image?: string;
    description?: string;
    list: string[];
  };

  writing?: {
    list: string[];
  };
}

type MuiDocs = Record<string, ComponentDoc>;

export const muiDocs: MuiDocs = {
  Avatar: {
    title: "Avatar",
    description:
      "Avatar components are used to represent users or entities visually, often through images, initials, or icons.",

    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-avatar--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-avatar/index.ts"],
    website: ["https://muibook.com/#/avatar"],
    guides: ["https://guides.muibook.com/avatar"],

    usage: {
      list: [""],
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
