---
name: wireframe-to-muibook-components
description: Interpret sketches, wireframe drawings, design screenshots, and visual mockups into semantic Muibook Web Components, responsive layout primitives, and valid token-driven styling.
---

# Wireframe To Muibook Components

Use this skill when provided with a wireframe, sketch, design screenshot, or visual mock-up and tasked with translating it into native Muibook Web Components, HTML, or application code.

## 1. Core Wireframe Interpretation Principles

When a wireframe image or screenshot is provided:

1. **Hierarchy over Pixels:** Read the wireframe as a description of intent, user hierarchy, and approximate layout rather than a pixel-perfect specification.
2. **Keyword & Concept Resolution:** Use visible labels, control patterns, and visual landmarks to identify likely UI concepts, then resolve them through the Muibook keyword mappings (`keywords.ts` or `find_component` MCP tool).
3. **API & Prop Verification:** Verify inferred components, public attributes, and slots against the Muibook component API (CEM / `lookup_component` MCP tool) before writing markup.
4. **Layout Regions vs. Cards:** Treat unlabelled rectangles and bounding outlines as layout containers (`mui-v-stack`, `mui-h-stack`, `mui-grid`, `mui-container`) by default. Do not automatically convert every outlined region into an `mui-card`.
5. **Spatial Layout Inference:** Infer `mui-h-stack`, `mui-v-stack`, `mui-grid`, spacing (`var(--space-*)`), alignment, wrapping, and responsive directions from the spatial relationships between elements.
6. **Preserve Repeated Structures:** Preserve repeated visual patterns as repeated component structures (e.g. repeated slats in `mui-slat-group` or repeated cards in an `mui-grid`).
7. **Safe Fallbacks:** Use a generic Muibook layout component when the intended custom element is ambiguous. Never invent non-existent components, attributes, or CSS classes.
8. **No Hardcoded Canvas Colors:** Treat white/light paper drawing canvas colors, outline colors, or sketch backgrounds purely as visual drawing artifacts—**NEVER** convert them to `var(--white)`, `#ffffff`, `white`, `color: black`, or hardcoded inline background styles. Hardcoding static light/white colors breaks theme adaptation and dark mode.
9. **Prefer Slat over Custom HStack:** For row-like wireframe items with primary content on the left and metadata/status/action on the right, use `mui-slat` (or `mui-slat-group` for repeated rows):
   - If the wireframe row shows a trailing chevron, arrow, or interactive trigger, use `variant="action"` (which automatically applies `col="minmax(0, 1fr) auto"`).
   - For non-interactive data rows, use `variant="row"`. Leave `col` unset unless the trailing content requires asymmetric column tracks (e.g. `col="1fr auto"`).
10. **Use Drawer for Side Navigation & Panels:** When a wireframe shows a sidebar, side menu, collapsible filter panel, or slide-out overlay, use the `mui-drawer` component as the shell region (`open`, `side="left"`, `variant="persistent"`).
    - `mui-drawer` is the root only when it owns the whole shell.
    - When a global top header spans above it, place `mui-header-bar` and `mui-drawer` as siblings in a zero-space `mui-v-stack` root and copy the configured Drawer width to HeaderBar `left-width`.
    - All navigation `mui-button` and `mui-link` items inside Drawer **MUST explicitly set `align="start"`** and `variant="tertiary"` with `slot="before"` icons.
11. **Decisive First Pass:** Produce a reasonable, high-quality first pass without blocking on minor visual ambiguity. Ask for clarification only when uncertainty would materially change the fundamental user workflow or layout hierarchy.

## 2. Common Visual Pattern Translations

### Lists and Rows (Slat & SlatGroup)
- Wireframe shows rows of items (avatar + name on left, status/timestamp/chevron on right):
  ```html
  <mui-slat-group>
    <mui-slat variant="row" col="1fr auto">
      <mui-avatar slot="accessory" label="Alex" size="small"></mui-avatar>
      <mui-v-stack slot="start" space="var(--space-050)">
        <mui-body size="medium" weight="bold">Project Alpha</mui-body>
        <mui-body size="small" variant="secondary">Updated 2h ago</mui-body>
      </mui-v-stack>
      <mui-badge slot="end" variant="positive" text="Active"></mui-badge>
    </mui-slat>
  </mui-slat-group>
  ```

### Card Collections & Grids
- Wireframe shows 2-, 3-, or 4-up cards:
  ```html
  <mui-grid col="repeat(auto-fit, minmax(min(100%, 18rem), 1fr))" space="var(--space-400)">
    <mui-card usage="grid">
      <mui-card-body>
        <mui-heading level="3" size="4">Card Title</mui-heading>
        <mui-body size="medium">Card descriptive content goes here.</mui-body>
      </mui-card-body>
    </mui-card>
  </mui-grid>
  ```

### User Profiles & Avatar Menus
- Wireframe shows user avatar with name/email and dropdown menu:
  ```html
  <mui-dropdown>
    <mui-button slot="action" variant="tertiary">
      <mui-avatar-chip slot="start" label="Jane Doe" secondary="Admin"></mui-avatar-chip>
      <mui-icon-chevron-down slot="end"></mui-icon-chevron-down>
    </mui-button>
    <mui-menu>
      <mui-menu-item>Profile</mui-menu-item>
      <mui-menu-item>Settings</mui-menu-item>
      <mui-menu-item>Log out</mui-menu-item>
    </mui-menu>
  </mui-dropdown>
  ```

## 3. Workflow Checklist

When processing a wireframe:
1. Identify the top-level shell (Standalone page with `mui-container`, or sidebar shell with `mui-drawer` + `mui-header-bar`).
2. Identify grid/row regions and map them to `mui-grid`, `mui-slat-group`, `mui-v-stack`, or `mui-h-stack`.
3. Resolve icons to exact existing `mui-icon-*` tags (or fallback to `mui-icon-rectangle` if no semantic icon exists).
4. Verify that all spacing uses design tokens (e.g. `space="var(--space-400)"`).
5. Ensure zero hardcoded colors or background styles are introduced from visual sketch artifacts.
