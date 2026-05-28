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
        "Ideal for presenting structured data in a compact, scannable format",
        "Supports stacking labels and values for easier readability",
        "Can include expandable sections to reveal more content on demand",
        "Use col and space to tune slat columns and spacing, including action slats.",
        "Use with SlatGroup when rows need to be presented as a related set, such as wallet activity, settings lists, grouped account records, or transaction histories.",
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
          key: "default",
          title: "Default",
          description: "Use for structured row content where information is primarily read rather than clicked.",
          image: "",
        },
        {
          key: "header",
          title: "Header",
          description: "Use for section headers or grouped row labels where the slat introduces the items that follow.",
          image: "",
        },
        {
          key: "action",
          title: "Action",
          description: "Use when the whole slat acts as the trigger, such as opening details, drilling into settings, or selecting a transaction.",
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
          name: "Slat Group",
          link: "https://guides.muibook.com/slat",
        },
        {
          name: "Icons",
          link: "https://guides.muibook.com/icons",
        },
      ],
    },

    rules: [
      {
        heading: "Choose the right slat variant",
        description: "Use the slat variant that matches the row’s job so grouped lists stay clear and predictable.",
        doContent: [
          {
            description: "Use a header slat to introduce a grouped set, a default slat for readable content, and an action slat when the whole row should be interactive.",
            image: "",
          },
        ],
        dontContent: [
          {
            description: "Avoid making every slat interactive if the rows are only there to present information.",
            image: "",
          },
        ],
      },
    ],

    behaviour: {
      list: [
        "Use the default variant when the slat is primarily informational, and use the action variant when the entire row should be interactive.",
        "Header slats work well as structural labels before a grouped run of related slats.",
      ],
    },

    writing: {
      list: [
        "Keep primary row content concise and scannable so labels, values, and actions remain easy to parse at a glance.",
      ],
    },
  },
  SlatGroup: {
    title: "Slat Group",
    description:
      "Slat Group arranges multiple slats into a related set so they can be presented as one grouped list or feed.",

    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com/?path=/docs/content-slat--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-slat/index.ts"],
    website: ["https://muibook.com/#/slat"],
    guides: ["https://guides.muibook.com/slat"],

    usage: {
      list: [
        "Use to group related slats into one compact list or section.",
        "Works well for wallet and account activity feeds where a header slat is followed by action or detail slats.",
        "A strong pattern is a header slat followed by grouped item slats for balances, recent activity, account options, or grouped settings.",
        "Use inside Card when grouped rows need a shared container or section framing.",
        "Pair with Rule between header and item sets when additional separation is needed.",
        "Use Slat for the individual row content and SlatGroup for the grouped structure.",
      ],
    },

    accessibility: {
      designerList: ["Maintain a consistent row order so grouped content is easy to scan."],
      engineerList: ["Use SlatGroup as structural grouping; individual mui-slat rows continue to own their row/cell semantics."],
    },

    anatomy: {
      image: "",
      list: ["Grouped slat container", "Optional header slat", "Related slat items"],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "A grouped collection of related slats.",
          image: "",
        },
      ],
    },

    compositions: {
      description: "Showcases grouped slat patterns in real-world structures.",
      items: [
        {
          key: "wallet-activity",
          name: "Wallet Activity",
          description:
            "A header slat followed by grouped activity rows, useful for transactions, balances, and recent account events.",
          image: "",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Slat",
          link: "https://guides.muibook.com/slat",
        },
        {
          name: "Rule",
          link: "https://guides.muibook.com/rule",
        },
        {
          name: "Card",
          link: "https://guides.muibook.com/card",
        },
      ],
    },

    rules: [
      {
        heading: "Group meaningfully",
        description: "Use SlatGroup when multiple slats belong to the same topic, task, or account context and should be read together.",
        doContent: [
          {
            description: "Group related rows such as a wallet summary, account activity, or a list of linked settings under one clear header or section label.",
            image: "",
          },
        ],
        dontContent: [
          {
            description: "Avoid using SlatGroup as a generic spacing wrapper when the rows do not share a clear relationship.",
            image: "",
          },
        ],
      },
    ],

    behaviour: {
      list: [
        "SlatGroup provides structure for a related set while each slat continues to handle its own content and interaction behaviour.",
      ],
    },

    writing: {
      list: [
        "Use concise section labels so grouped rows are easy to scan and the relationship between items is obvious.",
      ],
    },
  },
};
