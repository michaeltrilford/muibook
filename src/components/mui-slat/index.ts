class MuiSlat extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "col", "space"];
  }

  private variant = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "variant") {
      this.variant = newValue;
    }

    this.render(); // always re-render for any observed attribute
  }

  connectedCallback() {
    this.variant = this.getAttribute("variant") || "";
    this.setAttribute("role", "row");
    this.render();
  }

  applyCellRoles() {
    const slots = this.shadowRoot?.querySelectorAll("slot");
    slots?.forEach((slot) => {
      const assigned = slot.assignedElements({ flatten: true });
      assigned.forEach((el) => {
        el.setAttribute("role", "cell");
      });
    });
  }

  render() {
    const isAction = this.variant === "action";
    const col = this.getAttribute("col") || "1fr 1fr";
    const space = this.getAttribute("space") || "var(--space-500)";

    const styles = /*css*/ `
      :host {
        display: grid;
        grid-template-columns: ${col};
        gap: ${space};
        box-sizing: border-box;
      }

      :host([variant="row"]) {
        padding-left: var(--space-400);
        padding-right: var(--space-400);
        padding-bottom: var(--space-400);
      }

      :host([variant="header"]) {
        padding-left: var(--space-400);
        padding-right: var(--space-400);
        padding-bottom: var(--space-200);
      }

      :host([variant="action"]) {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        width: 100%;
      }

      .action::part(text-align) {
        text-align: left;
      }

      .action:focus {
        z-index: 1;
      }

      .action::part(padding) {
        padding: var(--space-400);
      }

      .action::part(border) {
        border: var(--space-000);
      }

      .action::part(background) {
        background: var(--slat-action-background);
      }

      .action:hover::part(background) {
        background: var(--slat-action-background-hover);
      }

    `;

    this.shadowRoot!.innerHTML = isAction
      ? /*html*/ `
        <style>${styles}</style>
        <mui-button variant="tertiary" class="action">
          <slot name="start"></slot>
          <slot name="end" slot="after"></slot>
        </mui-button>
      `
      : /*html*/ `
        <style>${styles}</style>
        <slot name="start"></slot>
        <slot name="end"></slot>
      `;

    requestAnimationFrame(() => this.applyCellRoles());
  }
}

customElements.define("mui-slat", MuiSlat);
