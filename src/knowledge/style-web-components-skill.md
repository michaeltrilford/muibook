---
name: style-web-components-skill
description: Add your own theme to Muibook components using CSS variables and HTML attributes.
---

# Style Web Components Skill

Use this skill to style components and manage themes without touching component source code. This system relies on a strictly layered CSS variable architecture, HTML data attributes, and multi-brand design tokens.

<mui-body size="large">
Style components externally via a predictable, cascading theme layer.
- Components should provide structural CSS and logical defaults internally.
- Visual choices (colors, spacing, typography) must be driven by external CSS variables.
- Hardcoded design decisions inside component logic are anti-patterns.
</mui-body> You control the look and feel by overriding these variables at the document level using `data-theme` and `data-brand` attributes.

## Token Architecture

Design tokens are generated using Style Dictionary and organized into three tiers:
1. **Brand Primitives:** Core tokens (colors, fonts, spacing).
2. **Semantic Tokens:** Meaningful aliases (e.g., `surface-elevated`, `text-primary`).
3. **Component Tokens:** Component-specific mappings (e.g., `button-primary-background`).

## Base Theme Structure

The default theme is built into four specific layers within the CSS foundation (e.g., `mui-tokens.css`). This structure must be maintained to ensure proper cascade:

1. **Brand Primitives:** (`:where(html)`) Define the raw values.
2. **Light Mode:** (`html[data-theme='light']`) Map the primitives to light mode semantic tokens.
3. **Dark Mode:** (`html[data-theme='dark']`) Map high-contrast primitives to dark mode semantic tokens.
4. **Set the Foundation:** (`:where(html)`) Map the component tokens to the semantic tokens.

Switching between light and dark mode is done simply by toggling the `data-theme` attribute on the HTML element.

## Multi-Brand Theming

The architecture supports multiple distinct brands (e.g., Paperclip, JAL, ANA, Sensei) running on the same component library.
- You must first have a complete Base Theme.
- Each brand extends and overrides the base theme using the `data-brand="your-brand"` attribute.
- **Only override what you need:** You do not need to redefine the entire token list. Only copy and update the tokens whose values differ from the base theme; everything else falls back to the foundational base theme.

## Overrides

When you need to adjust a component for a specific brand context:
- Override the value at the `html[data-brand="..."]` level.
- Do not add token escape hatches by default in the component. Use existing semantic or component tokens unless there is a clear public customization need.
- Keep Brand Primitives pure. Put semantic aliases, theme mappings, and component-level decisions in the semantic or component token layer instead.
