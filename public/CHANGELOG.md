## Header [Start]

## v17.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/17.0.0)

## Header [End]

### Changed

- Slide Frame section navigation no longer uses swipe gestures; navigation is via controls and keyboard arrows.

---

## Header [Start]

## v16.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/16.0.0)

## Header [End]

### Breaking Changes

- Slide Frame public prop surface was reduced to user-facing controls only.
- Removed Slide Frame public props/paths that were internal or unused in product flows (`present`, `preview`, `lightbox`, `ratio-width`, `ratio-height`, and `ratio="custom"` option).

### Added

- Added `mui-slide-section` as a composable page wrapper for Slide Frame sections.
- Added cancelable Slide Frame `section-add-request` event so apps/builders can provide custom section insertion logic.

### Changed

- Prompt Message layout now uses CSS-only alignment behavior (no runtime multi-line detection state).
- Prompt Message content top-offset spacing is now size-mapped for consistent avatar/text alignment across `x-small|small|medium|large`.
- Slide Frame stories and guidance now use `mui-slide-section` as the page composition pattern.

### Fixed

- Removed internal `multi-line` runtime attribute behavior from `mui-prompt-message`, preventing runtime state from leaking into exported markup.

---

## Header [Start]

## v17.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/17.0.0)

## Header [End]

### Breaking Changes

- Slide Frame public prop surface was reduced to user-facing controls only.
- Removed Slide Frame public props/paths that were internal or unused in product flows (`present`, `preview`, `lightbox`, `ratio-width`, `ratio-height`, and `ratio="custom"` option).

### Added

- Added `mui-slide-section` as a composable page wrapper for Slide Frame sections.
- Added cancelable Slide Frame `section-add-request` event so apps/builders can provide custom section insertion logic.

### Changed

- Slide Frame section navigation no longer uses swipe gestures; navigation is via controls and keyboard arrows.

---

## Header [Start]

## v15.0.1

[Package](https://www.npmjs.com/package/@muibook/components/v/15.0.1)

## Header [End]

### Added

- Added Slide Frame counter numeric stabilization (tabular-number rendering + fixed digit width) to prevent footer counter shifting between section values.

### Changed

- Slide Frame prop/docs/story surface now uses `variant="default|plain"` only (ghost removed from story + prop references).
- Slide Frame changelog/docs/story language updated to component-only usage (removed stale preview/lightbox guidance).

### Fixed

- Removed unused Slide Frame `preview` and `lightbox` behavior from component runtime and public story prop surface.
- Fixed Slide Frame footer counter jitter by rendering stable-width number spans.

---

## Header [Start]

## v15.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/15.0.0)

## Header [End]

### Added

- Added Slide Frame chrome visibility controls: `hide-header` and `hide-footer`.
- Added Slide Frame fullscreen/present toolbar wiring for explicit exit controls and section counter updates.

### Changed

- Slide Frame fullscreen/present layout was refactored so ratio stage fitting is calculated against available frame space (including chrome rows).
- Slide Frame structure now prioritizes frame/stage sizing consistency with explicit `height: 100%` behavior for presentation contexts.

### Fixed

- Fixed Slide Frame fullscreen/present fit regressions that caused content to clip or push footer content off-screen on some viewports.
- Fixed Slide Frame section counter semantics (`active-section` zero-based behavior) and footer text update consistency.

---

## Header [Start]

## v14.0.2

[Package](https://www.npmjs.com/package/@muibook/components/v/14.0.2)

## Header [End]

### Added

- Added `--tabs-ghost-box-shadow` token for `mui-tab-bar[variant="ghost"]` override control.
- Added contextual Rule support for Dialog and Drawer (`in-dialog`, `in-drawer`) to match Card/Form Section behavior.

### Changed

- Deprecated Markdown from the public package surface (`mui-markdown` removed from package exports/bundle entrypoints).
- Prompt fan behavior is now deterministic: `fan-open` drives fan mode consistently across Prompt and Prompt Toggle examples.
- Prompt default accent color fallbacks now use system palette tokens (no `--mui-brand-*` hard dependency).
- Build pipeline now clears `dist/` before compile to prevent stale declaration artifacts.

### Fixed

- Removed `marked` from published runtime/peer dependency paths to avoid CDN ESM resolution failures.
- Fixed Prompt action fan/story parity regressions where slotted actions did not hide/show consistently.
- Fixed field-message inheritance gaps so `mui-field` size/optional behavior propagates cleanly to message content.

---

## Header [Start]

## v14.0.1

[Package](https://www.npmjs.com/package/@muibook/components/v/14.0.1)

## Header [End]

### Added

- Added Prompt surface filter token (`--prompt-surface-filter`) for direct depth/shadow override.
- Added Chip ghost treatment hooks used by Prompt action/context patterns.

### Changed

- Prompt hover/focus mesh effects were refined and tokenized for light/dark tuning without story-side CSS overrides.
- Prompt Preview loading/media states were tightened to prioritize icon/media-first rendering during async transitions.

### Fixed

- Fixed Prompt preview dismiss/open event conflicts (dismiss no longer activates preview dialog click path).
- Fixed Prompt textarea growth/clearance regressions with bottom action bars.

---

## Header [Start]

## v14.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/14.0.0)

## Header [End]

### Added

- Added `mui-skeleton` with shape/size/line controls and configurable shimmer/pulsate/none animation modes.
- Added `mui-range-input` as reusable seek/range primitive.
- Added `mui-form-section-footer` for standardized footer divider/spacing patterns.
- Added `mui-prompt-toggle` for icon/chip (or custom slotted node) context toggling.
- Added `mui-slide-frame` for composable presentation surfaces with ratio and section navigation APIs.
- Added Prompt debug state (`debug`) and async preview controls (`preview-loading`, `preview-loading-label`).
- Added Prompt Preview media detection for YouTube/SoundCloud and extension-based video/audio URLs.

### Changed

- Prompt composition standardized around `mui-prompt`, `mui-prompt-message`, `mui-prompt-preview`, and `mui-prompt-toggle`.
- Prompt action separators moved to consumer composition (`<mui-rule slot="actions">`) for explicit control.
- Prompt Message expanded with `x-small|small|medium|large`, plus `ghost` + compact density variants.
- Image component now supports `max-height` as a first-class sizing attribute.

### Fixed

- Fixed Prompt/Prompt Toggle fan-open behavior drift between examples and component runtime.
- Fixed preview classification fallbacks for non-file media URLs.
- Fixed Form Message naming/docs manifest mismatch after hint/message migration.

---

## Header [Start]

## v13.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/13.0.0)

## Header [End]

### Added

- Added Alert size model (`small|medium|large`) with size-specific padding tokens.
- Added Message size model (`small|medium|large`) with enforced typography/action scaling.
- Added Switch size support across `x-small|small|medium|large`.
- Added design tokens `--grey-150` and `--black-opacity-5`.

### Changed

- Field now inherits `size` to slotted controls and to `slot="message"` content.
- Input, Select, and Textarea labels now scale with control size; optional label copy follows stepped size mapping.
- Addon/Input slot sizing was normalized so slotted body/link/icon align across all control sizes.
- Rule contextual color behavior aligned across Card/Form Section and expanded component surfaces.

### Fixed

- Fixed Alert action/text auto-size mapping inconsistencies in mixed slotted-content layouts.
- Fixed small/medium spacing mismatches in Alert and Message size variants.

---

## Header [Start]

## v12.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/12.0.0)

## Header [End]

### Added

- Added Prompt preview dialog activation defaults (`clickable`/keyboard parity) for slotted previews.
- Added Prompt media preview badges for IMAGE/CODE/JSON/CSS/VIDEO/MUSIC workflows.
- Added Prompt action fan support (`actions-fan`, `fan-open`) for compact toolbar composition.

### Changed

- Migrated agent naming to prompt naming in the component surface (`mui-prompt`, `mui-prompt-message`, `mui-prompt-preview`).
- Prompt examples moved to component-driven behavior (less story-only glue code for submit/toggle/dialog flows).

### Fixed

- Fixed Prompt submit toggle icon reset paths when handling cancel/escape simulation flows.
- Fixed Prompt preview focus ring/activation ordering so keyboard focus state matches click state.

---

## Header [Start]

## v11.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/11.0.0)

## Header [End]

### Added

- Added `mui-textarea` component with support for `label`, `hide-label`, `rows`, `value`, `placeholder`, `disabled`, and validation variants (`success`, `warning`, `error`).
- Added Textarea docs and Muibook story page.
- Added tab-specific semantic tokens for spacing/sizing control (padding, slot padding, gap, edge padding, badge offsets).
- Added `mui-chip-input` component with multi-value chip entry, suggestion list, keyboard navigation, and hidden form input support.
- Added `mui-icon-text-below-folder`.
- Added `xx-small` icon size support and updated icon stories/docs.
- Added Body `before` / `after` slots with automatic icon sizing by body size.
- Added chip-input placement and responsive layout APIs: `placement="before|after"`, `mobile-stack`, and `breakpoint`.
- Added chip-input events for modern integrations: `chip-input-change` and `chip-input-query-change`.
- Added `mui-icon-exclamationmark`.
- Added Stepper sizing support: `size="x-small|small|medium"` (default `medium`) with matching dot/icon sizing tokens.
- Added Alert size tokens: `--alert-padding-large`, `--alert-padding-medium`, `--alert-padding-small`.
- Added `mui-media-player` component with native video/audio and YouTube/SoundCloud embed support.
- Added Media Player docs/story page and Prompt native media examples (`.mp4` / `.mp3`) with View Code.
- Added Dialog `content-max-height` attribute (`none`) for media-first dialog layouts.

### Changed

- Tabs: introduced named slot-driven icon/badge behavior for `mui-tab-item` (`before` / `after`), with automatic icon and badge sizing from tab size.
- Tabs: migrated sizing/spacing from action-token dependency to tab-specific tokens.
- Tabs: updated story coverage for before/after slot patterns, size variants, and default/full-width examples.
- Tabs: added `variant="ghost"` on `mui-tab-bar` to remove outer bar chrome while keeping active-tab emphasis.
- Tabs: `ghost` variant now removes highlight shadow for a clean chrome-free presentation.
- Badge: added size API (`x-small`, `small`, `medium`, `large`) with `medium` as default; sizing is now auto-enforced by host components in Button, Link, and Tab Item.
- Button/Link/Tab Item: added badge slot offset spacing for `before`/`after` usage and aligned small/x-small spacing tiers.
- Checkbox: updated label size mapping so `size="large"` uses medium body typography.
- Chip: decoupled sizing from action tokens and added chip-specific size/radius/padding/gap tokens.
- Chip/Input composition: input now supports controlled slot layout modes for stacked compositions, and chip-input composes with input slots instead of a separate shell.
- Field: added optional message variant coverage in docs/stories.
- Stepper: added component-level state tokens for success, warning, error, disabled, icon color, and dot sizing (`--stepper-*`), with light/dark mappings.
- Stepper: expanded story coverage with representative state flows (error, disabled, checkout, verification) and small/x-small examples.
- Stepper: pending and error states now use `mui-icon-exclamationmark`.
- Progress: added component tokens for syncing/pending customization (`--progress-syncing-bar-background`, `--progress-radius`, `--progress-syncing-width`, `--progress-pending-stripe-size`).
- Alert: added `size="small|medium|large"` with `medium` as default.
- Alert: added `label` override and `hide-label` option for prefix text control.
- Alert: auto-maps slotted content sizing (`mui-body`, `mui-link`) and action slot sizing (`mui-button`, `mui-link`) by alert size.
- Message: added `size="small|medium|large"` with `large` as default (existing behavior), plus size-aware heading/icon/gap scaling.
- Message: enforces slotted `mui-body` and `mui-link` sizes based on message size.
- Form Hint terminology aligned to “Form Message” in component guidance (component/tag remains `mui-form-hint` for compatibility).
- Media Player native controls now include scrub-time hover bubble, time-mode toggle (`elapsed/total` ↔ `remaining/total`), and control hints (Play/Stop, Mute, Time).

### Fixed

- Fixed tab before/after layout alignment and host padding precedence when both slot states are present.
- Tabs (dots): updated focus ring to use `--outline-medium` with `outline-offset: var(--stroke-size-200)` for clearer keyboard focus.
- Checkbox and Radio: disabled state now applies `not-allowed` cursor feedback on label text as well as control input.
- Chip-input: preserved focus/caret while typing and selecting.
- Chip-input: disabled state now keeps dismiss icons visible while preventing removal.
- Stepper interactive behavior now preserves authored `state` and uses internal `resolved-state`, fixing backward navigation getting stuck.
- Stepper vertical timeline now includes a top connector arm with state blend transitions for pending/error.
- Progress: syncing/pending visuals now consume component tokens for width, radius, stripe size, and syncing bar background.
- Alert: corrected small size vertical spacing and action-side padding behavior for `section[has-action]`.
- Alert: corrected inline content/action auto-size mapping (body/link and action controls) across large/medium/small.
- Prompt preview dialog now disables default content max-height/scroll when rendering media so native video/audio sizing remains correct.

---

## Header [Start]

## v10.0.1

[Package](https://www.npmjs.com/package/@muibook/components/v/10.0.1)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Fixed AI icon.

---

## Header [Start]

## v10.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/10.0.0)

## Header [End]

### Added

- Added `mui-icon-pin` and `mui-icon-pin-slash`.
- Added dropdown tokens `--dropdown-offset` and `--dropdown-min-width` with stories for custom offset and menu min-width.

### Changed

- Chip: moved layout/background styles into an internal container; host remains minimal.
- Badge: moved visuals into internal container; host now uses inline-flex to hug content.
- Dropdown: menu uses tokenized offset and min-width; menu box-sizing is border-box; min-width defaults to 15rem.
- Icons story updated to include Pin and Pin Slash.
- Migrated host state styling from classes to attributes across Card, Slat, Accordion Block, Table Cell, Tabs, Switch, Alert, Link, Button, and Dropdown.

### Fixed

- Fixed a know bug on Safari when dealing with tabs and z-index for highlight tab.

---

## Header [Start]

## v9.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/9.1.0)

## Header [End]

### Added

- Body Component: Added Optional variant and updated centralised Usage Guidelines & Prompts
- Added A2UI Prompts to `prompts/index.ts` with JSON tree output

### Changed

- Ensured Disabled attr updates in React
- Input, Select: improve attribute change condition readability

### Fixed

- Card: The parent element should be block by default.

---

## Header [Start]

## v9.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/9.0.0)

## Header [End]

### Added

- Introduced `brand.css` as the base for future JSON → token generation using the Design Token Format Module.
- Added semantic token mapping in `tokens.css` sourced from brand primitives.

### Changed

- Aligned brand primitives to semantic tokens across the system.
- Updated Input, Select, Checkbox, and File Upload to improve event bubbling and React data handling.
- Storefront UI refreshed, theme examples improved, moved to styled dictionary build for serving themes.
- Improved theme loading fallback when non-existent theme is requested.

### Fixed

- Normalised `alignx` and `aligny` to lowercase for safer React prop usage.
- Heading component now responds to attribute changes correctly.
- Dialog wrapper uses display: contents to avoid layout issues when hidden.
- attributeChanged reliability fixes across Alert, Button, Card, Dialog, Grid, Heading, Stacks, Tabs, and others.

---

## Header [Start]

## v8.0.1

[Package](https://www.npmjs.com/package/@muibook/components/v/8.0.0)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Addressed an issue with the --grey-1200 design token.

---

## Header [Start]

## v8.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/8.0.0)

## Header [End]

### Added

- Added a new Avatar component for displaying images, initials, and icons, replacing the mui-slat-accessory component.
- Added new icons to the current icon set.
- Added Avatar support to Button and Slat components with automatic size adjustments.
- Added Avatar detection to Chip component, which automatically applies size="x-small" by default.
- Added Avatar detection to Button and Link components, which automatically set the appropriate avatar size based on action size.
- Added new action-radius tokens for greater control of theme adjustments per action size.
- Added --checkbox-size design token and applied it to the checkbox component.
- Added placeholder text tokens for input elements.
- Added new avatar tokens to provide additional preset background color options for the avatar component.
- Embedded prior guideline data directly in the system, maintaining 100% component parity.
- Added the Custom Element Manifest to the packaged exports.
- Manifest packaged for NPM adoption, making guideline data accessible to tooling.

### Changed

- Updated Drawer and Dialog to use medium-sized icons by default.
- Updated Switch to use size="x-small" by default when an icon is present.
- Updated checkbox icon to use the new checkmark icon and sizing.
- Updated Chip component to control icon size via prop instead of CSS override.
- Updated Dropdown to ensure border radius overrides work with new button sizes.
- Removed height property from addon as it is not required.
- Updated Input and Select to use the default text color tokens.

### Fixed

- Fixed a known Safari bug with web components and the will-change CSS property.
- Fixed semantic HTML errors in the Drawer and Dialog components.
- Fixed hard-coded pixel values in the file upload component.

---

## Header [Start]

## v7.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/7.1.0)

## Header [End]

### Added

- [None]

### Changed

- Updated Alert and Message to use the medium sized icon by default.

### Fixed

- [None]

---

## Header [Start]

## v7.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/7.0.0)

## Header [End]

### Added

- [None]

### Changed

- Reworked the Prompt file for more accurate Model and Agent usage.
- Introduced button sizes | x-small, small, medium, large
- Introduced link button sizes | x-small, small, medium, large
- Updated icon sizes and toggle to support: x-small: 1.6rem | small: 2.1rem | medium: 2.4rem | large: 2.8rem
- Set toggle to default="medium"

### Fixed

- Fixed a width mismatch on the Drawer component.
- Ensured the Drawer `PUSH` & `PERSISTENT` variants are block, not inline.
- Slotted page item inherits overflow: auto and height of 100dvh without user intervention. User is able to override and turn off if required.
- Ensured slotted items in Input don't wrap by default. The parent is flex and causes slotted children to wrap.
- Linked the input background to the Chip component.

---

## Header [Start]

## v6.1.1

[Package](https://www.npmjs.com/package/@muibook/components/v/6.1.1)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Fixed an issue where incorrect CSS targeting caused unexpected behavior. Targeting has been corrected in this release.

---

## Header [Start]

## v6.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/6.1.0)

## Header [End]

### Added

- [None]

### Changed

- Adjusted the CSS Reset to exclude certain design system components from the global box-sizing rule. This prevents layout issues when Web Components are used in traditional light DOM contexts, where those components expect box-sizing: content-box.

### Fixed

- [None]

---

## Header [Start]

## v6.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/6.0.0)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Ensured Rule and Field renders in environments like react.

---

## Header [Start]

## v5.2.1

[Package](https://www.npmjs.com/package/@muibook/components/v/5.2.1)

## Header [End]

### Added

- [None]

### Changed

- [None]

### Fixed

- Ensured the new Drawer background token is applied correctly across relevant parts of the component.

---

## Header [Start]

## v5.2.0

[Package](https://www.npmjs.com/package/@muibook/components/v/5.2.0)

## Header [End]

### Added

- Dialog: Bubbling mui-dialog-open and mui-dialog-close events for external state sync.
- Design tokens: Added tokens for dialog and drawer to allow consistent background color customisation.

### Changed

- [None]

### Fixed

- [None]

---

## Header [Start]

## v5.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/5.1.0)

## Header [End]

### Added

- Drawer: Event bubbling and composition for mui-drawer-open and mui-drawer-close

### Changed

- [None]

### Fixed

- [None]

---

## Header [Start]

## v5.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/5.0.0)

## Header [End]

### Added

- Dropdown Component and stories
- Drawer Component and stories
- Dialog Component and stories
- Progress Component and stories
- Stepper Component and stories
- Design token additions
- Icon additions

### Changed

- Design token adjustments

### Fixed

- Accordion expanded height bugfix

---

## Header [Start]

## v4.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/4.0.0)

## Header [End]

### Added

- Chip Component and stories
- Slat Component and stories
- Checkbox Component and stories

### Changed

- Design token adjustments
- Icon additions

### Fixed

- [None]
