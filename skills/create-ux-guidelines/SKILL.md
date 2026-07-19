---
name: create-ux-guidelines
description: Help make your own UX Guidelines for your design system, providing a common structure for developers and designers.
---

# Create UX Guidelines Skill

Use this skill to write practical component guidelines that help people, design tools, and coding agents use a Web Component system correctly.

<mui-body size="large">
Treat guidelines as the authored layer between component implementation and generated metadata.
- Component source defines behavior.
- API metadata defines public attributes, properties, events, slots, CSS parts, and CSS variables.
- Guidelines provide the structured content for the documentation site.
</mui-body>

Good guidelines are not marketing copy. They are operating instructions for choosing, composing, reviewing, and shipping components.

## Guidelines Structure

Ensure all guidelines conform to a strict, predictable schema.

## Header And Links
Provide clear, concise explanations of what the component is and what it does. Include URLs pointing to the relevant external resources (e.g., design files, component playgrounds, or code repositories).

## Named Slots
When a component exposes named slots, list their exact, case-sensitive names before Usage so people can discover the valid values quickly. Source this list from the component API metadata and omit the default slot. Include a short description such as "Use these names on items slotted inside this component."

## Usage
Outline when and how to use the component. Reserve this for functional rules (e.g., "Reserve buttons for core actions").

## Accessibility
Split accessibility guidance into distinct audiences:
- **Designer:** Guidelines for design-time considerations (e.g., "Never put tooltips on disabled buttons").
- **Engineer:** Guidelines for implementation considerations (e.g., "Ensure buttons are focusable via keyboard navigation", "Use appropriate ARIA roles").

## Anatomy
Name the stable visible structure of a component. Anatomy images should use numbered callouts to identify the important parts of the component. Each number must map to a short written note so a person or agent can understand the guidance without relying on the image alone.

## Variants
Use lightweight images to showcase the different states and variant configurations. Variants should map to real usage differences (e.g., Primary, Secondary, Icon-only).

## Rules
Provide clear Do and Don't rules. Use these to visually compare correct versus incorrect usage and clarify nuanced design constraints.

## Behaviour
Detail interactive states (Hover, Focus, Disabled) and how the component responds to user input.

## Writing
Provide copywriting guidelines specific to the component (e.g., "Keep button text short and action-oriented. Use sentence case.").

## Compositions
Use lightweight images to show realistic component combinations and use cases. Visual examples of slot placement and parent-child context are preferred over dense code snippets.

## Publishing Guideline Assets

Keep guideline assets lightweight and URL-addressable. Anatomy, variant, rule, and composition images should support the written guidance rather than replace it.

A practical structure is:
- Store guideline text, metadata, and image URLs in a CMS or content source.
- Host images through a stable asset service or CDN.
- Expose the same structured content to a website, Figma workflow, or MCP server.
- Keep anatomy images numbered, with each number mapped to a short written explanation.

For a custom build, a headless CMS such as Contentful can hold guideline text, metadata, and image assets for a site like `guides.example.com`. A tool such as `guides.gurusuite.xyz` can provide the website and Figma plugin touchpoints from the same guideline content. For MCP usage, prefer returning structured text plus asset URLs. This lets agents reference the guidance and fetch or display supporting images when the client supports it.

Asset hosting can stay simple. Use the platform that matches the rest of the guideline system:
- Contentful Assets when guideline content and images are managed in a CMS.
- Vercel Blob when a Vercel-hosted site needs public image or media URLs.
- Netlify Blobs when a Netlify-hosted site needs project-native blob storage.
- Cloudflare R2 or another object store when assets should live outside the app host.
- Static repo assets when the system is small and Markdown-first.

Prefer stable, public, cacheable image URLs for guideline assets. Treat images as versioned assets where possible so agents, Figma plugins, MCP servers, and docs sites do not receive stale or broken references.

Third-party documentation tools such as ZeroHeight or Figma can also host guideline content. Use them when they fit the team's workflow, but keep a portable source of truth when agents, websites, or design tools all need access to the same guideline data.

## Related Resources
List related component links to help users find alternatives.
