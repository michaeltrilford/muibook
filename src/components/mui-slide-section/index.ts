class MuiSlideSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
      </style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-slide-section")) {
  customElements.define("mui-slide-section", MuiSlideSection);
}

