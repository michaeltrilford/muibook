import type { MuiDocs } from '../../types/guidelines';

export const muiDocs: MuiDocs = {
  Markdown: {
    title: "Markdown",
    description:
      "Renders Markdown content using Muibook components so docs stay on-brand and framework-agnostic.",

    hero: [""],
    figma: [""],
    storybook: [""],
    github: [
      "https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-markdown/index.ts",
    ],
    website: [""],
    guides: [""],

    usage: {
      list: [
        "Use when Markdown content should render using Muibook components.",
        "Great for docs, release notes, and help content sourced from files or APIs.",
        "Supports GFM tables, code blocks, inline code, blockquotes, links, and images.",
        "Adds stable heading IDs for in-page navigation and TOC linking.",
        "Provides copy buttons for code blocks by default.",
        "Supports custom markers like grid, box, space, and rule.",
        "Use body-size and code-size to align typography with the surrounding UI.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: [""],
    },

    anatomy: {
      image: "",
      list: [""],
    },

    variants: {
      items: [
        {
          key: "default",
          title: "Default",
          description: "Markdown rendered with Muibook components.",
          image: "",
        },
      ],
    },

    compositions: {
      description:
        "Markdown can be used to author content that will render into Muibook layout and typography components.",
      items: [
        {
          key: "docs",
          name: "Docs",
          description:
            "Use for rich documentation pages that need headings, lists, tables, and code blocks.",
          image: "",
        },
      ],
    },

    related: {
      items: [
        { name: "Code", link: "https://guides.muibook.com/code" },
        { name: "Table", link: "https://guides.muibook.com/table" },
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
      list: [
        "Accepts markdown via the markdown attribute or inner text content.",
        "Re-renders when markdown, body-size, or code-size attributes change.",
        "Observes text content when markdown is not set, so live edits are reflected.",
        "Renders tables into mui-table with horizontal scroll and a minimum width.",
        "Code blocks render mui-code with a copy button that writes to clipboard.",
      ],
    },

    writing: {
      list: [
        "Keep headings short and scannable.",
        "Prefer lists and short paragraphs for readability.",
        "Use markers like -- space-400 -- or -- grid-col-1fr-1fr -- for layout spacing and grids.",
      ],
    },
  },
};
