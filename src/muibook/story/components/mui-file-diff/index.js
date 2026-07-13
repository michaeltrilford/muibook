import { getComponentDocs } from "../../../utils/story-data";

class StoryFileDiff extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FileDiff");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="File Diff"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const stories = /*html*/ `
      <story-api-types tag="mui-file-diff" title="File Diff"></story-api-types>

      <story-card
        id="file-diff"
        title="${storyMeta["file-diff"].title}"
        description="${storyMeta["file-diff"].description || ""}"
        usage="${storyMeta["file-diff"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-file-diff
            filename="index.js"
            filepath="src/components/mui-worker/"
            additions="+182"
            deletions="-2"
          >
            <mui-file-icon slot="icon" icon="javascript" size="large"></mui-file-icon>
          </mui-file-diff>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-file-diff
            filename="index.ts"
            filepath="src/components/mui-worker/"
            additions="+182"
            deletions="-2"
          &gt;
            &lt;mui-file-icon
              slot="icon"
              icon="javascript"
              size="large"
            &gt;&lt;/mui-file-icon&gt;
          &lt;/mui-file-diff&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
        imports='["@muibook/components/mui-file-diff"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-file-diff", StoryFileDiff);
