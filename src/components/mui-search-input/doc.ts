import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  "Search Input": {
    title: "Search Input",
    description:
      "A composed search control for filtering local views, revealing into toolbar space when paired with adjacent controls.",

    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-search-input/index.ts"],
    website: ["https://muibook.com/search-input"],
    guides: ["https://guides.muibook.com/search-input"],

    usage: {
      list: [
        "Use for filtering a nearby view, list, table, or navigation surface.",
        "Use the action slot only when the default compact search button needs to be replaced.",
        "Use the after slot for adjacent controls that should yield to search when the user activates it.",
        "Use open only when the after slot is populated and application state should control whether search replaces that content.",
        "Use autofocus when the search input should receive focus as soon as it is shown.",
      ],
    },

    accessibility: {
      designerList: ["Keep the search action visually distinct when search is collapsed."],
      engineerList: [
        "Provide a label when the visible context does not make the search scope clear.",
        "The search trigger and cancel action are keyboard focusable controls.",
        "Escape closes the revealed search state and returns focus to the search trigger.",
      ],
    },

    anatomy: {
      image: "",
      list: [
        "Search action: Compact icon button shown when after-slot content is present; replaceable with slot='action'.",
        "Input: Search field with leading search icon.",
        "Cancel: Matches the input size and returns to populated after-slot content.",
        "After: Optional slotted content hidden during search reveal.",
      ],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "Search input without slotted trailing content. It stays visible and does not render a meaningful cancel state.",
          image: "",
        },
        {
          key: "after",
          title: "After Slot",
          description: "Compact search action beside slotted content, revealing the search row on activation.",
          image: "",
        },
      ],
    },

    related: {
      items: [
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Button", link: "https://guides.muibook.com/button" },
        { name: "Tab Bar", link: "https://guides.muibook.com/tabs" },
      ],
    },
  },
};
