class storyLoading extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      mui-container { min-width: initial; } 
    `;

    ["loading", "animation", "direction", "duration", "delay"];

    const propItems = [
      {
        name: "slot",
        required: true,
        type: "slot (default)",
        options: "{mui-elements}, {elements}",
        default: "(required)",
        description: "Slot your UI inside to adopt animation",
      },
      {
        name: "loading",
        type: "boolean",
        options: "",
        default: "",
        description: "Controls the animation behvaiour",
      },
      {
        name: "animation",
        type: "string",
        options: "fade-in, pulsate, translate",
        default: "fade-in",
        description: "Animation type",
      },
      {
        name: "direction",
        type: "string",
        options: "up, right, down, left",
        default: "",
        description: "Direction for translate animation type",
      },
      {
        name: "duration",
        type: "number",
        options: "",
        default: "1s",
        description: "Timing function speed",
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
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-loading";<br>
        </mui-code>
      </spec-card>

      <props-card title="Loading">
        <mui-responsive breakpoint="767" slot="body">
          <story-type-table slot="showAbove">
            ${rows}
          </story-type-table>
          <mui-accordion-group exclusive slot="showBelow">
            ${accordions}
          </mui-accordion-group>
        </mui-responsive>
      </props-card>

      <story-card title="Pulsate">
        <mui-loading loading animation="pulsate" slot="body">
          <mui-button>Option two</mui-button>
        </mui-loading>
        <story-code-block slot="footer" scrollable>
          &lt;mui-loading loading animation="pulsate"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;Action&lt;/mui-button&gt;<br>
          &lt;/mui-loading&gt;
        </story-code-block>
      </story-card>

      <story-card title="Fade-In">
        <mui-loading loading animation="fade-in" slot="body">
          <mui-button>Option two</mui-button>
        </mui-loading>
        <story-code-block slot="footer" scrollable>
          &lt;mui-loading loading animation="fade-in"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;Action&lt;/mui-button&gt;<br>
          &lt;/mui-loading&gt;
        </story-code-block>
      </story-card>

      <story-card title="Translate" description="Default direction is Up. Ability to define the preferred direction: Up, Right, Down, Left.">
        <mui-loading loading animation="translate" slot="body">
          <mui-button>Option two</mui-button>
        </mui-loading>
        <story-code-block slot="footer" scrollable>
          &lt;mui-loading loading animation="translate"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;Action&lt;/mui-button&gt;<br>
          &lt;/mui-loading&gt;
        </story-code-block>
      </story-card>

      <story-card title="Duration" description="2s animation duration">
        <mui-loading loading animation="translate" duration="2s" slot="body">
          <mui-button>Option two</mui-button>
        </mui-loading>
        <story-code-block slot="footer" scrollable>
          &lt;mui-loading loading animation="translate" duration="2s"&gt;<br>
          &nbsp;&nbsp;&lt;mui-button&gt;Action&lt;/mui-button&gt;<br>
          &lt;/mui-loading&gt;
        </story-code-block>
      </story-card>

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Loading (Beta)" 
        description="This component provides seamless loading animations for initial page loads or skeleton-style experiences. Wrap your UI with Mui-Loading to manage initial loading states or page transitions."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-loading/index.ts"
        guides="https://guides.muibook.com"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-loading", storyLoading);
