class MuiIconAi extends HTMLElement {
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
        <path d="M29.61 14.63a.616.616 0 0 1-.613-.543c-.624-4.138-1.106-4.825-5.214-5.368a.636.636 0 0 1-.577-.64c0-.313.236-.578.577-.615 3.99-.53 4.531-1.194 5.214-5.368.047-.325.294-.567.612-.567.306 0 .553.23.6.567.589 4.138 1.154 4.813 5.226 5.368A.62.62 0 0 1 36 8.08a.644.644 0 0 1-.565.639c-3.966.663-4.52 1.17-5.226 5.368-.058.314-.294.543-.6.543m-23.32-.386c-1.07 0-1.823-.772-1.823-1.882v-1.508c0-2.87 1.6-4.5 4.401-4.5H21.9a2.47 2.47 0 0 0-.706 1.726c0 .844.4 1.58.977 2.014H9.363c-.824 0-1.248.386-1.248 1.29v.978c0 1.11-.753 1.882-1.824 1.882m5.379 9.16c-1 0-1.577-.58-1.577-1.557 0-.253.07-.615.223-1.11l2.095-6.345c.46-1.46 1.283-2.123 2.59-2.123 1.353 0 2.212.675 2.66 2.123l2.106 6.345c.153.495.212.857.212 1.11 0 .977-.577 1.556-1.565 1.556-.848 0-1.377-.482-1.59-1.496l-.294-.989h-2.977l-.294.99c-.224 1.013-.742 1.495-1.59 1.495m2.436-4.862h1.86l-.871-3.378h-.118zm-7.814 1.71c-1.2 0-2.19-1.014-2.19-2.244s.99-2.244 2.19-2.244 2.19 1.013 2.19 2.244c0 1.23-.99 2.243-2.19 2.243m2.577 9.626c-2.8 0-4.401-1.629-4.401-4.5V23.69c0-1.11.753-1.882 1.824-1.882s1.824.773 1.824 1.882v1.17c0 .905.424 1.291 1.248 1.291h17.163c.823 0 1.247-.386 1.247-1.29v-7.275c0-.49.147-.915.404-1.236 0 0 .22.5 1.42.5s1.42-.5 1.42-.5c.258.321.405.746.405 1.236v7.793c0 2.871-1.59 4.5-4.402 4.5H8.868"></path>
        <path d="M22.009 13.867c0-.883.698-1.598 1.559-1.598s1.56.715 1.56 1.598l.01 7.938c0 .883-.698 1.598-1.56 1.598-.86 0-1.558-.715-1.558-1.598z"></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-ai")) {
  customElements.define("mui-icon-ai", MuiIconAi);
}
