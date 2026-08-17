class MuiIconDrag extends HTMLElement {
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
          d="M14.143 24.429a1.929 1.929 0 1 1 0 3.857 1.929 1.929 0 0 1 0-3.857m7.714 0a1.93 1.93 0 1 1 0 3.858 1.93 1.93 0 0 1 0-3.858m-7.714-8.358a1.929 1.929 0 1 1 0 3.858 1.929 1.929 0 0 1 0-3.858m7.714 0a1.929 1.929 0 1 1 0 3.858 1.929 1.929 0 0 1 0-3.858m-7.714-8.357a1.929 1.929 0 1 1-.001 3.858 1.929 1.929 0 0 1 0-3.858m7.714 0a1.928 1.928 0 1 1 0 3.858 1.928 1.928 0 0 1 0-3.857"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-drag")) {
  customElements.define("mui-icon-drag", MuiIconDrag);
}
