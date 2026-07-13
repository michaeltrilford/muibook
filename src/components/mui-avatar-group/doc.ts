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

    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "Stack avatars when a compact surface needs to show multiple people.",
          "list": [
            "Avatar Group owns the overlap, ring, and default size.",
            "Each slotted Avatar still owns its image, initials, background, and status.",
            "Use label to describe the group when surrounding text does not already name it."
          ]
        },
        {
          "key": "overlap",
          "title": "Overlap",
          "description": "Tune overlap density for recognition or compact layout.",
          "list": [
            "Use loose when recognition matters.",
            "Use tight as the default balance.",
            "Use compact for dense tables, cards, and headers."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Set size on the group to size slotted avatars that do not declare their own size.",
          "list": [
            "Use group size when all avatars should share the same footprint.",
            "Set size directly on an individual Avatar only when it should intentionally differ from the group."
          ]
        },
        {
          "key": "hover-fan",
          "title": "Hover Fan",
          "description": "Use fan when a stacked group should expand temporarily for easier recognition.",
          "list": [
            "The group fans on pointer hover and keyboard focus within the group.",
            "Use this for dense collaborator groups where recognition matters on inspection.",
            "Keep the default static overlap when layout stability matters more than inspection."
          ]
        },
        {
          "key": "with-status",
          "title": "With Status",
          "description": "Avatar Group composes with Avatar status indicators without owning presence state itself.",
          "list": [
            "Use status on each Avatar when availability belongs to that individual.",
            "Keep the group label focused on what the collection represents."
          ]
        },
        {
          "key": "context-ring",
          "title": "Context Ring",
          "description": "Avatar Group adjusts its separating ring in supported surface contexts.",
          "list": [
            "Card Body marks nested Avatar Groups so their ring matches the card surface.",
            "Slat slots pass their default and hover surfaces to the group.",
            "Use the custom property only for one-off custom surfaces outside known component contexts."
          ]
        }
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
