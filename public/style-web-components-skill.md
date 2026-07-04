---
name: style-web-components-skill
description: Add themes and targeted visual overrides to Web Components using layered CSS variables, parts, classes, and HTML attributes.
---

# Style Web Components Skill

Use this skill to style components and manage themes without touching component source code. This system relies on a layered CSS variable architecture, HTML data attributes, scoped classes, intentional parts, and multi-brand design tokens.

<mui-body size="large">
Style components externally via a predictable, cascading theme layer.
- Components should provide structural CSS and logical defaults internally.
- Visual choices (colors, spacing, typography) must be driven by external CSS variables.
- Targeted adjustments should use a class, host selector, or `::part(...)` before changing component source.
- Hardcoded design decisions inside component logic are anti-patterns unless they are true accessibility or native-control requirements.
</mui-body>

Control the look and feel by overriding CSS variables at the document, brand, theme, page, component instance, or part level.

## Token Architecture

Design tokens are generated using Style Dictionary and organized into three tiers:

1. **Brand Primitives:** Core tokens (colors, fonts, spacing).
2. **Semantic/Theme Tokens:** Light and dark mode role decisions such as surfaces, text, border, feedback, form, action, and categorical color.
3. **Component Tokens:** Component-specific mappings such as button backgrounds, input surfaces, drawer backgrounds, card borders, and media overlays.

Prefer this flow:

```text
brand primitive -> semantic/theme role -> component token -> local component variable -> rendered style
```

Do not use base colors directly in component overrides unless you are building or mapping a brand/theme layer. Normal component styling should consume semantic or component variables so light and dark mode keep their intended meaning.

## Base Theme Structure

The default theme is built into four specific layers within the CSS foundation (e.g., `mui-tokens.css`). This structure must be maintained to ensure proper cascade:

1. **Brand Primitives:** (`:where(html)`) Define the raw values.
2. **Light Mode:** (`html[data-theme='light']`) Map the primitives to light mode semantic tokens.
3. **Dark Mode:** (`html[data-theme='dark']`) Map high-contrast primitives to dark mode semantic tokens.
4. **Set the Foundation:** (`:where(html)`) Map the component tokens to the semantic tokens.

Switching between light and dark mode is done simply by toggling the `data-theme` attribute on the HTML element.

Surface tokens are especially important. The base `--surface` represents the app or HTML page level. Elevated surfaces (`--surface-elevated-*`) move forward, while recessed surfaces (`--surface-recessed-*`) move backwards. Use surface tokens mainly for components that sit flush with the background (e.g., cards, slats). Avoid applying surface tokens to every element; instead, let typography color contrast be driven by themes and brand ranges. Do not replace them with raw greys in component or page CSS unless you are defining the theme mapping itself.

## Multi-Brand Theming

The architecture supports multiple distinct brands (e.g., Paperclip, JAL, ANA, Sensei) running on the same component library.
- You must first have a complete Base Theme.
- Each brand extends and overrides the base theme using the `data-brand="your-brand"` attribute.
- **Only override what you need:** You do not need to redefine the entire token list. Only copy and update the tokens whose values differ from the base theme; everything else falls back to the foundational base theme.

## Targeted Overrides

Use the smallest override surface that matches the intent.

- For a whole brand: override variables under `html[data-brand="..."]`.
- For light or dark mode: override semantic/theme variables under `html[data-theme="light"]` or `html[data-theme="dark"]`.
- For a product shell or page area: add a scoped class and set component variables there.
- For one component instance: add a class to that instance and set the local component variable there.
- For one exposed internal styling capability: use `::part(...)`.

Example of a scoped product shell override:

```html
<mui-drawer class="storefront-drawer"></mui-drawer>
```

```css
.storefront-drawer {
  --drawer-background: var(--app-navbar-surface);
}
```

This keeps the override on the intended instance instead of leaking through inherited custom properties to unrelated drawers, stories, or nested components.

Example of a part override:

```css
.compact-action mui-button::part(padding) {
  padding-inline: var(--space-200);
}
```

Use parts when the component has intentionally exposed a styling capability. Use classes and variables when the adjustment is about a specific instance, region, theme, or product shell.

## Adding Theme Surface

When adding a new theme or visual mode:

- Start by mapping brand primitives into the semantic/theme layer.
- Define light and dark surface relationships first: page surface, elevated surfaces, recessed surfaces, text, border, and focus.
- Map component tokens to semantic/theme roles before adding new component variables.
- Add component tokens only when a component has a repeated internal decision or a real public customization point.
- Keep primitive brand files pure; do not add semantic, theme, or component decisions to brand primitives.
- Test overrides in nested stories and product shells to catch inherited variable leaks.

## Override Review

Before shipping a styling change:

- Does this belong at brand, semantic/theme, component token, page class, instance class, or part level?
- Is the override light/dark safe?
- Is it using surface, text, border, form, action, or component variables instead of raw base colors?
- Will the custom property inherit into unrelated slotted content or nested stories?
- Is a class-scoped variable enough, or does the component need a real public token?
- Is `::part(...)` being used only for intentionally exposed styling capabilities?
