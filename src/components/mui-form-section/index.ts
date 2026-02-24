import "../mui-heading";

class MuiFormSection extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "heading-level", "disabled", "borderless"];
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

  private onSlotChange = () => {
    if (!this.shadowRoot) return;
    const headerSlot = this.shadowRoot.querySelector('slot[name="header"]') as HTMLSlotElement | null;
    const footerSlot = this.shadowRoot.querySelector('slot[name="footer"]') as HTMLSlotElement | null;
    const hasHeader = Boolean(headerSlot?.assignedElements({ flatten: true }).length);
    const hasFooter = Boolean(footerSlot?.assignedElements({ flatten: true }).length);
    this.toggleAttribute("has-header", hasHeader);
    this.toggleAttribute("has-footer", hasFooter);
  };

  render() {
    if (!this.shadowRoot) return;

    const heading = this.getAttribute("heading") || "";
    const headingLevelRaw = Number(this.getAttribute("heading-level") || "4");
    const headingLevel = Number.isFinite(headingLevelRaw)
      ? Math.min(6, Math.max(1, Math.trunc(headingLevelRaw)))
      : 4;
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
        :host([has-header]) .legend-row {
          display: none;
        }
        .header {
          margin-bottom: var(--space-600);
        }
        :host(:not([has-header])) .header {
          display: none;
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
        .footer {
          margin-top: var(--space-600);
        }
        :host(:not([has-footer])) .footer {
          display: none;
        }
        :host([disabled]) {
          cursor: not-allowed;
        }
        :host([disabled]) fieldset {
          opacity: 0.7;
        }
      </style>

      <fieldset ${disabled ? "disabled" : ""}>
        ${
          heading
            ? `<legend class="vh">${heading}</legend><div class="legend-row"><mui-heading size="4" level="${headingLevel}">${heading}</mui-heading></div>`
            : ""
        }
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </fieldset>
    `;

    const headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
    const footerSlot = this.shadowRoot.querySelector('slot[name="footer"]');
    headerSlot?.addEventListener("slotchange", this.onSlotChange);
    footerSlot?.addEventListener("slotchange", this.onSlotChange);
    this.onSlotChange();
  }
}

if (!customElements.get("mui-form-section")) {
  customElements.define("mui-form-section", MuiFormSection);
}
