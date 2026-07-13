# Muibook Knowledge

This repo contains the exported Muibook knowledge bundle used by AI coding tools, local LLM flows, and MCP clients.

It is generated from [`@muibook/components`](https://github.com/michaeltrilford/muibook) and published separately at [`michaeltrilford/muibook-knowledge`](https://github.com/michaeltrilford/muibook-knowledge) so tools can read Muibook context without pulling the whole component source repo into every prompt.

## Agent Setup

After installing the Muibook knowledge MCP in a project that uses Muibook components, add an instruction like this to that project's `AGENTS.md` or equivalent agent guidance file:

```md
When the Muibook MCP is available, call its `start_here` tool before answering questions or doing work about Muibook components, markup, styling, wrappers, dynamic attrs, knowledge, skills, or component documentation.
```

This helps clients such as Codex, Antigravity, Claude Code, and OpenCode choose the Muibook MCP without you having to repeatedly say "use the MCP" in each prompt. The client still controls whether tools are called automatically, but this gives the agent a clear project-level instruction.

## Contents

- `custom-elements.json` — component API, types, slots, CSS properties, events, and component UX guidance generated from Muibook component docs.
- `dynamic-attrs.json` — runtime and destination-only attributes used when builders or exporters need to recreate Muibook component behavior.
- `resource-index.json` — machine-readable index of the knowledge bundle and when to use each file.
- `skill-index.json` — machine-readable index of authored skill guides.
- `knowledge-map.md` — the recommended front door for agents and humans exploring the bundle.
- `mcp-instructions.md` — short MCP routing instructions for agent clients.
- `rules.ts` — global Muibook component-tree generation rules for AI tools.
- `keywords.ts` — lightweight keyword mappings that help route natural-language intent to Muibook components.
- `compositions.ts` — curated component-tree examples and composition-story metadata that show realistic Muibook patterns.
- `create-web-components-skill.md` — public skill guide for building and reviewing native Web Components with this architecture.
- `compose-web-components-skill.md` — public skill guide for composing Muibook components into complete interfaces.
- `style-web-components-skill.md` — public skill guide for theming Muibook components with tokens and CSS variables.
- `create-ux-guidelines-skill.md` — public skill guide for writing and reviewing component UX guidelines.
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

Component `doc.ts` files also provide reusable story metadata through ordered `stories.items` records. Documentation renderers should consume those records from the generated CEM for story titles, descriptions, usage guidance, and navigation. Muibook maps them onto its local story cards and quicklinks; Storybook-style experiences can map the same records onto their own docs blocks. Runtime markup, imported assets, and interaction logic remain local to each renderer. Do not embed duplicate metadata fallbacks; show a rebuild-oriented empty state when the CEM is stale or missing the story records.

Composition pages are the exception to the CEM flow because they do not belong to one component. Their reusable page and story guidance lives in `compositionStories` within `compositions.ts`, alongside the curated component trees and `compositionConfig`. Muibook composition stories import that metadata directly, while their renderer-specific markup and interaction logic remain local. If composition metadata is missing, show a source-oriented empty state that points to `src/knowledge/compositions.ts`; do not instruct users to rebuild the CEM.

Start with `knowledge-map.md` when exploring the bundle. Use `resource-index.json` and `skill-index.json` as compact routing indexes, then use MCP tools such as `find_component` and `lookup_component` before loading larger files such as `custom-elements.json`.

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

- Start with the MCP `start_here` tool when it is available.
- Ask for component API details when generating or reviewing Muibook markup.
- Ask for dynamic attrs when wiring builder/export/runtime behavior.
- Ask for rules before generating Muibook component trees.
- Ask for compositions when you need realistic page, app, or workflow examples.
- Ask for design guidance when making token, theme, layout, or visual decisions.
- Ask for skill guides when you need authored guidance on creating, composing, styling, or documenting Web Components.

## Source Of Truth

This repo is an exported knowledge bundle. Component API and UX guidance come from the Muibook source repo and its generated CEM. Do not hand-edit generated exports unless you are intentionally patching the knowledge repo for local experimentation.
