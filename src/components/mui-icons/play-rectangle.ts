class MuiIconPlayRectangle extends HTMLElement {
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
          d="M7.67 30.18c-2.974 0-4.673-1.687-4.673-4.66V10.48c0-2.973 1.699-4.66 4.672-4.66h20.662c2.986 0 4.672 1.687 4.672 4.66v15.04c0 2.973-1.686 4.66-4.672 4.66zm.524-3.86h19.625c.874 0 1.324-.4 1.324-1.35V11.03c0-.95-.45-1.337-1.324-1.337H8.194c-.887 0-1.337.387-1.337 1.336v13.942c0 .949.45 1.349 1.337 1.349m8.057-3.398c-.962.575-2.099.062-2.099-1.087v-7.72c0-1.15 1.125-1.662 2.1-1.087l6.383 3.76a1.367 1.367 0 0 1 0 2.374z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-play-rectangle")) {
  customElements.define("mui-icon-play-rectangle", MuiIconPlayRectangle);
}
