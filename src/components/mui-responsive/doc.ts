import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Responsive: {
    title: "Responsive",
    description: "Dynamically render UI based on viewport size",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/4UgRd1YdJAAZTThk4U97qE/8a322a53f71dc8b288385b5dd16b3469/Responsive_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1059-12704&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/layout-responsive--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-responsive/index.ts"],
    website: ["https://muibook.com/#/responsive"],
    guides: ["https://guides.muibook.com/responsive"],

    usage: {
      list: [
        "Use to adjust or swap UI components according to screen size for optimal experience.",
        "Ideal for tailoring layouts, navigation, or content density on different devices.",
        "Supports breakpoint-driven rendering to maintain clarity and usability.",
        "Avoid overly complex responsive behaviours that may confuse users or complicate maintenance.",
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
          key: "",
          title: "",
          description: "",
          image: "",
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
      ],
    },

    related: {
      items: [
        {
          name: "Stack",
          link: "https://guides.muibook.com/stack",
        },
        {
          name: "Grid",
          link: "https://guides.muibook.com/grid",
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
