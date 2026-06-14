import { getComponentDocs } from "../../../utils/story-data";

const astronautGlb = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
const astronautUsdz = "https://modelviewer.dev/shared-assets/models/Astronaut.usdz";
const astronautPoster = "https://modelviewer.dev/shared-assets/models/Astronaut.png";

class StoryModelViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ModelViewer");

    const stories = /*html*/ `
      <story-api-types tag="mui-model-viewer" title="Model Viewer"></story-api-types>

      <story-card
        canvas-bleed
        id="default"
        title="Interactive 3D Viewport"
        description="Renders a 3D model with orbiting/zooming controls enabled."
        usage="Allows users to orbit, zoom, and inspect the 3D model.|||The component loads the library script asynchronously when first used.|||Fallback poster is rendered while the model is downloading.">
        <mui-model-viewer
          slot="body"
          src="${astronautGlb}"
          ios-src="${astronautUsdz}"
          poster="${astronautPoster}"
          alt="An interactive 3D model of an astronaut"
          controls
          camera-controls>
        </mui-model-viewer>
        <story-code-block slot="footer" scrollable>
          &lt;mui-model-viewer<br />
          &nbsp;&nbsp;src="model.glb"<br />
          &nbsp;&nbsp;ios-src="model.usdz"<br />
          &nbsp;&nbsp;poster="poster.png"<br />
          &nbsp;&nbsp;alt="3D Astronaut"<br />
          &nbsp;&nbsp;controls<br />
          &nbsp;&nbsp;camera-controls&gt;<br />
          &lt;/mui-model-viewer&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="auto-rotate"
        title="Auto Rotation"
        description="Displays the model with automatic camera rotation enabled."
        usage="Perfect for product highlights or landing pages where a spinning preview is desired.|||Users can still interact with the model to override the automatic rotation.">
        <mui-model-viewer
          slot="body"
          src="${astronautGlb}"
          ios-src="${astronautUsdz}"
          poster="${astronautPoster}"
          alt="An auto-rotating 3D model of an astronaut"
          controls
          camera-controls
          auto-rotate>
        </mui-model-viewer>
        <story-code-block slot="footer" scrollable>
          &lt;mui-model-viewer<br />
          &nbsp;&nbsp;src="model.glb"<br />
          &nbsp;&nbsp;ios-src="model.usdz"<br />
          &nbsp;&nbsp;poster="poster.png"<br />
          &nbsp;&nbsp;alt="3D Astronaut"<br />
          &nbsp;&nbsp;controls<br />
          &nbsp;&nbsp;camera-controls<br />
          &nbsp;&nbsp;auto-rotate&gt;<br />
          &lt;/mui-model-viewer&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="ar-mode"
        title="AR Quick Look & WebXR Placement"
        description="Enables AR entry triggers where supported."
        usage="Adds a floating AR entry button on mobile devices.|||Allows placing the 3D model directly into physical space on iOS Safari and WebXR browsers.">
        <mui-model-viewer
          slot="body"
          src="${astronautGlb}"
          ios-src="${astronautUsdz}"
          poster="${astronautPoster}"
          alt="An astronaut model ready for AR placement"
          controls
          camera-controls
          ar>
        </mui-model-viewer>
        <story-code-block slot="footer" scrollable>
          &lt;mui-model-viewer<br />
          &nbsp;&nbsp;src="model.glb"<br />
          &nbsp;&nbsp;ios-src="model.usdz"<br />
          &nbsp;&nbsp;poster="poster.png"<br />
          &nbsp;&nbsp;alt="3D Astronaut"<br />
          &nbsp;&nbsp;controls<br />
          &nbsp;&nbsp;camera-controls<br />
          &nbsp;&nbsp;ar&gt;<br />
          &lt;/mui-model-viewer&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
      </style>
      <story-template
        title="${data?.title || "Model Viewer"}"
        description="${data?.description || "Model Viewer is a new exploration for the system and will iterate over time."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='@muibook/components/mui-model-viewer'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Interactive 3D Viewport|||auto-rotate::Auto Rotation|||ar-mode::AR & Quick Look"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-model-viewer", StoryModelViewer);
export { StoryModelViewer };
