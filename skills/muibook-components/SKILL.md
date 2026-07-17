---
name: muibook-components
description: Lightweight, generated knowledge of current Muibook Web Components, public attributes, slots, base and semantic tokens, and selected composition examples. Use when Codex needs to create or review Muibook markup or choose valid Muibook components without requiring the Muibook knowledge MCP.
---

# Muibook Components

Use the generated references as a compact snapshot of Muibook 20.2.0.

## Workflow

1. Search [references/components.json](references/components.json) for relevant component names and purposes.
2. Read the matching component records before writing markup. Use only listed public attributes and slots.
3. Use [references/tokens.json](references/tokens.json) when base or semantic token names are needed. Prefer semantic tokens for meaningful UI styling.
4. Read [references/compositions.json](references/compositions.json) when a selected example helps demonstrate how components fit together.
5. If the Muibook MCP is available, use its `start_here` tool for richer or newer guidance. Treat the MCP as authoritative when its version is newer than this snapshot.

## Boundaries

- Do not invent components, attributes, slots, or token names.
- Do not treat internal state or dynamic destination attributes as public props.
- Do not expect component-specific tokens, full UX guidance, styling architecture, or the complete composition library in this lightweight skill; use the Muibook MCP for those needs.
- Keep native custom-element tag names when writing HTML. When another tool maps names such as `Button` to `mui-button`, follow that tool's schema while preserving the verified public props.
