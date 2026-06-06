import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  AvatarChip: {
    title: "Avatar Chip",
    description:
      "Avatar Chip composes an avatar with compact primary and secondary identity text for creator, author, or profile references.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-avatar-chip/index.ts"],
    website: ["https://muibook.com/avatar-chip"],
    guides: ["https://guides.muibook.com/avatar-chip"],
    usage: {
      list: [
        "Use Avatar Chip when an avatar and two compact text lines need to travel as one profile identity pattern.",
        "Use `primary` and `secondary` for simple text labels.",
        "Use `slot='primary'` or `slot='secondary'` when the copy needs custom typography, links, badges, or supporting icons.",
        "When Avatar Chip is slotted into Media Player metadata, Media Player applies `usage='media-player'` automatically.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: ["Provide a meaningful `label` so avatar initials and linked avatar actions have useful accessible names."],
    },
    related: {
      items: [
        { name: "Avatar", link: "https://guides.muibook.com/avatar" },
        { name: "Media Player", link: "https://guides.muibook.com/media-player" },
      ],
    },
  },
};
