import { getPartMap } from "../../../utils/part-map";

class MuiVStack extends HTMLElement {
  static get observedAttributes() {
    return ["space", "alignx", "aligny", "padding", "height", "width", "viewport", "fill"];
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
        --stack-height: auto;
        --stack-width: auto;
        height: var(--stack-height);
        width: var(--stack-width);
      }
      :host([fill]) {
        --stack-height: 100%;
        --stack-width: 100%;
      }
      :host([viewport]) {
        --stack-height: 100dvh;
      }
      slot {
        display: grid;
        box-sizing: border-box;
        height: auto;
        width: auto;
        gap: var(--space);
        padding: var(--padding);
        justify-items: var(--alignX);
        align-items: var(--alignY);
      }
      :host([height]) slot,
      :host([viewport]) slot,
      :host([fill]) slot {
        height: 100%;
      }
      :host([width]) slot,
      :host([fill]) slot {
        width: 100%;
      }
    `;
  }

  async connectedCallback() {
    if (!this.shadowRoot) return;
    await this.waitForPartMap();
    this.syncDimensions();

    const partMap = getPartMap("spacing", "layout", "visual");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${this.styles}</style>
      <slot 
        part="${partMap}" 
        style="
          --space: ${this.getAttribute("space") || this.space};
          --padding: ${this.getAttribute("padding") || "var(--space-000)"};
          --alignX: ${this.getAttribute("alignx") || this.alignX};
          --alignY: ${this.getAttribute("aligny") || this.alignY};
        ">
      </slot>
    `;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === "height" || name === "width") {
      this.syncDimensions();
    }

    if (!this.shadowRoot) return;
    const slot = this.shadowRoot.querySelector("slot");

    if (slot) {
      if (name === "space") slot.style.setProperty("--space", newValue || this.space);
      if (name === "padding") slot.style.setProperty("--padding", newValue || "var(--space-000)");
      if (name === "alignx") slot.style.setProperty("--alignX", newValue || this.alignX);
      if (name === "aligny") slot.style.setProperty("--alignY", newValue || this.alignY);
    }
  }

  private syncDimensions() {
    const height = this.getAttribute("height");
    const width = this.getAttribute("width");

    if (height) {
      this.style.setProperty("--stack-height", height);
    } else {
      this.style.removeProperty("--stack-height");
    }

    if (width) {
      this.style.setProperty("--stack-width", width);
    } else {
      this.style.removeProperty("--stack-width");
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
