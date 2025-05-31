import Image from "../../images/create-mui-app.jpg";

class CreateMuiApp extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .config::part(display) {
        grid-template-columns: 1fr;
      }

      @media (min-width: 1100px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 400px;
          gap: 7.2rem;
          justify-content: space-between;
          align-items: start;
        }
      }

      @media (min-width: 1390px) {
        .config::part(display) {
          grid-template-columns: minmax(0, 50ch) 580px;
          gap: 9.6rem;
        }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Create Mui App"
        description="Build accessible and fast loading interfaces using Mui Web Components"
        demo="https://create.muibook.com"
        github="https://github.com/michaeltrilford/create-mui-app"
      >


      <mui-v-stack space="var(--space-700)">

        <page-card title="App configuration" description="Start your project with a lightweight scaffold that includes layout, styling conventions, and prebuilt web components — everything you need to move fast.">
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-400)">

              <mui-v-stack space="var(--space-000)">
                <mui-heading level="3" size="6">Included components</mui-heading>
                <mui-body size="small">Use a growing library of accessible, themeable components. Each one is easy to customise with native web technologies.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-000)">
                <mui-heading level="3" size="6">No framework required</mui-heading>
                <mui-body size="small">Build with plain HTML, CSS, and JavaScript — no React, Vue, or complex setups required. Everything works out of the box using modern web standards.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-000)">
                <mui-heading level="3" size="6">Quick local setup</mui-heading>
                <mui-body size="small">
                  The project runs locally with Vite, a fast build tool and dev server. Follow the <mui-link 
                    size="small" 
                    weight="medium" 
                    target="_blank" 
                    href="https://github.com/michaeltrilford/create-mui-app">
                      setup guide on GitHub
                  </mui-link> to get started. 

                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-000)">
                <mui-heading level="3" size="6">Flexible architecture</mui-heading>
                <mui-body size="small">Compose interfaces with layout primitives, semantic elements, and design tokens. The architecture supports progressive enhancement and gives you full control over structure and styling.</mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Create Mui App Code" />
              <figcaption slot="caption">create-mui-app/index.html</figcaption>
            </mui-image> 
          </mui-grid>

        </page-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("create-mui-app", CreateMuiApp);
