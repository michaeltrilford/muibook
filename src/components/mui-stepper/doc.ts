import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Stepper: {
    title: "Stepper",
    description:
      "A Stepper component visually represents a sequence of steps in a process. It helps users understand progress and navigate through multi-step workflows. This component supports both horizontal and vertical orientations.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/423YAEfIeoDzzsK9ClbTkP/485c6c4f637080247caa150afed0ef14/Stepper_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=948-4195&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/navigation-stepper--docs"],
    github: ["https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-stepper"],
    website: ["https://muibook.com/#/stepper"],
    guides: ["https://guides.muibook.com/stepper"],

    usage: {
      list: [""],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      description: "The stepper uses two simple styles: active and inactive. Their meaning changes based on position in the sequence, representing progress through different states.",
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/6Y5iyISdhK7PX8d1cHJxWv/761efb630c924af42ebf8d8bd5fabfb2/Stepper_-_Anatomy.png",
      list: [
        "Active / Completed: Indicates the current step or a task that has been successfully finished.",
        "Upcoming: Represents a step or task that has not yet been completed.",
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
          key: "review-items-task",
          name: "Review Items Task",
          description:
            "A permanent drawer remains visible at all times and is typically used for core navigation or tools that support the main content. It doesn’t open or close, and is always part of the current layout or workflow.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/rHTSU9sPUdmwrmGETRLcC/fa444ff8d8a72a28e8f10537324bbca3/drawer-composition-smart-bills.png",
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
