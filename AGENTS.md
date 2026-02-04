# AGENTS.md — Muibook (@muibook/components)

This repo builds the Muibook component library: framework-agnostic, accessible Web Components for the Mui (MichaelUI) Design System, plus supporting docs/builds.

## Quick Context

- Package: `@muibook/components`
- Components live in `src/components/*`
- Central exports: `src/index.ts`
- Demo site: `src/muibook/index.ts`
- Build outputs: `dist/` (published)

## Common Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run build:muibook` — docs build
- `npm run preview:muibook` — preview docs build
- `npm run build:create-mui-app` — scaffold build
- `npm run preview:create-mui-app` — preview scaffold build
- `npm run token-build` — Style Dictionary tokens

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

- Always confirm with the user before making any file changes, even if they seem small or within scope.
- Prefer touching source under `src/`; `dist/` is generated.
- Keep changes small and aligned with existing component patterns.
- If unsure about behavior, search for sibling components in `src/components/` for examples.
