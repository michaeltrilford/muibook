import { getComponentDocs } from "../../../utils/story-data";

class storyProgress extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Progress");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Progress"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }

      .canvas {
        background: var(--surface-elevated-100);
        padding: var(--space-600);
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

    `;

    const stories = /*html*/ `
          <story-api-types tag="mui-progress" title="Progress Bar"></story-api-types>

        <story-card id="progress-bar" title="${storyMeta["progress-bar"].title}" description="${storyMeta["progress-bar"].description}" usage="${storyMeta["progress-bar"].usage}">
          <div class="canvas" slot="body">
            <mui-progress progress="50"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress progress="50"&gt;...&lt;/mui-progress&gt;
          </story-code-block>
        </story-card>

        <story-card id="state-pending" title="${storyMeta["state-pending"].title}" description="${storyMeta["state-pending"].description}" usage="${storyMeta["state-pending"].usage}">
          <div class="canvas" slot="body">
            <mui-progress state="pending"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress state="pending"&gt;...&lt;/mui-progress&gt;
          </story-code-block>
        </story-card>

        <story-card id="state-syncing" title="${storyMeta["state-syncing"].title}" description="${storyMeta["state-syncing"].description}" usage="${storyMeta["state-syncing"].usage}">
          <div class="canvas" slot="body">
            <mui-progress state="syncing"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress state="syncing"&gt;...&lt;/mui-progress&gt;
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

        imports='["@muibook/components/mui-progress"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-progress", storyProgress);
