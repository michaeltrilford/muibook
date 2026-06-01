import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  PromptToggle: {
    title: "Prompt Toggle",
    description: "Prompt Toggle switches between compact prompt actions and expanded active content inside Prompt.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2117-17601&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/ai-llm-prompt-toggle--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-prompt-toggle/index.ts"],
    website: ["https://muibook.com/prompt-toggle"],
    guides: ["https://guides.muibook.com/prompt"],

    usage: {
      list: [
        "Use inside mui-prompt when a compact action needs to expand into an active state, chip state, spinner, or close action.",
        "Use mode='icon' for the collapsed trigger state and mode='chip' for the expanded active state.",
        "Slot toggle content for the collapsed action and active or chip content for the expanded state.",
        "This pattern works well for context selectors, source pickers, tool toggles, or lightweight prompt-side dropdown triggers.",
        "Pair with Dropdown when the expanded state needs to reveal additional actions or menu choices.",
        "Use close or active controls when the expanded state should be dismissible without clearing the entire prompt.",
      ],
    },

    accessibility: {
      designerList: [
        "Keep the compact and expanded states visually related so users understand they represent the same prompt action.",
        "Use clear affordances for close or dismiss actions when expanded state can be exited independently.",
      ],
      engineerList: [
        "Treat Prompt Toggle as a display-mode switcher; app state should still own the action, context, and dismissal logic.",
        "Ensure slotted toggle and active controls expose their own accessible labels when they are icon-only.",
      ],
    },

    anatomy: {
      image: "",
      list: ["Collapsed toggle content", "Expanded active or chip content", "Optional close or spinner content"],
    },

    variants: {
      items: [
        {
          key: "icon",
          title: "Icon",
          description: "Collapsed state showing the prompt action trigger.",
          image: "",
        },
        {
          key: "chip",
          title: "Chip",
          description: "Expanded or active state showing the selected context, dismiss action, or loading state.",
          image: "",
        },
      ],
    },

    compositions: {
      description: "Showcases prompt-side action patterns that transform from compact controls into richer active states.",
      items: [
        {
          key: "context-toggle",
          name: "Prompt Context Toggle",
          description: "A compact prompt action that expands into an active chip with dismiss or close behavior.",
          image: "",
        },
      ],
    },

    related: {
      items: [
        { name: "Prompt", link: "https://guides.muibook.com/prompt" },
        { name: "Dropdown", link: "https://guides.muibook.com/dropdown" },
        { name: "Button", link: "https://guides.muibook.com/button" },
      ],
    },

    rules: [
      {
        heading: "Use for stateful prompt actions",
        description: "Prompt Toggle is for prompt actions that need a compact state and a richer active state in the same position.",
        doContent: [
          {
            description: "Use it for context, source, or tool actions that start as a small trigger and then become an active chip, dropdown launcher, or dismissible action.",
            image: "",
          },
        ],
        dontContent: [
          {
            description: "Do not use it for static prompt actions that never change shape or state.",
            image: "",
          },
        ],
      },
    ],

    behaviour: {
      list: [
        "mode='icon' shows toggle content and hides active, chip, close, and spinner content.",
        "mode='chip' shows active, chip, close, and spinner content and hides the compact toggle content.",
        "Prompt Toggle reacts to slotted content marked with slot names or context-* attributes so composed prompt actions can be shown or hidden consistently.",
      ],
    },

    writing: {
      list: [
        "Use short labels so the expanded chip or active state stays compact inside the prompt action rail.",
      ],
    },
  },
};
