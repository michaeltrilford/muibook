class storyStack extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `:host { display: block; }`;

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

    const propItemsHStack = [
      {
        name: "space",
        type: "string",
        options: "var(--space-100) etc...",
        default: "var(--space-500)",
        description: "Apply a design tokens to apply a gap between slotted elements",
      },
      {
        name: "alignX",
        type: "string",
        options: "flex-start etc...",
        default: "message",
        description: "Horizontal align using CSS flex properties.",
      },
      {
        name: "alignY",
        type: "string",
        options: "flex-start etc...",
        default: "neutral",
        description: "Vertical align using CSS flex properties.",
      },
      {
        name: "slot",
        required: true,
        type: "HTML attribute",
        options: "elements",
        default: "",
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
        options: "var(--space-100) etc...",
        default: "var(--space-500)",
        description: "Apply a design tokens to apply a gap between slotted elements",
      },
      {
        name: "slot",
        required: true,
        type: "HTML attribute",
        options: "elements",
        default: "",
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Stacks" 
        description="A layout component that arranges its children in a horizontal or vertical flow"
        github="https://github.com/michaeltrilford/muibook/tree/b060f2c788d521abd1f16889a460822d0cf8da3d/src/components/mui-stack"
      >

      <mui-v-stack space="var(--space-700)">

        <spec-card title="Props: HStack">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsHStack}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsHStack}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card title="Horizontal: Default">
          ${DefaultHStack}
          <mui-code slot="footer">
            &lt;mui-h-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-h-stack&gt;
          </mui-code>
        </story-card>

        <spec-card title="Props: VStack">
          <mui-responsive breakpoint="767" slot="body">
            <story-type-table slot="showAbove">
              ${rowsVStack}
            </story-type-table>
            <mui-accordion-group exclusive slot="showBelow">
              ${accordionsVStack}
            </mui-accordion-group>
          </mui-responsive>
        </spec-card>

        <story-card title="Vertical: Default">
          ${DefaultVStack}
          <mui-code slot="footer">
            &lt;mui-v-stack&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
            <br />
            &lt;/mui-v-stack&gt;
          </mui-code>
        </story-card>

      <story-card title="Horizontal: Custom Space">
        ${HStackSpace}
        <mui-code slot="footer">
          &lt;mui-h-stack space="var(--space-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-h-stack&gt;
        </mui-code>
      </story-card>

      <story-card title="Vertical: Custom Space">
        ${VStackSpace}
        <mui-code slot="footer">
          &lt;mui-v-stack space="var(--space-400)"&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &nbsp;&nbsp;&lt;mui-card&gt;...&lt;/mui-card&gt;
          <br />
          &lt;/mui-v-stack&gt;
        </mui-code>
      </story-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("story-stack", storyStack);
