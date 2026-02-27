## Header [Start]

## v12.0.0 (Soon)

[Package](https://www.npmjs.com/package/@muibook/components/v/12.0.0)

## Header [End]

### Added

- Added `mui-skeleton` component for wireframe/prototype loading UI, including `shape`, `size`, `lines`, `line-widths`, `max-width`, and animation options (`shimmer`, `pulsate`, `none`) with controllable animation `duration`.
- Added `mui-range-input` as a reusable range/seek primitive for media and custom input flows.
- Added `mui-form-section-footer` component to standardize footer spacing/divider behavior inside `mui-form-section`.
- Added `mui-prompt-toggle` component for icon↔chip (or custom slotted node) context toggling inside prompt action areas.
- Added `mui-slide-frame` component for composable presentation surfaces with ratio control, present mode section collapsing, and appendable sections.
- Added `mui-prompt` debug mode (`debug`) to render internal submit/status payload feedback without story-only wiring.
- Added `mui-prompt` async preview state controls: `preview-loading` and `preview-loading-label`.
- Added Prompt Preview media-type detection for common URL hosts/extensions (including YouTube/SoundCloud patterns) with VIDEO/MUSIC badge handling.

### Changed

- Prompt family now supports a cleaner end-to-end composition pattern around `mui-prompt`, `mui-prompt-message`, `mui-prompt-preview`, and `mui-prompt-toggle` with built-in submit/toggle behavior and reduced story-side glue code.
- Prompt fan behavior is now normalized so `fan-open` implies fan mode consistently, reducing builder/story mismatches when opening action fans by default.
- Prompt action bars now have stronger defaults for fan/toolbar interactions, internal action ordering, and keyboard-safe hidden action handling.
- Prompt surface interaction visuals were refined for hover/focus states, with tokenized accent/focus customization and optional effects toggle support.
- Prompt default color fallbacks were moved away from `--mui-brand-*` to system color tokens for more portable usage across themes/builders.
- Prompt Preview now supports async/loading and media/icon-first rendering states while preserving dismiss/clickable workflows.
- Prompt Message expanded with explicit size support (`x-small|small|medium|large`), `ghost` variant, and compact density behavior.
- Image now supports `max-height` as a first-class attribute for responsive frame sizing without relying on host inline style overrides.
- Markdown is deprecated from the public package surface in this release line; `mui-markdown` is no longer exported/bundled in package entrypoints.
- Input/Addon composition now enforces consistent slotted sizing between `mui-input`, `mui-addon`, and nested body/icon content across all sizes.
- Field now inherits `size` and `optional` to slotted controls, and inherits `size` to `slot="message"` content for consistent field/message scaling.
- Input, Select, and Textarea labels now scale by control size (`x-small|small|medium|large`) while preserving medium as baseline.
- Input, Select, and Textarea optional label text now follows size-aware stepped scaling (intentionally smaller than label at each tier).
- Switch sizing model was expanded and normalized across `x-small|small|medium|large`.
- Rule contextual styling now automatically adapts inside Card, Form Section, Dialog, and Drawer via host-context attrs (`in-card`, `in-form-section`, `in-dialog`, `in-drawer`).
- Tabs ghost variant now exposes a dedicated box-shadow override token (`--tabs-ghost-box-shadow`) for more controlled visual theming.
- Chip added `ghost` variant support with dedicated background/border hover/focus/active token hooks.

### Fixed

- Fixed prompt preview click/dismiss interaction conflicts so dismiss actions no longer trigger parent preview activation.
- Fixed prompt preview focus/click behavior so keyboard and pointer activation both map cleanly to dialog/open flows.
- Fixed prompt fan open/close inconsistencies between Prompt and Prompt Toggle story setups by enforcing a single fan-mode path when `fan-open` is used.
- Fixed prompt textarea auto-height and bottom action-clearance behavior to prevent overlap/jump issues while typing.
- Fixed media-preview classification edge cases where non-file URLs were incorrectly falling back to generic text badges.
- Fixed docs/runtime mismatch from Form Message naming migration (`mui-form-hint` / `mui-form-message`) to avoid manifest/docs load errors.
- Fixed Field fallback message sizing by removing hardcoded small-size text; fallback now follows Field size.
- Removed `marked` package/peer dependency from the distributable package to avoid CDN/runtime resolution failures tied to markdown export paths.

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
