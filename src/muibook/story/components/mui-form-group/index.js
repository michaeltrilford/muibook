import { getComponentDocs } from "../../../utils/story-data";

class StoryFormGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("FormGroup");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-form-group";<br>
        </mui-code>
      </spec-card>

      <story-card id="default" title="Default Group" description="Standard group with heading and stacked controls.">
        <mui-form-group slot="body" heading="Account Details">
          <mui-field label="Email">
            <mui-input type="email" placeholder="you@company.com"></mui-input>
          </mui-field>
          <mui-field label="Role">
            <mui-select options='[{"label":"Product","value":"product"},{"label":"Engineering","value":"engineering"},{"label":"Design","value":"design"}]'></mui-select>
          </mui-field>
        </mui-form-group>
      </story-card>

      <story-card id="horizontal" title="Horizontal Variant" description="Split row layout with responsive stack on mobile.">
        <mui-form-group slot="body" variant="horizontal" hide-label>
          <mui-field label="Billing Contact">
            <mui-input type="email" placeholder="billing@company.com"></mui-input>
          </mui-field>
          <mui-field label="Notification Limit">
            <mui-input placeholder="3"></mui-input>
            <mui-form-hint slot="message" style="color: var(--text-color-optional);">
              <mui-icon-info slot="before" color="var(--text-color-optional)"></mui-icon-info>
              Override width with --form-group-horizontal-template
            </mui-form-hint>
          </mui-field>
        </mui-form-group>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Form Group"}"
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
          links="default::Default Group|||horizontal::Horizontal Variant"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-form-group", StoryFormGroup);
