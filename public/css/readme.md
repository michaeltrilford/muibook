# Michael UI System — CSS Architecture

## ⚡ Usage Notes

⛔ Don't use brand primitives directly in components.  
✅ Use semantic tokens only.

### Theming Ethos

- Themes should override semantic tokens, not brand primitives.
- Advanced users can also craft or extend the token file,
- For example: Adding a yellow warning alert instead of orange.

### Why Brand is External

- Brand primitives are defined in a separate brand-<name>.css file to keep them independent from semantic tokens.
- This separation aligns with Design Token Module specifications.
- The system can use a JSON source of truth for brand primitives, which is then transformed into CSS via a tool.
- This allows multiple brands to share the same token structure and theme mappings without collisions.

### Brand file

- Use `brand-<name>.css` to define new brands.
- Each brand file should have a unique name
- For example: `brand-coke.css` to avoid collisions when defining brand primitives.

### Tokens file

- Use `tokens.css` to define light/dark or other theme mappings.
- Advanced users can add a `token-<name>.css` file to extend semantic tokens
- For example: New alert colors, without modifying brand primitives.

### Brand vs Semantic Tokens vs Themes

- Brand primitives (`let`) — immutable, define brand identity.
- Semantic tokens (`var`) — map to brand primitives, consumed by components.
- Themes — override semantic tokens only to change appearance without touching brand identity.

### How Overrides Work

- Components read semantic tokens (`var(--token-name)`).
- Changing a theme (light/dark) updates semantic tokens only.
- Brand primitives (`let`) remain constant; they are never changed by themes.

This repository defines the CSS foundation for Michael UI System, including resets, base styles, brand primitives, and semantic tokens. It is designed to support multiple brands and themes (light/dark) while keeping components brand-agnostic.

## FILE OVERVIEW

## 1. Reset (`mui-reset.css`)

- Resets default browser styles.
- Normalizes spacing, font inheritance, list styles, and box-sizing.
- **Goal:** Provide a clean slate for all themes and components.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.5;
  font-family: var(--font-family);
}
```

### 2. Foundation `mui-base.css`

- Defines global layout and typography defaults.
- Sets defaults for body, headings, links, buttons, and form elements.
- Includes utility classes if needed.
- **Goal:** Establish foundational design system behavior.

```css
body {
  font-size: var(--font-size-100);
  color: var(--text-color);
  background: var(--color-bg);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}
```

### 3. Brand Primitives: `mui-brand.css`

- Contains raw brand primitives for a specific brand.
- Includes colors, font scales, radii, spacing, and strokes.
- Uses OKLCH values for perceptual accuracy.
- **Goal:** Define immutable brand identity.

```css
html[data-brand="insert-your-brand"] {
  --font-family: system-ui;
  /* GREY */
  --grey-800: oklch(38.666% 0.00004 271.152);
  /* RED */
  --red-400: oklch(69.42% 0.16807 22.436);
  /* BLUE */
  --blue-500: oklch(75.415% 0.12865 244.876);
}
```

### 4. Semantic & Theme Layer: `mui-tokens.css`

- Maps semantic purposes to brand primitives.
- Handles themes (light/dark) without altering brand primitives.
- Components consume only semantic tokens.
- **Goal:** Separate brand identity from functional usage.

```css
:where(html) {
  --color-bg: var(--white);
  --text-color: var(--grey-900);
  --text-color-error: var(--red-400);
  --surface-elevated: var(--grey-100);
}

html[data-theme="dark"] {
  --color-bg: var(--grey-900);
  --text-color: var(--grey-100);
  --text-color-error: var(--red-200);
}
```
