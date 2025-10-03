import Image from "../../images/pages/npm.png";

class NpmPage extends HTMLElement {
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
        title="NPM Package"
        description="The available package for MUI and how to use them"
      >

        <page-card noheader>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">
                  Leverage reusable vanilla Web Components built with the Mui Design System in your project.
                </mui-body>
                <mui-body size="large">
                  Simply install the <mui-link size="medium" href="https://www.npmjs.com/package/@muibook/components" target="_blank">@muibook/components</mui-link> package to access a framework-agnostic, accessible, and customizable component library.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-400)">
                <mui-heading level="3" size="5">Getting started</mui-heading>
                <mui-code size="small">npm install @muibook/components</mui-code>
              </mui-v-stack>
                

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">📦 What’s in the package</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">Components</mui-list-item>
                  <mui-list-item size="medium">CSS</mui-list-item>
                  <mui-list-item size="medium">Utils (part map for internal use)</mui-list-item>
                  <mui-list-item size="medium">Agent (keywords and prompts)</mui-list-item>
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

customElements.define("npm-page", NpmPage);
