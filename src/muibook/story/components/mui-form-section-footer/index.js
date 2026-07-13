import { getComponentDocs } from "../../../utils/story-data";

class StoryFormSectionFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormSectionFooter");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Form Section Footer"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));
    const attrsReference = JSON.stringify([
      {
        component: "mui-form-section-footer",
        parentAttrs: ["has-rule"],
        childAttrs: [],
      },
    ]);

    const stories = /*html*/ `
      <story-api-types tag="mui-form-section-footer" title="Form Section Footer"></story-api-types>

      <story-card id="default-footer-wrapper" title="${storyMeta["default-footer-wrapper"].title}" description="${storyMeta["default-footer-wrapper"].description}" usage="${storyMeta["default-footer-wrapper"].usage}">
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

      <story-card id="with-divider" title="${storyMeta["with-divider"].title}" description="${storyMeta["with-divider"].description}" usage="${storyMeta["with-divider"].usage}">
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
        attrs-reference='${attrsReference}'
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-form-section-footer"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-form-section-footer", StoryFormSectionFooter);
