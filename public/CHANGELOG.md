## Header [Start]

## v20.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/20.1.0)

## Header [End]

### Added

- Added `mui-progress-ring` as a standalone component for circular progress visualization, supporting explicit `progress` or `value`/`max` configurations.
- `mui-progress-ring` supports configurable data formatting through `display="auto|none|percent|value|fraction"`, size variants via `size`, and built-in interactive tooltips (`tooltip`, `tooltip-trigger`, `tooltip-placement`).
- Added `mui-time` as a standalone component for handling time selection, supporting a default scrolling wheel dial and a discrete `variant="slots"` interface with `start`, `end`, and `step` configuration.
- `mui-code` now supports an `inline` boolean attribute for displaying code snippets inline with surrounding text (with compact padding, baseline alignment, and nowrap layout by default).
- `mui-drawer` now supports `variant="workspace"` for editor-style layouts with independent left and right panels around a central page or canvas, including `left-open`, `right-open`, `left-width`, `right-width`, `resize-rail`, `resize-min-left-width`, `resize-min-right-width`, `resize-min-page-width`, `resize-close-threshold`, `breakpoint`, and `height` for full control over panel visibility, sizing, and resize behaviour.
- `mui-drawer` now supports a dynamic `mobile` host attribute synced to viewport breakpoints for responsive mobile layouts.
- `mui-drawer` now exposes the shared visual part map on its drawer panel, including `background`, `border`, `border-radius`, `box-shadow`, `opacity`, `transition`, `outline`, and `color`.
- `mui-container` now supports `x-medium` / `size="x-medium"` for a 96rem container between medium and large, plus a string `width` max-width override for precise page constraints. Existing `large` behaviour remains unchanged.
- `mui-button` now supports `pending` for async actions, blocking repeat activation without applying disabled styling and exposing `aria-busy` while work is in flight.
- `mui-media-player` now supports `controls="player" | "none"` for choosing Muibook controls or no controls for direct audio/video media.
- `mui-media-player` now supports `media-title`, `artwork`, and composed `slot="meta-before"` / `slot="meta-after"` content for audio metadata, audio artwork, and video metadata presentations.
- `mui-media-player` now supports `height` for audio metadata and artwork presentations, mapping the prop to `--media-player-audio-height`.
- `mui-media-player` now supports `center-play` for displaying an always-visible centered play/pause action over native video.
- `mui-media-player` now supports `waveform` for opt-in generated audio waveforms, with playback progress reflected on the canvas.
- `mui-media-player` now supports interactive audio waveforms that can be clicked or dragged to scrub audio playback, utilizing pointer capture for seamless tracking outside bounds.
- `mui-media-player` now supports `slot="meta-before"` and `slot="meta-after"` for composing metadata and supporting actions while keeping the media surface clickable between them.
- Added `mui-avatar-chip` for reusable avatar, primary, and secondary profile metadata composition.
- Added `mui-model-viewer` for interactive 3D model previews with GLB/GLTF sources, USDZ Quick Look support, optional AR entry, posters, camera controls, and auto-rotation.
- Added `mui-icon-rectangle-right-drawer` icon component for right-aligned panel toggle controls.
- `mui-hint` now supports `disable-on-touch` for desktop-only hint affordances that should not open on touch-like devices.
- `mui-media-player` controls now include an options menu with Download and Open source actions, using the dropdown component with slotted `mui-link` menu items.
- `mui-media-player` video controls now use a modern rounded overlay treatment with center play, smooth local seek, volume, Picture-in-Picture, fullscreen, and overflow actions.
- `mui-media-player` audio now includes compact player, metadata, and artwork presentations, with richer audio states using the same hover overlay control direction as video.
- Added media-player component tokens for light/dark surface behavior, dark artwork thumbnail border/shadow, overlay controls, range colors, and player shadows.
- Added new media player waveform design tokens (`--media-player-waveform-current-color` and `--media-player-waveform-current-mirror-color`) to separately style active scrub selections and the current playhead position on the waveform canvas.
- Added a media-player seek hover preview segment so users can see the skip target before committing to a new time.
- Added global semantic form radius tokens (`--form-radius-[size]`) for standardized component radii.
- Added new token variables for avatar sizing and typography: `--avatar-xxx-small` and `--font-size-10`.
- Added disabled color tokens for chip surfaces and actions: `--chip-text-color-disabled` and `--chip-dismiss-action-background-disabled`.
- Added `mui-search-input` as a composed search control with a default search field, optional compact action slot, optional after slot for adjacent controls, controlled `open` state, autofocus support, and cancel-to-collapse behavior.
- `mui-input` now supports the native `autofocus` attribute for components and forms that need immediate field focus.
- Added `--app-story-canvas-100` for story-level canvas background overrides across Muibook app themes.
- `mui-table` now supports opt-in animated row highlights with separate `highlight="hover"` and `highlight="select"` modes, `highlight-row` / `row-id`, and `highlight-row-index`.

### Documentation

- Added standalone component documentation story for `mui-time`.
- Added standalone component documentation story for `mui-search-input`, including default, after-slot tab composition, custom-width after content, and controlled-open examples.
- Updated Search Input, Tabs, and Chip stories to use the app-level story canvas background token for contrast-sensitive examples.
- Added an overview page for Knowledge MCP with descriptions of MCP tools, local command, and links to the standalone repository.
- Added Knowledge Resource pages for Design Manifest, Compositions, Rules, and Keywords, including package import paths, dist output paths, and how Knowledge rules/keywords feed the optimized AI Agent outputs.
- Added richer full Knowledge composition examples for media metadata, custom select, drawer workspace, and model viewer patterns, with explicit `compositionConfig` curation so only compact examples ship in the lightweight AI Agent prompt.
- Added Container story quicklinks for jumping between size, width, fluid, and centered examples.
- Added an Inline story card to the Code story page demonstrating inline code snippets within text.
- Added a Button story showing inline async feedback with `Copy`/`Save`, spinner pending states, check-icon success states, and guidance for replacing demo delays with real async work.
- Added Avatar Chip stories covering default, image, linked avatar, custom secondary, and Media Player usage.
- Updated Media Player stories to lead with Muibook player controls and document compact audio, audio metadata, audio waveform, audio artwork, audio artwork waveform, visible play/pause, video metadata, metadata actions, YouTube, and SoundCloud states.
- Updated Media Player examples to show direct `mui-avatar-chip` usage in metadata slots, with mapped responsive actions where needed.
- Updated Media Player documentation with stronger accessibility guidance for opt-in autoplay, slotted metadata actions, and clear media context.
- Updated Drawer documentation and story usage details with clearer height guidance for app-shell, contained, and workspace layouts.
- Updated token stories to include semantic shadow tokens and media-player component tokens.
- Removed standalone `Type: Date` and `Type: Time` stories from the `mui-input` docs, relying on dedicated date/time pickers for explicit examples while preserving native `mui-input` functionality.

### Changed

- Updated optional text color token mappings so `--text-color-optional` meets WCAG AA contrast in supported light and dark themes.
- Updated the default Mui grey ramp, replacing `--grey-150` with `--grey-50` and adding `--grey-1300` / `--grey-1400` so surface depth tokens can map to distinct named stops without runtime color mixing.
- Updated default surface depth mappings so dark mode now separates `--surface`, elevated, and recessed surface stops.
- `mui-time-picker` and `mui-date-picker` now compose the standalone `mui-time` component instead of implementing inner time selection logic.
- Standardized inner day and time slot buttons in calendars and pickers to reuse the core `mui-button` styles with dynamic styling variants based on selection, maintaining focus styles across the UI.
- Removed custom radius CSS variables from `mui-time-picker` and `mui-date-picker` inner elements and standardized on `slotted` host styles to apply dropdown radius configurations.
- `mui-media-player` now uses dedicated local SVG icon components for play, pause, stop, restart, volume, Picture-in-Picture, fullscreen, and overflow controls.
- `mui-media-player` now keeps image/video overlay controls locked to the dark overlay treatment while compact audio and metadata surfaces remain theme-aware.
- `mui-media-player` artwork waveforms now use a stronger image-overlay treatment, while no-artwork waveforms use higher contrast theme-aware canvas colors.
- `mui-media-player` compact time controls now toggle between elapsed and remaining time instead of presenting an inactive action.
- `mui-media-player` control rendering was refactored into smaller helpers and now cleans up document-level fullscreen listeners on re-render/disconnect.
- `mui-media-player` now applies `usage="media-player"` automatically to slotted `mui-avatar-chip` content in metadata slots.
- `mui-media-player` waveform canvas interactions now bypass the parent frame's play/pause click handler to prevent accidental playback toggles.
- `mui-avatar-chip` avatar border and shadow now stay opt-in to `usage="media-player"` instead of appearing on the default avatar chip.
- `mui-drawer` resize rails now trigger a 3-cycle flashing animation (`rail-limit-flash`) when dragging reaches the minimum or maximum width boundaries.
- `mui-drawer` workspace panels now hide inner borders when resize rails are enabled.
- `mui-drawer` workspace and contained-height behaviour now share the `height` value across desktop, mobile overlay, panel, and page regions, with API docs covering workspace slots, resize rail sizing, and close-threshold controls.
- `mui-drawer` resize rails now support keyboard resizing with ArrowLeft/ArrowRight, larger Shift+arrow nudges, and focused workspace-side Escape closing.
- `mui-dropdown` now portals menu contents to avoid clipping in overflow-hidden media player surfaces.
- `mui-hint` now delegates focus to slotted buttons, links, and native controls instead of adding an extra wrapper tab stop, while keeping fallback keyboard focus for plain trigger content.
- `mui-hint` fallback trigger focus now uses the Muibook focus outline with an outset offset instead of the browser default outline.
- Resource navigation now moves Design Manifest out of Setup and into the new Knowledge section.
- `mui-chip` and `mui-chip-input` now dynamically inherit corner radii based on the host input size via `--chip-input-border-radius` to ensure perfectly parallel nested curves.
- `mui-input` slotted inline and hint icons now use slightly larger relative icon sizes for `medium` and `large` inputs.
- `mui-chip` now defaults to `size="medium"`.
- `mui-chip` layout now binds container height explicitly to token heights for all sizes (`x-small`, `small`, `medium`, `large`).
- `mui-chip` slot styling for `before` and `after` icons now targets slots directly (`slot[name="before"]::slotted` and `slot[name="after"]::slotted`) utilizing token math (`calc(var(--space-050) * -1)`) for perfect inner margin alignment, fixing spacing regressions when both before and after icons/avatars are present.
- `mui-chip-rail` rail action controls now scale dynamically across sizes to perfectly match the height of the chips inside the rail.
- Slotted sizing mapped: `mui-avatar` and `mui-badge` slotted inside `mui-chip[size="x-small"]` now resolve to `xx-small`.

### Fixed

- Story template descriptions now escape angle-bracket text so docs can reference element names such as model-viewer without rendering accidental HTML.
- `mui-drawer` in workspace variant now properly respects top and bottom safe-area insets (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`) in the page layout.
- `mui-drawer` mobile overlay panels now respect physical left and right safe-area insets in landscape, keeping drawer content clear of device cutouts while preserving the intended usable drawer width.
- Muibook storefront drawer styling now targets `mui-drawer::part(background)` instead of setting `--drawer-background` on the app shell host, preventing drawer surface styling from leaking into nested component stories.
- `mui-dropdown` now applies matching menu-item width, alignment, and first/last radius treatment to slotted `mui-link` items as well as slotted `mui-button` items.
- `mui-media-player` artwork thumbnail border and shadow now stay dark over artwork in both light and dark themes.
- `mui-media-player` volume icons now update reliably as the user adjusts the volume range.
- `mui-media-player` generated waveforms now repaint when theme or brand attributes change, avoiding stale canvas colors after light/dark theme switches.
- `mui-media-player` no longer applies the shared audio frame shadow to audio presentation wrappers, preventing metadata and artwork surfaces from leaking a shadow outside the intended frame.
- `mui-media-player` Picture-in-Picture and fullscreen controls now use Safari/WebKit video fallbacks, with Picture-in-Picture hidden when unsupported.
- Media Player video stories now provide a poster image so iOS Safari has a stable placeholder before playback.
- `mui-chip-rail` now removes the keyboard-only Skip chip from the tab order when the rail does not overflow.
- `mui-chip-rail` rail edge gradients now use a lower `z-index` to prevent overlay conflicts with floating elements like dropdown menus.
- `mui-dropdown` portaled menus now continue repositioning briefly after open and react to menu resize changes, preventing stale placement until window resize.
- `mui-dropdown` now cleanly closes itself when the viewport is resized instead of attempting to blindly adjust its open position.
- `mui-link` now applies higher specificity rules for dropdown slot border radii to prevent action size radii and icon slot styling from overriding them.
- Story template resource links now collapse into a single `mui-dropdown` on smaller viewports instead of wrapping as individual links.

---

## Header [Start]

## v20.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/20.0.0)

## Header [End]

### Added

- `mui-body` now supports `variant="info"` for lightweight inline informational guidance.
- `mui-body` now supports `truncate` and `clamp` text overflow controls for constrained single-line and multi-line layouts.
- `mui-heading` now supports `truncate` and `clamp` text overflow controls while preserving semantic heading levels.
- `mui-form-message` now supports `variant="info"` for lighter informational form guidance.
- `mui-rule` now supports semantic `weight="thin"` and `weight="thick"` values in addition to custom CSS values.
- `mui-slat variant="action"` now supports `col` and `space` layout controls through the internal action button parts.
- Added canonical `--action-size-*` tokens for shared action control sizing across buttons, links, inputs, selects, tabs, and icon-only controls.
- `mui-button` and action-style `mui-link` now support `stroke="ring"` and `stroke-ring-size` for inset shadow strokes that avoid adding physical border height, defaulting to `stroke-ring-size="100"`.
- Added `mui-status` for compact object and workflow state labels with before/after slots.
- `mui-status` now supports the boolean `action` attribute for interactive status triggers with button semantics, keyboard activation, pointer cursor, and focus styling.
- Added `mui-chip-rail` for horizontal chip overflow with scroll controls, edge masking, size propagation, and configurable mask bleed.
- Added `mui-video-thumbnail` for reusable video poster thumbnails with themeable hover, play affordance, and opt-in border tokens.
- `mui-video-thumbnail` composed card examples now expose `--video-thumbnail-card-hover-background`, `--video-thumbnail-card-hover-edge-width`, and `--video-thumbnail-card-hover-edge-color-token` for themed faux hover surfaces and borders.
- `mui-prompt` now supports `preview-dialog-bordered` and `--prompt-preview-dialog-border` for turning on or customising the internal preview dialog border.
- `mui-tab-bar` now supports `stroke="border"` and `stroke="none"` so bordered and borderless tab bars can align to the action sizing rhythm.
- `mui-tab-bar` now supports `active-inset` for an inset active tab shadow treatment.
- `mui-tab-bar` now supports `radius` for token-based or custom tab radius overrides.
- `mui-step` now exposes `--stepper-title-only` for tuning vertical title-only alignment.

### Changed

- `mui-slat variant="action"` now defaults to `col="minmax(0, 1fr) auto"` so trailing content aligns to the end by default.
- `mui-chip` label color now resolves through `--chip-text-color`, with hover, focus, and active clickable states exposing matching text color tokens.
- `mui-chip-rail` now uses 40px rail actions by default through `--chip-rail-action-size`, and focused slotted items scroll into view with a safe margin that accounts for the edge mask and rail actions.
- `mui-chip-rail` now includes a keyboard-only Skip chip that appears when tabbed to, allowing keyboard users to jump to the final rail action and tab out of long chip collections.
- MuiTube now uses `mui-video-thumbnail` for card poster images, with Paperclip opting into thumbnail borders from theme CSS.
- `mui-video-thumbnail` now keeps play and overlay affordances opt-in and supports slotted metadata for linked card compositions.
- `mui-button` and button-style `mui-link` now use explicit action size `min-height` tokens, with large actions aligned to the 5.6rem control rhythm.
- `mui-addon`, `mui-input`, `mui-select`, and `mui-switch` now reuse the shared `--action-size-*` sizing rhythm instead of older icon-only action size references.
- `mui-tab-item` now resolves its height through the parent tab bar, keeping bordered and borderless tab controls aligned to the same outer action height.
- `mui-body size="large"` now uses the 30px text rhythm and aligns leading inline icons against the larger line-height.
- `mui-hint` now reveals faster by default, using a 500ms delay with support for custom delays down to 250ms.
- `mui-step` now detects whether the `secondary` slot has content and only applies the vertical title-only offset when no secondary content is present.

### Fixed

- `mui-chip` and `mui-file-upload` now reset slotted `mui-button` min-height in compact internal action contexts.
- `mui-input` focused fields now keep their focus ring above hovered before/after slotted controls, while slotted controls still win hover stacking when the input is not focused.
- `mui-input` inside-before affordances now stay visible above the focused input surface, keeping leading search icons from being covered by the focused field.
- `mui-prompt` fan actions now stay anchored in place after the shared action sizing token updates.

---

## Header [Start]

## v19.5.1

[Package](https://www.npmjs.com/package/@muibook/components/v/19.5.1)

## Header [End]

### Fixed

- `mui-h-stack`, `mui-v-stack`, and `mui-grid` now resolve `height`, `width`, `fill`, and `viewport` sizing onto the component host instead of relying on inherited custom properties, preventing nested layout components from inheriting parent viewport or fill sizing.

### Documentation

- `mui-drawer` now documents that push and persistent drawer page content should use a plain `div` as the direct `slot="page"` wrapper, with Stack or other layout components composed inside it.

---

## Header [Start]

## v19.5.0

[Package](https://www.npmjs.com/package/@muibook/components/v/19.5.0)

## Header [End]

### Added

- `mui-h-stack`, `mui-v-stack`, and `mui-grid` now support a `padding` attribute using CSS shorthand values, making inset layout spacing available without internal part overrides or inline styles.
- `mui-grid` now supports `height`, `width`, `fill`, and `viewport` sizing controls for parity with stack layouts and bounded alignment compositions.
- `mui-form-group` now supports `hide-heading` for groups whose visible heading is supplied by surrounding structure; the previous `hide-label` attribute remains accepted as a compatibility alias.

### Changed

- React typings now expose the new Stack and Grid layout controls.
- `mui-form-group` now renders its `heading` consistently as a semantic heading, including groups containing choice controls.

### Fixed

- `mui-h-stack` and `mui-v-stack` now keep default nested content intrinsic unless explicit sizing is requested, preventing unintended full-height stretching inside viewport and drawer layouts.

---

## Header [Start]

## v19.4.0

[Package](https://www.npmjs.com/package/@muibook/components/v/19.4.0)

## Header [End]

### Added

- `mui-h-stack` and `mui-v-stack` now support `height`, `width`, `fill`, and `viewport` sizing controls, allowing aligned content to fill explicit or viewport-height layouts without reaching into internal parts.
- `mui-field` now supports `variant="info"` messages with the matching informational icon and feedback color treatment.
- `mui-form-group` now supports `space`, `aligny`, `heading-space`, and `heading-level` for aligned mixed-control layouts and semantic section headings.
- Added public `--dialog-border` token for opt-in dialog surface borders while preserving the borderless default.
- Added public `--code-background` and `--prompt-preview-code-background` tokens for code and prompt preview code surface overrides.
- `mui-avatar` now supports `size="xx-small"` at 24px, while `size="x-small"` now provides a 32px option aligned to medium switch layouts.

### Changed

- `mui-code` now consumes `--code-background`, and prompt auto-preview code maps its background through `--prompt-preview-code-background`.
- `mui-drawer` header and footer now size intrinsically within its panel layout, keeping drawer content scrollable without fixed footer offsets when custom action content changes footer height.
- `mui-tab-bar` now consumes a complete `--tab-shadow-active` shadow value, backed by `--tab-shadow-active-color`, so active highlight geometry can be overridden without changing component CSS.
- Compact avatar compositions in `mui-chip`, `mui-button`, `mui-link`, and `mui-prompt-message` now use `xx-small` to retain their previous 24px footprint.
- `mui-switch` and `mui-prompt` derived styling variables no longer use private underscore-prefixed names, allowing intentional component-level overrides.

---

## Header [Start]

## v19.3.0

[Package](https://www.npmjs.com/package/@muibook/components/v/19.3.0)

## Header [End]

### Added

- `mui-button` now detects avatar-only composition when the default slot only contains `mui-avatar`, strips standard button chrome/spacing in that mode, and lets the avatar define the final control size.
- `mui-button` now exposes `avatar-only` in its dynamic attribute mapping so builder/runtime integrations can account for the structural state consistently.

---

## Header [Start]

## v19.2.0

[Package](https://www.npmjs.com/package/@muibook/components/v/19.2.0)

## Header [End]

### Added

- Added the new `mui-illustrations` component family with first export `mui-illustration-trash`.
- Added illustration component tokens for public main color, shadow, and size control.

### Changed

- `mui-illustration-trash` now supports theme-aware light/dark rendering and brand-aligned defaults.
- Derived illustration detail/atmosphere color mixing is now handled internally by the component instead of being exposed as public token API.

### Fixed

- `mui-dialog` now matches drawer-style header behavior: when no `slot="title"` content is provided, the header row and built-in close action are not rendered.

---

## Header [Start]

## v19.1.1

[Package](https://www.npmjs.com/package/@muibook/components/v/19.1.1)

## Header [End]

### Fixed

- `mui-input` now maps slotted badges to `xx-small` when the input size is `x-small`, keeping inline badge affordances visually aligned at the smallest size.

---

## Header [Start]

## v19.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/19.1.0)

## Header [End]

### Changed

- Added public `--chip-input-background` token mapping in Muibook tokens for light and dark themes, and aligned `mui-chip-input` to consume that token for its shell background.
- `mui-prompt-toggle` story page now defines and surfaces its public prop types directly in the story-level props panel, keeping props UI mapping out of component docs/CEM.
- `mui-input` now supports `slot="inside-before"` and `slot="inside-after"` for internal leading/trailing affordances, with size-normalized slotted icon/badge treatment and matching story coverage.

### Fixed

- `mui-accordion-block` and `mui-accordion-inline` now respond cleanly to heading/size/detail content updates by re-rendering on observed attribute changes and re-syncing open height when slotted detail content changes; accordion detail slat groups also keep `usage="accordion"` applied.
- Removed the misleading fallback shell background from `mui-chip-input`; the component now relies on the mapped token value instead of an implicit hardcoded color.
- `mui-input` internal affordance spacing now measures actual slotted inside/hint content so padding stays consistent across sizes without relying on runtime attrs.
- `mui-input` now pushes size-aware slot height to slotted `mui-button` / `mui-link` controls, and input-composed buttons keep their flush `000` seam radius across size states.
- `mui-hint` now removes closed tooltip content from layout flow, preventing hidden hint text from creating horizontal overflow.

---

## Header [Start]

## v19.0.1

[Package](https://www.npmjs.com/package/@muibook/components/v/19.0.1)

## Header [End]

### Fixed

- `mui-responsive` now reinitializes when `breakpoint`, `breakpoint-low`, or `breakpoint-high` changes.
- `mui-responsive` now cleans up and rebinds `matchMedia` listeners on disconnect/reconnect.

---

## Header [Start]

## v19.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/19.0.0)

## Header [End]

### Changed

- Added row action size tokens (`--row-action-xxs`, `--row-action-xs`, `--row-action-s`, `--row-action-m`, `--row-action-l`) and surfaced them in token docs.
- Table row sizing now maps `mui-row[size]` to row typography + action-cell sizing (`xx-small|x-small|small|medium|large`, default `medium`).
- `mui-chip-input` option list now uses `mui-button` options for visual parity with system action styles.
- Component token docs now group table action-size tokens under a dedicated Table section.
- Muibook routing now serves `mui-form-message` only; legacy `form-hint` story route/loader wiring was removed.

### Fixed

- `mui-card-body` now treats `condensed` as the final padding override, ensuring spacing remains zero even when helper attrs like `inner-space` / `has-card-slat-group` are present.
- `mui-slat[variant="action"][radius="none"]` now restores outer corners correctly for condensed card flows by applying first/last-of-type corner rules when `condensed-slot` is present.
- `mui-cell[action]` sizing now uses an internal wrapper with `box-sizing: border-box`, preserving outer cell padding while correctly honoring row-driven size tokens.
- Table header/action column alignment now auto-reserves action-column space for empty last header cells when body rows use action cells.
- Updated table stories: removed duplicate generic action story and split action-size coverage into dedicated size stories using dropdown actions.
- `mui-chip-input` no longer re-renders the full component on each input keystroke, preventing caret reversal behavior on desktop and keyboard collapse-per-character on mobile.
- `mui-chip-input` listbox interactions were moved to delegated handlers + targeted list updates for more stable input focus and option selection behavior.
- Removed stale, unserved `mui-form-hint` story file and Muibook `mui-form-hint` app import to avoid duplicate/legacy documentation paths.

---

## Header [Start]

## v18.2.0

[Package](https://www.npmjs.com/package/@muibook/components/v/18.2.0)

## Header [End]

### Changed

- `mui-tab-bar` click handling now resolves `mui-tab-item` via composed event path/closest matching, improving reliability across nested slotted content.
- `mui-body` small-size inline before/after icon fallback offset was tuned for better single-line and wrapped text alignment.
- `mui-hint` now auto-syncs trigger icon/badge size from nearest `mui-body[size]` (or `mui-hint[size]`) when trigger size is not explicitly set.
- Added `--stroke-size-050` (`0.5px`) to the core brand token set and token docs (including generated CSS/JS/iOS/Android outputs).
- Dynamic attributes are now sourced from per-component `dynamic-attrs.json` files and emitted as a generated manifest at `public/dynamic-attrs.json` (also published as `dist/esm/dynamic-attrs.json`).

### Fixed

- `mui-carousel-controller` now targets `mui-tab-bar` / `mui-tab-item` selectors consistently (instead of legacy `tab-bar` / `tab-item`), restoring tab-to-panel sync and initial active panel detection.

---

## Header [Start]

## v18.1.1

[Package](https://www.npmjs.com/package/@muibook/components/v/18.1.1)

## Header [End]

### Fixed

- Dropdown now applies `variant="tertiary"` only when slotted option buttons do not define a variant, preserving explicit variants like `primary`.
- Build output now includes the dropdown default-variant fallback logic for published dist.

---

## Header [Start]

## v18.1.0

[Package](https://www.npmjs.com/package/@muibook/components/v/18.1.0)

## Header [End]

### Changed

- Dropdown now applies `variant="tertiary"` to direct slotted option buttons only when no variant is provided, allowing explicit variants (for example `primary`) to override.
- Dropdown option slot styling now focuses on shape/radius behavior; option color behavior is left to button variants.
- Prompt hover surface now keeps overflow visible so slotted popovers/menus can expand beyond prompt bounds.

### Fixed

- Fixed dropdown option indexing so first/last radius attrs apply only to slotted `mui-button` items.
- Fixed prompt action layering so left/right action slots render above error region overlays.
- Fixed dropdown/table story consistency by standardizing ellipsis action icons and adding explicit size/active-option coverage.

---

## Header [Start]

## v17.0.0

[Package](https://www.npmjs.com/package/@muibook/components/v/17.0.0)

## Header [End]

### Changed

- Slide Frame section navigation no longer uses swipe gestures; navigation is via controls and keyboard arrows.
- Slide Frame radius attribute variants were removed; frame radius is now controlled by component token styling only.

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
