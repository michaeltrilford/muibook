import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Body: {
    title: "Body",
    description:
      "Use the Body component for clear and readable paragraph text across the UI. It’s ideal for longer-form content such as descriptions, explanations, or supporting information. Variant styles are also available for status messages and other contextual needs.",
    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/GGmtyOnGHBMGMrvkPTWSL/2c6ff12702d76c1393b2315b19728aa3/Body_-_Home_Image.png",
    ],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-892&t=fSFYVey9aCoE5oQa-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/content-body--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-body/index.ts"],
    website: ["https://muibook.com/#/button"],
    guides: ["https://guides.muibook.com/body"],

    usage: {
      list: [
        "Use for supporting content or descriptions.",
        "Use states like Default, Success, Warning and Error to align with feedback or messaging contexts.",
        "Match the body size to the layout’s overall design and readability.",
        "Adjust the size by selecting x-small, small, medium or large.",
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
          key: "default",
          title: "Default",
          description:
            "Standard body text with x-small, small, medium and large for tailored readability. In addition to the size, font weight of regular and bold is available.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2NAalFsBAkeBz69hO093eb/b9390132c50df11749aaa47dafdb2b93/default.png",
        },
        {
          key: "optional",
          title: "Optional",
          description:
            "Optional text is visually lighter, providing subtle contrast to Standard body text. It comes in four sizes—x-small, small, medium, and large—for tailored readability. Font weights of regular and bold are also available, giving flexibility for emphasis or hierarchy.",
          image:
            "",
        },
        {
          key: "success",
          title: "Success",
          description:
            "Indicates positive feedback with the option of x-small, small, medium and large for tailored readability. In addition to the size, font weight of regular and bold is available.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/8RChklU9yHSY7PTJH0JLD/c72f630006f2be4e7f1d850d7510c92f/success.png",
        },
        {
          key: "warning",
          title: "Warning",
          description:
            "Highlights warning messages with the option of x-small, small, medium, and large for tailored readability. In addition to the size, font weight of regular and bold is available.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2UJaVEXU2fbKPi3L7afjt/e82b06ef54e92cf2d6f6e984d8a27079/warning.png",
        },
        {
          key: "error",
          title: "Error",
          description:
            "Highlights error messages with the option of x-small, small, medium, and large for tailored readability. In addition to the size, font weight of regular and bold is available.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/egb4l4ubM0A6T44xAxDgz/5d94fa59f0069b689da537710650e22b/error.png",
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
          key: "outcomes-roadmap-dashboard",
          name: "Outcomes Roadmap Dashboard",
          description:
            "Example of the responsive component in the Outcomes Roadmap Dashboard, demonstrating layout, title, and padding adjustments across breakpoints.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3FsXandRr1Z9BAKv33twxT/b0d0e4a8b6237bf7d38660111bceb8ab/responsive-composition.gif",
        },
        {
          key: "outcome-based-roadmap",
          name: "Outcome-Based Roadmap",
          description:
            "Example of an Outcome-Based Roadmap page showing objectives organised into Upcoming, Doing, and Finished columns. Progress bars indicate the completion status of each task, providing a clear view of overall progress.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/3w5htPtfEz7QMCH9alVcwf/de35725fb4542b891bd695b900195291/Outcomes-Progress-Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Heading",
          link: "https://guides.muibook.com/heading",
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
