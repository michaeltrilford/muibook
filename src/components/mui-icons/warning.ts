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
          d="M7.422 31.5C4.796 31.5 3 29.456 3 27.139c0-.736.193-1.472.58-2.168l10.6-18.29c.842-1.445 2.335-2.181 3.827-2.181s2.943.709 3.8 2.18L32.42 24.959c.4.695.58 1.445.58 2.18 0 2.318-1.796 4.362-4.408 4.362zM18.02 21.4c1.091 0 1.74-.585 1.796-1.703l.249-5.057c.069-1.185-.788-1.99-2.06-1.99-1.27 0-2.127.79-2.058 1.977l.249 5.097c.069 1.09.718 1.677 1.824 1.677m0 5.125c1.243 0 2.155-.708 2.155-1.867 0-1.145-.912-1.867-2.155-1.867-1.244 0-2.17.709-2.17 1.867 0 1.159.94 1.867 2.17 1.867"
        ></path>
      </svg>


    `;
  }
}

customElements.define("mui-icon-warning", MuiIconWarning);
