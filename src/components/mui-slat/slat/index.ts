import "../../mui-button";
import "../../mui-icons/right-chevron";
import "../../mui-stack";

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

  enforceAvatarSizes() {
    const slots = this.shadowRoot?.querySelectorAll("slot");
    slots?.forEach((slot) => {
      const assigned = slot.assignedElements({ flatten: true });
      assigned.forEach((el) => {
        if (el.tagName.toLowerCase() === "mui-avatar") {
          el.setAttribute("size", "small");
        }
      });
    });
  }

  connectedCallback() {
    this.variant = this.getAttribute("variant") || "";
    this.setAttribute("role", "row");
    this.render();

    // Enforce avatar sizes after render
    requestAnimationFrame(() => {
      this.enforceAvatarSizes();
    });
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

  hasAccessorySlot(): boolean {
    const accessorySlot = this.querySelector('[slot="accessory"]');
    return accessorySlot !== null;
  }

  render() {
    const isAction = this.variant === "action";
    const col =
      this.getAttribute("col") || (isAction ? "minmax(0, 1fr) auto" : "1fr 1fr");
    const space = this.getAttribute("space") || "var(--space-500)";
    const hasAccessory = this.hasAccessorySlot();
    const isFileDiff = this.hasAttribute("file-diff-slot");

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

      :host([variant="row"][card-slot][condensed-slot]) {
        border-radius: 0;
      }

      :host([variant="row"][card-slot][condensed-slot-first]) {
        border-top-left-radius: var(--card-radius);
        border-top-right-radius: var(--card-radius);
      }

      :host([variant="row"][card-slot][condensed-slot-last]) {
        border-bottom-left-radius: var(--card-radius);
        border-bottom-right-radius: var(--card-radius);
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

      .action::part(grid-template-columns) {
        grid-template-columns: ${col};
      }

      .action::part(gap) {
        gap: ${space};
      }

      .action:focus {
        z-index: 1;
      }

      .action::part(padding) {
        padding: var(--space-300) var(--space-400);
      }

      :host([file-diff-slot]) .action::part(padding) {
        padding: var(--space-100) var(--space-400);
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
      
      :host([card-slot]),
      :host([result-slot]) {
        --slat-background: var(--slat-card-background);
        --slat-background-hover: var(--slat-card-background-hover);
      }

      :host([radius="none"]) .action::part(border-radius),
      :host([result-slot]) .action::part(border-radius) {
        border-radius: 0;
      }

      :host([result-slot][result-slot-last]) .action::part(border-radius) {
        border-bottom-left-radius: var(--card-radius);
        border-bottom-right-radius: var(--card-radius);
      }

      :host([radius="none"][condensed-slot-first]) .action::part(border-radius) {
        border-top-left-radius: var(--card-radius);
        border-top-right-radius: var(--card-radius);
      }

      :host([radius="none"][condensed-slot-last]) .action::part(border-radius) {
        border-bottom-left-radius: var(--card-radius);
        border-bottom-right-radius: var(--card-radius);
      }

      ::slotted(mui-avatar) {
        --avatar-background-override: var(--slat-avatar-background);
      }
      ::slotted(mui-avatar-group) {
        --avatar-group-ring-color: var(--slat-background);
      }
      .action:hover ::slotted(mui-avatar),
      .action:focus ::slotted(mui-avatar) {
        --avatar-background-override: var(--slat-avatar-background-hover);
      }
      .action:hover ::slotted(mui-avatar-group),
      .action:focus ::slotted(mui-avatar-group) {
        --avatar-group-ring-color: var(--slat-background-hover);
      }

      :host([card-slot]) ::slotted(mui-avatar),
      :host([result-slot]) ::slotted(mui-avatar) {
        --avatar-background-override: var(--slat-card-avatar-background);
      }
      :host([card-slot]) ::slotted(mui-avatar-group),
      :host([result-slot]) ::slotted(mui-avatar-group) {
        --avatar-group-ring-color: var(--slat-card-background);
      }
      :host([card-slot]) .action:hover ::slotted(mui-avatar),
      :host([card-slot]) .action:focus ::slotted(mui-avatar),
      :host([result-slot]) .action:hover ::slotted(mui-avatar),
      :host([result-slot]) .action:focus ::slotted(mui-avatar) {
        --avatar-background-override: var(--slat-card-avatar-background-hover);
      }
      :host([card-slot]) .action:hover ::slotted(mui-avatar-group),
      :host([card-slot]) .action:focus ::slotted(mui-avatar-group),
      :host([result-slot]) .action:hover ::slotted(mui-avatar-group),
      :host([result-slot]) .action:focus ::slotted(mui-avatar-group) {
        --avatar-group-ring-color: var(--slat-card-background-hover);
      }

    `;

    const startSlotMarkup = hasAccessory
      ? `
        <mui-h-stack alignY="center" space="var(--space-400)">
          <slot name="accessory"></slot>
          <slot name="start"></slot>
        </mui-h-stack>
      `
      : `<slot name="start"></slot>`;

    this.shadowRoot!.innerHTML = isAction
      ? /*html*/ `
        <style>${styles}</style>
        <mui-button variant="tertiary" class="action">
          ${startSlotMarkup}
          <div class="end" slot="after">
            <slot name="end"></slot>
            <mui-icon-right-chevron size="${isFileDiff ? 'xx-small' : 'x-small'}"></mui-icon-right-chevron>
          </div>
          
        </mui-button>
      `
      : /*html*/ `
        <style>${styles}</style>
        ${startSlotMarkup}
        <slot name="end"></slot>
      `;

    requestAnimationFrame(() => this.applyCellRoles());
  }
}

if (!customElements.get("mui-slat")) {
  customElements.define("mui-slat", MuiSlat);
}
