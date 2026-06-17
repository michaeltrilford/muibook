/* Mui Wrapper */
class MuiContainer extends HTMLElement {
  static get observedAttributes() {
    return ["width"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.syncWidth();
    this.render();
  }

  attributeChangedCallback() {
    this.syncWidth();
  }

  private getWidthValue() {
    const width = this.getAttribute("width")?.trim();
    if (!width) return "";

    if (CSS.supports("max-width", width)) {
      return width;
    }

    if (/^\d+(\.\d+)?$/.test(width)) {
      return `${Number(width) / 10}rem`;
    }

    return "";
  }

  private syncWidth() {
    const widthValue = this.getWidthValue();

    if (widthValue) {
      this.style.setProperty("--container-max-width", widthValue);
      return;
    }

    this.style.removeProperty("--container-max-width");
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 95%;
          width: calc(100% - 4.8rem);
          max-width: var(--container-max-width, 118rem);
          padding-top: 2.4rem;
          padding-bottom: 2.4rem;
          min-width: 27.2rem;
          margin: 0 2.4rem;
        }

        :host([center]) {
          margin: 0 auto;
        }

        :host([fluid]),
        :host([size="fluid"]) {
          --container-max-width: 100%;
        }

        :host([small]),
        :host([size="small"]) {
          --container-max-width: 54rem;
        }

        :host([medium]),
        :host([size="medium"]) {
          --container-max-width: 70rem;
        }

        :host([x-medium]),
        :host([size="x-medium"]) {
          --container-max-width: 96rem;
        }

        :host([large]),
        :host([size="large"]) {
          --container-max-width: 118rem;
        }
      </style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-container")) {
  customElements.define("mui-container", MuiContainer);
}
