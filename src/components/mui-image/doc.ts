import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Image: {
    title: "Image",
    description:
      "Displays an image alongside an optional caption to provide context, explanation, or attribution. Useful for supporting content visually while maintaining clarity through descriptive labelling.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/14eozXMPlzipgAfqaIR2Py/4e211990a30b4a08549deccfd30c71a9/Image_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=948-4194&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-image--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-image/index.ts"],
    website: [""],
    guides: ["https://guides.muibook.com/image"],

    usage: {
      list: [
        "Use to display images that require additional context or explanation.",
        "Use height + crop + fit=cover when you need fixed-height visual crops.",
        "Use max-height with aspect-ratio for responsive image frames that should not exceed a visual cap.",
        "Use focal-x/focal-y or position to keep important content in frame.",
        "Use zoom carefully to tighten framing without switching to background-image.",
        "Captions should clarify the relevance of the image, not repeat surrounding content.",
        "Ideal for diagrams, UI examples, or content requiring attribution.",
        "Ensure images are accessible with alt text and meaningful captions.",
      ],
    },

    accessibility: {
      designerList: [
        "Use meaningful alt text that describes the image’s purpose.",
        "Use alt=&#8220;&#8221; for decorative images that don’t convey information.",
        "Use the caption slot for extended context, especially for diagrams or UI patterns.",
      ],
      engineerList: [
        "Use meaningful alt text that describes the image’s purpose.",
        "Use alt=&#8220;&#8221; for decorative images that don’t convey information.",
        "Use the caption slot for extended context, especially for diagrams or UI patterns.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/3BSbMl1cqUOB6oDmFLQjRx/193889c0f6d3da6178d51e5fff06b8ed/Image_-_Anatomy.png",
      list: ["Standard styling for a hero image.", "Optional caption for the image."],
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
