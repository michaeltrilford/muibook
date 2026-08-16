class MuiIconLeftChevron extends HTMLElement {
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
           d="M9.386 18c.013-.826.288-1.482.983-2.15l9.664-9.467a2.37 2.37 0 0 1 1.757-.721c1.429 0 2.596 1.167 2.596 2.557 0 .694-.289 1.363-.852 1.9l-8.17 7.868 8.17 7.893c.55.538.852 1.194.852 1.902 0 1.402-1.167 2.556-2.596 2.556-.682 0-1.272-.223-1.757-.72l-9.664-9.468c-.695-.668-.983-1.337-.983-2.15"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-left-chevron")) {
  customElements.define("mui-icon-left-chevron", MuiIconLeftChevron);
}
