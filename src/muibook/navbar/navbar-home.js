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
        box-shadow: 0 1px 0 0 var(--border-color);
        z-index: 2;
        top: 92px;
        margin-bottom: -1px;
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
        padding: 1.5rem var(--space-500);
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
      mui-link::part(background) {
        background: var(--surface-elevated-100);
      }

      mui-link:hover::part(background) {
        background: var(--surface-elevated-200);
      }


    </style>

    <mui-link href="${this.getAttribute("link")}">${this.getAttribute(
      "title"
    )}</mui-link>

    `;

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("app-navbar-home", appNavbarHome);
