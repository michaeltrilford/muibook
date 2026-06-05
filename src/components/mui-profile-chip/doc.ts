import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ProfileChip: {
    title: "Profile Chip",
    description:
      "Profile Chip composes an avatar with compact primary and secondary identity text for creator, author, or profile references.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-profile-chip/index.ts"],
    website: ["https://muibook.com/profile-chip"],
    guides: ["https://guides.muibook.com/profile-chip"],
    usage: {
      list: [
        "Use Profile Chip when an avatar and two compact text lines need to travel as one profile identity pattern.",
        "Use `primary` and `secondary` for simple text labels.",
        "Use `slot='primary'` or `slot='secondary'` when the copy needs custom typography, links, badges, or supporting icons.",
        "When Profile Chip is slotted into Media Player metadata, Media Player applies `usage='media-player'` automatically.",
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
