import RedactdLogin from "../../images/redactd/redactd-login.jpg";
import DesignLoop from "../../images/redactd/design-loop.png";

class MuiplayApp extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .content-container {
        container-type: inline-size;
        display: grid;
        gap: var(--space-600);
      }

      .config::part(display) {
        grid-template-columns: 1fr;
      }

      mui-image {
        border: var(--border-thin);
        border-color: var(--app-story-banner-border-color);
        border-radius: var(--radius-400);
        overflow: hidden;
      }

      .media-stack {
        align-self: start;
      }

      @container (min-width: 960px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 65ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @container (min-width: 1120px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 570px;
          gap: 9.6rem;
        }
      }

      @container (min-width: 1730px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 85ch) 690px;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Redactd"
        website="https://redactd.xyz"
        x-large
      >

          <div class="content-container">
          <mui-grid class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium"><mui-link href="https://play.muibook.com">Muiplay</mui-link> was an early experiment in prompting real interface layouts instead of drawing static mockups. It let you describe a structure, such as a sidebar with a header and table, then generate Michael UI component markup from that prompt.</mui-body>
                <mui-body size="medium">That experiment opened the door to a bigger idea: prompting should not stop at a one-shot layout. It should help compose, inspect, refine, and export real Web Component interfaces in the browser.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">From Muiplay to Redactd</mui-heading>
                <mui-body size="medium">Redactd builds on the same prompt-to-layout direction, but moves closer to a production workflow: prompt, compose, adjust, and export real Web Component layouts in-browser.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Prompting layouts, not pictures</mui-heading>
                <mui-body size="medium">The goal is structural UI generation: layouts made from components, slots, tokens, and responsive primitives that can be edited after generation instead of flattened into an image.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">A better design loop</mui-heading>
                <mui-body size="medium">Muiplay proved that natural-language layout generation could reduce setup friction. Redactd extends that into a loop where the generated UI remains inspectable, adjustable, and connected to the design system.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Design Loop</mui-heading>
                <mui-body size="medium">Redactd Design Loop takes a generated layout and runs it through structured critique, persona feedback, and iteration passes. Instead of relying on a single prompt result, it surfaces friction, clarity, CSAT, task success, and recommended changes across different user perspectives.</mui-body>
                <mui-body size="medium">The intent is to make prompting feel more like a product design workflow: generate a layout, inspect how it performs, compare iterations, then keep refining the strongest direction. Learn more at <mui-link href="https://redactd.xyz/design-loop">redactd.xyz/design-loop</mui-link>.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Component foundations</mui-heading>
                <mui-body size="medium">Both Muiplay and Redactd are grounded in the same principle: interface generation is more useful when it outputs composable component systems, not disposable screenshots. Learn more at <mui-link href="https://redactd.xyz">redactd.xyz</mui-link>.</mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-v-stack class="media-stack" space="var(--space-800)">
              <mui-image>
                <img slot="image" src="${RedactdLogin}" alt="Redactd interface for composing Web Component layouts" />
              </mui-image>

              <mui-image>
                <img slot="image" src="${DesignLoop}" alt="Redactd Design Loop interface showing iteration previews, summary metrics, and persona feedback" />
              </mui-image>
            </mui-v-stack>
          </mui-grid>
        </div>

      </story-template>
    `;
  }
}

customElements.define("muiplay-app", MuiplayApp);
