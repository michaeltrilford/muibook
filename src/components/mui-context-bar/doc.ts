import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ContextBar: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["actions"],
    },
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
        "Use inside the context-above or context-below slot of Prompt when an active task, selected content, steering target, or attachment should stay attached to the composer.",
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
          key: "in-prompt",
          title: "Informational Context",
          description: "",
          list: [
            "Slot Context Bar into Prompt context when app state has an active task.",
            "Omit the component entirely when there is no active context.",
            "Use slot='context-above' for a leading context row.",
          ],
        },
        {
          key: "status-prompt",
          title: "Status Context",
          description: "",
          list: [
            "Slot Context Bar into Prompt context when app state has an active task.",
            "Use slot='context-above' when context should lead the composer.",
            "Swap actions to a dropdown menu below 400px container width to ensure the layout remains compact.",
            "Omit the component entirely when there is no active context.",
          ],
        },
        {
          key: "below-prompt",
          title: "Below Prompt",
          description: "Combines a trailing Context Bar with related next-step actions below the prompt surface.",
          list: [
            "Use slot='context-below' when project or tool context should follow the composer.",
            "Wrap Context Bar and related suggestions in a V Stack assigned to the context-below slot.",
            "Use tertiary actions for optional next steps that should remain quieter than prompt submission.",
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
