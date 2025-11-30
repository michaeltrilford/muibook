class MuiIconMusicQuarterNote extends HTMLElement {
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
          d="M14.394 20.817c0-2.239 1.442-3.706 4.19-4.303l1.99-.435c.2-.05.274-.2.274-.485V6.428a1.49 1.49 0 0 1 1.48-1.467c.808 0 1.467.671 1.467 1.467v12.635c0 4.042-3.233 5.634-5.21 5.634-2.425 0-4.192-1.63-4.192-3.88M3.002 27.159c0-2.238 1.443-3.693 4.191-4.303l1.977-.435c.212-.037.274-.186.274-.485v-9.153a1.48 1.48 0 0 1 1.48-1.467c.808 0 1.467.659 1.467 1.467v12.635c0 4.042-3.22 5.621-5.21 5.621-2.425 0-4.179-1.617-4.179-3.88m20.607 0c0-2.238 1.442-3.693 4.178-4.303l1.99-.435c.199-.037.273-.186.273-.485v-9.153a1.48 1.48 0 0 1 1.48-1.467c.809 0 1.468.659 1.468 1.467v12.635c0 4.042-3.221 5.621-5.21 5.621-2.426 0-4.18-1.617-4.18-3.88"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-music-quarter-note")) {
  customElements.define("mui-icon-music-quarter-note", MuiIconMusicQuarterNote);
}
