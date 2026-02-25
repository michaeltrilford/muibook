import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Loader: {
    title: "Loader",
    description:
      "The Loader component applies smooth, built-in transitions during page loads, content updates, or skeleton placeholders to maintain a seamless, polished experience.",

    hero: [""],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1059-12710&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/feedback-loader--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-loader/index.ts"],
    website: [""],
    guides: ["https://guides.muibook.com/loader"],

    usage: {
      list: [
        "Wrap any page or UI section with Mui-Loader to automatically display loading animations.",
        "Ideal for initial page loads, content transitions, or skeleton screens while data is fetching.",
        "When crafting skeleton states inside Loader, prefer design tokens, rem units, and percentages over fixed pixel sizes.",
        "Compose placeholders with Muibook layout components such as mui-v-stack, mui-h-stack, and mui-grid for consistent spacing.",
        "Applied to pages or key components for seamless load transitions.",
        "Works seamlessly with other MUI components and layouts without additional setup.",
        "Use with Mui Spinner, skeletons, or other feedback to improve perceived performance.",
      ],
    },

    accessibility: {
      designerList: [
        "The loader is announced to screen readers via role='status', ensuring updates are conveyed politely.",
        "aria-busy is set to true when loading, indicating the region is currently in a 'busy' state.",
        "A visually hidden 'Loading…' text is included by default to provide meaningful content for screen readers, even if the slotted content is purely visual.",
        "The component respects the user’s reduced motion preferences via prefers-reduced-motion, preventing potentially distracting animations.",
        "No additional labels are required from the consumer, making it lightweight and flexible while remaining accessible by default.",
      ],
      engineerList: [
        "The loader is announced to screen readers via role='status', ensuring updates are conveyed politely.",
        "aria-busy is set to true when loading, indicating the region is currently in a 'busy' state.",
        "A visually hidden 'Loading…' text is included by default to provide meaningful content for screen readers, even if the slotted content is purely visual.",
        "The component respects the user’s reduced motion preferences via prefers-reduced-motion, preventing potentially distracting animations.",
        "No additional labels are required from the consumer, making it lightweight and flexible while remaining accessible by default.",
      ],
    },

    anatomy: {
      image: "",
      list: [""],
    },

    variants: {
      items: [
        {
          key: "pulsate",
          title: "Pulsate",
          description: "",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/5gZwRuH4Ojs38xlq7HAMCt/47be2502487c0d85955c203788442d12/pulse.gif",
        },
        {
          key: "fade-in",
          title: "Fade-In",
          description: "",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/xPo8WGtJjoiW5y8gcXFJG/ed432ec413dc4839129139dad546e926/fade-in.gif",
        },
        {
          key: "translate-up",
          title: "Translate: Up",
          description: "Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/4UTi4tmMxdiTDNR0wi5AOt/8d0e21d88eb33c71d1c7f69df8f42772/up.gif",
        },
        {
          key: "translate-down",
          title: "Translate: Down",
          description: "Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/63936AreBgAC7oxohQbLpY/e26318a5b4b6aaa790f363c4180d92ad/down.gif",
        },
        {
          key: "translate-left",
          title: "Translate: Left",
          description: "Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.",
          image:
            "hhttps://images.ctfassets.net/i5uwscj4pkk2/5Rzmo4ISRIfaY5aMAbO1U6/0db9896ce44b9704960fde8bc9b70a07/left.gif",
        },
        {
          key: "translate-right",
          title: "Translate: Right",
          description: "Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/2pzlTEsdJj4FKmnsleLO0T/79a8d4fbecc3953a9ec21772df5ee9ac/right.gif",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "guru-outcomes-dashboard",
          name: "Guru Outcomes - Dashboard",
          description:
            "Use the <mui-loader> component to mask slow network or initial data load times. Combine its features to create a seamless loading experience.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7fsKn4mqKGieVh2D1EdyuR/a9afa145001e13470054aa9d7004127d/outcomes-home.gif",
        },
        {
          key: "guru-outcomes-roadmap",
          name: "Guru Outcomes - Roadmap",
          description:
            "The Loader component in action on the roadmap page, smoothly loading the UI while masking delays and improving perceived performance.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/7Hebis0o1mlvvDZlQRZfzl/f0c06679ab417f2ee624b570226da77d/outcomes-roadmap.gif",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Spinner",
          link: "https://guides.muibook.com/loader",
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
