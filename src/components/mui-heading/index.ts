class MuiHeading extends HTMLElement {
  static get observedAttributes() {
    return ["size", "level", "truncate", "clamp"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (this.shadowRoot) {
      this.render();
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const size = this.getAttribute("size") || "1";
    const level = this.getAttribute("level") || size;
    const tag = `h${level}`;
    const lineClamp = this.getLineClamp();

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          --heading-line-clamp: ${lineClamp};
        }

        :host([truncate]) {
          min-width: 0;
          max-width: 100%;
          width: 100%;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: var(--space-000);
          font-family: var(--heading-font-family, var(--font-family));
          font-weight: var(--heading-font-weight);
          color: var(--heading-text-color);
          min-width: 0;
          width: 100%;
        }

        .content {
          max-width: 100%;
          min-width: 0;
        }

        :host([truncate]) .content {
          display: block;
          max-width: 100%;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        :host([clamp]:not([truncate])) .content {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: var(--heading-line-clamp);
        }

        .size-1 { font-size: var(--heading-font-size-100); line-height: var(--heading-line-height-100); }
        .size-2 { font-size: var(--heading-font-size-200); line-height: var(--heading-line-height-200); }
        .size-3 { font-size: var(--heading-font-size-300); line-height: var(--heading-line-height-300); }
        .size-4 { font-size: var(--heading-font-size-400); line-height: var(--heading-line-height-400); }
        .size-5 { font-size: var(--heading-font-size-500); line-height: var(--heading-line-height-500); }
        .size-6 { font-size: var(--heading-font-size-600); line-height: var(--heading-line-height-600); }
      </style>
      <${tag} class="size-${size}">
        <span class="content"><slot></slot></span>
      </${tag}>
    `;
  }

  private getLineClamp() {
    const value = Number(this.getAttribute("clamp"));
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 2;
  }
}

if (!customElements.get("mui-heading")) {
  customElements.define("mui-heading", MuiHeading);
}
