import "../mui-body";

class MuiFormHint extends HTMLElement {
  static get observedAttributes() {
    return ["size", "weight", "variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "small");
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const size = this.getAttribute("size") || "small";
    const weight = this.getAttribute("weight") || "regular";
    const variant = this.getAttribute("variant") || "optional";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          width: 100%;
        }
      </style>

      <mui-body size="${size}" weight="${weight}" variant="${variant}">
        <slot slot="before" name="before"></slot>
        <slot></slot>
        <slot slot="after" name="after"></slot>
      </mui-body>
    `;
  }
}

if (!customElements.get("mui-form-hint")) {
  customElements.define("mui-form-hint", MuiFormHint);
}
