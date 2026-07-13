import type { MuiDocs } from "../../types/guidelines";

export const muiDocs: MuiDocs = {
  ModelViewer: {
    title: "Model Viewer",
    description:
      "Model Viewer renders interactive 3D models and enables AR experiences directly in the browser. It progressively enhances native Apple Quick Look (USDZ) and native visionOS model tags with cross-browser support powered by Google's model-viewer custom element.",
    hero: [""],
    figma: [""],
    storybook: ["https://stories.muibook.com/?path=/docs/media-model-viewer--docs"],
    github: ["https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-model-viewer/index.ts"],
    website: ["https://muibook.com/model-viewer"],
    guides: ["https://guides.muibook.com/model-viewer"],
    usage: {
      list: [
        "Use for interactive product previews (e.g. 3D assets, furniture, models).",
        "Set src to point to a standard GLB/GLTF model for general evergreen browsers.",
        "Set ios-src to point to a USDZ model to enable Quick Look on iPhone, iPad, and visionOS.",
        "Define poster to show a clean placeholder image while the model file is fetching or loading.",
        "Enable ar and camera-controls to allow users to interact with and place models in their space.",
        "Keep controls responsive and design clean fallback elements for non-3D devices."
      ],
    },
    accessibility: {
      designerList: [""],
      engineerList: [
        "Always provide a meaningful alt description to describe the model to screen readers.",
        "Ensure the default slot provides static HTML text, images, or download links for older environments where WebGL is unsupported.",
        "Avoid auto-rotate unless the user can explicitly pause it, or it stops after one full rotation."
      ],
    },
    anatomy: { image: "", list: ["Model frame", "Fallback poster", "Loading spinner", "3D WebGL viewport", "AR trigger button"] },
    variants: { items: [{ key: "", title: "", description: "", image: "" }] },
    stories: {
      items: [
        {
          "key": "interactive-3d-viewport",
          "title": "Interactive 3D Viewport",
          "description": "Renders a 3D model with orbiting/zooming controls enabled.",
          "list": [
            "Allows users to orbit, zoom, and inspect the 3D model.",
            "The component loads the library script asynchronously when first used.",
            "Fallback poster is rendered while the model is downloading."
          ]
        },
        {
          "key": "auto-rotation",
          "title": "Auto Rotation",
          "description": "Displays the model with automatic camera rotation enabled.",
          "list": [
            "Perfect for product highlights or landing pages where a spinning preview is desired.",
            "Users can still interact with the model to override the automatic rotation."
          ]
        },
        {
          "key": "ar-quick-look-and-webxr-placement",
          "title": "AR Quick Look & WebXR Placement",
          "description": "Enables AR entry triggers where supported.",
          "list": [
            "Adds a floating AR entry button on mobile devices.",
            "Allows placing the 3D model directly into physical space on iOS Safari and WebXR browsers."
          ]
        }
      ],
    },

    compositions: { description: "", items: [] },
    related: {
      items: [
        { name: "Image", link: "https://guides.muibook.com/image" },
        { name: "Media Player", link: "https://guides.muibook.com/media-player" },
      ],
    },
    rules: [{ heading: "", description: "", doContent: [{ description: "", image: "" }], dontContent: [{ description: "", image: "" }] }],
    behaviour: { list: [""] },
    writing: { list: [""] },
  },
};
