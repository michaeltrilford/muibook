class MuiIconVerticalEllipsis extends HTMLElement {
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
      secondary: "var(--text-color-secondary)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

    // Map size to actual values
    const sizeMap: Record<"xx-small" | "x-small" | "small" | "medium" | "large", string> = {
      "xx-small": "1.2rem",
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
          height: auto;
          display: block;
          fill: inherit; 
        }
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >
        <path
          d="M14.943 8.875a3.053 3.053 0 0 1 3.05-3.051 3.064 3.064 0 0 1 3.064 3.05 3.067 3.067 0 0 1-3.063 3.064 3.056 3.056 0 0 1-3.05-3.063m0 8.52c0-1.689 1.362-3.05 3.05-3.05a3.056 3.056 0 0 1 3.064 3.05 3.067 3.067 0 0 1-3.063 3.064 3.056 3.056 0 0 1-3.05-3.064m0 8.521a3.056 3.056 0 0 1 3.05-3.063 3.067 3.067 0 0 1 3.064 3.063 3.064 3.064 0 0 1-3.063 3.05 3.053 3.053 0 0 1-3.05-3.05"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-vertical-ellipsis")) {
  customElements.define("mui-icon-vertical-ellipsis", MuiIconVerticalEllipsis);
}
