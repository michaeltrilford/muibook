# Muibook Knowledge

This repo contains the exported Muibook knowledge bundle used by AI coding tools, local LLM flows, and MCP clients.

It is generated from [`@muibook/components`](https://github.com/michaeltrilford/muibook) and published separately so tools can read Muibook context without pulling the whole component source repo into every prompt.

## Contents

- `custom-elements.json` — component API, types, slots, CSS properties, events, and component UX guidance generated from Muibook component docs.
- `dynamic-attrs.json` — runtime and destination-only attributes used when builders or exporters need to recreate Muibook component behavior.
- `rules.ts` — global Muibook component-tree generation rules for AI tools.
- `keywords.ts` — lightweight keyword mappings that help route natural-language intent to Muibook components.
- `compositions.ts` — curated component-tree examples that show realistic Muibook composition patterns.
- `AGENTS.md` — operating guidance for coding agents working with Muibook.
- `DESIGN.md` — Muibook design language, token architecture, and theming guidance.
- `index.ts` — convenience export for the knowledge files.

## Using The Files

Import individual files directly when your tool can consume TypeScript or JSON:

```ts
import manifest from "./custom-elements.json";
import dynamicAttrs from "./dynamic-attrs.json";
import { rules } from "./rules";
import { keywords } from "./keywords";
import { compositions } from "./compositions";
```

Use the CEM for component APIs and UX guidance. Use `dynamic-attrs.json` for destination/runtime structural behavior. Use `rules`, `keywords`, and `compositions` as AI context.

## MCP Server

The knowledge repo can expose these files through an MCP server. This lets Codex, Claude Code, OpenCode, Antigravity, and similar tools query Muibook knowledge on demand instead of stuffing all context into the prompt.

The local MCP server is used over `stdio`.

### OpenCode

Add the server to `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "muibook-knowledge": {
      "type": "local",
      "command": [
        "node",
        "/Users/michaeltrilford/Github/muibook-knowledge/mcp-server.js"
      ],
      "cwd": "/Users/michaeltrilford/Github/muibook-knowledge",
      "enabled": true
    }
  }
}
```

Verify with:

```bash
opencode mcp list
```

### Codex, Claude Code, Antigravity, And Other Stdio MCP Clients

For clients that use the common `mcpServers` shape, point directly at the local server:

```json
{
  "mcpServers": {
    "muibook": {
      "command": "node",
      "args": ["/Users/michaeltrilford/Github/muibook-knowledge/mcp-server.js"],
      "cwd": "/Users/michaeltrilford/Github/muibook-knowledge"
    }
  }
}
```

If the knowledge package is installed globally or exposed through a package binary, clients can use the binary instead:

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

During local development, prefer the absolute local path so the MCP server reads the latest exported files.

## Recommended Tool Usage

- Ask for component API details when generating or reviewing Muibook markup.
- Ask for dynamic attrs when wiring builder/export/runtime behavior.
- Ask for rules before generating Muibook component trees.
- Ask for compositions when you need realistic page, app, or workflow examples.
- Ask for design guidance when making token, theme, layout, or visual decisions.

## Source Of Truth

This repo is an exported knowledge bundle. Component API and UX guidance come from the Muibook source repo and its generated CEM. Do not hand-edit generated exports unless you are intentionally patching the knowledge repo for local experimentation.
