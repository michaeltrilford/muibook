import Image from "../../images/pages/create-mui-app.jpg";

class CreateMuiApp extends HTMLElement {
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
        title="Create App"
        description="Build with MUI’s Web Components — lightweight, React-free, framework-agnostic."
        demo="https://create.muibook.com"
        github="https://github.com/michaeltrilford/create-mui-app"
      >


      <mui-v-stack space="var(--space-700)">

        <page-card>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">Kickstart your project with a lightweight scaffold built on Vite. It comes 
                preloaded with foundational CSS resets, a solid base structure, and design tokens ready to be customised 
                for your brand.</mui-body>
                <mui-body size="large">Access a curated set of <strong>MUI Components</strong>, wrapped in a clean layout that highlights 
                the Design System’s core building blocks—so you can start designing and building immediately.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Included components</mui-heading>
                <mui-body size="medium">Use a growing library of accessible, themeable components. Each one is easy 
                to customise with native web technologies.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">No framework required</mui-heading>
                <mui-body size="medium">
                  Build with plain HTML, CSS, and JavaScript — no React, Vue, or complex setups required. Everything 
                  works out of the box using modern web standards.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Quick local setup</mui-heading>
                <mui-body size="medium">
                  The project runs locally with Vite, a fast build tool and dev server. Follow the <mui-link 
                    size="medium" 
                    weight="medium" 
                    target="_blank" 
                    href="https://github.com/michaeltrilford/create-mui-app">
                      setup guide on GitHub
                  </mui-link> to get started. 

                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Flexible architecture</mui-heading>
                <mui-body size="medium">Compose interfaces with layout primitives, semantic elements, and design 
                tokens. The architecture supports progressive enhancement and gives you full control over structure 
                and styling.</mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Create Mui App Code" />
              <figcaption slot="caption">create-mui-app/src/index.ts</figcaption>
            </mui-image> 
          </mui-grid>

        </page-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("create-mui-app", CreateMuiApp);
