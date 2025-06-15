class MuiHeading extends HTMLElement {
  static get observedAttributes() {
    return ["size", "level"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    const size = this.getAttribute("size") || "1";
    const level = this.getAttribute("level") || size; // fallback if level isn't provided

    const tag = `h${level}`;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host { display: block; }

        h1, h2, h3, h4, h5, h6 {
          margin: var(--space-000);
          font-weight: var(--heading-font-weight);
          color: var(--heading-text-color);
        }

        .size-1 { font-size: var(--heading-font-size-100); line-height: var(--heading-line-height-100); }
        .size-2 { font-size: var(--heading-font-size-200); line-height: var(--heading-line-height-200); }
        .size-3 { font-size: var(--heading-font-size-300); line-height: var(--heading-line-height-300); }
        .size-4 { font-size: var(--heading-font-size-400); line-height: var(--heading-line-height-400); }
        .size-5 { font-size: var(--heading-font-size-500); line-height: var(--heading-line-height-500); }
        .size-6 { font-size: var(--heading-font-size-600); line-height: var(--heading-line-height-600); }
      </style>
      <${tag} class="size-${size}">
        <slot></slot>
      </${tag}>
    `;
  }
}

customElements.define("mui-heading", MuiHeading);
