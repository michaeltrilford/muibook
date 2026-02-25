import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Input: {
    title: "Input",
    description: "An input component for capturing user text, styled for consistency across your UI.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-795&t=GMqx21isUVAMpLJp-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/inputs-input--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-input/index.ts"],
    website: ["https://muibook.com/#/input"],
    guides: ["https://guides.muibook.com/input"],

    usage: {
      list: [
        "Ensure the purpose of the input is clear, either through a placeholder text or surrounding context.",
        "Ensure validation feedback is considered when using an input. E.g. Error text.",
        "Ensure the experience has clear focus states to support keyboard accessibility.",
        "Select the appropriate input types for the specific use case. E.g. Text, Email, Password.",
        "Use size='x-small|small|medium|large' to align inputs with surrounding form controls.",
        "Use slot='hint' for contextual overlays, including mui-hint with interactive tooltip content.",
        "Use mui-chip in before/after slots for tag-style contextual input patterns.",
        "Use placeholder text to provide context of the input use; avoid using them as primary labels.",
        "Avoid relying solely on placeholder text for instructions, as it disappears when users start typing.",
        "Use the optional attribute when a field is not required to show a clear (optional) marker in the label.",
        "Use max-length when input limits matter; the component shows a live character count.",
        "In React controlled mode, keep value updates isolated from structural attribute updates (label, type, placeholder, variant) to avoid focus loss while typing.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [
        "A label is required for screen reader support to describe the input's purpose.",
        "If hide-label is used, the label is visually hidden but accessible via aria-label.",
        "The label and input are linked via for and id. If no id is provided, one is generated.",
        "Clear focus styles are shown for keyboard users.",
        "The native disabled attribute is fully supported by assistive tech.",
        "Optional fields can be explicitly communicated with the optional attribute without changing label association.",
        "When max-length is set, users get visible character progress while native maxlength enforcement remains intact.",
        "For React integrations, prefer reading event.detail.value from the web component custom event instead of querying shadow DOM internals.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/5aiWlqSJ4BYCGtXn9MbGd/2734f1771c0e666806060bc85f753927/Input_-_Anatomy.png",
      list: [
        "Label: Describes the purpose of the Input; required for accessibility. Can be hidden if the context is clear. Ensure the label text is still provided for developers to support screen reader access.",
        "Text: The label or placeholder text that describes the input field’s purpose.",
        "Before: Optional icons can be placed before or after the text input for additional functionality or clarity (e.g., search or password visibility icons).",
        "After: Optional icons can be placed before or after the text input for additional functionality or clarity (e.g., search or password visibility icons).",
        "Slot Before: Allows insertion of an Add-On, Select, or Button before the input to provide contextual or interactive elements. Some design craft may be needed to align elements visually in tools like Figma.",
        "Slot After: Allows insertion of an Add-On, Select, or Button after the input to support or clarify the user’s entry. Some design craft may be needed to ensure alignment and spacing look accurate in design tools.",
      ],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description:
            "The standard Input with visible label and no interaction or validation states applied. Used for most form field scenarios.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5t0SMtVRHvOSHiuHZ8jLfS/64da2bbaf5d2f4216f1c876f205c1298/input-default.png",
        },
        {
          key: "hide-label",
          title: "Hide Label",
          description:
            "The label is visually hidden but remains accessible to screen readers. Use when the label context is already clear from surrounding UI. Ensure the label name is documented for developers, as the component requires a label for accessibility.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4wC0xbPgmsMGi6YhMG8PnI/f01da9a977092a2da1e128fbee3325eb/input-hide-label.png",
        },
        {
          key: "hover",
          title: "Hover",
          description:
            "Displays the hover state styling when a pointer is placed over the Input. Useful for demonstrating interactive feedback.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5IXEcxa2RxqubupHmblDhd/ab41eba34289194733a87994b096e95d/input-hover.png",
        },
        {
          key: "focus",
          title: "Focus",
          description:
            "Shows the focus ring or border to indicate that the Input is currently active. Supports accessible keyboard navigation.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4AA4IcIdnov9MfSeY4rSdL/bbaf44297cdd4bd09d626b707dbe5f47/input-focus.png",
        },
        {
          key: "error",
          title: "Error",
          description:
            "Displays a visual error style to indicate invalid input. Used with the Field component to surface validation messaging.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2LYMpJwtH7f8KfPYl0vwAg/385529402b5e73399320c9581c8e1301/input-error.png",
        },
        {
          key: "input-field",
          title: "Input + Field",
          description:
            "Displays a visual error style to indicate invalid input. Used with the Field component to surface validation messaging.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/kSXvQ6D4hvuP3c9bC0ZUa/319272dc75f0b08493753a49c0fbff75/success-message.png",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "user-details",
          name: "User Details (Step 1)",
          description:
            "This composition uses an accordion to contain a step in a multi-step flow. It focuses on input fields with labels, placeholders, and optional states, keeping the layout compact and clear.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1L2XfteVwNBQcFlddTYmfi/c791eb538285e2cfb919342e84228811/accordion-block_-_Variants.png",
        },
        {
          key: "onboarding-form",
          name: "Onboarding Form",
          description:
            "Demonstrates an onboarding form within a card, using logic to confirm terms acceptance. Components include Heading, Input Fields, Checkbox, and Button.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/1NrgynTcdmVVKSYCsQwlOW/5fc4776c1860b498a59a2865b4e57ecb/Card-Onboarding-Composition.png",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Field",
          link: "https://guides.muibook.com/field",
        },
        {
          name: "Select",
          link: "https://guides.muibook.com/select",
        },
        {
          name: "File Upload",
          link: "https://guides.muibook.com/file-upload",
        },
        {
          name: "Add on",
          link: "https://guides.muibook.com/add-on",
        },
      ],
    },

    rules: [
      {
        heading: "",
        description: "",
        doContent: [{ description: "", image: "" }],
        dontContent: [{ description: "", image: "" }],
      },
    ],

    behaviour: {
      list: [""],
    },

    writing: {
      list: [""],
    },
  },
};
