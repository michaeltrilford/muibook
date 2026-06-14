export const muiApi = {
  "mui-model-viewer": {
    description:
      "Renders interactive 3D models using Google's <model-viewer> custom element, with native <model> element support in Safari on visionOS 2+ as a progressive enhancement.",
    attributes: [
      { name: "src", type: { text: "string" }, description: "Path to the primary 3D model (typically GLB or GLTF)." },
      { name: "ios-src", type: { text: "string" }, description: "Path to the USDZ fallback model for Apple Quick Look on iOS and visionOS." },
      { name: "poster", type: { text: "string" }, description: "Placeholder or loading preview image URL." },
      { name: "alt", type: { text: "string" }, description: "Accessible description of the 3D model for screen readers." },
      { name: "controls", type: { text: "boolean" }, default: "false", description: "Enables orbit / zoom interactive controls." },
      { name: "camera-controls", type: { text: "boolean" }, default: "false", description: "Explicit control override for model-viewer's camera controls." },
      { name: "auto-rotate", type: { text: "boolean" }, default: "false", description: "Enables automatic rotation of the model camera." },
      { name: "ar", type: { text: "boolean" }, default: "false", description: "Enables AR entry trigger where supported." },
      { name: "loading", type: { text: '"lazy" | "eager"' }, default: "lazy", description: "Configures loading priority for the model." }
    ],
    slots: [
      { name: "", description: "Fallback or additional content rendered when the 3D viewers are unsupported or loading." },
      { name: "poster", description: "Custom UI elements overlaying the model before it initializes." }
    ],
    cssProperties: [
      { name: "--mui-model-viewer-background", description: "Theme-aware background color for the viewport." },
      { name: "--mui-model-viewer-radius", description: "Corner radius of the viewer container." },
      { name: "--mui-model-viewer-aspect-ratio", description: "Locked aspect-ratio constraint for the viewer container." }
    ]
  }
};
