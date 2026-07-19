import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Alert: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["action"],
    },
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
    website: ["https://muibook.com/alert"],
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
        "Success and Info use aria-live='polite'; Warning and Error use aria-live='assertive'.",
        "All variants use role='alert' for screen reader feedback.",
      ],
      engineerList: [
        "Success and Info use aria-live='polite'; Warning and Error use aria-live='assertive'.",
        "All variants use role='alert' for screen reader feedback.",
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

    stories: {
      items: [
        { key: "success", title: "Success", description: "Confirms that an operation completed successfully.", list: ["Use for completed submissions, saves, or tasks.", "Keep the message specific to the completed action."] },
        { key: "info", title: "Info", description: "Provides helpful, non-critical information or updates.", list: ["Use for contextual updates, tips, and non-urgent system information.", "Avoid using Info for content that does not need feedback emphasis."] },
        { key: "warning", title: "Warning", description: "Highlights a potential issue or consequence that requires caution.", list: ["Use for unsaved changes, upcoming changes, or risky actions.", "Explain what users can do to avoid the consequence."] },
        { key: "error", title: "Error", description: "Communicates a failed operation that requires attention or action.", list: ["Use for validation failures, system errors, or failed transactions.", "Describe the problem and provide a recovery path when possible."] },
        { key: "custom-label", title: "Custom Label", description: "Replaces the preset label with context-specific text.", list: ["Keep the custom label short and consistent with the alert intent."] },
        { key: "label-hidden", title: "Label Hidden", description: "Removes the visible label prefix when the content is self-explanatory.", list: ["Hide the label only when the remaining copy clearly communicates the alert intent."] },
        { key: "large", title: "Large", description: "Provides higher prominence in spacious layouts.", list: ["Use for high-visibility feedback or longer content."] },
        { key: "medium", title: "Medium", description: "Provides balanced readability and density.", list: ["Use for most in-flow feedback in forms and content pages."] },
        { key: "small", title: "Small", description: "Provides compact feedback in dense layouts.", list: ["Use in side panels, tables, and compact control groups.", "Avoid long multi-line copy at this size."] },
        { key: "size-scale", title: "Size Scale", description: "Compares all Alert sizes in one composition.", list: ["Choose size from layout density first, then message prominence.", "Keep Alert sizing consistent within a section."] },
        { key: "small-undo", title: "Small / Undo", description: "Pairs a compact Alert with a short recovery action.", list: ["Use Undo only while the previous action can still be reversed."] },
        { key: "link-sizes", title: "Link Action / Sizes", description: "Adds a navigational action across Alert sizes.", list: ["Use a Link when the next step navigates to supporting information."] },
        { key: "small-icon", title: "Small / Icon Action", description: "Pairs a compact Alert with an icon-only action.", list: ["Give icon-only actions an accessible name."] },
        { key: "close-action", title: "Action / Close Button", description: "Adds a dismiss action across Alert sizes.", list: ["Use only when dismissing the Alert does not hide required information.", "Give the close action an accessible name."] },
        { key: "undo-action", title: "Action / Undo", description: "Adds a reversible follow-up action.", list: ["Keep Undo available only for the period in which reversal remains possible."] },
        { key: "link-action", title: "Action / Link", description: "Adds a navigational follow-up action.", list: ["Use a Link for navigation and a Button for an immediate command."] },
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
