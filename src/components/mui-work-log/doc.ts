import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  WorkLog: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["icon","before","after"],
    },
    title: "Work Log",
    description:
      "Work log provides a compact expandable work summary for agent responses.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-work-log/index.ts"],
    website: ["https://muibook.com/work-log"],
    guides: ["https://guides.muibook.com/prompt"],
    usage: {
      list: [
        "Use inside the header slot of Chat Message when an agent response needs a collapsible work summary.",
        "Set label to the short summary, such as elapsed work time.",
        "Use the default slot for compact work detail rows.",
        "Top-level Worker in a Chat Message header draws its divider on the summary row.",
        "Use rule when a trailing separator is needed outside the header slot.",
        "Use status with pending for active Thinking states that should shimmer without accordion interaction.",
        "Use status with variant='error' for a non-interactive failure state using the attention text treatment.",
        "Use pending without status for expandable active work states such as Working for 5s, without applying the Thinking shimmer.",
        "Nest Worker inside another Worker for compact child work rows such as Read files or Ran checks.",
        "Nested work rows are treated as secondary detail inside the parent work disclosure.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "Worker uses Accordion Core internally, so the summary remains keyboard reachable and exposes expanded state.",
        "Keep work detail content short and non-essential; the main response should remain understandable while collapsed.",
      ],
    },
    anatomy: { image: "", list: ["Status row", "Summary row", "Optional icon slot", "Toggle icon", "Detail slot", "Nested work rows", "Optional rule"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    stories: { items: [
      { key: "single", title: "Single Work Log", list: ["Use in the prompt message header slot when an agent response needs a compact work summary.", "Keep detail rows short and supporting, not the main response."] },
      { key: "composable", title: "Composable Summary", list: ["Use the before and after slots to insert custom elements into the Work Log summary row.", "Good for showing line diffs, file counts, or badges next to the label."] },
      { key: "thinking", title: "Thinking", list: ["Use status and pending together to represent an active Thinking state.", "This creates a non-interactive row with a shimmer animation and no toggle icon."] },
      { key: "status", title: "Status", list: ["Use status and pending together for an active loading state.", "Use variant='error' with status for a non-interactive failure state using the attention treatment.", "Status rows have no disclosure toggle or accordion interaction."] },
      { key: "nested", title: "Nested Work Log", list: ["Use pending for active work states.", "Place Work Log inside another Work Log for secondary rows such as reading files, running checks, or applying changes.", "Nested rows are compact supporting detail."] },
    ] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Chat Message", link: "https://guides.muibook.com/chat-message" },
        { name: "Accordion Core", link: "https://guides.muibook.com/accordion-core" },
      ],
    },
    rules: [
      {
        heading: "Keep Work Detail Secondary",
        description: "Use Worker for supporting execution detail, not as the main answer.",
        doContent: [{ description: "Show short checked/applied/validated lines.", image: "" }],
        dontContent: [{ description: "Do not hide the useful answer only inside Worker.", image: "" }],
      },
    ],
    behaviour: {
      list: [
        "Worker wraps Accordion Core and forwards the open attribute to its internal disclosure.",
        "When status is set, Worker renders a non-interactive row without Accordion Core or a toggle icon.",
        "Nested Worker rows are automatically marked with nested treatment when placed inside another Worker.",
        "Pending only applies the shimmer treatment when combined with status for Thinking-style rows.",
        "The error variant maps the Work Log label to Body's attention treatment.",
      ],
    },
    writing: {
      list: [
        "Keep the label short and factual.",
      ],
    },
  },
};
