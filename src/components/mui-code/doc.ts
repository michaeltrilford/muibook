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
    website: ["https://muibook.com/code"],
    guides: ["https://guides.muibook.com/code"],

    usage: {
      list: [
        "Use to present short snippets of code or commands.",
        "Ideal for inline code within paragraphs or standalone blocks.",
        "Use the `inline` attribute to render code snippets inline with text, utilizing compact padding and baseline alignment.",
        "Inline code inside Body or List Item prose receives tighter vertical padding so it sits naturally with the line-height.",
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
          key: "inline",
          title: "Inline",
          description: "Renders the code snippet inline with regular text rather than as a separate block element.",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        {
          "key": "large",
          "title": "Large",
          "description": "Demonstrates the Large Code treatment.",
          "list": [
            "Use Code for technical values and examples; preserve readable wrapping or scrolling for long content."
          ]
        },
        {
          "key": "medium",
          "title": "Medium",
          "description": "Demonstrates the Medium Code treatment.",
          "list": [
            "Use Code for technical values and examples; preserve readable wrapping or scrolling for long content."
          ]
        },
        {
          "key": "small",
          "title": "Small",
          "description": "Demonstrates the Small Code treatment.",
          "list": [
            "Use Code for technical values and examples; preserve readable wrapping or scrolling for long content."
          ]
        },
        {
          "key": "x-small",
          "title": "X-Small",
          "description": "Demonstrates the X-Small Code treatment.",
          "list": [
            "Use Code for technical values and examples; preserve readable wrapping or scrolling for long content."
          ]
        },
        {
          "key": "scrollable",
          "title": "Scrollable",
          "description": "When using the scrollable option, you’re likely displaying large code examples. Please ensure your content is properly formatted with line breaks and spacing. This component provides minimal formatting support, so you’ll need to handle this yourself or consider using a more advanced third-party code viewer.",
          "list": [
            "Line wrapping is disabled when scrollable is set;\n              Use the nbsp element to insert non-breaking spaces;\n              Use br element to manually add line breaks;\n              Structure and format your code manually to ensure readability"
          ]
        },
        {
          "key": "wrap",
          "title": "Wrap",
          "description": "Demonstrates the Wrap Code treatment.",
          "list": [
            "Use Code for technical values and examples; preserve readable wrapping or scrolling for long content."
          ]
        },
        {
          "key": "inline",
          "title": "Inline",
          "description": "Displays a code snippet inline with surrounding text.",
          "list": [
            "Use Code for technical values and examples; preserve readable wrapping or scrolling for long content."
          ]
        },
        {
          "key": "formatted-payload-types",
          "title": "Formatted Payload Types",
          "description": "Format source values before passing text into Code; Code preserves whitespace and wrapping without altering content.",
          "list": [
            "Use Code for technical values and examples; preserve readable wrapping or scrolling for long content."
          ]
        },
        {
          "key": "surface-contexts",
          "title": "Surface Contexts",
          "description": "Code defaults to surface-elevated-100, then shifts to surface-elevated-200 when used inside a recognized surface.",
          "list": [
            "Card, Card Body, Drawer, Dialog, and Carousel automatically apply surface usage through the nearest recognized ancestor.",
            "Use Code for technical values and examples; preserve readable wrapping or scrolling for long content."
          ]
        }
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
      list: [
        "Inline code renders as an inline-block box aligned to the text baseline.",
        "Inline code inside prose contexts uses `padding: var(--space-000) var(--space-100)`.",
        "Block code expands to fill the container width and supports scrollable/wrapping properties.",
      ],
    },

    writing: {
      list: [""],
    },
  },
};
