import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Dropdown: {
    title: "Dropdown",
    description:
      "The dropdown has a trigger action and an overlay menu. The action can use any mui-button variant, while menu options follow a predefined style. The menu auto-positions to stay within the viewport.",

    hero: [
      "https://images.ctfassets.net/i5uwscj4pkk2/18QqPc8T5r5WXHiKAxhrCz/69e6bb23e3b9875b574d6f49966e6e73/Dropdown_-_Home_Image.png",
    ],
    figma: [
      "https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=1059-12740&t=BwezUSymTClm00wJ-1",
    ],
    storybook: ["https://stories.muibook.com/?path=/docs/actions-dropdown--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-dropdown/index.ts"],
    website: ["https://muibook.com/#/dropdown"],
    guides: ["https://guides.muibook.com/dropdown"],

    usage: {
      list: [
        "Dropdowns are ideal for actions that are contextual or used infrequently and do not require constant visibility.",
        "Ensure the trigger is clear by using a label, icon, or ellipsis, and include accessible labels for icon-only triggers.",
        "Keep menu items concise (around 5–7 options). Group related actions and use dividers for clarity to avoid overwhelming users.",
        "Ensure dropdowns remain visible and are not covered by other interface elements. Adjust z-index as needed.",
        "Ensure essential or frequently-used actions are not hidden within a dropdown visible outside the dropdown.",
      ],
    },

    accessibility: {
      designerList: [
        "Built-in Accessibility: The dropdown trigger uses the system button component, providing keyboard navigation, focus states, and ARIA roles out of the box.",
        "Icon-Only Triggers: Ensure tooltips or labels are present so screen readers can interpret the action.",
        "Persistent Dropdowns: Users can interact with inputs or buttons inside the dropdown without losing focus or accessibility support.",
      ],
      engineerList: [
        "Built-in Accessibility: The dropdown trigger uses the system button component, providing keyboard navigation, focus states, and ARIA roles out of the box.",
        "Icon-Only Triggers: Ensure tooltips or labels are present so screen readers can interpret the action.",
        "Persistent Dropdowns: Users can interact with inputs or buttons inside the dropdown without losing focus or accessibility support.",
      ],
    },

    anatomy: {
      image:
        "https://images.ctfassets.net/i5uwscj4pkk2/62rDy7PEOfeUJMNBF6qxw6/568ea65c17aca538a30397cf2eedc00e/Dropdown_-_Anatomy.png",
      list: [
        "ICON ONLY: Use for compact dropdown triggers when the meaning is obvious and space is limited.",
        "LABEL & ICON: Use when clarity is needed. Pair a short label with an icon to indicate the menu opens or expands.",
        "MENU ITEMS: Keep options concise (5–7 items). Group related actions logically and avoid overwhelming users with long lists.",
      ],
    },

    variants: {
      items: [
        {
          key: "",
          title: "",
          description: "",
          image: "",
        },
      ],
    },

    compositions: {
      description: "Showcases actual use cases, demonstrating how the component fits into real-world UI scenarios.",
      items: [
        {
          key: "outcomes-dashboard",
          name: "Outcomes Dashboard",
          description:
            "Example of the Dropdown component used in the Outcomes-based Roadmap tool at outcomes.gurusuite.xyz.",
          image:
            "https://images.ctfassets.net/i5uwscj4pkk2/nSSSCoxGl5rQRu6PD7uIZ/a1ed437e57fea99aaa50e6fe34d743ba/outcomes-dropdown-composition.gif",
        },
      ],
    },

    related: {
      items: [
        {
          name: "Button",
          link: "https://guides.muibook.com/button",
        },
        {
          name: "Icons",
          link: "https://guides.muibook.com/icons",
        },
      ],
    },

    rules: [
      {
        heading: "Text & Icon Actions",
        description: "",
        doContent: [
          {
            description: "Use the 'small' size icon within a medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/2W1xs6NPj3jRrW6ZaVGRvZ/3a11566b68fffda85bf5f780c4d6a394/dropdown-bar-icon-do.png",
          },
        ],
        dontContent: [
          {
            description: "Avoid 'x-small', 'medium' or 'large' size icons within a medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/6BgHzCgKqk44piisNH4tE6/c08d91a1cf5231a089844d20f6ab968c/dropdown-bar-icon-dont.png",
          },
        ],
      },
      {
        heading: "Icon-Only Actions",
        description: "",
        doContent: [
          {
            description: "Use a 'medium' size icon when using an icon-only medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/3syzrNBEXbBjp5hGEUvF4M/0471f4b16939d8ee54deaf48997ff455/action-icon-do.png",
          },
        ],
        dontContent: [
          {
            description: "Avoid 'x-small', 'medium' or 'large' size icons within an icon-only medium sized action",
            image:
              "https://images.ctfassets.net/i5uwscj4pkk2/5V2TE85dY848jz1dP6Y0lC/b8e433c8abad5a4402ff1f86ddb8c848/action-icon-dont.png",
          },
        ],
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
