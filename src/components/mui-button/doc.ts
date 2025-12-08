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
  Button: {
    title: "Button",
    description:
      "Buttons are essential UI elements that trigger actions when clicked or tapped. They should be easily recognisable, provide clear feedback, and be accessible to all users.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/20zrQqKqJ17evXhkPwlDhq/e7ce6604a49aef64f2c4056d16ea1d97/Button_-_Home_Image.png",
    ],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-570&t=fSFYVey9aCoE5oQa-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/actions-button--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-button/index.ts"],
    website: ["https://muibook.com/#/button"],
    guides: ["https://guides.muibook.com/button"],

    usage: {
      list: [
        "Reserve buttons for core actions on a page.",
        "Avoid using too many buttons on a single page to prevent confusion.",
        "Use clear and concise label text on buttons.",
        "Ensure labels are action-oriented. E.g. 'Save'.",
        "Ensure sufficient contrast between button text and background.",
      ],
    },

    accessibility: {
      designerList: [
        "Never put tooltips on disabled buttons as Tooltips can't be reached on all devices or by some assitive technologies.",
        "Provide accessible labels for buttons.",
        "For icon-only buttons, ensure an aria-label is provided to describe the action, as screen readers cannot interpret icons alone.",
        "Ensure buttons are focusable via keyboard navigation.",
        "Use appropriate ARIA roles and properties.",
      ],
      engineerList: [
        "Never put tooltips on disabled buttons as Tooltips can't be reached on all devices or by some assitive technologies.",
        "Provide accessible labels for buttons.",
        "For icon-only buttons, ensure an aria-label is provided to describe the action, as screen readers cannot interpret icons alone.",
        "Ensure buttons are focusable via keyboard navigation.",
        "Use appropriate ARIA roles and properties.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/2LUuCpBtbL794vr5DyhMCz/44b7a3b75d0418915ebcdbf43bf1214c/button-anatomy.png",
      list: [
        "LABEL: Text describing the button action. Use action verbs or phrases to tell the user what will happen next, and follow the button label content guidelines.",
        "BEFORE: An optional area to include an icon before the label. Use an icon to add additional affordance where the icon has a clear and well-established meaning. Most buttons don't require an icon, so be consistent and deliberate when you do.",
        "AFTER: An optional area to include an icon after the label, often used for a chevron-down-arrow icon to indicate a dropdown menu or accordion experiences where the placement is on the far right of the button.",
        "ICON ONLY: Use when the action is easily understood and space is limited. For example: close, add, or menu toggle. Avoid for unfamiliar or complex actions.",
      ],
    },

    variants: {
      items: [
        {
          key: "primary",
          title: "Primary",
          description:
            "Used for the main action on a page. It should stand out visually and be used sparingly to avoid confusion. When an icon is slotted into a button, it automatically inherits the button’s default icon size. If you need a different look or emphasis, you can override the size as required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7szaFYOxeEH9F6gl0NEGz0/9657b870cd37918ae15f30cfab8b3747/button-primary.png",
        },
        {
          key: "primary-icon-only",
          title: "Primary: Icon-Only",
          description:
            "An icon only version of the primary button. Used for the main action on a page. Best when the icon meaning is immediately clear, such as submitting, navigating forward, or creating new items. Uses a small size icon when pairing with other buttons, or medium size icon for standalone actions.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/uKSyCIeL7vmWxqVoxxkRD/6d12cec0aaad006d0245a1f6dea8e7ad/button-primary-icon.png",
        },
        {
          key: "secondary",
          title: "Secondary",
          description:
            "Used for secondary actions that are not as critical as the primary action. It should be distinguishable but less prominent. When an icon is slotted into a button, it automatically inherits the button’s default icon size. If you need a different look or emphasis, you can override the size as required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5MgDmdtcMDIIsHKlzMNpj1/42fbbce26a313f72c670ff91ff4fb500/button-secondary.png",
        },
        {
          key: "secondary",
          title: "Secondary",
          description:
            "Used for secondary actions that are not as critical as the primary action. It should be distinguishable but less prominent. When an icon is slotted into a button, it automatically inherits the button’s default icon size. If you need a different look or emphasis, you can override the size as required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5MgDmdtcMDIIsHKlzMNpj1/42fbbce26a313f72c670ff91ff4fb500/button-secondary.png",
        },
        {
          key: "secondary-icon-only",
          title: "Secondary: Icon-only",
          description:
            "An icon only version of the secondary button. Used for secondary actions that support the main task. Best for actions like edit, copy, or open in a new window. Uses a small size icon when pairing with other buttons, or medium size icon for standalone actions.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3ebS7TgW2aziGoqc59UZAQ/be7c2f7d7d06970b2ddfae9fed5562b3/button-secondary-icon.png",
        },
        {
          key: "tertiary",
          title: "Tertiary",
          description:
            "Used for less important actions or actions that complement primary and secondary actions. They should be the least prominent. When an icon is slotted into a button, it automatically inherits the button’s default icon size. If you need a different look or emphasis, you can override the size as required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/78O8tlBpDFb3rxooJkRGgs/27138560e395e947c8782feba06d3f6c/button-tertiary.png",
        },
        {
          key: "tertiary-icon-only",
          title: "Tertiary: Icon-only",
          description:
            "An icon only version of the tertiary button. Designed for lightweight or supporting actions with minimal emphasis, such as info, settings, expand, open a menu, or close. Uses a small size icon when pairing with other buttons, or medium size icon for standalone actions.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/50Nmp65TaWcwTixZhpLoUT/af5c8743d1482969667cf2a063428759/button-tertiary-icon.png",
        },
        {
          key: "attention",
          title: "Attention",
          description:
            "Used for critical or potentially destructive actions, such as deleting an item or submitting sensitive information. It should stand out clearly to alert users and prompt deliberate interaction. When an icon is slotted into a button, it automatically inherits the button’s default icon size. If you need a different look or emphasis, you can override the size as required.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/6XBCZnwgBw6zp2fjJQR7ko/70a3c7e8931b4fbf442dd997a57e1058/button-attention.png",
        },
        {
          key: "attention-icon-only",
          title: "Attention: Icon-only",
          description:
            "An icon only version of the attention button. Used for critical or potentially destructive actions, such as delete, remove, or report. Uses a small size icon when pairing with other buttons, or medium size icon for standalone actions.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1TDTCC0SZZJL3cBEmqjs8Q/29ba81f3f76fb4d15aaa93d25aec87d4/button-attention-icon.png",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "in-browser-design-guidelines",
          name: "In-browser Design Guidelines",
          description:
            "A promotional example showcasing the in-browser design guidelines feature available on the Muibook website.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5YR94S9N6P5No4lNQFBxZb/45360d599105d16309486d33ca0705f1/Button_-_Composition.png",
        },
        {
          key: "onboarding-form",
          name: "Onboarding Form",
          description:
            "Demonstrates an onboarding form within a card, using logic to confirm terms acceptance. Components include Heading, Input Fields, Checkbox, and Button.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1NrgynTcdmVVKSYCsQwlOW/5fc4776c1860b498a59a2865b4e57ecb/Card-Onboarding-Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Link",
          link: "https://guides.muibook.com/link",
        },
        {
          name: "Icons",
          link: "https://guides.muibook.com/icons",
        },
      ],
    },

    rules: [
      {
        heading: "Primary vs Secondary",
        description:
          "Primary buttons signify the main action on a page or view. Use only one per context to avoid confusion. Secondary buttons support the primary action and are used for supplementary or less critical choices.",
        doContent: [
          {
            description:
              "Use one clear primary action, supported by a secondary button for an alternative or reversible choice.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5xunviJfjqUYYS5yWSfOqW/56b8cbaab4aeb86cb7585120c0ef911c/primary-actions-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Avoid giving multiple buttons equal visual weight, as this creates confusion about what to do next.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/64qD6QvbuqhFgHbj9IEOiD/f61a0250d0139abe4c8f6d9307ce5cad/primary-actions-do-not.png",
          },
        ],
      },
      {
        heading: "Primary and Tertiary",
        description:
          "Tertiary actions are low-priority, optional paths that support the experience without distracting from the primary or secondary actions. They are typically styled as text buttons and used for non-critical choices like “Skip” or “Learn more.”",
        doContent: [
          {
            description:
              "The tertiary action offers an optional, less prominent path that doesn’t compete visually with the primary action.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/3eFnCzhfq4d10CALfudUZU/de4b6a7d26964acae2245b73a158517d/tertiary-actions-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "A tertiary action styled like a primary button creates visual confusion and implies equal importance, which undermines the intended hierarchy.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/3K59awxzUKnnihZuDFyOpV/a8ba8a13d36bc63208a3079d0c4c86ac/tertiary-actions-do-not.png",
          },
        ],
      },
      {
        heading: "Pairing Buttons",
        description:
          "In circumstances where an icon-only button is paired with a button that includes both a label and an icon, use a medium icon for the icon-only button and an small icon for the labeled button. Follow a right-to-left layout, placing the primary action on the right.",
        doContent: [
          {
            description:
              "Place the primary action on the right and use appropriate icon sizes: medium for icon-only, small for labeled buttons.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/34h9SltXeGjU2fRc5iM4PE/438f84d21e142c84bb98c1965a40b36b/button-groups-do.png",
          },
        ],
        dontContent: [
          {
            description: "Don’t place the primary action on the left or mismatch icon sizing for either button type.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5fwaA1NM6AAQMPbV2vwPMR/b0a491b6aca705f7493806fd13f99734/button-groups-do-not.png",
          },
        ],
      },
      {
        heading: "Table Button-Group",
        description:
          "You can group multiple actions in a table’s action cell, but be mindful not to overwhelm rows with too many buttons. Prioritize clarity by showing only the most relevant actions per row.",
        doContent: [
          {
            description:
              "Use a secondary button for labeled actions paired with a tertiary icon-only button, and apply medium icons for icon-only buttons and small icons for labeled buttons.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/7beVBzijhfRsyorthBC1fd/c7460f72456cdb1982b122df77dc9bf7/table-button-group-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Avoid using primary, tertiary, or attention variants for labeled buttons, as they can draw too much attention and disrupt the visual hierarchy.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/7zoFP4Rl3InXCgP0tiDQg0/18ec719eb7a970da67bd12fea32c935b/table-button-group-do-not.png",
          },
        ],
      },
      {
        heading: "Button vs Link",
        description:
          "Buttons and links may look similar, but buttons are for triggering actions, while links are for navigating between pages or sections of your app or site.",
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
        heading: "Label Clarity",
        description: "",
        doContent: [
          {
            description:
              "Use clear and concise labels for buttons: Ensure each button clearly indicates its action. E.g. 'Submit'.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/3M9fgCF3JgFwDrooqXTvlf/92ad6b1c3faacebd8ea2884afadab24d/button-label-clarity-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Don't use ambiguous labels: Avoid using unclear or generic terms for buttons. E.g. 'Click here'.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/1rXUNW1YiCVPJ2klPwL8WT/8137762316179653687bb1c1178ceb16/button-label-clarity-do-not.png",
          },
        ],
      },
      {
        heading: "Disabled Actions",
        description:
          "Avoid disabling call-to-action buttons to prevent form submission. Instead, consider using a combination of form validation, toasts, or alerts to inform users why they can’t proceed and how to resolve the issue.",
        doContent: [
          {
            description:
              "Use form validation in combination with alerts to provide clear instructions on how to resolve the issue.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/41xe78AaqPHUxpd2RC6QoP/46b6f7217a8eb15bd928495d54a0728f/disabled-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Avoid disabling actions, as it prevents users from receiving feedback on why they can’t proceed.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/6SiZPnnUlkMbNSJzxV8unt/7e6389d85eaac161d6cfd314190010f9/disabled-do-not.png",
          },
        ],
      },
      {
        heading: "Table Button: Icon-Only",
        description:
          "Use icon-only buttons in the end (far right) cell of a table row. When implementing tables in-browser, apply the correct action boolean and column auto-spacing to ensure the header and content align properly.",
        doContent: [
          {
            description: "Use a tertiary icon-only button with a medium icon in the end table cell.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/EzbGECpviXXcjsmfftqEm/b21a44dec44b7243688fba26d2c9768c/table-button-do.png",
          },
        ],
        dontContent: [
          {
            description: "Don’t use other button variants or icon sizes in place of the designated icon-only approach.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/722XYLqqBwEJXE6qG0ZLDE/6e9a4d25fc5292688e62960090d92230/table-button-do-not.png",
          },
        ],
      },
      {
        heading: "Card, Dialog and Drawer Actions",
        description:
          "It is best practice to place actions in a footer for cards, dialogs, and drawers, providing a consistent location for users to find and interact with them.",
        doContent: [
          {
            description:
              "Place actions in a footer within cards, dialogs, and drawers to ensure they are easily accessible and follow a consistent pattern.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/4nFRwg1AOL74fQXM6OQvnV/d9c1eed80b86919656fb3ab8005f7d71/panel-actions-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Avoid placing actions in unconventional or hard-to-find locations within cards, dialogs, or drawers, as this can make them difficult for users to locate and use effectively.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/3caBEJQxfRasuxw62RQVbw/4e3620f4e62f2fa8b8f8aa504625776a/panel-actions-do-not.png",
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
      {
        heading: "Text & Icon Actions",
        description:
          "Use icon-only buttons in the end (far right) cell of a table row. When implementing tables in-browser, apply the correct action boolean and column auto-spacing to ensure the header and content align properly.",
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
    ],

    behaviour: {
      description:
        "Buttons should provide visual feedback on hover and click. These states should be factored into the component and baked into the corresponding states in code.",
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/3h2wNhGxd4f9AENDf3K7Qa/0ca6f8b224923e7fa9710735dc8f54e0/Button_-_Behaviour.png",
      list: [
        "Default: Normal state.",
        "Hover: Changes when a user hovers over the button.",
        "Focus: Ensure buttons display a visible focus indicator when navigated to via keyboard.",
        "Disabled: Non-interactive, faded appearance.",
      ],
    },

    writing: {
      list: [
        "Keep button text short and action-oriented.",
        "Use sentence case for button text.",
        "Avoid using multiple lines of text on a button.",
      ],
    },
  },
};
