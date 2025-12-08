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
  Field: {
    title: "Field",
    description:
      "A Field allows users to input or select data. It includes a label, an optional required indicator, and supports validation feedback to communicate errors or requirements.",
    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/1HqTclvMBXW2jyvUwLummp/ac1dc5c5a4c0596c2122b3f4bc06d0be/Field_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=112-620&t=GMqx21isUVAMpLJp-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-field--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-field/index.ts"],
    website: ["https://muibook.com/#/field"],
    guides: ["https://guides.muibook.com/field"],

    usage: {
      list: [
        "Acts as a parent wrapper for form elements such as Input, Select, Textarea, etc.",
        "Use clear, descriptive labels so users understand the purpose of the form field.",
        "Mark required fields with an asterisk (*) and validate input before submission.",
        "isplay validation messages in real-time or upon submission to guide corrections.",
      ],
    },

    accessibility: {
      designerList: [
        "A visible or hidden label is required to describe the input’s purpose for screen readers.",
        "Using hide-label keeps the label accessible via aria-label while hiding it visually.",
        "The label and input are linked using for and id; an id is auto-generated if not provided.",
        "Clear focus styles are shown to support keyboard navigation.",
      ],
      engineerList: [
        "A label is required for screen reader support to describe the input’s purpose.",
        "If hide-label is used, the label is visually hidden but accessible via aria-label.",
        "The label and form element are linked via for and id. If no id is provided, one is generated.",
        "Clear focus styles are shown for keyboard users.",
        "The native disabled attribute is fully supported by assistive tech.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/5nW3j8xOoMpTGLTljUAqPI/6ea6a47139a044feaa63697a40753cf2/Field_-_Anatomy.png",
      list: [
        "Label: The Field component supports a label, useful for grouping multiple inputs or when applying the label at the parent level is preferred.",
        "Message: Supports rendering static text or dynamic messages that reflect the field’s state, such as success, warning, or error.",
        "Slot: Allows insertion of related form components like Input or Select as children within the Field.",
      ],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "Standard field with label and no message. Used when no additional feedback is required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7rycX2tj569EplbANsiQmA/3c4f173807e9a3f40750a49e31612285/default.png",
        },
        {
          key: "default-with-message",
          title: "Default w/ Message",
          description:
            "Includes supporting text beneath the field. Use to provide guidance, context, or character limits.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1krnirIt4OKRZTkYRqXR2T/bbbb42a4afc3873407ceeb78e0fdb801/default-message.png",
        },
        {
          key: "success-with-message",
          title: "Success w/ Message",
          description:
            "Indicates a successful validation state. Use to confirm correct input, such as valid formatting or completion.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/kSXvQ6D4hvuP3c9bC0ZUa/319272dc75f0b08493753a49c0fbff75/success-message.png",
        },
        {
          key: "warning-with-message",
          title: "Warning w/ Message",
          description: "Indicates a non-blocking issue. Use when input may be acceptable but needs user attention.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5YIUAUlqh3ZfzzDvq5YgN5/7bb42ed1049af149719796b5cfb1a949/warning-message.png",
        },
        {
          key: "error-with-message",
          title: "Error w/ Message",
          description: "Displays a validation error. Use when input is invalid or required and has not been completed.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4yYS7D87CmJmnOVh75fwMc/c000af5c0ce3cb42a10c8e18b41d6312/error-message.png",
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
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Select", link: "https://guides.muibook.com/select" },
        { name: "File Upload", link: "https://guides.muibook.com/file-upload" },
        { name: "Add on", link: "https://guides.muibook.com/add-on" },
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
