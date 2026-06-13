class MuiIconCopy extends HTMLElement {
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
          d="M10.975 9.318V6.154q0-2.147 1.13-3.29 1.143-1.143 3.277-1.143h4.558q1.23 0 2.185.352a4.6 4.6 0 0 1 1.732 1.13l6.115 6.253q.803.828 1.142 1.795.34.954.34 2.336v9.517q0 2.147-1.143 3.29-1.13 1.142-3.265 1.142H24.51v-3.24h2.135q.803 0 1.18-.389.39-.401.39-1.167v-9.794h-4.948q-1.293 0-2.021-.715-.716-.729-.716-2.022V4.961h-4.759q-.79 0-1.18.402-.377.39-.377 1.155v2.8zm12.016.565q0 .314.138.464.15.138.465.138h3.779L22.99 6.053zM4.546 29.846V12.91q0-2.148 1.13-3.29Q6.82 8.476 8.954 8.476h4.281q1.269 0 2.11.277.854.263 1.682 1.117l6.604 6.667q.566.578.867 1.13.3.54.414 1.206.113.652.113 1.57v9.403q0 2.147-1.143 3.29-1.13 1.143-3.264 1.143H8.954q-2.135 0-3.278-1.143-1.13-1.13-1.13-3.29m3.24-.351q0 .753.377 1.142.388.402 1.18.402h10.886q.79 0 1.167-.402.39-.39.39-1.142V21.07H15.96q-1.633 0-2.424-.779-.79-.79-.79-2.435v-6.14h-3.39q-.804 0-1.193.402-.378.39-.377 1.142zM16.21 18.42h5.31l-6.114-6.19v5.386q0 .414.189.615.2.189.615.189"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-copy")) {
  customElements.define("mui-icon-copy", MuiIconCopy);
}
