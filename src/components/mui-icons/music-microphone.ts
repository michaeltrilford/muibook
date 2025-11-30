class MuiIconMusicMicrophone extends HTMLElement {
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
          d="M22.07 4.952c2.503-2.573 6.2-2.882 8.984-.127 2.77 2.784 2.446 6.496-.126 8.984zm-3.74 28.16c-1.04 0-1.87-.8-1.87-1.84v-6.285l-6.13 5.708c-.702.646-1.476.646-2.474-.113l-2.503 2.039c-.492.393-1.124.337-1.56-.113l-.422-.407c-.422-.436-.506-1.069-.126-1.533l2.038-2.545c-.745-.998-.773-1.785-.112-2.488l12.99-13.89c-.084-1.744.647-3.46 2.067-4.851l8.844 8.857c-1.364 1.42-3.107 2.151-4.823 2.08l-3.992 3.713-.07 9.827a1.84 1.84 0 0 1-1.857 1.842M7.758 26.928l1.209 1.195 11.964-11.6a8 8 0 0 1-.843-.744 6.5 6.5 0 0 1-.717-.844z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-music-microphone")) {
  customElements.define("mui-icon-music-microphone", MuiIconMusicMicrophone);
}
