import Image from "../../images/create-app.jpg";

class CreateApp extends HTMLElement {
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
        title="Create App"
        description="Start building accessible and fast loading interfaces using web components and MUI inspired styling. No frameworks or JavaScript build tools are required."
        demo="/mui-create-app/index.html"
        github="https://github.com/michaeltrilford/michaeltrilford.github.io/tree/master/mui-create-app"
      >


      <mui-v-stack space="var(--space-700)">

        <page-card title="App configuration" description="Integrate a lightweight scaffold with prebuilt web components, layout, and styling conventions to kickstart your project.">
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-400)">

              <mui-v-stack space="var(--space-000)">
                <mui-heading level="3" size="6">Included components</mui-heading>
                <mui-body size="small">Access a growing set of prebuilt web components. Each component is designed to be themeable, accessible by default, and easy to customise using native web technologies.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-000)">
                <mui-heading level="3" size="6">No framework required</mui-heading>
                <mui-body size="small">Build with native web standards — no need for React, Vue, or complex build setups. The app works out of the box with just plain HTML, CSS, and JavaScript, making it simple to integrate into any project.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-000)">
                <mui-heading level="3" size="6">Quick local setup</mui-heading>
                <mui-body size="small">
                  For everything to load correctly, the project should be served locally. 
                  No build tools needed — just a basic server using Python. 
                  Setup instructions are on 
                  <mui-link 
                    size="small" 
                    weight="medium" 
                    target="_blank" 
                    href="https://github.com/michaeltrilford/michaeltrilford.github.io/tree/master/mui-create-app">
                      GitHub
                  </mui-link>.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-000)">
                <mui-heading level="3" size="6">Flexible architecture</mui-heading>
                <mui-body size="small">Compose interfaces using layout primitives, design tokens, and semantic elements. Components are designed to work seamlessly in modern browsers, supporting progressive enhancement with full control over structure and styling.</mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Create App Code" />
              <figcaption slot="caption">mui-create-app/index.html</figcaption>
            </mui-image> 
          </mui-grid>

          <mui-code slot="footer">
            <br />
            RECOMMENDED PROJECT STRUCTURE:<br>
            <br>
            Project Root:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;├── css/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── mui-reset.css<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── mui-base.css<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── author-tokens.css<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── author.css<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;├── assets/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── create-app-logo.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;├── components/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── mui-container/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── index.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── mui-heading/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── index.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── mui-body/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── index.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── mui-link/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── index.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── mui-icons/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── mui-icon-sun.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── mui-icon-moon.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── mui-stack/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── mui-vstack/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── index.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;├── js/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── mui-parts/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── index.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── create-app-theme-toggle/<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── index.js<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│<br />
            &nbsp;&nbsp;&nbsp;&nbsp;├── public/<br />
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── favicon.ico<br />
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── logo192.png<br />
            &nbsp;&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;└── index.html<br>
            <br />
            <br />

          </mui-code>


        </page-card>

      </mui-v-stack>

      </story-template>
    `;
  }
}

customElements.define("create-app", CreateApp);
