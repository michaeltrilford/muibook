class MuiIconRectangleBottomPanel extends HTMLElement {
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
          d="M32.998 25.033a5.143 5.143 0 0 1-5.143 5.143H8.145a5.143 5.143 0 0 1-5.143-5.143V10.967a5.143 5.143 0 0 1 5.143-5.143h19.71a5.143 5.143 0 0 1 5.143 5.143zM8.145 9.681c-.71 0-1.286.576-1.286 1.286v14.066c0 .71.576 1.286 1.286 1.286h19.71c.71 0 1.285-.576 1.286-1.286V10.967c0-.71-.576-1.286-1.286-1.286z"
        ></path>
        <path
          d="M19.927 22.244v2.572h-3.854v-2.572zm1.93-1.93c0-.956-.003-1.48-.041-1.853l-.005-.031-.03-.004c-.373-.038-.897-.041-1.854-.041h-3.854c-.957 0-1.481.003-1.854.04l-.031.005-.004.031c-.038.372-.041.897-.041 1.853 0 .957.003 1.481.041 1.854l.004.03q.015.002.031.005c.373.038.897.041 1.854.041v2.572l-1.197-.008c-.96-.019-1.568-.088-2.038-.35l-.124-.077a2.6 2.6 0 0 1-.559-.506l-.15-.202c-.325-.487-.407-1.117-.427-2.163l-.007-1.196c0-1.694 0-2.594.358-3.234l.077-.124c.14-.21.31-.4.505-.56l.203-.149c.486-.325 1.116-.407 2.162-.428l1.197-.006h3.854c1.807 0 2.71 0 3.359.434.28.188.52.428.708.709.434.648.435 1.552.435 3.358l-.007 1.196c-.02 1.046-.102 1.676-.428 2.163l-.15.202a2.6 2.6 0 0 1-.558.506c-.487.325-1.116.407-2.162.427l-1.197.008v-2.572c.957 0 1.481-.003 1.854-.041l.03-.005q.002-.015.005-.03c.038-.373.041-.897.041-1.854"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-rectangle-bottom-panel")) {
  customElements.define("mui-icon-rectangle-bottom-panel", MuiIconRectangleBottomPanel);
}
