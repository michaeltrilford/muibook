import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  FileUpload: {
    title: "File Upload",
    description: "A simple file input that displays the selected file name and emits a file-upload event.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/1rEfpEQEyCvvmkfC4qKrvb/b27ffb14d215b37bb98707c87ed2838c/FileUpload_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=948-4068&t=0ytskb8cxriEmdz2-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-file-upload--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-file-upload/index.ts"],
    website: ["https://muibook.com/#/file-upload"],
    guides: ["https://guides.muibook.com/file-upload"],

    usage: {
      list: [
        "Use when users need to upload a file, such as documents, images, or other assets.",
        "Keep labels and instructions clear so users understand what file types and sizes are allowed.",
        "Display the selected file name once uploaded to confirm selection.",
        "Validate file type and size before submission and provide helpful error messages.",
        "Only use this component when uploading is essential to completing a task — avoid optional uploads unless necessary.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/2sqEWKOyrgyXbePd1Y0QY1/36670de55b4f68391d073275b94b11e8/FileUpload_-_Anatomy.png",
      list: [
        "Message: This text indicates that no file has been selected.",
        "Action: Use this element as a call to action for the user to add a file.",
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
          name: "Field",
          link: "https://guides.muibook.com/field",
        },
        {
          name: "Input",
          link: "https://guides.muibook.com/input",
        },
        {
          name: "Select",
          link: "https://guides.muibook.com/select",
        },
        {
          name: "Add on",
          link: "https://guides.muibook.com/add-on",
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
