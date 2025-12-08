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
  Heading: {
    title: "Heading",
    description:
      "The Heading component includes six levels (H1–H6) for structured heading usage, supporting a range of hierarchies in text presentation.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/mGURbbhEBEMoMv5KlrbhD/46b2fdc16823b3750955a6bfd451e3ed/Heading_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-1120&t=fSFYVey9aCoE5oQa-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-heading--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-heading/index.ts"],
    website: ["https://muibook.com/#/heading"],
    guides: ["https://guides.muibook.com/heading"],

    usage: {
      list: [
        "Blog/Info Pages: Follow a structured, descending order to create clear sections. E.g. H1 → H2 → H3.",
        "Rich Data or Workflows: Headings may be used out of strict order to maintain visual balance and usability. E.g. Skip an H3 if H4 better suits the layout.",
        "Use only one H1 per page to establish a clear primary title and improve accessibility.",
        "Use H2–H6 to structure content logically, maintaining a clear hierarchy.",
      ],
    },

    accessibility: {
      designerList: [
        "Use the level property (H1–H6) to maintain correct semantic structure.",
        "Follow a logical order — don’t skip heading levels.",
        "Helps screen readers understand and navigate the page hierarchy.",
      ],
      engineerList: [
        "Use the level property (H1–H6) to maintain correct semantic structure.",
        "Follow a logical order — don’t skip heading levels.",
        "Helps screen readers understand and navigate the page hierarchy.",
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
