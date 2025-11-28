class MuiIconCheck extends HTMLElement {
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
          d="M17.993 33C9.75 33 3 26.25 3 18.007S9.75 3 17.993 3 33 9.764 33 18.007 26.236 33 17.993 33m-1.52-7.908c.67 0 1.283-.349 1.673-.934l6.444-9.666c.279-.39.404-.809.404-1.185 0-.976-.864-1.688-1.827-1.688-.641 0-1.13.349-1.562 1.018l-5.16 8.145-2.218-2.636c-.39-.46-.822-.683-1.38-.683-.963 0-1.772.767-1.772 1.757 0 .46.126.823.516 1.27l3.152 3.71c.475.571 1.032.892 1.73.892"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-check")) {
  customElements.define("mui-icon-check", MuiIconCheck);
}
