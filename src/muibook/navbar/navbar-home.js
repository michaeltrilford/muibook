/* myApp */
class appNavbarHome extends HTMLElement {
  static get observedAttributes() {
    return ["link", "title"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    let html = /*html*/ `
    <style>

      :host { 
        display: block;
        position: sticky; 
        z-index: 3;
        top: 92px;
        background: var(--app-navbar-surface);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-top: var(--app-navbar-border);
        border-bottom: var(--app-navbar-border);
      }

      mui-link {
        display: block;
      }

      /* Text Parts */
      mui-link::part(color) {
        color: var(--app-nav-accent);
      }
      mui-link::part(text-decoration) {
        text-decoration: none;
      }
      mui-link::part(font-weight) {
        font-weight: var(--font-weight-700);
      }

      /* Spacing Parts */
      mui-link::part(padding) {
        padding: var(--space-400) var(--space-500);
      }
      mui-link::part(margin) {
        margin: var(--space-000);
      }
      mui-link::part(width) {
        width: 100%;
      }

      /* Layout Parts */
      mui-link::part(display) {
        display: block;
      } 

      /* Visual Parts */
      mui-link:hover::part(background) {
        background: var(--app-navbar-surface-100);
      }


    </style>

    <mui-link href="${this.getAttribute("link")}">${this.getAttribute("title")}</mui-link>

    `;

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("app-navbar-home", appNavbarHome);
