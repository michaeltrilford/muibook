import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Quote: {
    title: "Quote",
    description:
      "Used to highlight a piece of text, typically a statement or excerpt, that adds emphasis or authority. Quotes help break up content and draw attention to important or inspirational messages.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/K68wChzSMiLUojTMGoDcY/9de538ad493e36cb14afa388ecadbf47/Quote_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1069-15815&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-quote--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-quote/index.ts"],
    website: ["https://muibook.com/#/quote"],
    guides: ["https://guides.muibook.com/quote"],

    usage: {
      list: [
        "Use to emphasise key statements or citations within content.",
        "Ideal for highlighting testimonials, excerpts, or impactful text.",
        "Keep quotes concise and visually distinct from body text.",
        "Avoid overusing to maintain impact and clarity.",
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
      description: "",
      items: [
        {
          key: "",
          name: "",
          description: "",
          image: "",
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
