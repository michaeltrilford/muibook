class MuiIconSun extends HTMLElement {
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
          d="M18.692 8.106c-1.081 0-1.994-.914-1.994-1.996V3.524c0-1.096.913-2.024 1.994-2.024 1.096 0 2.009.928 2.009 2.024V6.11c0 1.082-.913 1.996-2.009 1.996m7.373 3.12c-.772-.773-.786-2.094-.042-2.839l1.84-1.841c.758-.76 2.064-.787 2.809-.042.772.773.786 2.08.042 2.839l-1.826 1.841c-.772.773-2.079.787-2.823.042m-14.746 0c-.744.745-2.05.731-2.809-.042L6.685 9.33c-.745-.745-.73-2.052.042-2.825.744-.745 2.05-.717 2.809.042l1.825 1.841c.745.745.73 2.066-.042 2.84m7.373 15.377c-4.424 0-8.075-3.655-8.075-8.096s3.651-8.096 8.075-8.096c4.438 0 8.09 3.655 8.09 8.096s-3.652 8.096-8.09 8.096m10.42-8.096c0-1.082.914-1.996 1.995-1.996h2.584c1.095 0 2.008.914 2.008 1.996s-.913 1.996-2.008 1.996h-2.584c-1.081 0-1.994-.914-1.994-1.996m-20.812 0c0 1.082-.927 1.996-2.023 1.996H3.693c-1.08 0-1.994-.914-1.994-1.996s.913-1.996 1.994-1.996h2.584c1.096 0 2.023.914 2.023 1.996m17.723 7.337c.773-.773 2.079-.787 2.837-.042l1.84 1.841c.772.759.786 2.066.042 2.811-.773.773-2.079.787-2.837.042l-1.84-1.827c-.772-.773-.786-2.08-.042-2.825m-14.662 0c.745.745.73 2.052-.042 2.825l-1.84 1.827c-.744.745-2.05.731-2.836-.042-.73-.745-.73-2.066.042-2.825l1.854-1.827c.744-.745 2.05-.731 2.822.042m7.331 3.05c1.096 0 2.009.914 2.009 2.01v2.586c0 1.082-.913 2.01-2.009 2.01-1.081 0-1.994-.928-1.994-2.01v-2.586c0-1.096.913-2.01 1.994-2.01"
        ></path>
      </svg>


    `;
  }
}

customElements.define("mui-icon-sun", MuiIconSun);
