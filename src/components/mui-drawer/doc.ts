import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Drawer: {
    title: "Drawer",
    description:
      "A drawer view that prompts users to take a specific action or provide additional information without navigating away from the current context.",
    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/1iLh5CQqFjulW1v1LqDuDd/5a429cd1616a087644a8460f4182ba35/Drawer_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=958-8626&t=sYltPCmy96M6DX5X-1",
    ],
    guides: ["https://guides.muibook.com/drawer"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-drawer/index.ts"],
    storybook: ["https://stories.muibook.com/?path=/docs/content-drawer--docs"],
    website: ["https://muibook.com/#/drawer"],
    usage: {
      list: [
        "Used for navigation, settings and detailed tasks.",
        "Can be a temporary overlay Drawer that appears over content. E.g. Navigation",
        "Can be a persistent push Drawer until workflow complete. E.g. Tasks",
        "Task based Drawers are often positioned right of the viewport.",
      ],
    },
    accessibility: {
      designerList: [
        "Overlay and push drawers act like dialogs.",
        "Persistent drawers act like complementary content.",
        "Drawers have a clear title and description for screen readers.",
        "When open, focus is locked in the drawer and the rest of the app is inactive.",
        "On close, focus returns to the trigger.",
        "The close button is labeled 'Close drawer'.",
        "The footer hides when empty to reduce noise.",
        "Overlay and push drawers close with Escape or backdrop click.",
      ],
      engineerList: [
        "Uses role='dialog' for overlay/push variants and role='complementary' for persistent layout variants.",
        "Supports aria-labelledby and aria-describedby for accessible titles and descriptions.",
        "The close button includes aria-label='Close drawer'.",
        "Footer slot is hidden when empty to reduce screen reader noise.",
        "When open, consumers must trap focus in the drawer and apply inert/aria-hidden to the background.",
        "Backdrop click and Escape close the drawer in overlay and push variants.",
        "Exposes 'mui-drawer-open' and 'mui-drawer-close' events for external state sync.",
      ],
    },
    anatomy: {
      list: [
        "Heading: Text that describes the purpose or contents of the drawer.",
        "Close: An icon or button that allows users to close the drawer.",
        "Body: Section to slot navigation links, settings, or other relevant information.",
        "Footer: Optional section for additional actions, such as 'Cancel' or 'Save'.",
      ],
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/7aOA4WtcFwev6f3tZy6VgX/83c0b087170d859406526e5d7ad66d6b/Drawer_-_Anatomy.png",
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

    related: {
      items: [
        { name: "Dialog", link: "https://guides.muibook.com/dialog" },
        { name: "Button", link: "https://guides.muibook.com/button" },
      ],
    },
    rules: [
      {
        heading: "Dismissing a Drawer",
        description: "",
        doContent: [
          {
            description:
              "Dismiss the Drawer by clicking the cross icon, cancel button, esc key or the surrounding background.",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/57NkU3oAQcirF5MGE13com/ad76c20d1895daf7d7c1e3467066e65a/drawer-dismiss-do.png",
          },
        ],
        dontContent: [
          { description: "Avoid hiding the close button or replacing the footer action with a close function." },
          {
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/18OP63gYKYYM22rkwWeR2B/b1f496968b693385afcfdae4fe54f1c2/drawer-dismiss-dont.png",
          },
        ],
      },
      {
        heading: "Push Drawer",
        description:
          "Ideal when both drawer and the main content need to be visible, such as for filters or tools that need to be accessed with the main view still present.",
        doContent: [
          { description: "Ensure the drawer does not obscure crucial information when the user is working on a task." },
          {
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5wsKf5Cnw9RNvyIUp2LQkc/5394a8450361acb0d100356688190301/drawer-push-drawer-do.png",
          },
        ],
        dontContent: [
          { description: "The drawer shouldn't cover key content or controls when the user is completing a task." },
          {
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/2DH7KR12spaSoBbTq4rzav/4f46f916a3918a2cf6b61995f984bc36/drawer-push-drawer-dont.png",
          },
        ],
      },
      {
        heading: "Overlay Drawer / Menu",
        description:
          "Overlay navigation drawers appear above the main content and are used to access app sections or menus. They block background interaction to keep the user focused on making a selection.",
        doContent: [
          {
            description:
              "Ensure the user can close the drawer by clicking the background, using the close (X) button, or hitting the Escape key.",
          },
          {
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5VOY2WHXcUCqblWIqAg0di/718f85a9b69d5467179deb4ae7fa65db/drawer-overlay-do.png",
          },
        ],
        dontContent: [
          {
            description:
              "Don't use footer actions, such as “Save” or “Cancel,” to close the navigation drawer. These actions are reserved for task workflows.",
          },
          {
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5PpEeYZf4PslTKh42u81Uf/9e59e9a3f1bf533699b20ede7d289b75/drawer-overlay-dont.png",
          },
        ],
      },
    ],

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "navigation-menu",
          name: "Navigation Menu",
          description:
            "Overlay Drawer used for navigating between major sections of the product. It appears as a temporary overlay and is dismissed easily when users make a selection or interact outside the drawer. Ideal for mobile or smaller viewports where persistent navigation isn’t suitable.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/56QeC3M4PhQVmlwVKwUqLl/1e3119e0d817813c88c1352408e53c64/drawer-composition-menu.png",
        },
        {
          key: "create-roadmap-task",
          name: "Create Roadmap Task",
          description:
            "Overlay Drawer used for completing temporary, focused tasks such as editing a field or filling out a short form, where the surrounding content (background) is not needed for context. If the task depends on the main content, use a push or permanent drawer that sits alongside the view.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2FFW8tnnM6leJbd0LPyeKl/1ab79ffb7165d6fbd35b151bc69cad5a/drawer-composition-outcomes.png",
        },
        {
          key: "invoice-details-task",
          name: "Invoice Details Task",
          description:
            "Overlay Drawer used for navigating between major sections of the product. It appears as a temporary overlay and is dismissed easily when users make a selection or interact outside the drawer. Ideal for mobile or smaller viewports where persistent navigation isn’t suitable.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/XXqWZOjNxUkK9Ou2FPTCB/5fd1db2b2315d0ae41ec543feac2a03c/drawer-composition-invoice.png",
        },
        {
          key: "review-items-task",
          name: "Review Items Task",
          description:
            "Push Drawer used for completing persistent tasks such as editing a field or filling out a short form, where surrounding content remains visible for context. An entry action is required to open the drawer, but it can be hidden while the task is active to keep focus on the workflow.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/rHTSU9sPUdmwrmGETRLcC/fa444ff8d8a72a28e8f10537324bbca3/drawer-composition-smart-bills.png",
        },
      ],
    },
    behaviour: {
      list: [
        "Animate the drawer smoothly to enhance user experience.",
        "Don't make the animation too slow or jarring",
        "Avoid animations that are too fast, slow, or abrupt.",
        "rawers often slide in from the right-side of the viewport.",
      ],
    },
    writing: {
      list: [
        "Keep drawer content simple and concise.",
        "Use clear labels for navigation items or actions.",
        "Avoid overcrowding the drawer with too much information.",
      ],
    },
  },
};
