class MuiList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "list");
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>

        :host { 
          display: block;
          width: 100%;
          list-style-position: outside;
          padding: var(--space-000);
          margin: var(--space-000);
          padding-left: var(--space-400);
          box-sizing: border-box;
        }
        
        :host([as="ol"]) {
          list-style-type: decimal;
        }
        :host([as="ul"]) {
          list-style-type: disc;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define("mui-list", MuiList);
