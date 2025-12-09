import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Heading: {
    title: "Heading",
    description:
      "The Heading component includes six levels (H1–H6) for structured heading usage, supporting a range of hierarchies in text presentation.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/mGURbbhEBEMoMv5KlrbhD/46b2fdc16823b3750955a6bfd451e3ed/Heading_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-1120&t=fSFYVey9aCoE5oQa-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-heading--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-heading/index.ts"],
    website: ["https://muibook.com/#/heading"],
    guides: ["https://guides.muibook.com/heading"],

    usage: {
      list: [
        "Blog/Info Pages: Follow a structured, descending order to create clear sections. E.g. H1 → H2 → H3.",
        "Rich Data or Workflows: Headings may be used out of strict order to maintain visual balance and usability. E.g. Skip an H3 if H4 better suits the layout.",
        "Use only one H1 per page to establish a clear primary title and improve accessibility.",
        "Use H2–H6 to structure content logically, maintaining a clear hierarchy.",
      ],
    },

    accessibility: {
      designerList: [
        "Use the level property (H1–H6) to maintain correct semantic structure.",
        "Follow a logical order — don’t skip heading levels.",
        "Helps screen readers understand and navigate the page hierarchy.",
      ],
      engineerList: [
        "Use the level property (H1–H6) to maintain correct semantic structure.",
        "Follow a logical order — don’t skip heading levels.",
        "Helps screen readers understand and navigate the page hierarchy.",
      ],
    },

    anatomy: {
      image: "",
      list: [""],
    },

    variants: {
      items: [
        {
          key: "heading-1",
          title: "Heading 1",
          description:
            "The primary heading is typically the page's main title. It plays a crucial role in accessibility and SEO, as screen readers and search engines rely on H1s to understand page structure.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4qDOWEyMtO0U40Ot9aSKNb/a3ae2d059cb9caeb26c6c65e36df71b2/heading-1.png",
        },
        {
          key: "heading-2",
          title: "Heading 2",
          description: "A secondary heading that introduces major sections within a page, following the H1.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/WXCjRrpLpqzGUhY8auOMv/66d0cd721db330f68547a16a63feec4f/heading-2.png",
        },
        {
          key: "heading-3",
          title: "Heading 3",
          description: "A heading is used to structure content under H2, providing additional hierarchy.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/146ZPfxWf50ahUf35SAMWU/ffaacafbe9f905da81850a60d00e48d7/heading-3.png",
        },
        {
          key: "heading-4",
          title: "Heading 4",
          description: "A heading for organising detailed content under H3, maintaining readability.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/53f9iMdJUV7DPsiZhPToiY/83141d25fb2de26bcb7c0e66a4fd14f6/heading-4.png",
        },
        {
          key: "heading-5",
          title: "Heading 5",
          description: "A heading that introduces lower-level content, often for minor divisions within H4 sections.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1pocISFs6Ht66gXn4EHn59/f43d402c6cbe3dafbc06d35ef1097cad/heading-5.png",
        },
        {
          key: "heading-6",
          title: "Heading 6",
          description: "The lowest level heading, used for minimal emphasis or supplementary labeling.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3CV5CHrrNrkeTkZDfhpRGA/29d6f9b6da53f4174f8c4d45aee01939/heading-6.png",
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
        {
          key: "guru-outcomes-roadmap",
          name: "Guru Outcomes - Roadmap",
          description:
            "The Loader component in action on the roadmap page, smoothly loading the UI while masking delays and improving perceived performance.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7Hebis0o1mlvvDZlQRZfzl/f0c06679ab417f2ee624b570226da77d/outcomes-roadmap.gif",
        },
        {
          key: "guru-outcomes-dashboard",
          name: "Guru Outcomes - Dashboard",
          description:
            "Use the <mui-loader> component to mask slow network or initial data load times. Combine its features to create a seamless loading experience.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7fsKn4mqKGieVh2D1EdyuR/a9afa145001e13470054aa9d7004127d/outcomes-home.gif",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Body",
          link: "https://guides.muibook.com/body",
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
