import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Progress: {
    title: "Progress",
    description:
      "A Progress Bar visually represents completion status by filling a bar based on a percentage value. It gives users a clear indication of progress for a given task or process.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/2NPcL7tA0zGUWFLShr66fS/23d0050dce8c8379afc6deb8e351d049/Progress_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=948-4161&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-progress--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-progress/index.ts"],
    website: ["https://muibook.com/#/progress"],
    guides: ["https://guides.muibook.com/progress"],

    usage: {
      list: [
        "Show task progress – Indicate how much of a task or process has been completed.",
        "Display loading states – Represent the progress of a background operation, such as file uploads.",
        "Track step completion – Show progress in multi-step workflows or onboarding processes.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/1iPll53Pmtgjh50qYwhsgY/908da9c51dd605895bd6306290fc6bd9/Progress_-_Anatomy.png",
      list: [
        "Fill (Indicator) – The colored portion inside the track that represents the progress percentage.",
        "Track – The background of the progress bar, providing the visual boundary for progress.",
      ],
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
