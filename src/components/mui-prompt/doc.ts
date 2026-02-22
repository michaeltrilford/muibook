import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Prompt: {
    title: "Prompt",
    description:
      "Prompt provides a reusable prompt surface with floating actions and Enter-to-submit behavior.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-prompt/index.ts"],
    website: ["https://muibook.com/#/prompt"],
    guides: ["https://guides.muibook.com/input"],
    usage: {
      list: [
        "Use for AI/chat prompt entry surfaces with action controls.",
        "This component is extracted from composition patterns to standardize prompt behavior across experiences.",
        "Keep prompt as a controlled input in app state: write value via attribute/property and sync from input events.",
        "Use Enter submit for fast send flows; keep Shift+Enter for multiline authoring.",
        "Press Enter to submit and Shift+Enter to add a newline.",
        "Set enter-submit='false' to disable Enter submit behavior.",
        "Use slot='actions' for utility actions (attach, source, tools) and slot='actions-right' for primary send/state action.",
        "Use slot='actions-right' for a dedicated submit/toggle action separated from fan-out utilities.",
        "Use actions-fan to enable fan-out action behavior from a trigger action.",
        "Fan spread, speed, and amplitude are fixed to system defaults; tune through component tokens/CSS where needed.",
        "Built-in preview dialog handling is enabled for prompt-preview-open events.",
        "Set preview-threshold-chars to control when pasted text is converted into preview attachments.",
        "Set preview-overflow-to-preview='false' to always paste text directly into the textarea.",
        "When internal preview dialog handling is enabled, slotted prompt previews are auto-clickable by default.",
        "Set preview-auto-clickable='false' to keep previews non-clickable unless explicitly configured.",
        "Use prompt-paste to ingest user clipboard payloads and convert them into prompt-preview items.",
        "Use prompt-preview-open to react to preview activation and update app-level analytics/state.",
        "For React wrappers, map CustomEvent handlers to props (onSubmit, onPromptPaste, onPromptPreviewOpen, onEscape).",
        "Mark the trigger action with fan-trigger; if omitted, the first action is used.",
        "Prefer this component instead of ad hoc prompt wrappers when the same interaction model is needed.",
      ],
    },
    accessibility: {
      designerList: [
        "Provide clear prompt intent through nearby heading/body context; placeholder alone should not carry all instruction.",
        "Ensure action icons are understandable and consistently positioned (utility actions left, submit/state action right).",
        "Keep status text low-emphasis visually, but persistent enough to communicate send state changes.",
      ],
      engineerList: [
        "Ensure a clear placeholder or label context for prompt intent.",
        "Support keyboard parity: Enter submits, Shift+Enter adds newline.",
        "Provide aria-label values for icon-only action buttons slotted into actions.",
        "If showing send status, use an aria-live region so updates are announced to assistive tech.",
        "Do not trap focus; users must be able to tab into and out of the prompt and actions naturally.",
      ],
    },
    anatomy: { image: "", list: ["Prompt surface", "Input area", "Action slot"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Button", link: "https://guides.muibook.com/button" },
      ],
    },
    rules: [
      {
        heading: "Pattern Rule",
        description: "Use Prompt as the shared prompt-surface primitive; keep product-specific flows in compositions.",
        doContent: [{ description: "Reuse this component when Enter submit + floating actions are expected.", image: "" }],
        dontContent: [{ description: "Do not rebuild the prompt shell in each composition with custom wrappers.", image: "" }],
      },
    ],
    behaviour: {
      list: [
        "Enter emits a submit event with current value.",
        "Shift+Enter inserts a newline.",
        "Pasting emits prompt-paste with detected payload metadata for consumers to store and render previews.",
        "Short text paste remains in the textarea; long text and binary paste can be converted to preview items based on threshold settings.",
        "Clicking a preview emits prompt-preview-open with normalized preview payload (badge, value, image metadata).",
        "Escape emits escape and closes fan actions when open.",
        "Actions remain anchored at the prompt edge while text grows.",
        "Action behavior should be equivalent whether triggered by keyboard submit or click.",
      ],
    },
    writing: {
      list: [
        "Use clear placeholder prompts that describe expected user input.",
      ],
    },
  },
};
