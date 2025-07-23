class MuiSlatAccessory extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const styles = /*css*/ `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--slat-accessory-background);
        padding: var(--space-200);
        border-radius: var(--radius-400);
      }
    `;

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>${styles}</style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-slat-accessory")) {
  customElements.define("mui-slat-accessory", MuiSlatAccessory);
}
