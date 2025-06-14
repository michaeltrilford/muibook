class MuiIconLeftSidebar extends HTMLElement {
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
          d="M7.671 30.5C4.7 30.5 3 28.838 3 25.91V11.09C3 8.163 4.699 6.5 7.671 6.5H28.33C31.314 6.5 33 8.162 33 11.09v14.82c0 2.928-1.686 4.59-4.671 4.59zm.525-3.803h6.057V10.315H8.196c-.887 0-1.337.394-1.337 1.317V25.38c0 .923.45 1.317 1.337 1.317m19.62-16.382H17.764v16.382h10.054c.874 0 1.324-.394 1.324-1.317V11.632c0-.923-.45-1.317-1.324-1.317m-16.148 4.32H9.47c-.65 0-1.174-.504-1.174-1.095 0-.578.524-1.083 1.174-1.083h2.198c.65 0 1.161.504 1.161 1.083 0 .59-.512 1.095-1.161 1.095m0 3.644H9.47c-.65 0-1.174-.505-1.174-1.084 0-.59.524-1.083 1.174-1.083h2.198c.65 0 1.161.493 1.161 1.083 0 .579-.512 1.084-1.161 1.084m0 3.655H9.47c-.65 0-1.174-.505-1.174-1.096 0-.59.524-1.083 1.174-1.083h2.198c.65 0 1.161.493 1.161 1.084 0 .59-.512 1.095-1.161 1.095"
        ></path>
      </svg>


    `;
  }
}

customElements.define("mui-icon-left-sidebar", MuiIconLeftSidebar);
