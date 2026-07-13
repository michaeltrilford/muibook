import { getComponentDocs } from "../../../utils/story-data";

class StoryChatMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ChatMessage");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Chat Message"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const stories = /*html*/ `
      <story-api-types tag="mui-chat-message" title="Chat Message"></story-api-types>

      <story-card
        id="default"
        title="${storyMeta["default"].title}"
        description="${storyMeta["default"].description || ""}"
        usage="${storyMeta["default"].usage}"
      >
        <mui-chat-message slot="body" size="medium">
          <mui-avatar size="small" slot="avatar" label="Michael Trilford" background="neutral"></mui-avatar>
          <mui-body size="small">Can you provide CSAT data for the past quarter and highlight pain points by feature area?</mui-body>
        </mui-chat-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chat-message size="medium"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-avatar slot="avatar" label="Michael Trilford" background="neutral"&gt;&lt;/mui-avatar&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;Can you provide CSAT data...&lt;/mui-body&gt;
          <br />
          &lt;/mui-chat-message&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="list"
        title="${storyMeta["list"].title}"
        description="${storyMeta["list"].description || ""}"
        usage="${storyMeta["list"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-chat-message size="small">
            <mui-avatar size="small" slot="avatar" label="Support Agent" background="neutral"></mui-avatar>
            <mui-body size="small">I have reviewed your request and prepared a draft summary.</mui-body>
          </mui-chat-message>
          <mui-chat-message size="medium">
            <mui-avatar size="small" slot="avatar" label="Michael Trilford" background="neutral"></mui-avatar>
            <mui-body size="small">Great, include sentiment trends and top customer themes.</mui-body>
          </mui-chat-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack space="var(--space-200)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-chat-message size="small"&gt;...&lt;/mui-chat-message&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-chat-message size="medium"&gt;...&lt;/mui-chat-message&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="sizes"
        title="${storyMeta["sizes"].title}"
        description="${storyMeta["sizes"].description || ""}"
        usage="${storyMeta["sizes"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-chat-message size="x-small">
            <mui-avatar slot="avatar" label="XS"></mui-avatar>
            <mui-body>Compact x-small prompt message.</mui-body>
          </mui-chat-message>
          <mui-chat-message size="small">
            <mui-avatar slot="avatar" label="S"></mui-avatar>
            <mui-body>Small prompt message sizing.</mui-body>
          </mui-chat-message>
          <mui-chat-message size="medium">
            <mui-avatar slot="avatar" label="M"></mui-avatar>
            <mui-body>Medium prompt message sizing (default).</mui-body>
          </mui-chat-message>
          <mui-chat-message size="large">
            <mui-avatar slot="avatar" label="L"></mui-avatar>
            <mui-body>Large prompt message sizing.</mui-body>
          </mui-chat-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chat-message size="x-small"&gt;...&lt;/mui-chat-message&gt;<br />
          &lt;mui-chat-message size="small"&gt;...&lt;/mui-chat-message&gt;<br />
          &lt;mui-chat-message size="medium"&gt;...&lt;/mui-chat-message&gt;<br />
          &lt;mui-chat-message size="large"&gt;...&lt;/mui-chat-message&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="ghost"
        title="${storyMeta["ghost"].title}"
        description="${storyMeta["ghost"].description || ""}"
        usage="${storyMeta["ghost"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-chat-message size="x-small" variant="ghost">
            <mui-avatar slot="avatar" label="G"></mui-avatar>
            <mui-body>Ghost x-small.</mui-body>
          </mui-chat-message>
          <mui-chat-message size="small" variant="ghost">
            <mui-avatar slot="avatar" label="G"></mui-avatar>
            <mui-body>Ghost small.</mui-body>
          </mui-chat-message>
          <mui-chat-message size="medium" variant="ghost">
            <mui-avatar slot="avatar" label="G"></mui-avatar>
            <mui-body>Ghost medium.</mui-body>
          </mui-chat-message>
          <mui-chat-message size="large" variant="ghost">
            <mui-avatar slot="avatar" label="G"></mui-avatar>
            <mui-body>Ghost large.</mui-body>
          </mui-chat-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chat-message size="x-small" variant="ghost"&gt;...&lt;/mui-chat-message&gt;<br />
          &lt;mui-chat-message size="small" variant="ghost"&gt;...&lt;/mui-chat-message&gt;<br />
          &lt;mui-chat-message size="medium" variant="ghost"&gt;...&lt;/mui-chat-message&gt;<br />
          &lt;mui-chat-message size="large" variant="ghost"&gt;...&lt;/mui-chat-message&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="no-avatar"
        title="${storyMeta["no-avatar"].title}"
        description="${storyMeta["no-avatar"].description || ""}"
        usage="${storyMeta["no-avatar"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-chat-message size="medium" variant="ghost" align="start" width="full">
            <mui-body slot="header" size="x-small" variant="tertiary">Worked for 4m 10s</mui-body>
            <mui-heading level="3" size="6">Updated the composition examples.</mui-heading>
            <mui-body size="small">No avatar is provided, so the message uses a single-column layout with no empty avatar gutter.</mui-body>
            <mui-body slot="footer" size="x-small" variant="tertiary">18:40</mui-body>
          </mui-chat-message>
          <mui-chat-message size="medium" align="end" width="medium" footer-position="outside">
            <mui-body size="small">Can you add a new story to Compositions based around an agent chat?</mui-body>
            <mui-body slot="footer" size="x-small" variant="tertiary">18:33</mui-body>
          </mui-chat-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chat-message size="medium" variant="ghost" align="start" width="full"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="header" size="x-small"&gt;Worked for 4m 10s&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-heading level="3" size="6"&gt;Updated the composition examples.&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&lt;mui-body size="small"&gt;No avatar gutter is reserved.&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="footer" size="x-small"&gt;18:40&lt;/mui-body&gt;<br />
          &lt;/mui-chat-message&gt;<br /><br />
          &lt;mui-chat-message size="medium" align="end" width="medium" footer-position="outside"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body size="small"&gt;Can you add a new story...&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="footer" size="x-small"&gt;18:33&lt;/mui-body&gt;<br />
          &lt;/mui-chat-message&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="body-rhythm"
        title="${storyMeta["body-rhythm"].title}"
        description="${storyMeta["body-rhythm"].description || ""}"
        usage="${storyMeta["body-rhythm"].usage}"
      >
        <mui-v-stack slot="body" space="var(--space-500)">
          <mui-chat-message size="medium" variant="ghost">
            <mui-heading level="3" size="6">Default response rhythm.</mui-heading>
            <mui-body size="small">Direct body children are spaced by the component, so common agent responses do not need an extra v-stack wrapper.</mui-body>
            <mui-list as="ul">
              <mui-list-item size="small">Headings, paragraphs, lists, and result rows align as document content.</mui-list-item>
              <mui-list-item size="small">Header and footer slots keep their own compact rhythm.</mui-list-item>
            </mui-list>
          </mui-chat-message>
          <mui-chat-message size="medium" variant="ghost" style="--chat-message-body-space: var(--space-200);">
            <mui-heading level="3" size="6">Tighter rhythm.</mui-heading>
            <mui-body size="small">Use the CSS custom property when a particular response needs denser spacing.</mui-body>
          </mui-chat-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-chat-message variant="ghost"&gt;<br />
          &nbsp;&nbsp;&lt;mui-heading level="3" size="6"&gt;Default response rhythm.&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&lt;mui-body size="small"&gt;No wrapper stack needed.&lt;/mui-body&gt;<br />
          &lt;/mui-chat-message&gt;<br /><br />
          &lt;mui-chat-message style="--chat-message-body-space: var(--space-200);"&gt;...&lt;/mui-chat-message&gt;
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

        imports='["@muibook/components/mui-chat-message"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-chat-message", StoryChatMessage);
