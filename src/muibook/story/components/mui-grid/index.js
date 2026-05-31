import { getComponentDocs } from "../../../utils/story-data";

class storyGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Grid");

    const styles = /*css*/ `
      :host { display: block; }
      .sized-grid {
        box-sizing: border-box;
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-recessed-100);
      }
    `;

    const propItems = [
      {
        name: "slot",
        type: "slot (default)",
        options: "{mui-elements}, {elements}",
        default: "(required)",
        description: "Slot in content to be displayed in a grid format.",
      },
      {
        name: "col",
        type: "string",
        options: "1fr, 1fr 1fr, etc...",
        default: "",
        description: "Adjust the column rules.",
      },
      {
        name: "space",
        type: "string",
        options: "var(--space-xxx)",
        default: "",
        description: "Adjust the gap between columns.",
      },
      {
        name: "padding",
        type: "string",
        options: "var(--space-100), var(--space-200), etc...",
        default: "var(--space-000)",
        description: "Sets inset spacing inside the layout using CSS padding shorthand.",
      },
      {
        name: "alignX",
        type: "string",
        options: "start, center, end, stretch, etc...",
        default: "normal",
        description: "Horizontally aligns items within their grid cells.",
      },
      {
        name: "alignY",
        type: "string",
        options: "start, center, end, stretch, etc...",
        default: "normal",
        description: "Vertically aligns items within their grid cells.",
      },
      {
        name: "height",
        type: "string",
        options: "{css-size}",
        default: "auto",
        description: "Sets a custom height for the grid layout, such as 100dvh or 20rem.",
      },
      {
        name: "width",
        type: "string",
        options: "{css-size}",
        default: "auto",
        description: "Sets a custom width for the grid layout, such as 100% or 32rem.",
      },
      {
        name: "viewport",
        type: "boolean",
        options: "true, false",
        default: "false",
        description: "Sets the grid height to 100dvh.",
      },
      {
        name: "fill",
        type: "boolean",
        options: "true, false",
        default: "false",
        description: "Sets the grid height and width to 100% of its available parent.",
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
        type: "CSS",
        options: "Valid CSS",
        default: "",
        description: "You are able to use add a classname to add layout based CSS to the host element.",
      },
      {
        name: "part",
        type: "CSS",
        options: "mui-grid::part(gap)",
        default: "",
        description:
          "Controlled trust-based customisation for modifying internal aspects of a grid. <mui-link href='/spacing-part-selectors' size='x-small'>Learn more</mui-link>",
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

    const Box = /*html*/ `
      <mui-card>
        <mui-card-body>{content}</mui-card-body>
      </mui-card>
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-grid" title="Grid"></story-api-types>

      <story-card title="Default">

        <mui-grid slot="body" space="var(--space-200)">
          ${Box}
          ${Box}
        </mui-grid>
        
        <story-code-block slot="footer" scrollable>
          &lt;mui-grid col="1fr 1fr" space="var(--space-200)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-grid&gt;
        </story-code-block>
      </story-card>

      <story-card title="Three Column">
        <mui-grid col="1fr 1fr 1fr" slot="body" space="var(--space-200)">
          ${Box}
          ${Box}
          ${Box}
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-grid col="1fr 1fr 1fr" space="var(--space-200)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-grid&gt;
        </story-code-block>
      </story-card>

      <story-card title="Sized Alignment" description="Set a height to align items within a defined layout area.">
        <mui-grid class="sized-grid" height="20rem" padding="var(--space-300)" col="1fr 1fr" aligny="center" space="var(--space-200)" slot="body">
          ${Box}
          ${Box}
        </mui-grid>
        <story-code-block slot="footer" scrollable>
          &lt;mui-grid height="20rem" padding="var(--space-300)" col="1fr 1fr" aligny="center" space="var(--space-200)"&gt;<br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;<br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;<br />
          &lt;/mui-grid&gt;
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
      
        imports='["@muibook/components/mui-grid"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-grid", storyGrid);
