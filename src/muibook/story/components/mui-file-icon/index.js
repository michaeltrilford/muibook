import "../../../../components/mui-file-icon";
import { VSCODE_ICONS_VERSION, fileIconNames } from "../../../../components/mui-file-icon/icons";
import { getComponentDocs } from "../../../utils/story-data";

class StoryFileIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  formatName(name) {
    return name.replace(/_/g, " ");
  }

  async connectedCallback() {
    const data = await getComponentDocs("File Icon");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="File Icon"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
    const featuredIcons = ["js", "typescript", "pdf", "html", "css", "json", "markdown", "reactjs", "vue", "zip"];

    const styles = /*css*/ `
      :host { display: block; }

      .size-grid::part(internal) {
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
      }

      .icon-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
        gap: var(--space-200);
      }

      .icon-tile {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: var(--space-200);
        min-width: 0;
        padding: var(--space-200);
        border: var(--stroke-size-100) solid var(--border-color);
        border-radius: var(--radius-200);
        background: var(--surface);
        box-sizing: border-box;
      }

      .icon-name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .usage-row {
        display: flex;
        align-items: center;
        gap: var(--space-200);
        min-width: 0;
      }
    `;

    const iconGallery = fileIconNames
      .map(
        (name) => /*html*/ `
          <div class="icon-tile" title="${name}">
            <mui-file-icon icon="${name}" decorative></mui-file-icon>
            <mui-body class="icon-name" size="x-small" variant="secondary">${name}</mui-body>
          </div>
        `,
      )
      .join("");

    const featuredGallery = featuredIcons
      .map(
        (name) => /*html*/ `
          <div class="icon-tile">
            <mui-file-icon icon="${name}" size="large" decorative></mui-file-icon>
            <mui-body class="icon-name" size="small">${this.formatName(name)}</mui-body>
          </div>
        `,
      )
      .join("");

    const stories = /*html*/ `
      <story-api-types tag="mui-file-icon" title="File Icon"></story-api-types>

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <mui-grid slot="body" class="size-grid" col="repeat(auto-fit, minmax(14rem, 1fr))" space="var(--space-300)">
          ${featuredGallery}
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-file-icon icon="typescript"&gt;&lt;/mui-file-icon&gt;<br />
          &lt;mui-file-icon icon="js"&gt;&lt;/mui-file-icon&gt;<br />
          &lt;mui-file-icon type="pdf"&gt;&lt;/mui-file-icon&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <mui-grid slot="body" class="size-grid" col="repeat(auto-fit, minmax(14rem, 1fr))" space="var(--space-300)">
          <div class="icon-tile">
            <mui-file-icon icon="typescript" size="small" decorative></mui-file-icon>
            <mui-body size="small">Small</mui-body>
          </div>
          <div class="icon-tile">
            <mui-file-icon icon="typescript" size="medium" decorative></mui-file-icon>
            <mui-body size="small">Medium</mui-body>
          </div>
          <div class="icon-tile">
            <mui-file-icon icon="typescript" size="large" decorative></mui-file-icon>
            <mui-body size="small">Large</mui-body>
          </div>
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-file-icon icon="typescript" size="small"&gt;&lt;/mui-file-icon&gt;<br />
          &lt;mui-file-icon icon="typescript" size="medium"&gt;&lt;/mui-file-icon&gt;<br />
          &lt;mui-file-icon icon="typescript" size="large"&gt;&lt;/mui-file-icon&gt;
        </story-code-block>
      </story-card>

      <story-card id="file-row" title="${storyMeta["file-row"].title}" description="${storyMeta["file-row"].description}" usage="${storyMeta["file-row"].usage}">
        <mui-v-stack slot="body" space="var(--space-300)">
          <div class="usage-row">
            <mui-file-icon icon="typescript" size="small" decorative></mui-file-icon>
            <mui-body size="small">src/components/mui-file-icon/index.ts</mui-body>
          </div>
          <div class="usage-row">
            <mui-file-icon icon="pdf" size="small" decorative></mui-file-icon>
            <mui-body size="small">docs/component-api.pdf</mui-body>
          </div>
          <div class="usage-row">
            <mui-file-icon icon="json" size="small" decorative></mui-file-icon>
            <mui-body size="small">public/custom-elements.json</mui-body>
          </div>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-file-icon icon="typescript" size="small" decorative&gt;&lt;/mui-file-icon&gt;
        </story-code-block>
      </story-card>

      <story-card id="all-icons" title="${storyMeta["all-icons"].title}" description="${storyMeta["all-icons"].description}" usage="${storyMeta["all-icons"].usage}">
        <div slot="body" class="icon-gallery">
          ${iconGallery}
        </div>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="${data?.title || "File Icon"}"
        description="${data?.description || ""}"
        github="${data?.github || ""}"
        figma="${data?.figma || ""}"
        guides="${data?.guides || ""}"
        storybook="${data?.storybook || ""}"
        accessibility="${data?.accessibility?.engineerList?.join("|||") || ""}"
        imports='["@muibook/components/mui-file-icon"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-file-icon", StoryFileIcon);
