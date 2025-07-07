import { getPartMap } from "../../utils/part-map";

/* Mui Button */
class MuiButton extends HTMLElement {
  static get observedAttributes() {
    return ["onclick", "type", "aria-label", "disabled", "variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await this.waitForPartMap();

    if (!this.shadowRoot) return;

    const partMap = getPartMap("text", "spacing", "layout", "visual");

    let html = /*html*/ `
    <style>


    :host {
      display: inline-block;
      width: auto;
      text-align: center;
    }
    button {
      vertical-align: baseline;
      border: none;
      cursor: pointer;
      width: 100%;
      border-radius: var(--action-radius);
      padding: var(--action-padding);
      text-decoration: none;
      line-height: var(--action-line-height);
      display: inherit;
      text-transform: none;
      overflow: visible;
      -webkit-appearance: button;
      font-family: var(--font-family);
      font-size: var(--action-font-size);
      font-weight: var(--action-font-weight);
      background: var(--action-primary-background);
      color: var(--action-primary-text-color);
      border: var(--action-primary-border);
      text-align: inherit;
    }

    // Turned back on for focus-visible
    button:focus-visible, button:active, button:hover { outline: var(--space-000); }

    button:hover {
      background: var(--action-primary-background-hover);
      color: var(--action-primary-text-color-hover);
    }

    button:focus-visible {
      background: var(--action-primary-background-focus);
      color: var(--action-primary-text-color-focus);
    }

    button:disabled {
      background: var(--action-primary-background-disabled);
      color: var(--action-primary-text-color-disabled);
    }

    button, button:before, button:after {box-sizing: border-box;}

    button:focus-visible {
      outline: var(--outline-thick);
    }

    /* Primary 
    ========================================= */
    :host([variant="primary"]) button {
      background: var(--action-primary-background);
      color: var(--action-primary-text-color);
      border: var(--action-primary-border);
    }

    :host([variant="primary"]) button:hover {
      background: var(--action-primary-background-hover);
      color: var(--action-primary-text-color-hover);
      border: var(--action-primary-border-hover);
    }

    :host([variant="primary"]) button:focus-visible {
      background: var(--action-primary-background-focus);
      color: var(--action-primary-text-color-focus);
      border: var(--action-primary-border-focus);
    }

    :host([variant="primary"]) button:disabled {
      background: var(--action-primary-background-disabled);
      color: var(--action-primary-text-color-disabled);
      border: var(--action-primary-border-disabled);
      cursor: not-allowed;
    }

    :host([variant="primary"]) ::slotted(.mui-icon) { fill: var(--action-primary-text-color); }
    :host([variant="primary"]):hover ::slotted(.mui-icon) { fill: var(--action-primary-text-color-hover); }
    :host([variant="primary"]):focus-visible ::slotted(.mui-icon) { fill: var(--action-primary-text-color-focus); }
    :host([variant="primary"]):disabled ::slotted(.mui-icon) { fill: var(--action-primary-text-color-disabled); }

    /* Secondary
    ========================================= */

    :host([variant="secondary"]) button {
      background: var(--action-secondary-background);
      color: var(--action-secondary-text-color);
      border: var(--action-secondary-border); 
    }

    :host([variant="secondary"]) button:hover {
      background: var(--action-secondary-background-hover);
      color: var(--action-secondary-text-color-hover);
      border: var(--action-secondary-border-hover); 
    }

    :host([variant="secondary"]) button:focus-visible {
      background: var(--action-secondary-background-focus);
      color: var(--action-secondary-text-color-focus);
      border: var(--action-secondary-border-focus); 
    }

    :host([variant="secondary"]) button:disabled {
      background: var(--action-secondary-background-disabled);
      color: var(--action-secondary-text-color-disabled);
      border: var(--action-secondary-border-disabled); 
      cursor: not-allowed;
    }

    :host([variant="secondary"]) ::slotted(.mui-icon) { fill: var(--action-secondary-text-color); }
    :host([variant="secondary"]):hover ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-hover); }
    :host([variant="secondary"]):focus-visible ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-focus); }
    :host([variant="secondary"]):disabled ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-disabled); }

    /* Tertiary
    ========================================= */

    :host([variant="tertiary"]) button {
      background: var(--action-tertiary-background);
      color: var(--action-tertiary-text-color);
      border: var(--action-tertiary-border);
    }

    :host([variant="tertiary"]) button:hover {
      background: var(--action-tertiary-background-hover);
      color: var(--action-tertiary-text-color-hover);
      border: var(--action-tertiary-border-hover);
    }

    :host([variant="tertiary"]) button:focus-visible {
      background: var(--action-tertiary-background-focus);
      color: var(--action-tertiary-text-color-focus);
      border: var(--action-tertiary-border-focus);
    }

    :host([variant="tertiary"]) button:disabled {
      background: var(--action-tertiary-background-disabled);
      color: var(--action-tertiary-text-color-disabled);
      border: var(--action-tertiary-border-disabled);
      cursor: not-allowed;
    }

    :host([variant="tertiary"]) ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color); }
    :host([variant="tertiary"]):hover ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-hover); }
    :host([variant="tertiary"]):focus-visible ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-focus); }
    :host([variant="tertiary"]):disabled ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-disabled); }

    /* Attention
    ========================================= */
    :host([variant="attention"]) button {
      background: var(--action-attention-background);
      color: var(--action-attention-text-color);
      border: var(--action-attention-border);
    }

    :host([variant="attention"]) button:hover {
      background: var(--action-attention-background-hover);
      color: var(--action-attention-text-color-hover);
      border: var(--action-attention-border-hover);
    }

    :host([variant="attention"]) button:focus-visible {
      background: var(--action-attention-background-focus);
      color: var(--action-attention-text-color-focus);
      border: var(--action-attention-border-focus);
    }

    :host([variant="attention"]) button:disabled {
      background: var(--action-attention-background-disabled);
      color: var(--action-attention-text-color-disabled);
      border: var(--action-attention-border-disabled);
      cursor: not-allowed;
    }

    :host([variant="attention"]) ::slotted(.mui-icon) { fill: var(--action-attention-text-color); }
    :host([variant="attention"]):hover ::slotted(.mui-icon) { fill: var(--action-attention-text-color-hover); }
    :host([variant="attention"]):focus-visible ::slotted(.mui-icon) { fill: var(--action-attention-text-color-focus); }
    :host([variant="attention"]):disabled ::slotted(.mui-icon) { fill: var(--action-attention-text-color-disabled); }

    /* Icon only
    ========================================= */
    :host([icon-only]) button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 44px;
      width: 44px;
      padding: var(--action-icon-only-padding);
    }
    /* ===================================== */


    /* ========================================================================== */
    /* STYLE ADJUSTMENTS WHEN BUTTON IS SLOTTED WITHIN INPUT                      */
    /* Related styles unique to this usage is found in the mui-input/index.js     */
    /* ========================================================================== */

    /* ========================================================================== */
    /* BEFORE: When a BUTTON has slot="before" applied to host for INPUT usage    */
    /* ========================================================================== */

        :host([slot="before"]) button {
          border: var(--border-thin);
          min-height: 4.4rem;
          background: var(--action-secondary-background);
          color: var(--action-secondary-text-color);
          border-color: var(--form-default-border-color);
          border-right: none;
          border-top-right-radius: var(--radius-000);
          border-bottom-right-radius: var(--radius-000);
        }

        :host([slot="before"]) button:hover {
          background: var(--action-secondary-background-hover);
          color: var(--action-secondary-text-color-hover);
          border-color: var(--form-default-border-color-hover);
        }

    /* ========================================================================== */
    /* AFTER: When a BUTTON has slot="after" applied to host for INPUT usage      */
    /* ========================================================================== */

        :host([slot="after"]) button {
          border: var(--border-thin);
          min-height: 4.4rem;
          background: var(--action-secondary-background);
          color: var(--action-secondary-text-color);
          border-color: var(--form-default-border-color);
          border-left: none;
          border-top-left-radius: var(--radius-000);
          border-bottom-left-radius: var(--radius-000);
        }

        :host([slot="after"]) button:hover,
        :host([slot="after"]) button:focus-visible {
          background: var(--action-secondary-background-hover);
          color: var(--action-secondary-text-color-hover);
          border-color: var(--form-default-border-color-hover);
        }

    /* ========================================================================== */


      :host(.alert-positive-slot) {
        --alert-text: var(--feedback-positive-text);
        --alert-icon: var(--feedback-positive-icon);
        --alert-bg-hover: var(--feedback-positive-action-background);
      }

      :host(.alert-info-slot) {
        --alert-text: var(--feedback-info-text);
        --alert-icon: var(--feedback-info-icon);
        --alert-bg-hover: var(--feedback-info-action-background);
      }

      :host(.alert-warning-slot) {
        --alert-text: var(--feedback-warning-text);
        --alert-icon: var(--feedback-warning-icon);
        --alert-bg-hover: var(--feedback-warning-action-background);
      }

      :host(.alert-attention-slot) {
        --alert-text: var(--feedback-attention-text);
        --alert-icon: var(--feedback-attention-icon);
        --alert-bg-hover: var(--feedback-attention-action-background);
      }

      :host(.alert-slot) button {
        font-weight: var(--font-weight-semi-bold);
        color: var(--alert-text);
      }

      :host(.alert-slot) button:hover,
      :host(.alert-slot) button:focus-visible {
        background: var(--alert-bg-hover);
        color: var(--alert-text);
      }

      :host(.alert-slot) ::slotted(.mui-icon),
      :host(.alert-slot):hover ::slotted(.mui-icon),
      :host(.alert-slot):focus-visible ::slotted(.mui-icon) {
        fill: var(--alert-icon);
      }


      /* Before & After Icon
      ========================================= */
      :host(.has-after) button,
      :host(.has-before) button,
      :host(.has-after.has-before) button { 
        display: grid; 
        align-items: center; 
        gap: var(--space-100);
      }
      
      :host(.has-after.has-before) button {
        grid-template-columns: auto 1fr auto;
        padding-right: var(--space-300);
        padding-left: var(--space-300);
      }

      :host(.has-after) button {
        grid-template-columns: 1fr auto;
        padding-right: var(--space-300);
        padding-left: var(--space-400);
      }

      :host(.has-before) button {
        grid-template-columns: auto 1fr;
        padding-right: var(--space-400);
        padding-left: var(--space-300);
      }

    </style>

    <button 
      part="${partMap}"
      onclick="${this.getAttribute("onclick")}" 
      type="${this.getAttribute("type") || "button"}" 
      aria-label="${this.getAttribute("aria-label") || ""}"
      ${this.hasAttribute("disabled") ? "disabled" : ""}
    >
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </button>

    `;

    this.shadowRoot.innerHTML = html;

    // Wait for slot content to be assigned
    await customElements.whenDefined("mui-button"); // optional, extra safety

    requestAnimationFrame(() => {
      const shadow = this.shadowRoot;
      if (!shadow) return;

      const slotDefault = shadow.querySelector("slot:not([name])") as HTMLSlotElement | null;
      const slotBefore = shadow.querySelector('slot[name="before"]') as HTMLSlotElement | null;
      const slotAfter = shadow.querySelector('slot[name="after"]') as HTMLSlotElement | null;

      const hasAssignedContent = (slot: HTMLSlotElement | null): boolean => {
        if (!slot) return false;
        return slot.assignedNodes({ flatten: true }).some((node: Node) => {
          return (
            node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim())
          );
        });
      };

      const hasBefore = hasAssignedContent(slotBefore);
      const hasAfter = hasAssignedContent(slotAfter);

      this.classList.toggle("has-before", hasBefore);
      this.classList.toggle("has-after", hasAfter);

      const assignedNodes = slotDefault?.assignedNodes({ flatten: true }) ?? [];

      const iconOnly = assignedNodes.every((node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          return el.tagName.toLowerCase() === "svg" || el.classList.contains("mui-icon");
        }
        return node.nodeType === Node.TEXT_NODE && !node.textContent?.trim();
      });

      if (iconOnly) {
        this.setAttribute("icon-only", "");
      } else {
        this.removeAttribute("icon-only");
      }
    });
  }

  waitForPartMap(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (typeof getPartMap === "function") return resolve();
      const check = () => {
        if (typeof getPartMap === "function") {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }
}

customElements.define("mui-button", MuiButton);
