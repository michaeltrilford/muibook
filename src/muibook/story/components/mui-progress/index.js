class storyProgress extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .canvas {
        background: var(--surface-elevated-100);
        padding: var(--space-600);
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

    `;

    const propItems = [
      {
        name: "progress",
        type: "number",
        options: "0-100",
        default: "",
        description: "Add a value to indicate the progress of the meter",
      },
      {
        name: "state",
        type: "string",
        options: "pending, syncing",
        default: "",
        description: "Select a state that demonstrates intial pending state or a retry state.",
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
            import "@muibook/components/mui-code";<br>
          </mui-code>
        </spec-card>


          <props-card title="Progress">
            <mui-responsive breakpoint="767" slot="body">
              <story-type-table slot="showAbove">
                ${rows}
              </story-type-table>
              <mui-accordion-group exclusive slot="showBelow">
                ${accordions}
              </mui-accordion-group>
            </mui-responsive>
          </props-card>

        <story-card title="Progress" description="Displays a numeric value to indicate loading or completion state.">
          <div class="canvas" slot="body">
            <mui-progress progress="50"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress progress="50"&gt;...&lt;/mui-progress&gt;
          </story-code-block>
        </story-card>

        <story-card 
          title="State: Pending" 
          description="Use when the system is waiting for an external response, such as a server request or sync, and progress cannot be measured."  
        >
          <div class="canvas" slot="body">
            <mui-progress state="pending"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress state="pending"&gt;...&lt;/mui-progress&gt;
          </story-code-block>
        </story-card>

        <story-card title="State: Syncing" description="Use when the system is actively retrying, cycling, or performing time-based checks, where exact progress is unknown.">
          <div class="canvas" slot="body">
            <mui-progress state="syncing"></mui-progress>
          </div>
          <story-code-block slot="footer" scrollable>
            &lt;mui-progress state="syncing"&gt;...&lt;/mui-progress&gt;
          </story-code-block>
        </story-card>

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Progress"
        description="A horizontal progress bar showing completion percentage."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-progress/index.ts"
      >
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-progress", storyProgress);
