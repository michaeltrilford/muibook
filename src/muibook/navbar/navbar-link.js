/* myApp */
class appNavbarLink extends HTMLElement {
  static get observedAttributes() {
    return ["link", "title", "badge"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const badge = this.getAttribute("badge");
    const title = this.getAttribute("title");
    const link = this.getAttribute("link");
    const badgeClass = badge ? "has-badge" : "";

    let html = /*html*/ `
    <style>

      :host {
        display: block;
      }

      .has-badge::part(justify-content) {
        justify-content: space-between;
      }
      .has-badge::part(display) {
        display: flex;
      }

      mui-link {
        transition: opacity 400ms ease-in, transform 100ms ease-in;
        opacity: 1;
        display: inline-block;
        width: 100%;
      }

      mui-link:hover,
      mui-link:focus { 
        opacity: 1; 
      }

      @media (min-width: 960px) {
        mui-link:hover { 
          transform: scale(1.1); 
        } 
      } 

      /* Text Parts */
      mui-link::part(text-decoration) {
        text-decoration: none;
      }

      /* Spacing Parts */
      mui-link::part(padding) {
        padding: var(--space-200) var(--space-500);
      }
      mui-link::part(margin) {
        margin: var(--space-000);
      }
    </style>

    <mui-link href="${link}" class="${badgeClass}">
    ${title}
    ${badge ? `<mui-badge>${badge}</mui-badge>` : ``}
    </mui-link> 
    `;

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("app-navbar-link", appNavbarLink);
