import { getComponentDocs } from "../../../utils/story-data";

class storyHeading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Heading");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "string",
        options: "{text}",
        default: "(required)",
        description: "Text for the heading element.",
      },
      {
        name: "size",
        type: "string",
        options: "1, 2, 3, 4, 5, 6",
        default: "1",
        description: "Set the visual size of the heading.",
      },
      {
        name: "level",
        type: "string",
        options: "1, 2, 3, 4, 5, 6",
        default: "1",
        description: "Set the semantic size of the heading for correct screen reader behaviour.",
      },
      {
        name: "truncate",
        type: "boolean",
        options: "truncate",
        default: "",
        description: "Clamp heading text to one line with ellipsis when the available width is constrained.",
      },
      {
        name: "clamp",
        type: "number",
        options: "1, 2, 3...",
        default: "",
        description: "Limit heading text to a set number of lines. Ignored when truncate is present.",
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

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            ${prop.required ? "required" : ""}
            name="${prop.name}"
            type="${prop.type}" 
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `
      )
      .join("");

    const accordions = propItems
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItems.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block 
            size="medium" 
            heading=${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)} 
            ${isLastChild}>
            <story-type-slat
              slot="detail"
              ${prop.required ? "required" : ""}
              name="${prop.name}"
              type="${prop.type}" 
              options="${prop.options || ""}"
              default="${prop.default || ""}"
              description="${prop.description}">
            </story-type-slat>
          </mui-accordion-block>
        `;
      })
      .join("");

    const stories = /*html*/ `
      <story-api-types tag="mui-heading" title="Heading"></story-api-types>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="1">Heading 1</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="1"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="2">Heading 2</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="2"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="3">Heading 3</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="3"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="4">Heading 4</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="4"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="5">Heading 5</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="5"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card noHeader>
        <div slot="body">
          <mui-heading size="6">Heading 6</mui-heading>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size="6"&gt; ... &lt;/mui-heading&gt;
        </story-code-block>
      </story-card>

      <story-card title="Overflow" description="Use truncate for one-line heading overflow and clamp for bounded multi-line headings.">
        <div slot="body">
          <mui-v-stack space="var(--space-400)" alignx="start">
            <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
              <mui-v-stack space="var(--space-100)">
                <mui-body size="small" variant="optional">Truncate</mui-body>
                <mui-heading size="4" level="3" truncate>
                  Enterprise subscription analytics workspace overview
                </mui-heading>
              </mui-v-stack>
            </div>

            <div style="width: min(100%, 28rem); border: var(--border-thin); border-radius: var(--radius-200); padding: var(--space-300);">
              <mui-v-stack space="var(--space-100)">
                <mui-body size="small" variant="optional">Clamp</mui-body>
                <mui-heading size="3" level="3" clamp="2">
                  Enterprise subscription analytics and lifecycle reporting workspace overview
                </mui-heading>
              </mui-v-stack>
            </div>
          </mui-v-stack>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-heading size=&quot;4&quot; level=&quot;3&quot; truncate&gt;
          <br>
          &nbsp;&nbsp;{long heading}
          <br>
          &lt;/mui-heading&gt;
          <br>
          <br>
          &lt;mui-heading size=&quot;3&quot; level=&quot;3&quot; clamp=&quot;2&quot;&gt;
          <br>
          &nbsp;&nbsp;{long heading}
          <br>
          &lt;/mui-heading&gt;
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
      
        imports='["@muibook/components/mui-heading"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-heading", storyHeading);
