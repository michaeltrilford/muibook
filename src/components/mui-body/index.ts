import { getPartMap } from "../../utils/part-map";

class MuiBody extends HTMLElement {
  static get observedAttributes() {
    return ["size", "weight", "variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const size = this.getAttribute("size") || "medium";
    const weight = this.getAttribute("weight") || "regular";
    const variant = this.getAttribute("variant") || "default";

    this.setAttribute("size", size);
    this.setAttribute("variant", variant);
    this.setAttribute("weight", weight);
  }

  async connectedCallback() {
    await this.waitForPartMap();
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue && this.shadowRoot) {
      this.render();
    }
  }

  render() {
    const root = this.shadowRoot;
    if (!root || root.children.length > 0) return;

    const partMap = getPartMap("spacing", "layout", "visual");

    root.innerHTML = /*html*/ `
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
