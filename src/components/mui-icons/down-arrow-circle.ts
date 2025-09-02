class MuiIconDownArrowCircle extends HTMLElement {
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
          d="M17.992 35C8.65 35 1 27.35 1 18.008S8.65 1 17.992 1 35 8.666 35 18.008 27.334 35 17.992 35m0-4.932c6.686 0 12.06-5.39 12.06-12.06 0-6.686-5.39-12.06-12.06-12.06s-12.06 5.374-12.06 12.06c0 6.67 5.39 12.06 12.06 12.06m0-20.327c1.186 0 2.102.806 2.102 1.928v6.07l-.205 2.972.948-1.439 1.423-1.643c.3-.364.806-.585 1.312-.585 1.027 0 1.754.695 1.754 1.66 0 .553-.142.932-.553 1.375l-5.042 5.374c-.459.506-1.028.759-1.739.759-.695 0-1.249-.253-1.723-.76l-5.042-5.373c-.411-.443-.553-.822-.553-1.376 0-.964.71-1.66 1.754-1.66.522 0 1.012.222 1.312.585l1.438 1.692.933 1.39-.205-2.97v-6.07c0-1.123.916-1.929 2.086-1.929"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-down-arrow-circle")) {
  customElements.define("mui-icon-down-arrow-circle", MuiIconDownArrowCircle);
}
