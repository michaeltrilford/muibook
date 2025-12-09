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
    storybook: ["https://stories.muibook.com/?path=/docs/content-smartcard--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-smart-card/index.ts"],
    website: ["https://muibook.com/#/smart-card"],
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
