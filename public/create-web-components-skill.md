---
name: create-web-components-skill
description: Help make your own framework-agnostic, portable web components using native APIs, shadow DOM, and slots.
---

# Create Web Components Skill

Use this skill to build native Web Components with a framework-agnostic architecture: explicit APIs, contained styles, accessible native semantics, token-led theming, structured metadata, and slotted structure that can be understood by humans and AI tools.

<mui-body size="large">
Build components as small native systems with explicit contracts for people, frameworks, builders, and agents.
- The component owns behavior, accessibility, shadow DOM, state sync, and internal layout.
- The public API stays small and stable: authored attributes, properties, events, slots, CSS parts, and CSS custom properties.
- Tokens describe design decisions in layers rather than pushing raw colors and sizes into every component.
- Parts expose controlled styling categories instead of exposing internal DOM structure.
- Slots define structural placement, while parents can derive context and pass that context to children.
- Dynamic attrs document runtime or destination-only structure for wrappers, exporters, design canvases, and agents.
- Knowledge files let tools inspect the system instead of guessing from screenshots or examples.
</mui-body>

This architecture is intentionally not "just custom elements." It is a contract stack:

```text
native custom element
-> public API metadata
-> token/theme contract
-> part override contract
-> slot and parent-child structure
-> dynamic attrs for tools
-> knowledge exports for agents/builders
```

## What This Approach Optimizes For

Use this architecture when the design system needs to travel across plain HTML, framework wrappers, generated component trees, design canvases, exported markup, and AI-assisted tooling.

- Components remain native and portable instead of becoming React-first, Vue-first, or canvas-first abstractions.
- Styling is customizable through tokens and parts, not through unrestricted DOM reach-in.
- Parent/child behavior is modeled as explicit structure, so a parent can tell a child what context it is in without owning the child's styling.
- Runtime-derived attrs are documented for tools, but they do not become casual public API.
- Knowledge files describe how to build with the system, while generated manifests describe what each component publicly exposes.

The strongest signal in this architecture is restraint: public API, part surfaces, token hooks, and dynamic attrs are all contracts. Add them deliberately and keep each one in the right layer.

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

## Events And Form Controls

For form-like components, make the host element the integration boundary and let the internal native control stay inside shadow DOM.

- Mirror user-editable state onto a host property and, when useful for serialization, a host attribute such as `value` or `checked`.
- Dispatch `CustomEvent` from the host with `bubbles: true` and `composed: true` so app code, wrappers, builders, and delegated listeners can hear the event outside the shadow root.
- Put the useful state in `event.detail`: text controls emit `detail.value`; checkbox, radio, and switch emit `detail.checked` and include `detail.value` or `detail.name` where relevant.
- Dispatch native-shaped event names such as `input` and `change` for form controls so wrappers can use familiar boundaries.
- Do not rely on React synthetic `onChange` for custom element value flow unless the wrapper has proven support. Attach native listeners to the custom element host with `addEventListener`.
- Provide `focus()` on the host and forward it to the internal native input, textarea, select, or button.

Current form event contracts in this architecture:

| Component family | Host state surface | Event names | Event detail |
| --- | --- | --- | --- |
| Text input, textarea, select, search | `value` attribute; host `value` property where implemented | `input`, `change` | `detail.value` |
| Checkbox and switch | `checked` attribute and host `checked` property | `change` | `detail.checked` |
| Radio | `checked`, `value`, and `name` attributes | `change` | `detail.checked`, `detail.value`, `detail.name` |
| Range input | `value` attribute and host `value` property | `input`, `change` | numeric `detail.value` |
| Chip input | `value` attribute and host `value` property with selected option objects | `chip-input-query-change`, `chip-input-change`, `input`, `change` | `detail.query` for query changes; `detail.action`, `detail.values`, `detail.items`, `detail.added`, and `detail.removed` for selection changes |
| Date, time, calendar, and date-time pickers | `value` attribute or selected internal value | `change` | `detail.value` |
| File upload | selected file from the host event | `file-upload` | `detail.file` |

Example:

```ts
const eventDetail = {
  detail: { value: input.value },
  bubbles: true,
  composed: true,
};

this.dispatchEvent(new CustomEvent("input", eventDetail));
this.dispatchEvent(new CustomEvent("change", eventDetail));
```

React wrappers should treat the Web Component as the source of behavior and translate only at the boundary:

```tsx
useEffect(() => {
  const el = ref.current;
  if (!el || !onValueChange) return;

  const handler = (event: Event) => {
    const value = (event as CustomEvent<{ value: string }>).detail?.value;
    if (value !== undefined) onValueChange(value);
  };

  el.addEventListener("input", handler);
  return () => el.removeEventListener("input", handler);
}, [onValueChange]);
```

Use `shadowRoot.querySelector(...)` only when the integration genuinely needs the internal native element, such as focus recovery, legacy wrappers, browser autofill/autocomplete details, or tests. When doing that, wait until the custom element is defined and rendered before reading `.value` or `.checked`.

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

### Documentation Structure (`doc.ts`)

When writing or reviewing UX guidance in `doc.ts`, classify examples and behavior correctly:

- **variants**: Named visual/design choices shown in UX guidelines. These are usually image-led.
- **stories**: Live/story examples, usage groups, behaviors, sizes, color demos, and implementation-facing guidance.
- **compositions**: Component used inside a larger UI. Usually multi-component, closer to a page, card, or full flow (e.g., onboarding form, promo card, settings drawer, dialog footer).

When a component needs a behavior that is only relevant to an exporter, builder, or destination component, document it as a dynamic attr instead of mixing it into the public API.

### Reusable Story Metadata

Treat `doc.ts` as the source of truth for descriptive story metadata that should be shared across documentation experiences.

- Add an ordered `stories.items` collection containing a stable `key`, `title`, optional `description`, and a `list` of usage details.
- Keep the key aligned with the rendered story id so quicklinks, deep links, and external renderers can address the same example.
- Generate `custom-elements.json` after changing story metadata. The CEM is the transport layer consumed by Muibook, Storybook-style documentation, and other component explorers.
- In the Muibook storefront, load the component docs from the CEM, map each story record by key, and use the ordered collection to build quicklinks. Join `list` only at the renderer boundary when a local component requires a delimited string.
- Do not duplicate titles, descriptions, or usage guidance in the story implementation. Duplicated fallback copy hides stale CEM output and allows documentation surfaces to drift.
- Render the shared story-metadata empty state when metadata is unavailable. The empty state should tell maintainers to regenerate the CEM rather than silently using embedded fallback content.
- Keep executable story markup, imported assets, event handlers, controls, and framework-specific parameters in the local renderer. The CEM record describes the example; it does not own its runtime implementation.
- A Storybook-style renderer should read the same ordered records and adapt them into story titles, descriptions, docs blocks, and navigation without changing the source metadata.

This separation allows one authored story description to remain consistent while Muibook, Storybook, tests, and future documentation tools render it using their own component and interaction primitives.

## Knowledge Bundle

Keep human guidance, generated metadata, and runtime/export metadata separate.

- `custom-elements.json`: generated Custom Elements Manifest for public component APIs, slots, events, CSS parts, CSS custom properties, and docs metadata.
- `dynamic-attrs.json`: runtime and destination-only structural attrs that tools may need to preserve, apply, or strip when wrapping/exporting components.
- `DESIGN.md`: portable design direction, token architecture, theme behavior, and component mappings.
- `AGENTS.md`: coding-agent operating rules for working in the component repo.
- `rules.ts`, `keywords.ts`, and `compositions.ts`: AI-oriented generation rules, keyword routing, and example component trees.
- `create-web-components-skill.md`: a compact skill guide for agents and developers that need the architectural pattern without loading every repo file.

Do not put destination/runtime attrs into the CEM as if they are public user API. Keep the CEM for authored component contracts and use `dynamic-attrs.json` for builder, wrapper, and export behavior.

Use "compositions" for curated UI examples and generated component trees. Use "slots and structure" for the lower-level component mechanics.

## Token Architecture

Use CSS custom properties as the runtime contract, but keep token responsibilities layered.

- Generate foundation/brand tokens with Style Dictionary from brand token JSON.
- Treat the default brand tokens as the system foundation, then allow additional brand builds to set brand-specific values through selectors such as `html[data-brand="..."]`.
- Build brand outputs for the target surfaces: public web CSS, source CSS, JS/TS objects, iOS Swift, and Android resources when needed.
- Keep brand/foundation tokens primitive: color ramps, typography, space, radius, stroke, speed, and other raw values without UI meaning.
- Use semantic/theme tokens to map foundation values into reusable roles such as text, surface, border, focus, shadow, feedback, form, action, and categorical color.
- Treat semantic tokens as light/dark-aware role decisions, not just a flat naming layer. Dark mode should preserve hierarchy and meaning, not simply invert light mode.
- Use component tokens to map semantic roles into component-specific states and geometry: button variants, badge/status tones, form control states, card surfaces, media overlays, tabs, chips, tables, and similar details.
- Let component tokens provide controlled override points when a component needs a different surface, color, radius, size, or state treatment from the shared semantic default.

The intended flow is:

```text
foundation/brand token -> semantic/theme role -> component token -> rendered CSS state
```

Avoid adding a new token when an existing semantic or component token already expresses the decision. Add new component tokens only when the component needs a real public customization point or a repeated internal decision.

Do not describe every CSS variable as the same kind of token. In this approach:

- Foundation/brand tokens carry raw cross-platform values.
- Theme and semantic tokens decide what those values mean in light and dark modes.
- Component tokens bind those semantic roles to a component's states, variants, surfaces, and geometry.
- Local CSS variables may still exist inside a component, but they should usually derive from semantic or component tokens rather than bypassing the token system.

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
- Apply `box-sizing: border-box` whenever component CSS adds padding or borders to an element with constrained width or height. Parent components should own shared inset spacing for composed children; avoid story-only padding fixes that unexpectedly change control dimensions.

Good component styling is predictable, contained, theme-aware, and overrideable only through intentional surfaces.

## Part Maps

Use part maps to expose trusted styling surfaces without exposing the whole internal DOM.

The part system is deliberately property-oriented. A part name such as `background`, `padding`, or `font-size` describes the styling capability being exposed, not the private element being styled. This gives consumers a stable override vocabulary while allowing the component DOM to change.

Group part names by intent:

- `text`: `color`, `font-family`, `font-size`, `font-weight`, `letter-spacing`, `line-height`, `text-transform`, `text-decoration`, `text-align`
- `spacing`: `padding`, `margin`, `gap`, `width`, `height`, `box-sizing`
- `layout`: `display`, `flex`, `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `align-content`, `align-self`, `grid-template-columns`, `grid-template-rows`, `grid-column`, `grid-row`, `place-items`, `place-content`, `vertical-align`
- `visual`: `background`, `border`, `border-radius`, `box-shadow`, `opacity`, `transition`, `outline`, `color`

Use `getPartMap("text", "spacing", "layout", "visual")` only for elements that should support those override categories. Prefer the smallest useful set, because every part is a public override promise.

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
my-button::part(background) {
  background: var(--action-secondary-background);
}
```

This part vocabulary is intentionally different from element-name parts such as `label`, `icon`, or `container`. Use element-name parts only when the actual sub-element is the stable public concept. Prefer property-oriented parts when the stable contract is the kind of styling the consumer may override.

## Slots And Structure

Use slots as the primary structure model.

- Prefer named slots that actually exist in the component system: `before`, `after`, `action`, `actions`, `actions-right`, `title`, `detail`, `message`, `hint`, `trigger`, `start`, `end`, `accessory`, `primary`, `secondary`, `showAbove`, `showMiddle`, `showBelow`, `left`, `page`, `right`, `meta-before`, and `meta-after`.
- Keep direct slotted content meaningful; avoid unnecessary wrapper elements.
- If a parent needs to respond to slotted content, inspect assigned nodes and toggle an internal runtime attr such as `has-before`.
- If a child must adapt to a parent context, have the parent add a context attr or class to the slotted child, such as `card-slot`.
- Let the child style itself for that context with `:host([card-slot])` or `:host(.card-slot)`.
- Use automatic sizing for slotted icons, avatars, badges, and action controls when the parent size determines the right visual scale.
- Keep slot behavior resilient to whitespace text nodes.

Slot-state pattern:

```ts
const hasBefore = slotBefore
  .assignedNodes({ flatten: true })
  .some(
    (node) => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim()),
  );

this.toggleAttribute("has-before", hasBefore);
```

Do not persist internal slot-state attrs in exported markup unless the destination explicitly needs them.

## Parent And Child Overrides

Use parent-derived context when the right styling depends on where a child is placed.

- Let the parent inspect its slotted children and derive structural context.
- Put context on the destination element as an attr or class, such as `card-slot`, `condensed-slot`, `usage="card"`, or `usage="input"`.
- Let the child own the actual styling with `:host([card-slot])`, `:host([usage="input"])`, or a matching host class.
- Keep this one-directional: parent detects context, child styles itself for that context.
- Prefer context attrs over global CSS selectors that reach across component boundaries.

Examples of this pattern:

- Card body detects slats, slat groups, tables, and accordions, then applies card-related attrs to the destination children.
- Button and link detect icon-only, avatar-only, video-thumbnail, before-slot, and after-slot structure, then normalize sizing and layout.
- Form controls apply input usage to slotted actions, chips, add-ons, hints, and inline affordances so they align with the field surface.
- Alert, dropdown, and card contexts apply destination attrs so child actions match the surrounding surface without becoming separate public variants.

This is a key part of the architecture: parent/child relationships are structural contracts, not ad hoc CSS overrides.

## Dynamic Attrs

Use dynamic attrs for runtime or destination-only structural behavior.

- Store per-component dynamic attr metadata in `dynamic-attrs.json`, separate from the CEM.
- Keep dynamic attrs separate from story props and public API props.
- Prefer destination-only output: document where the attr appears, not where it originated, unless the source relationship matters.
- Use dynamic attrs for slot-aware layout flags, destination context flags, and builder/runtime structure.
- Avoid leaking internal runtime attrs such as `has-*`, `icon-only`, `avatar-only`, or `multi-line` into exported HTML unless a destination integration explicitly requires them.
- Strip internal attrs when serializing public/component-consumed HTML.

Dynamic attrs are the machine-readable record of the parent/child and runtime structure described above. They exist because external tools may need to reproduce or route structural state that a browser component normally derives at runtime. A React wrapper, design canvas, exporter, or builder may need to know which attrs are valid destination attrs, which component receives them, and which internal attrs should be stripped from public HTML.

Common dynamic attr families in this codebase include:

- Slot presence and affordance state: `has-before`, `has-after`, `has-actions`, `has-extra-actions`, `has-message`, `has-rule`, `has-header`, `has-footer`, `has-notes`.
- Content-shape state: `icon-only`, `avatar-only`, `has-video`, `has-avatar-chip`, `has-error`, `has-chrome`.
- Destination context attrs: `card-slot`, `condensed-slot`, `menu-slot`, `menu-slot-first`, `menu-slot-last`, `alert-slot`, `alert-positive-slot`, `alert-info-slot`, `alert-warning-slot`, `alert-attention-slot`.
- Layout/container context attrs: `in-card`, `in-form-section`, `in-dialog`, `in-drawer`, `usage`, `first-child`, `last-child`.
- Presentation/runtime attrs: `notes-visible`, `data-slide-section`, `slide-active`, `slide-hidden`, `inner-space-top`.

Dynamic attrs should help tooling reproduce component behavior without pretending those attrs are user-authored API.

When generating framework wrappers or design-canvas integrations, use the CEM to type the authored API and use dynamic attrs to understand structural pass-through, destination attrs, and attrs that should be stripped from final authored markup.

## Framework Wrappers

Keep wrappers thin. Native Web Components own behavior.

- Pass attributes, properties, events, slots, refs, and children through.
- Do not recreate component state machines in React, Vue, Svelte, or other wrappers.
- Do not duplicate styling logic in wrapper components.
- Preserve native custom element names and slot attributes in rendered output.
- Map framework event conventions only at the boundary, then let the custom element emit and handle its own events.
- Keep typed wrappers generated or mechanically simple when possible.
- Use `custom-elements.json` for public types and props.
- Use `dynamic-attrs.json` for destination/runtime attrs that wrappers, canvases, and exporters must pass through, apply, or remove correctly.
- For form elements, set host attributes/properties from React state, then read changes from host custom events such as `input` and `change`.
- Prefer wrapper conveniences such as `onValueChange` or `onCheckedChange` that read `event.detail` from native host listeners.
- Keep value updates separate from structural props such as `label`, `type`, `placeholder`, `variant`, and `size` so typing does not cause unnecessary rerenders or focus loss.
- Do not move the component's validation, slot sizing, or internal input behavior into the React wrapper.

Wrappers should improve ergonomics without making the framework version the source of truth.

## Review Checklist

Use this checklist when creating or reviewing a component.

- API: Public attrs are documented in `api.ts`; UX guidance belongs in `doc.ts`.
- Accessibility: Interactive components use native controls, clear labels, keyboard focus, and `focus()` forwarding where useful.
- Events: Custom events that must cross shadow DOM use `bubbles: true`, `composed: true`, and useful `detail` payloads.
- Forms: Form controls expose host value/checked state and wrappers listen on the host instead of owning shadow DOM internals.
- Styling: Styles are shadow-contained, token-led, and theme-aware.
- Parts: `part` exposure is intentional and uses the smallest useful part map.
- Slots: Named slots are documented; slotted content adapts without brittle wrappers.
- Parent-child context: Parent-derived attrs are intentional, documented, and applied to the destination element.
- Dynamic attrs: Runtime/destination attrs are documented separately and not confused with public API.
- Export cleanliness: Exported HTML strips internal attrs and includes only public API attrs.
- Tokens: New tokens are added only at the right layer and only when existing semantic or component tokens are insufficient.
- Slotted structure: Parent-child slot behavior is documented and resilient to empty slots, whitespace, and nested components.
- Build metadata: The component remains discoverable through the generated Custom Elements Manifest.

## When Adapting This Approach

Start with the smallest useful component. Define the public API first, write the native element behavior second, then add docs and dynamic attrs only for behavior that tools or consumers need to understand.

The goal is not to make every component infinitely configurable. The goal is to make each component portable, accessible, theme-aware, easy to compose, and easy for agents and builders to inspect.
