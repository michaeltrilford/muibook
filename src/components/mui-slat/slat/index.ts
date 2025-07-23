import "../../mui-button";
import "../../mui-icons/right-chevron";

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
        align-items: center;
        gap: ${space};
        box-sizing: border-box;
      }

      :host([variant="row"]) {
        padding: var(--space-300) var(--space-400);
         background: var(--slat-background);
         border-radius: var(--slat-radius);
      }

      :host([variant="header"]) {
        padding: var(--space-200) var(--space-400);
        padding-top: var(--space-400);
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
        padding: var(--space-300) var(--space-400);
      }

      .action::part(border) {
        border: var(--space-000);
      }

      .action::part(background) {
        background: var(--slat-background);
      }

      .action:hover::part(background) {
        background: var(--slat-background-hover);
      }

      .action::part(border-radius) {
        border-radius: var(--slat-radius);
      }

      .end {
        display: flex;
        align-items: center;
        gap: var(--space-300);
        text-align: right;
      }
      
      :host(.card-slot) {
        --slat-background: var(--slat-card-background);
        --slat-background-hover: var(--slat-card-background-hover);
      }

    `;

    this.shadowRoot!.innerHTML = isAction
      ? /*html*/ `
        <style>${styles}</style>
        <mui-button variant="tertiary" class="action">
          <slot name="start"></slot>
          <div class="end" slot="after">
            <slot name="end"></slot>
            <mui-icon-right-chevron size="x-small"></mui-icon-right-chevron>
          </div>
          
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

if (!customElements.get("mui-slat")) {
  customElements.define("mui-slat", MuiSlat);
}
