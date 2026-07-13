import { getComponentDocs } from "../../../utils/story-data";

class storyFileUpload extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FileUpload");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="File Upload"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-file-upload" title="File Upload"></story-api-types>

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <mui-file-upload slot="body"
          acceptedFileTypes=".pdf,.jpg"
          currentFileName="No file selected"
        ></mui-file-upload>
        <story-code-block slot="footer" scrollable>
          &lt;mui-file-upload<br />
          &nbsp;&nbsp;acceptedFileTypes=".pdf,.jpg"<br />
          &nbsp;&nbsp;currentFileName="No file selected"<br />
          &gt;&lt;/mui-file-upload&gt;
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

        imports='["@muibook/components/mui-file-upload"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-file-upload", storyFileUpload);
