import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  FileDiff: {
    title: "File Diff",
    description: "File Diff represents a single file and its additions/deletions in a change summary.",
    hero: [""],
    figma: [""],
    storybook: [""],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-file-diff/index.ts"],
    website: ["https://muibook.com/file-diff"],
    guides: [""],
    usage: {
      list: [
        "Use this component to display a file and its addition/deletion counts.",
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [""],
    },
    anatomy: { image: "", list: [] },
    variants: { items: [] },
    stories: { items: [
      { key: "file-diff", title: "File Diff", list: ["Use to show file diff summaries."] },
    ] },
    compositions: { description: "", items: [] },
    related: {
      items: [],
    },
    rules: [],
    behaviour: {
      list: [],
    },
    writing: {
      list: [],
    },
  },
};
