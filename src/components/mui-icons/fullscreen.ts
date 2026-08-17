class MuiIconFullscreen extends HTMLElement {
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
          d="M6.429 21.253c1.065 0 1.928.863 1.928 1.928v3.214h5.786a1.929 1.929 0 0 1 0 3.858H7.714A3.214 3.214 0 0 1 4.5 27.038v-3.857c0-1.065.863-1.928 1.929-1.928m23.142 0c1.066 0 1.929.863 1.929 1.928v3.857a3.214 3.214 0 0 1-3.214 3.215h-6.429a1.929 1.929 0 0 1 0-3.858h5.786v-3.214c0-1.065.863-1.928 1.928-1.928M14.143 5.824a1.929 1.929 0 0 1 0 3.857H8.357v3.214a1.929 1.929 0 1 1-3.857 0V9.038a3.214 3.214 0 0 1 3.214-3.214zm14.143 0A3.214 3.214 0 0 1 31.5 9.038v3.857a1.929 1.929 0 1 1-3.857 0V9.681h-5.786a1.929 1.929 0 0 1 0-3.857z"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-fullscreen")) {
  customElements.define("mui-icon-fullscreen", MuiIconFullscreen);
}
