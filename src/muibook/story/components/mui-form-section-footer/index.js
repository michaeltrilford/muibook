import { getComponentDocs } from "../../../utils/story-data";

class StoryFormSectionFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormSectionFooter");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-form-section-footer";<br>
        </mui-code>
      </spec-card>

      <story-card id="default" title="Default Footer Wrapper" description="Use form-section-footer in slot='footer' to standardise action spacing.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Commercial Licensing">
            <mui-field label="Company">
              <mui-input placeholder="Company name"></mui-input>
            </mui-field>
            <mui-field label="Use Case">
              <mui-textarea rows="3" placeholder="Briefly describe your product and intended usage."></mui-textarea>
            </mui-field>
            <mui-form-section-footer slot="footer">
              <mui-responsive breakpoint="700">
                <mui-v-stack slot="showBelow" space="var(--space-200)" alignx="stretch">
                  <mui-link size="medium" variant="tertiary" href="#" weight="regular">License</mui-link>
                  <mui-button variant="primary" size="medium">Request now</mui-button>
                </mui-v-stack>
                <mui-h-stack slot="showAbove" space="var(--space-200)" alignx="end" aligny="center">
                  <mui-link size="medium" variant="tertiary" href="#" weight="regular">License</mui-link>
                  <mui-button variant="primary" size="medium">Request now</mui-button>
                </mui-h-stack>
              </mui-responsive>
            </mui-form-section-footer>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-section-footer slot="footer"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-responsive breakpoint="700"&gt;...&lt;/mui-responsive&gt;
          <br />
          &lt;/mui-form-section-footer&gt;
        </story-code-block>
      </story-card>

      <story-card id="divider" title="With Divider" description="Place mui-rule first and the footer wrapper applies divider spacing without inline margins.">
        <div slot="body" class="story-form-surface">
          <mui-form-section heading="Commercial Licensing">
            <mui-field label="Contact Email">
              <mui-input type="email" placeholder="you@company.com"></mui-input>
            </mui-field>
            <mui-form-section-footer slot="footer">
              <mui-rule></mui-rule>
              <mui-responsive breakpoint="700">
                <mui-v-stack slot="showBelow" space="var(--space-200)" alignx="stretch">
                  <mui-link size="medium" variant="tertiary" href="#" weight="regular">License</mui-link>
                  <mui-button variant="primary" size="medium">Request now</mui-button>
                </mui-v-stack>
                <mui-h-stack slot="showAbove" space="var(--space-200)" alignx="end" aligny="center">
                  <mui-link size="medium" variant="tertiary" href="#" weight="regular">License</mui-link>
                  <mui-button variant="primary" size="medium">Request now</mui-button>
                </mui-h-stack>
              </mui-responsive>
            </mui-form-section-footer>
          </mui-form-section>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-section-footer slot="footer"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-responsive breakpoint="700"&gt;...&lt;/mui-responsive&gt;
          <br />
          &lt;/mui-form-section-footer&gt;
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
        title="${data?.title || "Form Section Footer"}"
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
          links="default::Default Footer Wrapper|||divider::With Divider"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-form-section-footer", StoryFormSectionFooter);

