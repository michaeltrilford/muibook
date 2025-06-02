/* myApp */
class appNavbarTheme extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `

      :host {
        display: block;
        padding: var(--space-500);
        box-shadow: 0 1px 0 0 var(--border-color);
        margin-bottom: -1px;
        background: var(--app-navbar-surface);
        z-index: 3;
        position: sticky;
        top: 0;
        padding-top: calc(env(safe-area-inset-top) + var(--space-500));
      }

      mui-grid::part(align-items) {
        align-items: center;
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
