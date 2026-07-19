import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  VideoThumbnail: {
    namedSlots: {
      description: "Use these names on items slotted inside this component.",
      list: ["image","meta"],
    },
    title: "Video Thumbnail",
    description:
      "Video Thumbnail displays a video poster image with a consistent frame, optional metadata, and opt-in video affordances.",

    hero: [""],
    figma: ["https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=2117-18632&t=P2Vr2JDCBlI425XD-1"],
    storybook: ["https://stories.muibook.com/?path=/docs/media-video-thumbnail--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-video-thumbnail/index.ts"],
    website: ["https://muibook.com/video-thumbnail"],
    guides: ["https://guides.muibook.com/video-thumbnail"],

    usage: {
      list: [
        "Use Video Thumbnail for video-card previews and media browsing compositions.",
        "Use `src` and `alt` for the thumbnail image, or slot a custom image into `slot='image'`.",
        "Use `src-light`, `src-dark`, or `src-{brand}-{theme}` when the thumbnail artwork should swap with the active theme.",
        "Use `play` and `overlay` only when the composition needs the stronger video affordance.",
        "Use `slot='meta'` when the thumbnail and metadata should compose as one linked media card.",
        "When placed inside `mui-link` or `mui-button`, the parent receives `has-video` internally so action variant styling does not override the media card.",
        "Use frame tokens such as `--video-thumbnail-border`, `--video-thumbnail-border-hover`, `--video-thumbnail-box-shadow-hover`, and `--video-thumbnail-meta-gap` to opt into themed card treatments.",
        "Use composed-card tokens such as `--video-thumbnail-card-hover-background`, `--video-thumbnail-card-hover-edge-width`, and `--video-thumbnail-card-hover-edge-color-token` when the outer linked card needs a faux hover surface or border.",
      ],
    },

    accessibility: {
      designerList: [""],
      engineerList: ["Provide meaningful `alt` text when the thumbnail image communicates unique video content."],
    },

    stories: {
      items: [
        {
          "key": "default",
          "title": "Default",
          "description": "A reusable video poster thumbnail with no icon or shade overlay by default.",
          "list": [
            "Use Video Thumbnail when a card, list, or composition needs a consistent poster surface.",
            "Use src-light, src-dark, or src-{brand}-{theme} when artwork needs to follow the active theme or brand.",
            "The border is none by default so themes can opt into a framed treatment with tokens."
          ]
        },
        {
          "key": "play-affordance",
          "title": "Play Affordance",
          "description": "Use play and overlay when the thumbnail should expose a stronger video affordance.",
          "list": [
            "Use play to reveal the centered video icon on hover.",
            "Use overlay to opt into the shade layer; it is transparent until tokens or hover state style it."
          ]
        },
        {
          "key": "linked-card",
          "title": "Linked Card",
          "description": "Compose the thumbnail inside a link or button surface and slot metadata into the thumbnail.",
          "list": [
            "Keep interaction semantics on the outer control.",
            "When mui-link contains mui-video-thumbnail it receives has-video internally, which removes the default action chrome.",
            "Use the meta slot when the thumbnail and text should move as one composed media card."
          ]
        },
        {
          "key": "button-card",
          "title": "Button Card",
          "description": "Use a button surface when the thumbnail card performs an in-page action.",
          "list": [
            "Keep button semantics when the card triggers behaviour instead of navigating.",
            "When mui-button contains mui-video-thumbnail it receives has-video internally, which removes size and variant visual styling.",
            "The thumbnail remains the media surface, while the button owns the interaction."
          ]
        },
        {
          "key": "token-border",
          "title": "Token Border",
          "description": "Use tokens to opt into a framed thumbnail treatment.",
          "list": [
            "Use --video-thumbnail-border when the image frame itself needs a line.",
            "Use --video-thumbnail-box-shadow-hover when the hover ring should sit on the faux card surface instead of changing the image border."
          ]
        },
        {
          "key": "custom-ratio",
          "title": "Custom Ratio",
          "description": "Use aspect-ratio when the poster should match a different media format.",
          "list": [
            "Use the aspect-ratio attribute for one-off layout changes.",
            "Use --video-thumbnail-aspect-ratio when a theme or page should adjust multiple thumbnails consistently."
          ]
        }
      ],
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
