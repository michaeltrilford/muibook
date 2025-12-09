import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  List: {
    title: "List",
    description:
      "Used to display related items in a clear, readable sequence. Lists can be ordered (numbered) to suggest priority or sequence, or unordered (bulleted) for grouped information without hierarchy.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/OSwQtL8kK29OUOG0oLMSJ/0a488efb3f6cf8f6e6faa40e124aa975/List_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=958-8673&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-list--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-list"],
    website: ["https://muibook.com/#/list"],
    guides: ["https://guides.muibook.com/list"],

    usage: {
      list: [
        "Use ordered lists when the order or steps matter (e.g. instructions).",
        "Use unordered lists for grouped or related items without a set order.",
        "Keep items concise and consistent in structure for scanability.",
        "void using lists for complex content — consider a table or grid instead.",
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
          key: "muibook-resource",
          name: "Muibook Resource",
          description:
            "The Muibook documentation site uses MUI components to compose its layout, including headings, text, lists, buttons, icons, and image components.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3LVvuYDZWRnMhxNy6GMLNd/c5074a05eacb2c22c50ea172b3567c48/Muibook-List-Composition.png",
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
