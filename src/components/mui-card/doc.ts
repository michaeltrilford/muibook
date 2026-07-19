import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Card: {
    title: "Card",
    description: "The Card provides the ability to group items or components.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/4OGlOuYuQxCTFMuIpxKK6q/e78445c43ea2f0c9934d277a2e0932a5/Card_-_Home_Image.png",
    ],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-861&t=fSFYVey9aCoE5oQa-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/layout-card--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-card"],
    website: ["https://muibook.com/card"],
    guides: ["https://guides.muibook.com/card"],

    usage: {
      list: [
        "Use cards to visually group related content, actions, or components in a structured block.",
        "Use Card for generic content containers; use Form Section when you need semantic fieldset grouping for related form controls.",
        "Use the header for titles or key actions, the body for primary content, and the footer for secondary actions or metadata.",
        "Card has no size scale. Let Grid, Container, or the parent layout determine its width; use an explicit width or max-width only for intentionally constrained reading or form layouts.",
        "Card Body size controls internal padding only. Medium is the default, small is compact, large is spacious, and none is edge-to-edge.",
        "Let Grid size repeated cards consistently instead of applying individual widths to each Card.",
        "Cards include a subtle border by default. Use borderless when you need a flush surface.",
        "Avoid overloading cards with too much content — keep them focused and scannable.",
        "Maintain consistent spacing and alignment between multiple cards to support visual rhythm.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/4EryBp3RZrsXmWloz4qX6m/d2a5dc1b34d7c65aeb62c9b0bf8cce52/Card_-_Anatomy.png",
      list: [
        "Header: Use the card header to include a title and, if needed, additional elements such as icons, actions, or helper text.",
        "Body: Add the main content of the card. It can include suitable MUI components or other relevant elements that support the card’s purpose.",
        "Footer: The footer should include actions or other relevant interactive elements.",
      ],
    },

    variants: {
      items: [
        {
          key: "",
          title: "",
          description: "",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        {
          "key": "card",
          "title": "Card",
          "description": "Demonstrates the Card Card treatment.",
          "list": [
            "Use Card to group related content and actions on a distinct surface."
          ]
        },
        {
          "key": "body-sizes",
          "title": "Card Body Sizes",
          "description": "Compares the Card Body spacing scale.",
          "list": [
            "Use small for compact summaries and dense repeated cards.",
            "Use medium for standard card content and large for prominent or spacious compositions.",
            "Use none only when content must reach the Card edges."
          ]
        },
        {
          "key": "card-footer",
          "title": "Card: Footer",
          "description": "Demonstrates the Card: Footer Card treatment.",
          "list": [
            "Use Card to group related content and actions on a distinct surface."
          ]
        },
        {
          "key": "card-image",
          "title": "Card: Image",
          "description": "Demonstrates the Card: Image Card treatment.",
          "list": [
            "Use Card to group related content and actions on a distinct surface."
          ]
        },
        {
          "key": "card-table",
          "title": "Card: Table",
          "description": "When a table is slotted into a card, it inherits curated left and right spacing to ensure it fits well within the card layout.",
          "list": [
            "Use Card to group related content and actions on a distinct surface."
          ]
        },
        {
          "key": "card-header-and-table",
          "title": "Card: Header & Table",
          "description": "You can add in a mui-rule to help add a division between the header and body of the card",
          "list": [
            "Use Card to group related content and actions on a distinct surface."
          ]
        },
        {
          "key": "slat-group",
          "title": "Slat Group",
          "description": "If a mui-slat is slotted directly into the mui-card-body,\n          if will automatically align the slats with the heading to ensure consistent alignment within a card.",
          "list": [
            "mui-slat-group is added within the mui-card-body to apply an offset for the slat items",
            "Place slats directly inside mui-card-body to inherit alignment",
            "Use this layout only for cards with limited width. For wider layouts, consider using a table."
          ]
        },
        {
          "key": "slat-group-dividers",
          "title": "Slat Group: Dividers",
          "description": "If a mui-slat is slotted directly into the mui-card-body,\n          if will automatically align the slats with the heading to ensure consistent alignment within a card.",
          "list": [
            "mui-slat-group is added within the mui-card-body to apply an offset for the slat items;\n          Place slats directly inside mui-card-body to inherit alignment",
            "Use this layout only for cards with limited width. For wider layouts, consider using a table."
          ]
        },
        {
          "key": "card-slat-detection",
          "title": "Card: Slat Detection",
          "description": "When you opt-out, you will have to craft your own spacing.",
          "list": [
            "Use Card to group related content and actions on a distinct surface."
          ]
        },
        {
          "key": "card-accordion",
          "title": "Card: Accordion",
          "description": "Demonstrates the Card: Accordion Card treatment.",
          "list": [
            "Use Card to group related content and actions on a distinct surface."
          ]
        },
        {
          "key": "card-header-and-accordion",
          "title": "Card: Header & Accordion",
          "description": "Demonstrates the Card: Header & Accordion Card treatment.",
          "list": [
            "Use Card to group related content and actions on a distinct surface."
          ]
        }
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "code-snippets",
          name: "Code Snippets",
          description:
            "An accordion in a card footer allows code snippets or supporting details to be revealed on demand, keeping the card compact while still providing access to additional information.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7FKVgkCxv3UenOQTC9Tr4R/25c357aceea16b169c48775d7363df1d/accordion_card_footer_-_composition.png",
        },
        {
          key: "account-activity",
          name: "Account Activity (Accordion + Card)",
          description:
            "Accordions can split account activity into segments, such as by year, with the ability to expand each section for detailed transactions. This makes large sets of data easier to scan and navigate.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4PEUUHgxpuDM6nDgdGOotY/bf078e07bc3fbabf07f03b99800e5306/accordion_card_body_-_composition.png",
        },
        {
          key: "account-activity",
          name: "Account Activity (Card)",
          description: "",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3XVnAUZ0RyAoZmUQ8lIniT/58fdc83a27eb294908e55476b4646374/account_activity_-_card_-_composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Slat",
          link: "https://guides.muibook.com/slat",
        },
        {
          name: "Accordion",
          link: "https://guides.muibook.com/accordion",
        },
      ],
    },

    rules: [
      {
        heading: "",
        description: "",
        doContent: [{ description: "", image: "" }],
        dontContent: [{ description: "", image: "" }],
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
