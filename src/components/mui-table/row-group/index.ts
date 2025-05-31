/* Mui Rule */
class muiRowGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "rowgroup");
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      :host {
        display: block;
      }
      :host([heading]) {
        display: block;
      }

      :host([heading]) ::slotted(mui-row) {
        border: none;
      }
    </style>
    <slot></slot>
    `;
  }
}

customElements.define("mui-row-group", muiRowGroup);
