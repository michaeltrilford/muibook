import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  "File Icon": {
    title: "File Icon",
    description:
      "Renders file-type icons from the pinned vscode-icons set for code, document, and asset previews.",

    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-file-icon/index.ts"],
    website: ["https://muibook.com/file-icon"],
    guides: [""],

    usage: {
      list: [
        "Use for file-type indicators in code examples, file lists, upload previews, and diff summaries.",
        "Prefer the icon attribute for authored markup; type is available as a concise alias.",
        "Use size='small' for standard inline file icons and size='medium' or size='large' for larger preview surfaces.",
        "Set decorative when adjacent text already names the file type.",
      ],
    },

    accessibility: {
      designerList: ["Avoid relying on the icon alone when the file type matters to the task."],
      engineerList: [
        "Provide label when the icon communicates meaning that is not repeated in adjacent text.",
        "Use decorative when the icon is paired with visible file type text.",
      ],
    },

    anatomy: {
      image: "",
      list: ["Host element with icon/type and size attributes.", "Internal image loaded from the pinned vscode-icons CDN."],
    },

    variants: {
      items: [
        {
          key: "file-type",
          title: "File Type",
          description: "A mapped file-type SVG from vscode-icons.",
          image: "",
        },
      ],
    },

    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "Renders a mapped VS Code file-type icon.",
          "list": [
            "Use icon to select a mapped vscode-icons file-type SVG.",
            "The component is pinned to vscode-icons pinned version."
          ]
        },
        {
          "key": "sizes",
          "title": "Sizes",
          "description": "Compares the supported File Icon size scale.",
          "list": [
            "Use small for standard inline file icons, then scale up to medium or large for larger preview surfaces."
          ]
        },
        {
          "key": "file-row",
          "title": "File Row",
          "description": "Composes File Icon with a filename and supporting metadata.",
          "list": [
            "Use decorative when the filename or adjacent text already identifies the file type."
          ]
        },
        {
          "key": "all-icons",
          "title": "All Icons",
          "description": "Displays every file type available in the pinned icon map.",
          "list": [
            "The supported file-type icons are available from the pinned vscode-icons pinned version map."
          ]
        }
      ],
    },

    compositions: {
      description: "File icons are usually used inside compact file rows, buttons, and code-oriented cards.",
      items: [
        {
          key: "file-list",
          name: "File List",
          description: "A file row can pair a file icon with filename and path text.",
          image: "",
        },
      ],
    },

    related: {
      items: [
        { name: "Icons", link: "https://guides.muibook.com/icons" },
        { name: "File Diff", link: "https://guides.muibook.com/file-diff" },
        { name: "Code", link: "https://guides.muibook.com/code" },
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
      list: ["Unknown icon/type values render the default file icon."],
    },

    writing: {
      list: [""],
    },
  },
};
