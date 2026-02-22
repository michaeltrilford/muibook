class MuiIconRectangleLeftDrawer extends HTMLElement {
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
          d="M27.855 5.823a5.143 5.143 0 0 1 5.143 5.143v14.068a5.143 5.143 0 0 1-5.143 5.143H8.145a5.143 5.143 0 0 1-5.143-5.143V10.966a5.143 5.143 0 0 1 5.143-5.143zM15.053 26.32h12.802c.71 0 1.285-.577 1.286-1.286V10.968c0-.71-.576-1.286-1.286-1.286H15.053zM8.145 9.682c-.71 0-1.286.576-1.286 1.285v14.067c0 .71.576 1.285 1.286 1.286h4.337V9.682z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-rectangle-left-drawer")) {
  customElements.define("mui-icon-rectangle-left-drawer", MuiIconRectangleLeftDrawer);
}
