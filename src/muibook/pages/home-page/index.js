import "../../images/mui/mui-logo-mobile";
import "../../images/mui/mui-logo";

class HomePage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    const intro = /*html*/ `
      Muibook is the home of the Mui Design System <span style="opacity: 0.5;">(MichaelUI)</span>  — native Web Components with clean, composable patterns that help you write less code
    `;

    const styles = /*css*/ `
    
      :host { display: flex; width: 100%; align-items: stretch; }
      .main-content__grid { display: grid; min-height: 100%; }
      
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
      
      @media (min-width: 961px) {
        .logo-wrapper { grid-column: 4 / 13; }
        .introduction { grid-column: 4 / 13; grid-row: 2 / 3; }
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
        main { column-gap: var(--space-800); row-gap: var(--space-800); }
        .introduction { grid-row: initial; align-content: end; }
      }

      @media (min-width: 1400px) {
        .logo-wrapper { grid-column: 5 / 12; }
        .introduction { grid-column: 5 / 12; margin-bottom: var(--space-800); }
        .introduction::part(align-items) { align-items: center; }
      }

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <mui-container slot="main-content" center fluid>
        <mui-responsive breakpoint="960" class="main-content__grid">
          
          <!-- Main content above -->
          <main slot="showAbove">
            <div class="logo-wrapper">
              <mui-logo color="var(--app-logo-color)"></mui-logo>
            </div>
            <mui-grid class="introduction" col="1fr auto" space="var(--space-600)">


              <mui-responsive breakpoint-high="1877" breakpoint-low="1720">
                <mui-body size="large" weight="bold" slot="showAbove" style="max-width: 64ch;">
                  ${intro}
                </mui-body> 
                <mui-body size="medium" weight="bold" slot="showMiddle" style="max-width: 60ch;">
                  ${intro}
                </mui-body> 
                <mui-body size="small" weight="bold" slot="showBelow" style="max-width: 52ch;">
                  ${intro}
                </mui-body> 
              </mui-responsive>


              <mui-link 
                href="/#/create-mui-app"
                variant="primary" 
                rounded>
                Get Started
              </mui-link>
            </mui-grid>

          </main>

          <!-- Main content below -->
          <main slot="showBelow">
            <mui-v-stack space="var(--space-600)" style="text-align: center;">
              <div class="logo-wrapper">
              <mui-responsive breakpoint="420">
                <mui-logo-mobile color="var(--app-logo-color)" slot="showBelow"></mui-logo-mobile>
                <mui-logo color="var(--app-logo-color)"  slot="showAbove" style="max-width: 26rem;"></mui-logo>
              </mui-responsive>
              </div>
              <mui-v-stack space="var(--space-500)" style="max-width: 31rem; padding-left: var(--space-300); padding-right: var(--space-300);">
                <mui-body size="small" weight="bold">
                  ${intro}
                </mui-body> 
              </mui-v-stack>
              <mui-link 
                href="/#/create-mui-app" 
                variant="primary">
                Get Started
              </mui-link>
            </mui-v-stack>
          </main>

        </mui-responsive>
      </mui-container>

    `;
  }
}

customElements.define("home-page", HomePage);
