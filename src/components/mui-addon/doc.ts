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

// Wrapper keyed by component name
type MuiDocs = Record<string, ComponentDoc>;

export const muiDocs: MuiDocs = {
  AddOn: {
    title: "Add on",
    description:
      "Enhances form inputs by displaying supplementary information such as units, prefixes, or suffixes adjacent to the input field. Add Ons improve clarity by providing context without adding clutter to the input area.",
    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/3GH67kZLZAjADf3kTIoSV3/82a1ab87bc13b25e6dc1e81c81f69532/AddOn_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=948-4065&t=rIU93UcpsUxOVNN9-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-addon--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-addon/index.ts"],
    website: ["https://muibook.com/#/addon"],
    guides: ["https://guides.muibook.com/add-on"],
    usage: {
      list: [
        "Use to display units (e.g. %, $, kg) or fixed prefixes/suffixes alongside inputs.",
        "Ideal for improving data entry accuracy and user understanding.",
        "Ensure Add Ons are visually distinct but do not overpower the main input content.",
        "Avoid overcrowding inputs with multiple Add Ons to maintain clarity.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [""],
    },
    anatomy: {
      list: [
        "Add-on placed before the Input Field",
        "Add-on placed after the Input Field",
        "Short text, an icon, or both to support input context.",
      ],
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/13NH06kdHIzm8hDGNBgihx/f5715279e5ab5e2ce6bfd5d38f5f2d1d/Add_on_-_Anatomy.png",
    },
    variants: {
      items: [
        {
          key: "text",
          title: "Text",
          description: "Use for units, currency, or short static labels.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/VfAoQuP8u7icg5s6Shwd6/f5f838a3ffda0d0839ef062af308fc97/text-variant.png",
        },
        {
          key: "icon",
          title: "Icon",
          description: "Use for symbolic cues or clarification of the input’s intent.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1LY5GdVijhp7bpfRs3WyFc/6d1708bd25496d7f33acba796b8b2aa6/icon-variant.png",
        },
      ],
    },

    related: {
      items: [
        { name: "Field", link: "https://guides.muibook.com/field" },
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Select", link: "https://guides.muibook.com/select" },
        { name: "File Upload", link: "https://guides.muibook.com/file-upload" },
        { name: "Icons", link: "https://guides.muibook.com/icons" },
      ],
    },
    rules: [
      {
        heading: "",
        description: "",
        doContent: [
          { description: "", image: "" },
          { description: "", image: "" },
        ],
        dontContent: [{ description: "" }, { description: "" }],
      },
    ],
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
    behaviour: {
      list: [""],
    },
    writing: {
      list: [""],
    },
  },
};
