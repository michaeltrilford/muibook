class MuiIconLeftArrow extends HTMLElement {
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
    const size = (this.getAttribute("size") || "small") as "x-small" | "small" | "medium" | "large";
    const rawColor = this.getAttribute("color");

    // Color map for predefined color options
    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

    // Map size to actual values
    const sizeMap: Record<"x-small" | "small" | "medium" | "large", string> = {
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
          d="M5 18c0-.683.288-1.41.748-1.86l9.266-9.355C15.532 6.26 16.151 6 16.755 6c1.482 0 2.475 1.031 2.475 2.383 0 .784-.346 1.365-.82 1.816l-3.223 3.254-2.331 2.179 2.978-.16h12.533C29.95 15.472 31 16.49 31 18c0 1.525-1.05 2.542-2.633 2.542H15.834l-2.978-.16 2.33 2.18 3.224 3.24c.474.45.82 1.03.82 1.815 0 1.351-.993 2.383-2.475 2.383-.604 0-1.223-.276-1.74-.785l-9.267-9.34C5.288 19.423 5 18.682 5 18"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-left-arrow")) {
  customElements.define("mui-icon-left-arrow", MuiIconLeftArrow);
}
