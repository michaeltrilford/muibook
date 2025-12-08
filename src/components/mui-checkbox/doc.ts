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
  Checkbox: {
    title: "Checkbox",
    description: "A checkbox component for capturing single or multiple selections.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/73VtPhD4eobLABsmN0X5KI/9ae64c37c0c6618fa48eff8154058f34/Checkbox_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=634-4686&t=aIjJqBxWOU1t0Jjp-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-checkbox--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-checkbox/index.ts"],
    website: ["https://muibook.com/#/checkbox"],
    guides: ["https://guides.muibook.com/checkbox"],

    usage: {
      list: [""],
    },

    accessibility: {
      designerList: [
        "A visible label or accessible name is required for screen reader support to describe the checkbox’s purpose.",
        "If no visible label is provided, use aria-label (or aria-labelledby) to supply an accessible name.",
        "Clear focus styles are present for keyboard users.",
        "The native disabled attribute is fully supported by assistive technologies.",
      ],
      engineerList: [
        "A visible label or accessible name is required for screen reader support to describe the checkbox’s purpose.",
        "If no visible label is provided, use aria-label (or aria-labelledby) to supply an accessible name.",
        "Clear focus styles are present for keyboard users.",
        "The native disabled attribute is fully supported by assistive technologies.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/1SHtTzFQSQIBPnva1futiT/6c55b1596af31b1f93a4da82ea2a4fa2/Checkbox_-_Anatomy.png",
      list: [
        "Unselected: Can become active through user interaction or changes in shared state.",
        "Checked: The checkbox is fully marked, indicating complete selection.",
        "Indeterminate: Used on parent checkboxes in multi-select groups to indicate partial selection.",
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
          key: "onboarding-form",
          name: "Onboarding Form",
          description:
            "Demonstrates an onboarding form within a card, using logic to confirm terms acceptance. Components include Heading, Input Fields, Checkbox, and Button.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1NrgynTcdmVVKSYCsQwlOW/5fc4776c1860b498a59a2865b4e57ecb/Card-Onboarding-Composition.png",
        },
      ],
    },

    related: {
      items: [
        { name: "Switch", link: "https://guides.muibook.com/switch" },
        { name: "Input", link: "https://guides.muibook.com/input" },
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
