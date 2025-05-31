class muiIconGlobe extends HTMLElement {
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

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if ((name === "size" || name === "color") && oldValue !== newValue) {
      this.render();
    }
  }

  render(): void {
    const size = (this.getAttribute("size") || "small") as
      | "x-small"
      | "small"
      | "medium"
      | "large";
    const rawColor = this.getAttribute("color");

    // Color map for predefined color options
    const colorMap: Record<string, string> = {
      default: "var(--icon-color-default)",
      inverted: "var(--icon-color-inverted)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string =
      (rawColor && colorMap[rawColor]) ||
      rawColor ||
      "var(--icon-color-default)";

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
            d="M17.993 33.5C9.75 33.5 3 26.75 3 18.507S9.75 3.5 17.993 3.5 33 10.264 33 18.507 26.236 33.5 17.993 33.5M9.471 10.571c.6.405 1.381.753 2.288 1.046.641-1.743 1.534-3.166 2.566-4.184a11.8 11.8 0 0 0-4.854 3.138m12.19-3.138c1.046 1.018 1.925 2.455 2.58 4.184.907-.279 1.688-.628 2.288-1.032a11.73 11.73 0 0 0-4.868-3.152m-2.496.934v4.06c.948-.043 1.855-.14 2.705-.266-.697-1.8-1.66-3.18-2.705-3.793m-5.05 3.794c.865.126 1.772.223 2.707.265V8.367c-1.033.614-1.995 1.995-2.706 3.794m-7.726 5.16h4.24c.056-1.227.223-2.398.474-3.486-1.213-.39-2.245-.865-3.026-1.437a11.6 11.6 0 0 0-1.688 4.924m18.982 0h4.226a11.56 11.56 0 0 0-1.674-4.923c-.78.572-1.813 1.046-3.026 1.437.237 1.088.404 2.26.474 3.486m-12.371 0h3.822V14.77a26 26 0 0 1-3.39-.376c-.209.934-.362 1.924-.432 2.928m6.165 0h3.821a18 18 0 0 0-.432-2.928c-1.06.195-2.204.32-3.39.376zM6.389 19.666c.181 1.799.781 3.5 1.702 4.979.78-.558 1.813-1.046 3.012-1.423a22 22 0 0 1-.488-3.556zm6.611 0c.07 1.032.223 2.036.446 2.984a28 28 0 0 1 3.376-.362v-2.622zm6.165 2.622c1.185.055 2.329.18 3.389.362.223-.948.376-1.952.432-2.984h-3.821zm5.718.934c1.213.377 2.231.865 3.012 1.423a11.66 11.66 0 0 0 1.716-4.98h-4.24a19 19 0 0 1-.488 3.557m-5.718 1.409v4.016c1.032-.613 1.994-1.98 2.691-3.751-.85-.14-1.757-.223-2.691-.265m-5.035.265c.697 1.785 1.66 3.152 2.691 3.751V24.63a23 23 0 0 0-2.691.265m10.097.544c-.641 1.701-1.52 3.124-2.552 4.128a11.7 11.7 0 0 0 4.826-3.11c-.6-.405-1.367-.74-2.274-1.018M9.485 26.457a11.8 11.8 0 0 0 4.84 3.11c-1.046-1.004-1.91-2.427-2.566-4.128-.893.279-1.674.613-2.274 1.018"
          ></path>
      </svg>


    `;
  }
}

customElements.define("mui-icon-globe", muiIconGlobe);
