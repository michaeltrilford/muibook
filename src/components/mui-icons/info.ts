class muiIconInfo extends HTMLElement {
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

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if ((name === "size" || name === "color") && oldValue !== newValue) {
      this.render();
    }
  }

  render(): void {
    const size = (this.getAttribute("size") || "small") as
      | "x-small"
      | "small"
      | "medium"
      | "large";
    const rawColor = this.getAttribute("color");

    // Color map for predefined color options
    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string =
      (rawColor && colorMap[rawColor]) ||
      rawColor ||
      "var(--icon-color-default)";

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
            d="M17.993 33C9.75 33 3 26.25 3 18.007S9.75 3 17.993 3 33 9.764 33 18.007 26.236 33 17.993 33m.042-19.177c1.269 0 2.315-1.074 2.315-2.33 0-1.324-1.046-2.356-2.315-2.356a2.35 2.35 0 0 0-2.343 2.357c0 1.255 1.074 2.329 2.343 2.329m-2.748 12.064h5.97c.85 0 1.52-.6 1.52-1.492 0-.823-.67-1.479-1.52-1.479h-1.074v-5.37c0-1.185-.558-1.924-1.674-1.924H15.58c-.864 0-1.52.642-1.52 1.465 0 .892.656 1.492 1.52 1.492h1.255v4.337h-1.548c-.85 0-1.52.656-1.52 1.479 0 .892.67 1.492 1.52 1.492"
          ></path>
      </svg>


    `;
  }
}

customElements.define("mui-icon-info", muiIconInfo);
