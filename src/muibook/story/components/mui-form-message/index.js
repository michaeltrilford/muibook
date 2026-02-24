import { getComponentDocs } from "../../../utils/story-data";

class StoryFormMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormMessage");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-form-message";<br>
        </mui-code>
      </spec-card>

      <story-card id="patterns" title="Message Patterns" description="Icon-led supporting text with semantic color from usage context.">
        <div slot="body" class="story-form-surface">
          <mui-v-stack space="var(--space-200)">
            <mui-form-message variant="optional">
              Optional: Add a referral code.
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

      <story-card id="field-composition" title="Field Composition" description="Use Form Message on the owning Field via slot='message' for helper and validation copy.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Project Settings">
            <mui-form-group heading="Environment" hide-label>
              <mui-field label="Project Name">
                <mui-input placeholder="Atlas Redesign"></mui-input>
                <mui-form-message slot="message" variant="optional">
                  Visible to your entire workspace.
                </mui-form-message>
              </mui-field>

              <mui-field label="Environment">
                <mui-select options='[{"label":"Development","value":"dev"},{"label":"Staging","value":"staging"},{"label":"Production","value":"prod"}]' value="prod"></mui-select>
                <mui-form-message slot="message" variant="warning">
                  <mui-icon-warning slot="before"></mui-icon-warning>
                  Production changes require admin approval.
                </mui-form-message>
              </mui-field>

              <mui-field label="API Key">
                <mui-input value="pk_live_..." variant="error"></mui-input>
                <mui-form-message slot="message" variant="error">
                  <mui-icon-attention slot="before"></mui-icon-attention>
                  This key is invalid. Regenerate and try again.
                </mui-form-message>
              </mui-field>
            </mui-form-group>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-field label="API Key"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-input value="pk_live_..." variant="error"&gt;&lt;/mui-input&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-message slot="message" variant="error"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-attention slot="before"&gt;&lt;/mui-icon-attention&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;This key is invalid. Regenerate and try again.
          <br />
          &nbsp;&nbsp;&lt;/mui-form-message&gt;
          <br />
          &lt;/mui-field&gt;
        </story-code-block>
      </story-card>

      <story-card id="form-group-composition" title="Form Group Composition" description="Use Form Message directly inside Form Group for group-level guidance and section notes.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Billing Setup">
            <mui-form-group heading="Billing Preferences">
              <mui-form-message variant="optional">
                Changes apply on the next billing cycle.
              </mui-form-message>

              <mui-field label="Invoice Frequency">
                <mui-select options='[{"label":"Monthly","value":"monthly"},{"label":"Quarterly","value":"quarterly"},{"label":"Yearly","value":"yearly"}]' value="monthly"></mui-select>
              </mui-field>

              <mui-field label="Reference Code">
                <mui-input placeholder="Optional"></mui-input>
              </mui-field>

              <mui-form-message variant="warning">
                <mui-icon-warning slot="before"></mui-icon-warning>
                Enterprise billing changes may require admin approval.
              </mui-form-message>
            </mui-form-group>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-group heading="Billing Preferences"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-message variant="optional"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- default info icon --&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Changes apply on the next billing cycle.
          <br />
          &nbsp;&nbsp;&lt;/mui-form-message&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-form-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="Sizes" description="Hint typography and icon sizing across x-small, small, medium, and large body sizes.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-form-message size="x-small" variant="warning">
            <mui-icon-warning slot="before"></mui-icon-warning>
            X Small helper content
          </mui-form-message>
          <mui-form-message size="small" variant="warning">
            <mui-icon-warning slot="before"></mui-icon-warning>
            Small helper content
          </mui-form-message>
          <mui-form-message size="medium" variant="warning">
            <mui-icon-warning slot="before"></mui-icon-warning>
            Medium helper content
          </mui-form-message>
          <mui-form-message size="large" variant="warning">
            <mui-icon-warning slot="before"></mui-icon-warning>
            Large helper content
          </mui-form-message>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-message size="small" variant="warning"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-warning slot="before"&gt;&lt;/mui-icon-warning&gt;
          <br />
          &nbsp;&nbsp;small helper content
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
          background: var(--surface-elevated-200);
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
      >
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="patterns::Message Patterns|||field-composition::Field Composition|||form-group-composition::Form Group Composition|||sizes::Sizes"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-form-message", StoryFormMessage);
