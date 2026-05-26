import { getComponentDocs } from "../../../utils/story-data";

class storyStack extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Stack");

    const styles = /*css*/ `
      :host { display: block; }

      .vertical-align-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-300);
      }

      .vertical-align-canvas {
        box-sizing: border-box;
        padding: var(--space-300);
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-recessed-100);
      }

      @media (max-width: 767px) {
        .vertical-align-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    const BlockBox = /*html*/ `
      <mui-card>
        <mui-card-body>{content}</mui-card-body>
      </mui-card>
    `;

    const Box = /*html*/ `
      <mui-card>
        <mui-card-body>{content}</mui-card-body>
      </mui-card>
    `;

    const DefaultHStack = /*html*/ `
      <mui-v-stack slot="body">
        <mui-v-stack space="8px">
          <mui-code style="border-radius: 8px;">
            Default Size: space="var(--space-500)"
          </mui-code>
        </mui-v-stack>
        <mui-h-stack>
          ${Box}
          ${Box}
        </mui-h-stack>
      </mui-v-stack>
    `;

    const DefaultVStack = /*html*/ `
      <mui-v-stack slot="body">
        <mui-v-stack space="8px">
          <mui-code style="border-radius: 8px;">Default Size: space="var(--space-500)"</mui-code>
        </mui-v-stack>
        <mui-v-stack>
          ${BlockBox}
          ${BlockBox}
        </mui-v-stack>
      </mui-v-stack>
  `;

    const HStackSpace = /*html*/ `
    <mui-h-stack  space="var(--space-400)" slot="body">
      ${Box}
      ${Box}
    </mui-h-stack>
  `;

    const VStackSpace = /*html*/ `
    <mui-v-stack slot="body" space="var(--space-400)">
      ${BlockBox}
      ${BlockBox}
    </mui-v-stack>
  `;

    const VStackAlignment = /*html*/ `
      <div class="vertical-align-grid" slot="body">
        <mui-v-stack class="vertical-align-canvas" height="28rem" alignx="stretch" aligny="start" space="var(--space-000)">
          <mui-code>aligny="start"</mui-code>
        </mui-v-stack>
        <mui-v-stack class="vertical-align-canvas" height="28rem" alignx="stretch" aligny="center" space="var(--space-000)">
          <mui-code>aligny="center"</mui-code>
        </mui-v-stack>
        <mui-v-stack class="vertical-align-canvas" height="28rem" alignx="stretch" aligny="end" space="var(--space-000)">
          <mui-code>aligny="end"</mui-code>
        </mui-v-stack>
      </div>
    `;

    const propItemsHStack = [
      {
        name: "space",
        type: "string",
        options: "var(--space-100), etc...",
        default: "--space-500",
        description: "Apply a design tokens to apply a gap between slotted elements",
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
        options: "start, center, end, etc...",
        default: "normal",
        description: "Horizontal align using justify-content properties.",
      },
      {
        name: "alignY",
        type: "string",
        options: "start, center, end, etc...",
        default: "normal",
        description: "Vertical align using align-items properties.",
      },
      {
        name: "height",
        type: "string",
        options: "{css-size}",
        default: "auto",
        description: "Sets a custom height for the stack layout, such as 100dvh or 28rem.",
      },
      {
        name: "width",
        type: "string",
        options: "{css-size}",
        default: "auto",
        description: "Sets a custom width for the stack layout, such as 100% or 32rem.",
      },
      {
        name: "viewport",
        type: "boolean",
        options: "true, false",
        default: "false",
        description: "Sets the stack height to 100dvh.",
      },
      {
        name: "fill",
        type: "boolean",
        options: "true, false",
        default: "false",
        description: "Sets the stack height and width to 100% of its available parent.",
      },
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{elements}",
        default: "(required)",
        description: "Slot in any elements",
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

    const propItemsVStack = [
      {
        name: "space",
        type: "string",
        options: "var(--space-100), etc...",
        default: "--space-500",
        description: "Apply a design tokens to apply a gap between slotted elements",
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
        options: "start, center, end, etc...",
        default: "normal",
        description: "Horizontal align using justify-content properties.",
      },
      {
        name: "alignY",
        type: "string",
        options: "start, center, end, etc...",
        default: "normal",
        description: "Vertical align using align-items properties.",
      },
      {
        name: "height",
        type: "string",
        options: "{css-size}",
        default: "auto",
        description: "Sets a custom height for the stack layout, such as 100dvh or 28rem.",
      },
      {
        name: "width",
        type: "string",
        options: "{css-size}",
        default: "auto",
        description: "Sets a custom width for the stack layout, such as 100% or 32rem.",
      },
      {
        name: "viewport",
        type: "boolean",
        options: "true, false",
        default: "false",
        description: "Sets the stack height to 100dvh.",
      },
      {
        name: "fill",
        type: "boolean",
        options: "true, false",
        default: "false",
        description: "Sets the stack height and width to 100% of its available parent.",
      },
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{elements}",
        default: "(required)",
        description: "Slot in any elements",
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

    const rowsHStack = propItemsHStack
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

    const accordionsHStack = propItemsHStack
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsHStack.length - 1 ? "last-child" : "";

        return /*html*/ `
          <mui-accordion-block 
            size="small" 
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

    const rowsVStack = propItemsVStack
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

    const accordionsVStack = propItemsVStack
      .map((prop, index) => {
        // Check if it's the last item in the array
        const isLastChild = index === propItemsVStack.length - 1 ? "last-child" : "";

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
        <mui-v-stack space="var(--space-400)">
          <story-api-types tag="mui-h-stack" title="HStack"></story-api-types>
          <story-api-types tag="mui-v-stack" title="VStack"></story-api-types>
        </mui-v-stack>

        <story-card title="Horizontal: Default">
          ${DefaultHStack}
          <story-code-block slot="footer" scrollable>
            &lt;mui-h-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-h-stack&gt;
          </story-code-block>
        </story-card>

        <story-card title="Vertical: Default">
          ${DefaultVStack}
          <story-code-block slot="footer" scrollable>
            &lt;mui-v-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-v-stack&gt;
          </story-code-block>
        </story-card>

      <story-card title="Horizontal: Custom Space">
        ${HStackSpace}
        <story-code-block slot="footer" scrollable>
          &lt;mui-h-stack space="var(--space-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-h-stack&gt;
        </story-code-block>
      </story-card>

      <story-card title="Vertical: Custom Space">
        ${VStackSpace}
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack space="var(--space-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card title="Padding">
        <mui-v-stack class="vertical-align-canvas" padding="var(--space-400)" space="var(--space-300)" slot="body">
          <mui-h-stack padding="var(--space-300)" space="var(--space-200)" style="background: var(--surface-elevated-100);">
            ${Box}
            ${Box}
          </mui-h-stack>
          <mui-body size="small">Stacks can inset content without additional wrapper styles.</mui-body>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack padding="var(--space-400)" space="var(--space-300)"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack padding="var(--space-300)" space="var(--space-200)"&gt;...&lt;/mui-h-stack&gt;<br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card title="Vertical: Alignment in a Set Height">
        ${VStackAlignment}
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack height="28rem" aligny="center"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-code&gt;aligny="center"&lt;/mui-code&gt;
          <br />
          &lt;/mui-v-stack&gt;
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
      
        imports='["@muibook/components/mui-stack"]'>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-stack", storyStack);
