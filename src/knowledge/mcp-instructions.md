# Muibook MCP Instructions

When the Muibook MCP server is available, use it before generating, reviewing, styling, or documenting Muibook component work.

## First Call

Call `start_here` first. It returns the knowledge map, available files, available skill guides, and recommended next tool calls.

## Tool Routing

- Use `find_component` when the user describes intent but does not name a component.
- Use `lookup_component` before writing or reviewing markup for a known component.
- Use `get_rules` before generating component trees.
- Use `get_compositions` when you need realistic layout examples.
- Use `get_dynamic_attrs` for wrappers, builders, canvases, exporters, and destination/runtime attributes.
- Use `get_design_system` for token, surface, layout, typography, and theme decisions.
- Use `list_skill_guides`, `search_skill_guides`, and `get_skill_guide` for deeper task-specific guidance.

## Resource Routing

- Use `muibook://index` for the front door.
- Use `muibook://resources` for the machine-readable resource index.
- Use `muibook://skills` for the skill index.
- Use `muibook://design` for design and token guidance.
- Use `muibook://dynamic-attrs` for runtime/destination attrs.
- Use `muibook://rules` for component-tree generation rules.

## Guardrails

- Treat the CEM as public component API.
- Treat dynamic attrs as integration metadata, not user-facing props.
- Prefer compact indexes before loading large files.
- Keep framework wrappers thin. Do not reimplement component behavior in wrappers.
- Prefer token and part-map surfaces before reaching into shadow DOM internals.
