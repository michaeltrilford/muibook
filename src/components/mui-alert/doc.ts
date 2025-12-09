import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Alert: {
    title: "Alert",
    description: "Alerts surface meaningful system messages related to the users' current task or action.",
    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/7GnGBCbpMF3wyjCDC06hX7/24739b86a907d15400fe8e9e240a9619/Alert_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-4444&t=ZA9uH4LK37tSuk6r-1",
    ],
    guides: ["https://guides.muibook.com/alert"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-alert/index.ts"],
    storybook: ["https://stories.muibook.com/?path=/docs/feedback-alert--docs"],
    website: ["https://muibook.com/#/alert"],
    usage: {
      list: [
        "Success: Confirm completed actions such as form submissions, data saves, or task completion.",
        "Info: For sharing new features, updates, contextual tips, or non-urgent system statuses.",
        "Warning: Alert users to unsaved changes, deprecated features, or risky actions.",
        "Error: Alert users of form validation issues, system failures, or tasks that need attention.",
      ],
    },
    accessibility: {
      designerList: [
        "ARIA-live is built in, using POLITE + ASSERTIVE for screen readers.",
        "The role is set to ALERT for immediate screen reader feedback.",
      ],
      engineerList: [
        "ARIA-live is built in, using POLITE + ASSERTIVE for screen readers.",
        "The role is set to ALERT for immediate screen reader feedback.",
      ],
    },
    anatomy: {
      list: [
        "Preset icon: Communicates the type of alert visually. E.g. info, success, warning, error.",
        "Preset title: Provides a clear, predefined heading that reflects the alert’s purpose.",
        "Customisable text: Allows for specific details or guidance relevant to the situation.",
      ],
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/17j3DxAFlne6rvMi6QUXqZ/aedab2c349c8f8b0a8414b41132cda51/Alert_-_Anatomy.png",
    },
    variants: {
      items: [
        {
          key: "success",
          title: "Success",
          description:
            "Indicates that an operation or action has been completed successfully. Use this variant for scenarios such as form submissions processed without errors, successful data updates or saves, and confirmations of completed tasks or actions. For accessibility, this variant uses an aria-live value of polite.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2EbJsP3GZ98WPOiF4PbGh2/bc3e020b37b73f949be745e4e26b6e5a/alert-success.png",
        },
        {
          key: "info",
          title: "Info",
          description:
            "Provides general information or updates that are helpful but not critical. This variant is used for announcing new features or updates, offering contextual information or tips, and informing users about non-urgent system statuses. For accessibility, it uses an aria-live value of polite.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1SDh1JVNouysPHylu9lTUj/6793dd8aa854d08045c2159b450b762c/alert-info.png",
        },
        {
          key: "warning",
          title: "Warning",
          description:
            "Alerts users to potential issues or situations that require caution. Common use cases include notifying about unsaved changes, indicating deprecated features or upcoming changes, and highlighting actions that may have unintended consequences. For accessibility, this variant uses an aria-live value of assertive.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2zympGRb3wlU5P36FsKWsL/dd9bde33646345e65d5bff505d512e22/alert-warning.png",
        },
        {
          key: "error",
          title: "Error",
          description:
            "Indicates that an error has occurred, requiring user attention or action. This variant is typically used for form validation errors, system failures or exceptions, and failed operations or transactions. For accessibility, it uses an aria-live value of assertive.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/zOH2Xinum4ZjIv3qp6LJM/180a2306dd624b6bc2fa55c0ad81ea0e/alert-error.png",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "ai-playground-error-1",
          name: "AI Playground (Error)",
          description:
            "Demonstrates the Muiplay AI Playground showing a floating error positioned close to the field where a prompt is required to generate a task.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/40RfRPVAN9dvWO7UFuIiUC/52de3cffd69a5bcc2e457f8de03bb9cf/Play-Alert-Composition.png",
        },
        {
          key: "ai-playground-error-2",
          name: "AI Playground (Error)",
          description:
            "Demonstrates the Muiplay AI Playground showing a floating error positioned close to the field where a prompt is required to generate a task.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/40RfRPVAN9dvWO7UFuIiUC/52de3cffd69a5bcc2e457f8de03bb9cf/Play-Alert-Composition.png",
        },
      ],
    },
    related: {
      items: [
        { name: "Message", link: "https://guides.muibook.com/message" },
        { name: "Link", link: "https://guides.muibook.com/link" },
      ],
    },
    rules: [
      {
        heading: "",
        description: "",
        doContent: [
          { description: "", image: "" },
          { description: "", image: "" },
        ],
        dontContent: [{ description: "" }, { description: "" }],
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
