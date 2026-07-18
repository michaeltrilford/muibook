---
name: muibook-components
description: Lightweight, generated knowledge of current Muibook Web Components, public attributes, slots, base and semantic tokens, and selected composition examples. Use when Codex needs to create or review Muibook markup or choose valid Muibook components without requiring the Muibook knowledge MCP.
---

# Muibook Components

Use this single-file snapshot of Muibook 21.0.1 when the full knowledge MCP is unavailable or unnecessary.

This skill provides component knowledge. When paired with `redactd-canvas-muibook`, that skill
owns the Redactd tree contract, validation, browser transport, and paste workflow.

## Workflow

1. Search the component reference below for relevant tag names and purposes.
2. Use only the listed public attribute and slot names. Use the MCP when exact types, defaults, events, parts, or component tokens are required.
3. Prefer the listed semantic tokens for meaningful UI styling; use base tokens for foundations.
4. Adapt the embedded compositions when a selected example matches the requested interface.
5. For Redactd Canvas work, hand the selected components or composition tree to
   `redactd-canvas-muibook`. The compositions below already use its canonical
   `{ id, type, props, children }` shape, including slot placement in `props.slot`.
6. If the Muibook MCP is available, use its `start_here` tool for richer or newer guidance. Treat a newer MCP version as authoritative.

## Boundaries

- Do not invent components, attributes, slots, or token names.
- Do not treat internal state or dynamic destination attributes as public props.
- Do not expect exact attribute types, defaults, events, parts, component-specific tokens, full UX guidance, or the complete composition library in this lightweight skill; use the Muibook MCP for those needs.
- Keep native custom-element tag names when writing HTML. When another tool maps names such as `Button` to `mui-button`, follow that tool's schema while preserving the verified public props.
- Do not perform Redactd browser or API transport from this skill. Defer that workflow to
  `redactd-canvas-muibook`.

## Component Reference

- `mui-accordion-block` — Expands a block-level detail region below a generated heading control. Attributes: heading, size, level, detail-space. Slots: detail.
- `mui-accordion-core` — Provides disclosure behaviour for custom slotted summary and detail content. Attributes: open. Slots: summary, detail.
- `mui-accordion-group` — Groups accordion blocks and can restrict expanded state to one block at a time. Attributes: exclusive. Slots: default.
- `mui-accordion-inline` — Expands inline disclosure content below a compact generated heading control. Attributes: heading, level. Slots: detail.
- `mui-action-toggle` — Switches a prompt action between its compact trigger and expanded active content. Attributes: mode. Slots: default.
- `mui-addon` — Adds compact leading or trailing supporting content to an input control. Attributes: slot, size. Slots: default.
- `mui-alert` — Surfaces task-related feedback with an intent icon, message content and optional action. Attributes: variant, label, hide-label, size. Slots: default, action.
- `mui-avatar` — Displays an image, initials, or slotted icon for a represented person or entity. Attributes: label, image, size, background, background-color, status, status-label. Slots: default.
- `mui-avatar-chip` — Composes an avatar, primary label, and secondary label into a compact profile identity pattern for media metadata, creator rows, and compact profile references. Attributes: primary, secondary, image, label, href, target, usage, size. Slots: primary, secondary.
- `mui-avatar-group` — Stacks multiple avatars with controlled overlap and a separating ring. Attributes: size, overlap, label, fan. Slots: default.
- `mui-badge` — Displays compact, non-interactive presentational labels, counts, or lightweight metadata. Use for labels such as Beta, Default, IMG, or Shared when they support the surrounding UI rather than acting as the primary state field for a record. Use Status for state values in tables and slats. Attributes: variant, size, color, usage. Slots: default.
- `mui-body` — Renders body text with semantic size, weight and feedback color treatments. Attributes: size, weight, variant, truncate, clamp. Slots: default, before, after.
- `mui-button` — Triggers an action with semantic button behaviour, visual emphasis variants, and optional leading or trailing content. Attributes: onclick, type, aria-label, disabled, pending, variant, stroke, stroke-ring-size, focus-ring, size, usage, align. Slots: default, before, after.
- `mui-button-group` — Arranges related buttons horizontally or as full-width stacked actions. Attributes: layout, align, right. Slots: default.
- `mui-calendar` — A flexible, accessible calendar grid for selecting dates. Attributes: value, view, min-date, max-date. Slots: none.
- `mui-card` — Frames related content in a bordered surface and coordinates spacing with its slotted card sections. Attributes: footer, borderless. Slots: default.
- `mui-card-body` — Displays the main content area of a card and adapts spacing for known layout components. Attributes: size. Slots: default.
- `mui-card-footer` — Displays supporting actions or code content after the main card body. Attributes: none. Slots: default.
- `mui-card-header` — Displays heading or summary content at the top of a card. Attributes: none. Slots: default.
- `mui-carousel-controller` — Coordinates carousel controls and item panels, with optional automatic rotation. Attributes: auto-rotate, rotate-interval, borderless, radius, swipe. Slots: controls, item.
- `mui-carousel-panel` — Displays content associated with a selected carousel control. Attributes: item. Slots: default.
- `mui-cell` — Displays content inside a table row with optional checkbox or action-column alignment. Attributes: align-y, action, checkbox. Slots: default.
- `mui-chat-message` — Provides a conversation message row with optional avatar content and consistently scaled message content. Attributes: size, variant, align, width, footer-position, footer-visibility. Slots: avatar, header, default, footer.
- `mui-checkbox` — Selects a boolean or indeterminate option with optional slotted label content. Attributes: checked, disabled, id, indeterminate, size. Slots: default.
- `mui-chip` — Displays a compact interactive label for selections, tags, filters, or removable values. Attributes: active, usage, dismiss, size, disabled, variant. Slots: default, before, after.
- `mui-chip-input` — Captures multiple selected values as removable chips with optional searchable or custom additions. Attributes: id, label, hide-label, placeholder, options, value, allow-custom, disabled, size, name, placement, mobile-stack, breakpoint, menu-slot, padding-block, padding-inline, surface. Slots: none.
- `mui-chip-rail` — Displays a horizontal rail of chips with scroll overflow controls and edge masking. Attributes: size, bleed, bleed-inline-size, bleed-block-size, skip-label, aria-label. Slots: default.
- `mui-code` — Displays code or formatted text in a monospace surface. Attributes: size, scrollable, wrap, inline, usage. Slots: default.
- `mui-comparison-chart` — Compares multiple financial time series as absolute, indexed, or percentage-change lines. Attributes: mode, label, value-format, currency, height, scale, interactive, attribution, loading, error, header-stroke. Slots: header, legend, footer.
- `mui-container` — Constrains content to a centered or fixed-width layout band with optional size variants. Attributes: width, center, fluid, small, medium, x-medium, large, x-large, size. Slots: default.
- `mui-context-bar` — Displays a compact prompt context row in the `context-above` or `context-below` slot of `mui-prompt`, usually for an active task, selected context, steering target, or attached instruction. Attributes: none. Slots: default, actions.
- `mui-date-picker` — A composed date and time picker input. Attributes: value, type, label, hide-label, optional, size, variant, menu-slot, padding-block, padding-inline, surface. Slots: none.
- `mui-date-picker-popover` — MuiDatePickerPopover Attributes: none. Slots: none.
- `mui-dialog` — Presents modal content and optional actions in a native dialog surface. Attributes: open, width, content-max-height, close-size, content-padding. Slots: default, title, actions.
- `mui-drawer` — Displays supplementary content as an overlay, push layout, persistent adjacent panel, or workspace shell. Attributes: open, width, height, side, variant, left-open, right-open, left-width, right-width, z-index, drawer-space, close-size, breakpoint, mobile-presentation, resize-rail, resize-min-drawer-width, resize-min-left-width, resize-min-right-width, resize-min-page-width, resize-close-threshold, contained. Slots: default, title, actions, page, left, right.
- `mui-dropdown` — Displays a triggered overlay menu with configurable alignment, direction, and persistent interaction behaviour. Attributes: zindex, position, vertical-position, persistent, size, offset. Slots: action, default.
- `mui-field` — Wraps a form control with shared label, sizing, and message feedback behavior. Attributes: variant, message, label, hide-label, size, optional. Slots: default, message.
- `mui-file-diff` — A component representing a file and its diff stats. Attributes: filename, filepath, additions, deletions, result-slot, card-slot, result-slot-last. Slots: icon.
- `mui-file-icon` — Renders a pinned VSCode Icons file-type SVG from the vscode-icons CDN. Attributes: icon, type, size, label, decorative. Slots: none.
- `mui-file-upload` — Provides a file picker control that displays the current or newly selected file name. Attributes: accepted-file-types, current-file-name, acceptedfiletypes, currentfilename. Slots: none.
- `mui-financial-bar-chart` — Displays time-based financial or economic values as a responsive histogram. Attributes: variant, label, value-format, currency, baseline, height, scale, interactive, attribution, loading, error, header-stroke. Slots: header, footer.
- `mui-financial-chart` — Displays responsive candlestick or area market data with volume and time-range controls. Attributes: type, trend, symbol, currency, interval, height, selected-range, ranges, attribution, loading, error, header-stroke. Slots: none.
- `mui-form-group` — Groups related form controls with optional headings and configurable layout spacing. Attributes: heading, heading-level, heading-space, hide-heading, hide-label, variant, space, aligny. Slots: default.
- `mui-form-message` — Displays helper or validation copy for a form control with optional semantic icon content. Attributes: size, weight, variant. Slots: default, before, after.
- `mui-form-section` — Groups related form controls in a labelled fieldset with optional header and footer content. Attributes: heading, heading-level, disabled, borderless. Slots: default, header, footer.
- `mui-form-section-footer` — Provides consistent spacing for actions and optional divider content in a form section footer. Attributes: none. Slots: default.
- `mui-grid` — Arranges slotted content in a configurable grid with token-based spacing and alignment controls. Attributes: col, space, alignx, aligny, padding, height, width, viewport, fill. Slots: default.
- `mui-h-stack` — Arranges slotted content horizontally with token-based spacing and alignment controls. Attributes: space, aligny, alignx, padding, height, width, viewport, fill, wrap. Slots: default.
- `mui-heading` — Renders heading typography with an independently configurable visual size and semantic level. Attributes: size, level, truncate, clamp. Slots: default.
- `mui-hint` — Displays contextual tooltip content when its trigger receives hover or keyboard focus. Attributes: placement, open, delay, initial-delay, size, disable-on-touch. Slots: default, trigger.
- `mui-icon-accessibility` — MuiIconAccessibility Attributes: size, color. Slots: none.
- `mui-icon-add` — Representative API for Muibook icon glyph elements. Attributes: size, color. Slots: none.
- `mui-icon-ai` — MuiIconAi Attributes: size, color. Slots: none.
- `mui-icon-attention` — MuiIconAttention Attributes: size, color. Slots: none.
- `mui-icon-calendar` — MuiIconCalendar Attributes: size, color. Slots: none.
- `mui-icon-check` — MuiIconCheck Attributes: size, color. Slots: none.
- `mui-icon-checkmark` — MuiIconCheckmark Attributes: size, color. Slots: none.
- `mui-icon-close` — MuiIconClose Attributes: size, color. Slots: none.
- `mui-icon-copy` — MuiIconCopy Attributes: size, color. Slots: none.
- `mui-icon-down-arrow-circle` — MuiIconDownArrowCircle Attributes: size, color. Slots: none.
- `mui-icon-down-chevron` — MuiIconDownChevron Attributes: size, color. Slots: none.
- `mui-icon-ellipsis` — MuiIconEllipsis Attributes: size, color. Slots: none.
- `mui-icon-exclamationmark` — MuiIconExclamationmark Attributes: size, color. Slots: none.
- `mui-icon-game-controller` — MuiIconGameController Attributes: size, color. Slots: none.
- `mui-icon-gear` — MuiIconGear Attributes: size, color. Slots: none.
- `mui-icon-globe` — MuiIconGlobe Attributes: size, color. Slots: none.
- `mui-icon-grid` — MuiIconGrid Attributes: size, color. Slots: none.
- `mui-icon-home` — MuiIconHome Attributes: size, color. Slots: none.
- `mui-icon-info` — MuiIconInfo Attributes: size, color. Slots: none.
- `mui-icon-left-arrow` — MuiIconLeftArrow Attributes: size, color. Slots: none.
- `mui-icon-left-chevron` — MuiIconLeftChevron Attributes: size, color. Slots: none.
- `mui-icon-left-sidebar` — MuiIconLeftSidebar Attributes: size, color. Slots: none.
- `mui-icon-list-and-film` — MuiIconListAndFilm Attributes: size, color. Slots: none.
- `mui-icon-menu` — MuiIconMenu Attributes: size, color. Slots: none.
- `mui-icon-message` — MuiIconMessage Attributes: size, color. Slots: none.
- `mui-icon-moon` — MuiIconMoon Attributes: size, color. Slots: none.
- `mui-icon-movie-clapper` — MuiIconMovieClapper Attributes: size, color. Slots: none.
- `mui-icon-music-microphone` — MuiIconMusicMicrophone Attributes: size, color. Slots: none.
- `mui-icon-music-quarter-note` — MuiIconMusicQuarterNote Attributes: size, color. Slots: none.
- `mui-icon-notification` — MuiIconNotification Attributes: size, color. Slots: none.
- `mui-icon-panel` — MuiIconPanel Attributes: size, color. Slots: none.
- `mui-icon-pin` — MuiIconPin Attributes: size, color. Slots: none.
- `mui-icon-pin-slash` — MuiIconPinSlash Attributes: size, color. Slots: none.
- `mui-icon-play-rectangle` — MuiIconPlayRectangle Attributes: size, color. Slots: none.
- `mui-icon-play-stack` — MuiIconPlayStack Attributes: size, color. Slots: none.
- `mui-icon-rectangle` — MuiIconRectangle Attributes: size, color. Slots: none.
- `mui-icon-rectangle-dashed` — MuiIconRectangleDashed Attributes: size, color. Slots: none.
- `mui-icon-rectangle-left-drawer` — MuiIconRectangleLeftDrawer Attributes: size, color. Slots: none.
- `mui-icon-rectangle-media-text` — MuiIconRectangleMediaText Attributes: size, color. Slots: none.
- `mui-icon-rectangle-right-drawer` — MuiIconRectangleRightDrawer Attributes: size, color. Slots: none.
- `mui-icon-right-chevron` — MuiIconRightChevron Attributes: size, color. Slots: none.
- `mui-icon-search` — MuiIconSearch Attributes: size, color. Slots: none.
- `mui-icon-spinner` — MuiIconSpinner Attributes: size, color. Slots: none.
- `mui-icon-stop` — MuiIconStop Attributes: size, color. Slots: none.
- `mui-icon-subtract` — MuiIconSubtract Attributes: size, color. Slots: none.
- `mui-icon-sun` — MuiIconSun Attributes: size, color. Slots: none.
- `mui-icon-text-below-folder` — MuiIconTextBelowFolder Attributes: size, color. Slots: none.
- `mui-icon-timer` — MuiIconTimer Attributes: size, color. Slots: none.
- `mui-icon-toggle` — Transitions between two slotted icons to communicate an active or expanded state. Attributes: toggle, rotate, morph, size. Slots: start, end.
- `mui-icon-translate` — MuiIconTranslate Attributes: size, color, flip. Slots: none.
- `mui-icon-up-arrow` — MuiIconUpArrow Attributes: size, color. Slots: none.
- `mui-icon-up-chevron` — MuiIconUpChevron Attributes: size, color. Slots: none.
- `mui-icon-warning` — MuiIconWarning Attributes: size, color. Slots: none.
- `mui-illustration-trash` — Representative API for Muibook illustration elements. Attributes: size, color, motion. Slots: none.
- `mui-image` — Frames a slotted image with optional cropping, focal positioning and caption content. Attributes: height, fit, crop, position, zoom, focal-x, focal-y, radius, aspect-ratio. Slots: image, caption.
- `mui-input` — Captures a single text-like form value with label, validation state and composable affordance slots. Attributes: type, name, value, placeholder, id, label, disabled, hide-label, variant, optional, max-length, size, slot-layout, autofocus, menu-slot, padding-block, padding-inline, surface. Slots: before, after, inside-before, inside-after, hint.
- `mui-link` — Provides anchor navigation as an inline link or action-styled link with optional supporting content. Attributes: target, href, variant, disabled, weight, stroke, stroke-ring-size, focus-ring, size, download, usage, align. Slots: default, before, after.
- `mui-list` — Groups ordered or unordered list item content. Attributes: as. Slots: default.
- `mui-list-item` — Renders one text item within a `mui-list`. Attributes: variant, size, weight. Slots: default.
- `mui-loader` — Animates slotted content into view for loading and refresh states. Attributes: loading, animation, direction, duration. Slots: default.
- `mui-market-sparkline` — Displays a compact financial time series as a line, area, or baseline chart. Attributes: type, trend, label, currency, height, baseline, interactive, attribution, loading, error. Slots: header, footer.
- `mui-media-player` — Renders native or embedded audio and video media from a supplied source, with optional Muibook controls for direct media files and composable metadata for titles, avatars, links, badges, and product actions. Attributes: src, type, autoplay, muted, loop, poster, artwork, media-title, height, center-play, loading, controls, waveform. Slots: meta-before, meta-after.
- `mui-menu` — Provides the visual surface and vertical layout for menu actions and grouped overlay content. Attributes: size, inset, width. Slots: default, top, bottom.
- `mui-message` — Presents a persistent page-level notification with an intent icon, heading, and slotted supporting body content. Use Form Message for form guidance and Body with an info icon for lightweight inline notes. Attributes: variant, heading, icon, size. Slots: default.
- `mui-model-viewer` — Renders interactive 3D models using Google's model-viewer custom element, with native model element support in Safari on visionOS 2+ as a progressive enhancement. Attributes: src, ios-src, poster, alt, controls, camera-controls, auto-rotate, ar, loading. Slots: default, poster.
- `mui-preview-chip` — Displays a compact preview of pasted or attached prompt context and optionally opens fuller content. Attributes: value, badge, label, accent, bg-image, image-tint, inverted, badge-only, show-text, animated, animation-mode, variant, clickable, loading, loading-label. Slots: none.
- `mui-progress` — Displays determinate progress or an indeterminate pending or syncing state. Attributes: progress, state. Slots: none.
- `mui-progress-ring` — Displays circular determinate progress with optional generated center text. Use for compact progress summaries in dashboards, cards, tables, and responsive summaries. Attributes: progress, value, max, label, size, display, display-value, color, tooltip, tooltip-trigger, tooltip-placement. Slots: none.
- `mui-prompt` — Provides a rich prompt composer with actions, previews, loading, and feedback states. Attributes: placeholder, value, disabled, rows, enter-submit, actions-fan, fan-open, preview-overflow-to-preview, preview-scrollbar, preview-threshold-chars, preview-auto-clickable, preview-loading, preview-loading-label, preview-dialog-width, preview-dialog-title, preview-dialog-bordered, context-mode, effects-off, color-layout, color-top-start, color-top-mid, color-top-end, color-top-accent, aria-label, aria-labelledby, aria-describedby, error-message, debug, loading, loading-label, ring-option, ring, --preview-chip-dialog-border, ring, ring-start, ring-mid, ring-end. Slots: context-above, context-below, preview, input, actions, actions-right.
- `mui-quote` — Presents quoted content with blockquote styling. Attributes: none. Slots: default.
- `mui-radio` — Selects one labelled option, typically coordinated by `mui-radio-group`. Attributes: checked, disabled, id, name, value, aria-label, size. Slots: default.
- `mui-radio-group` — Coordinates a labelled group of `mui-radio` choices and owns the selected value. Attributes: name, value, disabled, size, label, hide-label, optional. Slots: default.
- `mui-range-input` — Selects a numeric value on a range track with optional formatted value feedback. Attributes: min, max, value, step, disabled, bubble, bubble-format, size, label. Slots: none.
- `mui-responsive` — Switches between slotted layout alternatives at one or two viewport or container breakpoints. Attributes: variant, observe, breakpoint, breakpoint-low, breakpoint-high. Slots: default, showBelow, showMiddle, showAbove.
- `mui-result-bar` — Composes a compact card/slat result row for agent outputs, file edits, generated artefacts, review actions, and similar prompt response sections. Attributes: label, open, rule, variant, col. Slots: accessory, icon, start, after-label, actions, content.
- `mui-row` — Arranges table cells in a configurable column grid. Attributes: columns, size, row-id. Slots: default.
- `mui-row-group` — Groups related table rows and optionally presents them as a heading region. Attributes: heading. Slots: default.
- `mui-rule` — Displays a horizontal or vertical divider with configurable length and weight. Attributes: length, weight, direction. Slots: none.
- `mui-search-input` — Composes mui-input, mui-button and icons into a search affordance that can vertically reveal over adjacent slotted controls. Attributes: id, label, placeholder, value, name, size, disabled, open, autofocus, cancel-label, menu-slot, padding-block, padding-inline, surface. Slots: action, after.
- `mui-select` — Captures one selection from a supplied option list with label and validation styling. Attributes: name, value, id, label, options, disabled, hide-label, variant, optional, size, appearance, selected-content, col, space, max-height, padding-block, padding-inline, surface. Slots: none.
- `mui-skeleton` — Renders placeholder shapes and lines for loading states, with optional before and after slot composition. Attributes: shape, size, width, height, radius, animation, lines, gap, loading, line-widths, max-width, duration. Slots: default, before, after.
- `mui-slat` — Arranges leading and trailing row content with optional action and accessory treatments. Attributes: variant, col, space, radius. Slots: accessory, start, end.
- `mui-slat-group` — Groups related slats and rules with context-aware alignment spacing. Attributes: usage. Slots: default.
- `mui-slide-frame` — Presents slide content in a framed surface with optional chrome, notes and presentation controls. Attributes: ratio, present, active-section, padding, notes-open, variant, title, footer-text, hide-header, hide-footer, scroll, fullscreen. Slots: default, image, header, header-after, header-description, footer, footer-after, notes.
- `mui-slide-section` — MuiSlideSection Attributes: none. Slots: none.
- `mui-smart-card` — Displays a branded payment-style card surface with configurable content and background styling. Attributes: state, number, variant, partner, type, logo, logo-width, logo-height, bg-color, bg-image, inverted. Slots: none.
- `mui-spinner` — Shows an indeterminate loading spinner with scalable size, color, and timing control. Attributes: size, color, duration, label. Slots: none.
- `mui-status` — Communicates a compact object, record, workflow, or system state with optional before and after icons. Use for state values in tables and slats. Status is non-interactive by default, but can be interactive when composed as a trigger or compact state action. Attributes: variant, size, color, action. Slots: default, before, after.
- `mui-step` — Defines an individual step inside `mui-stepper` with a title, state, and optional secondary content. Attributes: state, title, hide-icon. Slots: secondary.
- `mui-stepper` — Displays progress across a multi-step flow with optional interactive navigation. Attributes: direction, active-step, linear, interactive, size. Slots: default.
- `mui-submenu` — Reveals a portalled, viewport-aware nested Menu from a Button inside a parent Menu. Attributes: none. Slots: default.
- `mui-switch` — Toggles a boolean state with a labelled switch control. Attributes: label, disabled, checked, size. Slots: on-icon, off-icon.
- `mui-tab-bar` — Groups related tab items and renders an active selection highlight. Attributes: size, variant, stroke, radius, usage, active-inset, orientation, speed, full-width, controlsPosition. Slots: default.
- `mui-tab-controller` — Coordinates a tab bar and related tab panels by matching selected tab IDs to panel item values. Attributes: none. Slots: default.
- `mui-tab-item` — Interactive tab label controlled by a parent `mui-tab-bar`. Attributes: active, size, variant, id. Slots: default, before, after.
- `mui-tab-panel` — Displays content associated with the selected tab item inside `mui-tab-controller`. Attributes: item. Slots: default.
- `mui-table` — Groups row collections into an accessible table layout. Attributes: highlight, highlight-row, highlight-row-index. Slots: default.
- `mui-textarea` — Captures multi-line text with label, validation state, visible rows and optional character counting. Attributes: name, value, placeholder, id, label, disabled, hide-label, variant, rows, optional, max-length, size, padding-block, padding-inline, surface. Slots: none.
- `mui-time` — A scrolling columnar interface for selecting a specific time of day. Attributes: value, format, step, start, end, variant, header. Slots: none.
- `mui-time-picker` — A time selection input field with an interactive popover. Attributes: value, type, label, hide-label, optional, size, variant, menu-slot, padding-block, padding-inline, surface. Slots: none.
- `mui-time-picker-popover` — MuiTimePickerPopover Attributes: none. Slots: none.
- `mui-v-stack` — Arranges slotted content vertically with token-based spacing and alignment controls. Attributes: space, alignx, aligny, padding, height, width, viewport, fill. Slots: default.
- `mui-video-thumbnail` — Displays a video thumbnail image with optional play affordance, hover treatment, and tokenized frame styling. Attributes: src, src-light, src-dark, src-mui, src-mui-light, src-mui-dark, src-jal, src-jal-light, src-jal-dark, src-ana, src-ana-light, src-ana-dark, src-sensei, src-sensei-light, src-sensei-dark, src-paperclip, src-paperclip-light, src-paperclip-dark, alt, aspect-ratio, loading, decoding, play, overlay, hide-play, src-{brand}-{theme}. Slots: image, meta.
- `mui-work-log` — Displays a compact expandable work summary for agent responses, such as elapsed work time, steps reviewed, checks run, or supporting execution detail. Attributes: label, open, rule, nested, pending, status, variant. Slots: icon, before, after, default.
- `tagName` — MuiIcon Attributes: size, color. Slots: none.

## Token Reference

Base token names:

```text
--font-family, --font-size-10, --font-size-15, --font-size-25, --font-size-50, --font-size-100
--font-size-200, --font-size-300, --font-size-400, --font-size-500, --font-size-600, --font-size-700
--font-size-800, --font-size-900, --font-size-1000, --font-weight-400, --font-weight-500, --font-weight-600
--font-weight-700, --line-height-10, --line-height-15, --line-height-25, --line-height-50, --line-height-100
--line-height-200, --line-height-225, --line-height-300, --line-height-400, --line-height-500, --line-height-600
--line-height-700, --line-height-800, --line-height-900, --line-height-1000, --black, --black-opacity-0
--black-opacity-5, --black-opacity-10, --black-opacity-20, --black-opacity-30, --black-opacity-40, --black-opacity-50
--black-opacity-60, --black-opacity-70, --black-opacity-80, --black-opacity-90, --black-opacity-100, --white
--white-opacity-0, --white-opacity-5, --white-opacity-10, --white-opacity-20, --white-opacity-30, --white-opacity-40
--white-opacity-50, --white-opacity-60, --white-opacity-70, --white-opacity-80, --white-opacity-90, --white-opacity-100
--grey-50, --grey-100, --grey-200, --grey-300, --grey-400, --grey-500
--grey-600, --grey-700, --grey-800, --grey-900, --grey-1000, --grey-1100
--grey-1200, --grey-1300, --grey-1400, --red-100, --red-200, --red-300
--red-400, --red-500, --red-600, --red-700, --red-800, --red-900
--red-1000, --orange-100, --orange-200, --orange-300, --orange-400, --orange-500
--orange-600, --orange-700, --orange-800, --orange-900, --orange-1000, --green-100
--green-200, --green-300, --green-400, --green-500, --green-600, --green-700
--green-800, --green-900, --green-1000, --blue-100, --blue-200, --blue-300
--blue-400, --blue-500, --blue-600, --blue-700, --blue-800, --blue-900
--blue-1000, --radius-100, --radius-150, --radius-200, --radius-300, --radius-400
--radius-500, --radius-600, --radius-000, --space-100, --space-200, --space-300
--space-400, --space-500, --space-600, --space-700, --space-800, --space-000
--space-025, --space-050, --stroke-size-100, --stroke-size-200, --stroke-size-300, --stroke-size-400
--stroke-size-500, --stroke-size-050, --stroke-solid, --stroke-outset, --speed-100, --speed-200
--speed-300, --speed-400
```

Semantic token names:

```text
--categorical-purple-200, --categorical-purple-800, --categorical-violet-200, --categorical-violet-800, --categorical-pink-200, --categorical-pink-800
--categorical-magenta-200, --categorical-magenta-800, --categorical-red-200, --categorical-red-800, --categorical-orange-200, --categorical-orange-800
--categorical-amber-200, --categorical-amber-800, --categorical-yellow-200, --categorical-yellow-800, --categorical-lime-200, --categorical-lime-800
--categorical-green-200, --categorical-green-800, --categorical-teal-200, --categorical-teal-800, --categorical-cyan-200, --categorical-cyan-800
--categorical-blue-200, --categorical-blue-800, --categorical-indigo-200, --categorical-indigo-800, --categorical-purple, --categorical-violet
--categorical-pink, --categorical-magenta, --categorical-red, --categorical-orange, --categorical-amber, --categorical-yellow
--categorical-lime, --categorical-green, --categorical-teal, --categorical-cyan, --categorical-blue, --categorical-indigo
--form-default-text-color, --form-success-text-color, --form-warning-text-color, --form-error-text-color, --form-default-text-color-hover, --form-success-text-color-hover
--form-warning-text-color-hover, --form-error-text-color-hover, --form-default-border-color, --form-success-border-color, --form-warning-border-color, --form-error-border-color
--form-default-border-color-hover, --form-success-border-color-hover, --form-warning-border-color-hover, --form-error-border-color-hover, --form-default-placeholder-color-hover, --form-default-placeholder-color-focus
--feedback-neutral-border-color, --feedback-positive-border-color, --feedback-info-border-color, --feedback-warning-border-color, --feedback-attention-border-color, --feedback-neutral-background
--feedback-positive-background, --feedback-info-background, --feedback-warning-background, --feedback-attention-background, --feedback-neutral-icon, --feedback-positive-icon
--feedback-info-icon, --feedback-warning-icon, --feedback-attention-icon, --feedback-neutral-text, --feedback-positive-text, --feedback-info-text
--feedback-warning-text, --feedback-attention-text, --feedback-neutral-action-background, --feedback-positive-action-background, --feedback-info-action-background, --feedback-warning-action-background
--feedback-attention-action-background, --action-primary-background, --action-primary-background-hover, --action-primary-background-focus, --action-primary-background-disabled, --action-primary-text-color
--action-primary-text-color-hover, --action-primary-text-color-focus, --action-secondary-border-color, --action-secondary-border-color-hover, --action-secondary-border-color-focus, --action-secondary-border-color-disabled
--action-secondary-background, --action-secondary-background-hover, --action-secondary-background-focus, --action-secondary-background-disabled, --action-secondary-text-color, --action-secondary-text-color-hover
--action-secondary-text-color-focus, --action-secondary-text-color-disabled, --action-tertiary-background, --action-tertiary-background-hover, --action-tertiary-background-focus, --action-tertiary-background-disabled
--action-tertiary-text-color, --action-tertiary-text-color-hover, --action-tertiary-text-color-focus, --action-tertiary-text-color-disabled, --action-attention-background, --action-attention-background-hover
--action-attention-background-focus, --action-attention-background-disabled, --action-avatar-background, --action-avatar-background-hover, --surface, --surface-elevated-50
--surface-elevated-100, --surface-elevated-200, --surface-elevated-300, --surface-recessed-50, --surface-recessed-100, --surface-recessed-200
--surface-recessed-300, --shadow-color-thin, --shadow-color-medium, --shadow-color-thick, --outline-color, --border-color
--text-color, --text-color-info, --text-color-positive, --text-color-warning, --text-color-attention, --text-color-secondary
--heading-text-color, --form-default-placeholder-color, --form-default-placeholder-color-disabled, --action-primary-border-color, --action-primary-border-color-hover, --action-primary-border-color-focus
--action-primary-border-color-disabled, --action-primary-text-color-disabled, --action-tertiary-border-color, --action-tertiary-border-color-hover, --action-tertiary-border-color-focus, --action-tertiary-border-color-disabled
--action-overlay-border-color, --action-overlay-border-color-hover, --action-overlay-border-color-focus, --action-overlay-border-color-disabled, --action-overlay-background, --action-overlay-background-hover
--action-overlay-background-focus, --action-overlay-background-disabled, --action-overlay-text-color, --action-overlay-text-color-hover, --action-overlay-text-color-focus, --action-overlay-text-color-disabled
--action-attention-border-color, --action-attention-border-color-hover, --action-attention-border-color-focus, --action-attention-border-color-disabled, --action-attention-text-color, --action-attention-text-color-hover
--action-attention-text-color-focus, --action-attention-text-color-disabled, --backdrop-overlay, --feedback-neutral-border, --feedback-positive-border, --feedback-info-border
--feedback-warning-border, --feedback-attention-border, --action-primary-border, --action-primary-border-hover, --action-primary-border-focus, --action-primary-border-disabled
--action-secondary-border, --action-secondary-border-hover, --action-secondary-border-focus, --action-secondary-border-disabled, --action-tertiary-border, --action-tertiary-border-hover
--action-tertiary-border-focus, --action-tertiary-border-disabled, --action-overlay-border, --action-overlay-border-hover, --action-overlay-border-focus, --action-overlay-border-disabled
--action-attention-border, --action-attention-border-hover, --action-attention-border-focus, --action-attention-border-disabled, --action-font-size, --action-line-height
--action-font-weight, --action-size-xx-small, --action-size-x-small, --action-radius-x-small, --action-padding-block-x-small, --action-padding-inline-x-small
--action-padding-x-small, --action-before-slot-padding-x-small, --action-after-slot-padding-x-small, --action-icon-only-size-x-small, --action-size-small, --action-radius-small
--action-padding-block-small, --action-padding-inline-small, --action-padding-small, --action-before-slot-padding-small, --action-after-slot-padding-small, --action-icon-only-size-small
--action-size-medium, --action-radius-medium, --action-padding-block, --action-padding-inline, --action-padding, --action-before-slot-padding
--action-after-slot-padding, --action-icon-only-padding, --action-icon-only-size, --action-icon-only-size-medium, --action-size-large, --action-radius-large
--action-padding-block-large, --action-padding-inline-large, --action-padding-large, --action-before-slot-padding-large, --action-after-slot-padding-large, --action-icon-only-size-large
--text-line-height-xxs, --text-line-height-xs, --text-line-height-s, --text-line-height-m, --text-line-height-l, --text-font-size-xxs
--text-font-size-xs, --text-font-size-s, --text-font-size-m, --text-font-size-l, --text-font-size, --text-line-height
--border-thin, --border-thick, --shadow-thin, --shadow-medium, --shadow-thick, --outline-thin
--outline-medium, --outline-thick, --form-radius-x-small, --form-radius-small, --form-radius-medium, --form-radius-large
```

## Selected Compositions

These compact JSON trees use the Redactd canvas schema and Muibook composition names such as
`Button` and `Card`. They can be handed directly to `redactd-canvas-muibook` or mapped to native
`mui-*` elements while preserving their verified props.

### signupFlow

```json
{"type":"Container","id":"signup_container","props":{"center":true,"size":"medium","style":"padding-block: var(--space-800);"},"children":[{"type":"Card","id":"signup_card","props":{"style":"width: 100%; max-width: 32rem; margin-inline: auto;"},"children":[{"type":"CardBody","id":"signup_card_body","props":{"style":"padding: var(--space-500);"},"children":[{"type":"VStack","id":"signup_stack","props":{"space":"var(--space-400)","alignX":"stretch"},"children":[{"type":"Heading","id":"signup_title","props":{"text":"Create your account","size":"2","level":"1"},"children":[]},{"type":"Body","id":"signup_intro","props":{"text":"Start with your work email and a secure password.","size":"small","variant":"secondary"},"children":[]},{"type":"FormGroup","id":"signup_fields","props":{"variant":"vertical","hide-label":true},"children":[{"type":"Field","id":"signup_name_field","props":{"label":"Name"},"children":[{"type":"Input","id":"signup_name","props":{"label":"Name","placeholder":"Jane Smith","name":"name"},"children":[]}]},{"type":"Field","id":"signup_email_field","props":{"label":"Email"},"children":[{"type":"Input","id":"signup_email","props":{"label":"Email","type":"email","placeholder":"jane@company.com","name":"email"},"children":[]}]},{"type":"Field","id":"signup_password_field","props":{"label":"Password"},"children":[{"type":"Input","id":"signup_password","props":{"label":"Password","type":"password","placeholder":"Create password","name":"password"},"children":[]}]},{"type":"Checkbox","id":"signup_terms","props":{"text":"I agree to the terms","size":"small"},"children":[]}]},{"type":"Button","id":"signup_submit","props":{"text":"Create account","variant":"primary","size":"large"},"children":[]}]}]}]}]}
```

### rewardsCard

```json
{"type":"Container","id":"root","props":{"size":"medium","center":true},"children":[{"type":"Card","id":"card","props":{},"children":[{"type":"CardHeader","id":"header","props":{},"children":[{"type":"Heading","id":"title","props":{"text":"Diamond Rewards","size":"4","level":"4"},"children":[]}]},{"type":"CardBody","id":"body","props":{},"children":[{"type":"VStack","id":"content","props":{"space":"var(--space-200)","alignX":"center"},"children":[{"type":"SmartCard","id":"smart-card","props":{"inverted":true,"bg-image":"https://muibook.com/diamond.png","partner":"https://muibook.com/emerald.svg","number":"1234","type":"Diamond","variant":"animated"},"children":[]}]}]}]}]}
```

### contactForm

```json
{"type":"VStack","id":"root","props":{"space":"var(--space-300)","style":"width: 100%; max-width: 960px;"},"children":[{"type":"Heading","id":"title","props":{"text":"Contact Us","size":"1","level":"1"},"children":[]},{"type":"Alert","id":"info","props":{"variant":"info","label":"Info"},"children":[{"type":"Span","id":"copy","props":{"text":"Reply in 24h."},"children":[]}]},{"type":"VStack","id":"form","props":{"space":"var(--space-200)"},"children":[{"type":"Input","id":"email","props":{"label":"Email","type":"email"},"children":[]},{"type":"Select","id":"subject","props":{"label":"Subject","options":[{"value":"general","label":"General"},{"value":"support","label":"Support"},{"value":"billing","label":"Billing"}]},"children":[]},{"type":"Input","id":"message","props":{"label":"Message","type":"text","placeholder":"How can we help?"},"children":[]}]},{"type":"Button","id":"submit","props":{"text":"Send Message","variant":"primary"},"children":[]}]}
```

### agentChat

```json
{"type":"VStack","id":"agent_chat_root","props":{"space":"var(--space-600)","alignX":"stretch","style":"max-width: 78rem; margin: 0 auto;"},"children":[{"type":"ChatMessage","id":"agent_chat_user_message","props":{"align":"end","width":"medium","footer-position":"outside"},"children":[{"type":"Body","id":"agent_chat_user_copy","props":{"text":"Review this implementation and summarise the changed files.","size":"medium"},"children":[]}]},{"type":"ChatMessage","id":"agent_chat_response","props":{"variant":"ghost","size":"medium"},"children":[{"type":"WorkLog","id":"agent_chat_work_log","props":{"label":"Worked for 4m 10s","rule":true,"slot":"header"},"children":[{"type":"Body","id":"agent_chat_work_summary","props":{"text":"Reviewed the component APIs, composition, and generated documentation.","size":"x-small"},"children":[]}]},{"type":"Heading","id":"agent_chat_response_title","props":{"text":"Updated the implementation and documentation.","level":"2","size":"6"},"children":[]},{"type":"Body","id":"agent_chat_response_copy","props":{"text":"The response keeps work detail, reviewable output, and follow-up context within one document flow.","size":"small"},"children":[]},{"type":"ResultBar","id":"agent_chat_result","props":{"variant":"accordion","label":"Edited 4 files","rule":true,"open":true},"children":[{"type":"Button","id":"agent_chat_undo","props":{"text":"Undo","variant":"tertiary","size":"x-small","slot":"actions"},"children":[]},{"type":"Button","id":"agent_chat_review","props":{"text":"Review","variant":"secondary","size":"x-small","slot":"actions"},"children":[]}]}]},{"type":"Prompt","id":"agent_chat_prompt","props":{"placeholder":"Ask for follow-up changes...","enter-submit":true,"context-mode":"icon","actions-fan":true},"children":[{"type":"PreviewChip","id":"agent_chat_preview","props":{"value":"Review the agent chat response","badge":"MD","clickable":true,"slot":"preview"},"children":[]},{"type":"ContextBar","id":"agent_chat_context","props":{"slot":"context"},"children":[{"type":"Body","id":"agent_chat_context_copy","props":{"text":"Keep the current implementation scope","size":"x-small"},"children":[]}]},{"type":"ActionToggle","id":"agent_chat_web_toggle","props":{"slot":"actions"},"children":[{"type":"Button","id":"agent_chat_web_action","props":{"context-toggle":true,"variant":"tertiary","icon-only":true,"aria-label":"Toggle web context"},"children":[]},{"type":"Chip","id":"agent_chat_web_chip","props":{"context-chip":true,"dismiss":true,"hidden":true,"text":"Web"},"children":[]}]}]}]}
```
