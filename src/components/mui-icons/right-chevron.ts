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
      small: "2.4rem",
      medium: "3.6rem",
      large: "4.8rem",
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
          d="M25.5 18.5c0 .79-.288 1.441-.983 2.091L14.853 29.8c-.498.484-1.075.701-1.77.701-1.416 0-2.583-1.122-2.583-2.487 0-.688.302-1.326.84-1.849l8.168-7.677-8.169-7.651c-.55-.523-.839-1.173-.839-1.85 0-1.351 1.167-2.486 2.583-2.486.708 0 1.272.23 1.77.701l9.664 9.208c.681.65.97 1.288.983 2.091"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-right-chevron")) {
  customElements.define("mui-icon-right-chevron", MuiIconRightChevron);
}
