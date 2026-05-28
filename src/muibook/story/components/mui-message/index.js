import { getComponentDocs } from "../../../utils/story-data";

class storyMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Message");

    const styles = /*css*/ `
      :host { display: block; }

    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-message" title="Message"></story-api-types>

      <story-card
        title="Default" 
        description="Use Message as a persistent page-level notice with a heading and slotted body content."
        accessibility="ARIA-live of POLITE is set on this variant||| Role of STATUS is set on this variant."
      >
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

      <story-card
        title="Use Lighter Guidance"
        description="For inline context or form helper copy, use lighter components instead of Message."
        usage="Use Body with an info icon for lightweight inline guidance.|||Use Form Message inside Field for form guidance, validation, or status copy."
      >
        <mui-v-stack slot="body" space="var(--space-400)">
          <mui-body size="small">
            <mui-icon-info slot="before"></mui-icon-info>
            Use this pattern for lightweight inline guidance.
          </mui-body>

          <mui-field label="Workspace name">
            <mui-input placeholder="Acme Studio"></mui-input>
            <mui-form-message slot="message" variant="default">
              Choose a name that your team will recognise.
            </mui-form-message>
          </mui-field>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-body size="small"&gt;
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
          &nbsp;&nbsp;&lt;mui-form-message slot="message" variant="default"&gt;
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;Choose a name that your team will recognise.
          <br>
          &nbsp;&nbsp;&lt;/mui-form-message&gt;
          <br>
          &lt;/mui-field&gt;
        </story-code-block>
      </story-card>

      <story-card 
        title="Slot: Body text" 
        description="Supporting content belongs in the default slot; the heading should stay short."
      >
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

      <story-card 
        title="Slot: List" 
        description="Use list content when the page-level notice needs several supporting points."
      >

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

      <story-card 
        title="Slot: Icon" 
        description="Icon is customised via the icon property, which accepts any mui-icon-[name] from the mui icon-set."
      >
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

      <story-card 
        title="Size: Large, Medium, Small" 
        description="Message supports size density for layout and content."
        usage="Use large for prominent explanatory content blocks.|||Use medium for standard page-level guidance in denser layouts.|||Use small for compact regions where space is limited."
        accessibility="Keep heading and body concise at smaller sizes to preserve readability."
      >
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

      <story-card 
        title="Variant: Neutral" 
        description="A calm, balanced tone for non-critical, persistent messages." 
        usage="Use on settings or system pages to display non-urgent information||| Suitable for background status like sync confirmation or feature explanations."
        usageLink="https://guides.muibook.com/message"
        accessibility="ARIA-live of POLITE is set on this variant||| Role of STATUS is set on this variant."
      >
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

      <story-card 
        title="Variant: Positive" 
        description="The Positive state conveys durable page-level success or completion status."
        usage="Use for persistent success notices that apply to the page or workflow.|||Use lighter Body or Form Message patterns for small inline confirmations."
        usageLink="https://guides.muibook.com/message"
        accessibility="ARIA-live of POLITE is set on this variant||| Role of STATUS is set on this variant."
      >
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

      <story-card 
        title="Variant: Info" 
        description="The Info state provides page-level system information, feature changes, or workflow context."
        usage="Use for durable page-level information.|||For inline context, use Body size='small' with mui-icon-info in slot='before'."
        usageLink="https://guides.muibook.com/message"
        accessibility="ARIA-live of POLITE is set on this variant||| Role of STATUS is set on this variant."
      >
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

      <story-card
        title="Variant: Warning"
        description="The Warning state alerts users to page-level issues that may require attention."
        usage="Use for unsaved changes, action consequences, limitations, or expirations.|||Use Form Message for field-specific warnings."
        usageLink="https://guides.muibook.com/message"
        accessibility="ARIA-live of ASSERTIVE is set on this variant||| Role of ALERT is set on this variant."
      >
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

      <story-card
        title="Variant: Attention"
        description="The Attention state demands immediate focus for critical page-level issues."
        usage='Use for urgent problems such as system errors, security issues, or time-sensitive interruptions.|||Do not use Attention for ordinary content emphasis.'
        usageLink="https://guides.muibook.com/message"
        accessibility="ARIA-live of ASSERTIVE is set on this variant||| Role of ALERT is set on this variant."
      >
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
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-message", storyMessage);
