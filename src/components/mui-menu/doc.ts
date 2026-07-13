import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  Menu: {
    title: "Menu",
    description: "Menu provides a reusable visual surface for dropdown and anchored overlay content.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-menu/index.ts"],
    website: ["https://muibook.com/menu"],
    guides: [""],
    usage: { list: ["Use inside mui-dropdown to compose the portalled menu surface.", "Use size='x-small|small|medium|large' to scale the surface radius and all direct button or link actions together.", "Render independently when reviewing menu layouts and grouped overlay content."] },
    accessibility: { designerList: ["Keep menu actions concise and easy to scan."], engineerList: ["Use Dropdown when trigger, focus, dismissal, and positioning behaviour is required."] },
    anatomy: { image: "", list: ["Surface", "Menu content"] },
    variants: { items: [] },
    compositions: { description: "", items: [] },
    related: { items: [{ name: "Dropdown", link: "https://guides.muibook.com/dropdown" }] },
    rules: [],
    behaviour: { list: ["Menu owns presentation only; Dropdown owns overlay interaction and portal behaviour.", "Menu enforces its size on direct body, button, and link children while leaving rules and custom grouped content untouched.", "Menu radius is capped by the matching form radius so circular action tokens cannot turn the surface into a pill.", "Direct Body content receives action padding so headings and labels align with Menu actions.", "Top and bottom slots remain fixed around the scrollable default content, apply seamless form-control surfaces, and add a separator only when populated.", "Use inset when a Menu includes top or bottom content; keep action-only menus edge-to-edge.", "Inset state is passed to direct Button and Link actions so each component applies its own size-specific action padding independently from Menu content padding.", "When a direct Body heading precedes the first action, that action remains square at the top because the heading already buffers it from the Menu edge."] },
    writing: { list: ["Use short action labels and group related commands together."] },
  },
};
