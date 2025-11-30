class MuiIconListAndFilm extends HTMLElement {
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
          d="M4.524 10.846c-.844 0-1.522-.756-1.522-1.567 0-.844.667-1.566 1.522-1.566h21.553c.866 0 1.522.7 1.522 1.566 0 .833-.667 1.566-1.522 1.566zM17.567 28.01c-1.278 0-2.111-.845-2.111-2.1V15.39c0-1.267.833-2.1 2.11-2.1h13.321c1.278 0 2.11.833 2.11 2.1v10.52c0 1.255-.832 2.1-2.11 2.1zM4.524 16.656c-.844 0-1.522-.756-1.522-1.567 0-.844.667-1.566 1.522-1.566h7.277c.866 0 1.522.71 1.522 1.566 0 .833-.667 1.567-1.522 1.567zm12.887.533h1.133c.19 0 .334-.133.334-.322v-1.289c0-.189-.145-.322-.334-.322h-1.133c-.189 0-.333.133-.333.322v1.289c0 .189.144.322.333.322m12.498 0h1.134c.188 0 .333-.133.333-.322v-1.289c0-.189-.145-.322-.333-.322h-1.134c-.188 0-.333.133-.333.322v1.289c0 .189.145.322.333.322m-9.21 2.4h7.066c.278 0 .467-.211.467-.478v-3.233c0-.278-.189-.478-.467-.478H20.7c-.278 0-.478.2-.478.478v3.233c0 .267.2.478.478.478m-3.288.544h1.133c.19 0 .334-.133.334-.311v-1.289a.327.327 0 0 0-.334-.333h-1.133a.327.327 0 0 0-.333.333v1.289c0 .178.144.311.333.311m12.498 0h1.134c.188 0 .333-.133.333-.311v-1.289a.327.327 0 0 0-.333-.333h-1.134a.327.327 0 0 0-.333.333v1.289c0 .178.145.311.333.311M4.524 22.477c-.844 0-1.522-.755-1.522-1.566 0-.845.667-1.578 1.522-1.578h7.277c.866 0 1.522.711 1.522 1.578 0 .822-.667 1.566-1.522 1.566zm12.887.6h1.133a.325.325 0 0 0 .334-.322v-1.289a.32.32 0 0 0-.334-.333h-1.133a.32.32 0 0 0-.333.333v1.289c0 .178.144.322.333.322m12.498 0h1.134a.325.325 0 0 0 .333-.322v-1.289a.32.32 0 0 0-.333-.333h-1.134a.32.32 0 0 0-.333.333v1.289c0 .178.145.322.333.322m-9.21 2.8h7.066a.45.45 0 0 0 .467-.467v-3.233a.443.443 0 0 0-.467-.466H20.7c-.278 0-.478.188-.478.466v3.233c0 .267.2.467.478.467m-3.288.144h1.133c.19 0 .334-.133.334-.322V24.41c0-.189-.145-.322-.334-.322h-1.133c-.189 0-.333.133-.333.322V25.7c0 .189.144.322.333.322m12.498 0h1.134c.188 0 .333-.133.333-.322V24.41c0-.189-.145-.322-.333-.322h-1.134c-.188 0-.333.133-.333.322V25.7c0 .189.145.322.333.322M4.524 28.287c-.844 0-1.522-.755-1.522-1.566 0-.844.667-1.567 1.522-1.567h7.277c.866 0 1.522.7 1.522 1.567 0 .833-.667 1.566-1.522 1.566z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-list-and-film")) {
  customElements.define("mui-icon-list-and-film", MuiIconListAndFilm);
}
