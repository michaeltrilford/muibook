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
  Dialog: {
    title: "Dialog",
    description:
      "A modal window that prompts users to take a specific action or provide additional information without navigating away from the current context.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/4jrr9tVVDi9Kz8lhaxWToe/8169a3e57f30572fbf6dd504f360fedd/Dialog_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=780-4948&t=KhmyUmaNDWKTGtrH-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-dialog--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-dialog/index.ts"],
    website: ["https://muibook.com/#/dialog"],
    guides: ["https://guides.muibook.com/dialog"],

    usage: {
      list: [
        "Used to alert the user of potentially a harmful action.",
        "Use for focused interactions that require attention and immediate action.",
      ],
    },

    accessibility: {
      designerList: [
        "Ensure dialogs are accessible via keyboard and screen readers.",
        "Use ARIA roles and properties to indicate the state of the dialog (visible/hidden).",
        "Ensure the focus remains within the dialog while it is open.",
      ],
      engineerList: [
        "Uses role='dialog' and aria-modal='true' for screen readers.",
        "Supports aria-labelledby and aria-describedby to provide accessible titles and descriptions.",
        "Focus is managed by the browser’s native dialog behavior when open.",
        "The close button includes aria-label='Close Icon'.",
        "Footer is hidden when empty to reduce screen reader noise.",
        "Clicking the backdrop closes the dialog.",
        "When open, consumers must trap focus in the dialog and apply inert/aria-hidden to the background.",
        "The component exposes 'mui-dialog-open' and 'mui-dialog-close' events so external state (e.g. React setDialogOpen(false)) stays in sync with the dialog’s internal logic.",
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
