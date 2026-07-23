# AGENTS.md — Muibook (@muibook/components)

This repo builds the Muibook component library: framework-agnostic, accessible Web Components for the Mui (MichaelUI) Design System, plus supporting docs/builds.

## MCP Usage

- When working in this repo and the Muibook MCP is available, call its `start_here` tool before answering questions or doing work about Muibook components, markup, styling, wrappers, dynamic attrs, knowledge, skills, or component documentation.

## Quick Context

- Package: `@muibook/components`
- Components live in `src/components/*`
- Central exports: `src/index.ts`
- Demo site: `src/muibook/index.ts`
- Build outputs: `dist/` (published)
- Generated component metadata: `public/custom-elements.json`
- Runtime/destination attrs: `public/dynamic-attrs.json`
- Authored knowledge: `src/knowledge/*`
- Knowledge export targets: sibling repos `../muibook-knowledge` and `../RedactdCanvas/plugins/assets/muibook-knowledge`

## Common Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run build:muibook` — docs build
- `npm run preview:muibook` — preview docs build
- `npm run build:create-mui-app` — scaffold build
- `npm run preview:create-mui-app` — preview scaffold build
- `npm run token-build` — Style Dictionary tokens
- `npm run cem` — generate `public/custom-elements.json`
- `npm run copy-knowledge` — copy CEM, dynamic attrs, root docs, and `src/knowledge/*` into `../muibook-knowledge`
- `npm run copy-knowledge:redactd-canvas` — copy the Redactd-specific CEM, dynamic attrs, design, rules, keywords, and compositions subset into `../RedactdCanvas/plugins/assets/muibook-knowledge`

## Adding A New Component

1. Add entry to `vite.config.ts` so it’s bundled.
2. Add export to `package.json` `exports` (and `files` if used).
3. Export from `src/index.ts`.
4. If needed for demos, import into `src/muibook/index.ts`.

## Slot Styling Pattern

When a component uses slots:

- Child: add class `[parent-component]-slot` to slotted element.
- Slotted child styles itself with `:host(.parent-component-slot)` (or matching class).
- Parent: if it needs to react to a slotted child, add `has-[slottedName]` to host.
- Parent styles with `:host([has-slottedName])`.

## Notes For Agents

- If the user states something is wrong, give a short sense check before editing. If they explicitly ask for a fix, proceed after that short acknowledgement.
- Prefer touching source under `src/`; `dist/` is generated.
- Keep changes small and aligned with existing component patterns.
- If unsure about behavior, search for sibling components in `src/components/` for examples.
- When using `mui-code` inside body copy or list text, add the `inline` attr; otherwise it renders as a block code surface.
- Keep `AGENTS.md` and `DESIGN.md` at the repo root. They are copied to the knowledge repo for agent/plugin context.
- Keep `src/knowledge` for authored knowledge sources: global rules, keyword mappings, composition examples, skill files, and MCP/front-door docs.
- In `public/CHANGELOG.md`, use `_Status: Upcoming_` for the active next version section and `_Status: Released_` for published package sections.
- Component API and UX guidance should live in component `api.ts` and `doc.ts` files so the CEM stays current.
- Story props panels are often defined locally in the Muibook story page via `propItems` arrays. Do not add or reshape component `doc.ts` files just to populate a props panel unless the user explicitly wants that information added to the docs/CEM layer too.
- Treat `dynamic-attrs.json` as a separate concern from story props. It documents destination/runtime structural attrs (often destination-only) for builder/runtime integration and should not be merged conceptually with the story `propItems` API surface.
- When documenting dynamic attrs, prefer destination-only output: list where the attrs appear, not where they originate, unless the user explicitly asks for the source relationship.
- Avoid persisting internal runtime state as public attributes (for example `multi-line`, `has-*`, or similar UI state flags).
- Prefer CSS-first layout behavior over JS-driven state attrs when a stable visual result can be achieved without runtime attribute toggling.
- Exported/component-consumed HTML should only include public API attrs; strip internal runtime attrs in export paths.
- Do not add token escape hatches by default. Use existing semantic or component tokens unless there is a clear public customization need.
- Do not add semantic, theme, or component tokens to the brand token JSON/source. Brand tokens are primitives only. Put semantic aliases, theme mappings, and component-level decisions in the semantic/theme/component token layer instead.
- Do not add generated files by hand unless the build or copy script intentionally owns that output.
