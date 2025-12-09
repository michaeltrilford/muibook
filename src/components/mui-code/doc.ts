import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Code: {
    title: "Code",
    description:
      "A basic component for displaying inline or block code snippets clearly and distinctly from regular text. Primarily used to show programming code or commands in documentation.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/6loI4Zrxcf1Y6Tqvu7omoX/a40620b1ff78420b547d02498163f306/Code_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1069-15814&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-code--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-code/index.ts"],
    website: [""],
    guides: ["https://guides.muibook.com/code"],

    usage: {
      list: [
        "Use to present short snippets of code or commands.",
        "Ideal for inline code within paragraphs or standalone blocks.",
        "Ensure code is visually distinct with monospace font and background.",
        "Avoid using for long or complex code—consider specialised code blocks or editors.",
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
          key: "code-snippets",
          name: "Code Snippets",
          description:
            "An accordion in a card footer allows code snippets or supporting details to be revealed on demand, keeping the card compact while still providing access to additional information.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7FKVgkCxv3UenOQTC9Tr4R/25c357aceea16b169c48775d7363df1d/accordion_card_footer_-_composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Card",
          link: "https://guides.muibook.com/card",
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
