class MuiCell extends HTMLElement {
  static get observedAttributes() {
    return ["align-y"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "cell");
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
    <style>
    :host {
      display: flex;
      justify-content: space-between;
      align-self: ${this.getAttribute("align-y") || "initial"};
      text-align: left;

    }
    :host(*:first-of-type) {
      padding-left: var(--space-400);
    }
    :host(*:last-of-type) {
      padding-right: var(--space-400);
    }

    /* Card Slot (Supports: Table Cell, Accordion Block) */
    :host([card-slot]:first-of-type) {
      padding-left: var(--space-500);
    }
    :host([card-slot]:last-of-type) {
      padding-right: var(--space-500);
    }
    @media (min-width: 768px) {
      :host(*:first-of-type) {
        padding-left: var(--space-600);
      }
      :host(*:last-of-type) {
        padding-right: var(--space-600);
      }
      :host([card-slot]:first-of-type) {
        padding-left: var(--space-600);
      }
      :host([card-slot]:last-of-type) {
        padding-right: var(--space-600);
      }
    }

    :host([checkbox]) {
      width: auto;
      text-align: center;
    }
    :host([action]) {
      width: 4.4rem;
      height: 4.4rem;
    }
    </style>
     <slot></slot>
  `;
  }
}

if (!customElements.get("mui-cell")) {
  customElements.define("mui-cell", MuiCell);
}
