import "../mui-heading";
import "../mui-body";

class MuiFormGroup extends HTMLElement {
  private slotEl: HTMLSlotElement | null = null;

  static get observedAttributes() {
    return ["heading", "heading-level", "heading-space", "hide-label", "variant", "space", "aligny"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindSlotBehavior();
    this.updateChoiceGroupState();
  }

  attributeChangedCallback() {
    this.render();
    this.bindSlotBehavior();
    this.updateChoiceGroupState();
  }

  render() {
    if (!this.shadowRoot) return;

    const heading = this.getAttribute("heading") || "";
    const hideLabel = this.hasAttribute("hide-label");
    const isChoiceGroup = this.hasAttribute("choice-group");
    const headingLevel = this.getHeadingLevel();

    this.syncLayoutAttributes();

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          --form-group-space: var(--space-500);
          --form-group-heading-space: var(--form-group-space);
          --form-group-align-y: start;
        }
        .group {
          display: grid;
        }
        .group-heading {
          display: block;
          margin: 0;
          margin-bottom: var(--form-group-heading-space);
        }
        .group-label {
          display: inline-flex;
          margin: 0;
          margin-bottom: var(--form-group-space);
        }
        .content {
          display: grid;
          gap: var(--form-group-space);
          min-inline-size: 0;
        }
        .content-inner {
          display: contents;
        }
        :host([variant="horizontal"]) .content {
          grid-template-columns: var(--form-group-horizontal-template, minmax(0, 1fr) minmax(0, 20rem));
          align-items: var(--form-group-align-y);
        }
        :host([variant="horizontal"]) .content-inner ::slotted(*) {
          min-inline-size: 0;
        }
        :host([variant="horizontal"]) .content-inner ::slotted(mui-form-message),
        :host([variant="horizontal"]) .content-inner ::slotted(mui-form-hint) {
          grid-column: 1 / -1;
        }
        @media (max-width: 767px) {
          :host([variant="horizontal"]) .content {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="group">
        ${
          heading && !hideLabel
            ? isChoiceGroup
              ? `<mui-body class="group-label" size="small" weight="bold" variant="optional">${heading}</mui-body>`
              : `<mui-heading class="group-heading" size="5" level="${headingLevel}">${heading}</mui-heading>`
            : ""
        }
        <div class="content">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  private bindSlotBehavior() {
    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot") as HTMLSlotElement | null;
    if (!slot) return;
    if (this.slotEl === slot) return;

    this.slotEl?.removeEventListener("slotchange", this.updateChoiceGroupState);
    this.slotEl = slot;
    this.slotEl.addEventListener("slotchange", this.updateChoiceGroupState);
  }

  private updateChoiceGroupState = () => {
    const slotted = this.slotEl?.assignedElements({ flatten: true }) || [];
    const choiceSelector = "mui-radio-group, mui-radio, mui-checkbox, mui-switch";
    const hasChoiceControls = slotted.some((el) => {
      const tag = el.tagName.toLowerCase();
      if (tag === "mui-radio-group" || tag === "mui-radio" || tag === "mui-checkbox" || tag === "mui-switch") {
        return true;
      }
      return Boolean(el.querySelector?.(choiceSelector));
    });

    if (hasChoiceControls === this.hasAttribute("choice-group")) return;

    this.toggleAttribute("choice-group", hasChoiceControls);
    this.render();
    this.bindSlotBehavior();
  };

  private syncLayoutAttributes() {
    const space = this.getAttribute("space");
    const alignY = this.getAttribute("aligny");
    const headingSpace = this.getAttribute("heading-space");

    if (space) {
      this.style.setProperty("--form-group-space", space);
    } else {
      this.style.removeProperty("--form-group-space");
    }

    if (alignY) {
      this.style.setProperty("--form-group-align-y", alignY);
    } else {
      this.style.removeProperty("--form-group-align-y");
    }

    if (headingSpace) {
      this.style.setProperty("--form-group-heading-space", headingSpace);
    } else {
      this.style.removeProperty("--form-group-heading-space");
    }
  }

  private getHeadingLevel() {
    const level = this.getAttribute("heading-level") || "5";
    return ["1", "2", "3", "4", "5", "6"].includes(level) ? level : "5";
  }
}

if (!customElements.get("mui-form-group")) {
  customElements.define("mui-form-group", MuiFormGroup);
}
