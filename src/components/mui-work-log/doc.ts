import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  WorkLog: {
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
      ],
    },
    writing: {
      list: [
        "Keep the label short and factual.",
      ],
    },
  },
};
