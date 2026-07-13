import { getComponentDocs } from "../../../utils/story-data";

class StoryFormGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormGroup");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Form Group"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const stories = /*html*/ `
      <story-api-types tag="mui-form-group" title="Form Group"></story-api-types>

      <story-card id="vertical-group" title="${storyMeta["vertical-group"].title}" description="${storyMeta["vertical-group"].description}" usage="${storyMeta["vertical-group"].usage}">
        <div slot="body" class="story-form-surface">
          <mui-form-group heading="Billing Cycle">
            <mui-field label="Invoice Frequency">
              <mui-radio-group value="monthly">
                <mui-radio value="monthly">Monthly</mui-radio>
                <mui-radio value="quarterly">Quarterly</mui-radio>
                <mui-radio value="yearly">Yearly</mui-radio>
              </mui-radio-group>
              <mui-form-message slot="message" variant="warning">
                <mui-icon-warning slot="before" color="var(--text-color-warning)"></mui-icon-warning>
                Updating invoice frequency applies to the next billing cycle.
              </mui-form-message>
            </mui-field>
            <mui-field label="Reference Code">
              <mui-input placeholder="Optional"></mui-input>
            </mui-field>
          </mui-form-group>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-group heading="Billing Cycle"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-field label="Invoice Frequency"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-radio-group value="monthly"&gt;...&lt;/mui-radio-group&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-form-message slot="message" variant="warning"&gt;...&lt;/mui-form-message&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-field&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-field label="Reference Code"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input placeholder="Optional"&gt;&lt;/mui-input&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-field&gt;
          <br />
          &lt;/mui-form-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="horizontal-group" title="${storyMeta["horizontal-group"].title}" description="${storyMeta["horizontal-group"].description}" usage="${storyMeta["horizontal-group"].usage}">
        <div slot="body" class="story-form-surface">
          <mui-v-stack space="var(--space-300)">
            <mui-form-group variant="horizontal" hide-heading>
              <mui-field label="Billing Contact">
                <mui-input type="email" placeholder="billing@company.com"></mui-input>
              </mui-field>
              <mui-field label="Notification Limit">
                <mui-input placeholder="3"></mui-input>
              </mui-field>
            </mui-form-group>
            <mui-form-message>
              <mui-icon-info slot="before" color="var(--text-color-secondary)"></mui-icon-info>
              You can update these preferences at any time.
            </mui-form-message>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack space="var(--space-300)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-group variant="horizontal" hide-heading&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field label="Billing Contact"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input type="email" placeholder="billing@company.com"&gt;&lt;/mui-input&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field label="Notification Limit"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input placeholder="3"&gt;&lt;/mui-input&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-form-group&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-form-message&gt;...&lt;/mui-form-message&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card id="select-action" title="${storyMeta["select-action"].title}" description="${storyMeta["select-action"].description}" usage="${storyMeta["select-action"].usage}">
        <div slot="body" class="story-form-surface">
          <mui-form-group variant="horizontal" space="var(--space-300)" aligny="end">
            <mui-select
              label="Saved View"
              options='[
                {"value": "open-tasks", "label": "Open Tasks"},
                {"value": "blocked", "label": "Blocked"},
                {"value": "recent", "label": "Recently Updated"}
              ]'>
            </mui-select>
            <mui-button variant="secondary" stroke="ring">Save View</mui-button>
          </mui-form-group>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-group variant="horizontal" space="var(--space-300)" aligny="end"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-select label="Saved View" options='[{...}]'&gt;&lt;/mui-select&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-button variant="secondary" stroke="ring"&gt;Save View&lt;/mui-button&gt;
          <br />
          &lt;/mui-form-group&gt;
        </story-code-block>
      </story-card>

      <story-card id="heading-level-space" title="${storyMeta["heading-level-space"].title}" description="${storyMeta["heading-level-space"].description}" usage="${storyMeta["heading-level-space"].usage}">
        <div slot="body" class="story-form-surface">
          <mui-v-stack space="var(--space-500)">
            <mui-form-group heading="Billing Cycle" heading-level="3">
              <mui-field label="Reference Code">
                <mui-input placeholder="Optional"></mui-input>
              </mui-field>
            </mui-form-group>

            <mui-form-group heading="Billing Cycle" heading-level="4" heading-space="var(--space-700)">
              <mui-field label="Reference Code">
                <mui-input placeholder="Optional"></mui-input>
              </mui-field>
            </mui-form-group>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-form-group heading="Billing Cycle" heading-level="4" heading-space="var(--space-700)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-field label="Reference Code"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input placeholder="Optional"&gt;&lt;/mui-input&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-field&gt;
          <br />
          &lt;/mui-form-group&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        .story-form-surface {
          margin-inline: calc(var(--space-400) * -1);
          margin-block: calc(var(--space-400) * -1);
          padding: var(--space-400);
          background: var(--surface-elevated-100);
          box-sizing: border-box;
        }
      </style>
      <story-template
        title="${data?.title || "Form Group"}"
        description="${data?.description || ""}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"

        imports='["@muibook/components/mui-form-group"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-form-group", StoryFormGroup);
