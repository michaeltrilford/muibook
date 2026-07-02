---
name: web-component-skill
description: Build and review native Web Components using a portable architecture: shadow-contained styles, token-first CSS variables, part maps, slot composition, destination/runtime dynamic attrs, component API metadata, documentation guidance, and lightweight framework wrappers. Use when creating custom elements, reviewing component architecture, writing wrappers, or adapting these patterns to a design system.
---

# Web Component Skill

Use this skill to build native Web Components with a framework-agnostic architecture: explicit APIs, contained styles, accessible native semantics, token-led theming, structured metadata, and composition behavior that can be understood by humans and AI tools.

## Component Anatomy

Build each component as a custom element that owns its rendered contract.

- Extend `HTMLElement`.
- Declare `observedAttributes` for public attributes and any internal runtime attrs the component must react to.
- Attach an open shadow root in the constructor.
- Render native elements inside shadow DOM where possible, such as `button`, `a`, `input`, `dialog`, or semantic layout elements.
- Set sensible defaults in `connectedCallback`, then render or sync state.
- Use `attributeChangedCallback` for targeted DOM updates when an attribute changes after render.
- Forward imperative methods such as `focus()` to the internal native control when the host represents an interactive element.
- Keep rendering deterministic: attributes and slotted content should fully explain the component's visual state.

Prefer native browser behavior before custom JavaScript. Add JavaScript for state sync, accessibility, slot inspection, and controlled behavior, not for layout that CSS can handle.

## Public API Discipline

Keep the component's public surface small, documented, and stable.

- Document public attributes, properties, slots, events, CSS parts, and CSS custom properties in the component `api.ts`.
- Put UX guidance, accessibility guidance, variants, anatomy, related links, and usage rules in `doc.ts`.
- Do not add story-only prop panels to `doc.ts` unless that guidance should become part of the generated manifest.
- Treat `custom-elements.json` as the machine-readable API output generated from the component source and docs.
- Use boolean attributes for boolean host state and string attributes for selected variants, sizes, and modes.
- Use clear defaults in code and in metadata.
- Do not expose internal runtime attrs as public API.
- Exported or builder-consumed HTML should include only public API attrs.

When a component needs a behavior that is only relevant to an exporter, builder, or destination component, document it as a dynamic attr instead of mixing it into the public API.

## Styling Model

Use contained component styles first and token-led customization second.

- Put component implementation styles inside the shadow root.
- Style the host with `:host`, host attributes, named slots, and internal parts.
- Consume semantic and component CSS variables before adding new variables.
- Do not add token escape hatches by default.
- Do not add semantic, theme, or component tokens to primitive brand token sources.
- Use component tokens for repeated component decisions and semantic tokens for meaning.
- Preserve light and dark theme meaning rather than hardcoding one-off colors.
- Use CSS-first layout behavior when stable results can be achieved without runtime attributes.

Good component styling is predictable, contained, theme-aware, and overrideable only through intentional surfaces.

## Part Maps

Use part maps to expose trusted styling surfaces without exposing the whole internal DOM.

Group part names by intent:

- `text`: `color`, `font-family`, `font-size`, `font-weight`, `letter-spacing`, `line-height`, `text-transform`, `text-decoration`, `text-align`
- `spacing`: `padding`, `margin`, `gap`, `width`, `height`, `box-sizing`
- `layout`: `display`, `flex`, `grid-template-columns`, alignment, placement, and related layout controls
- `visual`: `background`, `border`, `border-radius`, `box-shadow`, `opacity`, `transition`, `outline`, `color`

Use `getPartMap("text", "spacing", "layout", "visual")` only for elements that should support those override categories. Prefer the smallest useful set.

Example:

```ts
const partMap = getPartMap("text", "spacing", "layout", "visual");

this.shadowRoot.innerHTML = `
  <style>...</style>
  <button part="${partMap}" type="button">
    <slot name="before"></slot>
    <slot></slot>
    <slot name="after"></slot>
  </button>
`;
```

Consumers can then target stable parts:

```css
mui-button::part(background) {
  background: var(--action-secondary-background);
}
```

## Slots And Composition

Use slots as the primary composition model.

- Prefer named slots such as `before`, `after`, `action`, `title`, `detail`, `meta-before`, and `meta-after` when placement matters.
- Keep direct slotted content meaningful; avoid unnecessary wrapper elements.
- If a parent needs to respond to slotted content, inspect assigned nodes and toggle an internal runtime attr such as `has-before`.
- If a child must adapt to a parent context, have the parent add a context attr or class to the slotted child, such as `card-slot`.
- Let the child style itself for that context with `:host([card-slot])` or `:host(.card-slot)`.
- Use automatic sizing for slotted icons, avatars, badges, and action controls when the parent size determines the right visual scale.
- Keep slot behavior resilient to whitespace text nodes.

Composition pattern:

```ts
const hasBefore = slotBefore.assignedNodes({ flatten: true }).some((node) =>
  node.nodeType === Node.ELEMENT_NODE ||
  (node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim())
);

this.toggleAttribute("has-before", hasBefore);
```

Do not persist internal composition attrs in exported markup unless the destination explicitly needs them.

## Dynamic Attrs

Use dynamic attrs for runtime or destination-only structural behavior.

- Store per-component dynamic attr metadata in `dynamic-attrs.json`.
- Keep dynamic attrs separate from story props and public API props.
- Prefer destination-only output: document where the attr appears, not where it originated, unless the source relationship matters.
- Use dynamic attrs for slot-aware layout flags, destination context flags, and builder/runtime structure.
- Avoid leaking internal runtime attrs such as `has-*`, `icon-only`, `avatar-only`, or `multi-line` into exported HTML unless a destination integration explicitly requires them.
- Strip internal attrs when serializing public/component-consumed HTML.

Dynamic attrs should help tooling reproduce component behavior without pretending those attrs are user-authored API.

## Framework Wrappers

Keep wrappers thin. Native Web Components own behavior.

- Pass attributes, properties, events, slots, refs, and children through.
- Do not recreate component state machines in React, Vue, Svelte, or other wrappers.
- Do not duplicate styling logic in wrapper components.
- Preserve native custom element names and slot attributes in rendered output.
- Map framework event conventions only at the boundary, then let the custom element emit and handle its own events.
- Keep typed wrappers generated or mechanically simple when possible.

Wrappers should improve ergonomics without making the framework version the source of truth.

## Review Checklist

Use this checklist when creating or reviewing a component.

- API: Public attrs are documented in `api.ts`; UX guidance belongs in `doc.ts`.
- Accessibility: Interactive components use native controls, clear labels, keyboard focus, and `focus()` forwarding where useful.
- Styling: Styles are shadow-contained, token-led, and theme-aware.
- Parts: `part` exposure is intentional and uses the smallest useful part map.
- Slots: Named slots are documented; slotted content adapts without brittle wrappers.
- Dynamic attrs: Runtime/destination attrs are documented separately and not confused with public API.
- Export cleanliness: Exported HTML strips internal attrs and includes only public API attrs.
- Tokens: New tokens are added only at the right layer and only when existing semantic or component tokens are insufficient.
- Composition: Parent-child slot behavior is documented and resilient to empty slots, whitespace, and nested components.
- Build metadata: The component remains discoverable through the generated Custom Elements Manifest.

## When Adapting This Approach

Start with the smallest useful component. Define the public API first, write the native element behavior second, then add docs and dynamic attrs only for behavior that tools or consumers need to understand.

The goal is not to make every component infinitely configurable. The goal is to make each component portable, accessible, theme-aware, easy to compose, and easy for agents and builders to inspect.
