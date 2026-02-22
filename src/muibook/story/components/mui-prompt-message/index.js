import { getComponentDocs } from "../../../utils/story-data";

class StoryPromptMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("PromptMessage");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-prompt-message";<br>
        </mui-code>
      </spec-card>

      <story-card
        id="default"
        title="Default"
        usage="This is a reusable offering extracted from Agent UI compositions.|||Use it as the shared conversation row primitive."
      >
        <mui-prompt-message slot="body">
          <mui-avatar size="small" slot="avatar" label="Michael Trilford" background="neutral"></mui-avatar>
          <mui-body size="small">Can you provide CSAT data for the past quarter and highlight pain points by feature area?</mui-body>
        </mui-prompt-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-prompt-message&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-avatar slot="avatar" size="small" label="Michael Trilford" background="neutral"&gt;&lt;/mui-avatar&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body size="small"&gt;Can you provide CSAT data...&lt;/mui-body&gt;
          <br />
          &lt;/mui-prompt-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="list" title="Conversation List">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-prompt-message>
            <mui-avatar size="small" slot="avatar" label="Support Agent" background="neutral"></mui-avatar>
            <mui-body size="small">I have reviewed your request and prepared a draft summary.</mui-body>
          </mui-prompt-message>
          <mui-prompt-message>
            <mui-avatar size="small" slot="avatar" label="Michael Trilford" background="neutral"></mui-avatar>
            <mui-body size="small">Great, include sentiment trends and top customer themes.</mui-body>
          </mui-prompt-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack space="var(--space-200)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-prompt-message&gt;...&lt;/mui-prompt-message&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-prompt-message&gt;...&lt;/mui-prompt-message&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Prompt Message"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks slot="message" heading="Quicklinks" links="default::Default|||list::Conversation List"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-prompt-message", StoryPromptMessage);
