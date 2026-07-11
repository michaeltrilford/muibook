import { getComponentDocs } from "../../../utils/story-data";

class StoryFormMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormMessage");

    const stories = /*html*/ `
      <story-api-types tag="mui-form-message" title="Form Message"></story-api-types>

      <story-card id="patterns" title="Message Patterns" description="Icon-led supporting text with semantic color from usage context." usage="Use a colored mui-form-message when the static message needs more emphasis.|||Use the default greyscale version for lighter supporting copy.|||This component does not replace mui-field slot=&quot;message&quot; when the message belongs to a specific field; it is the message content used within that pattern.">
        <div slot="body" class="story-card-surface">
          <mui-v-stack space="var(--space-200)">
            <mui-form-message variant="secondary">
              <mui-icon-message slot="before"></mui-icon-message>
              Optional: Add a referral code.
            </mui-form-message>
            <mui-form-message variant="info">
              Confirm billing details before saving changes.
            </mui-form-message>
            <mui-form-message variant="warning">
              <mui-icon-warning slot="before"></mui-icon-warning>
              Your password expires in 5 days.
            </mui-form-message>
            <mui-form-message variant="success">
              <mui-icon-check slot="before"></mui-icon-check>
              Email looks good and is available.
            </mui-form-message>
            <mui-form-message variant="error">
              <mui-icon-attention slot="before"></mui-icon-attention>
              Enter a valid email address.
            </mui-form-message>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-message variant="warning"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-warning slot="before"&gt;&lt;/mui-icon-warning&gt;
          <br />
          &nbsp;&nbsp;Your password expires in 5 days.
          <br />
          &lt;/mui-form-message&gt;
        </story-code-block>
      </story-card>

      <story-card id="billing" title="Billing Preferences Section" description="Grouped controls with radio choices and inline guidance. Intended for use on a surface background." usage="Use Form Message on the owning field for helper and validation copy.|||Use horizontal groups for paired follow-up fields.|||Default split is 1fr / 20rem and stacks on mobile.|||Use a colored mui-form-message for stronger static guidance, or the default greyscale version for lighter supporting copy.|||This component does not replace the message functionality on mui-field; when the copy belongs to one field, keep it in that field’s slot=&quot;message&quot;.">
        <div slot="body" class="story-form-surface">
          <mui-v-stack space="var(--space-400)">
            <mui-form-section heading="Billing Preferences">
              <mui-form-group heading="Billing Cycle">
                <mui-field label="Invoice Frequency">
                  <mui-radio-group value="monthly">
                    <mui-radio value="monthly">Monthly</mui-radio>
                    <mui-radio value="quarterly">Quarterly</mui-radio>
                    <mui-radio value="yearly">Yearly</mui-radio>
                  </mui-radio-group>
                  <mui-form-message slot="message" variant="warning">
                    <mui-icon-warning slot="before"></mui-icon-warning>
                    Updating invoice frequency applies to the next billing cycle.
                  </mui-form-message>
                </mui-field>
                <mui-field label="Reference Code">
                  <mui-input placeholder="Optional"></mui-input>
                </mui-field>
              </mui-form-group>
              <mui-rule></mui-rule>
              <mui-form-group heading="Notifications">
                <mui-field label="Billing Alerts">
                  <mui-radio-group value="email">
                    <mui-radio value="email">Email</mui-radio>
                    <mui-radio value="sms">SMS</mui-radio>
                    <mui-radio value="none">None</mui-radio>
                  </mui-radio-group>
                </mui-field>

                <mui-form-group variant="horizontal" hide-heading>
                  <mui-field label="Billing Contact">
                    <mui-input type="email" placeholder="billing@company.com"></mui-input>
                    <mui-form-message slot="message" variant="secondary">
                      <mui-icon-message slot="before"></mui-icon-message>
                      You can update these preferences at any time
                    </mui-form-message>
                  </mui-field>
                  <mui-field label="Notification Limit">
                    <mui-input placeholder="3"></mui-input>
                  </mui-field>
                </mui-form-group>
              </mui-form-group>
            </mui-form-section>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-section heading="Billing Preferences"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-group heading="Billing Cycle"&gt;...&lt;/mui-form-group&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-group heading="Notifications"&gt;...&lt;/mui-form-group&gt;
          <br />
          &lt;/mui-form-section&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="Sizes" description="Form Message sizing across x-small, small, medium, and large, including all variant options.">
        <mui-v-stack slot="body" space="var(--space-400)" class="story-card-surface">
          <mui-v-stack space="var(--space-200)">
            <mui-body size="small" variant="secondary">x-small</mui-body>
            <mui-form-message size="x-small" variant="secondary">
              <mui-icon-message slot="before"></mui-icon-message>
              X Small optional helper content
            </mui-form-message>
            <mui-form-message size="x-small" variant="info">
              <mui-icon-info slot="before"></mui-icon-info>
              X Small info helper content
            </mui-form-message>
            <mui-form-message size="x-small" variant="warning">
              <mui-icon-warning slot="before"></mui-icon-warning>
              X Small warning helper content
            </mui-form-message>
            <mui-form-message size="x-small" variant="success">
              <mui-icon-check slot="before"></mui-icon-check>
              X Small success helper content
            </mui-form-message>
            <mui-form-message size="x-small" variant="error">
              <mui-icon-attention slot="before"></mui-icon-attention>
              X Small error helper content
            </mui-form-message>
          </mui-v-stack>

          <mui-v-stack space="var(--space-200)">
            <mui-body size="small" variant="secondary">small</mui-body>
            <mui-form-message size="small" variant="secondary">
              <mui-icon-message slot="before"></mui-icon-message>
              Small optional helper content
            </mui-form-message>
            <mui-form-message size="small" variant="info">
              <mui-icon-info slot="before"></mui-icon-info>
              Small info helper content
            </mui-form-message>
            <mui-form-message size="small" variant="warning">
              <mui-icon-warning slot="before"></mui-icon-warning>
              Small warning helper content
            </mui-form-message>
            <mui-form-message size="small" variant="success">
              <mui-icon-check slot="before"></mui-icon-check>
              Small success helper content
            </mui-form-message>
            <mui-form-message size="small" variant="error">
              <mui-icon-attention slot="before"></mui-icon-attention>
              Small error helper content
            </mui-form-message>
          </mui-v-stack>

          <mui-v-stack space="var(--space-200)">
            <mui-body size="small" variant="secondary">medium</mui-body>
            <mui-form-message size="medium" variant="secondary">
              <mui-icon-message slot="before"></mui-icon-message>
              Medium optional helper content
            </mui-form-message>
            <mui-form-message size="medium" variant="info">
              <mui-icon-info slot="before"></mui-icon-info>
              Medium info helper content
            </mui-form-message>
            <mui-form-message size="medium" variant="warning">
              <mui-icon-warning slot="before"></mui-icon-warning>
              Medium warning helper content
            </mui-form-message>
            <mui-form-message size="medium" variant="success">
              <mui-icon-check slot="before"></mui-icon-check>
              Medium success helper content
            </mui-form-message>
            <mui-form-message size="medium" variant="error">
              <mui-icon-attention slot="before"></mui-icon-attention>
              Medium error helper content
            </mui-form-message>
          </mui-v-stack>

          <mui-v-stack space="var(--space-200)">
            <mui-body size="small" variant="secondary">large</mui-body>
            <mui-form-message size="large" variant="secondary">
              <mui-icon-message slot="before"></mui-icon-message>
              Large optional helper content
            </mui-form-message>
            <mui-form-message size="large" variant="info">
              <mui-icon-info slot="before"></mui-icon-info>
              Large info helper content
            </mui-form-message>
            <mui-form-message size="large" variant="warning">
              <mui-icon-warning slot="before"></mui-icon-warning>
              Large warning helper content
            </mui-form-message>
            <mui-form-message size="large" variant="success">
              <mui-icon-check slot="before"></mui-icon-check>
              Large success helper content
            </mui-form-message>
            <mui-form-message size="large" variant="error">
              <mui-icon-attention slot="before"></mui-icon-attention>
              Large error helper content
            </mui-form-message>
          </mui-v-stack>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-message size="small" variant="secondary"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-message slot="before"&gt;&lt;/mui-icon-message&gt;
          <br />
          &nbsp;&nbsp;Small optional helper content
          <br />
          &lt;/mui-form-message&gt;
          <br />
          <br />
          &lt;mui-form-message size="small" variant="info"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-info slot="before"&gt;&lt;/mui-icon-info&gt;
          <br />
          &nbsp;&nbsp;Small info helper content
          <br />
          &lt;/mui-form-message&gt;
          <br />
          <br />
          &lt;mui-form-message size="small" variant="warning"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-warning slot="before"&gt;&lt;/mui-icon-warning&gt;
          <br />
          &nbsp;&nbsp;Small warning helper content
          <br />
          &lt;/mui-form-message&gt;
          <br />
          <br />
          &lt;mui-form-message size="small" variant="positive"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-check slot="before"&gt;&lt;/mui-icon-check&gt;
          <br />
          &nbsp;&nbsp;Small success helper content
          <br />
          &lt;/mui-form-message&gt;
          <br />
          <br />
          &lt;mui-form-message size="small" variant="attention"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-attention slot="before"&gt;&lt;/mui-icon-attention&gt;
          <br />
          &nbsp;&nbsp;Small error helper content
          <br />
          &lt;/mui-form-message&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        .story-form-surface {
          margin-inline: calc(var(--space-400) * -1);
          margin-block: calc(var(--space-400) * -1);
          padding: var(--space-400);
          background: var(--surface);
          box-sizing: border-box;
        }
        .story-card-surface {
          margin-inline: calc(var(--space-400) * -1);
          margin-block: calc(var(--space-400) * -1);
          padding: var(--space-400);
          background: var(--surface-elevated-100);
          box-sizing: border-box;
        }
      </style>
      <story-template
        title="${data?.title || "Form Message"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-form-message"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="patterns::Message Patterns|||billing::Billing Preferences Section|||sizes::Sizes"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-form-message", StoryFormMessage);
