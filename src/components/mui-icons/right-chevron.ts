class MuiIconRightChevron extends HTMLElement {
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
          d="M27.214 18c0 .813-.288 1.482-.983 2.15l-9.664 9.467c-.498.498-1.075.721-1.77.721-1.416 0-2.583-1.154-2.583-2.556 0-.709.302-1.364.84-1.902l8.168-7.893-8.169-7.867c-.55-.538-.839-1.207-.839-1.901 0-1.39 1.167-2.557 2.583-2.557.708 0 1.272.236 1.77.72l9.664 9.468c.682.668.97 1.324.983 2.15"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-right-chevron")) {
  customElements.define("mui-icon-right-chevron", MuiIconRightChevron);
}
