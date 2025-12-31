import { getPartMap } from "../../../utils/part-map";

class MuiVStack extends HTMLElement {
  static get observedAttributes() {
    return ["space", "alignx", "aligny"];
  }

  private space: string;
  private alignX: string;
  private alignY: string;
  private styles: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.space = `var(--space-500)`;
    this.alignX = `normal`; // justify-items
    this.alignY = `normal`; // align-items

    this.styles = /*css*/ `
      :host {
        display: block;
      }
      slot {
        display: grid;
        gap: var(--space);
        justify-items: var(--alignX);
        align-items: var(--alignY);
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
          --alignX: ${this.getAttribute("alignx") || this.alignX};
          --alignY: ${this.getAttribute("aligny") || this.alignY};
        ">
      </slot>
    `;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot");

    if (slot) {
      if (name === "space") slot.style.setProperty("--space", newValue || this.space);
      if (name === "alignx") slot.style.setProperty("--alignX", newValue || this.alignX);
      if (name === "aligny") slot.style.setProperty("--alignY", newValue || this.alignY);
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

if (!customElements.get("mui-v-stack")) {
  customElements.define("mui-v-stack", MuiVStack);
}
