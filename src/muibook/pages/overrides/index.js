import Image from "../../images/pages/text-parts.jpg";

class OverridesPage extends HTMLElement {
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
        title="Overrides"
      >
          
          <div class="content-container">
          <mui-grid class="config"  space="var(--space-400)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">Sensible approaches to enable safe and trusted customisation. The design system is built to be flexible, and most adjustments should start with the tokens exposed by each component.</mui-body>
                <mui-body size="medium">
                  When applying overrides, scope them carefully to avoid style leaks. Use component tokens first, then broader semantic or global tokens, and reach for part selectors only when the token surface does not cover the adjustment.
                </mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Our position on styling</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">Overrides should extend the design system, not break away from it.</mui-list-item>
                  <mui-list-item size="medium">Use design tokens rather than raw CSS values. E.g. --black-opacity-40 instead of #00000001.</mui-list-item>
                  <mui-list-item size="medium">Prefer the most specific supported token first, such as a component token before a semantic token.</mui-list-item>
                  <mui-list-item size="medium">Tokens represent micro design decisions that help maintain alignment with the broader system, ensuring consistency.</mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Component Token Overrides</mui-heading>
                <mui-body>
                  Component tokens are the preferred way to adjust a component without changing the broader system.
                </mui-body>
                <mui-list as="ul">
                  <mui-list-item size="medium">Adjust an instance by overriding the component token it already consumes.</mui-list-item>
                  <mui-list-item size="medium">Scope the override to a component, class, page, or local context to avoid style leaks.</mui-list-item>
                  <mui-list-item size="medium">Use this approach before changing shared semantic tokens.</mui-list-item>
                </mui-list>
                <mui-code>
                  mui-video-thumbnail {<br>
                    &nbsp;&nbsp;--video-thumbnail-card-hover-background: var(--surface-elevated-200);<br>
                  }
                </mui-code>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Semantic &amp; Global Overrides</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">A semantic or global override adjusts tokens that can apply across multiple components.</mui-list-item>
                  <mui-list-item size="medium">This can be powerful, but also impacts every instance of that component type. Use with caution.</mui-list-item>
                </mui-list>
                <mui-code>
                  --action-primary-background: var(--my-custom-color);
                </mui-code>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Part Overrides</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">Use part overrides when a component exposes named ::part targets and a token is not available for the adjustment.</mui-list-item>
                  <mui-list-item size="medium">This gives you the most precise control over a specific area of a component.</mui-list-item>
                  <mui-list-item size="medium">Part Docs: <mui-link size="medium" href="/text-part-selectors">Text Parts</mui-link>, <mui-link size="medium" href="/spacing-part-selectors">Spacing Parts</mui-link>, <mui-link size="medium" href="/layout-part-selectors">Layout Parts</mui-link> and <mui-link size="medium" href="/visual-part-selectors">Visual Parts</mui-link> </mui-list-item>
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
            </mui-image> 
          </mui-grid>
        </div>


      </story-template>
    `;
  }
}

customElements.define("overrides-page", OverridesPage);
