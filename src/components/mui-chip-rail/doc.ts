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
