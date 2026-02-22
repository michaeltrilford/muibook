class MuiIconMessage extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if ((name === "size" || name === "color") && oldValue !== newValue) {
      this.render();
    }
  }

  render(): void {
    const size = (this.getAttribute("size") || "small") as "xx-small" | "x-small" | "small" | "medium" | "large";
    const rawColor = this.getAttribute("color");

    // Color map for predefined color options
    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

    // Map size to actual values
    const sizeMap: Record<"xx-small" | "x-small" | "small" | "medium" | "large", string> = {
      "xx-small": "1.3rem",
      "x-small": "1.6rem",
      small: "2.1rem",
      medium: "2.4rem",
      large: "2.8rem",
    };

    const sizeStyleMap = sizeMap[size] ?? sizeMap.small;

    this.classList.add("mui-icon");

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          width: ${sizeStyleMap};
          height: ${sizeStyleMap};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          fill: ${iconColor};
        }
        svg {
          width: 100%;
          display: block;
          fill: inherit; 
        }
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >
        <path
          d="M12.38 32c-1.45 0-2.341-.956-2.341-2.54v-2.542h-.93c-3.372 0-6.109-2.49-6.109-6.39V10.39C3 6.49 5.507 4 9.453 4h17.094C30.493 4 33 6.503 33 10.39v10.138c0 3.887-2.507 6.39-6.453 6.39h-6.873l-4.251 3.648C14.2 31.61 13.373 32 12.38 32m.942-4.29 3.92-3.798c.726-.692 1.133-.893 2.1-.893h6.9c1.87 0 2.825-.918 2.825-2.78v-9.56c0-1.861-.955-2.78-2.826-2.78H9.76c-1.871 0-2.826.919-2.826 2.78v9.56c0 1.862.955 2.78 2.826 2.78h2.252c.815 0 1.311.352 1.311 1.283zm-1.756-12.528c-1.107 0-1.616-.515-1.616-1.597v-1.887c0-1.082.509-1.585 1.616-1.585h4.582c1.095 0 1.617.503 1.617 1.585v1.887c0 1.082-.522 1.597-1.617 1.597zm9.61 4.768c-1.095 0-1.617-.503-1.617-1.585v-5.85c0-1.081.522-1.584 1.617-1.584h3.284c1.094 0 1.616.503 1.616 1.585v5.849c0 1.082-.522 1.585-1.617 1.585zm-8.515.817c-1.095 0-1.617-.503-1.617-1.597v-1.195c0-1.094.522-1.598 1.617-1.598h4.073c1.107 0 1.616.504 1.616 1.598v1.195c0 1.094-.51 1.597-1.616 1.597z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-message")) {
  customElements.define("mui-icon-message", MuiIconMessage);
}
