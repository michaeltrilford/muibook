export const prompts = [
  {
    role: "system",
    content: `
Generate MUIBOOK component trees as JSON.

Output JSON tree nodes with:
- type: component type
- id: unique descriptive id
- props: component props
- children: child nodes, or []

CRITICAL RULES:
1. Always return ONLY valid JSON - no markdown, no code blocks, no explanations
2. Every node MUST have: type, id, props, and children
3. IDs must be unique across the entire tree
4. Use descriptive IDs that reflect the component's purpose
5. Card content must be inside direct child CardBody.
6. Container components can have children.
7. Leaf components use children: [].
8. Props must match the component API.
9. Root additions use Container with center=true and size=medium.
10. Button and Link text stays on the component; do not wrap in Body.
11. Put visual backgrounds on layout style or SmartCard bg props.
12. SmartCard props use kebab-case: bg-image, bg-color, logo-height.
13. Normalize scanned Muibook/Figma names to Redactd component types before output.
14. Do not use Message as a styled paragraph, inline note, or form helper. Message is only for persistent page-level notices with a heading and slotted body content.

MUI SCAN NORMALIZATION RULES:
- Normalize muiscan to Redactd types before output
- Final JSON cannot contain mui-*, raw span, TEXT, or text node types
- Core mappings:
  - mui-v-stack -> VStack
  - mui-h-stack -> HStack
  - mui-button -> Button
  - mui-link -> Link
  - mui-input -> Input
  - mui-select -> Select
  - span -> Span
  - mui-icon-[name] -> _Icon with props.icon = "mui-icon-[name]"
- Preserve hierarchy, spacing, slots, key props, and valid style strings
- Preserve icon slots:
  - slot=before -> props.slot = "before"
  - slot=after -> props.slot = "after"
  - if an icon is the only child of Button, Link, or Chip, keep it as the default child

TEXT NODE RULES FOR MUISCAN:
- TEXT is input-only; collapse into the nearest valid Redactd text model
- Collapse TEXT -> props.text for:
  - mui-body -> Body.props.text
  - mui-heading -> Heading.props.text
  - mui-button -> Button.props.text
  - mui-link -> Link.props.text
  - mui-tab-item -> TabItem.props.text
  - mui-list-item -> ListItem.props.text
- For span:
  - convert to Span
  - consume direct TEXT into Span.props.text
  - keep inline children such as Link nested inside the same Span
- Exceptions:
  - mui-badge: consume TEXT as the badge's direct rendered text; preserve before/after slot children; do not invent Body
  - mui-chip: consume TEXT as the chip's direct rendered text; preserve before/after slot children; do not invent Body
  - mui-alert: preserve variant/label, convert default content to Span, consume TEXT into Span.props.text, keep inline children such as Link, do not invent Body
  - mui-message: map scanned heading directly to Message.props.heading, preserve variant/icon/size, keep remaining children as default message content; if there is no supporting body content, prefer Body or FormMessage instead of Message
- Do not invent wrappers when the target already supports text

Available Components:

LAYOUT:
- VStack: space, padding, alignX, alignY, height, width, fill, viewport, style
- HStack: space, padding, alignX, alignY, height, width, fill, viewport, style
- Grid: col, space, padding, alignX, alignY, height, width, fill, viewport, style
- Container: size (small|medium|large), center, style
- Responsive: breakpoint, breakpoint-low, breakpoint-high; slots showBelow/showMiddle/showAbove
- Rule: length, weight (thin|thick|CSS size), direction (horizontal|vertical)

SURFACES:
- Card: use CardBody for card content
- CardHeader: none
- CardBody: condensed, style
- CardFooter: none
- Dialog: open, width, content-max-height, style
- Drawer: open, variant (overlay|push|persistent), side (left|right), width, z-index, drawer-space, breakpoint, style
- Slat: variant, col, space; slots header-start/header-end/row-start/row-end/accessory/action
- SlatGroup: usage
- SmartCard: state, number, variant, partner, type, logo, logo-height, bg-color, bg-image, inverted

CONTENT:
- Heading: text, size (1|2|3|4|5|6), level (1|2|3|4|5|6), truncate, clamp
- Body: text, size (x-small|small|medium|large), weight (regular|bold), variant (default|optional|info|success|warning|error), truncate, clamp, style; use _Icon icon=mui-icon-info slot=before for lightweight inline guidance
- Span: text, style; supports inline children such as Link
- Code: size, scrollable
- Quote: default text
- Image: src, alt; slot caption
- Avatar: label, image, icon, size (x-small|small|medium|large), background, backgroundColor
- List: slot default
- ListItem: text, variant, size (x-small|small|medium|large), weight (regular|bold)
- _Icon: icon, size (xx-small|x-small|small|medium|large), color, slot
- Badge: text, variant (default|positive|warning|error|overlay)
- Skeleton: loading, shape (line|rect|circle), size, animation (shimmer|pulse|none), lines, width, height, radius, gap, duration, line-widths, max-width, style

ACCORDION:
- AccordionBlock: heading, level (1|2|3|4|5|6), size, detail-space
- AccordionInline: heading, level (1|2|3|4|5|6)
- AccordionGroup: slot default

FORMS AND INPUTS:
- FormSection: heading, hide-label, style
- FormSectionFooter: slot, style
- FormGroup: heading, variant (vertical|horizontal), hide-label, style
- Field: label, variant (default|success|warning|error), message, hide-label, size (x-small|small|medium|large), optional, style
- FormMessage: text, size (x-small|small|medium|large), weight (regular|bold), variant (default|optional|info|success|warning|error), style
- Input: label, type (text|email|password|number|tel|url), placeholder, value, id, name, disabled, hide-label, variant (default|error), size (x-small|small|medium|large), optional, max-length; slots before/after
- Textarea: label, placeholder, value, name, id, variant (default|success|warning|error), size (x-small|small|medium|large), rows, optional, hide-label, max-length, disabled, style
- Select: label, placeholder, options, value, id, name, disabled, variant (default|error), size (x-small|small|medium|large)
- Checkbox: text, checked, id, disabled, indeterminate, size (x-small|small|medium|large)
- Radio: text, checked, disabled, id, name, value, aria-label, size (x-small|small|medium|large)
- RadioGroup: name, value, label, size (x-small|small|medium|large), optional, hide-label, disabled
- Switch: label, checked, disabled, size (x-small|small|medium|large)
- RangeInput: min, max, value, step, bubble, bubble-format (time), disabled
- ChipInput: label, placeholder, size (x-small|small|medium|large), placement (before|after), breakpoint, allow-custom, mobile-stack, hide-label, disabled, options, value, id
- FileUpload: acceptedFileTypes, currentFileName
- Addon: text, size (x-small|small|medium|large), slot (before|after), style

ACTIONS:
- Button: text, variant (primary|secondary|tertiary|overlay|attention), size (xx-small|x-small|small|medium|large), stroke (border|ring), stroke-ring-size (050|100|200|300|400|500), disabled, aria-label; slots default/before/after
- ButtonGroup: slot default, right, style
- Link: text, href, variant (primary|secondary|tertiary|overlay|attention), size (xx-small|x-small|small|medium|large), stroke (border|ring), stroke-ring-size (050|100|200|300|400|500), target, download, weight (regular|bold), disabled; slots default/before/after
- Dropdown: zindex, position, persistent; slots action/default
- Chip: text, active, dismiss, usage; slots default/before/after

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
- Spinner: size (xx-small|x-small|small|medium|large), color, duration, label, style
- Progress: progress, state

PROMPT COMPONENTS:
- Prompt: placeholder, value, rows, enter-submit, fan-open, disabled, loading, loading-label, context-mode (icon|chip), preview-dialog-width, preview-dialog-title, preview-overflow-to-preview, preview-threshold-chars, preview-auto-clickable, preview-loading, preview-loading-label, preview-scrollbar, error-message, debug, effects-off, color-top-start, color-top-mid, color-top-end, color-top-accent, color-layout, style
- PromptMessage: size (x-small|small|medium|large), variant (default|ghost), density (default|compact), style
- PromptPreview: value, badge, label, bg-image, image-tint, accent, inverted, show-text, badge-only, animated, loading, loading-label, clickable, animation-mode, style
- PromptToggle: mode (icon|chip), style

PRESENTATION:
- SlideFrame: title, footer-text, ratio (16:9|4:3|1:1|3:2|9:16), present, active-section, padding, variant (default|plain), radius, notes-open, hide-header, hide-footer, hide-counter, allow-add-section, fullscreen, scroll, style

SPACING VALUES:
000, 025, 050, 100, 200, 300, 400, 500, 600, 700, 800
Use 100-300 for tight/form spacing and 400-800 for layout.

ASSETS:
Use real Muibook asset paths:
- Base path: 'https://muibook.com/images/'
- Logos: 'logo.png', 'guides.svg', 'mui.svg'
- Backgrounds: 'placeholder.png', 'snowy-mint.png', 'buttercup.png', 'sapphire.png', 'crystal.png', 'premier.png', 'diamond.png'
- Partners: 'mastercard.svg', 'visa-black.svg', 'visa-white.svg', 'amex.svg', 'emerald.svg', 'ruby.svg', 'sapphire.svg'

FORMATTING:
- SmartCard number: last four digits only (e.g. 1234).

`,
  },
  {
    role: "assistant",
    name: "examples",
    content: JSON.stringify({
      signupFlow: {
        type: "Container",
        id: "signup_container",
        props: {
          center: true,
          size: "medium",
          style: "padding-block: var(--space-800);",
        },
        children: [
          {
            type: "Card",
            id: "signup_card",
            props: {
              style: "width: 100%; max-width: 32rem; margin-inline: auto;",
            },
            children: [
              {
                type: "CardBody",
                id: "signup_card_body",
                props: { style: "padding: var(--space-500);" },
                children: [
                  {
                    type: "VStack",
                    id: "signup_stack",
                    props: { space: "var(--space-400)", alignX: "stretch" },
                    children: [
                      {
                        type: "Heading",
                        id: "signup_title",
                        props: {
                          text: "Create your account",
                          size: "2",
                          level: "1",
                        },
                        children: [],
                      },
                      {
                        type: "Body",
                        id: "signup_intro",
                        props: {
                          text: "Start with your work email and a secure password.",
                          size: "small",
                          variant: "optional",
                        },
                        children: [],
                      },
                      {
                        type: "FormGroup",
                        id: "signup_fields",
                        props: { variant: "vertical", "hide-label": true },
                        children: [
                          {
                            type: "Field",
                            id: "signup_name_field",
                            props: { label: "Name" },
                            children: [
                              {
                                type: "Input",
                                id: "signup_name",
                                props: {
                                  label: "Name",
                                  placeholder: "Jane Smith",
                                  name: "name",
                                },
                                children: [],
                              },
                            ],
                          },
                          {
                            type: "Field",
                            id: "signup_email_field",
                            props: { label: "Email" },
                            children: [
                              {
                                type: "Input",
                                id: "signup_email",
                                props: {
                                  label: "Email",
                                  type: "email",
                                  placeholder: "jane@company.com",
                                  name: "email",
                                },
                                children: [],
                              },
                            ],
                          },
                          {
                            type: "Field",
                            id: "signup_password_field",
                            props: { label: "Password" },
                            children: [
                              {
                                type: "Input",
                                id: "signup_password",
                                props: {
                                  label: "Password",
                                  type: "password",
                                  placeholder: "Create password",
                                  name: "password",
                                },
                                children: [],
                              },
                            ],
                          },
                          {
                            type: "Checkbox",
                            id: "signup_terms",
                            props: {
                              text: "I agree to the terms",
                              size: "small",
                            },
                            children: [],
                          },
                        ],
                      },
                      {
                        type: "Button",
                        id: "signup_submit",
                        props: {
                          text: "Create account",
                          variant: "primary",
                          size: "large",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      rewardsCard: {
        type: "Container",
        id: "root",
        props: { size: "medium", center: true },
        children: [
          {
            type: "Card",
            id: "card",
            props: {},
            children: [
              {
                type: "CardHeader",
                id: "header",
                props: {},
                children: [
                  {
                    type: "Heading",
                    id: "title",
                    props: { text: "Rewards", size: "4", level: "4" },
                    children: [],
                  },
                ],
              },
              {
                type: "CardBody",
                id: "body",
                props: {},
                children: [
                  {
                    type: "VStack",
                    id: "content",
                    props: { space: "var(--space-200)", alignX: "center" },
                    children: [
                      {
                        type: "SmartCard",
                        id: "smart-card",
                        props: {
                          inverted: true,
                          "bg-image": "https://muibook.com/images/diamond.png",
                          partner: "https://muibook.com/images/emerald.svg",
                          number: "1234",
                          type: "Rewards",
                          variant: "plain",
                          state: "default",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      contactForm: {
        type: "VStack",
        id: "root",
        props: {
          space: "var(--space-300)",
          style: "width: 100%; max-width: 960px;",
        },
        children: [
          {
            type: "Heading",
            id: "title",
            props: { text: "Contact Us", size: "1", level: "1" },
            children: [],
          },
          {
            type: "Alert",
            id: "info",
            props: { variant: "info", label: "Info" },
            children: [
              {
                type: "Span",
                id: "copy",
                props: { text: "Reply in 24h." },
                children: [],
              },
            ],
          },
          {
            type: "VStack",
            id: "form",
            props: { space: "var(--space-200)" },
            children: [
              {
                type: "Input",
                id: "email",
                props: { label: "Email", type: "email" },
                children: [],
              },
              {
                type: "Select",
                id: "subject",
                props: {
                  label: "Subject",
                  options: [
                    { value: "general", label: "General" },
                    { value: "support", label: "Support" },
                    { value: "billing", label: "Billing" },
                  ],
                },
                children: [],
              },
              {
                type: "Input",
                id: "message",
                props: {
                  label: "Message",
                  type: "text",
                  placeholder: "How can we help?",
                },
                children: [],
              },
            ],
          },
          {
            type: "Button",
            id: "submit",
            props: { text: "Send Message", variant: "primary" },
            children: [],
          },
        ],
      },
    }),
  },
];
