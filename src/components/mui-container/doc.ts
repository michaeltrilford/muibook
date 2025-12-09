import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Container: {
    title: "Container",
    description:
      "A layout component used to constrain content within a defined width and apply consistent spacing. Containers help maintain readable line lengths, align content with the grid, and provide structure across different screen sizes.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/4tgr8R96AqBOE0r2TDM3Lv/47cb49bdee1e0a6a618017990468f1f6/Container_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1059-12539&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/layout-container--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-container/index.ts"],
    website: ["https://muibook.com/#/container"],
    guides: ["https://guides.muibook.com/container"],

    usage: {
      list: [
        "Use to wrap page or section content within a consistent width.",
        "Ideal for creating clear margins and maintaining visual rhythm.",
        "Supports responsive layouts by adjusting padding or max-width at breakpoints.",
        "Avoid nesting multiple containers unless necessary for layout control.",
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
          key: "guru-outcomes-dashboard",
          name: "Guru Outcomes - Dashboard",
          description:
            "Use the <mui-loader> component to mask slow network or initial data load times. Combine its features to create a seamless loading experience.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7fsKn4mqKGieVh2D1EdyuR/a9afa145001e13470054aa9d7004127d/outcomes-home.gif",
        },
        {
          key: "create-mui-app-site",
          name: "Create Mui App Site",
          description:
            "In this example, the Switch toggles between light and dark mode. Icons are used to clearly indicate the current theme, helping users quickly understand which mode is active.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7C7j0Wkk3AMgeLVSrmUgOt/3c1204b9e39ad7004bb4ba73147d857e/Switch_-_Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Heading",
          link: "https://guides.muibook.com/heading",
        },
        {
          name: "Body",
          link: "https://guides.muibook.com/body",
        },
        {
          name: "Card",
          link: "https://guides.muibook.com/card",
        },
        {
          name: "Alert",
          link: "https://guides.muibook.com/alert",
        },
        {
          name: "Message",
          link: "https://guides.muibook.com/message",
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
