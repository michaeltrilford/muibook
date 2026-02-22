import "../mui-heading";

class MuiFormSection extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "disabled", "borderless"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const heading = this.getAttribute("heading") || "";
    const disabled = this.hasAttribute("disabled");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }
        fieldset {
          border: var(--border-thin);
          border-color: var(--border-color);
          border-radius: var(--radius-200);
          padding: var(--space-500);
          background: var(--surface-elevated-100);
          box-sizing: border-box;
          min-inline-size: 0;
          margin: 0;
        }
        :host([borderless]) fieldset {
          border: none;
        }
        @media (min-width: 768px) {
          fieldset {
            padding: var(--space-600);
          }
        }
        legend {
          margin: 0;
          padding: 0;
        }
        .legend-row {
          margin-bottom: var(--space-600);
        }
        .vh {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }
        .content {
          display: grid;
          gap: var(--space-500);
        }
        :host([disabled]) {
          cursor: not-allowed;
        }
        :host([disabled]) fieldset {
          opacity: 0.7;
        }
      </style>

      <fieldset ${disabled ? "disabled" : ""}>
        ${heading ? `<legend class="vh">${heading}</legend><div class="legend-row"><mui-heading size="4" level="4">${heading}</mui-heading></div>` : ""}
        <div class="content">
          <slot></slot>
        </div>
      </fieldset>
    `;
  }
}

if (!customElements.get("mui-form-section")) {
  customElements.define("mui-form-section", MuiFormSection);
}
