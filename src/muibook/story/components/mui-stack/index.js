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

      .viewport-preview {
        position: relative;
        height: 36rem;
        overflow: hidden;
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-recessed-100);
      }

      .viewport-shell {
        position: absolute;
        inset: 0;
      }

      .viewport-child {
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface-elevated-100);
      }

      .viewport-child-nested {
        border: var(--border-thin);
        border-radius: var(--radius-100);
        background: var(--surface);
      }

      .wrap-preview {
        max-width: 44rem;
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

    const VStackViewportChildren = /*html*/ `
      <div class="viewport-preview" slot="body">
        <mui-v-stack class="viewport-shell" viewport padding="var(--space-300)" space="var(--space-300)" alignx="stretch" aligny="start">
          <mui-v-stack space="var(--space-300)">
            <mui-v-stack class="viewport-child" padding="var(--space-300)" space="var(--space-200)">
              <mui-body size="small" weight="bold">Nested VStack</mui-body>
              <mui-body size="x-small" variant="optional">Intrinsic height inside an outer viewport stack.</mui-body>
            </mui-v-stack>
            <mui-h-stack class="viewport-child" padding="var(--space-300)" space="var(--space-200)" aligny="center">
              <mui-v-stack class="viewport-child-nested" padding="var(--space-200)" space="var(--space-100)">
                <mui-body size="x-small" weight="bold">Child A</mui-body>
                <mui-body size="x-small" variant="optional">auto height</mui-body>
              </mui-v-stack>
              <mui-v-stack class="viewport-child-nested" padding="var(--space-200)" space="var(--space-100)">
                <mui-body size="x-small" weight="bold">Child B</mui-body>
                <mui-body size="x-small" variant="optional">auto height</mui-body>
              </mui-v-stack>
            </mui-h-stack>
          </mui-v-stack>
        </mui-v-stack>
      </div>
    `;

    const HStackWrap = /*html*/ `
      <div class="vertical-align-canvas wrap-preview" slot="body">
        <mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center">
          <mui-badge>Design System</mui-badge>
          <mui-badge>Content Model</mui-badge>
          <mui-badge>Documentation</mui-badge>
          <mui-badge>Accessibility</mui-badge>
          <mui-badge>Builder Runtime</mui-badge>
        </mui-h-stack>
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
        name: "wrap",
        type: "string | boolean",
        options: "nowrap, wrap, wrap-reverse, true",
        default: "nowrap",
        description: "Controls flex wrapping. Use wrap=\"wrap\" for explicit wrapping, or the bare wrap attribute as shorthand.",
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

      <story-card title="Horizontal: Wrap" description="Use wrap when chips, badges, actions, or metadata rows need to continue onto a new line without switching layout primitives.">
        ${HStackWrap}
        <story-code-block slot="footer" scrollable>
          &lt;mui-h-stack wrap="wrap" space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Design System&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Content Model&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Documentation&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Accessibility&lt;/mui-badge&gt;<br />
          &nbsp;&nbsp;&lt;mui-badge&gt;Builder Runtime&lt;/mui-badge&gt;<br />
          &lt;/mui-h-stack&gt;
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

      <story-card title="Vertical: Viewport With Nested Stacks" description="Use viewport on a stack that owns the viewport region. Nested stacks remain content-sized; shared header or panel layouts should define their height structure explicitly.">
        ${VStackViewportChildren}
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack viewport aligny="start" padding="var(--space-300)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-v-stack&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack padding="var(--space-300)"&gt;...&lt;/mui-v-stack&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack padding="var(--space-300)"&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&gt;...&lt;/mui-v-stack&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;
          <br />
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;
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
