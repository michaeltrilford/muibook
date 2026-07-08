import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  PromptContext: {
    title: "Prompt Context",
    description:
      "Prompt Context provides a compact, slottable context row for prompt composers.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-prompt-context/index.ts"],
    website: ["https://muibook.com/prompt-context"],
    guides: ["https://guides.muibook.com/prompt-context"],
    usage: {
      list: [
        "Use inside the context slot of Prompt when an active task, selected content, steering target, or attachment should stay attached to the composer.",
        "Slot the summary as normal content; the component truncates slotted Body text so long task names stay on one line.",
        "Use the actions slot for controls such as Steer, Remove, or More.",
        "Only render Prompt Context when the app has real context to show; Prompt does not create or hide this row for you.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "Provide labels for icon-only actions in the actions slot.",
        "Keep destructive or state-changing context actions keyboard reachable and independent from Prompt submit.",
      ],
    },
    anatomy: { image: "", list: ["Context row", "Summary slot", "Actions slot"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Prompt", link: "https://guides.muibook.com/prompt" },
        { name: "Prompt Toggle", link: "https://guides.muibook.com/prompt-toggle" },
      ],
    },
    rules: [
      {
        heading: "Render Context Explicitly",
        description: "Prompt Context should exist only when product state has context to show.",
        doContent: [{ description: "Render the row from app state when a task or context item is active.", image: "" }],
        dontContent: [{ description: "Do not rely on Prompt to create empty context chrome.", image: "" }],
      },
    ],
    behaviour: {
      list: [
        "Prompt Context is a presentational row and does not manage collapse state.",
        "Slotted Body content receives truncate automatically unless it already has a truncate setting.",
      ],
    },
    writing: {
      list: ["Keep the summary short enough to remain meaningful when truncated."],
    },
  },
};
