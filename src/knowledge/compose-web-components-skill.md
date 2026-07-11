---
name: compose-web-components-skill
description: Use Muibook components to build complete interfaces with declarative HTML and native slots.
---

# Compose Web Components Skill

Use this skill to correctly combine Mui Web Components (`<mui-*>`) into larger layouts and interfaces. This system is designed around declarative HTML, automated context detection, and native slots, eliminating the need for meaningless wrapper `<div>`s or utility classes.

<mui-body size="large">
Treat compositions as a strict HTML tree of custom elements. 
- **No Wrapper Divs**: Do not use `<div>` or `<span>` to apply CSS grids, flexbox, or margins.
- **Native Slots**: Place children directly inside parent components using the `slot` attribute. 
- **Automated Context**: Parent components automatically detect slotted children and adjust their layout, spacing, and borders accordingly.
</mui-body>

## Building Layouts

When composition CSS adds padding or borders to a constrained component host, set `box-sizing: border-box` so its declared width and height include that inset. Keep shared spacing in the component that owns the composition instead of adding story-only padding classes.

Build 1D and 2D page layouts strictly using the primitive layout components. Pass layout instructions via standard attributes.

```html
<!-- Good: Declarative Layout -->
<mui-container size="medium" center>
  <mui-v-stack space="var(--space-400)">
    
    <!-- 1D Layout -->
    <mui-h-stack alignX="space-between" alignY="center">
      <mui-heading level="1" size="2">Dashboard</mui-heading>
      <mui-button variant="primary" text="Create"></mui-button>
    </mui-h-stack>

    <!-- 2D Layout -->
    <mui-grid col="1fr 300px" gap="var(--space-300)">
       <!-- Main Content -->
       <!-- Sidebar Content -->
    </mui-grid>

  </mui-v-stack>
</mui-container>
```

## Component Combinations (Deep Dive)

Certain components are designed to work together as a single unit. Always follow these structural combinations.

### Card Anatomy

Cards (`<mui-card>`) frame related content. They are structurally divided into a Header, Body, and Footer.

```html
<mui-card borderless>
  <mui-card-header>
    <mui-heading level="2" size="4">Activity</mui-heading>
  </mui-card-header>
  
  <!-- Use condensed to remove default padding for edge-to-edge content like Slats -->
  <mui-card-body condensed>
    <mui-slat-group usage="card">
      <mui-slat variant="row">
         <mui-avatar slot="accessory"></mui-avatar>
         <mui-body slot="start" text="Michael logged in"></mui-body>
         <mui-badge slot="end" text="2m ago"></mui-badge>
      </mui-slat>
    </mui-slat-group>
  </mui-card-body>
  
  <mui-card-footer>
    <mui-button variant="tertiary" text="View all activity"></mui-button>
  </mui-card-footer>
</mui-card>
```

### Forms and Fields

Forms require a strict hierarchy for accessibility and grouping. Use `<mui-form-section>` for major fieldsets, `<mui-form-group>` for layout grouping, and `<mui-field>` to wrap individual inputs.

```html
<mui-form-section heading="Account Details" heading-level="3">
  
  <!-- Form Group handles the responsive layout of the fields -->
  <mui-form-group variant="horizontal">
    
    <mui-field label="First Name">
      <mui-input type="text" placeholder="Jane"></mui-input>
    </mui-field>
    
    <mui-field label="Last Name">
      <mui-input type="text" placeholder="Smith"></mui-input>
    </mui-field>
    
  </mui-form-group>
  
  <!-- Footer slots are reserved for actions -->
  <mui-form-section-footer slot="footer">
    <mui-button variant="primary" text="Save Changes"></mui-button>
  </mui-form-section-footer>
  
</mui-form-section>
```

### React And Form Values

When composing these Web Components in React, keep React at the boundary and let the Web Component own its internals.

- Use wrapper props such as `onValueChange` or `onCheckedChange` that attach native listeners to the custom element host.
- Read `event.detail.value` or `event.detail.checked` from `input` and `change` events.
- Set `value`, `checked`, `disabled`, and similar state on the host element; do not recreate the internal input in React.
- Keep draft typing state local in property panels, then commit to the component tree after debounce, blur, Enter, or an explicit action when live tree updates would disrupt focus or selection.
- Stop keyboard propagation inside property panel inputs when global canvas shortcuts would otherwise delete nodes or trigger builder actions.
- Use `shadowRoot.querySelector(...)` only for direct internal focus or legacy readbacks. Prefer host `focus()` and event detail for normal application logic.

```tsx
<MuiInput
  label="Name"
  value={draftName}
  onValueChange={(value) => setDraftName(String(value))}
/>

<MuiCheckbox
  checked={isEnabled}
  onCheckedChange={(checked) => setIsEnabled(checked)}
/>
```

This matters in builder/property-panel UIs because the same input is both a React control and a Web Component host. React should coordinate state and persistence; the Web Component should keep native input behavior, shadow DOM, accessibility, and emitted events.

### Media and Presentations

Media components like `<mui-media-player>` rely heavily on slots to overlay metadata and controls natively.

```html
<mui-media-player src="audio.mp3" waveform>
  <!-- Overrides fallback title with rich metadata -->
  <mui-h-stack slot="meta-before" space="var(--space-200)">
    <mui-avatar src="artist.jpg"></mui-avatar>
    <mui-v-stack space="var(--space-000)">
      <mui-heading size="5">Song Title</mui-heading>
      <mui-body size="small" variant="secondary">Artist Name</mui-body>
    </mui-v-stack>
  </mui-h-stack>
  
  <!-- Trailing actions overlaid on the media -->
  <mui-button slot="meta-after" variant="tertiary" icon="mui-icon-download"></mui-button>
</mui-media-player>
```

## Slotting & Automated Context

Native HTML `slot` attributes inject your content into specific regions of complex components. 

### Standard Slots
- `slot="start"`: Primary leading content (e.g., placing text in a Slat).
- `slot="end"`: Trailing content (e.g., placing a button in a Slat).
- `slot="accessory"`: Leading visual support (e.g., Avatars or Icons).
- `slot="action"`: Actionable elements placed contextually.
- `slot="meta"` (or `meta-before` / `meta-after`): Metadata layered over surfaces like video thumbnails or media players.

### Automated Context
The system uses automated parent-child context to reduce manual CSS.
- **Parent Detection**: When you place a component into a parent's slot, the parent automatically detects it and adjusts its layout. For example, placing a `<mui-button slot="end">` inside a `<mui-slat>` automatically applies `has-action` to the Slat's host, adjusting grid tracking.
- **Child Styling**: Slotted children automatically adapt based on where they are placed. An `<mui-button>` placed inside an `<mui-form-group>` will automatically align itself with the form fields.

## Prop Knowledge

Drive component state entirely through HTML attributes, avoiding complex JSON blobs where possible.

- **Booleans**: For true/false states, simply add the attribute. Do not pass `"true"` or `"false"`.
  ```html
  <mui-button disabled></mui-button>
  <mui-input readonly></mui-input>
  <mui-form-section borderless></mui-form-section>
  ```
- **Enums**: Use explicit string attributes for variants and sizes.
  ```html
  <mui-button variant="primary" size="large"></mui-button>
  <mui-slat variant="row"></mui-slat>
  ```

## Do's and Don'ts

**Do:** Build layouts strictly using `<mui-stack>` and `<mui-grid>`.
**Don't:** Wrap components in a `<div>` just to apply `margin-top` or `padding`.

```html
<!-- Bad -->
<div style="margin-top: 16px;">
  <mui-button text="Submit"></mui-button>
</div>

<!-- Good -->
<mui-v-stack space="var(--space-300)">
  <!-- preceding content -->
  <mui-button text="Submit"></mui-button>
</mui-v-stack>
```

**Do:** Use native props on the components instead of wrapping them in Typography components just for text.
**Don't:** Slot text components into simple buttons.

```html
<!-- Bad -->
<mui-button>
  <mui-body>Submit</mui-body>
</mui-button>

<!-- Good -->
<mui-button text="Submit"></mui-button>
```

**Do:** Group related inputs inside `<mui-field>` and `<mui-form-group>`.
**Don't:** Manually construct form labels and error messages using basic text components.
