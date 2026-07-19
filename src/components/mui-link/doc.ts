import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Link: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["before","after"],
    },
    title: "Link",
    description:
      "Links are used to navigate between pages or external content. They are visually distinct from surrounding text by using underlines — a familiar and accessible pattern that ensures clarity and consistency.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/7bK1593sNzW75ZoqBupCRj/0420d8ef12472208403efa48d2fe98d6/Link_-_Home_Image.png",
    ],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-663&t=fSFYVey9aCoE5oQa-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/actions-link--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-link/index.ts"],
    website: ["https://muibook.com/link"],
    guides: ["https://guides.muibook.com/link"],

    usage: {
      list: [
        "Use links to navigate to related content or different pages.",
        "Use for navigation only — use buttons for actions like submitting forms or changing data.",
        "Keep link text concise and descriptive. Avoid vague labels like 'Click here.'",
        "Use full sentences or phrases that clearly describe the destination.",
        "Prefer inline links within body text unless a more prominent callout is needed.",
        "Use variant='unstyled' when Link wraps structured, non-interactive content such as Card and that content must own all visible surface, spacing, and typography.",
        "Do not place links, buttons, or other interactive controls inside an unstyled Link.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/6Rbr0KRWAiNRuPsagpreV7/2adc3626aa45ddc95ddf7d0a508c7917/Link_-_Anatomy.png",
      list: [
        "LABEL: Text describing the link / link button action. Use action verbs or phrases to tell the user what will happen next, and follow the link label content guidelines.",
        "BEFORE: An optional area to include an icon before the label. Use an icon to add additional affordance where the icon has a clear and well-established meaning. Most links don't require an icon, so be consistent and deliberate when you do.",
        "AFTER: An optional area to include an icon after the label, often used for a chevron-down-arrow icon to indicate a dropdown menu or accordion experiences where the placement is on the far right of the link.",
        "ICON ONLY: Use when the action is easily understood and space is limited.",
      ],
    },

    variants: {
      items: [
        {
          key: "size-large",
          title: "Size: Large",
          description:
            "Used when a link needs to stand out in layouts, such as hero sections or alongside large headings. If used inline, it should match the surrounding text size to maintain visual hierarchy and scale consistency. E.g. Use medium size icon when it is paired with large sized link.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/Tbxhps7s88CFzROYc0Lqs/3440df9aefca7cb9de3ce5015a3a4e82/Default_-_Large.png",
        },

        {
          key: "size-medium",
          title: "Size: Medium (Default)",
          description:
            "The standard size for most link usage. Works well inline with body text or as standalone links within common page layouts. When used inline, it aligns with default body text for consistent reading flow. E.g. Use small size icon when it is paired with medium sized link.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3NbinCPLEbtetN63xh18Sy/e0a0e9bbcd11a71faefc6ad1fc0e064d/Default_-_Medium.png",
        },
        {
          key: "size-small",
          title: "Size: Small",
          description:
            "Ideal for dense interfaces or compact areas such as cards, side panels, or footnotes. When used inline, it should match the smaller text size to preserve a balanced visual rhythm. E.g. Use x-small size icon when it is paired with small sized link.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4uaoT2KHM6ux4X30BxwGYo/91137cc74414f2f32b869fae59f9625d/Default_-_Small.png",
        },
        {
          key: "size-x-small",
          title: "Size: XSmall",
          description:
            "Used sparingly in tight spaces like toolbars, metadata, or inline legal text. Should align with surrounding text to avoid disrupting scale and hierarchy. E.g. Use xx-small size icon when it is paired with x-small sized link.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/27dAzNJ6Q5XHVKv5ROXq36/ace1f6540b5f363624730be001bf91ce/Default_-_XSmall.png",
        },

        {
          key: "primary",
          title: "Primary",
          description:
            "A high emphasis link style used for key navigation or calls to action. Visually aligned with the primary button to ensure consistency across components. When an icon is slotted into a link, it automatically inherits the link button’s default icon size. If you need a different look or emphasis, you can override the size as required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7wDlLjYvZEOgP8bQ6mfOuY/51b39a09c73f93ee9291e1e053df308a/Primary.png",
        },

        {
          key: "primary-icon-only",
          title: "Primary - IconOnly",
          description:
            "An icon only version of the primary link. Best used when the icon meaning is immediately clear, such as external links, arrows, or downloads. Uses a small size icon when pairing with other buttons, or medium size icon for standalone actions.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5sEr4Bhu2mwobKt6yPO9T7/a248fc0fe630ddd7f837c256a9aac126/Primary_-_IconOnly.png",
        },
        {
          key: "secondary",
          title: "Secondary",
          description:
            "An icon only version of the primary link. Best used when the icon meaning is immediately clear, such as external links, arrows, or downloads. Uses a small size icon when pairing with other buttons, or medium size icon for standalone actions.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1y7LN0FWjqrAQim9y289YN/2a65b13be6f42399404fb5bb68014700/Secondary.png",
        },
        {
          key: "secondary-icon-only",
          title: "Secondary - IconOnly",
          description:
            "An icon only version of the secondary link. Ideal for contextual actions placed beside content or inside user interface components. Uses a small size icon when pairing with other buttons, or medium size icon for standalone actions.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/nWMRYy5KcAqFxnrRdBXJS/d02dc2a67ae81bca02b82645c998fb9b/Secondary_-_IconOnly.png",
        },
        {
          key: "tertiary",
          title: "Tertiary",
          description:
            "A subtle and low emphasis style often used inline with body text or in subdued areas of the interface. Mirrors the styling of the tertiary button for visual harmony in dense content. When an icon is slotted into a link, it automatically inherits the link button’s default icon size. If you need a different look or emphasis, you can override the size as required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/ydUs1pJsUgg7JBX7xpIOW/8e8cd367963506e35f39a97a8f41d616/Tertiary.png",
        },
        {
          key: "tertiary-icon-only",
          title: "Tertiary - IconOnly",
          description:
            "A minimal visual style with just an icon. Best for lightweight or background interactions in compact spaces. Uses a small size icon when pairing with other buttons, or medium size icon for standalone actions.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/79wxg2B2u21x1qAKTsFOIM/d8c1665de85c90983bbe50d3762f2298/Tertiary_-_IconOnly.png",
        },
        {
          key: "overlay",
          title: "Overlay",
          description:
            "Use on layered media or tinted surfaces where link actions need contrast without heavy visual weight. Works well for controls rendered over previews and imagery.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1y7LN0FWjqrAQim9y289YN/2a65b13be6f42399404fb5bb68014700/Secondary.png",
        },
        {
          key: "attention",
          title: "Attention",
          description:
            "A visually distinct style intended to highlight urgency, important information, or warnings. Styled to match the attention button, typically used in upgrade prompts or legal notices. When an icon is slotted into a link, it automatically inherits the link button’s default icon size. If you need a different look or emphasis, you can override the size as required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/6grNjw60gY1ShYuexn23oX/b1cd5e10f9a1f5b8e5e3df4bf4780a0a/Attention.png",
        },
        {
          key: "attention-icon-only",
          title: "Attention - IconOnly",
          description:
            "An icon only variant that draws attention to critical actions or time sensitive content. Uses a small size icon.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5osepffgbQtuUmunLgCDPH/83490dc2ac0ef308a53e16e5b992efc5/Attention_-_IconOnly.png",
        },
      ],
    },

    stories: {
      items: [
        {
          "key": "link-sizes",
          "title": "Link: Sizes",
          "description": "Link sizes should match the surrounding body text size when nested within a paragraph.",
          "list": [
            "Use Link for navigation to another location or resource; use Button for an immediate command."
          ]
        },
        {
          "key": "link-button-x-small",
          "title": "Link Button: X-Small",
          "description": "When a link includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the action will respect the value you set.",
          "list": [
            "Highly compact UI regions",
            "Dense application toolbars",
            "Tight data tables",
            "Compact control panels"
          ]
        },
        {
          "key": "link-button-small",
          "title": "Link Button: Small",
          "description": "When an action includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the action will respect the value you set.",
          "list": [
            "Toolbar actions with mixed icon/text",
            "Discrete filters and utility actions",
            "Secondary or supporting navigation"
          ]
        },
        {
          "key": "link-button-medium-default",
          "title": "Link Button: Medium (Default)",
          "description": "When an action includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the action will respect the value you set.",
          "list": [
            "Standard text-level actions",
            "Card actions (primary/secondary)",
            "Modal and dialog interactions",
            "Navigation elements within body text",
            "Places where links appear in default reading flow",
            "Form inputs (e.g., hero search bars)"
          ]
        },
        {
          "key": "link-button-large",
          "title": "Link Button: Large",
          "description": "When an action includes an icon, the system automatically applies an appropriate icon size. If needed, you can override this by providing a custom size—the action will respect the value you set.",
          "list": [
            "Large headings (H1/H2) and hero layouts",
            "Prominent calls to action in content",
            "Empty states and marketing content",
            "Interfaces where the link must stand out more than standard body actions"
          ]
        },
        {
          "key": "url",
          "title": "URL",
          "description": "Uses Link for a standard URL destination.",
          "list": [
            "Use Link for navigation to another location or resource; use Button for an immediate command."
          ]
        },
        {
          "key": "external-link",
          "title": "External link",
          "description": "Navigates to an external resource with an explicit affordance.",
          "list": [
            "Indicate when a destination opens another site or context."
          ]
        },
        {
          "key": "primary-link",
          "title": "Primary Link",
          "description": "Demonstrates primary link with Link.",
          "list": [
            "Use Link for navigation to another location or resource; use Button for an immediate command."
          ]
        },
        {
          "key": "secondary-link",
          "title": "Secondary Link",
          "description": "Demonstrates secondary link with Link.",
          "list": [
            "Use Link for navigation to another location or resource; use Button for an immediate command."
          ]
        },
        {
          "key": "stroke-ring",
          "title": "Stroke: Ring",
          "description": "Use a ring shadow when you prefer that approach for action-style link borders.",
          "list": [
            "Use stroke=\"ring\" to draw the action-style link stroke with an inset shadow instead of a physical border.",
            "Pair ring-stroked links with ring-stroked buttons when they need to share the same visual border treatment.",
            "Use stroke-ring-size=\"100\" for the default ring, and increase only when more contrast is needed."
          ]
        },
        {
          "key": "tertiary-link",
          "title": "Tertiary Link",
          "description": "Demonstrates tertiary link with Link.",
          "list": [
            "Use Link for navigation to another location or resource; use Button for an immediate command."
          ]
        },
        {
          "key": "attention-link",
          "title": "Attention Link",
          "description": "Demonstrates attention link with Link.",
          "list": [
            "Use for navigation associated with destructive or high-risk content, not for destructive commands."
          ]
        },
        {
          "key": "overlay-link",
          "title": "Overlay Link",
          "description": "Overlay links on image surfaces using the overlay variant.",
          "list": [
            "Use over media only when contrast remains sufficient in every image state."
          ]
        },
        {
          "key": "link-before-and-after",
          "title": "Link (Before & After)",
          "description": "Composes leading and trailing content with Link.",
          "list": [
            "Use x-small size icon when it is paired with text"
          ]
        },
        {
          "key": "link-button-before-and-after",
          "title": "Link Button (Before & After)",
          "description": "Composes leading and trailing content with Link.",
          "list": [
            "Use small (default) size icon when paired with text-based action is used in a button group",
            "Use medium size icon when the icon-only action appears on its own. E.g. Menu"
          ]
        },
        {
          "key": "primary-icon-only",
          "title": "Primary: Icon-Only",
          "description": "Uses an icon-only Link with the primary treatment.",
          "list": [
            "Use small (default) size icon when paired with text-based action is used in a button group",
            "Use medium size icon when the icon-only action appears on its own. E.g. Menu"
          ]
        },
        {
          "key": "secondary-icon-only",
          "title": "Secondary: Icon-Only",
          "description": "Uses an icon-only Link with the secondary treatment.",
          "list": [
            "Use small (default) size icon when paired with text-based action is used in a button group",
            "Use medium size icon when the icon-only action appears on its own. E.g. Menu"
          ]
        },
        {
          "key": "tertiary-icon-only",
          "title": "Tertiary: Icon-Only",
          "description": "Uses an icon-only Link with the tertiary treatment.",
          "list": [
            "Use small (default) size icon when paired with text-based action is used in a button group",
            "Use medium size icon when the icon-only action appears on its own. E.g. Menu"
          ]
        },
        {
          "key": "attention-icon-only",
          "title": "Attention: Icon-Only",
          "description": "Uses an icon-only Link with the attention treatment.",
          "list": [
            "Use small (default) size icon when paired with text-based action is used in a button group",
            "Use medium size icon when the icon-only action appears on its own. E.g. Menu"
          ]
        },
        {
          "key": "part-selectors",
          "title": "Part Selectors",
          "description": "Ideal for building custom web-component compositions using MUI and scoped CSS styles.",
          "list": [
            "Prefer semantic tokens before applying one-off part customisation."
          ]
        }
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
          name: "Button",
          link: "https://guides.muibook.com/button",
        },
        {
          name: "Icons",
          link: "https://guides.muibook.com/icons",
        },
      ],
    },

    rules: [
      {
        heading: "Link vs Button",
        description:
          "Links and Buttons may look similar, but links are for navigating between pages or sections of your app or site, while buttons are for triggering actions.",
        doContent: [
          {
            description: "Use a link when navigating to another page or view.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/7xOE9DNKWgy1lZoT0FbMOW/cc13fbeeaa85b2507087645d925d7323/button-vs-link-do.png",
          },
        ],
        dontContent: [
          {
            description: "Don’t use a link to trigger tasks like submitting a form or saving data.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/6tSAw6uBvg142Gzw7tenBc/4b8db682687b42f3c53fc32557cc4eee/button-vs-link-do-not.png",
          },
        ],
      },
      {
        heading: "Text & Icon Actions",
        description: "",
        doContent: [
          {
            description: "Use the 'small' size icon within a medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/2W1xs6NPj3jRrW6ZaVGRvZ/3a11566b68fffda85bf5f780c4d6a394/dropdown-bar-icon-do.png",
          },
        ],
        dontContent: [
          {
            description: "Avoid 'x-small', 'medium' or 'large' size icons within a medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/6BgHzCgKqk44piisNH4tE6/c08d91a1cf5231a089844d20f6ab968c/dropdown-bar-icon-dont.png",
          },
        ],
      },
      {
        heading: "Icon-Only Actions",
        description: "",
        doContent: [
          {
            description: "Use a 'medium' size icon when using an icon-only medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/3syzrNBEXbBjp5hGEUvF4M/0471f4b16939d8ee54deaf48997ff455/action-icon-do.png",
          },
        ],
        dontContent: [
          {
            description: "Avoid 'x-small', 'medium' or 'large' size icons within an icon-only medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5V2TE85dY848jz1dP6Y0lC/b8e433c8abad5a4402ff1f86ddb8c848/action-icon-dont.png",
          },
        ],
      },
    ],

    behaviour: {
      list: [""],
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/qS1BAkfK7TDpy9rq4cdF1/d2535f48b4d2711f9dba6d056f21e3ec/Link_-_Behaviour.png",
    },

    writing: {
      list: [""],
    },
  },
};
