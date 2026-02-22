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
            <mui-form-hint style="color: var(--text-color-default);">
              Use your work email so teammates can find your account.
            </mui-form-hint>
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
      </story-card>

      <story-card id="field-composition" title="Field Composition" description="Real usage under Field controls, with helper text and validation feedback.">
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
        title="${data?.title || "Form Hint"}"
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
          links="patterns::Message Patterns|||field-composition::Field Composition|||sizes::Sizes"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-form-hint", StoryFormHint);
