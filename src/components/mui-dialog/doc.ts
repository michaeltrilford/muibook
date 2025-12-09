import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Dialog: {
    title: "Dialog",
    description:
      "A modal window that prompts users to take a specific action or provide additional information without navigating away from the current context.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/4jrr9tVVDi9Kz8lhaxWToe/8169a3e57f30572fbf6dd504f360fedd/Dialog_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=780-4948&t=KhmyUmaNDWKTGtrH-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/content-dialog--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-dialog/index.ts"],
    website: ["https://muibook.com/#/dialog"],
    guides: ["https://guides.muibook.com/dialog"],

    usage: {
      list: [
        "Used to alert the user of potentially a harmful action.",
        "Use for focused interactions that require attention and immediate action.",
      ],
    },

    accessibility: {
      designerList: [
        "Ensure dialogs are accessible via keyboard and screen readers.",
        "Use ARIA roles and properties to indicate the state of the dialog (visible/hidden).",
        "Ensure the focus remains within the dialog while it is open.",
      ],
      engineerList: [
        "Uses role='dialog' and aria-modal='true' for screen readers.",
        "Supports aria-labelledby and aria-describedby to provide accessible titles and descriptions.",
        "Focus is managed by the browser’s native dialog behavior when open.",
        "The close button includes aria-label='Close Icon'.",
        "Footer is hidden when empty to reduce screen reader noise.",
        "Clicking the backdrop closes the dialog.",
        "When open, consumers must trap focus in the dialog and apply inert/aria-hidden to the background.",
        "The component exposes 'mui-dialog-open' and 'mui-dialog-close' events so external state (e.g. React setDialogOpen(false)) stays in sync with the dialog’s internal logic.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/3Qs9rIWX7LeUjQ3ioObKBe/4848a3b0ad303a12eef5739ddd1c6169/Dialog_-_Anatomy.png",
      list: [
        "Heading: Text that describes the purpose or contents of the dialog.",
        "Close: An icon or button that allows users to close the dialog.",
        "Container: Controls the position of the dialog and appears as an overlay.",
        "Footer: Optional section for additional actions, such as 'Cancel' or 'Save'.",
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
          name: "Drawer",
          link: "https://guides.muibook.com/drawer",
        },
        {
          name: "Button",
          link: "https://guides.muibook.com/button",
        },
      ],
    },

    rules: [
      {
        heading: "Dismiss the Dialog",
        description: "",
        doContent: [
          {
            description: "Dismiss the Dialog by clicking the cross icon, cancel button or the surrounding background.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/VxeZZCz9ekrnQQ5AByJ5W/5671672f2bb94c91d913d443e6c73f75/dialog-dismiss-do.png",
          },
        ],
        dontContent: [
          {
            description: "Avoid hiding the close button or replacing the footer action with a close function.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/69Iqe3DgTqm9Xy1m1aBnlT/f858753bf988bb08e6255c3f3b790abe/dialog-dismiss-dont.png",
          },
        ],
      },
      {
        heading: "Content Clarity",
        description: "",
        doContent: [
          {
            description:
              "Use a simple, stacked layout that ensures clarity and flexibility in the limited space. Keep the content clear, concise, and easy to read.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/6Th9UaPwtSwR5TD93JvKOS/206fe41d70d2f20aa5ef02478eeb340a/dialog-content-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Don’t use complex layouts like grids or overcrowd the dialog with excessive content that may hinder readability.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5OeRzyHdAW5m7TrePK4Ksq/09d0b82ff09a67465b9606a95689063f/dialog-content-do-not.png",
          },
        ],
      },
    ],

    behaviour: {
      list: [
        "Dialogs appear as a temporary overlay on top of the main content.",
        "The dialog smoothly animates onto the screen to enhance user experience.",
        "Users can click the background to dismiss the dialog.",
      ],
    },

    writing: {
      list: [
        "Concise Information: Keep dialog content simple and to the point.",
        "Clear Labels: Use clear labels for actions and navigation items.",
        "Avoid Overcrowding: Do not overcrowd the dialog with too much information.",
      ],
    },
  },
};
