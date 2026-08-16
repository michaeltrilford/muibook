import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ColorInput: {
    title: "Color Input",
    description:
      "Color Input lets users choose a colour with the platform picker while keeping a readable hexadecimal value visible in the control.",
    namedSlots: {
      description: "Use slot='description' for rich supporting guidance, or slot='before' and slot='after' for companion previews, typography samples, badges, and action triggers.",
      list: ["description", "before", "after"],
    },
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-color-input/index.ts"],
    website: ["https://muibook.com/color-input"],
    usage: {
      list: [
        "Use Color Input for direct visual colour selection when a six-digit hexadecimal value is appropriate, such as theme builders, data series palettes, branding editors, and canvas configuration.",
        "Provide a specific label that describes the colour's role, such as Primary colour, Chart accent, or Background tint, instead of arbitrary technical names.",
        "Use slot='after' or slot='before' to place companion previews or actions beside the control with configurable gap (defaults to var(--space-400)).",
        "Slotted elements (such as mui-avatar, mui-badge, mui-heading, or custom swatches) automatically receive usage='color-input' and the matching size ('x-small', 'small', 'medium', or 'large') to align with the control's height scale and compute WCAG contrast.",
        "The hexadecimal code is click-to-copy by default with an assistive tooltip ('Copy value') and dispatches a copy event upon copying.",
        "Use hide-value to present a clean solid colour swatch when text display is not needed or space is tight.",
        "Use hide-label when the surrounding UI context (such as an inline table cell or explicit visual section) already identifies the colour role.",
        "Use description for persistent neutral guidance or slot='description' with mui-body when the guidance needs rich inline content.",
        "Description typography follows the Color Input size one step down: xx-small, x-small, small, then medium.",
        "Keep application state on the host value property or attribute and read event.detail.value from input and change events.",
        "Use size='x-small|small|medium|large' to align the control with adjacent form fields.",
        "Use Field for validation or status feedback below the control; description remains neutral guidance shown before and during selection.",
      ],
    },
    accessibility: {
      designerList: [
        "Use a visible label unless the surrounding context makes the colour role unambiguous.",
        "Do not rely on the selected colour alone to communicate meaning; the hexadecimal value remains visible as text by default.",
        "Ensure companion previews and slotted actions maintain adequate contrast against their backgrounds.",
        "When using hide-value, ensure adjacent content or companion previews provide context for users who cannot distinguish colours.",
      ],
      engineerList: [
        "The label and native colour input are associated through matching for and id values.",
        "When the description attribute or slot is populated, the native input references the generated description wrapper with aria-describedby.",
        "hide-label visually hides the label without removing the native input's accessible name.",
        "The visible hexadecimal text automatically switches between black and white for contrast against the selected colour.",
        "The disabled state is forwarded to the native colour input.",
        "Keyboard users can tab directly to the colour picker to open the platform palette and tab to the copy button to trigger clipboard copying.",
      ],
    },
    anatomy: {
      image: "",
      list: [
        "Label: Names the colour role and activates the native control when selected.",
        "Description: Optional persistent guidance placed between the label and control.",
        "Colour surface: Displays the currently selected colour and opens the platform picker.",
        "Value: Shows the current six-digit hexadecimal value with contrast-aware text and click-to-copy interaction.",
        "Before/After slots: Houses companion live previews (such as avatars, badges, headings, or custom swatches) and actions.",
      ],
    },
    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "A labelled colour control showing its current hexadecimal value.",
          image: "",
        },
        {
          key: "description",
          title: "Supporting Description",
          description: "Adds persistent neutral guidance between the label and colour surface.",
          image: "",
        },
        {
          key: "hide-value",
          title: "Hide Value",
          description: "Visually hides the hexadecimal text inside the control, presenting a clean solid colour surface.",
          image: "",
        },
        {
          key: "hide-label",
          title: "Hide Label",
          description: "Visually hides the label while preserving the accessible name for screen readers.",
          image: "",
        },
        {
          key: "disabled",
          title: "Disabled",
          description: "Keeps an unavailable colour visible while preventing interaction.",
          image: "",
        },
      ],
    },
    stories: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "A labelled Color Input with a controlled hexadecimal value.",
          list: ["Provide a role-specific label and initialise value with a six-digit hexadecimal colour."],
        },
        {
          key: "palette-settings",
          title: "Palette Settings",
          description: "Combines several Color Inputs into a realistic theme settings composition with live previews across all densities.",
          list: [
            "Describe the purpose of each colour instead of repeating the current value in the label.",
            "Use slot='after' to position live companion previews alongside the input control, separated by the default gap (var(--space-400)).",
            "Slotted avatars, badges, headings, and swatches automatically align to control height and inherit the input size ('x-small', 'small', 'medium', or 'large').",
            "Pair colour-only previews with text or another visible identifier so colour is not the sole source of meaning.",
          ],
        },
        {
          key: "supporting-description",
          title: "Supporting Description",
          description: "Compares plain and slotted supporting guidance associated with the native colour input.",
          list: [
            "Use description for plain guidance that should remain visible while the colour is changed.",
            "Use slot='description' with mui-body for rich guidance containing an inline link or other text content.",
          ],
        },
        {
          key: "sizes",
          title: "Sizes",
          description: "Compares the supported Color Input size scale and its matching description typography.",
          list: ["Choose the same size as adjacent form controls to keep labels, guidance, and control heights aligned."],
        },
        {
          key: "hide-value",
          title: "Hide Value",
          description: "Visually hides the hexadecimal text inside the control, presenting a clean solid colour surface.",
          list: [
            "Use hide-value when the visual colour swatch alone is sufficient or when space is constrained.",
            "Clicking anywhere on the solid swatch activates the native colour picker.",
          ],
        },
        {
          key: "hide-label",
          title: "Hide Label",
          description: "Visually hides the label while keeping it available as the native input's accessible name.",
          list: ["Use hide-label only when surrounding content clearly communicates the colour role."],
        },
        {
          key: "disabled",
          title: "Disabled",
          description: "Shows an unavailable colour choice without removing its current value or supporting context.",
          list: ["Use disabled when the colour is temporarily unavailable but still useful for context."],
        },
      ],
    },
    compositions: {
      description: "Common compositions combining Color Input with avatars, badges, headings, and custom preview swatches.",
      items: [
        {
          key: "theme-palette-editor",
          name: "Theme Palette Editor",
          description: "A settings form using Color Input with slotted previews to configure brand and interface tokens in real time.",
        },
        {
          key: "chart-series-customizer",
          name: "Chart Series Customizer",
          description: "Compact Color Inputs paired with chart legends to customize individual series colours.",
        },
      ],
    },
    related: {
      items: [
        { name: "Input", link: "https://guides.muibook.com/input" },
        { name: "Range Input", link: "https://guides.muibook.com/range-input" },
        { name: "Chip Input", link: "https://guides.muibook.com/chip-input" },
        { name: "Field", link: "https://guides.muibook.com/field" },
        { name: "Hint", link: "https://guides.muibook.com/hint" },
        { name: "Avatar", link: "https://guides.muibook.com/avatar" },
      ],
    },
  },
};
