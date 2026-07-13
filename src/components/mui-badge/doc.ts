import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Badge: {
    title: "Badge",
    description:
      "Badges are compact, non-interactive presentational labels used for counts, metadata, and lightweight state-like wording inside surrounding UI.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/3uhL6lnJTEY4LtVyMA3og5/7844fa7e691b9f97e3c335e1a978e881/Badge_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-1108&t=FSv3FEahG8VQW1FZ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/feedback-badge--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-badge/index.ts"],
    website: ["https://muibook.com/badge"],
    guides: ["https://guides.muibook.com/badge"],

    usage: {
      list: [
        "Use Badge for lightweight metadata such as Offline, Online, Busy, Do not disturb, Beta, Default, Shared, IMG, or a date label.",
        "Use Badge for counts and short labels inside cards, messages, chips, buttons, tabs, navigation, and hero or marketing surfaces.",
        "Use Badge as a non-interactive label; use Status with action when the state itself needs to behave as a trigger.",
        "Use Badge when the surrounding UI already explains the object and the label is supporting context.",
        "Use Status instead when the value is the primary state of an object, record, workflow, or system, especially in table cells, slat end slots, dashboards, and data-heavy pages.",
        "Use color to override the badge background with a shared named colour or custom CSS background value; named colours resolve through theme-aware badge background tokens.",
        "Use Message for persistent page-level or section-level notices; Badge can appear inside message content when it remains supporting metadata.",
        "Use size variants (xx-small, x-small, small, medium, large) to match surrounding component scale.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image: "",
      list: [""],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "default",
          description: "Used for data that is visually in the foreground.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3Xgz2qoLs8NACel4fRr9iC/52699b5763f1efd4853a9ffb991b3ff3/badge-default.png",
        },
        {
          key: "positive",
          title: "positive",
          description: "For positive lightweight metadata such as Online.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/65RMIuUEUIzusbSAwqLQcI/63edb290041c708fc69d0d27fc49e25d/badge-positive.png",
        },
        {
          key: "warning",
          title: "warning",
          description: "For lightweight metadata that needs more attention, such as Busy.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5AFfOShVyTEKO1wgIe6rYv/e809c76ddabdfd9789adc31a26becf83/badge-warning.png",
        },
        {
          key: "error",
          title: "error",
          description: "For lightweight metadata that needs the strongest presentational emphasis, such as Do not disturb.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/E0jtn7WSTwYligMqSNl0k/c3c041e025c3725682ec12eb3ab98400/badge-error.png",
        },
        {
          key: "overlay",
          title: "overlay",
          description: "For labels placed on media/image surfaces with stronger contrast.",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        { key: "default", title: "Default", description: "A compact, non-interactive supporting label for presentational metadata.", list: ["Use Badge when the label adds context to the surrounding UI.", "Use Status when the label is the primary state value for a record or workflow."] },
        { key: "sizes", title: "Sizes", description: "Matches Badge density to the surrounding component scale.", list: ["Use smaller sizes in dense controls, navigation, and metadata rows.", "Use medium or large in roomier cards, messages, or prominent content."] },
        { key: "variants", title: "Variants", description: "Applies lightweight semantic emphasis to supporting metadata.", list: ["Use neutral for default supporting labels.", "Use positive, warning, or attention only when the metadata carries semantic meaning.", "Use overlay for labels placed on media surfaces."] },
        { key: "standalone-colors", title: "Standalone Colors", description: "Applies a shared categorical colour to the Badge background.", list: ["Use named colours for categories rather than semantic feedback.", "The color attribute changes the background only; text colour follows the selected variant."] },
        { key: "custom-color", title: "Custom Color", description: "Applies a one-off CSS background value.", list: ["Prefer shared named colours for system consistency.", "Reserve custom values for brand, partner, or campaign-specific labels."] },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "outcome-based-roadmap",
          name: "Outcome-Based Roadmap",
          description:
            "Example of an Outcome-Based Roadmap page showing objectives organised into Upcoming, Doing, and Finished columns. Progress bars indicate the completion status of each task, providing a clear view of overall progress.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3w5htPtfEz7QMCH9alVcwf/de35725fb4542b891bd695b900195291/Outcomes-Progress-Composition.png",
        },
        {
          key: "compliance-dashboard-table",
          name: "Compliance Dashboard Table",
          description: "This example shows a desktop view of a table used within an accounting compliance dashboard.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3vUKA5C5iJ3LvjLwf2WiO9/274ffe423dbe828244294f6809172ce1/table-composition-compliance-dashboard.png",
        },
        {
          key: "carousel-showcase",
          name: "Carousel Showcase",
          description:
            "This example from the GuruSuite website demonstrates the carousel used to showcase two of the products on offer.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2TaRRm351HyujF9mT2w1wH/3958f69e939d20618751742130dc5f06/GuruSuite-Carousel-Composition.png",
        },
        {
          key: "outcomes-roadmap-dashboard",
          name: "Outcomes Roadmap Dashboard",
          description:
            "Example of the responsive component in the Outcomes Roadmap Dashboard, demonstrating layout, title, and padding adjustments across breakpoints.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3FsXandRr1Z9BAKv33twxT/b0d0e4a8b6237bf7d38660111bceb8ab/responsive-composition.gif",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Status",
          link: "https://guides.muibook.com/status",
        },
        {
          name: "Button",
          link: "https://guides.muibook.com/button",
        },
        {
          name: "Link",
          link: "https://guides.muibook.com/link",
        },
        {
          name: "Tab Bar",
          link: "https://guides.muibook.com/tab-bar",
        },
      ],
    },

    rules: [
      {
        heading: "Badge vs Status",
        description:
          "Badge is for non-interactive presentational metadata. Status is for explicit record, workflow, or system state, especially inside tables and slats.",
        doContent: [{ description: "Use Badge for labels that support a card, message, hero, or control.", image: "" }],
        dontContent: [{ description: "Do not use Badge as the main state field in dense operational or data-heavy layouts.", image: "" }],
      },
    ],

    behaviour: {
      list: [""],
    },

    writing: {
      list: [
        "Keep badge text short and scannable.",
        "Use words that add context without becoming a full sentence.",
      ],
    },
  },
};
