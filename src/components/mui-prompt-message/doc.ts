import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  PromptMessage: {
    title: "Prompt Message",
    description:
      "Prompt Message provides a consistent conversation row shell with avatar and message content slots.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-prompt-message/index.ts"],
    website: ["https://muibook.com/#/prompt-message"],
    guides: ["https://guides.muibook.com/body"],
    usage: {
      list: [
        "Use for chat-style reply rows in assistant and support interfaces.",
        "This component is extracted from composition patterns to keep conversation shells consistent.",
        "Slot avatar content into slot='avatar'.",
        "Use body/content components for message text.",
        "Prefer this component over ad hoc grid wrappers when building threaded chat content.",
      ],
    },
    accessibility: {
      designerList: [
        "Maintain clear speaker distinction through avatar + message pairing.",
        "Keep contrast and typography readable in long conversation threads.",
      ],
      engineerList: [
        "Provide meaningful avatar labels where identity context matters.",
        "Preserve DOM reading order (identity first, then message content).",
        "Avoid injecting decorative-only text into message content; keep semantics focused on conversation copy.",
      ],
    },
    anatomy: { image: "", list: ["Bubble container", "Avatar slot", "Message content slot"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Avatar", link: "https://guides.muibook.com/avatar" },
        { name: "Body", link: "https://guides.muibook.com/body" },
      ],
    },
    rules: [
      {
        heading: "Pattern Rule",
        description: "Use Prompt Message as the base conversation row primitive.",
        doContent: [{ description: "Compose identity + message content through avatar and body slots.", image: "" }],
        dontContent: [{ description: "Avoid custom one-off bubble containers per page.", image: "" }],
      },
    ],
    behaviour: {
      list: [
        "Avatar and message content align consistently across rows.",
      ],
    },
    writing: {
      list: [
        "Keep message copy concise and scannable in multi-row threads.",
      ],
    },
  },
};
