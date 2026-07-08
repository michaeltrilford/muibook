import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  PromptWork: {
    title: "Prompt Work",
    description:
      "Prompt Work provides a compact expandable work summary for agent responses.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-prompt-work/index.ts"],
    website: ["https://muibook.com/prompt-work"],
    guides: ["https://guides.muibook.com/prompt"],
    usage: {
      list: [
        "Use inside the header slot of Prompt Message when an agent response needs a collapsible work summary.",
        "Set label to the short summary, such as elapsed work time.",
        "Use the default slot for compact work detail rows.",
        "Top-level Prompt Work in a Prompt Message header draws its divider on the summary row.",
        "Use rule when a trailing separator is needed outside the header slot.",
        "Use status with pending for active Thinking states that should shimmer without accordion interaction.",
        "Use pending without status for expandable active work states such as Working for 5s, without applying the Thinking shimmer.",
        "Nest Prompt Work inside another Prompt Work for compact child work rows such as Read files or Ran checks.",
        "Nested work rows are treated as secondary detail inside the parent work disclosure.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "Prompt Work uses Accordion Core internally, so the summary remains keyboard reachable and exposes expanded state.",
        "Keep work detail content short and non-essential; the main response should remain understandable while collapsed.",
      ],
    },
    anatomy: { image: "", list: ["Status row", "Summary row", "Optional icon slot", "Toggle icon", "Detail slot", "Nested work rows", "Optional rule"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Prompt Message", link: "https://guides.muibook.com/prompt-message" },
        { name: "Accordion Core", link: "https://guides.muibook.com/accordion-core" },
      ],
    },
    rules: [
      {
        heading: "Keep Work Detail Secondary",
        description: "Use Prompt Work for supporting execution detail, not as the main answer.",
        doContent: [{ description: "Show short checked/applied/validated lines.", image: "" }],
        dontContent: [{ description: "Do not hide the useful answer only inside Prompt Work.", image: "" }],
      },
    ],
    behaviour: {
      list: [
        "Prompt Work wraps Accordion Core and forwards the open attribute to its internal disclosure.",
        "When status is set, Prompt Work renders a non-interactive row without Accordion Core or a toggle icon.",
        "Nested Prompt Work rows are automatically marked with nested treatment when placed inside another Prompt Work.",
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
