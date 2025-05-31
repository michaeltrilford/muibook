/* Mui Rule */
class muiCell extends HTMLElement {
  static get observedAttributes() {
    return ["align-y"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.setAttribute("role", "cell");
    const styles = /*css*/ `
    :host {
      display: flex;
      justify-content: space-between;
      align-self: ${this.getAttribute("align-y") || "initial"};
      text-align: left;
    }
    :host(*:first-of-type) {
      padding-left: var(--space-600);
    }
    :host(*:last-of-type) {
      padding-right: var(--space-600);
    }

    /* Card Slot (Supports: Table Cell, Accordion Block) */
    :host(.card-slot:first-of-type) {
      padding-left: var(--space-500);
    }
    :host(.card-slot:last-of-type) {
      padding-right: var(--space-500);
    }
    @media (min-width: 768px) {
      :host(.card-slot:first-of-type) {
        padding-left: var(--space-600);
      }
      :host(.card-slot:last-of-type) {
        padding-right: var(--space-600);
      }
    }

    :host([checkbox]) {
      width: auto;
      padding: 0;
      text-align: center;
    }
    :host([action]) {
      width: 4.4rem;
      height: 4.4rem;
      padding: 0;
      padding-right: var(--space-300);
    }
    :host([heading]) {
      font-weight: bold;
    }
  `;

    shadowRoot.innerHTML = /*html*/ `
    <style>${styles}</style>
    <slot></slot>
  `;
  }
}

customElements.define("mui-cell", muiCell);
