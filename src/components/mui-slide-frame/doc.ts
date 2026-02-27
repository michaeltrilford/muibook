import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  SlideFrame: {
    title: "Slide Frame",
    description:
      "Slide Frame is a composable presentation surface for UI-builder workflows. It supports configurable ratio, variants, radius, image composition, and overflow handling.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-slide-frame/index.ts"],
    website: ["https://muibook.com/#/slide-frame"],
    guides: ["https://guides.muibook.com/slide-frame"],
    usage: {
      list: [
        "Use as a single-slide shell and compose internals with existing components like Stack, Grid, Card, and Media.",
        "Use ratio='16:9|4:3|1:1|custom' for presentation formats.",
        "Use title for built-in header text and footer-text for built-in footer copy.",
        "Section counter is built into the footer and updates with active-section.",
        "Use slot='header-after' and slot='footer-after' for trailing actions.",
        "Use slot='header-description' for secondary lines.",
        "Use variant='default|plain' to control frame chrome.",
        "Use radius='default | none | small | medium | large' to align with your layout language.",
        "Use scroll to opt into surface scrolling when content exceeds the frame.",
        "When multiple sections exist, users can navigate with Left/Right arrows or horizontal swipe gestures.",
        "In present mode, press Esc to exit quickly.",
        "Use header/footer slots for frame-level controls, metadata, or actions.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "The surface is focusable in present mode and supports keyboard section navigation with Left/Right arrows.",
        "Esc exits present mode.",
        "Use hide-counter when you need to suppress the built-in Section X/Y footer counter.",
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
