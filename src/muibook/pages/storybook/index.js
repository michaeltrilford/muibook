import Image from "../../images/pages/npm.png";

class StorybookPage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .config::part(display) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 1230px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 500px;
          gap: 9.6rem;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Storybook"
        description="Storybook complements muibook.com, the main hub for the design system."
        storybook="https://stories.muibook.com/"
      >

        <page-card noheader>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-heading level="3" size="5">Overview</mui-heading>
                <mui-body size="medium">
                  The examples found on <mui-link size="medium" href="https://stories.muibook.com"  target="_blank">stories.muibook.com </mui-link> mirror the main site to ensure consistency. 
                </mui-body>
                <mui-body size="medium">
                  Components are fully interactive so teams can explore variations and practical usage.
                </mui-body>
                <mui-body size="medium">
                  This build uses the latest Muibook package and is prepared for upcoming MCP features.
                </mui-body>
              </mui-v-stack>
                

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">What’s included</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">Components – All Mui Design System components, ready to explore and interact with.</mui-list-item>
                  <mui-list-item style="margin-top: var(--space-300)" size="medium">Usage examples – Adjust arguments to test variations and behavior.</mui-list-item>
                  <mui-list-item style="margin-top: var(--space-300)" size="medium">Future MCP-ready tooling – Designed to evolve as new Storybook features are introduced.</mui-list-item>
                </mui-list>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="npmjs website" />
            </mui-image> 
          </mui-grid>

        </page-card>

      </story-template>
    `;
  }
}

customElements.define("storybook-page", StorybookPage);
