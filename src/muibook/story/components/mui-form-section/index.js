import { getComponentDocs } from "../../../utils/story-data";

class StoryFormSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormSection");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-form-section";<br>
        </mui-code>
      </spec-card>

      <story-card id="account-setup" title="Account Setup Section" description="Real form grouping with Field, Input, Select, and Form Hint. Intended for use on a surface background." usage="Use one form section for each major form area.|||Use form group to cluster related fields.|||Hide group labels when they repeat the section title.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Account Setup">
            <mui-form-group heading="Account Details" hide-label>
              <mui-field label="Email">
                <mui-input type="email" placeholder="you@company.com"></mui-input>
              </mui-field>
              <mui-field label="Role">
                <mui-select options='[{"label":"Product","value":"product"},{"label":"Engineering","value":"engineering"},{"label":"Design","value":"design"}]'></mui-select>
                <mui-form-hint slot="message" style="color: var(--text-color-optional);">
                  <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
                  We only use this information to tailor onboarding content.
                </mui-form-hint>
              </mui-field>
            </mui-form-group>
          </mui-form-section>
        </div>
      </story-card>

      <story-card id="billing" title="Billing Preferences Section" description="Grouped controls with radio choices and inline guidance. Intended for use on a surface background." usage="Use horizontal groups for paired fields.|||Default split is 1fr / 20rem and stacks on mobile.|||Use form hints for helper or status text.">
        <div slot="body" class="story-form-surface">
          <mui-v-stack space="var(--space-400)">
            <mui-form-section heading="Billing Preferences">
              <mui-form-group class="form-group" heading="Billing Cycle">
                <mui-field label="Invoice Frequency">
                  <mui-radio-group value="monthly">
                    <mui-radio value="monthly">Monthly</mui-radio>
                    <mui-radio value="quarterly">Quarterly</mui-radio>
                    <mui-radio value="yearly">Yearly</mui-radio>
                  </mui-radio-group>
                  <mui-form-hint slot="message" style="color: var(--text-color-warning);">
                    <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
                    Updating invoice frequency applies to the next billing cycle.
                  </mui-form-hint>
                </mui-field>
                <mui-field label="Reference Code">
                  <mui-input placeholder="Optional"></mui-input>
                </mui-field>
              </mui-form-group>
              <mui-rule></mui-rule>
              <mui-form-group class="form-group" heading="Notifications">
                <mui-field label="Billing Alerts">
                  <mui-radio-group value="email">
                    <mui-radio value="email">Email</mui-radio>
                    <mui-radio value="sms">SMS</mui-radio>
                    <mui-radio value="none">None</mui-radio>
                  </mui-radio-group>
                </mui-field>
                <mui-form-group variant="horizontal" hide-label>
                  <mui-field label="Billing Contact">
                    <mui-input type="email" placeholder="billing@company.com"></mui-input>
                    <mui-form-hint slot="message" style="color: var(--text-color-optional);">
                      <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
                      You can update these preferences at any time
                    </mui-form-hint>
                  </mui-field>
                  <mui-field label="Notification Limit">
                    <mui-input placeholder="3"></mui-input>
                  </mui-field>
                </mui-form-group>
              </mui-form-group>
            </mui-form-section>

            <mui-card>
              <mui-card-body>
                <mui-form-group heading="Billing Preferences (Card)">
                  <mui-field label="Invoice Frequency">
                    <mui-radio-group value="monthly">
                      <mui-radio value="monthly">Monthly</mui-radio>
                      <mui-radio value="quarterly">Quarterly</mui-radio>
                      <mui-radio value="yearly">Yearly</mui-radio>
                    </mui-radio-group>
                  </mui-field>
                  <mui-field label="Reference Code">
                    <mui-input placeholder="Optional"></mui-input>
                  </mui-field>
                </mui-form-group>
              </mui-card-body>
            </mui-card>
          </mui-v-stack>
        </div>
      </story-card>

      <story-card id="no-legend" title="No Legend" description="Form section composition without a section heading/legend.">
        <div slot="body" class="story-form-surface">
          <mui-form-section>
            <mui-form-group heading="Contact Preferences">
              <mui-field label="Billing Alerts">
                <mui-radio-group value="email">
                  <mui-radio value="email">Email</mui-radio>
                  <mui-radio value="sms">SMS</mui-radio>
                  <mui-radio value="none">None</mui-radio>
                </mui-radio-group>
                <mui-form-hint slot="message" style="color: var(--text-color-optional);">
                  <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
                  Use this when the surrounding card
                </mui-form-hint>
              </mui-field>
            </mui-form-group>
          </mui-form-section>
        </div>
      </story-card>

      <story-card id="card-compare" title="Card Spacing Compare" description="Reference spacing using mui-card and mui-card-body for side-by-side comparison.">
        <mui-card slot="body">
          <mui-card-body>
            <mui-form-group heading="Contact Preferences">
              <mui-field label="Billing Alerts">
                <mui-radio-group value="email">
                  <mui-radio value="email">Email</mui-radio>
                  <mui-radio value="sms">SMS</mui-radio>
                  <mui-radio value="none">None</mui-radio>
                </mui-radio-group>
                <mui-form-hint slot="message" style="color: var(--text-color-optional);">
                  <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
                  Use this card example to compare internal spacing against form-section
                </mui-form-hint>
              </mui-field>
            </mui-form-group>
          </mui-card-body>
        </mui-card>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        .story-form-surface {
          margin-inline: calc(var(--space-400) * -1);
          margin-block: calc(var(--space-400) * -1);
          padding: var(--space-400);
          background: var(--surface-elevated-200);
          box-sizing: border-box;
        }
        .form-group {
          display: grid;
          gap: var(--space-500);
        }
        .form-group + .form-group {
          margin-top: var(--space-300);
          padding-top: var(--space-500);
        }
        @media (max-width: 767px) {
          .story-form-surface {
            margin-inline: calc(var(--space-400) * -1);
            margin-block: calc(var(--space-400) * -1);
            padding: var(--space-400);
          }
        }
      </style>
      <story-template
        title="${data?.title || "Form Section"}"
        description="${data?.description || ""} These examples are designed to be used on a surface background."
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      >
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="account-setup::Account Setup Section|||billing::Billing Preferences Section|||no-legend::No Legend|||card-compare::Card Spacing Compare"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-form-section", StoryFormSection);
