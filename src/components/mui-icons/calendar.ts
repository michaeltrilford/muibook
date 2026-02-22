class MuiIconCalendar extends HTMLElement {
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
          d="M8.207 31.5C4.893 31.5 3 29.63 3 26.335V9.665C3 6.369 4.893 4.5 8.207 4.5h19.587C31.12 4.5 33 6.37 33 9.665v16.67c0 3.296-1.88 5.165-5.206 5.165zm.5-4.279h18.571c.933 0 1.42-.415 1.42-1.412V13.888c0-.997-.487-1.413-1.42-1.413H8.708c-.933 0-1.406.416-1.406 1.413v11.921c0 .997.473 1.412 1.406 1.412m6.738-10.509c-.529 0-.71-.166-.71-.678v-.817c0-.526.181-.692.71-.692h.808c.529 0 .71.166.71.692v.817c0 .512-.181.678-.71.678zm4.316 0c-.529 0-.71-.166-.71-.678v-.817c0-.526.181-.692.71-.692h.821c.515 0 .71.166.71.692v.817c0 .512-.195.678-.71.678zm4.316 0c-.516 0-.71-.166-.71-.678v-.817c0-.526.194-.692.71-.692h.82c.516 0 .71.166.71.692v.817c0 .512-.194.678-.71.678zm-12.961 4.223c-.515 0-.71-.166-.71-.678v-.817c0-.526.195-.692.71-.692h.821c.53 0 .71.166.71.692v.817c0 .512-.18.678-.71.678zm4.33 0c-.53 0-.71-.166-.71-.678v-.817c0-.526.18-.692.71-.692h.807c.529 0 .71.166.71.692v.817c0 .512-.181.678-.71.678zm4.315 0c-.529 0-.71-.166-.71-.678v-.817c0-.526.181-.692.71-.692h.821c.515 0 .71.166.71.692v.817c0 .512-.195.678-.71.678zm4.316 0c-.516 0-.71-.166-.71-.678v-.817c0-.526.194-.692.71-.692h.82c.516 0 .71.166.71.692v.817c0 .512-.194.678-.71.678zm-12.961 4.237c-.515 0-.71-.18-.71-.692v-.817c0-.512.195-.692.71-.692h.821c.53 0 .71.18.71.692v.817c0 .512-.18.692-.71.692zm4.33 0c-.53 0-.71-.18-.71-.692v-.817c0-.512.18-.692.71-.692h.807c.529 0 .71.18.71.692v.817c0 .512-.181.692-.71.692zm4.315 0c-.529 0-.71-.18-.71-.692v-.817c0-.512.181-.692.71-.692h.821c.515 0 .71.18.71.692v.817c0 .512-.195.692-.71.692z"
        ></path>
      </svg>


    `;
  }
}

if (!customElements.get("mui-icon-calendar")) {
  customElements.define("mui-icon-calendar", MuiIconCalendar);
}
