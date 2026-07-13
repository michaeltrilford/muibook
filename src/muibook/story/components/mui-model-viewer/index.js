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
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Model Viewer"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const stories = /*html*/ `
      <story-api-types tag="mui-model-viewer" title="Model Viewer"></story-api-types>

      <story-card canvas-bleed id="interactive-3d-viewport" title="${storyMeta["interactive-3d-viewport"].title}" description="${storyMeta["interactive-3d-viewport"].description}" usage="${storyMeta["interactive-3d-viewport"].usage}">
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

      <story-card canvas-bleed id="auto-rotation" title="${storyMeta["auto-rotation"].title}" description="${storyMeta["auto-rotation"].description}" usage="${storyMeta["auto-rotation"].usage}">
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

      <story-card canvas-bleed id="ar-quick-look-and-webxr-placement" title="${storyMeta["ar-quick-look-and-webxr-placement"].title}" description="${storyMeta["ar-quick-look-and-webxr-placement"].description}" usage="${storyMeta["ar-quick-look-and-webxr-placement"].usage}">
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
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-model-viewer", StoryModelViewer);
export { StoryModelViewer };
