import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  PromptMessage: {
    title: "Prompt Message",
    description:
      "Prompt Message provides a consistent conversation row shell with optional avatar and message content slots.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2117-17601&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/ai-llm-prompt-message--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-prompt-message/index.ts"],
    website: ["https://muibook.com/prompt-message"],
    guides: ["https://guides.muibook.com/prompt"],
    usage: {
      list: [
        "Use for chat-style reply rows in assistant and support interfaces.",
        "This component is extracted from composition patterns to keep conversation shells consistent.",
        "Slot avatar content into slot='avatar' when speaker identity needs profile treatment.",
        "Use slot='header' for message metadata, work summaries, timing, or disclosure controls.",
        "Use slot='footer' for response actions such as copy, retry, review, or timestamps.",
        "Use footer-position='outside' when message actions should sit below the bubble while still belonging to the message component.",
        "Footer actions reveal on hover/focus by default; use footer-visibility='always' when app state should keep actions pinned.",
        "Omit the avatar slot for agent/system messages that should render as plain response content.",
        "Use body/content components for message text.",
        "Prompt Message applies default vertical rhythm between direct body children.",
        "Override --prompt-message-body-space when a specific response needs tighter or looser body spacing.",
        "Use size='x-small|small|medium|large' to scale avatar/text rhythm across dense and spacious layouts.",
        "Use variant='ghost' when the message row should render without surface treatment or bubble padding.",
        "Use align='start|end' to position assistant and user messages in a conversation column.",
        "Use width='full|medium|content' instead of inline width or margin styles for common chat layouts.",
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
        "Avatar and message content align consistently across rows when an avatar is provided.",
        "Messages without an avatar collapse to a single-column content layout.",
        "Message alignment and width are controlled by host attributes so chat layout does not require custom inline styles.",
        "Footer content reveals on hover and keyboard focus, or stays visible when footer-visibility='always'.",
      ],
    },
    writing: {
      list: [
        "Keep message copy concise and scannable in multi-row threads.",
      ],
    },
  },
};
