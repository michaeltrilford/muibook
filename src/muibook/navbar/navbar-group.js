/* myApp */
class appNavbarGroup extends HTMLElement {
  static get observedAttributes() {
    return ["groupname"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    let html = /*html*/ `
    <style>
      :host { display: block; }
      :host(:last-of-type) { padding-bottom: 6rem; }
    </style>

    <mui-accordion-block heading="${this.getAttribute("groupname")}">
      <slot slot="detail"></slot>
    </mui-accordion-block>
    
    `;

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define("app-navbar-group", appNavbarGroup);
