import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Avatar: {
    title: "Avatar",
    description:
      "Avatar components are used to represent users or entities visually, often through images, initials, or icons.",

    hero: ["https://images.ctfassets.net/i5uwscj4pkk2/2Qj1aPRsHVZZs6eF8XO6XC/54dd3c04d5a0ac379050cfa6f45d9732/Avatar_-_Home_Image.png"],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1498-15366&t=2P2nhh7B70fl6xQ4-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/visuals-avatar--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-avatar/index.ts"],
    website: ["https://muibook.com/avatar"],
    guides: ["https://guides.muibook.com/avatar"],

    usage: {
      list: [
        "Represent a user or entity visually in lists, chats, comments, or profiles.",
        "Display a profile photo, initials, or icon associated with a person or object.",
        "Use in compact UI elements where space is limited (e.g., tables, cards).",
        "Pair with user metadata (name, role, status) for context.",
        "Indicate presence, status, or selection in collaborative interfaces.",
        "Use status on Avatar when the activity state belongs to the represented person or entity.",
        "Use Avatar Group when showing stacked collaborators, participants, or assigned people.",
        "Avatar can be slotted into Button for identity-led actions such as switching video platform profiles, opening an account menu, or accessing workspace controls.",
        "Use an avatar-only button when the avatar itself is the visible trigger for a profile dropdown, account settings drawer, workspace switcher, or compact dialog action.",
        "In global app headers, avatar-only buttons are a good fit for account settings, billing, support, or team context menus.",
        "When Avatar is the only content inside Button, let the avatar define the final size and treat Button as the interactive wrapper.",
      ],
    },

    accessibility: {
      designerList: [
        "Avatars should always include an accessible label via the label attribute to ensure screen readers can convey their purpose.",
        "When using images, ensure they are clear and appropriately sized for the avatar component.",
        "For avatars representing users, consider using initials or icons when images are not available to maintain visual consistency.",
      ],
      engineerList: [
        "Avatars should always include an accessible label via the label attribute to ensure screen readers can convey their purpose.",
        "When using images, ensure they are clear and appropriately sized for the avatar component.",
        "For avatars representing users, consider using initials or icons when images are not available to maintain visual consistency.",
      ],
    },

    anatomy: {
      image: "",
      list: [
        "Image / Initials / Icon: The visible identity marker shown inside the avatar.",
        "Label: Accessible name announced to assistive technology.",
        "Status or Context (optional): Additional meaning can be conveyed through surrounding UI such as presence, role, or action context.",
        "Activity Status (optional): A bottom-right presence indicator mapped to semantic badge status tokens.",
      ],
    },

    variants: {
      items: [
        {
          key: "image",
          title: "Image",
          description: "Use when a profile or entity image is available and recognition matters.",
          image: "",
        },
        {
          key: "initials",
          title: "Initials",
          description: "Use as the default fallback when no image is present but the entity has a clear name.",
          image: "",
        },
        {
          key: "icon",
          title: "Icon",
          description: "Use for generic entities, products, or utility actions where a person-specific identity is not required.",
          image: "",
        },
        {
          key: "status",
          title: "Status",
          description: "Use status for compact presence states such as online, away, busy, do not disturb, or offline.",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        {
          "key": "image",
          "title": "Image",
          "description": "Represents a person with a profile image.",
          "list": [
            "Provide meaningful alt text through the Avatar label and retain initials as a fallback."
          ]
        },
        {
          "key": "activity-status",
          "title": "Activity Status",
          "description": "Use status when the avatar needs to show compact presence or availability.",
          "list": [
            "Status is visual only and maps to semantic badge status tokens.",
            "Use online or active for available people.",
            "Use away, busy, dnd, or offline for availability states."
          ]
        },
        {
          "key": "avatar-group",
          "title": "Avatar Group",
          "description": "Stack avatars when a compact surface needs to show multiple people.",
          "list": [
            "Avatar Group owns the overlap, ring, and default size.",
            "Each slotted Avatar still owns its image, initials, background, and status.",
            "Use label to describe the group when surrounding text does not already name it."
          ]
        },
        {
          "key": "icon",
          "title": "Icon",
          "description": "Uses an icon when a person image or initials are not appropriate.",
          "list": [
            "Use for generic accounts, services, or anonymous identities."
          ]
        },
        {
          "key": "size",
          "title": "Size",
          "description": "Compares the supported Avatar size scale.",
          "list": [
            "Match Avatar size to the density of the containing control or layout."
          ]
        },
        {
          "key": "chip-avatars",
          "title": "Chip Avatars",
          "description": "When an Avatar is used within a Chip, it is set to xx-small so compact chips retain the 24px avatar footprint.",
          "list": [
            "Allow Chip to enforce the compact Avatar footprint."
          ]
        },
        {
          "key": "background",
          "title": "Background",
          "description": "Escape hatch to use a custom background color inside the avatar. Ensure the background color stays accessible with the design system text color in all themes.",
          "list": [
            "Use this treatment when it matches the surrounding content and interaction context."
          ]
        },
        {
          "key": "background-colors",
          "title": "Background Colors",
          "description": "Escape hatch to use a custom background color inside the avatar. Ensure the background color stays accessible with the design system text color in all themes.",
          "list": [
            "Use this treatment when it matches the surrounding content and interaction context."
          ]
        },
        {
          "key": "buttons",
          "title": "Buttons",
          "description": "Buttons can include avatars to represent user actions, they will automatically adjust the size of the avatar based on the button size.",
          "list": [
            "Use this treatment when it matches the surrounding content and interaction context."
          ]
        },
        {
          "key": "avatar-only-dropdown",
          "title": "Avatar-only Dropdown",
          "description": "When a button only contains an Avatar, the button collapses to a primitive wrapper and the avatar drives the final size. This example uses that pattern as a dropdown trigger.",
          "list": [
            "Use this when the avatar itself is the interactive target.",
            "The button keeps interaction semantics and states, while the avatar controls the footprint.",
            "This works well for profile menus and compact account actions."
          ]
        },
        {
          "key": "avatar-only-button",
          "title": "Avatar-only Button",
          "description": "Avatar-only buttons also work as standalone actions. This example opens a dialog using the avatar as the trigger.",
          "list": [
            "Use this when the avatar itself is the only visible action.",
            "The button keeps semantics and focus behavior, while the avatar defines the final size."
          ]
        },
        {
          "key": "links",
          "title": "Links",
          "description": "Links can include avatars to represent user actions, they will automatically adjust the size of the avatar based on the button size.",
          "list": [
            "Use this treatment when it matches the surrounding content and interaction context."
          ]
        },
        {
          "key": "slat-and-card-avatars",
          "title": "Slat & Card Avatars",
          "description": "Shows Avatar composition across structured surfaces.",
          "list": [
            "Let the containing Slat or Card provide spacing and surface context."
          ]
        }
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how Avatar fits into identity, communication, and account-oriented UI patterns.",
      items: [
        {
          key: "account-menu",
          name: "Account Menu Trigger",
          description: "An avatar-only button used in a global app header to open account, billing, or support actions.",
          image: "",
        },
        {
          key: "profile-switcher",
          name: "Profile Switcher",
          description: "A compact avatar trigger used to switch between people, channels, or workspace identities in a media or collaboration product.",
          image: "",
        },
        {
          key: "avatar-group",
          name: "Avatar Group",
          description: "A stacked group of avatars used for collaborators, participants, or assigned people.",
          image: "",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Button",
          link: "https://guides.muibook.com/button",
        },
        {
          name: "Chip",
          link: "https://guides.muibook.com/chip",
        },
        {
          name: "Avatar Group",
          link: "https://guides.muibook.com/avatar-group",
        },
        {
          name: "Slat",
          link: "https://guides.muibook.com/slat",
        },
      ],
    },

    rules: [
      {
        heading: "Use the right identity source",
        description: "Choose the avatar content type based on confidence in the identity data and the importance of recognition.",
        doContent: [
          {
            description: "Use a real image when recognition matters, initials when a name is available, and an icon for generic or product-level identities.",
            image: "",
          },
        ],
        dontContent: [
          {
            description: "Do not force decorative imagery or inconsistent fallback logic when the identity is unclear.",
            image: "",
          },
        ],
      },
    ],

    behaviour: {
      list: [
        "Avatar is presentational by default and becomes interactive when wrapped by Button or another interactive parent.",
        "When used inside an avatar-only button, Avatar owns the visible size while Button owns interaction semantics, focus, and disabled behaviour.",
      ],
    },

    writing: {
      list: [
        "Provide a meaningful label so assistive technology can identify the person, entity, or action context represented by the avatar.",
      ],
    },
  },
};
