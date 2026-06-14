# Muibook Knowledge

This directory contains authored Muibook knowledge that can be consumed by tooling, local LLM flows, or a future Codex plugin.

The source files in `src/knowledge` are intentionally small and direct:

- `rules.ts` contains global generation rules.
- `compositions.ts` contains full composition examples and the curated `agentCompositions` subset.
- `keywords.ts` contains full keyword mappings and the curated `agentKeywords` subset.
- `index.ts` exports the combined `knowledge` object.

This directory is not the full knowledge export by itself. The build also exports generated component metadata and root guidance files.

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

Root agent/design guidance is also included in the NPM package:

```txt
@muibook/components/AGENTS.md
@muibook/components/DESIGN.md
```

Keep generated JSON separate from the `knowledge` TS exports until a consuming plugin has a stable final shape for its bundled context.

## Knowledge Repo Export

`npm run build` runs the knowledge copy step and syncs the following files into the sibling `muibook-knowledge` repo:

- `custom-elements.json` from `public/custom-elements.json`
- `dynamic-attrs.json` from `public/dynamic-attrs.json`
- `AGENTS.md` from the repo root
- `DESIGN.md` from the repo root
- `README.md` from this file
- `index.ts` from `src/knowledge/index.ts`
- `rules.ts` from `src/knowledge/rules.ts`
- `compositions.ts` from `src/knowledge/compositions.ts`
- `keywords.ts` from `src/knowledge/keywords.ts`

The split is intentional:

- CEM carries component API and UX docs from component `api.ts` and `doc.ts` files.
- `dynamic-attrs.json` carries runtime/destination structural attributes.
- `AGENTS.md` carries agent operating guidance.
- `DESIGN.md` carries human-readable design language guidance.
- `src/knowledge/*` carries importable rules, keywords, and compositions.

## Agent Output

`src/agent` is generated from this directory and remains the lightweight local LLM compatibility surface.

When adding new composition examples, update `agentCompositionKeys` only if the example should be included in `@muibook/components/agent/prompts`.

When adding new keyword groups, update `agentKeywordKeys` only if the group should be included in `@muibook/components/agent/keywords`.

## MCP Server

The standalone [`muibook-knowledge`](https://github.com/michaeltrilford/muibook-knowledge) repo can expose these files through an MCP server. This is useful when an AI coding tool should query Muibook component APIs, dynamic attributes, rules, keywords, compositions, and design guidance without copying the full content into every prompt.

The server supports two transport modes: **Stdio** (for Antigravity, Claude Code, Claude Desktop) and **SSE/HTTP** (for OpenCode Desktop).

### 1. Stdio Mode (Antigravity, Claude Code, Claude Desktop)

Configure your client to launch the script directly using standard I/O:

```json
{
  "mcpServers": {
    "muibook": {
      "command": "node",
      "args": ["/Users/michaeltrilford/Github/muibook-knowledge/mcp-server.js"]
    }
  }
}
```

If `@muibook/knowledge` is installed as a package, clients can also use the package binary when supported:

```json
{
  "mcpServers": {
    "muibook": {
      "command": "muibook-mcp",
      "args": []
    }
  }
}
```

Prefer the absolute local path during development so the MCP server always reads the latest exported knowledge files from the local `muibook-knowledge` repo.

### 2. SSE Mode (OpenCode Desktop)

Start the server in Server-Sent Events (SSE) mode in your terminal:

```bash
node mcp-server.js --sse --port 22222
```

Then, configure OpenCode Desktop's server connections page:

- **Server Address**: `http://localhost:22222/sse`
- **Server Name**: `Muibook Knowledge`
