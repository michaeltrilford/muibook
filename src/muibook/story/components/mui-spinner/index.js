import { getComponentDocs } from "../../../utils/story-data";

class StorySpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Spinner");

    const propItems = [
      {
        name: "size",
        type: "string",
        options: "xx-small, x-small, small, medium, large",
        default: "medium",
        description: "Controls spinner dimensions.",
      },
      {
        name: "color",
        type: "string",
        options: "token, css value",
        default: "var(--icon-color-default)",
        description: "Sets spinner stroke color.",
      },
      {
        name: "duration",
        type: "string",
        options: "css duration",
        default: "0.8s",
        description: "Controls rotation speed.",
      },
      {
        name: "label",
        type: "string",
        options: "",
        default: "Loading",
        description: "Accessible label for assistive technology.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            name="${prop.name}"
            type="${prop.type}"
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `
      )
      .join("");

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-spinner";<br>
        </mui-code>
      </spec-card>

      <props-card title="Spinner">
        <story-type-table slot="body">
          ${rows}
        </story-type-table>
      </props-card>

      <story-card id="sizes" title="Sizes">
        <mui-h-stack slot="body" alignX="start" alignY="center" space="var(--space-400)" style="padding: var(--space-500);">
          <mui-spinner size="xx-small"></mui-spinner>
          <mui-spinner size="x-small"></mui-spinner>
          <mui-spinner size="small"></mui-spinner>
          <mui-spinner size="medium"></mui-spinner>
          <mui-spinner size="large"></mui-spinner>
        </mui-h-stack>
      </story-card>

      <story-card id="custom" title="Color and Duration">
        <mui-h-stack slot="body" alignX="start" alignY="center" space="var(--space-500)" style="padding: var(--space-500);">
          <mui-spinner color="var(--text-color-warning)" label="Loading warning content"></mui-spinner>
          <mui-spinner color="var(--text-color-success)" duration="1.2s" label="Loading success content"></mui-spinner>
          <mui-spinner color="var(--text-color-error)" duration="0.6s" label="Loading error content"></mui-spinner>
        </mui-h-stack>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Spinner"}"
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
          links="sizes::Sizes|||custom::Color and Duration"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-spinner", StorySpinner);
