import { getPartMap } from "../../utils/part-map";

/* Mui Link */
class MuiLink extends HTMLElement {
  static get observedAttributes() {
    return ["target", "href", "variant", "weight", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Set defaults
    const size = this.getAttribute("size") || "medium";
    const weight = this.getAttribute("weight") || "regular";
    this.setAttribute("size", size);
    this.setAttribute("weight", weight);
  }

  async connectedCallback() {
    if (!this.shadowRoot) return;
    await this.waitForPartMap();
    const partMap = getPartMap("text", "spacing", "layout", "visual");

    let html = /*html*/ `
    <style>

      :host { display: inline-flex; }

      a {
        color: var(--link-text-color-default);
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-sizing: border-box;
      }

      /* Turned back on for focus-visible */
      a:focus, a:active, a:hover { outline: var(--space-000); }
      a:hover { color: var(--link-text-color-default-hover); }
      a:focus { color: var(--link-text-color-default-focus); }
      a:disabled { color: var(--link-text-color-default-disabled); cursor: not-allowed; }
      a, a:before, a:after {box-sizing: border-box;}
      a:focus-visible { outline: var(--outline-thick); }

      :host([size="x-small"]) a {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
      }

      :host([size="small"]) a {
        font-size: var(--text-font-size-s); 
        line-height: var(--text-line-height-s);
      }

      :host([size="medium"]) a {
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
      }
      :host([size="large"]) a {
        font-size: var(--text-font-size-l); 
        line-height: var(--text-line-height-l);
      }

      :host([weight="regular"]) a { font-weight: var(--font-weight-regular); }
      :host([weight="medium"]) a { font-weight: var(--font-weight-medium); }
      :host([weight="bold"]) a { font-weight: var(--font-weight-bold); }



      /* Button  
      ========================================= */

      :host([variant="primary"]) a,
      :host([variant="secondary"]) a,
      :host([variant="tertiary"]) a,
      :host([variant="attention"]) a {
        display: inline-block;
        text-decoration: none;
        padding: var(--space-200) var(--space-500);
        border-radius: var(--action-radius);
        font-size: var(--action-font-size);
        font-weight: var(--action-font-weight);
        line-height: var(--action-line-height);
      }

      :host([variant="primary"]),
      :host([variant="secondary"])
      :host([variant="tertiary"]),
      :host([variant="attention"]) { display: inline-block; }

      /* Button Primary 
      ========================================= */

      :host([variant="primary"]) a {
        background: var(--action-primary-background);
        color: var(--action-primary-text-color);
        border: var(--action-primary-stroke);
      }

      :host([variant="primary"]) a:hover {
        background: var(--action-primary-background-hover);
        color: var(--action-primary-text-color-hover);
        border: var(--action-primary-stroke-hover);
      }

      :host([variant="primary"]) a:focus,
      :host([variant="tertiary"]) a:focus-visible {
        background: var(--action-primary-background-focus); 
        color: var(--action-primary-text-color-focus);
        border: var(--action-primary-stroke-focus);
      }

      :host([variant="primary"]) a:disabled {
        background: var(--action-primary-background-disabled); 
        color: var(--action-primary-text-color-disabled);
        border: var(--action-primary-stroke-disabled);
        cursor: not-allowed;
      }

      :host([variant="primary"]) a ::slotted(.mui-icon) { fill: var(--action-primary-text-color); }
      :host([variant="primary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-primary-text-color-hover); }
      :host([variant="primary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-primary-text-color-focus); }
      :host([variant="primary"]) a:disabled ::slotted(.mui-icon) { fill: var(--action-primary-text-color-disabled); }

      /* Button Secondary 
      ========================================= */
      :host([variant="secondary"]) a {
        background: var(--action-secondary-background);
        color: var(--action-secondary-text-color);
        border: var(--action-secondary-stroke); 
      }

      :host([variant="secondary"]) a:hover {
        background: var(--action-secondary-background-hover);
        color: var(--action-secondary-text-color-hover);
        border: var(--action-secondary-stroke-hover); 
      }

      :host([variant="secondary"]) a:focus,
      :host([variant="secondary"]) a:focus-visible {
        background: var(--action-secondary-background-focus);
        color: var(--action-secondary-text-color-focus);
        border: var(--action-secondary-stroke-focus); 
      }

      :host([variant="secondary"]) a:disabled {
        background: var(--action-secondary-background-disabled);
        color: var(--action-secondary-text-color-disabled);
        border: var(--action-secondary-stroke-disabled); 
        cursor: not-allowed;
      }

      :host([variant="secondary"]) a ::slotted(.mui-icon) { fill: var(--action-secondary-text-color); }
      :host([variant="secondary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-hover); }
      :host([variant="secondary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-focus); }
      :host([variant="secondary"]) a:disabled ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-disabled); }

      /* Button Tertiary
      ========================================= */
      :host([variant="tertiary"]) a {
        background: var(--action-tertiary-background);
        color: var(--action-tertiary-text-color);
        border: var(--action-tertiary-stroke);
      }

      :host([variant="tertiary"]) a:hover {
        color: var(--action-tertiary-text-color-hover);
        background: var(--action-tertiary-background-hover);
        border: var(--action-tertiary-stroke-hover);
      }

      :host([variant="tertiary"]) a:focus,
      :host([variant="tertiary"]) a:focus-visible {
        color: var(--action-tertiary-text-color-focus);
        background: var(--action-tertiary-background-focus); 
        border: var(--action-tertiary-stroke-focus);
      }

      :host([variant="tertiary"]) a:disabled {
        background: var(--action-tertiary-background-disabled);
        color: var(--action-tertiary-text-color-disabled);
        border: var(--action-tertiary-stroke-disabled);
        cursor: not-allowed;
      }

      :host([variant="tertiary"]) a ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color); }
      :host([variant="tertiary"]) a:hover ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-hover); }
      :host([variant="tertiary"]) a:focus ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-focus); }
      :host([variant="tertiary"]) a:disabled ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-disabled); }

      /* Button Attention
      ========================================= */
      :host([variant="attention"]) a {
        background: var(--action-attention-background);
        color: var(--action-attention-text-color);
        border: var(--action-attention-stroke);
      }

      :host([variant="attention"]) a:hover {
        background: var(--action-attention-background-hover);
        color: var(--action-attention-text-color-hover);
        border: var(--action-attention-stroke-hover);
      }

      :host([variant="attention"]) a:focus,
      :host([variant="attention"]) a:focus-visible  {
        background: var(--action-attention-background-focus);
        color: var(--action-attention-text-color-focus);
        border: var(--action-attention-stroke-focus);
      }

      :host([variant="attention"]) a:disabled {
        background: var(--action-attention-background-disabled);
        color: var(--action-attention-text-color-disabled);
        border: var(--action-attention-stroke-disabled);
        cursor: not-allowed;
      }

      :host([variant="attention"]) a ::slotted(.mui-icon) { fill: var(--action-attention-text-color); }
      :host([variant="attention"]) a:hover ::slotted(.mui-icon) { fill: var(--action-attention-text-color-hover); }
      :host([variant="attention"]) a:focus ::slotted(.mui-icon) { fill: var(--action-attention-text-color-focus); }
      :host([variant="attention"]) a:disabled ::slotted(.mui-icon) { fill: var(--action-attention-text-color-disabled); }

      /* Icon only
      ========================================= */
      :host([icon-only]) a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        width: 44px;
        padding: var(--action-icon-only-padding);
      }
      /* ===================================== */


    </style>

    <a
      part="${partMap}" 
      target="${this.getAttribute("target") || "_self"}" 
      href="${this.getAttribute("href") || "#"}"
      >
      <slot></slot>
    </a>
    `;

    this.shadowRoot.innerHTML = html;

    // Wait for slot content to be assigned
    await customElements.whenDefined("mui-link"); // optional, extra safety

    requestAnimationFrame(() => {
      const slot = this.shadowRoot?.querySelector("slot");
      const assignedNodes = slot?.assignedNodes({ flatten: true }) || [];

      const iconOnly = assignedNodes.every((node) => {
        // check if it's an svg or an element with .mui-icon
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          return el.tagName.toLowerCase() === "svg" || el.classList.contains("mui-icon");
        }
        // Ignore text nodes (e.g. whitespace)
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

customElements.define("mui-link", MuiLink);
