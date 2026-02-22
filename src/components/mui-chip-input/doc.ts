import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ChipInput: {
    title: "Chip Input",
    description:
      "A Chip Input lets users create and manage multiple discrete values, shown as Chips inside an input experience.",

    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-chip-input/index.ts"],
    website: ["https://muibook.com/#/chip-input"],
    guides: [""],

    usage: {
      list: [
        "Use for email recipient entry where users add multiple addresses.",
        "Use for tagging content, products, or tasks with descriptors.",
        "Use for search filters where active selections are shown as chips.",
        "Use options to provide suggestion values users can pick from.",
        "Use value as strings or object items to control selected data.",
        "Use allow-custom when users should be able to add entries not present in options.",
        "Use placement='after' when chip tags should render after the text input.",
        "Use mobile-stack to stack chips and input on smaller container widths.",
        "Use breakpoint (px) to switch between inline and stacked layout automatically.",
        "Listen to chip-input-change for structured payloads (action, values, items, added, removed).",
        "Listen to chip-input-query-change for async suggestion fetching.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [
        "Component uses combobox/listbox semantics for discoverable keyboard and screen reader behavior.",
        "Provide a visible label, or use hide-label only when an equivalent accessible label is still present.",
      ],
    },

    anatomy: {
      image: "",
      list: [
        "Chip: Represents an added/selected item and can include dismiss action.",
        "Text Input: The typing area for entering and searching values.",
        "Suggestion List: Selectable options shown while typing.",
      ],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "Neutral entry state for chip creation and selection.",
          image: "",
        },
        {
          key: "focus",
          title: "Focus",
          description: "Active typing/selection state with visible focus feedback.",
          image: "",
        },
        {
          key: "error",
          title: "Error",
          description: "Validation error state when composed with Field or variant-based input feedback.",
          image: "",
        },
        {
          key: "disabled",
          title: "Disabled",
          description: "Non-interactive state; chips remain visible and dismiss actions are disabled.",
          image: "",
        },
      ],
    },

    compositions: {
      description: "",
      items: [],
    },

    related: {
      items: [
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Chip", link: "https://guides.muibook.com/chip" },
        { name: "Field", link: "https://guides.muibook.com/field" },
        { name: "Select", link: "https://guides.muibook.com/select" },
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

    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
