import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Submenu: {
    title: "Submenu",
    description: "Submenu reveals a viewport-aware nested Menu from a parent Menu action.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-submenu/index.ts"],
    website: ["https://muibook.com/menu"],
    guides: [""],
    usage: {
      list: [
        "Place Submenu directly inside Menu.",
        "Use a direct Button as its trigger and a direct Menu for the nested actions.",
      ],
    },
    accessibility: {
      designerList: ["Keep nested action labels concise and related to the parent trigger."],
      engineerList: ["Submenu synchronizes aria-haspopup and aria-expanded on its direct Button trigger."],
    },
    anatomy: { image: "", list: ["Button trigger", "Nested Menu"] },
    variants: { items: [] },
    stories: { items: [] },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Menu", link: "https://guides.muibook.com/menu" }, { name: "Dropdown", link: "https://guides.muibook.com/dropdown" }] },
    rules: [],
    behaviour: {
      list: [
        "The nested Menu opens on pointer hover or when focus moves into Submenu.",
        "An invisible bridge covers the visual gap, and a short close delay supports diagonal pointer movement into the nested Menu.",
        "The nested Menu prefers the inline end, flips to the inline start when space is constrained, and overlaps the parent Menu as a final fallback instead of clipping outside the viewport.",
        "Vertical placement shifts as needed to keep the nested Menu visible.",
        "Position is recalculated while open when the viewport, a scroll container, or the nested Menu size changes.",
        "The active Submenu is raised above adjacent controls so overlapping content cannot intercept its pointer interaction.",
        "Pointer activation does not retain focus on the trigger, and selecting a nested action closes the Submenu.",
        "The parent Menu passes its action size, weight, variant, inset, and radius context to the trigger.",
      ],
    },
    writing: { list: ["Name the trigger for the category of actions contained in the nested Menu."] },
  },
};
