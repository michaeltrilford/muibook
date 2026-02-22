import { getComponentDocs } from "../../../utils/story-data";

class storyMarkdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Markdown");

    const styles = /*css*/ `
      :host { display: block; }
    `;

    const propItems = [
      {
        name: "markdown",
        required: false,
        type: "string",
        options: "attribute",
        default: "",
        description: "Inline Markdown content (alternatively use the default slot).",
      },
      {
        name: "body-size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "small",
        description: "Controls the size used for paragraphs, lists, and list items.",
      },
      {
        name: "code-size",
        type: "string",
        options: "x-small, small, medium, large",
        default: "x-small",
        description: "Controls the size used for code blocks.",
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

    const example = /*html*/ `
      <story-card title="Body Size: Small">
        <div slot="body">
          <mui-markdown body-size="small" code-size="x-small">
## Markdown Title

Body text renders with small sizing.

- List item one
- List item two
          </mui-markdown>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-markdown body-size=&quot;small&quot; code-size=&quot;x-small&quot;&gt;...&lt;/mui-markdown&gt;
        </story-code-block>
      </story-card>

      <story-card title="Body Size: Medium">
        <div slot="body">
          <mui-markdown body-size="medium" code-size="small">
## Markdown Title

Body text renders with medium sizing.

- List item one
- List item two
          </mui-markdown>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-markdown body-size=&quot;medium&quot; code-size=&quot;small&quot;&gt;...&lt;/mui-markdown&gt;
        </story-code-block>
      </story-card>

      <story-card title="Markers: Grid, Box, Rule">
        <div slot="body">
          <mui-markdown body-size="small" code-size="x-small">
-- grid-col-1fr-1fr-1fr --
Column A
Column B
Column C
-- grid-col-1fr-1fr-1fr --

-- box --
This is a plain div wrapper.
-- box --

-- rule --
          </mui-markdown>
        </div>
        <story-code-block slot="footer" scrollable>
          -- grid-col-1fr-1fr-1fr -- ... -- grid-col-1fr-1fr-1fr --<br>
          -- box -- ... -- box --<br>
          -- rule --
        </story-code-block>
      </story-card>

      <story-card title="Markers: Space">
        <div slot="body">
          <mui-markdown body-size="small" code-size="x-small">
### Space 100
Body before
-- space-100 --
Body after

### Space 300
Body before
-- space-300 --
Body after

### Space 500
Body before
-- space-500 --
Body after

### Space 800
Body before
-- space-800 --
Body after
          </mui-markdown>
        </div>
        <story-code-block slot="footer" scrollable>
          -- space-100 -- / -- space-300 -- / -- space-500 -- / -- space-800 --
        </story-code-block>
      </story-card>

      <story-card title="Code Block">
        <div slot="body">
          <mui-markdown body-size="small" code-size="x-small">
~~~js
console.log("Hello from Muibook")
~~~
          </mui-markdown>
        </div>
        <story-code-block slot="footer" scrollable>
          ~~~js ... ~~~
        </story-code-block>
      </story-card>
    `;

    const stories = /*html*/ `
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-markdown";<br>
        </mui-code>
      </spec-card>

      <props-card title="Markdown">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      ${example}
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template 
        title="${data?.title || "Markdown"}"
        description="${data?.description || ""}"
        github="${data?.github || ""}"
        figma="${data?.figma || ""}"
        guides="${data?.guides || ""}"
        storybook="${data?.storybook || ""}"
        accessibility="${data?.accessibility?.engineerList?.join("|||") || ""}"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-markdown", storyMarkdown);
