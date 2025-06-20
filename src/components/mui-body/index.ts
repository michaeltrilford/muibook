import { getPartMap } from "../../utils/part-map";

class MuiBody extends HTMLElement {
  static get observedAttributes() {
    return ["size", "weight", "variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    if (!this.hasAttribute("weight")) this.setAttribute("weight", "regular");
    if (!this.hasAttribute("variant")) this.setAttribute("variant", "default");

    await this.waitForPartMap();
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue && this.shadowRoot) {
      this.render();
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const partMap = getPartMap("spacing", "layout", "visual");

    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      :host { display: block; }

      :host p {
        color: var(--text-color);
        margin: var(--space-000);
        display: block;
        width: 100%;
      }

      :host([size="x-small"]) p {
        font-size: var(--text-font-size-xs);
        line-height: var(--text-line-height-xs);
      }

      :host([size="small"]) p {
        font-size: var(--text-font-size-s); 
        line-height: var(--text-line-height-s);
      }

      :host([size="medium"]) p {
        font-size: var(--text-font-size-m);
        line-height: var(--text-line-height-m);
      }

      :host([size="large"]) p {
        font-size: var(--text-font-size-l); 
        line-height: var(--text-line-height-l);
      }

      :host([weight="regular"]) p { font-weight: var(--font-weight-regular); }
      :host([weight="medium"]) p { font-weight: var(--font-weight-medium); }
      :host([weight="bold"]) p { font-weight: var(--font-weight-bold); }

      /* Variant */
      :host([variant="default"]) p {
        color: var(--text-color);
      }
      :host([variant="success"]) p {
        color: var(--text-color-success);
      }
      :host([variant="warning"]) p {
        color: var(--text-color-warning);
      }
      :host([variant="error"]) p {
        color: var(--text-color-error);
      }

      :host([variant="default"]) ::slotted(.mui-icon) {
        fill: var(--text-color);
      }
      :host([variant="success"]) ::slotted(.mui-icon) {
        fill: var(--text-color-success);
      }
      :host([variant="warning"]) ::slotted(.mui-icon) {
        fill: var(--text-color-warning);
      }
      :host([variant="error"]) ::slotted(.mui-icon) {
        fill: var(--text-color-error);
      }

    </style>
    
    <p part="${partMap}"><slot></slot></p>
    `;
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

customElements.define("mui-body", MuiBody);
