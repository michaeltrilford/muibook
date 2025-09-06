import Image from "../../images/pages/text-parts.jpg";

class OverridesPage extends HTMLElement {
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
        title="Overrides"
        description="We provide sensible approaches to enable safe and trusted customisation of the design system."
        github=""
      >

        <page-card>
          
          <mui-grid slot="body" class="config"  space="var(--space-400)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="large">The design system is built to be flexible, and we provide ways to make sensible adjustments when necessary.</mui-body>
                <mui-body size="large">
                  When applying overrides, it is best to scope them carefully to avoid style leaks. Below are a few approaches you can take.
                </mui-body>
              </mui-v-stack>

              <mui-rule></mui-rule>


              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Our position on styling</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">Overrides should extend the design system, not break away from it.</mui-list-item>
                  <mui-list-item size="medium">Use design tokens rather than raw CSS values. E.g. --black-opacity-40 instead of #00000001.</mui-list-item>
                  <mui-list-item size="medium">Tokens represent micro design decisions that help maintain alignment with the broader system, ensuring consistency.</mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Contextual Overrides</mui-heading>
                <mui-body>
                  Some components rely on semantic tokens, so it’s important to target them carefully in context.
                </mui-body>
                <mui-list as="ul">
                  <mui-list-item size="medium">Adjust an element by overriding the appropriate design token(s).</mui-list-item>
                  <mui-list-item size="medium">Prefer doing this within the shadow DOM or using a strict class to avoid style leaks.</mui-list-item>
                  <mui-list-item size="medium">This method is especially useful for components that do not expose component-specific tokens.</mui-list-item>
                </mui-list>
                <mui-code>
                  mui-accordion {<br>
                    &nbsp;&nbsp;--surface-elevated-200: var(--my-custom-color);<br>
                  }
                </mui-code>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Global Overrides</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">A global override adjusts tokens that apply across multiple components.</mui-list-item>
                  <mui-list-item size="medium">This can be powerful, but also impacts every instance of that component type. Use with caution.</mui-list-item>
                </mui-list>
                <mui-code>
                  --action-primary-background: var(--my-custom-color);
                </mui-code>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Part Overrides</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">Use part overrides when a component exposes named ::part targets.</mui-list-item>
                  <mui-list-item size="medium">This gives you the most precise control over a specific area of a component.</mui-list-item>
                  <mui-list-item size="medium">Part Docs: <mui-link size="medium" href="#/text-part-selectors">Text Parts</mui-link>, <mui-link size="medium" href="#/spacing-part-selectors">Spacing Parts</mui-link>, <mui-link size="medium" href="#/layout-part-selectors">Layout Parts</mui-link> and <mui-link size="medium" href="#/visual-part-selectors">Visual Parts</mui-link> </mui-list-item>
                </mui-list>
                <mui-code>
                  mui-button::part(background) {<br>
                    &nbsp;&nbsp;
                    background: var(--my-custom-color);<br>
                  }
                </mui-code>
              </mui-v-stack>

            </mui-v-stack>

            <mui-image>
              <img slot="image" src="${Image}" alt="Author Tokens" />
              <figcaption slot="caption"><mui-link href="#/text-part-selectors">text-part-selectors</mui-link></figcaption>
            </mui-image> 
          </mui-grid>

        </page-card>


      </story-template>
    `;
  }
}

customElements.define("overrides-page", OverridesPage);
