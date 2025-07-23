class MuiAddon extends HTMLElement {
  static get observedAttributes() {
    return ["slot"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void {
    if (name === "slot" && oldVal !== newVal) {
      this.render();
    }
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: var(--space-200) var(--space-400);
          background: var(--addon-background);
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          height: 4.4rem;
          min-width: 4.4rem;
          white-space: nowrap;
        }
        :host([slot="before"]) {
          border-right: none;
          border-top-left-radius: var(--radius-100);
          border-bottom-left-radius: var(--radius-100);
        }
        :host([slot="after"]) {
          border-left: none;
          border-top-right-radius: var(--radius-100);
          border-bottom-right-radius: var(--radius-100);
        }
      </style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-addon")) {
  customElements.define("mui-addon", MuiAddon);
}
