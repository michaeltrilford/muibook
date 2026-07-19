import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  SlideFrame: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["image","header","header-after","header-description","footer","footer-after","notes"],
    },
    title: "Slide Frame",
    description:
      "Slide Frame is a composable presentation surface for UI-builder workflows. It supports configurable ratio, variants, image composition, and overflow handling.",
    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2133-17666&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/media-slide-frame--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-slide-frame/index.ts"],
    website: ["https://muibook.com/slide-frame"],
    guides: ["https://guides.muibook.com/slide-frame"],
    usage: {
      list: [
        "Use as a presentation shell and compose page content with existing components like Stack, Grid, Card, and Media.",
        "Prefer one <mui-slide-section> per page in the default slot for scalable composition.",
        "Use ratio='16:9|4:3|1:1|3:2|9:16' (or any valid W:H string) for presentation formats.",
        "Use title for built-in header text and footer-text for built-in footer copy.",
        "Section counter is built into the footer and updates with active-section.",
        "Use slot='header-after' and slot='footer-after' for trailing actions.",
        "Use slot='header-description' for secondary lines.",
        "Use variant='default|plain' to control frame chrome.",
        "Use scroll to opt into surface scrolling when content exceeds the frame.",
        "When multiple sections exist, users can navigate with Left/Right arrows.",
        "In present mode, press Esc to exit quickly.",
        "Use header/footer slots for frame-level controls, metadata, or actions.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "The surface is focusable in present mode and supports keyboard section navigation with Left/Right arrows.",
        "Esc exits present mode.",
        "Expose external controls for next/previous actions when building guided presentation flows.",
      ],
    },
    anatomy: {
      image: "",
      list: ["Header Slot", "Surface", "Image Slot", "Default Slot Content", "Notes Slot", "Footer Slot"],
    },
    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "Standard frame with ratio and padding control.",
          image: "",
        },
      ],
    },
    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "Presents a navigable sequence of slide sections.",
          "list": [
            "Each mui-slide-section in the default slot is a slide section/page.",
            "Use one mui-slide-section per page for clean composition.",
            "Use active-section (0-based) to control which page is visible."
          ]
        },
        {
          "key": "header-hidden",
          "title": "Header Hidden",
          "description": "Removes the header while preserving navigation and footer metadata.",
          "list": [
            "Use hide-header to suppress the header row while preserving slide navigation and footer metadata."
          ]
        },
        {
          "key": "footer-hidden",
          "title": "Footer Hidden",
          "description": "Removes footer content and the slide counter.",
          "list": [
            "Use hide-footer to suppress footer content and counter together."
          ]
        },
        {
          "key": "notes-hidden-in-fullscreen",
          "title": "Notes Hidden in Fullscreen",
          "description": "Keeps notes available for review but removes them during presentation.",
          "list": [
            "Notes can be open in normal mode for review.",
            "When entering fullscreen, notes are intentionally hidden so presentation layout stays stable."
          ]
        },
        {
          "key": "variant-plain",
          "title": "Variant: Plain",
          "description": "Removes decorative frame treatment for embedded or custom slide surfaces.",
          "list": [
            "Use when the surrounding layout already supplies sufficient framing."
          ]
        }
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [],
    },
    related: {
      items: [
        { name: "Stack", link: "https://guides.muibook.com/stack" },
        { name: "Grid", link: "https://guides.muibook.com/grid" },
        { name: "Card", link: "https://guides.muibook.com/card" },
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
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
