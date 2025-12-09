import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Stack: {
    title: "Stack",
    description:
      "A layout helper component that arranges its children in a horizontal or vertical flow with consistent spacing.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/37Cyk0jaIIKA8EBj2bp1ep/95d5adc24bccb051c355865d9e14bfa3/Stack_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1059-12708&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/layout-stack--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-stack"],
    website: ["https://muibook.com/#/stack"],
    guides: ["https://guides.muibook.com/stack"],

    usage: {
      list: [
        "Use to organise content or components in a single, consistent direction.",
        "Ideal for managing spacing without manual margin or padding adjustments.",
        "Supports responsive layouts by changing direction or spacing at breakpoints.",
        "Recognise it as a developer layout tool rather than a design asset.",
        "Use the space design token to maintain consistent gap spacing.",
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
      description: "While not a Figma component (designers should use auto-layout), it’s useful for designers to understand this pattern as engineers commonly use it to control layout and spacing.",
      items: [
        {
          key: "horizontal",
          title: "Horizontal",
          description: "A layout component that arranges its children in a horizontal flow",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5tHpmQRhIWn0ACqjb1jNBu/d99ca0d9ada0af45cd0f1c2aaa7c995d/stack-horizontal.png",
        },
        {
          key: "vertical",
          title: "Vertical",
          description: "A layout component that arranges its children in a vertical flow",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1w2YeWwXerMc2YGqfGm6KJ/898f3ef195e01f775ae880e0968dbaa6/stack-vertical.png",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "outcomes-roadmap-dashboard",
          name: "Outcomes Roadmap Dashboard",
          description:
            "Example of the responsive component in the Outcomes Roadmap Dashboard, demonstrating layout, title, and padding adjustments across breakpoints.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3FsXandRr1Z9BAKv33twxT/b0d0e4a8b6237bf7d38660111bceb8ab/responsive-composition.gif",
        },
        {
          key: "outcomes-roadmap-roadmap",
          name: "Outcome-Based Roadmap",
          description:
            "Example of an Outcome-Based Roadmap page showing objectives organised into Upcoming, Doing, and Finished columns. Progress bars indicate the completion status of each task, providing a clear view of overall progress.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3w5htPtfEz7QMCH9alVcwf/de35725fb4542b891bd695b900195291/Outcomes-Progress-Composition.png",
        },
        {
          key: "smart-card",
          name: "Smart Card",
          description:
            "The Smart Card composition uses slats to present structured information in a compact format. Slats help organise details such as titles, descriptions, and supporting actions, making the card easy to scan and interact with.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/74knMtil1vp9nHPPWXM1kr/54f8d978b0a82bca2c126e8ab800826f/SmartCard_-_Card_Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Grid",
          link: "https://guides.muibook.com/grid",
        },
        {
          name: "Responsive",
          link: "https://guides.muibook.com/responsive",
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
