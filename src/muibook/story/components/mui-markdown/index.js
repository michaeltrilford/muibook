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
      {
        name: "render-mode",
        type: "string",
        options: "shadow, light",
        default: "shadow",
        description: "Render into shadow DOM (default) or light DOM for external TOC/querying.",
      },
      {
        name: "lightbox",
        type: "boolean",
        options: "attribute",
        default: "false",
        description: "Enables image click-to-open lightbox overlay and dispatches lightbox events.",
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

      <story-card title="Layout Tokens: Grid / Box / Rule / Space">
        <div slot="body">
          <mui-markdown body-size="small" code-size="x-small">
-- grid-col-1fr-1fr-1fr --
Column A
Column B
Column C
-- grid-end --

-- box --
This is a plain div wrapper.
-- box --

-- rule --

Body before space
-- space-300 --
Body after space
          </mui-markdown>
        </div>
        <story-code-block slot="footer" scrollable>
          -- grid-col-1fr-1fr-1fr -- ... -- grid-end --<br>
          -- box -- ... -- box --<br>
          -- rule --<br>
          -- space-300 --
        </story-code-block>
      </story-card>

      <story-card title="Stack Tokens: VStack / HStack / Responsive Stack">
        <div slot="body">
          <mui-markdown body-size="small" code-size="x-small">
-- vstack-space-200-start --
### VStack Group
- Item A
- Item B
-- vstack-end --

-- hstack-space-300-start --
Left content
Right content
-- hstack-end --

-- stack-space-400-bp-550-start --
### Mobile First
Column one
Column two
-- stack-end --
          </mui-markdown>
        </div>
        <story-code-block slot="footer" scrollable>
          -- vstack-space-200-start -- ... -- vstack-end --<br>
          -- hstack-space-300-start -- ... -- hstack-end --<br>
          -- stack-space-400-bp-550-start -- ... -- stack-end --
        </story-code-block>
      </story-card>

      <story-card title="Table Columns Token">
        <div slot="body">
          <mui-markdown body-size="small" code-size="x-small">
-- table-columns-1fr-2fr --

| Field | Purpose |
| --- | --- |
| type | Component key |
| htmlTag | Element tag |
          </mui-markdown>
        </div>
        <story-code-block slot="footer" scrollable>
          -- table-columns-1fr-2fr --
        </story-code-block>
      </story-card>

      <story-card title="Code Block Actions: Expand + Copy">
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

      <story-card title="Image Lightbox + Event Hooks (Vanilla)">
        <div slot="body" id="markdown-event-demo">
          <mui-markdown id="lightbox-demo" lightbox body-size="small" code-size="x-small">
![Quadrant](https://raw.githubusercontent.com/michaeltrilford/Redactd/main/public/images/quadrant.png)
          </mui-markdown>
          <mui-body size="x-small" variant="optional" id="markdown-event-log" style="margin-top: var(--space-200);">
            Click image to open lightbox.
          </mui-body>
        </div>
        <story-code-block slot="footer" scrollable>
          element.addEventListener("mui-markdown-image-click", ...)<br>
          element.addEventListener("mui-markdown-lightbox-change", ...)
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

    const eventDemo = this.shadowRoot.getElementById("lightbox-demo");
    const eventLog = this.shadowRoot.getElementById("markdown-event-log");
    if (eventDemo && eventLog) {
      eventDemo.addEventListener("mui-markdown-image-click", () => {
        eventLog.textContent = "Event: mui-markdown-image-click";
      });
      eventDemo.addEventListener("mui-markdown-lightbox-change", (event) => {
        const isOpen = Boolean(event?.detail?.open);
        eventLog.textContent = `Event: mui-markdown-lightbox-change (${isOpen ? "open" : "closed"})`;
      });
    }
  }
}

customElements.define("story-markdown", storyMarkdown);
