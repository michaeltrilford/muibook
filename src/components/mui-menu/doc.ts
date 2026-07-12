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
    behaviour: { list: ["Menu owns presentation only; Dropdown owns overlay interaction and portal behaviour.", "Menu enforces its size on direct body, button, and link children while leaving rules and custom grouped content untouched.", "Menu radius is capped by the matching form radius so circular action tokens cannot turn the surface into a pill.", "Direct Body content receives action padding so headings and labels align with Menu actions.", "Top and bottom slots remain fixed around the scrollable default content, own their size-aware inset padding, and add a separator only when populated.", "Use top-compact or bottom-compact to remove a region inset and merge a direct form control into the Menu surface with transparent control, Add On, and composed action backgrounds.", "When a direct Body heading precedes the first action, that action remains square at the top because the heading already buffers it from the Menu edge."] },
    writing: { list: ["Use short action labels and group related commands together."] },
  },
};
