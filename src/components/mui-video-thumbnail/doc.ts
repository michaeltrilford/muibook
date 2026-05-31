import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  VideoThumbnail: {
    title: "Video Thumbnail",
    description:
      "Video Thumbnail displays a video poster image with a consistent frame, optional metadata, and opt-in video affordances.",

    usage: {
      list: [
        "Use Video Thumbnail for video-card previews and media browsing compositions.",
        "Use `src` and `alt` for the thumbnail image, or slot a custom image into `slot='image'`.",
        "Use `src-light`, `src-dark`, or `src-{brand}-{theme}` when the thumbnail artwork should swap with the active theme.",
        "Use `play` and `overlay` only when the composition needs the stronger video affordance.",
        "Use `slot='meta'` when the thumbnail and metadata should compose as one linked media card.",
        "When placed inside `mui-link` or `mui-button`, the parent receives `has-video` internally so action variant styling does not override the media card.",
        "Use frame tokens such as `--video-thumbnail-border`, `--video-thumbnail-border-hover`, `--video-thumbnail-box-shadow-hover`, and `--video-thumbnail-meta-gap` to opt into themed card treatments.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: ["Provide meaningful `alt` text when the thumbnail image communicates unique video content."],
    },

    related: {
      items: [
        {
          name: "Image",
          link: "https://guides.muibook.com/image",
        },
        {
          name: "Media Player",
          link: "https://guides.muibook.com/media-player",
        },
      ],
    },
  },
};
