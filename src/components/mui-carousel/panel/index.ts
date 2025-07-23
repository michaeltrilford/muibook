class MuiCarouselPanel extends HTMLElement {
  static get observedAttributes() {
    return ["item"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Template
    shadow.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          overflow: hidden;
        }
      </style>
      <slot></slot>
    `;
  }

  get item() {
    return this.getAttribute("item");
  }

  set item(value: string | null) {
    if (value !== null) {
      this.setAttribute("item", value);
    }
  }

  attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null) {
    // No-op for now
  }
}

if (!customElements.get("mui-carousel-panel")) {
  customElements.define("mui-carousel-panel", MuiCarouselPanel);
}
