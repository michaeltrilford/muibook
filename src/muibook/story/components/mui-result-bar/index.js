import { getComponentDocs } from "../../../utils/story-data";

class StoryResultBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ResultBar");

    const stories = /*html*/ `
      <story-api-types tag="mui-result-bar" title="Result Bar"></story-api-types>

      <story-card
        id="accessory"
        title="Accessory"
        usage="Use inside prompt responses for generated files, edits, artefacts, and reviewable results.|||Use accessory for a compact marker, start for result copy, and actions for direct controls."
      >
        <mui-result-bar slot="body">
          <mui-avatar slot="accessory" label="Code" background="neutral">
            <mui-icon-copy size="small"></mui-icon-copy>
          </mui-avatar>
          <mui-v-stack slot="start" space="0">
            <mui-body size="small" weight="bold">Edited compositions.ts</mui-body>
            <mui-h-stack aligny="center" space="var(--space-100)">
              <mui-body size="x-small" weight="regular" variant="success">+251</mui-body>
              <mui-body size="x-small" weight="regular" variant="error">-14</mui-body>
            </mui-h-stack>
          </mui-v-stack>
          <mui-button slot="actions" variant="tertiary" size="x-small">Undo</mui-button>
          <mui-button slot="actions" variant="secondary" size="x-small">Review</mui-button>
        </mui-result-bar>
        <story-code-block slot="footer" scrollable>
          &lt;mui-result-bar&gt;<br />
          &nbsp;&nbsp;&lt;mui-avatar slot="accessory" label="Code"&gt;...&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;...&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="tertiary" size="x-small"&gt;Undo&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" size="x-small"&gt;Review&lt;/mui-button&gt;<br />
          &lt;/mui-result-bar&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="without-accessory"
        title="Without Accessory"
        usage="Omit the accessory slot when the result should read as a simple action row."
      >
        <mui-result-bar slot="body">
          <mui-v-stack slot="start" space="0">
            <mui-body size="small" weight="bold">Generated release notes</mui-body>
            <mui-body size="x-small">Ready to insert into changelog</mui-body>
          </mui-v-stack>
          <mui-button slot="actions" variant="secondary" size="x-small">Open</mui-button>
        </mui-result-bar>
        <story-code-block slot="footer" scrollable>
          &lt;mui-result-bar&gt;<br />
          &nbsp;&nbsp;&lt;mui-v-stack slot="start" space="0"&gt;...&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" size="x-small"&gt;Open&lt;/mui-button&gt;<br />
          &lt;/mui-result-bar&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="file-edits"
        title="Accordion Result"
        usage="Opt into the accordion variant to present worker outputs with interactive actions and collapsible accordion content."
      >
        <mui-result-bar slot="body" variant="accordion" label="Edited 4 files" rule>
          <mui-h-stack slot="after-label" alignY="center" space="var(--space-100)">
            <mui-body size="x-small" weight="regular" variant="success">+251</mui-body>
            <mui-body size="x-small" weight="regular" variant="error">-14</mui-body>
          </mui-h-stack>

          <mui-button slot="actions" variant="tertiary" size="x-small">Undo</mui-button>
          <mui-button slot="actions" variant="secondary" size="x-small">Review</mui-button>

          <div slot="content">
            <mui-file-diff
              filename="index.js"
              filepath="src/components/mui-work-log/"
              additions="+182"
              deletions="-2"
            >
              <mui-file-icon slot="icon" icon="javascript"></mui-file-icon>
            </mui-file-diff>
            <mui-file-diff
              filename="api.ts"
              filepath="src/components/mui-work-log/"
              additions="+9"
              deletions="-1"
            >
              <mui-file-icon slot="icon" icon="typescript"></mui-file-icon>
            </mui-file-diff>
            <mui-file-diff
              filename="doc.ts"
              filepath="src/components/mui-work-log/"
              additions="+12"
              deletions="-2"
            >
              <mui-file-icon slot="icon" icon="typescript"></mui-file-icon>
            </mui-file-diff>
            <mui-file-diff
              filename="index.js"
              filepath="src/muibook/story/components/mui-work-log/"
              additions="+48"
              deletions="-9"
            >
              <mui-file-icon slot="icon" icon="javascript"></mui-file-icon>
            </mui-file-diff>
          </div>
        </mui-result-bar>
        <story-code-block slot="footer" scrollable>
          &lt;mui-result-bar variant="accordion" label="Edited 4 files" rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="after-label" alignY="center" space="var(--space-100)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="success"&gt;+251&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="error"&gt;-14&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          <br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="tertiary" size="x-small"&gt;Undo&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" size="x-small"&gt;Review&lt;/mui-button&gt;<br />
          <br />
          &nbsp;&nbsp;&lt;div slot="content"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-diff<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename="index.js"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filepath="src/components/mui-work-log/"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;additions="+182"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deletions="-2"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="icon"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="javascript"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-diff<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename="api.ts"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filepath="src/components/mui-work-log/"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;additions="+9"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deletions="-1"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="icon"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="typescript"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-diff<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename="doc.ts"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filepath="src/components/mui-work-log/"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;additions="+12"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deletions="-2"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="icon"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="typescript"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-diff<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename="index.js"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filepath="src/muibook/story/components/mui-work-log/"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;additions="+48"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deletions="-9"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="icon"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="javascript"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
          &nbsp;&nbsp;&lt;/div&gt;<br />
          &lt;/mui-result-bar&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Result Bar"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-result-bar"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="accessory::Accessory|||without-accessory::Without Accessory|||file-edits::Accordion Result"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-result-bar", StoryResultBar);
