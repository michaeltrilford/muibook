import { getComponentDocs } from "../../../utils/story-data";

class StoryFormHint extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormHint");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-form-hint";<br>
        </mui-code>
      </spec-card>

      <story-card id="patterns" title="Message Patterns" description="Icon-led supporting text with semantic color from usage context.">
        <div slot="body" class="story-form-surface">
          <mui-v-stack space="var(--space-200)">
            <mui-form-hint style="color: var(--text-color-optional);">
              <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
              Optional: Add a referral code.
            </mui-form-hint>
            <mui-form-hint style="color: var(--text-color-warning);">
              <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
              Your password expires in 5 days.
            </mui-form-hint>
            <mui-form-hint style="color: var(--text-color-success);">
              <mui-icon-check slot="before" color="var(--text-color-success)"></mui-icon-check>
              Email looks good and is available.
            </mui-form-hint>
            <mui-form-hint style="color: var(--text-color-error);">
              <mui-icon-attention slot="before" color="var(--text-color-error)"></mui-icon-attention>
              Enter a valid email address.
            </mui-form-hint>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-hint style="color: var(--text-color-warning);"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-warning slot="before" color="var(--text-color-warning)"&gt;&lt;/mui-icon-warning&gt;
          <br />
          &nbsp;&nbsp;Your password expires in 5 days.
          <br />
          &lt;/mui-form-hint&gt;
        </story-code-block>
      </story-card>

      <story-card id="field-composition" title="Field Composition" description="Use Form Hint on the owning Field via slot='message' for helper and validation copy.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Project Settings">
            <mui-form-group heading="Environment" hide-label>
              <mui-field label="Project Name">
                <mui-input placeholder="Atlas Redesign"></mui-input>
                <mui-form-hint slot="message" style="color: var(--text-color-optional);">Visible to your entire workspace.</mui-form-hint>
              </mui-field>

              <mui-field label="Environment">
                <mui-select options='[{"label":"Development","value":"dev"},{"label":"Staging","value":"staging"},{"label":"Production","value":"prod"}]' value="prod"></mui-select>
                <mui-form-hint slot="message" style="color: var(--text-color-warning);">
                  <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
                  Production changes require admin approval.
                </mui-form-hint>
              </mui-field>

              <mui-field label="API Key">
                <mui-input value="pk_live_..." variant="error"></mui-input>
                <mui-form-hint slot="message" style="color: var(--text-color-error);">
                  <mui-icon-attention slot="before" color="var(--text-color-error)"></mui-icon-attention>
                  This key is invalid. Regenerate and try again.
                </mui-form-hint>
              </mui-field>
            </mui-form-group>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-field label="API Key"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-input value="pk_live_..." variant="error"&gt;&lt;/mui-input&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-hint slot="message" style="color: var(--text-color-error);"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-attention slot="before" color="var(--text-color-error)"&gt;&lt;/mui-icon-attention&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;This key is invalid. Regenerate and try again.
          <br />
          &nbsp;&nbsp;&lt;/mui-form-hint&gt;
          <br />
          &lt;/mui-field&gt;
        </story-code-block>
      </story-card>

      <story-card id="form-group-composition" title="Form Group Composition" description="Use Form Hint directly inside Form Group for group-level guidance and section notes.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Billing Setup">
            <mui-form-group heading="Billing Preferences">
              <mui-form-hint style="color: var(--text-color-optional);">
                <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
                Changes apply on the next billing cycle.
              </mui-form-hint>

              <mui-field label="Invoice Frequency">
                <mui-select options='[{"label":"Monthly","value":"monthly"},{"label":"Quarterly","value":"quarterly"},{"label":"Yearly","value":"yearly"}]' value="monthly"></mui-select>
              </mui-field>

              <mui-field label="Reference Code">
                <mui-input placeholder="Optional"></mui-input>
              </mui-field>

              <mui-form-hint style="color: var(--text-color-warning);">
                <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
                Enterprise billing changes may require admin approval.
              </mui-form-hint>
            </mui-form-group>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-group heading="Billing Preferences"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-hint style="color: var(--text-color-optional);"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-info slot="before" color="var(--text-color-optional)"&gt;&lt;/mui-icon-info&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Changes apply on the next billing cycle.
          <br />
          &nbsp;&nbsp;&lt;/mui-form-hint&gt;
          <br />
          &nbsp;&nbsp;...
          <br />
          &lt;/mui-form-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="Sizes" description="Hint typography and icon sizing across x-small, small, medium, and large body sizes.">
        <mui-v-stack slot="body" space="var(--space-200)">
          <mui-form-hint size="x-small" style="color: var(--text-color-warning);">
            <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
            x-small helper content
          </mui-form-hint>
          <mui-form-hint size="small" style="color: var(--text-color-warning);">
            <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
            small helper content
          </mui-form-hint>
          <mui-form-hint size="medium" style="color: var(--text-color-warning);">
            <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
            medium helper content
          </mui-form-hint>
          <mui-form-hint size="large" style="color: var(--text-color-warning);">
            <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
            large helper content
          </mui-form-hint>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-hint size="small" style="color: var(--text-color-warning);"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-icon-warning slot="before" color="var(--text-color-warning)"&gt;&lt;/mui-icon-warning&gt;
          <br />
          &nbsp;&nbsp;small helper content
          <br />
          &lt;/mui-form-hint&gt;
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

customElements.define("story-form-hint", StoryFormHint);
