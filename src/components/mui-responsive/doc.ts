import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Responsive: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["show-below", "show-middle", "show-above"],
    },
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
    website: ["https://muibook.com/responsive"],
    guides: ["https://guides.muibook.com/responsive"],

    usage: {
      list: [
        "Prefer variant='container' for reusable components and compositions so responsive decisions follow the available parent region.",
        "Use viewport responsiveness for page-level and app-shell changes that genuinely depend on browser width.",
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

    stories: {
      items: [
        {
          "key": "single-breakpoint",
          "title": "Single Breakpoint",
          "description": "Demonstrates the Single Breakpoint Responsive treatment.",
          "list": [
            "Use Responsive to swap intentionally designed compositions at defined breakpoints."
          ]
        },
        {
          "key": "dual-breakpoint",
          "title": "Dual Breakpoint",
          "description": "Demonstrates the Dual Breakpoint Responsive treatment.",
          "list": [
            "Use Responsive to swap intentionally designed compositions at defined breakpoints."
          ]
        },
        {
          "key": "container-breakpoint",
          "title": "Container Breakpoint",
          "description": "Switches slotted content based on a resizable page region instead of the viewport.",
          "list": [
            "Use variant='container' when the responsive decision should follow the parent layout or resizable drawer region.",
            "Use observe to measure a parent or closest ancestor selector when the responsive element is nested inside wrapper elements.",
            "This uses the same desktop-to-mobile composition pattern as the table example, but the breakpoint is measured from the drawer page content.",
            "Drag the drawer rail to change the page width and confirm the content switches without changing the viewport."
          ]
        },
        {
          "key": "slat-to-table",
          "title": "Slat to Table",
          "description": "Showcasing how to loop data on to the mui-table and mui-slat within the mui-responsive component.",
          "list": [
            "Use Responsive to swap intentionally designed compositions at defined breakpoints."
          ]
        },
        {
          "key": "table-desktop-to-mobile",
          "title": "Table: Desktop to Mobile",
          "description": "Demonstrates the Table: Desktop to Mobile Responsive treatment.",
          "list": [
            "Use Responsive to swap intentionally designed compositions at defined breakpoints."
          ]
        }
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
