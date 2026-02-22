class MuiIconMovieClapper extends HTMLElement {
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
          d="M3.217 13.815c-.728-2.73.416-4.693 3.145-5.434l19.083-5.122c2.652-.715 4.693.312 5.382 2.912l.624 2.275c.377 1.443-.273 2.587-1.703 2.95l-5.798 1.56h6.63c1.508 0 2.418.924 2.418 2.406v13.155c0 2.834-1.612 4.445-4.459 4.445H8.806c-2.847 0-4.445-1.612-4.445-4.445V18zM22 11.202l2.976-.793.82-3.588c-.274.065-.534.13-.807.208l-2.158.598zm-6.773 1.82 3.055-.82.845-3.587-3.068.819zm-6.669 1.78 2.977-.78.82-3.613-2.965.819zm.676 5.551h3.081l1.95-3.419h-.624l-2.483.04zm6.929 0h3.159l1.95-3.419H18.1zm7.006 0h3.068l1.95-3.419h-3.08zM8.013 28.01c0 .897.442 1.274 1.287 1.274h18.745c.845 0 1.274-.377 1.274-1.274V23.16H8.013z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-movie-clapper")) {
  customElements.define("mui-icon-movie-clapper", MuiIconMovieClapper);
}
