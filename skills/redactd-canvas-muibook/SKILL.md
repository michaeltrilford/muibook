---
name: redactd-canvas-muibook
description: Create Muibook UI on an active Redactd canvas. Uses bundled Muibook component knowledge in assets/muibook-knowledge/ to generate valid Redactd JSON trees and send them directly to redactd.xyz.
---

<!-- DO NOT EDIT MANUALLY IN DOWNSTREAM REPOSITORIES -->
<!-- This file is auto-synchronized from the muibook repository. -->
<!-- Source of truth: github.com/michaeltrilford/muibook (skills/redactd-canvas-muibook/SKILL.md) -->

# Redactd Canvas: Muibook

Use this skill when asked to create, add, send, or modify Muibook UI on a Redactd canvas.

## 1. Knowledge Source & Muibook Handoff

Before building any tree, choose and inspect the active Muibook knowledge source:

1. **Bundled Plugin Knowledge Assets (PRIMARY):** When running in or alongside the Redactd Canvas plugin, inspect the local asset files in `assets/muibook-knowledge/` (specifically `assets/muibook-knowledge/skills/muibook-components/SKILL.md`, `custom-elements.json`, `compositions.ts`, `json-rules.ts`, and `DESIGN.md`). Use these files directly for comprehensive component, attribute, slot, token, and composition knowledge.
2. **Lightweight Skill Pair:** When using this skill standalone outside the plugin repository, prefer the installed `muibook-components` skill for component, public attribute, slot, token, and composition references.
3. **Muibook MCP & Redactd API Tools:** If the working Muibook Knowledge MCP is available, call its `start_here` tool and use its rules, compositions, component lookup, and dynamic attrs as needed. In the full plugin, if `get_redactd_component_knowledge` is available, call it with `format: "summary"`. Treat a newer MCP or API version as authoritative over static local files.
4. **Independent Core (Last-resort fallback):** If operating standalone without access to `assets/muibook-knowledge/`, `muibook-components`, or active MCP/API tools, use the compact Independent Core section below for basic layouts.

### Muibook Tag & Prop Conversion Rules

For native Muibook components and compositions:

- Remove `mui-` and convert kebab-case to PascalCase: `mui-card-body` becomes `CardBody`.
- Convert `mui-icon-name` to `_Icon` with `props.icon: "mui-icon-name"`.
- Convert `mui-illustration-name` to `_Illustration` with `props.illustration: "mui-illustration-name"`.
- Put rendered text in `props.text` for `Heading`, `Body`, `Button`, `Link`, `Badge`, `Status`, `Chip`, `TabItem`, and `ListItem`.
- Move native `slot="name"` to `props.slot: "name"`.
- Preserve documented props and token values. Do not blindly copy internal or dynamic attributes.

## 2. Mandatory Layout & App Shell Rules

- **Mandatory First-Pass App Shell Rule:** Whenever a wireframe or prompt contains a sidebar navigation menu or side panel, **THE ROOT NODE OF THE JSON TREE MUST BE `Drawer`** (`props: { "open": true, "side": "left", "variant": "persistent", "width": "260px" }`).
  - **NEVER** use `Container`, `Card`, `HStack`, or `VStack` as the root node when a sidebar exists.
  - The sidebar navigation items belong in `Drawer`'s primary slot (unslotted `VStack` of `Button`/`Link` items with `variant="tertiary"`, **`align="start"`**, and `slot="before"` `_Icon` items). All navigation buttons inside `Drawer` **MUST explicitly set `align: "start"`**.
  - The main page content **MUST** be wrapped in a direct child `Div` with `props: { "slot": "page" }`.
- **No Hardcoded White/Light Surface Colors:** NEVER output `var(--white)`, `style: "background: white"`, `#ffffff`, or `color: black` based on visual wireframe image backgrounds or drawing artifacts. All component surface and text styling must be driven by Redactd component variants (`variant: "primary"`, `variant: "secondary"`, `variant: "tertiary"`, etc.) and semantic design tokens so layouts adapt seamlessly to both light and dark mode.
- **Slat vs. HStack Rule:** Prefer `SlatGroup` (`props.usage: "card"`) and `Slat` (`props.variant: "row"`, `props.col: "1fr auto"`) over ad hoc `HStack` for row-like items with primary content on the left (`slot="start"`) and secondary metadata, timestamp, badge, or action on the right (`slot="end"`). Always set `variant="row"` (or `"header"` / `"action"`) explicitly on `Slat`.

## 3. Redactd Tree Contract

Build one root JSON object. Every node must contain all four fields:

```json
{
  "id": "unique_descriptive_id",
  "type": "ComponentType",
  "props": {},
  "children": []
}
```

- `id` must be a unique, descriptive string across the entire tree.
- `type` is a Redactd PascalCase component name such as `Container`, `CardBody`, or `Button`.
- `props` contains component content, public props, and slot placement (`props.slot`).
- `children` is always an array, including on leaf nodes.
- Put slot placement in `props.slot`. Do not add `slot` beside `id`, `type`, or `props`.

Minimal valid tree:

```json
{
  "id": "welcome_container",
  "type": "Container",
  "props": {
    "center": true,
    "size": "medium"
  },
  "children": [
    {
      "id": "welcome_card",
      "type": "Card",
      "props": {},
      "children": [
        {
          "id": "welcome_card_body",
          "type": "CardBody",
          "props": {},
          "children": [
            {
              "id": "welcome_content",
              "type": "VStack",
              "props": {
                "space": "var(--space-400)",
                "alignX": "stretch"
              },
              "children": [
                {
                  "id": "welcome_title",
                  "type": "Heading",
                  "props": {
                    "text": "Welcome",
                    "level": "2",
                    "size": "3"
                  },
                  "children": []
                },
                {
                  "id": "welcome_copy",
                  "type": "Body",
                  "props": {
                    "text": "Start building with Muibook components.",
                    "variant": "secondary"
                  },
                  "children": []
                },
                {
                  "id": "welcome_action",
                  "type": "Button",
                  "props": {
                    "text": "Continue",
                    "variant": "primary"
                  },
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## 4. Shared Workflow & API Auth

1. **STEP 0 - MANDATORY PRE-CHECK FOR API KEY**:  
   Before building any component tree, before generating any JSON, before writing any scratch files, and before generating any response output:  
   Check if `REDACTD_API_KEY` is present in `process.env` or if an API key was provided in the prompt/conversation context.  
   **If NO API KEY IS PRESENT, STOP IMMEDIATELY.** Do NOT generate any JSON tree. Do NOT write any scratch files. Ask the user for their Redactd API Key as your entire initial response and wait for their reply.
2. Select and inspect the knowledge source using Knowledge Source above (`assets/muibook-knowledge/`).
3. Build and validate a Redactd component tree against the Redactd Tree Contract.
4. **Primary Automated Transport**: Call `create_redactd_recipe` via the API tool with the `apiKey` to send the UI tree directly to Redactd and return the one-time `canvas_url`. Do NOT instruct the user to manually copy/paste JSON files.

### API Auth Details

- **STOP AND ASK AT THE START**: If no API key is set in `REDACTD_API_KEY` or passed in the conversation, **STOP AND ASK THE USER FOR THEIR REDACTD API KEY IMMEDIATELY AS YOUR VERY FIRST STEP** before building any JSON or running any scripts.
- Tell the user they can find it in Redactd at **Profile > Settings** or **Team Settings > Account Settings > API Key**.
- For automated or local development use, setting `REDACTD_API_KEY` in the shell environment (`export REDACTD_API_KEY="rdx_..."`) is supported to bypass all prompts.

## 5. Independent Core (Fallback Only)

When operating standalone without access to `assets/muibook-knowledge/`, `muibook-components`, or an active MCP server, use this compact core for basic layouts:

- `Container`: `center`, `size`, `style`.
- `Card` with a direct `CardBody` child; `CardBody`: `size`, `style`.
- `VStack`, `HStack`: `space`, `padding`, `alignX`, `alignY`, `width`, `height`, `style`, `slot`.
- `Grid`: `col`, `space`, `padding`, `alignX`, `alignY`, `style`, `slot`.
- `Heading`: `text`, `size`, `level`; `Body`: `text`, `size`, `weight`, `variant`.
- `Button`: `text`, `variant`, `size`, `aria-label`; `Link`: `text`, `href`, `variant`, `size`.
- `Field`: `label`, `variant`, `message`, `size`; `Input`: `label`, `type`, `placeholder`, `name`, `value`, `size`.
- `Badge`: `text`, `variant`, `size`; `_Icon`: `icon`, `size`, `color`, `slot`.

## 6. Wireframe Interpretation

When a wireframe image is provided:

1. Read it as a description of intent, hierarchy, and approximate layout rather than a pixel-perfect specification.
2. Use visible labels and control patterns to identify likely UI concepts, then resolve them through the Muibook keyword mappings.
3. Verify inferred components, public attributes, and slots against `assets/muibook-knowledge/` (or `muibook-components` skill) before generating the Redactd JSON tree.
4. Treat unlabelled rectangles as layout regions by default. Do not automatically convert every outlined region into a Card.
5. Infer H Stack, V Stack, Grid, spacing, alignment, wrapping, and responsive direction from the spatial relationships between elements.
6. Preserve repeated visual patterns as repeated component structures.
7. Use a generic Muibook layout component when the intended component is ambiguous. Do not invent components or attributes.
8. **No Hardcoded Canvas Colors or Tokens:** Treat white/light paper drawing canvas colors, outline colors, or sketch backgrounds purely as visual drawing artifacts—**NEVER** convert them to `var(--white)`, `#ffffff`, `white`, `color: black`, or hardcoded inline background styles. Hardcoding static white or light colors breaks Redactd's theme adaptation and dark mode.
9. **Prefer Slat over Custom HStack:** For row-like wireframe items with primary text/label on the left and secondary metadata, status, timestamp, badge, count, or action button on the right, use `Slat` (or `SlatGroup` for repeated rows) with `slot="start"` and `slot="end"` instead of building an ad-hoc `HStack`. Always explicitly set `variant="row"` (or `"header"` / `"action"`) on `Slat`.
10. **Use Drawer for Side Navigation & Panels:** When a wireframe or prompt shows a sidebar, side menu, collapsible filter panel, or slide-out overlay, use the `Drawer` component as root (`open: true`, `side: "left"`, `variant: "persistent"`). All navigation `Button` and `Link` items inside `Drawer` **MUST explicitly set `align: "start"`** and `variant: "tertiary"` with `slot="before"` icons.
11. Produce a reasonable first pass without blocking on minor ambiguity. Ask for clarification only when uncertainty would materially change the workflow or component hierarchy.

## 7. Muibook Chart Data

When a prompt asks for a populated Muibook chart, include its structured dataset in the Redactd tree.

- `FinancialChart.props.data`: `[{ time, open, high, low, close, volume? }]`
- `MarketSparkline.props.data`: `[{ time, value }]`
- `FinancialBarChart.props.data`: `[{ time, value }]`
- `ComparisonChart.props.series`: `[{ id, label, color?, data: [{ time, value }] }]`

Keep datasets as structured JSON arrays. Do not stringify them or generate JavaScript assignment code. Use numeric values, order points chronologically, and use ISO `YYYY-MM-DD` dates for daily illustrative data unless the user supplies another valid time format.

## 8. Tree Rules

- Use only component types and props from the selected Muibook knowledge source.
- Never invent Redactd component names, aliases, props, CSS tokens, or Material UI names.
- **Rule 27 (Mandatory CSS Units)**: All length props (`height`, `width`, `min-height`, `gap`, `padding`, `space`) MUST include valid CSS units (e.g. `"240px"`, `"320px"`, `"100%"`). NEVER output bare numeric strings like `"240"` or `"320"`.
- **Rule 28 (Slat & SlatGroup Rows)**: Prefer `SlatGroup` (`props.usage: "card"`) and `Slat` (`props.variant: "row"`, `props.col: "1fr auto"`) over ad hoc `HStack` for row-like wireframe items with primary content on the left (`slot="start"`) and secondary metadata, timestamp, badge, or action on the right (`slot="end"`).
- **Drawer Shell Layout**: When a wireframe or prompt requests a sidebar navigation app shell, use `Drawer` as the root shell (`variant: "persistent"` or `"push"`, `open: true`, `side: "left"`), and wrap all main page content in a `Div` with `props.slot: "page"`.
- Root additions should usually use `Container` with `center: true` and `size: "medium"` unless the user asks for a fragment or a `Drawer` app shell.
- Card content must be inside a direct child `CardBody`.
- Button and Link text belongs on the component props, not inside a child `Body`.
- Use documented spacing tokens such as `var(--space-300)` rather than raw token numbers.
- Layout spacing props such as `space` and `padding` must use complete CSS token references such as `var(--space-400)`. Do not use `space-400`, `400`, or another bare scale value; use `var(--space-000)` for zero spacing.
- For equal Grid columns, use `col: "repeat(N, minmax(0, 1fr))"`. Do not pass a numeric count or repeated bare tracks such as `1fr 1fr 1fr`.
- Prefer `Responsive` with `variant: "container"` for reusable components and compositions.
- **No Hardcoded White/Light Surface Colors:** NEVER output `var(--white)`, `style: "background: white"`, `#ffffff`, or `color: black` based on visual wireframe image backgrounds. All component surface and text styling must be driven by Redactd component variants (`variant: "primary"`, `variant: "secondary"`, `variant: "tertiary"`, etc.) and semantic design tokens so layouts adapt seamlessly to both light and dark mode.
- Avoid `Message` for inline helper text, form help, mid-content notes, or routine status copy. Reserve `Message` for persistent page-level notices.

## 9. Response

- API workflow with `ok: true`: summarize what was added and include `canvas_url`.
- API workflow with `ok: false`: show the returned `error` and `request_id`.

