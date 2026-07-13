import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Stepper: {
    title: "Stepper",
    description:
      "A Stepper component visually represents a sequence of steps in a process. It helps users understand progress and navigate through multi-step workflows. This component supports both horizontal and vertical orientations.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/423YAEfIeoDzzsK9ClbTkP/485c6c4f637080247caa150afed0ef14/Stepper_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=948-4195&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/navigation-stepper--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-stepper"],
    website: ["https://muibook.com/stepper"],
    guides: ["https://guides.muibook.com/stepper"],

    usage: {
      list: [
        "Use active-step to control the current step in a multi-step flow.",
        "Use size='x-small|small|medium' to match the density of the surrounding layout.",
        "Use interactive when users should be able to click and keyboard-navigate steps.",
        "Use linear with interactive to limit forward progression to the next available step while still allowing users to move backwards.",
        "Use explicit step states (success, pending, error, disabled) for async and validation workflows.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      description: "The stepper uses two simple styles: active and inactive. Their meaning changes based on position in the sequence, representing progress through different states.",
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/6Y5iyISdhK7PX8d1cHJxWv/761efb630c924af42ebf8d8bd5fabfb2/Stepper_-_Anatomy.png",
      list: [
        "Active / Completed / Success: Indicates the current step or a task that has been successfully finished.",
        "Pending / Error / Disabled: Communicates processing, validation failure, or temporarily unavailable steps.",
        "Upcoming: Represents a step or task that has not yet started.",
      ],
    },

    variants: {
      items: [
        {
          key: "",
          title: "",
          description: "",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        { key: "horizontal", title: "Horizontal", description: "Presents progress across a compact horizontal workflow.", list: ["Use when all steps fit without crowding or wrapping."] },
        { key: "interactive", title: "Interactive", description: "Allows pointer and keyboard navigation between steps.", list: ["Use only when users may revisit or directly select steps.", "Use linear to prevent skipping beyond the next available step."] },
        { key: "small", title: "Small", description: "Reduces Stepper density for compact layouts.", list: ["Use when labels remain readable at the reduced size."] },
        { key: "x-small", title: "X-Small", description: "Provides the most compact Stepper treatment.", list: ["Use for short labels and constrained secondary workflows."] },
        { key: "error", title: "Error Example", description: "Shows a validation failure within a multi-step flow.", list: ["Identify the failed step and provide recovery guidance in the related content."] },
        { key: "disabled", title: "Disabled Example", description: "Shows downstream steps that are not yet available.", list: ["Disable steps only when progression rules prevent access."] },
        { key: "checkout", title: "Checkout Flow States", description: "Combines completed, active, processing, and blocked payment states.", list: ["Use explicit states when progress depends on asynchronous work or validation."] },
        { key: "verification", title: "Verification Timeline", description: "Combines failed review and follow-up verification states.", list: ["Keep state labels specific enough to explain current progress."] },
        { key: "vertical", title: "Vertical", description: "Presents progress in a vertical sequence.", list: ["Use for longer labels, narrow layouts, or workflows with supporting detail."] },
        { key: "horizontal-secondary", title: "Horizontal: Secondary", description: "Uses the lower-emphasis treatment in a horizontal sequence.", list: ["Use when the Stepper supports rather than dominates the page hierarchy."] },
        { key: "vertical-secondary", title: "Vertical: Secondary", description: "Uses the lower-emphasis treatment in a vertical sequence.", list: ["Use when the Stepper supports rather than dominates the page hierarchy."] },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "review-items-task",
          name: "Review Items Task",
          description:
            "A permanent drawer remains visible at all times and is typically used for core navigation or tools that support the main content. It doesn’t open or close, and is always part of the current layout or workflow.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/rHTSU9sPUdmwrmGETRLcC/fa444ff8d8a72a28e8f10537324bbca3/drawer-composition-smart-bills.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "",
          link: "",
        },
      ],
    },

    rules: [
      {
        heading: "",
        description: "",
        doContent: [{ description: "", image: "" }],
        dontContent: [{ description: "", image: "" }],
      },
    ],

    behaviour: {
      list: [""],
    },

    writing: {
      list: [""],
    },
  },
};
