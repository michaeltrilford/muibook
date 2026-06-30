/* myApp */
class appNavbarMenu extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `

      :host {
        display: block;
        overflow: hidden;
        background: var(--app-navbar-surface);
        width: 100%;
        height: 100%;
      }

    `;

    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <slot></slot>
    `;
  }
}

customElements.define("app-navbar-menu", appNavbarMenu);
