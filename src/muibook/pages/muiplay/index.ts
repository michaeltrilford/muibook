import Image from "../../images/pages/muiplay.png";

class MuiplayApp extends HTMLElement {
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
        title="Muiplay"
        description="The AI-powered playground for generating MUI layouts—instantly"
        website="https://play.muibook.com"
      >


        <page-card noheader>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">Muiplay lets you describe the layout you want — like “a sidebar with a header and table” — and it instantly builds it using components from Michael UI. It’s designed to remove the friction of setup, letting you focus on structure, flow, and functionality from the very start.</mui-body>
                <mui-body size="large">Whether you’re mocking up ideas, testing flows, or kicking off a real project, Muiplay speeds up the process by giving you a clean, extensible layout from a natural-language prompt. It’s your shortcut to clean code and design consistency.</mui-body>
              </mui-v-stack>



              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Prototype layouts at the speed of thought</mui-heading>
                <mui-body size="medium">Skip the boilerplate. With just a prompt, Muiplay generates layout-ready MUI code so you can move from idea to structure instantly.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Structure-first, code-ready</mui-heading>
                <mui-body size="medium">Focus on flow and usability while Muiplay handles the scaffolding. Use it to wireframe in real code, then refine and scale as your project grows.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Your shortcut to smarter prototyping</mui-heading>
                <mui-body size="medium">Explore and validate ideas in code with Muiplay, then refine your design in Figma with MuiKit. Together, they create a seamless workflow from concept to polished UI.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Component Library</mui-heading>
                <mui-body size="medium">Muiplay is powered by Michael UI components. Learn more at <mui-link href="https://muibook.com/">muibook.com</mui-link>.</mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Create Mui App Code" />
            </mui-image> 
          </mui-grid>

        </page-card>

      </story-template>
    `;
  }
}

customElements.define("muiplay-app", MuiplayApp);
