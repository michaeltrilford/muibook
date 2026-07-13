import { getComponentDocs } from "../../../utils/story-data";

class storyMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Message");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Message"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const styles = /*css*/ `
      :host { display: block; }

    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-message" title="Message"></story-api-types>

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
        <mui-message heading="Workspace notice" slot="body">
          <mui-body>This notice applies to the current workspace and remains visible while the status is relevant.</mui-body>
        </mui-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message heading="Workspace notice"&gt;
          <br>
          &nbsp;&nbsp;&lt;mui-body&gt;This notice applies to the current workspace and remains visible while the status is relevant.&lt;/mui-body&gt;
          <br>
          &lt;/mui-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="lighter-guidance" title="${storyMeta["lighter-guidance"].title}" description="${storyMeta["lighter-guidance"].description}" usage="${storyMeta["lighter-guidance"].usage}">
        <mui-v-stack slot="body" space="var(--space-600)" style="padding: var(--space-600)">
          <mui-body variant="secondary">
            <mui-icon-info slot="before"></mui-icon-info>
            Use this pattern for lightweight inline guidance.
          </mui-body>

          <mui-rule style="opacity: 0.5"></mui-rule>

          <mui-field label="Workspace name">
            <mui-input placeholder="Acme Studio"></mui-input>
            <mui-form-message slot="message">
              Choose a name that your team will recognise.
            </mui-form-message>
          </mui-field>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-body variant="secondary"&gt;
          <br>
          &nbsp;&nbsp;&lt;mui-icon-info slot="before"&gt;&lt;/mui-icon-info&gt;
          <br>
          &nbsp;&nbsp;Use this pattern for lightweight inline guidance.
          <br>
          &lt;/mui-body&gt;
          <br>
          <br>
          &lt;mui-field label="Workspace name"&gt;
          <br>
          &nbsp;&nbsp;&lt;mui-input placeholder="Acme Studio"&gt;&lt;/mui-input&gt;
          <br>
          &nbsp;&nbsp;&lt;mui-form-message slot="message"&gt;
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;Choose a name that your team will recognise.
          <br>
          &nbsp;&nbsp;&lt;/mui-form-message&gt;
          <br>
          &lt;/mui-field&gt;
        </story-code-block>
      </story-card>

      <story-card id="body-text" title="${storyMeta["body-text"].title}" description="${storyMeta["body-text"].description}" usage="${storyMeta["body-text"].usage}">
        <mui-message heading="Message heading" slot="body">
          <mui-body>This is an informational message about updates.</mui-body>
        </mui-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message heading="Message heading"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;This is an informational message about updates.&lt;/mui-body&gt;
          <br />
          &lt;/mui-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="list" title="${storyMeta["list"].title}" description="${storyMeta["list"].description}" usage="${storyMeta["list"].usage}">

        <mui-message heading="Message heading" slot="body">
          <mui-list as="ul">
            <mui-list-item size="small">Item 1</mui-list-item>
            <mui-list-item size="small">Item 2</mui-list-item>
          </mui-list>
        </mui-message>

        <story-code-block slot="footer" scrollable>
          &lt;mui-message heading="Message heading"&gt;
          <br />
          <br />
          &nbsp;&nbsp;&lt;mui-list as="ul"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-list-item size="small"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item 1
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-list-item&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-list-item size="small"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item 2
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-list-item&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-list&gt;
          <br />
          <br />
          &lt;/mui-message&gt;
        </story-code-block>

      </story-card>

      <story-card id="icon" title="${storyMeta["icon"].title}" description="${storyMeta["icon"].description}" usage="${storyMeta["icon"].usage}">
        <mui-message slot="body" heading="Accessibility" icon="mui-icon-accessibility">
          <mui-body>Body content...</mui-body>
        </mui-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message heading="Accessibility" icon="mui-icon-accessibility"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;Body content...&lt;/mui-body&gt;
          <br />
          &lt;/mui-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-message heading="Large Message" variant="info" size="large">
            <mui-body>Large message body content.</mui-body>
            <mui-link>Read details</mui-link>
          </mui-message>

          <mui-message heading="Medium Message" variant="info" size="medium">
            <mui-body>Medium message body content.</mui-body>
            <mui-link>Read details</mui-link>
          </mui-message>

          <mui-message heading="Small Message" variant="info" size="small">
            <mui-body>Small message body content.</mui-body>
            <mui-link>Read details</mui-link>
          </mui-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message heading="Medium Message" size="medium"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;Medium message body content.&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-link&gt;Read details&lt;/mui-link&gt;
          <br />
          &lt;/mui-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="neutral" title="${storyMeta["neutral"].title}" description="${storyMeta["neutral"].description}" usage="${storyMeta["neutral"].usage}">
        <mui-message heading="Sync Settings" slot="body" variant="neutral">
            <mui-body size="small">Your preferences are backed up and synced across devices.</mui-body>
        </mui-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message
          <br />
          &nbsp;&nbsp;heading="Sync Settings"
          <br />
          &nbsp;&nbsp;variant="neutral"
          <br />
          &gt;
          <br />
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;...&lt;/mui-body&gt;
          <br />
          <br />
          &lt;/mui-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="positive" title="${storyMeta["positive"].title}" description="${storyMeta["positive"].description}" usage="${storyMeta["positive"].usage}">
        <mui-message heading="Report Ready for Download" slot="body" variant="positive">
          <mui-body>The report has been generated and is ready for download.</mui-body>
          <mui-link>Download Your Report</mui-link>
        </mui-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message
          <br />
          &nbsp;&nbsp;heading="Message heading"
          <br />
          &nbsp;&nbsp;variant="positive"
          <br />
          &gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;The report has been...&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-link&gt;Download Your Report&lt;/mui-link&gt;
          <br />
          &lt;/mui-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="info" title="${storyMeta["info"].title}" description="${storyMeta["info"].description}" usage="${storyMeta["info"].usage}">
        <mui-message heading="New Feature Available" slot="body" variant="info">
          <mui-body>A new dashboard layout is now available. Explore the enhanced features.</mui-body>
          <mui-link>Try the New Layout</mui-link>
        </mui-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message
          <br />
          &nbsp;&nbsp;heading="Message heading"
          <br />
          &nbsp;&nbsp;variant="info"
          <br />
          &gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;A new dashboard layout...&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-link&gt;Try the New Layout&lt;/mui-link&gt;
          <br />
          &lt;/mui-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="warning" title="${storyMeta["warning"].title}" description="${storyMeta["warning"].description}" usage="${storyMeta["warning"].usage}">
        <mui-message heading="Password Expiry Warning" slot="body" variant="warning">
          <mui-body>Your password will expire in 3 days. Please update it to maintain account security.</mui-body>
          <mui-link>Update Your Password</mui-link>
        </mui-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message
          <br />
          &nbsp;&nbsp;heading="Message heading"
          <br />
          &nbsp;&nbsp;variant="warning"
          <br />
          &gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;Your password will expire...&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-link&gt;Update Your Password&lt;/mui-link&gt;
          <br />
          &lt;/mui-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="attention" title="${storyMeta["attention"].title}" description="${storyMeta["attention"].description}" usage="${storyMeta["attention"].usage}">
        <mui-message heading="Scheduled Maintenance" slot="body" variant="attention">
          <mui-body>Our website will be undergoing maintenance on [Date] from [Time] to [Time]. Some features may be unavailable during this period.</mui-body>
          <mui-link>View Maintenance Schedule</mui-link>
        </mui-message>
        <story-code-block slot="footer" scrollable>
          &lt;mui-message
          <br />
          &nbsp;&nbsp;heading="Message heading"
          <br />
          &nbsp;&nbsp;variant="attention"
          <br />
          &gt;
          <br />
          &nbsp;&nbsp;&lt;mui-body&gt;Our website will be undergoing...&lt;/mui-body&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-link&gt;View Maintenance Schedule&lt;/mui-link&gt;
          <br />
          &lt;/mui-message&gt;
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

        imports='["@muibook/components/mui-message"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-message", storyMessage);
