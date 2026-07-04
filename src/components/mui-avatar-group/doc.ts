import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  AvatarGroup: {
    title: "Avatar Group",
    description: "Avatar Group stacks multiple avatars to represent a team, collaborators, or participants.",

    hero: [],
    figma: [],
    storybook: [],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-avatar-group"],
    website: ["https://muibook.com/avatar-group"],
    guides: ["https://guides.muibook.com/avatar-group"],

    usage: {
      list: [
        "Use Avatar Group when multiple people or entities need to be represented in a compact area.",
        "Use the label attribute to describe the group, such as project collaborators or active participants.",
        "Use overlap to tune density for headers, tables, and cards.",
        "Use fan when a compact group should temporarily expand so individual avatars are easier to inspect.",
        "Avatar Group automatically adjusts its separating ring in supported card and slat contexts; use --avatar-group-ring-color for custom surfaces.",
      ],
    },

    accessibility: {
      designerList: [
        "Keep avatar groups small enough that each identity remains visually recognizable.",
        "Use surrounding text or tooltips when individual identity needs to be explicit.",
      ],
      engineerList: [
        "Provide a label attribute for the group when the surrounding context does not already name it.",
        "Ensure each slotted avatar still has its own label attribute.",
      ],
    },

    anatomy: {
      image: "",
      list: [
        "Group: The inline wrapper that owns overlap and accessible grouping.",
        "Avatar: Slotted `mui-avatar` children that keep their own image, initials, icon, and status APIs.",
      ],
    },

    variants: {
      items: [
        {
          key: "overlap",
          title: "Overlap",
          description: "Use loose, tight, or compact overlap depending on available space and recognition needs.",
        },
      ],
    },

    compositions: {
      description: "",
      items: [],
    },

    related: {
      items: [
        { name: "Avatar", link: "https://guides.muibook.com/avatar" },
        { name: "Badge", link: "https://guides.muibook.com/badge" },
      ],
    },

    rules: [],

    behaviour: {
      list: [
        "Avatar Group applies default sizing to child avatars that do not declare their own size.",
        "Avatar Group keeps later avatars visually underneath earlier avatars so leading identities remain prominent.",
        "When fan is set, the group expands on hover and focus-within, then returns to its compact overlap.",
        "When placed in a Card Body or directly in a Slat slot, the group ring follows that component surface by default.",
      ],
    },

    writing: {
      list: [""],
    },
  },
};
