import { getComponentDocs } from "../../../utils/story-data";

class StoryFormSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormSection");
    const attrsReference = JSON.stringify([
      {
        component: "mui-form-section",
        parentAttrs: ["has-header", "has-footer"],
        childAttrs: [],
      },
    ]);

    const stories = /*html*/ `
      <story-api-types tag="mui-form-section" title="Form Section"></story-api-types>

      <story-card id="account-setup" title="Account Setup Section" description="Real form grouping with Field, Input, Select, and Form Message. Intended for use on a surface background." usage="Use one form section for each major form area.|||Use form group to cluster related fields.|||Hide group labels when they repeat the section title.|||Use the default greyscale mui-form-message for lighter supporting copy tied to a specific field.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Account Setup">
            <mui-form-group heading="Account Details" hide-heading>
              <mui-field label="Email">
                <mui-input type="email" placeholder="you@company.com"></mui-input>
              </mui-field>
              <mui-field label="Role">
                <mui-select options='[{"label":"Product","value":"product"},{"label":"Engineering","value":"engineering"},{"label":"Design","value":"design"}]'></mui-select>
                <mui-form-message slot="message" style="color: var(--text-color-secondary);">
                  <mui-icon-info slot="before" color="var(--text-color-secondary)"></mui-icon-info>
                  We only use this information to tailor onboarding content.
                </mui-form-message>
              </mui-field>
            </mui-form-group>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-section heading="Account Setup"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-group heading="Account Details" hide-heading&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field label="Email"&gt;...&lt;/mui-field&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field label="Role"&gt;...&lt;/mui-field&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-form-group&gt;
          <br />
          &lt;/mui-form-section&gt;
        </story-code-block>
      </story-card>

      <story-card id="billing" title="Billing Preferences Section" description="Grouped controls with radio choices and inline guidance. Intended for use on a surface background." usage="Use horizontal groups for paired fields.|||Default split is 1fr / 20rem and stacks on mobile.|||Use form hints for helper or status text.|||Use a colored mui-form-message for stronger static section/group guidance, or the default greyscale version for lighter supporting copy.">
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
                  <mui-form-message slot="message" variant="warning" style="color: var(--text-color-warning);">
                    <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
                    Updating invoice frequency applies to the next billing cycle.
                  </mui-form-message>
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
                <mui-form-group variant="horizontal" hide-heading>
                  <mui-field label="Billing Contact">
                    <mui-input type="email" placeholder="billing@company.com"></mui-input>
                    <mui-form-message slot="message" style="color: var(--text-color-secondary);">
                      <mui-icon-info slot="before" color="var(--text-color-secondary)"></mui-icon-info>
                      You can update these preferences at any time
                    </mui-form-message>
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

      <story-card id="no-legend" title="No Legend" description="Form section composition without a section heading/legend." usage="Use the default greyscale mui-form-message when the supporting copy should stay visually quiet within the section.">
        <div slot="body" class="story-form-surface">
          <mui-form-section>
            <mui-form-group heading="Contact Preferences">
              <mui-field label="Billing Alerts">
                <mui-radio-group value="email">
                  <mui-radio value="email">Email</mui-radio>
                  <mui-radio value="sms">SMS</mui-radio>
                  <mui-radio value="none">None</mui-radio>
                </mui-radio-group>
                <mui-form-message slot="message" style="color: var(--text-color-secondary);">
                  <mui-icon-info slot="before" color="var(--text-color-secondary)"></mui-icon-info>
                  Use this when the surrounding card
                </mui-form-message>
              </mui-field>
            </mui-form-group>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-section&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-group heading="Contact Preferences"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field label="Billing Alerts"&gt;...&lt;/mui-field&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-form-group&gt;
          <br />
          &lt;/mui-form-section&gt;
        </story-code-block>
      </story-card>

      <story-card id="header-footer-slots" title="Header + Footer Slots" description="Custom section chrome/actions using form-section header/footer slots while keeping fieldset semantics." usage="Use header/footer slots for custom section chrome while retaining fieldset semantics.|||If header/footer uses mui-h-stack, switch to mui-v-stack at smaller breakpoints.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Commercial Licensing">
            <mui-responsive slot="header" breakpoint="1000">
              <div slot="showBelow">
                <mui-v-stack space="var(--space-200)" alignx="start">
                  <mui-heading size="5" level="3">Commercial Licensing</mui-heading>
                </mui-v-stack>
              </div>
              <div slot="showAbove">
                <mui-h-stack alignx="space-between" aligny="center">
                  <mui-heading size="5" level="3">Commercial Licensing</mui-heading>
                  <mui-link size="small" variant="tertiary" href="#" weight="regular">License</mui-link>
                </mui-h-stack>
              </div>
            </mui-responsive>

            <mui-field label="Company">
              <mui-input placeholder="Company name"></mui-input>
            </mui-field>
            <mui-field label="Use Case">
              <mui-textarea rows="3" placeholder="Briefly describe your product and intended usage."></mui-textarea>
            </mui-field>
            <mui-field label="Contact Email">
              <mui-input type="email" placeholder="you@company.com"></mui-input>
            </mui-field>

            <mui-form-section-footer slot="footer">
              <mui-rule></mui-rule>
              <mui-responsive breakpoint="1000">
                <div slot="showBelow">
                  <mui-v-stack alignx="stretch" space="var(--space-200)">
                    <mui-button variant="primary" size="medium">Request now</mui-button>
                    <mui-link variant="tertiary" href="#" weight="regular">License</mui-link>
                  </mui-v-stack>
                </div>
                <div slot="showAbove">
                  <mui-h-stack alignx="end" space="var(--space-200)">
                    <mui-button variant="primary" size="medium">Request now</mui-button>
                    <mui-link variant="tertiary" href="#" weight="regular">License</mui-link>
                  </mui-h-stack>
                </div>
              </mui-responsive>
            </mui-form-section-footer>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-section heading="Commercial Licensing"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-responsive slot="header" breakpoint="1000"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="showBelow"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&gt;...&lt;/mui-v-stack&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="showAbove"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack&gt;...&lt;/mui-h-stack&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-responsive&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-field label="Company"&gt;...&lt;/mui-field&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-field label="Use Case"&gt;...&lt;/mui-field&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-section-footer slot="footer"&gt;...&lt;/mui-form-section-footer&gt;
          <br />
          &lt;/mui-form-section&gt;
        </story-code-block>
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
                <mui-form-message slot="message" style="color: var(--text-color-secondary);">
                  <mui-icon-info slot="before" color="var(--text-color-secondary)"></mui-icon-info>
                  Use this card example to compare internal spacing against form-section
                </mui-form-message>
              </mui-field>
            </mui-form-group>
          </mui-card-body>
        </mui-card>
        <story-code-block slot="footer" scrollable>
          &lt;mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card-body&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-form-group heading="Contact Preferences"&gt;...&lt;/mui-form-group&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-card-body&gt;
          <br />
          &lt;/mui-card&gt;
        </story-code-block>
      </story-card>

      <story-card id="license-intake-simple" title="License Intake" description="Lean licensing inquiry pattern using Form Section with Field-level messaging.">
        <div slot="body" class="story-form-surface">
          <mui-v-stack space="var(--space-400)">
            <mui-form-section heading="Commercial Licensing">
              <mui-field label="Company">
                <mui-input placeholder="Company name"></mui-input>
              </mui-field>
              <mui-field label="Use Case">
                <mui-textarea rows="3" placeholder="Briefly describe your product and intended usage."></mui-textarea>
              </mui-field>
              <mui-field label="Contact Email">
                <mui-input type="email" placeholder="you@company.com"></mui-input>
                <mui-form-message slot="message" style="color: var(--text-color-secondary);">
                  <mui-icon-info slot="before" color="var(--text-color-secondary)"></mui-icon-info>
                  We reply with commercial licensing options based on your use case.
                </mui-form-message>
              </mui-field>
              <mui-form-section-footer slot="footer">
                <mui-rule></mui-rule>
                <mui-responsive breakpoint="1000">
                  <div slot="showBelow">
                    <mui-v-stack alignx="stretch" space="var(--space-200)">
                      <mui-button variant="primary" size="medium">Request now</mui-button>
                      <mui-link variant="tertiary" href="#" weight="regular">License</mui-link>
                    </mui-v-stack>
                  </div>
                  <div slot="showAbove">
                    <mui-h-stack alignx="end" space="var(--space-200)">
                      <mui-link variant="tertiary" href="#" weight="regular">License</mui-link>
                      <mui-button variant="primary" size="medium">Request now</mui-button>
                    </mui-h-stack>
                  </div>
                </mui-responsive>
              </mui-form-section-footer>
            </mui-form-section>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack space="var(--space-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-section heading="Commercial Licensing"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;...
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-form-section-footer slot="footer"&gt;...&lt;/mui-form-section-footer&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-form-section&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="host-contracts" title="Host Event Contracts" description="Form logic listens on the custom element host, reads event.detail, and checks host value or checked properties without querying shadow DOM internals.">
        <div slot="body" class="story-form-surface">
          <mui-v-stack space="var(--space-400)">
            <mui-form-section heading="Host Event Contracts">
              <mui-form-group variant="horizontal" heading="Text Controls" hide-heading>
                <mui-field label="Name">
                  <mui-input id="contractInput" value="Ada"></mui-input>
                </mui-field>
                <mui-field label="Role">
                  <mui-select
                    id="contractSelect"
                    value="design"
                    options='[{"label":"Design","value":"design"},{"label":"Engineering","value":"engineering"},{"label":"Product","value":"product"}]'
                  ></mui-select>
                </mui-field>
              </mui-form-group>
              <mui-form-group variant="horizontal" heading="Boolean Controls" hide-heading>
                <mui-field label="Enabled">
                  <mui-switch id="contractSwitch" label="Enabled" checked></mui-switch>
                </mui-field>
                <mui-field label="Terms">
                  <mui-checkbox id="contractCheckbox" checked>Accepted</mui-checkbox>
                </mui-field>
              </mui-form-group>
              <mui-form-group variant="horizontal" heading="Special Controls" hide-heading>
                <mui-field label="Priority">
                  <mui-range-input id="contractRange" min="0" max="10" value="4"></mui-range-input>
                </mui-field>
                <mui-field label="Tags">
                  <mui-chip-input
                    id="contractChipInput"
                    value='["alpha"]'
                    options='["alpha","beta","gamma"]'
                    allow-custom
                  ></mui-chip-input>
                </mui-field>
              </mui-form-group>
              <mui-form-group variant="horizontal" heading="Picker Controls" hide-heading>
                <mui-field label="Date">
                  <mui-date-picker id="contractDatePicker" value="2026-07-04"></mui-date-picker>
                </mui-field>
                <mui-field label="Time">
                  <mui-time-picker id="contractTimePicker" value="09:30 AM"></mui-time-picker>
                </mui-field>
              </mui-form-group>
            </mui-form-section>
            <mui-code id="hostContractOutput" size="x-small"></mui-code>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          control.addEventListener("input", updateFromHost);<br />
          control.addEventListener("change", updateFromHost);<br />
          const value = event.detail?.value ?? event.currentTarget.value;<br />
          const checked = event.detail?.checked ?? event.currentTarget.checked;
        </story-code-block>
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
        #hostContractOutput {
          display: block;
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
        attrs-reference='${attrsReference}'
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-form-section"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="account-setup::Account Setup Section|||billing::Billing Preferences Section|||no-legend::No Legend|||header-footer-slots::Header + Footer Slots|||card-compare::Card Spacing Compare|||license-intake-simple::License Intake|||host-contracts::Host Event Contracts"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
    this.setupHostContractDemo();
  }

  setupHostContractDemo() {
    const output = this.shadowRoot.getElementById("hostContractOutput");
    if (!output) return;

    const ids = [
      "contractInput",
      "contractSelect",
      "contractSwitch",
      "contractCheckbox",
      "contractRange",
      "contractChipInput",
      "contractDatePicker",
      "contractTimePicker",
    ];

    const getValue = (control) => {
      if ("checked" in control && (control.localName === "mui-checkbox" || control.localName === "mui-switch")) {
        return control.checked;
      }
      if ("value" in control) return control.value;
      return control.getAttribute("value") || "";
    };

    const update = (event) => {
      const values = Object.fromEntries(
        ids.map((id) => {
          const control = this.shadowRoot.getElementById(id);
          return [id.replace("contract", ""), control ? getValue(control) : null];
        }),
      );

      if (event) {
        values.lastEvent = {
          type: event.type,
          target: event.currentTarget.id,
          detail: event.detail || null,
        };
      }

      output.textContent = JSON.stringify(values, null, 2);
    };

    ids.forEach((id) => {
      const control = this.shadowRoot.getElementById(id);
      if (!control) return;
      control.addEventListener("input", update);
      control.addEventListener("change", update);
    });

    update();
  }
}

customElements.define("story-form-section", StoryFormSection);
