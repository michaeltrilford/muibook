class MuiIconNotification extends HTMLElement {
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
          d="M4 25.241c0-1.665 1.126-2.921 2.478-4.005 1.126-.899 1.312-2.55 1.696-5.34.437-4.362 2.226-7.653 5.486-8.816C14.35 5.216 15.966 4 18.007 4c2.027 0 3.644 1.216 4.333 3.08 3.26 1.163 5.049 4.454 5.486 8.816.384 2.79.57 4.441 1.696 5.34C30.874 22.32 32 23.576 32 25.241c0 1.626-1.14 2.71-2.902 2.71h-5.009C23.983 30.449 21.677 33 18.007 33c-3.684 0-5.99-2.551-6.096-5.05H6.902C5.14 27.95 4 26.868 4 25.242m5.075-1.084h17.73v-.132a5.1 5.1 0 0 1-1.762-1.507c-.768-.978-1.153-3.529-1.352-5.816-.291-4.044-1.709-5.67-3.418-6.12-.305-.079-.49-.211-.544-.647-.132-1.23-.755-1.943-1.722-1.943-.981 0-1.604.714-1.736 1.943-.053.436-.239.568-.544.647-1.709.45-3.127 2.076-3.418 6.12-.2 2.287-.57 4.838-1.352 5.816-.517.674-1.206 1.163-1.882 1.507zm6.732 3.794c.093 1.242.994 2.101 2.2 2.101 1.192 0 2.093-.859 2.186-2.101z"
        ></path>
      </svg>


    `;
  }
}

customElements.define("mui-icon-notification", MuiIconNotification);
