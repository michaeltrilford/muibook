class MuiSlatGroup extends HTMLElement {
  static get observedAttributes() {
    return ["variant"];
  }

  private variant = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "variant") {
      this.variant = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.variant = this.getAttribute("variant") || "";
    this.render();
  }

  render() {
    const isInset = this.variant === "inset";

    const styles = /*css*/ `
      :host {
        display: block;
      }

      ${
        isInset
          ? /*css*/ `

          ::slotted(mui-slat) {
          margin-left: calc(-1 * var(--space-400));
          margin-right: calc(-1 * var(--space-400));
          width: calc(100% + (var(--space-400) * 2));
        }

        ::slotted(mui-rule) {
          margin-left: calc(-1 * var(--space-500));
          margin-right: calc(-1 * var(--space-500));
          width: calc(100% + (var(--space-500) * 2));
          margin-top: var(--space-200);
        }

        ::slotted(mui-rule:first-of-type) {
          margin-top: var(--space-000);
        }

        @media (min-width: 768px) {
          ::slotted(mui-rule) {
            margin-left: calc(-1 * var(--space-600));
            margin-right: calc(-1 * var(--space-600));
            width: calc(100% + (var(--space-600) * 2));
            margin-top: var(--space-400);
          }
        }


      `
          : ""
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-slat-group")) {
  customElements.define("mui-slat-group", MuiSlatGroup);
}
