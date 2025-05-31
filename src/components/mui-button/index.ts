import { getPartMap } from "../../utils/part-map";

/* Mui Button */
class muiButton extends HTMLElement {
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
    }
    button {
      vertical-align: baseline;
      border: none;
      cursor: pointer;
      width: auto;
      border-radius: var(--action-radius);
      padding: var(--action-padding);
      text-decoration: none;
      line-height: var(--action-line-height);
      display: inline-block;
      text-transform: none;
      overflow: visible;
      -webkit-appearance: button;
      font-family: var(--font-family);
      font-size: var(--action-font-size);
      font-weight: var(--action-font-weight);
      background: var(--action-primary-background);
      color: var(--action-primary-text-color);
      border: var(--action-primary-stroke); 
    }

    // Turned back on for focus-visible
    button:focus, button:active, button:hover { outline: var(--space-000); }

    button:hover {
      background: var(--action-primary-background-hover);
      color: var(--action-primary-text-color-hover);
    }

    button:focus {
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
      border: var(--action-primary-stroke);
    }

    :host([variant="primary"]) button:hover {
      background: var(--action-primary-background-hover);
      color: var(--action-primary-text-color-hover);
      border: var(--action-primary-stroke-hover);
    }

    :host([variant="primary"]) button:focus {
      background: var(--action-primary-background-focus);
      color: var(--action-primary-text-color-focus);
      border: var(--action-primary-stroke-focus);
    }

    :host([variant="primary"]) button:disabled {
      background: var(--action-primary-background-disabled);
      color: var(--action-primary-text-color-disabled);
      border: var(--action-primary-stroke-disabled);
      cursor: not-allowed;
    }

    :host([variant="primary"]) button ::slotted(.mui-icon) { fill: var(--action-primary-text-color); }
    :host([variant="primary"]) button:hover ::slotted(.mui-icon) { fill: var(--action-primary-text-color-hover); }
    :host([variant="primary"]) button:focus ::slotted(.mui-icon) { fill: var(--action-primary-text-color-focus); }
    :host([variant="primary"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-primary-text-color-disabled); }

    /* Secondary
    ========================================= */

    :host([variant="secondary"]) button {
      background: var(--action-secondary-background);
      color: var(--action-secondary-text-color);
      border: var(--action-secondary-stroke); 
    }

    :host([variant="secondary"]) button:hover {
      background: var(--action-secondary-background-hover);
      color: var(--action-secondary-text-color-hover);
      border: var(--action-secondary-stroke-hover); 
    }

    :host([variant="secondary"]) button:focus {
      background: var(--action-secondary-background-focus);
      color: var(--action-secondary-text-color-focus);
      border: var(--action-secondary-stroke-focus); 
    }

    :host([variant="secondary"]) button:disabled {
      background: var(--action-secondary-background-disabled);
      color: var(--action-secondary-text-color-disabled);
      border: var(--action-secondary-stroke-disabled); 
      cursor: not-allowed;
    }

    :host([variant="secondary"]) button ::slotted(.mui-icon) { fill: var(--action-secondary-text-color); }
    :host([variant="secondary"]) button:hover ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-hover); }
    :host([variant="secondary"]) button:focus ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-focus); }
    :host([variant="secondary"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-disabled); }

    /* Tertiary
    ========================================= */

    :host([variant="tertiary"]) button {
      background: var(--action-tertiary-background);
      color: var(--action-tertiary-text-color);
      border: var(--action-tertiary-stroke);
    }

    :host([variant="tertiary"]) button:hover {
      background: var(--action-tertiary-background-hover);
      color: var(--action-tertiary-text-color-hover);
      border: var(--action-tertiary-stroke-hover);
    }

    :host([variant="tertiary"]) button:focus {
      background: var(--action-tertiary-background-focus);
      color: var(--action-tertiary-text-color-focus);
      border: var(--action-tertiary-stroke-focus);
    }

    :host([variant="tertiary"]) button:disabled {
      background: var(--action-tertiary-background-disabled);
      color: var(--action-tertiary-text-color-disabled);
      border: var(--action-tertiary-stroke-disabled);
      cursor: not-allowed;
    }

    :host([variant="tertiary"]) button ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color); }
    :host([variant="tertiary"]) button:hover ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-hover); }
    :host([variant="tertiary"]) button:focus ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-focus); }
    :host([variant="tertiary"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-disabled); }

    /* Attention
    ========================================= */
    :host([variant="attention"]) button {
      background: var(--action-attention-background);
      color: var(--action-attention-text-color);
      border: var(--action-attention-stroke);
    }

    :host([variant="attention"]) button:hover {
      background: var(--action-attention-background-hover);
      color: var(--action-attention-text-color-hover);
      border: var(--action-attention-stroke-hover);
    }

    :host([variant="attention"]) button:focus {
      background: var(--action-attention-background-focus);
      color: var(--action-attention-text-color-focus);
      border: var(--action-attention-stroke-focus);
    }

    :host([variant="attention"]) button:disabled {
      background: var(--action-attention-background-disabled);
      color: var(--action-attention-text-color-disabled);
      border: var(--action-attention-stroke-disabled);
      cursor: not-allowed;
    }

    :host([variant="attention"]) button ::slotted(.mui-icon) { fill: var(--action-attention-text-color); }
    :host([variant="attention"]) button:hover ::slotted(.mui-icon) { fill: var(--action-attention-text-color-hover); }
    :host([variant="attention"]) button:focus ::slotted(.mui-icon) { fill: var(--action-attention-text-color-focus); }
    :host([variant="attention"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-attention-text-color-disabled); }

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
        :host([slot="after"]) button:focus {
          background: var(--action-secondary-background-hover);
          color: var(--action-secondary-text-color-hover);
          border-color: var(--form-default-border-color-hover);
        }

    /* ========================================================================== */


    </style>

    <button 
      part="${partMap}"
      onclick="${this.getAttribute("onclick")}" 
      type="${this.getAttribute("type") || "button"}" 
      aria-label="${this.getAttribute("aria-label") || ""}"
      ${this.hasAttribute("disabled") ? "disabled" : ""}
    >
      <slot></slot>
    </button>

    `;

    this.shadowRoot.innerHTML = html;
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

customElements.define("mui-button", muiButton);
