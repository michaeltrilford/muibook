import { getPartMap } from "../../utils/part-map";
import "../mui-stack/hstack";

class MuiContextBar extends HTMLElement {
  private contentSlotEl: HTMLSlotElement | null = null;
  private bodyEls = new Set<HTMLElement>();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindSlots();
  }

  disconnectedCallback() {
    this.clearGeneratedTruncation();
    this.contentSlotEl?.removeEventListener("slotchange", this.onContentSlotChange);
    this.contentSlotEl = null;
  }

  private onContentSlotChange = () => {
    this.syncBodyTruncation();
  };

  private bindSlots() {
    if (!this.shadowRoot) return;
    this.contentSlotEl = this.shadowRoot.querySelector("slot:not([name])") as HTMLSlotElement | null;
    this.contentSlotEl?.addEventListener("slotchange", this.onContentSlotChange);
    this.syncBodyTruncation();
  }

  private clearGeneratedTruncation() {
    this.bodyEls.forEach((el) => {
      if (el.getAttribute("data-context-bar-truncate") === "true") {
        el.removeAttribute("truncate");
        el.removeAttribute("data-context-bar-truncate");
      }
    });
    this.bodyEls.clear();
  }

  private syncBodyTruncation() {
    this.clearGeneratedTruncation();
    const assigned = (this.contentSlotEl?.assignedElements({ flatten: false }) || []) as HTMLElement[];

    assigned.forEach((el) => {
      if (!(el instanceof HTMLElement)) return;

      // Only truncate the slotted element itself if it's a mui-body.
      // Deeply querying for all mui-body descendants breaks layouts (like h-stack).
      const bodyEls = el.tagName.toLowerCase() === "mui-body" ? [el] : [];

      bodyEls.forEach((bodyEl) => {
        this.bodyEls.add(bodyEl);
        if (bodyEl.hasAttribute("truncate")) return;
        bodyEl.setAttribute("truncate", "");
        bodyEl.setAttribute("data-context-bar-truncate", "true");
      });
    });
  }

  render() {
    if (!this.shadowRoot) return;

    const contextPartMap = getPartMap("spacing", "layout", "visual");
    const summaryPartMap = getPartMap("spacing", "layout");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          min-width: 0;
          max-width: 100%;
        }
        .context {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: var(--space-300);
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding-inline-start: var(--space-400);
          padding-inline-end: var(--space-200);
          padding-block: var(--space-200);
          border: var(--border-thin);
          border-bottom: 0;
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-200) var(--radius-200) 0 0;
          background: var(--surface-elevated-100);
        }
        .summary {
          display: block;
          min-width: 0;
          max-width: 100%;
        }
        .summary slot {
          display: block;
          min-width: 0;
          max-width: 100%;
        }
        .summary ::slotted(*) {
          min-width: 0;
          max-width: 100%;
        }
        .actions {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          min-width: 0;
        }
        .actions::part(display) {
          display: inline-flex;
        }
      </style>

      <div class="context" part="${contextPartMap}">
        <div class="summary" part="${summaryPartMap}">
          <slot></slot>
        </div>
        <mui-h-stack class="actions" space="var(--space-000)" alignY="center">
          <slot name="actions"></slot>
        </mui-h-stack>
      </div>
    `;
  }
}

if (!customElements.get("mui-context-bar")) {
  customElements.define("mui-context-bar", MuiContextBar);
}
