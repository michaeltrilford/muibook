class muiIconGrid extends HTMLElement {
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
          d="M7.372 13.212C5.905 13.212 5 12.278 5 10.735V7.977C5 6.435 5.905 5.5 7.372 5.5h2.819c1.467 0 2.372.935 2.372 2.477v2.758c0 1.543-.905 2.477-2.372 2.477zm9.213 0c-1.467 0-2.372-.934-2.372-2.477V7.977c0-1.542.905-2.477 2.372-2.477h2.819c1.466 0 2.372.935 2.372 2.477v2.758c0 1.543-.906 2.477-2.372 2.477zm9.224 0c-1.467 0-2.372-.934-2.372-2.477V7.977c0-1.542.905-2.477 2.372-2.477h2.819C30.095 5.5 31 6.435 31 7.977v2.758c0 1.543-.905 2.477-2.372 2.477zm-18.437 9.15C5.905 22.362 5 21.416 5 19.885v-2.77c0-1.53.905-2.477 2.372-2.477h2.819c1.467 0 2.372.947 2.372 2.477v2.77c0 1.53-.905 2.477-2.372 2.477zm9.213 0c-1.467 0-2.372-.946-2.372-2.477v-2.77c0-1.53.905-2.477 2.372-2.477h2.819c1.466 0 2.372.947 2.372 2.477v2.77c0 1.53-.906 2.477-2.372 2.477zm9.224 0c-1.467 0-2.372-.946-2.372-2.477v-2.77c0-1.53.905-2.477 2.372-2.477h2.819c1.467 0 2.372.947 2.372 2.477v2.77c0 1.53-.905 2.477-2.372 2.477zM7.372 31.5C5.905 31.5 5 30.553 5 29.023v-2.758c0-1.543.905-2.489 2.372-2.489h2.819c1.467 0 2.372.947 2.372 2.489v2.758c0 1.53-.905 2.477-2.372 2.477zm9.213 0c-1.467 0-2.372-.947-2.372-2.477v-2.758c0-1.543.905-2.489 2.372-2.489h2.819c1.466 0 2.372.947 2.372 2.489v2.758c0 1.53-.906 2.477-2.372 2.477zm9.224 0c-1.467 0-2.372-.947-2.372-2.477v-2.758c0-1.543.905-2.489 2.372-2.489h2.819c1.467 0 2.372.947 2.372 2.489v2.758c0 1.53-.905 2.477-2.372 2.477z"
        ></path>
      </svg>


    `;
  }
}

customElements.define("mui-icon-grid", muiIconGrid);
