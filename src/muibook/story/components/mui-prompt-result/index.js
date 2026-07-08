import { getComponentDocs } from "../../../utils/story-data";

class StoryPromptResult extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PromptResult");

    const stories = /*html*/ `
      <story-api-types tag="mui-prompt-result" title="Prompt Result"></story-api-types>

      <story-card
        id="default"
        title="Default"
        usage="Use inside prompt responses for generated files, edits, artefacts, and reviewable results.|||Use accessory for a compact marker, start for result copy, and actions for direct controls."
      >
        <mui-prompt-result slot="body">
          <mui-avatar slot="accessory" label="Code" background="neutral">
            <mui-icon-copy size="small"></mui-icon-copy>
          </mui-avatar>
          <mui-v-stack slot="start" space="0">
            <mui-body size="small" weight="bold">Edited compositions.ts</mui-body>
            <mui-body size="x-small">+251 -14</mui-body>
          </mui-v-stack>
          <mui-button slot="actions" variant="tertiary" size="x-small">Undo</mui-button>
          <mui-button slot="actions" variant="secondary" size="x-small">Review</mui-button>
        </mui-prompt-result>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-result&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar slot="accessory" label="Code"&gt;...&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;...&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="tertiary" size="x-small"&gt;Undo&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" size="x-small"&gt;Review&lt;/mui-button&gt;<br />
          &lt;/mui-prompt-result&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="without-accessory"
        title="Without Accessory"
        usage="Omit the accessory slot when the result should read as a simple action row."
      >
        <mui-prompt-result slot="body">
          <mui-v-stack slot="start" space="0">
            <mui-body size="small" weight="bold">Generated release notes</mui-body>
            <mui-body size="x-small">Ready to insert into changelog</mui-body>
          </mui-v-stack>
          <mui-button slot="actions" variant="secondary" size="x-small">Open</mui-button>
        </mui-prompt-result>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-result&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;...&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" size="x-small"&gt;Open&lt;/mui-button&gt;<br />
          &lt;/mui-prompt-result&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Prompt Result"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-prompt-result"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||without-accessory::Without Accessory"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-prompt-result", StoryPromptResult);
