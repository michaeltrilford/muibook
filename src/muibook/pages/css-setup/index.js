import Image from "../../images/pages/mui-tokens.jpg";

class CssSetup extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    
      .resource-page mui-code {
        border-radius: var(--radius-200);
        --code-background: var(--surface);
      }

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
        title="CSS Setup"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/readme.md"
        x-large
      >
          
          <div class="content-container resource-page">
          <mui-grid class="config"  space="var(--space-400)">

            <mui-v-stack space="var(--space-600)">

              <mui-v-stack space="var(--space-400)">
                <mui-body size="medium">The Michael UI System requires a solid CSS architecture to function properly. You must include the core CSS files in the correct order to establish resets, base styles, brand primitives, and semantic tokens.</mui-body>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">The 4 Required CSS Files</mui-heading>
                
                <mui-body size="medium">
                  <strong>1. mui-reset.css</strong><br/>
                  Resets default browser styles. Normalizes spacing, font inheritance, list styles, and box-sizing to provide a clean slate for all themes and components.
                </mui-body>

                <mui-body size="medium">
                  <strong>2. mui-base.css</strong><br/>
                  Defines global layout and typography defaults. Sets defaults for body, headings, links, buttons, and form elements.
                </mui-body>

                <mui-body size="medium">
                  <strong>3. mui-brand.css</strong><br/>
                  Contains raw brand primitives for a specific brand (e.g., colors, font scales, radii, spacing, and strokes). Defines immutable brand identity.
                </mui-body>

                <mui-body size="medium">
                  <strong>4. mui-tokens.css</strong><br/>
                  Maps semantic purposes to brand primitives. Handles themes (light/dark) without altering brand primitives.
                </mui-body>
              </mui-v-stack>

            </mui-v-stack>

            <mui-v-stack space="var(--space-600)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">Setting the Theme</mui-heading>
                <mui-body size="medium">
                 To activate the correct color tokens for your UI, you must set the default theme (“light” or “dark”) using the data-theme attribute on your HTML tag.
                </mui-body>
                <mui-code>
                  &lt;html lang="en" data-theme="light"&gt;
                  <br />
                  &nbsp;&nbsp;...
                  <br />
                  &lt;/html&gt;
                </mui-code>
              </mui-v-stack>

              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">CSS Paths</mui-heading>
                <mui-body size="medium">
                  Include the following CSS files in your HTML head. They should be loaded in this order:
                </mui-body>
                <mui-code>
                  &lt;link rel="stylesheet" href="/css/mui-reset.css" /&gt;
                  <br />
                  &lt;link rel="stylesheet" href="/css/mui-base.css" /&gt;
                  <br />
                  &lt;link rel="stylesheet" href="/css/mui-brand.css" /&gt;
                  <br />
                  &lt;link rel="stylesheet" href="/css/mui-tokens.css" /&gt;
                </mui-code>
              </mui-v-stack>
            </mui-v-stack>
          </mui-grid>
      </story-template>
    `;
  }
}

customElements.define("css-setup", CssSetup);
