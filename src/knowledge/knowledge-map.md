# Muibook Knowledge Map

Use this map as the front door for the Muibook knowledge bundle. The bundle is split into small, intentional surfaces so agents can load the right context without treating every file as the same kind of truth.

## System Parts

- `custom-elements.json`: generated Custom Elements Manifest for public component APIs, attributes, properties, methods, events, slots, CSS custom properties, CSS parts, and component UX documentation.
- `dynamic-attrs.json`: runtime and destination-only structural attributes used by wrappers, builders, canvases, exporters, and integration tools. These attrs are not the public API surface.
- `DESIGN.md`: design language, token architecture, surface usage, theme layers, typography, spacing, radius, and layout guidance.
- `rules.ts`: global rules for generating valid Muibook component trees.
- `keywords.ts`: natural-language routing from user intent to likely components.
- `compositions.ts`: curated component-tree examples for realistic layouts and workflows.
- `resource-index.json`: machine-readable index of the knowledge files and when to use them.
- `skill-index.json`: machine-readable index of authored skill guides.
- `*-skill.md`: portable instruction files for creating, composing, styling, and documenting Web Components.
- `AGENTS.md`: operating guidance for coding agents working in the Muibook source repo.

## Recommended Agent Flow

1. Start with `knowledge-map.md` or the MCP `start_here` tool.
2. Use `find_component` to shortlist components from natural-language intent.
3. Use `lookup_component` before writing markup for a known component.
4. Use `get_rules` before generating component JSON trees.
5. Use `get_compositions` for layout examples and realistic component structure.
6. Use `get_dynamic_attrs` when building wrappers, exporters, canvases, runtime integrations, or destination HTML.
7. Use `get_design_system` and the styling skill for token, surface, and theme work.
8. Use `get_skill_guide` for deeper architecture guidance.

## Important Boundaries

- Do not treat dynamic attrs as normal public props. They are structural integration metadata.
- Do not use story prop panels as the source of truth for public component API. Use component `api.ts`, `doc.ts`, and the generated CEM.
- Do not load the full CEM by default when a compact index or component lookup will answer the question.
- Do not invent token escape hatches. Prefer existing foundation, theme, semantic, and component token layers.
- Do not re-own Web Component behavior inside framework wrappers. Wrappers should pass attributes, events, refs, and host properties through.

## Common Tasks

- Build a Muibook UI: read rules, find components, lookup each component API, then check compositions.
- Review Muibook markup: lookup used components, compare attrs against CEM, then check dynamic attrs for runtime-only leakage.
- Style or theme components: read DESIGN.md, then use style-web-components skill.
- Create a Web Component: use create-web-components skill, CEM expectations, dynamic attrs guidance, and part-map conventions.
- Write UX guidelines: use create-ux-guidelines skill and the component docs shape.
