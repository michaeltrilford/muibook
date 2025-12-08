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
  Input: {
    title: "Input",
    description: "An input component for capturing user text, styled for consistency across your UI.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-795&t=GMqx21isUVAMpLJp-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-input--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-input/index.ts"],
    website: ["https://muibook.com/#/input"],
    guides: ["https://guides.muibook.com/input"],

    usage: {
      list: [
        "Ensure the purpose of the input is clear, either through a placeholder text or surrounding context.",
        "Ensure validation feedback is considered when using an input. E.g. Error text.",
        "Ensure the experience has clear focus states to support keyboard accessibility.",
        "Select the appropriate input types for the specific use case. E.g. Text, Email, Password.",
        "Use placeholder text to provide context of the input use; avoid using them as primary labels.",
        "Avoid relying solely on placeholder text for instructions, as it disappears when users start typing.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [
        "A label is required for screen reader support to describe the input's purpose.",
        "If hide-label is used, the label is visually hidden but accessible via aria-label.",
        "The label and input are linked via for and id. If no id is provided, one is generated.",
        "Clear focus styles are shown for keyboard users.",
        "The native disabled attribute is fully supported by assistive tech.",
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
