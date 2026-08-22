# Muibook Backlog

# Completed — August 22nd

## DONE | 1. Full review of runtime / destination dynamic attrs (Card `inner-space` was the known miss)

`inner-space-top` remains live: Card stamps it on Body when a Header exists, and `::slotted([inner-space-top])` collapses Body top padding. `inner-space` is a separate Body/Footer inset flag and was the knowledge miss.

### Inventory (added / removed / rewritten)

| Tag | Attr | Change |
| --- | --- | --- |
| `mui-card-body` | `inner-space` | Added. Set when default-slot content needs inset padding, including card slat groups; not when table/accordion owns the surface; not when `size="none"`. |
| `mui-card-body` | `inner-space-top` | Rewritten. Set by Card when a Header is present. |
| `mui-card-footer` | `inner-space` | Added. Set when visible slotted content is not Code. |
| `mui-avatar-group` | `card-slot` | Added. Card Body stamp for card-surface ring color. |
| `mui-chip-rail` | `card-slot` | Added. Card Body stamp for card-surface rail masks. |
| `mui-file-diff` | `card-slot`, `result-slot`, `result-slot-last` | Added. Forwarded to the inner Slat. |
| `mui-slat` | `result-slot`, `result-slot-last` | Added. Result Bar stamps. |
| `mui-body` | `menu-inset` | Added. Menu inset Body padding. |
| `mui-button` | `menu-inset` | Added. Menu inset action padding. |
| `mui-link` | `menu-slot`, `menu-slot-first`, `menu-slot-last`, `menu-inset`, `alert-slot`, `alert-*-slot` | Added. Same destination families as Button. |
| `mui-input`, `mui-select`, `mui-textarea`, `mui-date-picker`, `mui-time-picker`, `mui-search-input`, `mui-chip-input` | `menu-slot` | Added. Direct Menu form controls. |
| `mui-search-input` | `has-after` | Added. After-slot compact/reveal layout. |
| `mui-context-bar` | `prompt-position` | Added. Prompt `context-above` / `context-below`. |
| `mui-menu` | `has-top`, `has-bottom` | Added. Named slot presence. |
| `mui-slat-group` | `usage` | Kept. Card Body stamps `card`; Accordion Block stamps `accordion`. |
| `mui-code` | `usage` | Added. `surface` inside Card, Drawer, Dialog, or Carousel. |
| `mui-tab-bar` | `usage` | Added. `surface` from the surface owner. |
| `mui-button` | `usage` | Added. `input` from Input; `header-bar` from Header Bar / Dropdown. |
| `mui-link`, `mui-chip` | `usage` | Added. `input` from Input. |
| `mui-dropdown` | `usage` | Added. `header-bar` from Header Bar. |
| `mui-avatar-chip` | `usage` | Added. `media-player` from Media Player. |
| `mui-avatar` | `usage` | Added. `color-input` from Color Input. |

### Called out, not in dynamic attrs

- Public CEM already covers Card `size` on Header/Body/Footer, Code/Tab Bar `usage="surface"`, Menu compact `padding-inline` / `surface="seamless"`.
- `mui-dialog` stamps unused `has-header` (no host CSS).
- Empty Card Footer stamps `hidden`.
- Prompt `fan-open`, `preview-dialog-*`, and `data-prompt-position` are internal runtime.
- Card Body can stamp `card-body-size-none-slot*` on `mui-file-diff`, but File Diff does not observe or forward those attrs.
- Menu stamps `menu-slot` on `mui-range-input`, but Range Input does not consume it.

---

# Completed — August 22nd (earlier)

## DONE | 1. Position dialog-promoted Dropdown menus before they become visible

- `toggleMenu()` portals the Menu, promotes popover when needed, then `adjustPosition(true)` before adding `.show`.
- `.mui-dropdown-portal` (and in-host `.dropdown-menu`) use `visibility: hidden` until `.show`, so an unpositioned popover cannot paint at the UA origin.

## DONE | 2. Inline Code should sit flush with following punctuation

- `:host([inline])` is `display: inline-flex` with `align-items: baseline` and `vertical-align: baseline`.
- Inner `<code>` is `display: inline` (no nested `inline-block`), so punctuation after the host sits flush with the chip.

## DONE | 3. Re-scan Card Body context when Slats mount late

- `mui-card-body` coalesces `updateSlottedContent()` on default-slot `slotchange` and a host `MutationObserver` (`childList`, `subtree`; not attributes).
- `mui-slat-group` with `usage="card"` stamps `card-slot` on action/row Slat and File Diff children in `setLastInGroup()`, including after usage `render()` rebinds observers.

---

# Completed — August 19th

## DONE | 1. Align Dialog surface usage scanning with Drawer behaviour (`applySurfaceUsage`)

### Observed
- When `<mui-tab-bar>` is rendered inside `<mui-dialog>`, dynamic or keyed child remounts (e.g., React `key={`tab-${session}`}`) fail to receive `usage="surface"`.
- Unlike `<mui-drawer>`, which re-evaluates layout and surface inspection when opened via `syncOpenState()`, `<mui-dialog>` only executes `applySurfaceUsage(this)` once synchronously inside `connectedCallback()`.
- If child elements are mounted after initial creation, swapped dynamically, or remounted with framework keys, `mui-dialog` never re-scans its children.
- Because `mui-dialog` also lacks a `slotchange` listener on its default `<slot></slot>`, late-mounted or keyed `<mui-tab-bar>` instances do not receive `usage="surface"` and fail to pick up surface theme tokens.

### Solution
Align `mui-dialog` with `mui-drawer` to re-scan for slotted surface elements on open and slot changes:

1. **Re-scan on open in `syncOpenState()`**:
   ```ts
   syncOpenState() {
     if (this.hasAttribute("open")) {
       applySurfaceUsage(this); // Re-scans children whenever the dialog opens
       this.dialogEl.open || this.dialogEl.showModal();
     } else {
       this.dialogEl.open && this.dialogEl.close();
     }
   }
   ```

2. **Add `slotchange` listener on default content slot in `connectedCallback()`**:
   ```ts
   this.contentSlot = this.shadowRoot.querySelector("slot:not([name])");
   this.contentSlot?.addEventListener("slotchange", () => {
     applySurfaceUsage(this);
   });
   ```

---

## DONE | 2. Support Declarative `active` / `value` Attribute on `<mui-tab-bar>`

### Observed
- `<mui-tab-bar>` currently resolves its active tab once at startup by checking `this.children` for `hasAttribute("active")` (or falling back to the first child).
- When frameworks (React, Vue, Svelte) programmatically update the `active` attribute on a child `<mui-tab-item active={...}>` in JSX without tearing down the DOM tree, `<mui-tab-bar>` is not notified because it does not observe child attribute mutations.
- As a result, the sliding highlight pill and active state stay stuck on the previous tab unless the consumer calls `tabBar.setActiveTab(...)` via imperative DOM references.
- Additionally, when `<mui-tab-bar>` is mounted inside a hidden container (e.g. `<dialog>` or drawer with `width: 0`), becoming visible causes the highlight pill to animate from `0px` to full width with a visible expansion flash.

### Proposed Solutions

#### Approach A: Declarative `active` / `value` on `<mui-tab-bar>` (Recommended)
Allow consumers to bind the active tab directly on `<mui-tab-bar active="password">`:
```ts
static get observedAttributes() {
  return ["active", "value", "size", "variant", "stroke", "radius"];
}

attributeChangedCallback(name: string, oldVal: string, newVal: string) {
  if ((name === "active" || name === "value") && oldVal !== newVal) {
    const target = this.querySelector<HTMLElement>(`#${newVal}`) ||
                   this.querySelector<HTMLElement>(`[data-id="${newVal}"]`);
    if (target) {
      this.setActiveTab(target);
    }
  }
}
```

#### Approach B: Child Mutation Observer in `<mui-tab-bar>`
- Observe `attributeFilter: ["active"]` on child `<mui-tab-item>` elements so changes to child `active` attributes automatically invoke `setActiveTab(target)`.

#### Approach C: Suppress Highlight Transition on Hidden-to-Visible Reveal
- When transitioning from `0px` width (hidden container) to visible width, temporarily set `highlight.style.transition = "none"` for one frame to prevent the pill from expanding visibly on dialog open.

---

## DONE | 3. Support `space` (gap) Attribute on `<mui-button-group>` with `300` Default

### Proposed
- Update `<mui-button-group>` to support the `space` attribute (aligning with layout primitives like `<mui-h-stack>` and `<mui-grid>`).
- Set the default gap to `var(--space-300)` (matching the standard drawer and dialog footer actions gap).
- Support standard space token scales (e.g., `space="var(--space-100)"`, `space="300"`, `space="400"`).
- Ensure flex wrapping and alignment (`justify-content: flex-end` / `space-between`) work seamlessly with the configured gap.

---

## DONE | 4. Support `close-shape` on `<mui-drawer>` and `<mui-dialog>`

### Proposed

### `close-shape` Attribute
- Add a clean `close-shape` prop (e.g., `close-shape="circle" | "default" | "square"`) to `<mui-drawer>` and `<mui-dialog>`.
- Passes through to the internal close button (`<mui-button class="close" shape="${this.getCloseShape()}">`), enabling circular close affordances natively without custom CSS overrides.

---

# Completed — August 17th

## DONE | 1. Target Attributes for `mui-input`

- `autocomplete` (e.g., `email`, `current-password`, `new-password`, `one-time-code`, `off`)
- `readonly` / `read-only` (for selectable, non-editable text like share URLs/API keys)
- `required` (native browser validation)
- `autocorrect` (`on` / `off`)
- `autocapitalize` (`none`, `sentences`, `words`, `characters`)
- `spellcheck` (`true` / `false`)

## DONE | 2. Support `width` attribute on `mui-link`

## DONE | 3. Text Area fills its assigned height while retaining the rows minimum

## DONE | 4. Disabled option for tabs? Outcomes share link etc

# August 16th

## DONE | 1. Fix the Dropdown intrinsic Menu width resize loop

This issue was found while composing `mui-dropdown` actions inside `mui-prompt`. It is a Dropdown sizing and observation problem and does not depend on Dialog or top-layer behaviour.

### Outcome

- Dropdowns without an authored Menu width open without a `ResizeObserver loop completed with undelivered notifications` error.
- Menu width remains optional and continues to use the viewport-safe intrinsic fallback.
- Width measurement and position updates do not create a feedback loop.

### Observed

- A portaled Dropdown can trigger `ResizeObserver loop completed with undelivered notifications` when its direct `mui-menu` has no explicit `width`.
- Giving the Menu an explicit width stabilises the layout, but width is documented as optional and the portaled fallback is currently `min(100%, 18rem)`.

### Plan

- Add a minimal reproduction using a direct `mui-menu` with no `width`.
- Trace the interaction between `ResizeObserver`, `adjustPosition()`, the temporary viewport-sized `.inner`, and the final shrink-wrapped portal width.
- Make the measurement/update cycle idempotent so an observer callback does not continuously resize the element it observes. Options to assess include:
  - observing the Menu surface rather than the portal wrapper;
  - scheduling one guarded position update per animation frame;
  - only writing width values when the resolved value has materially changed;
  - separating measurement from the final constrained width so the wrapper does not alternate between viewport width and surface width.
- Keep the explicit `mui-menu width="..."` API for deliberate composition sizing, but do not make it required to avoid a runtime error.

### Regression coverage

- Add focused component-level coverage using a direct `mui-menu` with no authored width.
- Exercise the warning as a window-level error so the regression does not depend only on visual inspection or console behaviour.

### Component and release guidance

- Update `src/components/mui-dropdown/doc.ts` usage and engineering guidance:
  - Menu width is optional; author `width` when the content needs a deliberate measure.
  - Explain the intrinsic viewport-safe fallback.
- Update the default-slot description in `src/components/mui-dropdown/api.ts` if the implementation changes its exact behaviour.
- Add focused story metadata to the ordered Dropdown story list if a new story is added.
- Add an entry to the active Upcoming section of `public/CHANGELOG.md`.
- Regenerate CEM, story metadata, skills, and knowledge outputs through the existing build scripts; do not edit generated files by hand.

### Proposed implementation order

1. Reproduce and isolate the intrinsic-width ResizeObserver loop.
2. Make Dropdown width measurement idempotent and verify it outside dialogs.
3. Add focused component-level regression coverage.
4. Update Dropdown API/usage/engineering guidance and the changelog.
5. Run the Muibook/CEM/knowledge builds and exercise the regression at narrow and wide viewports.

### Acceptance checks

- Open and close Dropdowns with and without an explicit Menu width.
- Test short action labels, long labels, percentage widths, fixed widths, and a viewport narrower than the preferred Menu width.
- Confirm there is no ResizeObserver error and no visible menu jump.
- Confirm positioning, collision handling, focus entry, dismissal, and authored Menu width still work.

### Definition of done

- The ResizeObserver failure has focused component-level regression coverage.
- Consumers do not need to author Menu width merely to prevent a runtime error.
- Intrinsic, percentage, and fixed Menu widths remain viewport-safe and stable.

---

## DONE | 2. Fix Dialog / Dropdown z-index and native top-layer behaviour

This issue was found with `mui-dropdown` actions inside `mui-prompt`, where the Prompt was hosted in a custom native modal `<dialog>`.

### Outcomes

- Dropdown menus render above the surface that contains their trigger, including a native modal dialog in the browser top layer.
- Prompt has a realistic dialog composition story that exercises its slotted Dropdown actions.
- Dropdown and Prompt guidance explain the consumer responsibilities that remain for custom overlay systems.

### Observed

- Dropdown currently portals its Menu to `document.body`.
- A native modal `<dialog>` is promoted to the browser top layer. A body-level portal remains behind that dialog even when Dropdown has a large `zindex`; ordinary CSS z-index cannot outrank the browser top layer.
- This affects a Dropdown directly inside a custom native dialog and realistic compositions such as Dropdown actions inside a Prompt hosted by that dialog.

### Implementation investigation

- Add an internal portal-root resolver that checks the trigger's composed ancestry before falling back to `document.body`.
- Where the trigger is rendered inside an open native `<dialog>`, append the Dropdown portal to that dialog so it participates in the same top layer.
- Cover both direct light-DOM dialogs and slotted/shadow-DOM composition, including `mui-dialog` if its internal native dialog can be resolved safely.
- Keep `zindex` meaningful within the selected portal root.
- Preserve Menu restoration, focus management, outside-click handling, Escape handling, scroll repositioning, viewport collision handling, and cleanup when the Dropdown or dialog disconnects.
- Do not add a public `portal-target` escape hatch initially. Add one only if the composed-ancestry approach cannot support a demonstrated integration without consumer DOM manipulation.

### Fallback guidance

- For non-native custom overlays that only use positioned elements and CSS stacking contexts, consumers should set `zindex` according to their application layer scale.
- Documentation must state that z-index only orders content within a stacking/top-layer context; it cannot move a body portal above a native modal dialog.
- If an unsupported overlay system owns its own portal root, document the limitation and the supported integration pattern rather than implying that an arbitrarily large z-index is sufficient.

### Prompt-in-dialog regression story

Add a new Prompt story, tentatively **Prompt in Dialog**, that:

- opens a custom native `<dialog>` from a visible story action;
- renders a realistic `mui-prompt` inside the dialog;
- includes at least two slotted Dropdown actions, such as an add/context menu and a model/provider menu;
- uses deliberate Menu widths so this story isolates dialog layering and portal behaviour; intrinsic-width coverage belongs to task 1;
- demonstrates open, selection, focus, Escape, outside dismissal, dialog close, and reopen behaviour;
- requires no story-only portal reparenting workaround once the component fix is in place.

Use this as the realistic composition regression. If a smaller component-level fixture is still useful, add a focused **Dropdown in Native Dialog** story to the Dropdown page as well.

### Component and technical guidance

**Dropdown**

- Update `src/components/mui-dropdown/doc.ts` usage and engineering guidance:
  - Explain portal roots, native top-layer behaviour, and when `zindex` is appropriate.
- Update the `zindex` description in `api.ts` if the implementation changes its exact behaviour.
- Add the new regression story metadata to the ordered Dropdown story list when a Dropdown-specific story is added.

**Prompt**

- Update `src/components/mui-prompt/doc.ts` with composition guidance for hosting Prompt in Dialog or another overlay.
- Clarify that Prompt accepts Dropdowns in its action slots, while Dropdown owns Menu portal positioning and layer behaviour.
- Add the Prompt-in-dialog story metadata to the ordered Prompt story list.
- Keep the guidance focused on composition; do not add Prompt props for behaviour owned by Dropdown or Dialog.

**Knowledge and release outputs**

- Put public API and UX guidance in component `api.ts` and `doc.ts` sources so the Custom Elements Manifest and Muibook Knowledge remain authoritative.
- Add any reusable cross-component composition rule to the appropriate `src/knowledge/fragments/` source rather than editing generated skills directly.
- Add an entry to the active Upcoming section of `public/CHANGELOG.md` covering the Dropdown top-layer fix and Prompt dialog story.
- Regenerate CEM, story metadata, skills, and knowledge outputs through the existing build scripts; do not edit generated files by hand.

### Proposed implementation order

1. Add a focused Dropdown-in-native-dialog reproduction.
2. Add native-dialog-aware portal-root resolution and verify normal page behaviour remains unchanged.
3. Add the realistic Prompt-in-dialog story.
4. Update Dropdown and Prompt API/usage/engineering guidance and the changelog.
5. Run the Muibook/CEM/knowledge builds and manually exercise the regression stories at narrow and wide viewports.

### Acceptance checks

- Normal page Dropdown still portals to `document.body` and behaves unchanged.
- Dropdown inside a custom native modal `<dialog>` renders and receives pointer/focus events above the dialog content.
- Dropdown inside `mui-dialog` is covered if technically supported by the resolver.
- Opening one Dropdown still closes the previous Dropdown across portal roots.
- Escape, outside dismissal, dialog close, and reopen behaviour remain correct.
- Closing the Dropdown or dialog leaves no orphan portal, observer, timer, or document listener.

### Definition of done

- The Dialog / Dropdown top-layer failure has component-level regression coverage.
- A Prompt with Dropdown actions works inside the supported native dialog paths without application-side MutationObservers or portal reparenting.
- Remaining custom-overlay responsibilities are documented in both Dropdown and Prompt guidance without duplicating ownership or introducing speculative public configuration.

---

## DONE | 3. Dialog content sizing does not match the public API

This issue was found while trying to cap a `mui-dialog` Product Canvas flow at a stable viewport-relative size.

### Observed

- Dialog had a public `content-max-height` attribute and an implicit `60vh` body cap.
- Consumers that need a stable tabbed Dialog care about the complete surface, including header and actions, rather than a separate body maximum.
- Keeping both `content-max-height` and `max-height` creates overlapping sizing APIs and makes the effective cap difficult to reason about.

### Plan

- Remove the breaking `content-max-height` API and the internal `60vh` body cap.
- Use `max-height` as the single sizing API for the complete Dialog surface.
- Keep the header and actions visible while the body flexes and scrolls within the remaining height.

### Acceptance checks

- Dialog no longer observes, documents, or applies `content-max-height`.
- The body no longer has an independent `60vh` maximum.
- Valid `max-height` values such as `72dvh`, `30rem`, and `calc(100dvh - var(--space-800))` cap the complete surface.
- The complete Dialog respects `max-height`, header and actions remain visible, content scrolls when needed, and shorter content retains its natural height.
- Dialog API, usage guidance, engineering guidance, stories, changelog, Custom Elements Manifest, and generated knowledge all describe the shipped behaviour consistently.
