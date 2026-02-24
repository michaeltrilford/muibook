import "../mui-heading";
import "../mui-body";

class MuiFormGroup extends HTMLElement {
  static get observedAttributes() {
    return ["heading", "hide-label", "variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupSlotBehavior();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const heading = this.getAttribute("heading") || "";
    const hideLabel = this.hasAttribute("hide-label");
    const isChoiceGroup = this.hasAttribute("choice-group");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }
        .group {
          display: grid;
          gap: var(--space-500);
        }
        .group-heading {
          display: block;
          margin: 0;
        }
        .group-label {
          display: inline-flex;
          margin: 0;
        }
        .content {
          display: grid;
          gap: var(--space-500);
          min-inline-size: 0;
        }
        .content-inner {
          display: contents;
        }
        :host([variant="horizontal"]) .content {
          grid-template-columns: var(--form-group-horizontal-template, minmax(0, 1fr) minmax(0, 20rem));
          align-items: start;
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
              : `<mui-heading class="group-heading" size="5" level="5">${heading}</mui-heading>`
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

  private setupSlotBehavior() {
    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot");
    if (!slot) return;

    const update = () => {
      const slotted = (slot as HTMLSlotElement).assignedElements({ flatten: true });
      const choiceSelector = "mui-radio-group, mui-radio, mui-checkbox, mui-switch";
      const hasChoiceControls = slotted.some((el) => {
        const tag = el.tagName.toLowerCase();
        if (tag === "mui-radio-group" || tag === "mui-radio" || tag === "mui-checkbox" || tag === "mui-switch") {
          return true;
        }
        return Boolean(el.querySelector?.(choiceSelector));
      });

      if (hasChoiceControls && !this.hasAttribute("choice-group")) {
        this.setAttribute("choice-group", "");
        this.render();
      } else if (!hasChoiceControls && this.hasAttribute("choice-group")) {
        this.removeAttribute("choice-group");
        this.render();
      }
    };

    slot.addEventListener("slotchange", update);
    update();
  }
}

if (!customElements.get("mui-form-group")) {
  customElements.define("mui-form-group", MuiFormGroup);
}
