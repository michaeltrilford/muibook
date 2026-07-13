import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  SmartCard: {
    title: "Smart Card",
    description:
      "A visually rich, responsive component used to represent digital or physical cards within interfaces such as wallets, dashboards, or rewards experiences. Designed to surface key information at a glance, with space for branding, balance, status, or interactive actions.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/7qITxDlh6vSZatNH00P4bS/4c825fa8f3109b175b0cd75a2a6d261d/Smart-card_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=440-1250&t=FSv3FEahG8VQW1FZ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/visuals-smart-card--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-smart-card/index.ts"],
    website: ["https://muibook.com/smart-card"],
    guides: ["https://guides.muibook.com/smart-card"],

    usage: {
      list: [
        "Use to display account, card, or membership information in a recognisable format.",
        "Ideal for wallets, rewards, or financial dashboards where visual identity matters.",
        "Surface primary details such as balance, expiry, or card type clearly.",
        "Avoid overloading with actions—prioritise clarity and visual hierarchy.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/7axH5SYpu0aVyMIglUrjra/1d9ab89d5861da9a22f856bd85ce9961/SmartCard_-_Anatomy.png",
      list: [
        "Type: Used to visually or semantically describe the card’s usage.",
        "Logo: Option to add logo to the card top right.",
        "Number: Only the last 4 digits are shown (no full card number for security).",
        "Partner: Section to add the card partner.",
        "Background: Ability to change card colour, add a static or animated background.",
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
          "key": "plain",
          "title": "Plain",
          "description": "An example of composing a light coloured payment card.",
          "list": [
            "Use for a static digital card representation with standard contrast."
          ]
        },
        {
          "key": "plain-inverted",
          "title": "Plain / Inverted",
          "description": "An example of composing a dark coloured payment card.",
          "list": [
            "Use the inverted treatment on dark or high-contrast card artwork."
          ]
        },
        {
          "key": "animated",
          "title": "Animated",
          "description": "Use animation to bring vibrancy and life to what is often a static representation of a digital card.",
          "list": [
            "Use motion sparingly and preserve reduced-motion behavior."
          ]
        },
        {
          "key": "logo",
          "title": "Logo",
          "description": "The logo area, positioned at the top-right of the card, has a maximum size of 220×126px and scales down responsively on smaller devices.",
          "list": [
            "Import the logo using the logo property",
            "Set the logo-height to an appropriate size no larger than 126px",
            "If your SVG is at intended height, then logo-height isn't required",
            "When using a 2x/3x PNGs and resize with logo-height"
          ]
        },
        {
          "key": "frozen",
          "title": "Frozen",
          "description": "Use the frozen state to clearly indicate when a card is inactive or temporarily disabled.",
          "list": [
            "Use only when the card is inactive or temporarily unavailable."
          ]
        },
        {
          "key": "background-image",
          "title": "Background-Image",
          "description": "Add a unique background image or an alternative to logo placement",
          "list": [
            "Choose artwork that preserves legibility for card details and controls."
          ]
        },
        {
          "key": "background-color",
          "title": "Background-Color",
          "description": "Apply a background colour that aligns with your organisation’s brand.",
          "list": [
            "Maintain sufficient contrast between the background and all card content."
          ]
        },
        {
          "key": "payment-networks",
          "title": "Payment Networks",
          "description": "Use the partner prop to slot in other payment networks",
          "list": [
            "Use the partner API for the supported payment network identity."
          ]
        },
        {
          "key": "reward-cards",
          "title": "Reward Cards",
          "description": "Utilising the provided props to create bespoke digital cards.",
          "list": [
            "Use the same content hierarchy for branded reward and membership cards."
          ]
        }
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "smart-card",
          name: "Smart Card",
          description:
            "The Smart Card composition uses slats to present structured information in a compact format. Slats help organise details such as titles, descriptions, and supporting actions, making the card easy to scan and interact with.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/74knMtil1vp9nHPPWXM1kr/54f8d978b0a82bca2c126e8ab800826f/SmartCard_-_Card_Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "",
          link: "",
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
