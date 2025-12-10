/* myApp */
class appNavbarTheme extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `

      :host {
        display: block;
        padding: var(--space-500);
        background: var(--app-navbar-surface);
        z-index: 3;
        position: sticky;
        top: 0;
        padding-top: calc(env(safe-area-inset-top) + var(--space-500));
        box-shadow: 0 var(--stroke-size-100) 0 0 var(--app-navbar-border-color);
      }

      mui-grid::part(align-items) {
        align-items: center;
      }

      theme-switcher {
      --form-default-border-color: var(--app-navbar-border-color);
      }

      @media (min-width: 960px) {
        :host {
          background: var(--app-navbar-surface-opacity);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: none;
        }
      }

    `;

    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-grid col="1fr auto" space="var(--space-400)">
        <theme-switcher></theme-switcher>
        <dark-mode-toggle></dark-mode-toggle>
      </mui-grid>
    `;
  }
}
customElements.define("app-navbar-theme", appNavbarTheme);
