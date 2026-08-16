class MuiIconWarning extends HTMLElement {
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
      warning: "var(--text-color-warning)",
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
          d="M7.422 30.402C4.796 30.402 3 28.329 3 25.98c0-.747.193-1.493.58-2.198l10.6-18.544a4.38 4.38 0 0 1 3.827-2.21c1.492 0 2.943.718 3.8 2.21l10.613 18.53c.4.705.58 1.465.58 2.212 0 2.349-1.796 4.422-4.408 4.422zm10.599-10.24c1.091 0 1.74-.594 1.796-1.727l.249-5.127c.069-1.202-.788-2.017-2.06-2.017-1.27 0-2.127.801-2.058 2.003l.249 5.168c.069 1.106.718 1.7 1.824 1.7m0 5.196c1.243 0 2.155-.719 2.155-1.893 0-1.161-.912-1.893-2.155-1.893-1.244 0-2.17.718-2.17 1.893 0 1.174.94 1.893 2.17 1.893"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-warning")) {
  customElements.define("mui-icon-warning", MuiIconWarning);
}
