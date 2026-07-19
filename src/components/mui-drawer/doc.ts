import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Drawer: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["title","actions","page","left","right"],
    },
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
    storybook: ["https://stories.muibook.com/?path=/docs/overlays-drawer--docs"],
    website: ["https://muibook.com/drawer"],
    usage: {
      list: [
        "Used for navigation, settings and detailed tasks.",
        "Can be a temporary overlay Drawer that appears over content. E.g. Navigation",
        "Can be a persistent push Drawer until workflow complete. E.g. Tasks",
        "Task based Drawers are often positioned right of the viewport.",
        "For push and persistent drawers, use a plain div as the direct slot='page' wrapper and compose layout components inside it.",
        "Use variant='workspace' when a canvas or editor needs independently controlled left and right side panels around a central page.",
        "Set height when push, persistent, or workspace drawers need to match an app shell or contained region, for example 100dvh, 100lvh, or a product-owned CSS custom property shared across shell surfaces. Use 100lvh for full-screen shells that should keep the largest viewport height when iOS Safari or Home Screen web apps initially report a smaller dynamic viewport.",
        "Use contained when a push, persistent, or workspace drawer is rendered inside a bounded story canvas, card, or nested layout.",
        "Use resize-rail when desktop users need to tune drawer width; on narrow screens the rail is hidden and the drawer behaves like an overlay.",
        "Resize rails can be focused with the keyboard; use ArrowLeft and ArrowRight to nudge width, Shift with arrow keys for larger steps, and Escape to close the focused workspace side.",
        "Resize rails remain beneath Menu and overlay content so resizing affordances do not cover open actions.",
        "Avoid assigning slot='page' directly to Stack or other sized layout components because Drawer owns the page viewport sizing.",
        "Use app-level CSS to map Drawer surface tokens such as --drawer-background to product navigation or shell colors.",
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
        "Workspace drawers expose independent left and right regions; keep toggle controls outside the panels so each side can be opened again after it is closed.",
        "Workspace resize rails close only the focused side when Escape is pressed, avoiding accidental collapse of both panels.",
        "On iOS and other safe-area devices, keep Drawer mounted at the shell edge and let the component reserve physical safe-area insets for mobile overlay panels.",
        "Exposes 'mui-drawer-open' and 'mui-drawer-close' events for external state sync.",
      ],
    },
    anatomy: {
      list: [
        "Heading: Text that describes the purpose or contents of the drawer.",
        "Close: An icon or button that allows users to close the drawer.",
        "Body: Section to slot navigation links, settings, or other relevant information.",
        "Footer: Optional section for additional actions, such as 'Cancel' or 'Save'.",
        "Page: Plain div wrapper assigned to slot='page' for push and persistent layouts; place app layout content inside it.",
        "Workspace panels: Left and right regions assigned to slot='left' and slot='right' when variant='workspace'.",
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

    stories: {
      items: [
        { key: "drawer-overlay-left", title: "Overlay Left", description: "Displays a modal drawer from the left viewport edge.", list: ["Use for navigation or supporting tasks that temporarily cover the page.", "Provide a clear title and dismissal action; overlay drawers also close with Escape or the backdrop."] },
        { key: "drawer-overlay-right", title: "Overlay Right", description: "Displays a modal drawer from the right viewport edge.", list: ["Use for focused tasks or details that relate to the current page.", "Keep primary and cancel actions in the fixed footer when the workflow requires a decision."] },
        { key: "drawer-overlay-no-header", title: "Overlay: No Header", description: "Removes the built-in heading and close action.", list: ["Omit the header only when the content supplies an equally clear label and dismissal control.", "Ensure dismissal remains visible on narrow screens."] },
        { key: "drawer-overlay-custom-footer", title: "Overlay: Custom Footer Content", description: "Footer content uses its rendered height while the drawer body remains scrollable.", list: ["Use the actions slot for custom footer layouts while keeping the body independently scrollable.", "Set close-size when the built-in header action needs to match a denser or roomier header."] },
        { key: "drawer-overlay-no-footer", title: "Overlay: No Footer", description: "Removes the fixed action region when the drawer does not require a final decision.", list: ["Omit the footer for navigation or informational content without save, confirm, or cancel actions.", "Keep the header close action available, especially on narrow screens."] },
        { key: "drawer-workspace", title: "Workspace", description: "Creates an editor-style workspace with left and right panels around a central page or canvas.", list: ["Use variant='workspace' when a page canvas needs independent left and right support panels.", "Slot navigation or libraries into slot='left', the main canvas into slot='page', and inspector content into slot='right'.", "Set height to match the app shell or containing canvas.", "Control each panel independently with left-open, right-open, left-width, and right-width.", "Add resize-rail with minimum panel and page widths when users need adjustable columns; dragging below resize-close-threshold or pressing Escape closes only that side."] },
        { key: "drawer-push-left", title: "Push Left", description: "Slides in from the left and shifts the page while keeping both regions visible on desktop.", list: ["Use a push drawer when the panel and page should remain visible together during a task.", "Use a plain div with slot='page' as the direct page wrapper; compose layout components inside it.", "On narrow screens the drawer becomes an overlay; use a separate responsive composition only when the workflow must change."] },
        { key: "drawer-push-left-resize-rail", title: "Push Left Resize Rail", description: "Adds a draggable boundary between a left push drawer and the page.", list: ["Use resize-rail only when the push drawer benefits from user-controlled width.", "Set resize-min-drawer-width and resize-min-page-width to protect both regions while resizing.", "Keep the page wrapper resilient with min-width: 0 and scrollable or container-aware content.", "Pull below resize-min-drawer-width to fade the drawer content, then release past resize-close-threshold to close it.", "The rail is hidden on narrow screens where the push drawer becomes an overlay."] },
        { key: "drawer-persistent-left-resize-rail", title: "Persistent Left Resize Rail", description: "Adds a draggable boundary between a left persistent drawer and the page.", list: ["Use resize-rail only when the persistent drawer benefits from user-controlled width.", "Set resize-min-drawer-width and resize-min-page-width to protect both regions while resizing.", "Keep the page wrapper resilient with min-width: 0 and scrollable or container-aware content.", "On narrow screens the persistent drawer becomes an overlay and the rail is hidden."] },
        { key: "drawer-persistent-left", title: "Persistent Left", description: "Keeps supporting content fixed beside the left side of the page on desktop.", list: ["Use a persistent drawer when supporting content should remain visible beside the page on desktop.", "Use a plain div with slot='page' as the direct page wrapper; compose layout components inside it.", "Use mobile-presentation='stack' when narrow screens should retain a block layout instead of overlaying the page."] },
        { key: "drawer-push-right", title: "Push Right", description: "Slides in from the right and shifts the page while keeping both regions visible on desktop.", list: ["Use a push drawer when the panel and page should remain visible together during a task.", "Use a plain div with slot='page' as the direct page wrapper; compose layout components inside it.", "On narrow screens the drawer becomes an overlay; use a separate responsive composition only when the workflow must change."] },
        { key: "drawer-push-right-resize-rail", title: "Push Right Resize Rail", description: "Adds a draggable boundary between a right push drawer and the page.", list: ["Use resize-rail only when the push drawer benefits from user-controlled width.", "Set resize-min-drawer-width and resize-min-page-width to protect both regions while resizing.", "Keep the page wrapper resilient with min-width: 0 and scrollable or container-aware content.", "Pull below resize-min-drawer-width to fade the drawer content, then release past resize-close-threshold to close it.", "The rail is hidden on narrow screens where the push drawer becomes an overlay."] },
        { key: "drawer-persistent-right-resize-rail", title: "Persistent Right Resize Rail", description: "Adds a draggable boundary between a right persistent drawer and the page.", list: ["Use resize-rail only when the persistent drawer benefits from user-controlled width.", "Set resize-min-drawer-width and resize-min-page-width to protect both regions while resizing.", "Keep the page wrapper resilient with min-width: 0 and scrollable or container-aware content.", "On narrow screens the persistent drawer becomes an overlay and the rail is hidden."] },
        { key: "drawer-persistent-right", title: "Persistent Right", description: "Keeps supporting content fixed beside the right side of the page on desktop.", list: ["Use a persistent drawer when supporting content should remain visible beside the page on desktop.", "Use a plain div with slot='page' as the direct page wrapper; compose layout components inside it.", "Use mobile-presentation='stack' when narrow screens should retain a block layout instead of overlaying the page."] },
        { key: "drawer-menu", title: "Menu", description: "Uses Drawer as persistent application navigation beside the page.", list: ["Use a push drawer for application navigation that should share space with the page.", "Use drawer-space when navigation content needs to control its own edge-to-edge spacing."] },
        { key: "drawer-advanced-menu", title: "Advanced Menu", description: "Uses responsive composition to provide different desktop and mobile navigation treatments.", list: ["Use Mui Responsive when desktop and mobile navigation require different Drawer variants or structures.", "When replacing the built-in header, provide an accessible custom dismissal action using data-close."] },
        { key: "drawer-breakpoint", title: "Breakpoint", description: "Adjusts when the Drawer switches to its narrow-screen presentation.", list: ["Set breakpoint to control when Push, Persistent, or Workspace switches to its narrow-screen presentation.", "Use breakpoint='0' when application state or media queries provide a separate mobile composition."] },
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
