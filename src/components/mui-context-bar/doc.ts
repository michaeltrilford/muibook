import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ContextBar: {
    title: "Context Bar",
    description: "Context Bar provides a compact, slottable context row for prompt composers.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-context-bar/index.ts"],
    website: ["https://muibook.com/context-bar"],
    guides: ["https://guides.muibook.com/context-bar"],
    usage: {
      list: [
        "Use inside the context slot of Prompt when an active task, selected content, steering target, or attachment should stay attached to the composer.",
        "Slot the summary as normal content; the component truncates slotted Body text so long task names stay on one line.",
        "Use the actions slot for controls such as Steer, Remove, or More.",
        "Only render Context Bar when the app has real context to show; Prompt does not create or hide this row for you.",
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
    variants: { items: [] },
    stories: {
      items: [
        {
          key: "informational",
          title: "Informational",
          description: "",
          list: [
            "Slot Context Bar into Prompt context when app state has an active task.",
            "Omit the component entirely when there is no active context.",
            "Prompt only positions the slotted context; it does not create context chrome.",
          ],
        },
        {
          key: "status",
          title: "Status",
          description: "",
          list: [
            "Slot Context Bar into Prompt context when app state has an active task.",
            "Swap actions to a dropdown menu below 400px container width to ensure the layout remains compact.",
            "Omit the component entirely when there is no active context.",
          ],
        },
        {
          key: "approval",
          title: "Approval",
          description: "",
          list: [
            "Slot Context Bar into Prompt context when app state has an active task.",
            "Swap actions to a dropdown menu below 400px container width to ensure the layout remains compact.",
            "Omit the component entirely when there is no active context.",
          ],
        },
      ],
    },
    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Prompt", link: "https://guides.muibook.com/prompt" },
        { name: "Action Toggle", link: "https://guides.muibook.com/action-toggle" },
      ],
    },
    rules: [
      {
        heading: "Render Context Explicitly",
        description: "Context Bar should exist only when product state has context to show.",
        doContent: [{ description: "Render the row from app state when a task or context item is active.", image: "" }],
        dontContent: [{ description: "Do not rely on Prompt to create empty context chrome.", image: "" }],
      },
    ],
    behaviour: {
      list: [
        "Context Bar is a presentational row and does not manage collapse state.",
        "Slotted Body content receives truncate automatically unless it already has a truncate setting.",
      ],
    },
    writing: {
      list: ["Keep the summary short enough to remain meaningful when truncated."],
    },
  },
};
