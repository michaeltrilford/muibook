class MuiFormSectionFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private onSlotChange = () => {
    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot") as HTMLSlotElement | null;
    const elements = slot?.assignedElements({ flatten: true }) ?? [];
    const hasRule = elements.some((el) => el.tagName.toLowerCase() === "mui-rule" || Boolean(el.querySelector("mui-rule")));
    this.toggleAttribute("has-rule", hasRule);
  };

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }

        .content {
          display: grid;
          gap: var(--form-section-footer-gap, var(--space-300));
          width: 100%;
          box-sizing: border-box;
        }

        :host([has-rule]) .content {
          gap: var(--form-section-footer-gap-with-rule, var(--space-400));
        }

        ::slotted(mui-rule) {
          margin: 0;
        }
      </style>
      <div class="content">
        <slot></slot>
      </div>
    `;

    const slot = this.shadowRoot.querySelector("slot");
    slot?.addEventListener("slotchange", this.onSlotChange);
    this.onSlotChange();
  }
}

if (!customElements.get("mui-form-section-footer")) {
  customElements.define("mui-form-section-footer", MuiFormSectionFooter);
}

