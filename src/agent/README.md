# Muibook Agent Context

This directory contains lightweight Muibook context for local or embedded LLM usage.

These files are intentionally optimized for smaller context windows, such as the internal Redactd LLM flow or similar apps where API limits matter and user prompts need most of the available space.

The source content lives in `src/knowledge`:

- `src/knowledge/json-rules.ts` contains global generation rules.
- `src/knowledge/compositions.ts` contains composition examples and selects which examples are included in the lightweight agent prompt.
- `src/knowledge/keywords.ts` contains keyword mappings and selects which keyword groups are included in the lightweight agent keyword export.

The files in this directory are generated compatibility entry points:

- `prompts/index.ts` builds the compact prompt payload from rules and compositions.
- `keywords/index.ts` re-exports the optimized keyword map.

Run `npm run build:agent` after updating `src/knowledge` so the local agent entry points stay in sync.

If `src/knowledge/compositions.ts` grows, update `agentCompositionKeys` in the same file to control which examples are included in `prompts/index.ts`.

If `src/knowledge/keywords.ts` grows, update `agentKeywordKeys` in the same file to control which keyword groups are included in `keywords/index.ts`.

This is separate from a fuller Muibook Codex plugin or knowledge-base output, which can include richer API, CEM, rules, dynamic attributes, and composition data.
