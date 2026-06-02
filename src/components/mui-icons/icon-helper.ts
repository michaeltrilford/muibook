type IconSize = "xx-small" | "x-small" | "small" | "medium" | "large";

export function defineMuiIcon(tagName: string, paths: string, viewBox = "0 0 28 28") {
  class MuiIcon extends HTMLElement {
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
      const size = (this.getAttribute("size") || "small") as IconSize;
      const rawColor = this.getAttribute("color");

      const colorMap: Record<string, string> = {
        default: "var(--icon-color-default)",
        inverted: "var(--icon-color-inverted)",
      };

      const iconColor = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

      const sizeMap: Record<IconSize, string> = {
        "xx-small": "1.3rem",
        "x-small": "1.6rem",
        small: "2.1rem",
        medium: "2.4rem",
        large: "2.8rem",
      };

      this.classList.add("mui-icon");

      if (!this.shadowRoot) return;

      this.shadowRoot.innerHTML = /*html*/ `
        <style>
          :host {
            width: ${sizeMap[size] ?? sizeMap.small};
            height: ${sizeMap[size] ?? sizeMap.small};
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

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="${viewBox}">
          ${paths}
        </svg>
      `;
    }
  }

  if (!customElements.get(tagName)) {
    customElements.define(tagName, MuiIcon);
  }
}
