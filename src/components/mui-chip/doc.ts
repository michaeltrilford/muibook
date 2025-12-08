// UX guideline documentation is stored in each component’s Doc.ts file.
// We include generic content that supports the Muibook storefront, but we intentionally
// exclude Storybook-specific data since it isn’t reused across the system.

interface VariantItem {
  key: string;
  title: string;
  description: string;
  image?: string;
}

interface CompositionItem {
  key: string;
  name: string;
  description: string;
  image?: string;
}

interface RuleItem {
  description?: string;
  image?: string;
}

interface ComponentDoc {
  title?: string;
  hero?: string[];
  figma?: string[];
  github?: string[];
  guides?: string[];
  storybook?: string[];
  website?: string[];
  description: string;

  usage?: {
    list: string[];
  };

  accessibility?: {
    designerList?: string[];
    engineerList?: string[];
  };

  anatomy?: {
    image?: string;
    list: string[];
  };

  variants?: {
    items: VariantItem[];
  };

  compositions?: {
    description?: string;
    items: CompositionItem[];
  };

  related?: {
    items: { name: string; link: string }[];
  };

  rules?: {
    heading: string;
    description: string;
    doContent?: RuleItem[];
    dontContent?: RuleItem[];
  }[];

  behaviour?: {
    image?: string;
    description?: string;
    list: string[];
  };

  writing?: {
    list: string[];
  };
}

type MuiDocs = Record<string, ComponentDoc>;

export const muiDocs: MuiDocs = {
  Chip: {
    title: "Chip",
    description:
      "A Chip is a compact, interactive element representing an attribute or action. It can include text, icons, avatars, badges, or a dismiss option, and is used for choices, filters, or tags.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/3JzAEFqBR55IEwk43VcckJ/d305b9c79372eb4444d746283603e297/Chip_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=646-5183&t=75XKzlBGMRDDu3oC-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/actions-chip--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-chip/index.ts"],
    website: ["https://muibook.com/#/chip"],
    guides: ["https://guides.muibook.com/chip"],

    usage: {
      list: [
        "Use to visually indicate states or properties, such as tags, categories, or labels.",
        "Chips are clickable for filtering content or initiating events.",
        "Allow users to remove Chips when they no longer apply. E.g. Removing filters.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/5nPL0GnBA9X5HjthQO9TBl/80e75a4e6b5fe189b42b8fbdf411fd47/chip-anatomy.png",
      list: [
        "BEFORE: An optional area for icons, badges, status indicators, or avatars before the text. Use it intentionally and consistently to enhance the UI pattern.",
        "TEXT: Text describing the chip action / filter.",
        "AFTER: An optional area primarily used for icons or badges, such as a close/chevron icon or a 'Beta' label.",
        "DISMISS: Enable the ability to dismiss the selected item / chip.",
      ],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "Used to display simple, concise text labels.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/ytngYrHWtO9qXHR4tiUd4/263e20a31c77188b1331fb55b24df8dc/Chip_-_Default_-_Variants.png",
        },

        {
          key: "icon-before-after",
          title: "Icon (Before or After)",
          description: "Displays a badge with an icon to visually represent actions or attributes.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/6vJupN5Uq7qTCITseKhH0f/32994e53c573b514b39982603080e9a9/Chip_-_Icon_-_Variants.png",
        },

        {
          key: "badge",
          title: "Badge",
          description: "Emphasise a number or label, often used for counts or notifications.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2MJ261JAyVaJjO6cZ0tpoo/80dffa9ee294bd5f1b193955fc72a5f0/Chip_-_Badge_-_Variants.png",
        },

        {
          key: "dismiss",
          title: "Dismiss",
          description: "Allow users to remove or dismiss the chip.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3Q9BcS2DkMPWAp35hyfvlQ/1b45edf184a791f097ad32193181143d/Chip_-_Dismiss_-_Variants.png",
        },

        {
          key: "dropdown",
          title: "Dropdown",
          description: "Indicates an expandable menu or options associated with the badge.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/gWi4RKyEkknu8MkSCuS0V/a4fc2df0a76b3cf72085bd94f9189284/Chip_-_Dropdown_-_Variants.png",
        },
      ],
    },

    compositions: {
      description: "",
      items: [
        {
          key: "",
          name: "",
          description: "",
          image: "",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Icons",
          link: "https://guides.muibook.com/icons",
        },
        {
          name: "Badge",
          link: "https://guides.muibook.com/badge",
        },
      ],
    },

    rules: [
      {
        heading: "Dismiss Icon Placement",
        description: "Use the dismiss boolean that aligns with the mui-icon-close icon used within the chip component.",
        doContent: [
          {
            description: "Use the 'After' slot to correctly position the icon.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/7Da4v957sx9lEKQKNWpYQG/8dff99d4a0e1a0591d013d03b32ee998/chip-dismiss-icon-do.png",
          },
        ],
        dontContent: [
          {
            description: "Avoid using the 'Before' slot to position the icon.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5x1bHatGsqKbqM9WLR3sRf/6ac5b37bbd18bf8a5f8775a815d52d95/chip-dismiss-icon-dont.png",
          },
        ],
      },
      {
        heading: "Filters",
        description: "Return results specific to one or multiple categories the user selects.",
        doContent: [
          {
            description:
              "Use appropriate states for filter Chips, ensuring they are secondary and less visually prominent.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/2CYttuT5osg9H81XdQHGCE/4ef530be01a88cd06dcd10478c7845fd/chip-filters-do.png",
          },
        ],
        dontContent: [
          {
            description: "Don’t use the active state, as it can create excessive visual noise in the UI.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/46c9ggYnc2lMEVb9mqEhu4/1bc0242ab77cf509e877de327e997e2b/chip-filters-dont.png",
          },
        ],
      },
      {
        heading: "Multi-Select Groups",
        description: "",
        doContent: [
          {
            description:
              "Allow Chips to wrap within the group, and avoid using the dismiss option for tags, as the action involves toggling selections, not dismissing.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/3lGIrABnrPu1qqjl1CmwAE/38a423c08e93a4fea44e1135fadd8475/chip-multi-select-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Don’t include a dismiss icon on a selected Chip, as it implies deletion rather than toggling the selection off.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/547HCJkHuNEEUehazNJZRJ/a5990e6e1767d1f58cd54bcec9f6dd27/chip-multi-select-dont.png",
          },
        ],
      },
      {
        heading: "Sub Navigation",
        description: "It is often used to view page results for a single category.",
        doContent: [
          {
            description:
              "Ensure only one Chip is selected at a time in a group. For multiple selections, use the filter pattern instead.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/6DinQnFto2fHEATyXygvIa/d9352922dfc45f84332d41043311a1e3/chip-sub-navigation-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Don’t allow multiple Chips to be selected simultaneously in this pattern. Use the cloud pattern for that purpose.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/6WdfqaGhW4Mm7a0ckF10KN/c6850fe9c03b7a2cca43b94e31afd385/chip-sub-navigation-dont.png",
          },
        ],
      },
      {
        heading: "Chip Icon",
        description: "",
        doContent: [
          {
            description: "Use the 'medium' size icon within the chip",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/PX9Bh1H8YBKjQbtvnHmoU/df7e30275c00fe486283af80c04c1df7/chip-icon-do.png",
          },
        ],
        dontContent: [
          {
            description: "Avoid 'x-small', 'medium' or 'large' size icons within the chip",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5f2KidQrBMvqVNiAhBQ2Pg/70ac3a2aeb13dd1d2d5d838f7b795749/chip-icon-dont.png",
          },
        ],
      },
    ],

    behaviour: {
      list: [""],
    },

    writing: {
      list: [""],
    },
  },
};
