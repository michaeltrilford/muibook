Available Components:

LAYOUT:
- VStack: slot, space, padding, alignX, alignY, height, width, fill, viewport, style. Use fill (100% width/height) inside bounded parents (CardBody, Drawer) or height for explicit lengths (e.g. "300px"). For bottom positioning, set fill/height on VStack and apply style="align-self: end;" to the slotted child.
- HStack: slot, space, padding, alignX, alignY, height, width, fill, viewport, style
- Grid: slot, col, space, padding, alignX, alignY, height, width, fill, viewport, style
- Container: size (small|medium|large), center, style
- Responsive: variant (container|viewport), observe, breakpoint, breakpoint-low, breakpoint-high; slots show-below/show-middle/show-above
- Rule: length, weight (thin|thick|CSS size), direction (horizontal|vertical)

SURFACES:
- Card: use CardBody for card content. Card has no size prop; width is owned by Grid, Container, the parent layout, or an explicit constrained style.
- CardHeader: none
- CardBody: size (none|small|medium|large), style. Size controls internal padding, not Card width; medium is the default, small is compact, large is spacious, and none is edge-to-edge. Do not set size by default for SlatGroup layouts; leave props empty unless the user explicitly requests a spacing size.
- CardFooter: none
- Dialog: open, width, content-max-height, hide-header, style. Use hide-header for unified/headerless dialogs such as confirmations, or when custom body content provides the heading and dismissal path.
- Drawer: open, variant (overlay|push|persistent|workspace), side (left|right), width, z-index, drawer-space, hide-header, breakpoint, style. For overlay, push, and persistent drawers, use open plus side to control visibility and placement; do not use left-open, right-open, left-width, right-width, page, left, or right. Use hide-header when drawer body content provides a custom header composition or custom dismissal controls. For a single side panel opened by a menu icon, prefer variant="push"; do not use workspace unless the UI is an advanced editor/canvas shell with independent side panels.
- Drawer workspace: variant=workspace, left-open, right-open, left-width, right-width, resize-rail, resize-min-drawer-width, resize-min-left-width, resize-min-right-width, resize-min-page-width, resize-close-threshold, height; slots left/page/right. Use when an editor/canvas has independent left and right panels around a central page. left-open/right-open and left/right/page slots are workspace-only. Keep direct slot wrappers plain in HTML exports when possible.
- Slat: variant (row|header|action), col, space; child slots accessory/start/end. Always explicitly assign variant="row" for standard row slats unless creating a header (variant="header"), interactive row (variant="action"), or custom layout. When Slat is in SlatGroup or CardBody, variant ("row"|"header"|"action") is required to trigger automatic layout and alignment styles. Use col="1fr auto" by default; do not invent custom columns from an image prompt unless the source clearly requires non-default column tracks. Do not use header-start, header-end, row-start, row-end, action, or unslotted wrapper children. Put primary row content in a direct child with props.slot="start", trailing value/status/action content in a direct child with props.slot="end", and optional leading avatar/icon content in a direct child with props.slot="accessory".
- SlatGroup: usage. When SlatGroup is inside CardBody, leave CardBody size unset by default; CardBody detects SlatGroup and applies the correct card spacing automatically.
- SmartCard: state, number, variant, partner, type, logo, logo-height, bg-color, bg-image, inverted

CONTENT:
- Heading: text, size (1|2|3|4|5|6), level (1|2|3|4|5|6|none), truncate, clamp. Use level=none only for prominent values or display text that does not introduce a section; use levels 1-6 for structural headings.
- Body: text, size (xx-small|x-small|small|medium|large), weight (regular|bold), variant (default|secondary|info|positive|warning|attention), truncate, clamp, style; use _Icon icon=mui-icon-info slot=before for lightweight inline guidance
- Span: text, style; supports inline children such as Link
- Code: size, scrollable
- Quote: default text
- Image: src, alt; slot caption
- Avatar: label, image, icon, size (x-small|small|medium|large), background, backgroundColor
- AvatarChip: primary, secondary, image, label, href, target, size (x-small|small|medium|large), usage (default|media-player); slots primary/secondary. Use for compact identity metadata with an avatar and one or two text/link lines. MediaPlayer applies usage=media-player automatically when slotted into media metadata.
- List: slot default
- ListItem: text, variant, size (x-small|small|medium|large), weight (regular|bold)
- _Icon: icon, size (xx-small|x-small|small|medium|large), color, slot
- _Illustration: illustration, size (x-small|small|medium|large|x-large), color, slot
- Badge: text, variant (default|neutral|positive|warning|error|overlay), color (grey|purple|violet|pink|magenta|red|orange|amber|yellow|lime|green|teal|cyan|blue|indigo|CSS background value). Use for compact non-interactive presentational metadata, counts, and lightweight state-like labels such as Offline, Online, Busy, Do not disturb, Beta, Default, IMG, or Shared when the surrounding UI already explains the object. Good inside cards, messages, chips, buttons, tabs, navigation, and hero or marketing surfaces. Use color to override the badge background only through theme-aware badge background tokens; do not use positive, warning, or attention just to get a different background colour.
- Status: text, variant (info|positive|warning|attention), color (grey|purple|violet|pink|magenta|red|orange|amber|yellow|lime|green|teal|cyan|blue|indigo), size (x-small|small|medium); slots before/after. Use for compact object or workflow state labels such as Active, Draft, Pending, Review, Blocked, or Synced when the value is the primary state of a record, workflow, or system, especially in tables, slats, dashboards, and data-heavy pages. Use x-small next to badges or in very dense context rows. Status is non-interactive by default, but can be interactive when composed as a trigger or compact state action. Omit variant for default low-emphasis grey status; use variant for semantic feedback and color for non-semantic categorical labels. Use action only when the status is a trigger. Do not use for counts, helper text, paragraph guidance, page-level notices, or decorative metadata.
- Skeleton: loading, shape (line|rect|circle), size, animation (shimmer|pulse|none), lines, width, height, radius, gap, duration, line-widths, max-width, style
- Table: slot default. Use for dense desktop data layouts.
- RowGroup: heading; children Row.
- Row: columns, size (x-small|small|medium); children Cell.
- Cell: action, align-y; children content or action controls.

ACCORDION:
- AccordionBlock: heading, level (1|2|3|4|5|6), size, detail-space
- AccordionInline: heading, level (1|2|3|4|5|6)
- AccordionGroup: slot default

FORMS AND INPUTS:
- FormSection: heading, hide-label, style
- FormSectionFooter: slot, style
- FormGroup: heading, variant (vertical|horizontal), hide-label, style
- Field: label, variant (default|success|warning|error), message, hide-label, size (x-small|small|medium|large), optional, style
- FormMessage: text, size (x-small|small|medium|large), weight (regular|bold), variant (secondary|info|positive|warning|attention), style
- Input: label, type (text|email|password|number|tel|url), placeholder, value, id, name, disabled, hide-label, variant (default|error), size (x-small|small|medium|large), optional, max-length; slots before/after
- Textarea: label, placeholder, value, name, id, variant (default|success|warning|error), size (x-small|small|medium|large), rows, optional, hide-label, max-length, disabled, style
- Select: label, placeholder, options, value, id, name, disabled, variant (default|error), size (x-small|small|medium|large), appearance (native|custom), selected-content (rich|label), col, space, max-height, padding-block, padding-inline. Use options for simple data selects; use Option children only when appearance=custom needs rich composed native option content.
- Option: value, label; children can contain layout/content for Select appearance=custom. Keep Option inside Select only.
- Checkbox: text, checked, id, disabled, indeterminate, size (x-small|small|medium|large)
- Radio: text, checked, disabled, id, name, value, aria-label, size (x-small|small|medium|large)
- RadioGroup: name, value, label, size (x-small|small|medium|large), optional, hide-label, disabled
- Switch: label, checked, disabled, size (x-small|small|medium|large)
- RangeInput: min, max, value, step, bubble, bubble-format (time), disabled
- ChipInput: label, placeholder, size (x-small|small|medium|large), placement (before|after), breakpoint, allow-custom, mobile-stack, hide-label, disabled, options, value, id
- FileUpload: acceptedFileTypes, currentFileName
- Addon: text, size (x-small|small|medium|large), slot (before|after), style

ACTIONS:
- Button: text, variant (primary|secondary|tertiary|overlay|attention), size (xx-small|x-small|small|medium|large), stroke (border|ring), stroke-ring-size (100|200|300|400|500), disabled, aria-label; slots default/before/after
- ButtonGroup: slot default, right, style
- Link: text, href, variant (primary|secondary|tertiary|overlay|attention), size (xx-small|x-small|small|medium|large), stroke (border|ring), stroke-ring-size (100|200|300|400|500), target, download, weight (regular|bold), disabled; slots default/before/after
- Dropdown: size (x-small|small|medium|large), zindex, position, vertical-position, persistent; slot action plus one direct Menu child. Dropdown enforces its size on the trigger and Menu. Do not place menu actions directly inside Dropdown.
- Menu: size (x-small|small|medium|large); direct Body, Button, Link, Input, Select, DatePicker, TimePicker, Textarea, SearchInput, RangeInput, and ChipInput children inherit Menu size. Menu applies size-based inset padding only to direct form-control hosts, without changing the Menu container inset. Direct Body receives action padding; Button and Link receive joined corner treatment.
- Chip: text, active, dismiss, usage; slots default/before/after. Chip labels truncate when constrained; keep text short and let icons/dismiss controls remain visible.
- ChipRail: size, aria-label; children Chip. Use for horizontally scrollable filters and category rails.

NAVIGATION:
- TabBar: speed, controlsPosition, stroke (border|none), active-inset, radius; slots default/controls
- TabItem: text, icon, active, id
- TabController: slot default
- TabPanel: item
- Stepper: direction (horizontal|vertical), activeStep
- Step: title
- CarouselController: slot default, style
- CarouselPanel: item, style

FEEDBACK:
- Message: heading, variant (neutral|positive|info|warning|attention), icon, size (small|medium|large); slot default. Use only for persistent page-level or section-level notices. Always provide a concise heading plus default slot body content, usually Body/List/Link. Do not use for inline guidance, styled text blocks, or form helper text.
- Alert: variant (success|info|warning|error), label; slots default/action
- Loader: loading, animation (pulsate|fade-in|translate), direction (up|right|down|left), duration; slot default
- Spinner: size (xx-small|x-small|small|medium|large|x-large|xx-large), color, duration, label, style
- Progress: progress, state

MEDIA:
- MediaPlayer: src, type (video|audio|youtube|soundcloud), controls (player|none), poster, artwork, media-title, height, waveform, center-play, loading, autoplay, muted, loop; slots meta-before/meta-after. Use meta-before for AvatarChip/title metadata and meta-after for overlay actions such as Subscribe or Buy now. Use variant=overlay on Button/Link actions when over video or artwork.
- VideoThumbnail: src, src-light, src-dark, src-mui-light, src-mui-dark, src-jal-light, src-jal-dark, src-ana-light, src-ana-dark, src-sensei-light, src-sensei-dark, src-paperclip-light, src-paperclip-dark, alt, play, overlay. Use inside video cards when the thumbnail needs to react to brand and light/dark theme.
- ModelViewer: src, ios-src, poster, alt, controls, camera-controls, auto-rotate, ar, loading; slots default/poster. Always include alt and fallback content when a model is important to understanding the page.

PROMPT COMPONENTS:
- Prompt: placeholder, value, rows, enter-submit, fan-open, disabled, loading, loading-label, context-mode (icon|chip), preview-dialog-width, preview-dialog-title, preview-overflow-to-preview, preview-threshold-chars, preview-auto-clickable, preview-loading, preview-loading-label, preview-scrollbar, error-message, debug, effects-off, color-top-start, color-top-mid, color-top-end, color-top-accent, color-layout, style
- ChatMessage: size (x-small|small|medium|large), variant (default|ghost), density (default|compact), style
- PreviewChip: value, badge, label, bg-image, image-tint, accent, inverted, show-text, badge-only, animated, loading, loading-label, clickable, animation-mode, style
- ActionToggle: mode (icon|chip), style

PRESENTATION:
- SlideFrame: title, footer-text, ratio (16:9|4:3|1:1|3:2|9:16), present, active-section, padding, variant (default|plain), radius, notes-open, hide-header, hide-footer, hide-counter, allow-add-section, fullscreen, scroll, style
