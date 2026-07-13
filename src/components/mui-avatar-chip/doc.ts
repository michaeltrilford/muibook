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
    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "A compact profile identity row with initials fallback.",
          "list": [
            "Use primary and secondary for simple profile text.",
            "When image is omitted, the internal avatar derives initials from label."
          ]
        },
        {
          "key": "image",
          "title": "Image",
          "description": "Profile identity row with an avatar image.",
          "list": [
            "Use image when the identity benefits from a recognisable avatar.",
            "Keep label meaningful so the avatar remains accessible and initials can be generated if the image fails."
          ]
        },
        {
          "key": "dropdown",
          "title": "Dropdown",
          "description": "Avatar Chip can sit inside a dropdown trigger when an identity row opens account or profile actions.",
          "list": [
            "Wrap Avatar Chip in the dropdown action when the visible trigger should carry avatar and profile copy.",
            "Keep dropdown behavior in the parent composition; Avatar Chip remains responsible for the identity layout only.",
            "Match the Avatar Chip size to the surrounding action size so the trigger density stays consistent."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Avatar Chip supports explicit sizing for different density needs.",
          "list": [
            "Use size to scale the internal avatar, primary text, and secondary text together.",
            "Keep responsive behavior in the parent composition when the chip needs to change size across breakpoints."
          ]
        },
        {
          "key": "linked-avatar",
          "title": "Linked Avatar",
          "description": "Profile identity row where the avatar opens the profile.",
          "list": [
            "Use href when the avatar is the profile action.",
            "Keep the copy separate when the profile row also includes supporting links or counts."
          ]
        },
        {
          "key": "custom-secondary",
          "title": "Custom Secondary",
          "description": "Secondary content can be slotted when it needs richer composition.",
          "list": [
            "Use slot='secondary' for links, badges, counts, or supporting icons.",
            "Use attributes for simple text so the component stays quick to author."
          ]
        },
        {
          "key": "media-player-usage",
          "title": "Media Player Usage",
          "description": "Avatar Chip can be slotted into Media Player metadata.",
          "list": [
            "Slot Avatar Chip into Media Player metadata when the player needs reusable avatar and profile copy composition.",
            "Media Player applies usage='media-player' automatically, so consumers do not need to set it by hand."
          ]
        }
      ],
    },

    related: {
      items: [
        { name: "Avatar", link: "https://guides.muibook.com/avatar" },
        { name: "Media Player", link: "https://guides.muibook.com/media-player" },
      ],
    },
  },
};
