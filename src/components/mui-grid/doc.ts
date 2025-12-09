import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Grid: {
    title: "Grid",
    description:
      "A layout helper component that arranges its children into columns based on a defined structure. It is mainly intended for larger page layouts but can also be used for internal layouts or more condensed arrangements.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/5C5SvkEWzifnvzlV9nUjQ1/e3c8e9bce595cda87bc357d76b99bbb8/Grid_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1059-12709&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/layout-grid--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-grid/index.ts"],
    website: ["https://muibook.com/#/grid"],
    guides: ["https://guides.muibook.com/grid"],

    usage: {
      list: [
        "Use to organise content into multi-dimensional layouts with columns.",
        "Ideal for aligning items consistently across different screen sizes.",
        "Supports responsive design by adjusting column count, gaps, and alignment at breakpoints.",
        "Recognise it as a developer tool for layout control rather than a direct design asset.",
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
      description: "Although not a Figma component (designers should use Figma’s layout grids), understanding this pattern helps designers anticipate how engineers manage complex, responsive layouts.",
      items: [
        {
          key: "two-column",
          title: "Two Column",
          description:
            "Example of using a two-column layout within the design system, primarily for horizontal use when content needs to be presented side by side.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/6VrpRKckpwss1Wp0AFDA2k/4478ad22d0bf1ced84bd2547e9f31ac3/grid-2.png",
        },
        {
          key: "three-column",
          title: "Three Columns",
          description:
            "Example of using a three-column layout within the design system, optimized for horizontal use to distribute information evenly across three sections.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4iRM4fbfFK5iwtp2jetD0v/b1f62c85f3e2575644cc18e0289cd766/grid-3.png",
        },
        {
          key: "custom-column",
          title: "Custom Columns",
          description:
            "Example of a custom column layout with varied column sizes, demonstrating flexibility for different content arrangements while maintaining a horizontal orientation.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3aXaQVov9cAk0RyzNLNG3Y/ef1d443f1d23e7de08883213f0e805ac/grid-custom.png",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "guidelines-for-muibook",
          name: "Guidelines for Muibook",
          description:
            "This is an example of the Guidelines website for the Muibook Design System. It demonstrates the use of the <mui-grid> component for layout, along with actions, typography, links, and theme customisation. The page also showcases how components are combined to create consistent and responsive UI patterns across the system.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5As4gsdVAyJHrbAMkIrlM/dd78a8bfe8a53a600be91b79c2f4e8eb/Guides-Grid-Composition.png",
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
