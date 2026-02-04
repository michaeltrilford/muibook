class MuiIconRectangleMediaText extends HTMLElement {
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
        <path
          d="M32.998 25.033a5.143 5.143 0 0 1-5.143 5.143H8.145a5.143 5.143 0 0 1-5.143-5.143V10.967a5.143 5.143 0 0 1 5.143-5.143h19.71a5.143 5.143 0 0 1 5.143 5.143zM8.145 9.681c-.71 0-1.286.576-1.286 1.286v14.066c0 .71.576 1.286 1.286 1.286h19.71c.71 0 1.285-.576 1.286-1.286V10.967c0-.71-.576-1.286-1.286-1.286zM22.67 22.103c.527 0 .91.396.91.924 0 .5-.383.896-.91.896H9.84c-.54 0-.923-.395-.923-.896 0-.528.382-.924.923-.924zm2.717-3.323c.527 0 .923.396.923.897a.91.91 0 0 1-.923.923H9.84a.9.9 0 0 1-.923-.923c0-.501.382-.896.923-.897zm-12.436-7.556c.963 0 1.477.527 1.477 1.477v2.559c0 .949-.514 1.476-1.476 1.476h-2.545c-.963 0-1.49-.527-1.49-1.476V12.7c0-.949.527-1.476 1.49-1.476z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-rectangle-media-text")) {
  customElements.define("mui-icon-rectangle-media-text", MuiIconRectangleMediaText);
}
