import { getComponentDocs } from "../../../utils/story-data";

class StoryWorkLog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("WorkLog");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Work Log"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const stories = /*html*/ `
      <story-api-types tag="mui-work-log" title="Work Log"></story-api-types>

      <story-card
        id="single"
        title="${storyMeta["single"].title}"
        description="${storyMeta["single"].description || ""}"
        usage="${storyMeta["single"].usage}"
      >
        <mui-work-log slot="body" label="Worked for 4m 10s" open rule>
          <mui-list>
            <mui-list-item size="x-small" variant="tertiary">Reviewed the composition story structure.</mui-list-item>
            <mui-list-item size="x-small" variant="tertiary">Updated chat-message layout, header, and footer slots.</mui-list-item>
            <mui-list-item size="x-small" variant="tertiary">Ran CEM and Muibook build checks.</mui-list-item>
          </mui-list>
        </mui-work-log>
        <story-code-block slot="footer" scrollable>
          &lt;mui-work-log label="Worked for 4m 10s" open rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-list&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-list-item size="x-small" variant="tertiary"&gt;Reviewed the composition story structure.&lt;/mui-list-item&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-list-item size="x-small" variant="tertiary"&gt;Ran CEM and Muibook build checks.&lt;/mui-list-item&gt;<br />
          &nbsp;&nbsp;&lt;/mui-list&gt;<br />
          &lt;/mui-work-log&gt;
        </story-code-block>
      </story-card>
      <story-card
        id="composable"
        title="${storyMeta["composable"].title}"
        description="${storyMeta["composable"].description || ""}"
        usage="${storyMeta["composable"].usage}"
      >
        <mui-work-log slot="body" label="Edited 4 files" open rule>
          <mui-h-stack slot="after" alignY="center" space="var(--space-100)">
            <mui-body size="x-small" weight="regular" variant="positive">+251</mui-body>
            <mui-body size="x-small" weight="regular" variant="attention">-14</mui-body>
          </mui-h-stack>
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
        </mui-work-log>
        <story-code-block slot="footer" scrollable>
          &lt;mui-work-log label="Edited 4 files" open rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="after" alignY="center" space="var(--space-100)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="positive"&gt;+251&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="attention"&gt;-14&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          <br />
          &nbsp;&nbsp;&lt;mui-file-diff<br />
          &nbsp;&nbsp;&nbsp;&nbsp;filename="index.js"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;filepath="src/components/mui-work-log/"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;additions="+182"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;deletions="-2"<br />
          &nbsp;&nbsp;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="icon"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="javascript"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
          &nbsp;&nbsp;&lt;mui-file-diff<br />
          &nbsp;&nbsp;&nbsp;&nbsp;filename="api.ts"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;filepath="src/components/mui-work-log/"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;additions="+9"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;deletions="-1"<br />
          &nbsp;&nbsp;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="icon"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="typescript"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
          &nbsp;&nbsp;&lt;mui-file-diff<br />
          &nbsp;&nbsp;&nbsp;&nbsp;filename="doc.ts"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;filepath="src/components/mui-work-log/"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;additions="+12"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;deletions="-2"<br />
          &nbsp;&nbsp;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="icon"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="typescript"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
          &nbsp;&nbsp;&lt;mui-file-diff<br />
          &nbsp;&nbsp;&nbsp;&nbsp;filename="index.js"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;filepath="src/muibook/story/components/mui-work-log/"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;additions="+48"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;deletions="-9"<br />
          &nbsp;&nbsp;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-file-icon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slot="icon"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon="javascript"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;/mui-file-icon&gt;<br />
          &nbsp;&nbsp;&lt;/mui-file-diff&gt;<br />
          &lt;/mui-work-log&gt;
        </story-code-block>
      </story-card>


      <story-card
        id="thinking"
        title="${storyMeta["thinking"].title}"
        description="${storyMeta["thinking"].description || ""}"
        usage="${storyMeta["thinking"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-500)">
          <mui-work-log label="Thinking" status pending></mui-work-log>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-work-log label="Thinking" status pending&gt;&lt;/mui-work-log&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="nested"
        title="${storyMeta["nested"].title}"
        description="${storyMeta["nested"].description || ""}"
        usage="${storyMeta["nested"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-500)">
          <mui-work-log label="Working for 31s" pending>
            <mui-work-log label="Read 4 files">
              <mui-body size="x-small" variant="tertiary">Checked Prompt, Work Log, Agent Chat, and changelog sources.</mui-body>
            </mui-work-log>
          </mui-work-log>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-work-log label="Working for 31s" pending&gt;<br />
          &nbsp;&nbsp;&lt;mui-work-log label="Read 4 files"&gt;...&lt;/mui-work-log&gt;<br />
          &lt;/mui-work-log&gt;
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
        imports='["@muibook/components/mui-work-log"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-work-log", StoryWorkLog);
