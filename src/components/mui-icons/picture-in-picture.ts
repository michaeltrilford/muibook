class MuiIconPictureInPicture extends HTMLElement {
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
      secondary: "var(--text-color-secondary)",
    };

    // Resolve color based on the provided variant or color attribute
    const iconColor: string = (rawColor && colorMap[rawColor]) || rawColor || "var(--icon-color-default)";

    // Map size to actual values
    const sizeMap: Record<"xx-small" | "x-small" | "small" | "medium" | "large", string> = {
      "xx-small": "1.2rem",
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
          height: auto;
          display: block;
          fill: inherit; 
        }
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
      >
        <path
          d="M32.998 25.033a5.143 5.143 0 0 1-5.143 5.143H8.145a5.143 5.143 0 0 1-5.143-5.143V10.967a5.143 5.143 0 0 1 5.143-5.143h19.71a5.143 5.143 0 0 1 5.143 5.143zM8.145 9.681c-.71 0-1.286.576-1.286 1.286v14.066c0 .71.576 1.286 1.286 1.286h19.71c.71 0 1.285-.576 1.286-1.286V10.967c0-.71-.576-1.286-1.286-1.286z"
        ></path>
        <path
          d="M23.142 22.244v2.572h-3.855v-2.572zm1.93-1.93c0-.956-.004-1.48-.042-1.853l-.005-.031-.03-.004c-.373-.038-.897-.041-1.853-.041h-3.855c-.957 0-1.48.003-1.853.04l-.032.005-.003.031c-.038.372-.042.897-.042 1.853 0 .957.004 1.481.042 1.854l.003.03q.015.002.032.005c.372.038.896.041 1.853.041v2.572l-1.197-.008c-.959-.019-1.568-.088-2.037-.35l-.125-.077a2.6 2.6 0 0 1-.559-.506l-.149-.202c-.325-.487-.408-1.117-.428-2.163l-.006-1.196c0-1.694 0-2.594.357-3.234l.077-.124c.14-.21.31-.4.505-.56l.203-.149c.487-.325 1.116-.407 2.162-.428l1.197-.006h3.855c1.806 0 2.71 0 3.358.434.28.188.521.428.708.709.434.648.435 1.552.435 3.358l-.006 1.196c-.02 1.046-.103 1.676-.429 2.163l-.149.202q-.241.294-.559.506c-.486.325-1.116.407-2.162.427l-1.196.008v-2.572c.956 0 1.48-.003 1.853-.041l.03-.005.005-.03c.038-.373.041-.897.041-1.854"
        ></path>
      </svg>
    `;
  }
}

if (!customElements.get("mui-icon-picture-in-picture")) {
  customElements.define("mui-icon-picture-in-picture", MuiIconPictureInPicture);
}
