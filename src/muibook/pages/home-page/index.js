import "../../images/mui/mui-logo-mobile";
import "../../images/mui/mui-logo";
import "../../images/mui/ana-logo";
import "../../images/mui/jal-logo";
import "../../images/mui/jal-logo-mobile";
import "../../images/mui/ana-logo-mobile";
import Jal from "../../images/jal/bg-plane.png";
import AnaLight from "../../images/ana/light.jpg";
import AnaNight from "../../images/ana/night.jpg";

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["data-brand"];
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  getLogos() {
    let brand = this.getAttribute("data-brand") || "mui";

    // Normalize brands that share the same logo
    if (brand === "modern") brand = "mui";

    return {
      desktop: `<${brand}-logo color="var(--app-logo-color)"></${brand}-logo>`,
      tablet: `<${brand}-logo color="var(--app-logo-color)" slot="showAbove" style="max-width:26rem;"></${brand}-logo>`,
      phone: `<${brand}-logo-mobile color="var(--app-logo-color)" slot="showBelow"></${brand}-logo-mobile>`,
    };
  }

  getActions() {
    let brand = this.getAttribute("data-brand") || "mui";

    // Normalize brands that share the same logo
    if (brand === "modern") brand = "mui";

    // Return different HTML depending on brand
    if (brand === "mui") {
      return `
      <mui-link 
        href="/#/create-mui-app" 
        variant="primary">
        Get Started
      </mui-link>
      <mui-link
        href="/#/npm" 
        variant="secondary">
        NPM Package
      </mui-link>
    `;
    } else {
      return `
      <mui-link 
        href="/#/create-mui-app" 
        variant="primary">
        Get Started
      </mui-link>
      <mui-link
        class="link-secondary" 
        href="/#/multi-brand-theme" 
        variant="secondary">
        Theming Guide
      </mui-link>
    `;
    }
  }

  render() {
    const { desktop, tablet, phone } = this.getLogos();

    const intro = /*html*/ `
      Muibook is the home of the Mui Design System — native Web Components with clean, composable patterns that help you write less code
    `;

    const styles = /*css*/ `
    
      :host { 
        display: flex; 
        width: 100%; 
        align-items: stretch; 
      }

      .main-content__grid { 
        display: grid; 
        min-height: 100%; 
        width: 100%; 
      }

      .body-text::part(color) {
        color: var(--home-page-body-text)
      }

      @media (min-width: 960px) {
        :host {
          box-sizing: border-box;
          padding-bottom: calc(var(--space-800) + env(safe-area-inset-bottom));
          padding-top: calc(var(--space-800) + env(safe-area-inset-top)); 
          padding-right: var(--space-800);   
          padding-left: var(--space-800); 
        } 
      }

      @media (min-width: 1400px) {
        :host {
          box-sizing: border-box;
          padding-bottom: calc(var(--space-800) + env(safe-area-inset-bottom));
          padding-top: calc((var(--space-800) * 2) + env(safe-area-inset-top)); 
          padding-right: calc(var(--space-800) * 2);   
          padding-left: calc(var(--space-800) * 2);         
        } 
      }
      
      main {
        display: grid;
        align-content: center;
        justify-content: center;
        margin-bottom: var(--space-000);
        gap: var(--space-800);
      }

      .logo-wrapper {
        align-self: center;
        position: relative;
        margin: 0;
        display: flex;
        justify-content: center;
      }

      @media (min-width: 960px) {
        .logo-wrapper { grid-column: 5 / 13; }

        .introduction { 
          grid-column: 1 / 13; 
          grid-row: initial;
          align-content: end;
        }

        .introduction::part(display) { 
          grid-template-columns: 1fr;
          gap: var(--space-500);
        }

        main {
          align-items: initial;
          justify-content: initial;
          column-gap: var(--space-200);
          row-gap: var(--space-400);
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 1fr auto;
          padding: var(--space-000);
        }
         
      }

      @media (min-width: 1100px) {
        main { 
          column-gap: var(--space-800); 
          row-gap: var(--space-800); 
        }
        .introduction { 
          grid-row: initial; 
          align-content: end; 
        }

        .introduction::part(display) { 
          grid-template-columns: 1fr auto;
          gap: var(--space-600);
        }
       
      }

      @media (min-width: 1400px) {
        main {grid-template-rows: auto 1fr; }
        .logo-wrapper { grid-column: 6 / 13; }
        .introduction { grid-column: 1 / 13; }
        .introduction::part(align-items) { align-items: center; }
      }


      @media (min-width: 960px) {
        .body-text { max-width: 58ch; }
      }

      @media (min-width: 1400px) {
        .body-text { max-width: 64ch; }
      }

      @media (min-width: 1877px) {
        .body-text { max-width: 68ch; }
      }

      /* Brand + theme combinations */
      :host([data-brand="jal"]),
      :host([data-brand="ana"]) { 
        background-size: cover; 
        background-position: center; 
        background-attachment: fixed; 
      }

      :host([data-brand="jal"][data-theme="light"]) .link-secondary::part(background),
      :host([data-brand="ana"][data-theme="light"]) .link-secondary::part(background) {
         background: var(--white-opacity-30);
      }

      :host([data-brand="jal"][data-theme="dark"]) .link-secondary::part(background),
      :host([data-brand="ana"][data-theme="dark"]) .link-secondary::part(background) {
         background: var(--black-opacity-30);
      }

      /* JAL & ANA */
      @media (min-width: 960px) {
        :host([data-brand="jal"]) .logo-wrapper { grid-column: 9 / 13; }

        :host([data-brand="ana"]) .logo-wrapper { grid-column: 8 / 13; }

        :host([data-brand="jal"]) .introduction,
        :host([data-brand="ana"]) .introduction { 
          grid-column: 1 / 13; 
          grid-row: initial;
          align-content: end;
        }

        :host([data-brand="jal"]) main,
        :host([data-brand="ana"]) main {
          align-items: initial;
          justify-content: initial;
          column-gap: var(--space-200);
          row-gap: var(--space-400);
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto 1fr;
          padding: var(--space-000);
        }
      }


      @media (min-width: 1100px) {
        :host([data-brand="jal"]) main,
        :host([data-brand="ana"]) main { 
          column-gap: var(--space-800); 
          row-gap: var(--space-800); 
        }
        :host([data-brand="jal"]) .introduction,
        :host([data-brand="ana"]) .introduction { 
          grid-row: initial; 
          align-content: end; 
        }
      }

      @media (min-width: 1400px) {

        :host([data-brand="jal"]),
        :host([data-brand="ana"]) {          
          padding-top: calc((var(--space-600) * 2) + env(safe-area-inset-top)); 

        } 

        :host([data-brand="jal"]) main,
        :host([data-brand="ana"]) main {
          grid-template-rows: auto 1fr; 
        }
        :host([data-brand="jal"]) .logo-wrapper { 
          grid-column: 10 / 13; 
        }
        :host([data-brand="ana"]) .logo-wrapper { 
          grid-column: 9 / 13; 
        }
        :host([data-brand="jal"]) .introduction,
        :host([data-brand="ana"]) .introduction { 
          grid-column: 1 / 13; 
        }
        :host([data-brand="jal"]) .introduction::part(align-items),
        :host([data-brand="ana"]) .introduction::part(align-items) { 
          align-items: center; 
        }
      }

      /* JAL & ANA - GRID END */
      
      :host([data-brand="jal"][data-theme="light"]) {
        background-image:
          linear-gradient(to top, var(--white-opacity-70) 0%, var(--white-opacity-70) 100%),
          url(${Jal});
      }
      :host([data-brand="jal"][data-theme="dark"]) {
        background-image:
          linear-gradient(to top, var(--black-opacity-80) 0%, var(--black-opacity-80) 100%),
          url(${Jal});
      }
      :host([data-brand="ana"][data-theme="light"]) {
        background-image:
          linear-gradient(to top, var(--white-opacity-50) 0%, var(--white-opacity-50) 100%),
          url(${AnaLight});
      }
      :host([data-brand="ana"][data-theme="dark"]) {
        background-image:
          linear-gradient(to top, var(--black-opacity-80) 0%, var(--black-opacity-80) 100%),
          url(${AnaNight});
      }

      @media (min-width: 960px) {
        :host([data-brand="jal"][data-theme="light"]) {
          background-image:
            linear-gradient(to top, var(--white-opacity-80) 0%, var(--white-opacity-0) 40%),
            url(${Jal});
        }
        :host([data-brand="jal"][data-theme="dark"]) {
          background-image:
            linear-gradient(to top, var(--black-opacity-90) 0%, var(--black-opacity-0) 40%),
            url(${Jal});
        }
        :host([data-brand="ana"][data-theme="light"]) {
          background-image:
            linear-gradient(45deg, var(--white-opacity-60) 0%, var(--white-opacity-80) 100%),
            url(${AnaLight});
        }
        :host([data-brand="ana"][data-theme="dark"]) {
          background-image:
            linear-gradient(45deg, var(--black-opacity-50) 0%, var(--black-opacity-0) 100%),
            url(${AnaNight});
        }
      }


      @media (min-width: 960px) {
        :host([data-brand="jal"]) .body-text,
        :host([data-brand="ana"]) .body-text { max-width: 58ch; }
      }

      @media (min-width: 1400px) {
        :host([data-brand="jal"]) .body-text,
        :host([data-brand="ana"]) .body-text { max-width: 68ch }
      }

      @media (min-width: 1877px) {
        :host([data-brand="jal"]) .body-text,
        :host([data-brand="ana"]) .body-text  { max-width: 75ch;}
      }
      /* ---- */

    `;

    const actions = this.getActions();

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

        <mui-responsive breakpoint="959" class="main-content__grid">
          
          <!-- Main content above -->
          <main slot="showAbove">
            <div class="logo-wrapper">
              ${desktop}
            </div>
            <mui-grid class="introduction">


              <mui-responsive breakpoint-high="1877" breakpoint-low="1400">
                <mui-body class="body-text" size="large" weight="bold" slot="showAbove">
                  ${intro}
                </mui-body> 
                <mui-body class="body-text"  size="medium" weight="bold" slot="showMiddle">
                  ${intro}
                </mui-body> 
                <mui-body class="body-text" size="small" weight="bold" slot="showBelow">
                  ${intro}
                </mui-body> 
              </mui-responsive>

              <mui-h-stack space="var(--space-300)">
                ${actions}
              </mui-h-stack>
            </mui-grid>

          </main>

          <!-- Main content below -->
          <main slot="showBelow">
            <mui-v-stack space="var(--space-600)" style="text-align: center;" alignX="center">
              <div class="logo-wrapper">
                <mui-responsive breakpoint="420">
                  ${phone}
                  ${tablet}
                </mui-responsive>
              </div>
              <mui-v-stack space="var(--space-500)" style="max-width: 31rem; padding-left: var(--space-300); padding-right: var(--space-300);">
                <mui-body class="body-text" size="small" weight="bold">
                  ${intro}
                </mui-body> 
              </mui-v-stack>
       
              <mui-responsive breakpoint="420">
              <mui-h-stack slot="showAbove" space="var(--space-300)">
                ${actions}
              </mui-h-stack>
                            <mui-v-stack slot="showBelow" space="var(--space-300)">
                ${actions}
              </mui-v-stack>
              </mui-responsive>
         
            </mui-v-stack>
          </main>

        </mui-responsive>
      </div>

    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("home-page", HomePage);
