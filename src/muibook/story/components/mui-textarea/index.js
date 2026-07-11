import { getComponentDocs } from "../../../utils/story-data";

class storyTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Textarea");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-textarea" title="Textarea"></story-api-types>

      <story-card title="Default">
        <div slot="body">
          <mui-textarea label="Description" placeholder="Write your notes..."></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Description" placeholder="Write your notes..."&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Rows">
        <div slot="body">
          <mui-textarea label="Summary" rows="6" placeholder="6 visible rows"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Summary" rows="6" placeholder="6 visible rows"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Sizes">
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

      <story-card title="Variant: Error">
        <div slot="body">
          <mui-textarea label="Feedback" variant="error" value="Needs correction"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Feedback" variant="attention" value="Needs correction"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Hide Label">
        <div slot="body">
          <mui-textarea label="Hidden Label" hide-label placeholder="Accessible without visible label"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Hidden Label" hide-label placeholder="Accessible without visible label"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Disabled">
        <div slot="body">
          <mui-textarea label="Disabled" disabled value="Read-only content"></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Disabled" disabled value="Read-only content"&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Optional Label">
        <div slot="body">
          <mui-textarea label="Additional Context" optional placeholder="Optional details..."></mui-textarea>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-textarea label="Additional Context" optional placeholder="Optional details..."&gt;&lt;/mui-textarea&gt;
        </story-code-block>
      </story-card>

      <story-card title="Character Count">
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
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-textarea", storyTextarea);
