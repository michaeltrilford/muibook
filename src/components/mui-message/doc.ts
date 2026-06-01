import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Message: {
    title: "Message",
    description:
      "Message is a persistent page-level notification for durable status, guidance, or system context that needs more weight than inline body copy. It should include a clear heading and slotted supporting body content, and should not be used as a styled paragraph, field helper, or routine inline callout.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/01OU9JbOlDZGvbpkq2ismi/b0410cb8002858ded88987d9556daa04/Message_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=9-1053&t=ZA9uH4LK37tSuk6r-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/feedback-message--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-message/index.ts"],
    website: ["https://muibook.com/message"],
    guides: ["https://guides.muibook.com/message"],

    usage: {
      list: [
        "Use Message for persistent page-level or section-level notices that apply to the surrounding workflow.",
        "Always provide a specific heading and place the supporting copy in the default slot using Body, List, Link, or other content components.",
        "Do not use Message as a styled text block, generic inline note, or mid-content emphasis treatment.",
        "For form guidance, validation, or field status, use Form Message inside Field with slot='message'.",
        "For lightweight inline context, use Body size='small' with an info icon in slot='before'.",
        "Reserve positive, warning, and attention variants for meaningful page-level status or severity; avoid using them for routine explanatory copy.",
      ],
    },

    accessibility: {
      designerList: [
        "ARIA-live is built in, using POLITE + ASSERTIVE for screen readers.",
        "Neutral, Postive, Info support the role of STATUS for screen reader feedback.",
        "Warning, Attention support the role of ALERT for screen reader feedback.",
      ],
      engineerList: [
        "ARIA-live is built in, using POLITE + ASSERTIVE for screen readers.",
        "Neutral, Postive, Info support the role of STATUS for screen reader feedback.",
        "Warning, Attention support the role of ALERT for screen reader feedback.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/6S1MOtZZKP2bxYuIUNScSC/993a910363fbfbba29a3de384ecb182a/Message_-_Anatomy.png",
      list: [
        "Preset icon: Communicates the type of message visually. E.g. neutral, positive, info, warning, attention.",
        "Heading: Summarises the page-level notice. Keep this short and do not place the full message body here.",
        "Default slot: Contains the supporting body content, such as Body, List, Link, or related message actions.",
      ],
    },

    variants: {
      items: [
        {
          key: "plain",
          title: "Plain",
          description:
            "A subtle, transparent style for passive page-level notices on vibrant backgrounds. Use sparingly for durable non-critical information, not inline helper copy. This variant sets aria-live='polite' and role='status' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/21KWc3TZOJPqZ2BtZ3ngrY/3cbf4aa6df3a72f195eebaa8fe8ecfde/message-plain.png",
        },
        {
          key: "neutral",
          title: "Neutral",
          description:
            "The Neutral state offers a calm, balanced tone for non-critical persistent notices. Use it for page-level information such as background status or workflow guidance. This variant uses aria-live='polite' and role='status' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2VF8KPxaXCm6P4dlpsAnXs/5a2011d1a63a900dcdd6669ec5c097e9/message-neutral.png",
        },
        {
          key: "positive",
          title: "Positive",
          description:
            "The Positive state conveys durable success or completion status at page level. Avoid using it for small inline confirmations where Body or Form Message would be lighter. This variant uses aria-live='polite' and role='status' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2HOuPOpHOuMGuVUoPAs5MI/ff1e156bc8f31e580972289fcc7bf3d7/message-positive.png",
        },
        {
          key: "info",
          title: "Info",
          description:
            "The Info state supports page-level system information, feature changes, or workflow context. For inline notes, use Body with an info icon instead. This variant uses aria-live='polite' and role='status' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1x63W880Trpx0GYiYQJhCt/72c09a93d6ec34a18bc15310927fe9ef/message-info.png",
        },
        {
          key: "warning",
          title: "Warning",
          description:
            "The Warning state alerts users to page-level issues that may require attention, such as unsaved changes, consequences, limitations, or expirations. Use Form Message for field-specific warnings. This variant uses aria-live='assertive' and role='alert' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/50V1Ap7vVxPUWRbbKh0kx5/2fe4c203befa779087c8b23984d951b7/message-warning.png",
        },
        {
          key: "attention",
          title: "Attention",
          description:
            "The Attention state demands immediate focus for critical page-level issues, such as system errors, security problems, or time-sensitive interruptions. Do not use it for ordinary content emphasis. This variant uses aria-live='assertive' and role='alert' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5GXIEuluNJBlg8h4hDCfWH/ddeec560354ab06af73bf5c5d8749c12/message-attention.png",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "plain-message",
          name: "Plain message",
          description:
            "This example uses the Plain variant, suitable for both white and colored backgrounds. It’s ideal for presenting information passively, without demanding user attention. In this case, it’s used to deliver accessibility notes.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3akJJDd28DOIhQrYq6g4y2/456c02f32dc9c40d84d92371b7ddbead/message-composition-neutral.png",
        },
        {
          key: "info-message",
          name: "Info message",
          description:
            "Use a page-level Info message to remind users to log in to the provided tools, ensuring the MUI Guidelines are shown instead of the default guidelines.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1ySFimf3eEleYLPKomWuem/34772aed4257db976f2ca8cb633d3d5b/message-composition-info.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Alert",
          link: "https://guides.muibook.com/alert",
        },
        {
          name: "Form Message",
          link: "https://guides.muibook.com/field",
        },
        {
          name: "Body",
          link: "https://guides.muibook.com/body",
        },
      ],
    },

    rules: [
      {
        heading: "Use as a page-level notification",
        description:
          "Message should feel like a heavier persistent notice, not a general-purpose text style.",
        doContent: [
          {
            description:
              "Use a concise heading with slotted Body, List, or Link content for supporting detail.",
            image: "",
          },
        ],
        dontContent: [
          {
            description:
              "Do not use Message for inline guidance, form helper text, or routine status copy; use Form Message or Body instead.",
            image: "",
          },
        ],
      },
    ],

    behaviour: {
      list: [
        "Message is persistent and integrated into the page layout.",
        "Neutral, Positive, and Info use role='status' with polite live-region behaviour.",
        "Warning and Attention use role='alert' with assertive live-region behaviour.",
      ],
    },

    writing: {
      list: [
        "Write the heading as the short status or notice title.",
        "Write the body as the supporting context, impact, or next action.",
        "Keep inline helper copy out of Message; use lighter text treatments for routine guidance.",
      ],
    },
  },
};
