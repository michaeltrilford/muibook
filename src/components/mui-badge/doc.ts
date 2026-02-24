import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Badge: {
    title: "Badge",
    description: "Badges are non-interactive and indicate counts or statuses.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/3uhL6lnJTEY4LtVyMA3og5/7844fa7e691b9f97e3c335e1a978e881/Badge_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-1108&t=FSv3FEahG8VQW1FZ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/feedback-badge--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-badge/index.ts"],
    website: ["https://muibook.com/#/badge"],
    guides: ["https://guides.muibook.com/badge"],

    usage: {
      list: [
        "Show the number of unread notifications – E.g. '4' unread messages",
        "Indicate the status of a user – E.g. Online, Busy, or Away",
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
          description: "For positive or completed statuses.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/65RMIuUEUIzusbSAwqLQcI/63edb290041c708fc69d0d27fc49e25d/badge-positive.png",
        },
        {
          key: "warning",
          title: "warning",
          description: "For urgent or important statuses.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5AFfOShVyTEKO1wgIe6rYv/e809c76ddabdfd9789adc31a26becf83/badge-warning.png",
        },
        {
          key: "error",
          title: "error",
          description: "Represents an error, issue or critical state.",
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
