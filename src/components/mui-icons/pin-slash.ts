class MuiIconPinSlash extends HTMLElement {
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
        <path d="M12.552 6.171h11.325c.922 0 1.568.615 1.568 1.456 0 .41-.164.85-.492 1.25-.512.646-1.66 1.589-3.116 2.511l.329 4.96c2.756 1.118 4.58 3.342 4.58 5.678 0 .666-.286 1.2-.768 1.517L14.551 12.095l.04-.707c-1.455-.922-2.613-1.865-3.125-2.51-.318-.4-.482-.852-.482-1.251 0-.84.646-1.456 1.568-1.456m-4.91 3.7c-.327-.328-.337-.932 0-1.27a.91.91 0 0 1 1.292.02l19.412 19.39a.89.89 0 0 1 0 1.261.903.903 0 0 1-1.271 0zm2.04 12.155c0-1.885 1.2-3.7 3.096-4.899l6.928 6.929h-.144v4.837c0 1.056-.973 2.993-1.342 2.993-.38 0-1.353-1.937-1.353-2.993v-5.012h-5.289c-1.127 0-1.896-.748-1.896-1.855"></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-pin-slash")) {
  customElements.define("mui-icon-pin-slash", MuiIconPinSlash);
}
