import { getPartMap } from "../../../utils/part-map";

/* Mui H Stack */
class MuiHStack extends HTMLElement {
  static get observedAttributes() {
    return ["space", "alignY", "alignX"];
  }

  private space: string;
  private alignX: string;
  private alignY: string;
  private styles: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.space = `var(--space-500)`;
    this.alignY = `flex-start`;
    this.alignX = `flex-start`;

    this.styles = /*css*/ `
      :host {
        display: block;
      }
      slot {
        display: flex;
        gap: var(--space);
        align-items: var(--alignY);
        justify-content: var(--alignX);
      }
    `;
  }

  async connectedCallback() {
    if (!this.shadowRoot) return;
    await this.waitForPartMap();

    const partMap = getPartMap("spacing", "layout", "visual");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${this.styles}</style>
      <slot 
        part="${partMap}" 
        style="
          --space: ${this.getAttribute("space") || this.space};
          --alignY: ${this.getAttribute("alignY") || this.alignY};
          --alignX: ${this.getAttribute("alignX") || this.alignX};
        ">
      </slot>
    `;
  }

  attributeChangedCallback(name: string, newValue: string | null) {
    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot");

    if (slot) {
      if (name === "space") slot.style.setProperty("--space", newValue || this.space);
      if (name === "alignY") slot.style.setProperty("--alignY", newValue || this.alignY);
      if (name === "alignX") slot.style.setProperty("--alignX", newValue || this.alignX);
    }
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

customElements.define("mui-h-stack", MuiHStack);
