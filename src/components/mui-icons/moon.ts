class MuiIconMoon extends HTMLElement {
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
          d="M25.982 22.513c1.697 0 3.455-.32 4.465-.776.55-.274 1.024-.411 1.467-.411.643 0 1.086.456 1.086 1.157 0 .365-.107.867-.352 1.43C30.34 29.301 24.79 33 18.52 33 9.62 33 3 26.531 3 17.657c0-6.27 3.807-12.054 9.572-14.368.49-.198.933-.289 1.284-.289.765 0 1.223.518 1.223 1.187 0 .396-.137.853-.397 1.37-.596 1.142-.963 3.227-.963 5.069 0 7.351 4.724 11.887 12.263 11.887"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-moon")) {
  customElements.define("mui-icon-moon", MuiIconMoon);
}
