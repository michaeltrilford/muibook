import { getComponentDocs } from "../../../utils/story-data";
import Image from "../../../images/story/image-1080.png";

class storyImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Image");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-image" title="Image"></story-api-types>

      <story-card title="Single image">
        <div slot="body">
          <mui-image>
            <img slot="image" src="${Image}" alt="Spacing scale illustration" />
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Spacing scale illustration" /&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>

      <story-card title="Image with caption">
        <div slot="body">
          <mui-image>
            <img slot="image" src="${Image}" alt="Spacing scale illustration" />
            <figcaption slot="caption">Example image</figcaption>
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Spacing scale illustration" /&gt;
          <br />
          &nbsp;&nbsp;&lt;figcaption slot="caption">...&lt;/figcaption&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>

      <story-card title="Cropped Height">
        <div slot="body">
          <mui-image crop height="20rem" fit="cover" focal-x="45" focal-y="32">
            <img slot="image" src="${Image}" alt="Cropped spacing scale illustration" />
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image crop height="20rem" fit="cover" focal-x="45" focal-y="32"&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Cropped spacing scale illustration" /&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>

      <story-card title="Cropped Centered">
        <div slot="body">
          <mui-image crop height="20rem" fit="cover" position="center center">
            <img slot="image" src="${Image}" alt="Centered crop spacing scale illustration" />
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image crop height="20rem" fit="cover" position="center center"&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Centered crop spacing scale illustration" /&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>

      <story-card title="Zoom + Aspect Ratio">
        <div slot="body">
          <mui-image crop aspect-ratio="16/9" fit="cover" position="center top" zoom="1.15" radius="var(--radius-400)">
            <img slot="image" src="${Image}" alt="Zoomed spacing scale illustration" />
          </mui-image>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-image crop aspect-ratio="16/9" fit="cover" position="center top" zoom="1.15" radius="var(--radius-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;img slot="image" src="..." alt="Zoomed spacing scale illustration" /&gt;
          <br />
          &lt;/mui-image&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>


      <story-template 
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
      
        imports='["@muibook/components/mui-image"]'>
        ${stories}
      </story-template>

    `;
  }
}

customElements.define("story-image", storyImage);
