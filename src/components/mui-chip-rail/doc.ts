import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ChipRail: {
    title: "Chip Rail",
    description:
      "A Chip Rail displays a horizontal set of chips with scroll controls and edge masking for filters, quicklinks, and compact category navigation.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2117-18125&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/actions-chip-rail--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-chip-rail/index.ts"],
    website: ["https://muibook.com/chip-rail"],
    guides: ["https://guides.muibook.com/chip-rail"],

    usage: {
      list: [
        "Use Chip Rail when chips should stay on one line and overflow horizontally.",
        "Use `size` to keep slotted chips and rail actions visually aligned.",
        "Use `bleed-inline-size` and `bleed-block-size` when the rail needs internal space for overflow controls.",
        "Focused slotted items are scrolled into view automatically, with scroll margin accounting for the edge mask and rail actions.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: ["Provide an `aria-label` when the rail purpose is not obvious from surrounding heading text."],
    },

    stories: {
      items: [
        { key: "default", title: "Default", description: "A single-line horizontal rail for filters, quicklinks, and compact categories.", list: ["Use when chips should remain on one line and scroll horizontally.", "Overflow actions appear only when more content is available."] },
        { key: "sizes", title: "Sizes", description: "Keeps slotted chips and overflow actions at the same scale.", list: ["Set size on Chip Rail and allow it to enforce the size of its direct Chip children."] },
        { key: "card-surface", title: "Card Surface", description: "Adapts edge masking to an elevated Card surface.", list: ["Let the Card composition supply the matching rail background.", "Use --chip-rail-background only on a custom surface."] },
        { key: "bleed", title: "Bleed", description: "Adds edge space for overflow controls and surrounding content.", list: ["Use bleed-inline-size for horizontal space.", "Add bleed-block-size only when vertical breathing room is required."] },
      ],
    },

    related: {
      items: [
        {
          name: "Chip",
          link: "https://guides.muibook.com/chip",
        },
      ],
    },
  },
};
