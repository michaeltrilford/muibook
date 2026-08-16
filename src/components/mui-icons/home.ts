class MuiIconHome extends HTMLElement {
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
          d="M4.415 17.76c-1.118 0-1.844-.725-1.844-1.748 0-.511.274-1.07.75-1.474L15.715 4.142c.725-.619 1.582-.928 2.414-.928.845 0 1.69.31 2.427.928l4.496 3.782V6.497c0-.57.392-.94.963-.94h2.676c.571 0 .94.37.94.94v5.257l3.318 2.784c.476.404.75.963.75 1.474 0 1.023-.726 1.749-1.844 1.749-.488 0-.999-.226-1.427-.595l-.797-.666v10.396c0 2.034-1.285 3.318-3.45 3.318H10.09c-2.165 0-3.45-1.284-3.45-3.318V16.5l-.809.666c-.416.369-.927.595-1.415.595m17.116 2.13v6.637h3.354c.678 0 1.07-.393 1.07-1.07V13.418l-7.04-5.899c-.25-.214-.524-.333-.786-.333s-.523.119-.773.333l-7.041 5.9v12.036c0 .678.38 1.071 1.07 1.071h3.354V19.89c0-.583.38-.963.964-.963h4.876c.571 0 .952.38.952.963"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-home")) {
  customElements.define("mui-icon-home", MuiIconHome);
}
