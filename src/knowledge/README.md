# Muibook Knowledge

This directory contains authored Muibook knowledge that can be consumed by tooling, local LLM flows, or a future Codex plugin.

The source files are intentionally small and direct:

- `rules.ts` contains global generation rules.
- `compositions.ts` contains full composition examples and the curated `agentCompositions` subset.
- `keywords.ts` contains full keyword mappings and the curated `agentKeywords` subset.
- `index.ts` exports the combined `knowledge` object.

## Package Exports

After `npm run build`, consumers can import:

```ts
import { knowledge } from "@muibook/components/knowledge";
import { rules } from "@muibook/components/knowledge/rules";
import { compositions, agentCompositions } from "@muibook/components/knowledge/compositions";
import { keywords, agentKeywords } from "@muibook/components/knowledge/keywords";
```

Generated API metadata is exported separately:

```txt
@muibook/components/custom-elements.json
@muibook/components/dynamic-attrs.json
```

Keep those JSON files separate from `knowledge` until a consuming plugin has a stable final shape for its bundled context.

## Agent Output

`src/agent` is generated from this directory and remains the lightweight local LLM compatibility surface.

When adding new composition examples, update `agentCompositionKeys` only if the example should be included in `@muibook/components/agent/prompts`.

When adding new keyword groups, update `agentKeywordKeys` only if the group should be included in `@muibook/components/agent/keywords`.
