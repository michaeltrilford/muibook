class MuiIconPlayStack extends HTMLElement {
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
          d="M8.553 3.242c.121-1.43 1.052-2.24 2.55-2.24H24.52c1.497 0 2.428.81 2.55 2.24zM6.327 7.748C6.49 6.264 7.34 5.347 9.093 5.347H26.53c1.753 0 2.603.917 2.765 2.4zm1.943 27.25c-3.21 0-5.046-1.822-5.046-5.032V14.789c0-3.21 1.835-5.018 5.046-5.018h19.46c3.224 0 5.046 1.821 5.046 5.018v15.176c0 3.211-1.822 5.032-4.91 5.032zm.566-4.17H27.3c.823 0 1.308-.43 1.308-1.443V15.383c0-1.012-.485-1.443-1.43-1.443H8.837c-.959 0-1.444.431-1.444 1.443v14.002c0 1.012.485 1.444 1.443 1.444m7.275-3.102c-1.038.634-2.266.081-2.266-1.174v-8.336c0-1.241 1.214-1.78 2.266-1.16l6.894 4.06c.984.58.998 1.97 0 2.563z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-play-stack")) {
  customElements.define("mui-icon-play-stack", MuiIconPlayStack);
}
