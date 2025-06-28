class storyMessage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

    `;

    const propItems = [
      {
        name: "heading",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Main header for message",
      },
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "mui-body, mui-list, {elements}",
        default: "(required)",
        description: "Slot in body, list or custom elements",
      },
      {
        name: "icon",
        type: "string",
        options: "mui-icon-[name]",
        default: "message",
        description: "Choose an alternative mui-icon",
      },
      {
        name: "variant",
        type: "string",
        options: "neutral, positive, info, warning, attention",
        default: "neutral",
        description: "Describe the intent or mood of a message",
      },
      {
        name: "style",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use styles to add layout based CSS to the host element.",
      },
      {
        name: "class",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use add a classname to add layout based CSS to the host element.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            ${prop.required ? "required" : ""}
            name="${prop.name}"
            type="${prop.type}" 
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block 
            size="medium" 
            heading=${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)} 
            ${isLastChild}>
            <story-type-slat
              slot="detail"
              ${prop.required ? "required" : ""}
              name="${prop.name}"
              type="${prop.type}" 
              options="${prop.options || ""}"
              default="${prop.default || ""}"
              description="${prop.description}">
            </story-type-slat>
          </mui-accordion-block>
        `;
      })
      .join("");

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Message"
        description="The message component provides persistent, non-dismissible notifications that remain visible until the system determines they should be suspended."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=9-1053&t=ZA9uH4LK37tSuk6r-1"
        guides="https://guides.muibook.com/alerts"
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-message/index.ts"
        accessibility="
            ARIA-live is built in, using POLITE + ASSERTIVE for screen readers.;
            Neutral, Postive, Info support the role of STATUS for screen reader feedback.;
            Warning, Attention support the role of ALERT for screen reader feedback.
          "

      >

      <mui-v-stack space="var(--space-700)">
      
        <spec-card title="Import">
          <mui-code slot="footer" size="small">
            import "@muibook/components/mui-message";<br>
          </mui-code>
        </spec-card>

        <spec-card title="Props">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rows}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordions}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card
          title="Default" 
          description="The default uses the neutral state offers a subtle, neutral tone, ideal for conveying general information without drawing undue attention."
          accessibility="ARIA-live of POLITE is set on this variant.; Role of STATUS is set on this variant."
        >
          <mui-message slot="body"></mui-message>
          <mui-code slot="footer">
            &lt;mui-message&gt;...&lt;/mui-message&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Slot: Body text" 
          description="Content is customised via the Slot, which accepts the Body component or any valid child elements."
        >
          <mui-message heading="Message heading" slot="body">
            <mui-body>This is an informational message about updates.</mui-body>
          </mui-message>
          <mui-code slot="footer">
            &lt;mui-message heading="Message heading"&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-body&gt;...&lt;/mui-body&gt;
            <br />
            &lt;/mui-message&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Slot: List" 
          description="Content is customised via the Slot, which accepts the List component or any valid child elements."
        >

          <mui-message heading="Message heading" slot="body">
            <mui-list as="ul">
              <mui-list-item size="small">Item 1</mui-list-item>
              <mui-list-item size="small">Item 2</mui-list-item>
            </mui-list>
          </mui-message>

          <mui-code slot="footer">
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
          </mui-code>

        </story-card>

        <story-card 
          title="Slot: Icon" 
          description="Icon is customised via the icon property, which accepts any mui-icon-[name] from the mui icon-set."
        >
          <mui-message slot="body" icon="mui-icon-accessibility"></mui-message>
          <mui-code slot="footer">
            &lt;mui-message icon="mui-icon-accessibility"&gt;...&lt;/mui-message&gt;
          </mui-code>
        </story-card>

        <story-card 
          title="Variant: Neutral" 
          description="A calm, balanced tone for non-critical, persistent messages." 
          usage="Use on settings or system pages to display non-urgent information.; Suitable for background status like sync confirmation or feature explanations."
          accessibility="ARIA-live of POLITE is set on this variant.; Role of STATUS is set on this variant."
        >
          <mui-message heading="Sync Settings" slot="body" variant="neutral">
              <mui-body size="small">Your preferences are backed up and synced across devices.</mui-body>
          </mui-message>
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card 
          title="Variant: Positive" 
          description="The Positive state conveys successful actions, achievements, or confirmations, fostering a sense of accomplishment and satisfaction." 
          usage="Indicate successful form submissions or completed tasks.; Acknowledge user achievements or milestones."
          accessibility="ARIA-live of POLITE is set on this variant.; Role of STATUS is set on this variant."
        >
          <mui-message heading="Report Ready for Download" slot="body" variant="positive">
            <mui-body>The report has been generated and is ready for download.</mui-body>
            <mui-link>Download Your Report</mui-link>
          </mui-message>
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card 
          title="Variant: Info" 
          description="The Info state provides informative messages that help users understand system status or feature updates, guiding them without urgency." 
          usage="Use to announce new features | enhancements | system changes.; Appropriate for onboarding tips or contextual help."
          accessibility="ARIA-live of POLITE is set on this variant.; Role of STATUS is set on this variant."
        >
          <mui-message heading="New Feature Available" slot="body" variant="info">
            <mui-body>A new dashboard layout is now available. Explore the enhanced features.</mui-body>
            <mui-link>Try the New Layout</mui-link>
          </mui-message>
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card
          title="Variant: Warning"
          description="The Warning state alerts users to potential issues that may require attention, helping prevent errors or misunderstandings." 
          usage="Notify users of actions that could lead to undesirable outcomes; like unsaved changes.; Warn about system limitations or upcoming expirations."
          accessibility="ARIA-live of ASSERTIVE is set on this variant.; Role of ALERT is set on this variant."
        >
          <mui-message heading="Password Expiry Warning" slot="body" variant="warning">
            <mui-body>Your password will expire in 3 days. Please update it to maintain account security.</mui-body>
            <mui-link>Update Your Password</mui-link>
          </mui-message>
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

        <story-card
          title="Variant: Attention"
          description="The Attention state demands immediate user focus, highlighting critical issues that require prompt action." 
          usage='Alert users to urgent problems; such as system errors or security breaches.; Use for time-sensitive notifications that impact user experience.'
          accessibility="ARIA-live of ASSERTIVE is set on this variant.; Role of ALERT is set on this variant."
        >
          <mui-message heading="Scheduled Maintenance" slot="body" variant="attention">
            <mui-body>Our website will be undergoing maintenance on [Date] from [Time] to [Time]. Some features may be unavailable during this period.</mui-body>
            <mui-link>View Maintenance Schedule</mui-link>
          </mui-message>
          <mui-code slot="footer">
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
          </mui-code>
        </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-message", storyMessage);
