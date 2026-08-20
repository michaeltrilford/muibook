import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Textarea: {
    title: "Textarea",
    namedSlots: {
      description: "Use this name on rich supporting content placed between the label and Textarea control.",
      list: ["description"],
    },
    description: "A multiline text input for longer-form content such as notes, comments, and descriptions.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System"],
    storybook: ["https://stories.muibook.com/?path=/docs/forms-textarea--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-textarea/index.ts"],
    website: ["https://muibook.com/textarea"],
    guides: ["https://guides.muibook.com/textarea"],

    usage: {
      list: [
        "Use textarea when users need to enter multiple lines of text.",
        "Use size='x-small|small|medium|large' to align textarea scale with surrounding form controls.",
        "Use description for plain supporting guidance or slot='description' with mui-body when the guidance contains rich inline content.",
        "Description typography follows Textarea size one step down: xx-small, x-small, small, then medium.",
        "Provide a clear label and helpful placeholder for expected content.",
        "Use the optional attribute when a field is not required to show a clear (optional) marker in the label.",
        "Use max-length when limits matter; the component shows a live character count.",
        "Pair with field validation messaging when collecting required information.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [
        "A label is required for screen reader support.",
        "If hide-label is used, an aria-label is generated from label.",
        "When supporting guidance is present, Textarea owns its generated ID and associates it with the native control through aria-describedby.",
        "Optional fields can be explicitly communicated with the optional attribute without changing label association.",
        "When max-length is set, users get visible character progress while native maxlength enforcement remains intact.",
        "The native disabled attribute is supported.",
      ],
    },

    anatomy: {
      image: "",
      list: ["Label", "Textarea Field", "Placeholder Text"],
    },

    variants: {
      items: [
        { key: "default", title: "Default", description: "Base textarea style.", image: "" },
        { key: "success", title: "Success", description: "Validation success style.", image: "" },
        { key: "warning", title: "Warning", description: "Validation warning style.", image: "" },
        { key: "error", title: "Error", description: "Validation error style.", image: "" },
      ],
    },

    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "Shows the standard Textarea treatment.",
          "list": [
            "Use Textarea for multi-line content and choose rows from the expected response length."
          ]
        },
        {
          "key": "rows",
          "title": "Rows",
          "description": "Demonstrates rows with Textarea.",
          "list": [
            "Use Textarea for multi-line content and choose rows from the expected response length."
          ]
        },
        {
          "key": "fill-available-height",
          "title": "Fill Available Height",
          "description": "Fills the height assigned to Textarea while keeping rows as its minimum control height.",
          "list": [
            "Use when the surrounding layout deliberately assigns a height to Textarea.",
            "Rows still define the minimum height in ordinary auto-height layouts."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Compares the supported Textarea size scale.",
          "list": [
            "Use Textarea for multi-line content and choose rows from the expected response length."
          ]
        },
        {
          "key": "supporting-description",
          "title": "Supporting Description",
          "description": "Adds persistent guidance between the Textarea label and control.",
          "list": [
            "Use description for plain supporting copy or slot='description' with mui-body for rich inline content.",
            "Textarea owns spacing, the generated description ID, and the native aria-describedby association."
          ]
        },
        {
          "key": "variant-error",
          "title": "Variant: Error",
          "description": "Shows the error validation treatment.",
          "list": [
            "Use Textarea for multi-line content and choose rows from the expected response length."
          ]
        },
        {
          "key": "hide-label",
          "title": "Hide Label",
          "description": "Visually hides the label while preserving its accessible name.",
          "list": [
            "Use Textarea for multi-line content and choose rows from the expected response length."
          ]
        },
        {
          "key": "disabled",
          "title": "Disabled",
          "description": "Shows Textarea in a disabled state.",
          "list": [
            "Use Textarea for multi-line content and choose rows from the expected response length."
          ]
        },
        {
          "key": "optional-label",
          "title": "Optional Label",
          "description": "Marks the field as optional without weakening its label.",
          "list": [
            "Use Textarea for multi-line content and choose rows from the expected response length."
          ]
        },
        {
          "key": "character-count",
          "title": "Character Count",
          "description": "Communicates entered characters against the allowed limit.",
          "list": [
            "Use Textarea for multi-line content and choose rows from the expected response length."
          ]
        }
      ],
    },

    compositions: {
      description: "Common use cases for multiline text input.",
      items: [],
    },

    related: {
      items: [
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Field", link: "https://guides.muibook.com/field" },
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
