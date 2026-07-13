import { getComponentDocs } from "../../../utils/story-data";

class storyTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Textarea");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Textarea"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-textarea" title="Textarea"></story-api-types>

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <div slot="body">
          <mui-textarea label="Description" placeholder="Write your notes..."></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Description" placeholder="Write your notes..."&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card id="rows" title="${storyMeta["rows"].title}" description="${storyMeta["rows"].description}" usage="${storyMeta["rows"].usage}">
        <div slot="body">
          <mui-textarea label="Summary" rows="6" placeholder="6 visible rows"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Summary" rows="6" placeholder="6 visible rows"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <div slot="body">
          <mui-v-stack space="var(--space-300)">
            <mui-textarea size="x-small" label="X-Small" placeholder="X-Small textarea"></mui-textarea>
            <mui-textarea size="small" label="Small" placeholder="Small textarea"></mui-textarea>
            <mui-textarea size="medium" label="Medium" placeholder="Medium textarea"></mui-textarea>
            <mui-textarea size="large" label="Large" placeholder="Large textarea"></mui-textarea>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea size="x-small" label="X-Small" placeholder="X-Small textarea"&gt;&lt;/mui-textarea&gt;<br />
          &lt;mui-textarea size="small" label="Small" placeholder="Small textarea"&gt;&lt;/mui-textarea&gt;<br />
          &lt;mui-textarea size="medium" label="Medium" placeholder="Medium textarea"&gt;&lt;/mui-textarea&gt;<br />
          &lt;mui-textarea size="large" label="Large" placeholder="Large textarea"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card id="variant-error" title="${storyMeta["variant-error"].title}" description="${storyMeta["variant-error"].description}" usage="${storyMeta["variant-error"].usage}">
        <div slot="body">
          <mui-textarea label="Feedback" variant="error" value="Needs correction"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Feedback" variant="attention" value="Needs correction"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card id="hide-label" title="${storyMeta["hide-label"].title}" description="${storyMeta["hide-label"].description}" usage="${storyMeta["hide-label"].usage}">
        <div slot="body">
          <mui-textarea label="Hidden Label" hide-label placeholder="Accessible without visible label"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Hidden Label" hide-label placeholder="Accessible without visible label"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card id="disabled" title="${storyMeta["disabled"].title}" description="${storyMeta["disabled"].description}" usage="${storyMeta["disabled"].usage}">
        <div slot="body">
          <mui-textarea label="Disabled" disabled value="Read-only content"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Disabled" disabled value="Read-only content"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card id="optional-label" title="${storyMeta["optional-label"].title}" description="${storyMeta["optional-label"].description}" usage="${storyMeta["optional-label"].usage}">
        <div slot="body">
          <mui-textarea label="Additional Context" optional placeholder="Optional details..."></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Additional Context" optional placeholder="Optional details..."&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card id="character-count" title="${storyMeta["character-count"].title}" description="${storyMeta["character-count"].description}" usage="${storyMeta["character-count"].usage}">
        <div slot="body">
          <mui-textarea label="Summary" max-length="180" placeholder="Up to 180 characters"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Summary" max-length="180" placeholder="Up to 180 characters"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data?.title || "Textarea"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-textarea"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-textarea", storyTextarea);
