import Image from "../../images/pages/muikit.png";

class MuikitPage extends HTMLElement {
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
        title="Mui Kit"
        description="The Figma UI Kit that’s a 1:1 match to the MUI Coded Design System"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=0-1&t=5A8fWmORS1XTiPBQ-1"
      >

        <page-card>
          
          <mui-grid slot="body" class="config" space="var(--space-600)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Design with confidence, aligned to code</mui-heading>
                <mui-body size="medium">
                  MuiKit replicates MUI’s coded components inside Figma, giving designers and developers a shared language. From inputs to layout systems, every element is a 1:1 match—down to prop types, states, and design tokens.
                </mui-body>
                <mui-body size="medium">
                  Whether you’re working with interactive fields, typography, tables, or UI patterns like tab bars and carousels, MuiKit ensures your prototypes stay true to the system—reducing handoff friction and improving consistency.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Prototype faster, handoff smarter</mui-heading>
                <mui-body size="medium">
                  Use core components directly in Figma to rapidly prototype product experiences. With built-in design tokens and theming support, you can explore ideas quickly without straying from the system.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Muiplay</mui-heading>
                <mui-body size="medium">
                  Use <mui-link href="/#/muiplay">Muiplay</mui-link> to instantly explore layout ideas using AI before refining with MuiKit in Figma. It’s a fast, flexible way to prototype with code-backed structure and then adopt proven patterns directly into your designs.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Why teams love MuiKit:</mui-heading>
                <mui-list as="ul">
                  <mui-list-item>1:1 match with coded components (props, states, and more)</mui-list-item>
                  <mui-list-item>Includes core components ready to use in Figma</mui-list-item>
                  <mui-list-item>Built-in design tokens for consistent styling</mui-list-item>
                  <mui-list-item>Speeds up prototyping and reduces guesswork</mui-list-item>
                  <mui-list-item>Option to detach components and apply your own theme</mui-list-item>
                </mui-list>
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

customElements.define("muikit-page", MuikitPage);
