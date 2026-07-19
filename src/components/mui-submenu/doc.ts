import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Submenu: {
    title: "Submenu",
    description: "Submenu reveals a portalled, viewport-aware nested Menu from a parent Menu action.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-submenu/index.ts"],
    website: ["https://muibook.com/submenu"],
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
    stories: {
      items: [
        {
          key: "standalone",
          title: "Standalone",
          description: "Applies the complete Submenu trigger treatment without requiring a parent Menu.",
          list: [
            "Slot a Button containing only the trigger label, followed by the nested Menu.",
            "Submenu enforces tertiary treatment, start alignment, regular weight, and the fixed after-chevron.",
            "Set size on Submenu when it is standalone; a parent Menu automatically passes its size to Submenu.",
          ],
        },
        {
          key: "composition",
          title: "Composition",
          description: "Reveals a related nested Menu from a direct Button trigger.",
          list: [
            "Place Submenu directly inside a parent Menu.",
            "Use a direct Button containing only its label as the trigger and a direct Menu as the nested surface.",
            "Do not add a chevron, trigger variant, or alignment; Submenu supplies and enforces them.",
            "Submenu adds disclosure semantics and opens on pointer hover or keyboard focus.",
          ],
        },
        {
          key: "sizes",
          title: "Sizes & Placement",
          description: "Inherits action context from each parent Menu size and works in any action position.",
          list: [
            "Set size on the parent Menu; Submenu passes the matching action size, weight, variant, inset, and radius context to its trigger.",
            "The trigger Button only needs its label; Submenu injects the correctly sized chevron.",
            "The examples place Submenu first, middle, and last to verify surrounding action radii.",
            "Keep the nested Menu size aligned with the parent Menu unless the hierarchy needs a deliberate density change.",
          ],
        },
        {
          key: "search",
          title: "Parent Search",
          description: "Keeps filtering at the top level while Submenu owns nested disclosure.",
          list: [
            "Slot Search Input into the parent Menu, not the nested Menu, when it filters top-level categories.",
            "Keep the Submenu trigger Button label-only; the component supplies its chevron and interaction treatment.",
            "Hide the complete Submenu host when its trigger does not match so the nested Menu is not left as an orphaned action.",
            "Keep the empty-state message in application state; Submenu only owns disclosure and positioning.",
          ],
        },
        {
          key: "viewport",
          title: "Viewport Placement",
          description: "Ports and repositions the nested Menu when inline space is constrained.",
          list: [
            "Submenu prefers the inline end and flips to the inline start when the viewport is tight.",
            "Author only the trigger label inside Button; the fixed chevron remains owned by Submenu while it repositions.",
            "If neither side fully fits, the nested Menu overlaps the parent Menu instead of clipping outside the viewport.",
            "The portalled Menu remains above parent overflow and adjacent focused controls while it is open.",
          ],
        },
      ],
    },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Menu", link: "https://guides.muibook.com/menu" }, { name: "Dropdown", link: "https://guides.muibook.com/dropdown" }] },
    rules: [],
    behaviour: {
      list: [
        "The nested Menu opens on pointer hover or when focus moves into Submenu.",
        "While open, the nested Menu is portalled to a body-level overlay and restored to its authored position when closed.",
        "An invisible bridge covers the visual gap, and a short close delay supports diagonal pointer movement into the nested Menu.",
        "The nested Menu prefers the inline end, flips to the inline start when space is constrained, and overlaps the parent Menu as a final fallback instead of clipping outside the viewport.",
        "Vertical placement shifts as needed to keep the nested Menu visible.",
        "Position is recalculated while open when the viewport, a scroll container, or the nested Menu size changes.",
        "The portal keeps focused controls, parent stacking contexts, and overflow containers beneath the nested Menu without moving external focus.",
        "Pointer activation does not retain focus on the trigger, and selecting a nested action closes the Submenu.",
        "The parent Menu passes its action size, weight, variant, inset, and radius context to the trigger.",
      ],
    },
    writing: { list: ["Name the trigger for the category of actions contained in the nested Menu."] },
  },
};
