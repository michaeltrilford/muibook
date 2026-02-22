class MuiIconSearch extends HTMLElement {
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
      <path d="M4.5 15.873C4.5 9.583 9.622 4.5 15.962 4.5c6.326 0 11.462 5.082 11.462 11.373 0 1.996-.543 3.874-1.483 5.489l4.633 4.596c.635.63.926 1.458.926 2.298 0 1.839-1.39 3.244-3.256 3.244-.873 0-1.734-.302-2.356-.92l-4.685-4.648a11.14 11.14 0 0 1-5.241 1.3c-6.34 0-11.462-5.082-11.462-11.36m4.328 0c0 3.887 3.203 7.065 7.134 7.065 3.93 0 7.12-3.178 7.12-7.065 0-3.9-3.19-7.079-7.12-7.079s-7.134 3.178-7.134 7.079"></path>
    </svg>


    `;
  }
}

if (!customElements.get("mui-icon-search")) {
  customElements.define("mui-icon-search", MuiIconSearch);
}
