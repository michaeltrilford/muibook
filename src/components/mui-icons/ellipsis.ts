class MuiIconEllipsis extends HTMLElement {
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
          d="M6.616 21.5C4.628 21.5 3 19.941 3 18.007S4.628 14.5 6.616 14.5c2.002 0 3.63 1.573 3.63 3.507S8.618 21.5 6.616 21.5M18 21.5c-2.002 0-3.616-1.559-3.616-3.493S15.999 14.5 18 14.5s3.63 1.573 3.63 3.507S20.003 21.5 18 21.5m11.385 0c-2.003 0-3.631-1.559-3.631-3.493s1.628-3.507 3.63-3.507c1.988 0 3.616 1.573 3.616 3.507S31.372 21.5 29.384 21.5"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-ellipsis")) {
  customElements.define("mui-icon-ellipsis", MuiIconEllipsis);
}
