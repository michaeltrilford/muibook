import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  HeaderBar: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["left", "right"],
    },
    title: "Header Bar",
    description:
      "A standalone Web Component for top application shell and workspace headers with drawer-aligned side columns, token-bound heights, surface variants, and optional resize rails.",
    guides: ["https://guides.muibook.com/header-bar"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-header-bar/index.ts"],
    storybook: ["https://stories.muibook.com/?path=/docs/layout-header-bar--docs"],
    website: ["https://muibook.com/header-bar"],
    usage: {
      list: [
        "Use HeaderBar as the top header region in application shells, workspace layouts, and product headers.",
        "Use slot='left' for drawer-aligned header branding, product logos, and menu toggle actions.",
        "Use slot='right' for panel-aligned profile menus, workspace statuses, and custom right-aligned action groups.",
        "Use left-width and right-width to align header columns with adjacent mui-drawer panel widths.",
        "Use size='x-small | small | medium | large' to control header height according to design system tokens.",
        "Use surface='default | transparent' to switch between elevated surface background (var(--surface-elevated-100)) and transparent.",
        "Use bottom-border='false' when header borders are handled by parent layout shells or transparent Hero backgrounds.",
        "Use resize-rail when header side columns need direct width controls, and listen for mui-header-bar-resize to synchronize an aligned Drawer or panel.",
        "Use mui-header-bar-resize-start and mui-header-bar-resize-end to suspend and restore transitions in synchronized layouts while dragging.",
        "Header Bar and Drawer do not bind automatically: let the application own their shared open and width state, mirror Drawer width into left-width or right-width, and derive slot and aria-expanded state from Drawer events.",
        "Use Mui Responsive around complete Header Bar alternatives for viewport-level shell changes; use a nested variant='container' Responsive in the main slot when search and action composition should react to available main-column width.",
        "Dropdowns inherit Header Bar size unless they explicitly author another size; their trigger Buttons receive usage='header-bar'.",
        "Header Bar profile Buttons fill the bar height with square edges, while shape='circle' and Avatar-only actions retain their normal action footprint.",
        "Avatar and Avatar Chip content inside a Header Bar Button follows Button size and maps its avatar footprint to the matching action-size token.",
        "Use mui-badge in the notification Button badge slot when the Header Bar needs to expose an unread count without changing the action label.",
        "Use a medium Search Input for the primary Header Bar search and a secondary circular Button for its notification action.",
        "Use an HStack with space='var(--space-500)' when grouping the notification action beside a profile Dropdown in the demonstrated standard Header Bar composition.",
        "When a full-height profile Dropdown ends the main region, remove the main region's right padding and retain only its left inset. A terminal profile Dropdown in slot='right' needs no wrapper padding.",
      ],
    },
    accessibility: {
      designerList: [
        "HeaderBar provides the primary landmark region (<header>).",
        "Slotted menu triggers and action buttons require clear accessible labels.",
        "Ensures sufficient contrast across surface background variants.",
        "Resize rails need a visible focus treatment and must not be the only way to change or toggle an adjacent Drawer.",
      ],
      engineerList: [
        "Renders a semantic <header> tag with role='banner'.",
        "Preserves keyboard tab order across left, main, and right slotted action groups.",
        "Resize rails support ArrowLeft and ArrowRight, with Shift for larger increments.",
        "Listen to mui-header-bar-resize and use event.detail.side, event.detail.width, or event.detail.value when synchronizing adjacent regions.",
      ],
    },
    stories: {
      items: [
        {
          key: "two-column-shell",
          title: "2-Column Shell Header",
          description: "Standard top application header aligned with a left navigation drawer.",
          list: ["Use left-width to align the left column with the adjacent navigation drawer width.", "Place menu toggle button and brand identity in slot='left'."],
        },
        {
          key: "three-column-workspace",
          title: "3-Column Workspace Header",
          description: "Full workspace header aligned with both left navigation and right panel drawers.",
          list: ["Use left-width and right-width to align both side columns.", "Use slot='right' for panel-aligned title or workspace status."],
        },
        {
          key: "custom-right-section",
          title: "Custom Right Section",
          description: "Header bar with custom action group on the right side.",
          list: ["Set right-width='auto' for an intrinsically sized custom action group.", "Place dropdowns, avatars, and action triggers in slot='right'.", "Let profile Dropdown, Button, Avatar Chip, and Avatar inherit Header Bar density unless the composition deliberately needs an explicit override."],
        },
        {
          key: "size-scale",
          title: "Size Scale",
          description: "Header bar heights bound to x-small, small, medium, and large design tokens.",
          list: ["Use size='x-small | small | medium | large' to adjust header height according to design system tokens.", "Each row uses Responsive container mode with observe='self' because the Responsive wrapper owns the available story width; complete Header Bar alternatives occupy show-above and show-below.", "The x-small Header Bar deliberately uses a small Search Input, small notification Button with the small icon configuration, and small profile Dropdown; the remaining rows demonstrate their corresponding control scales.", "Compare an Avatar Chip Dropdown in slot='right' with an Avatar-only Dropdown composed beside the notification action in the main region; both inherit Header Bar context and action-sized avatar footprints."],
        },
        {
          key: "push-drawer-shell",
          title: "Push Drawer Shell",
          description: "Pairs responsive Header Bar alternatives with an open push navigation Drawer.",
          list: ["Keep Header Bar left-width aligned with Drawer width.", "Use complete Header Bar alternatives when the app-shell structure changes by viewport.", "Connect the Header Bar menu actions to the Drawer open and close methods and synchronize aria-expanded from Drawer state."],
        },
        {
          key: "push-rail-drawer-shell",
          title: "Push Rail Drawer Shell",
          description: "Synchronizes Header Bar and Drawer resize rails in a responsive application shell.",
          list: ["Mirror Drawer width to Header Bar left-width.", "Use the Header Bar resize lifecycle events to keep synchronized Drawer updates immediate.", "When the Drawer closes, remove slot='left' from the Header Bar identity group so it moves into the main region and the unused left column and rail collapse naturally."],
        },
        {
          key: "responsive-container-query",
          title: "Responsive Container Query Shell",
          description: "Uses Mui Responsive container mode to switch between complete wide and compact Header Bar compositions.",
          list: ["Put complete Header Bar alternatives in show-above and show-below.", "Use container responsiveness when the composition depends on available parent space."],
        },
      ],
    },
  },
};
