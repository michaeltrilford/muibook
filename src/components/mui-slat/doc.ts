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
  Slat: {
    title: "Slat",
    description:
      "Used to display structured data in a stacked format, typically on smaller viewports or within narrow-width layouts. Slats offer flexibility to surface key content and support custom layouts, stacking, or expansion of additional details.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/2SHOSwTkf7V7Ql4OaobtMg/2cacf5103d02e00f67748578213f4433/Slat_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=957-8535&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-slat--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-slat/index.ts"],
    website: ["https://muibook.com/#/slat"],
    guides: ["https://guides.muibook.com/slat"],

    usage: {
      list: [
        "Suitable for displaying data in narrow-width containers, such as side panels",
        "Use as a responsive alternative to tables on mobile or narrow viewports",
        "deal for presenting structured data in a compact, scannable format",
        "Supports stacking labels and values for easier readability",
        "Can include expandable sections to reveal more content on demand",
      ],
    },

    accessibility: {
      designerList: ["mui-slat uses role='row'", "slotted children inherit role='cell'"],
      engineerList: ["mui-slat uses role='row'", "slotted children inherit role='cell'"],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/0OzwVoT0EyK1sR1ufn3Vw/3cbee51beec1240ebeaaad485bff5970/Slat_-_Anatomy.png",
      list: [
        "Header (Start): Slot for the header of slat items.",
        "Header (End): Optional area for secondary information.",
        "Row (Start): Primary content slot in a slat layout.",
        "Row (End): Secondary content slot in a slat layout.",
        "Accessory: Use for an icon or other suitable elements within the limited space available.",
        "Action: Enables the slat to become a clickable action.",
      ],
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
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "smart-card",
          name: "Smart Card",
          description:
            "The Smart Card composition uses slats to present structured information in a compact format. Slats help organise details such as titles, descriptions, and supporting actions, making the card easy to scan and interact with.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/74knMtil1vp9nHPPWXM1kr/54f8d978b0a82bca2c126e8ab800826f/SmartCard_-_Card_Composition.png",
        },
        {
          key: "account-activity",
          name: "Account Activity",
          description:
            "In Account Activity, slats are used to display a list of recent actions. Each slat provides a clear breakdown of primary details with optional secondary information, ensuring activity is both easy to read and consistent across the interface.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5GVrfo3fcsVnX7yduux6kE/978c2c6635bf19ee7e67ccd26744ad33/Slat_-_Account_Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Icons",
          link: "https://guides.muibook.com/icons",
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
