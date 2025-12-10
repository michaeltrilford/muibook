/* myApp */
class appNavbarMenu extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `

      :host {
        display: block;
        overflow-x: hidden;
        overflow-y: scroll;
        background: var(--app-navbar-surface);
        position: fixed;
        bottom: 0;
        top: 0;
      }
      :host([mobile]) {
        height: calc(100vh - 7.6rem);
        z-index: 1;
        width: 100%;
      }
      :host([desktop]) {
        align-items: center;
        text-align: left;
        opacity: 1;
        z-index: 100;
        width: 26rem;
        height: 100%;
      }
      :host([desktop])::-webkit-scrollbar {
        display: none; 
      } 


      @media (min-width: 960px) {
        :host {
          background: var(--app-navbar-surface-opacity);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
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
