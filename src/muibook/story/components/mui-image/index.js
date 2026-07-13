import { getComponentDocs } from "../../../utils/story-data";
import Image from "../../../images/story/image-1080.png";

class storyImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Image");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Image"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-image" title="Image"></story-api-types>

      <story-card id="single-image" title="${storyMeta["single-image"].title}" description="${storyMeta["single-image"].description}" usage="${storyMeta["single-image"].usage}">
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

      <story-card id="image-with-caption" title="${storyMeta["image-with-caption"].title}" description="${storyMeta["image-with-caption"].description}" usage="${storyMeta["image-with-caption"].usage}">
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

      <story-card id="cropped-height" title="${storyMeta["cropped-height"].title}" description="${storyMeta["cropped-height"].description}" usage="${storyMeta["cropped-height"].usage}">
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

      <story-card id="cropped-centered" title="${storyMeta["cropped-centered"].title}" description="${storyMeta["cropped-centered"].description}" usage="${storyMeta["cropped-centered"].usage}">
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

      <story-card id="zoom-aspect-ratio" title="${storyMeta["zoom-aspect-ratio"].title}" description="${storyMeta["zoom-aspect-ratio"].description}" usage="${storyMeta["zoom-aspect-ratio"].usage}">
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
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>

    `;
  }
}

customElements.define("story-image", storyImage);
