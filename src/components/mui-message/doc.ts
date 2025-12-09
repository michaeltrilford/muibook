import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Message: {
    title: "Message",
    description:
      "The message component provides persistent, non-dismissible notifications that remain visible until the system determines they should be suspended. Unlike alerts, these messages are static elements integrated into the page layout, offering continuous information without disrupting the user’s workflow.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/01OU9JbOlDZGvbpkq2ismi/b0410cb8002858ded88987d9556daa04/Message_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=9-1053&t=ZA9uH4LK37tSuk6r-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/feedback-message--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-message/index.ts"],
    website: ["https://muibook.com/#/message"],
    guides: ["https://guides.muibook.com/message"],

    usage: {
      list: [
        "Plain: A subtle, transparent style suited for vibrant backgrounds where minimal visual impact is preferred.",
        "Neutral: A calm, balanced tone for non-critical, persistent messages.",
        "Positive: To confirm successful actions like form submissions, saves, or completed tasks.",
        "Info: To share feature announcements, enhancements, or contextual onboarding tips.",
        "Warning: Caution users about potential issues such as unsaved changes or upcoming expirations.",
        "Attention: Highlight urgent issues like system errors or security breaches requiring immediate action.",
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
        "Customisable title: Allows for a general heading that describes the message details or guidance relevant to the situation.",
        "Customisable text: Allows for specific details or guidance relevant to the situation.",
      ],
    },

    variants: {
      items: [
        {
          key: "plain",
          title: "Plain",
          description:
            "A subtle, transparent style designed for vibrant backgrounds where minimal visual impact is preferred. Best for passive messages like accessibility notes, system status, or routine updates. Use for non-critical information that doesn’t require immediate attention or action. This variant sets aria-live='polite' and role='status' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/21KWc3TZOJPqZ2BtZ3ngrY/3cbf4aa6df3a72f195eebaa8fe8ecfde/message-plain.png",
        },
        {
          key: "neutral",
          title: "Neutral",
          description:
            "The Neutral state offers a calm, balanced tone for non-critical, persistent messages. It is suitable for displaying non-urgent information, such as background status like sync confirmation or feature explanations. This variant uses aria-live='polite' and role='status' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2VF8KPxaXCm6P4dlpsAnXs/5a2011d1a63a900dcdd6669ec5c097e9/message-neutral.png",
        },
        {
          key: "positive",
          title: "Positive",
          description:
            "The Positive state conveys successful actions, confirmations, or achievements, helping foster a sense of accomplishment and satisfaction. It’s used to indicate things like successful form submissions, completed tasks, or acknowledged milestones. This variant uses aria-live='polite' and role='status' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2HOuPOpHOuMGuVUoPAs5MI/ff1e156bc8f31e580972289fcc7bf3d7/message-positive.png",
        },
        {
          key: "info",
          title: "Info",
          description:
            "The Info state provides helpful messages that inform users about system status, feature updates, or changes—guiding them without urgency. It’s suitable for announcing new features, enhancements, or system changes, and works well for onboarding tips or contextual help. This variant uses aria-live='polite' and role='status' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1x63W880Trpx0GYiYQJhCt/72c09a93d6ec34a18bc15310927fe9ef/message-info.png",
        },
        {
          key: "warning",
          title: "Warning",
          description:
            "The Warning state alerts users to potential issues that may require attention, helping prevent errors or misunderstandings. It’s commonly used to notify users of unsaved changes, actions with potential consequences, or upcoming limitations or expirations. This variant uses aria-live='assertive' and role='alert' for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/50V1Ap7vVxPUWRbbKh0kx5/2fe4c203befa779087c8b23984d951b7/message-warning.png",
        },
        {
          key: "attention",
          title: "Attention",
          description:
            "The Attention state demands immediate user focus, highlighting critical issues that require prompt action. It’s used to alert users to urgent problems like system errors or security breaches, or for time-sensitive notifications that significantly impact the user experience. This variant uses aria-live='assertive' and role='alert' for accessibility.",
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
