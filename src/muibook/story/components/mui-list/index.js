import { getComponentDocs } from "../../../utils/story-data";

class storyList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("List");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="List"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propList = [
      {
        name: "slot",
        required: true,
        type: "string",
        options: "mui-list-item",
        default: "(required)",
        description: "Slot in the list item(s)",
      },
      {
        name: "as",
        type: "string",
        options: "ol, ul",
        default: "ul",
        description: "Choose between ordered or unordered list",
      },
      {
        name: "style",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use styles to add layout based CSS to the host element.",
      },
      {
        name: "class",
        type: "string",
        options: "Valid CSS",
        default: "",
        description: "You are able to use add a classname to add layout based CSS to the host element.",
      },
    ];

    const stories = /*html*/ `
      <mui-v-stack space="var(--space-100)">
        <story-api-types tag="mui-list" title="List"></story-api-types>
        <story-api-types tag="mui-list-item" title="List Item"></story-api-types>
      </mui-v-stack>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">

          <div slot="body">
            <mui-v-stack space="var(--space-500)">
              <mui-v-stack space="var(--space-200)">
                <mui-heading size="4" >X-Small</mui-heading>

                <mui-list as="ol">
                  <mui-list-item size="x-small">Coffee</mui-list-item>
                  <mui-list-item size="x-small">Tea</mui-list-item>
                  <mui-list-item size="x-small">Milk</mui-list-item>
                </mui-list>

              </mui-v-stack>
              <mui-v-stack space="var(--space-200)">
                <mui-heading size="4" >Small</mui-heading>

                <mui-list as="ol">
                  <mui-list-item size="small">Coffee</mui-list-item>
                  <mui-list-item size="small">Tea</mui-list-item>
                  <mui-list-item size="small">Milk</mui-list-item>
                </mui-list>

              </mui-v-stack>
              <mui-v-stack space="var(--space-200)">
                <mui-heading size="4" >Medium</mui-heading>

                <mui-list as="ol">
                  <mui-list-item size="medium">Coffee</mui-list-item>
                  <mui-list-item size="medium">Tea</mui-list-item>
                  <mui-list-item size="medium">Milk</mui-list-item>
                </mui-list>

              </mui-v-stack>
              <mui-v-stack space="var(--space-200)">
                <mui-heading size="4" >Large</mui-heading>

                <mui-list as="ol">
                  <mui-list-item size="large">Coffee</mui-list-item>
                  <mui-list-item size="large">Tea</mui-list-item>
                  <mui-list-item size="large">Milk</mui-list-item>
                </mui-list>

              </mui-v-stack>
            </mui-v-stack>
          </div>

          <story-code-block slot="footer" scrollable>
            &lt;mui-list-item size="x-small"&gt;
            <br />
            &nbsp;&nbsp;{text}
            <br />
            &lt;/mui-list-item&gt;
            <br />
            <br />
            &lt;mui-list-item size="small"&gt;
            <br />
            &nbsp;&nbsp;{text}
            <br />
            &lt;/mui-list-item&gt;
            <br />
            <br />
            &lt;mui-list-item size="medium"&gt;
            <br />
            &nbsp;&nbsp;{text}
            <br />
            &lt;/mui-list-item&gt;
            <br />
            <br />
            &lt;mui-list-item size="large"&gt;
            <br />
            &nbsp;&nbsp;{text}
            <br />
            &lt;/mui-list-item&gt;
          </story-code-block>

      </story-card>


      <story-card id="unordered" title="${storyMeta["unordered"].title}" description="${storyMeta["unordered"].description}" usage="${storyMeta["unordered"].usage}">

        <div slot="body">
        <mui-list as="ol">
          <mui-list-item>Coffee</mui-list-item>
          <mui-list-item>Tea</mui-list-item>
          <mui-list-item>Milk</mui-list-item>
        </mui-list>
        </div>

        <story-code-block slot="footer" scrollable>
          &lt;mui-list as="ol"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
          <br />
          &lt;/mui-list&gt;
        </story-code-block>

      </story-card>

      <story-card id="ordered" title="${storyMeta["ordered"].title}" description="${storyMeta["ordered"].description}" usage="${storyMeta["ordered"].usage}">

        <div slot="body">
          <mui-list as="ul">
            <mui-list-item>Coffee</mui-list-item>
            <mui-list-item>Tea</mui-list-item>
            <mui-list-item>Milk</mui-list-item>
          </mui-list>
        </div>

        <story-code-block slot="footer" scrollable>
          &lt;mui-list as="ul"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-list-item&gt;{text}&lt;/mui-list-item&gt;
          <br />
          &lt;/mui-list&gt;
        </story-code-block>

      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"

        imports='["@muibook/components/mui-list"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-list", storyList);
