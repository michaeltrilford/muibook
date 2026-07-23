import "../mui-icons/close";
import "../mui-button";
import { applySurfaceUsage } from "../../utils/surface-usage";

class MuiDialog extends HTMLElement {
  private dialogEl!: HTMLDialogElement;
  private footerEl!: HTMLElement | null;
  private actionsSlot!: HTMLSlotElement | null;
  private headerEl!: HTMLElement | null;
  private titleSlot!: HTMLSlotElement | null;

  static get observedAttributes() {
    return ["open", "width", "content-max-height", "close-size", "hide-header"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  private getCloseSize(): "x-small" | "small" | "medium" | "large" {
    const closeSize = this.getAttribute("close-size");
    return closeSize && ["x-small", "small", "medium", "large"].includes(closeSize)
      ? (closeSize as "x-small" | "small" | "medium" | "large")
      : "medium";
  }

  private getCloseButtonSize(): "x-small" | "small" | "medium" {
    const closeSize = this.getCloseSize();
    if (closeSize === "large") return "medium";
    if (closeSize === "medium") return "small";
    return closeSize;
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    const width = this.getAttribute("width") || "350px";
    const closeSize = this.getCloseSize();
    const closeButtonSize = this.getCloseButtonSize();

    const styles = /*css*/ `
      :host {
        display: contents;
      }

      dialog {
        border: var(--dialog-border);
        width: ${width};
        max-width: 90vw;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: var(--dialog-radius);
        background: var(--dialog-background);
      }

      dialog,
      dialog:focus,
      dialog:focus-visible {
       outline: none;
      }

      dialog::backdrop {
        background: var(--backdrop-overlay);
      }

      .header {
        display: flex;
        min-height: var(--header-min-height-${closeSize});
        justify-content: space-between;
        align-items: center;
        padding: var(--space-400) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
        box-sizing: border-box;
      }

      .content {
        max-height: 60vh;
        overflow-y: auto;
        padding: var(--space-500);
      }

      :host([content-max-height="none"]) .content {
        max-height: none;
        overflow-y: visible;
      }

      :host([content-padding="none"]) .content {
        padding: var(--space-000);
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        padding: var(--space-400) var(--space-500);
        border-top: var(--border-thin);
        gap: var(--space-300);
      }

      .actions[hidden] {
        display: none !important;
      }

      .header[hidden] {
        display: none !important;
      }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <dialog>
        <div class="header">
          <slot name="title"></slot>
          <mui-button class="close" aria-label="Close" variant="tertiary" size="${closeButtonSize}"><mui-icon-close size="${closeSize}"></mui-icon-close></mui-button>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="actions" hidden>
          <slot name="actions"></slot>
        </div>
      </dialog>
    `;

    this.dialogEl = this.shadowRoot.querySelector("dialog")!;
    this.footerEl = this.shadowRoot.querySelector(".actions");
    this.actionsSlot = this.shadowRoot.querySelector('slot[name="actions"]');
    this.headerEl = this.shadowRoot.querySelector(".header");
    this.titleSlot = this.shadowRoot.querySelector('slot[name="title"]');

    applySurfaceUsage(this);

    const closeBtn = this.shadowRoot.querySelector(".close");
    closeBtn?.addEventListener("click", () => this.close());

    // Backdrop click logic
    this.dialogEl.addEventListener("click", (event) => {
      const rect = this.dialogEl.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        this.close();
      }
    });

    // Show/hide footer depending on slot content
    this.actionsSlot?.addEventListener("slotchange", () => this.updateFooterVisibility());
    this.titleSlot?.addEventListener("slotchange", () => this.updateHeaderVisibility());
    this.updateHeaderVisibility();
    this.updateFooterVisibility();

    this.syncOpenState();
  }

  private updateHeaderVisibility() {
    if (!this.headerEl || !this.titleSlot) return;
    const hasTitle = !this.hasAttribute("hide-header") && this.slotHasAssignedContent(this.titleSlot);
    this.headerEl.hidden = !hasTitle;
    this.toggleAttribute("has-header", hasTitle);
  }

  private updateFooterVisibility() {
    if (!this.footerEl || !this.actionsSlot) return;
    const hasActions = this.slotHasAssignedContent(this.actionsSlot);
    this.footerEl.hidden = !hasActions;
  }

  private slotHasAssignedContent(slot: HTMLSlotElement): boolean {
    return slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return false;
      }
      const element = node as HTMLElement;
      return !element.hidden && element.getAttribute("aria-hidden") !== "true";
    });
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    if (name === "open") this.syncOpenState();
    if (name === "width" && this.dialogEl) {
      this.dialogEl.style.width = value || "350px";
    }
    if (name === "close-size" && this.shadowRoot) {
      const closeSize = this.getCloseSize();
      this.shadowRoot.querySelector(".header")?.setAttribute("style", `min-height: var(--header-min-height-${closeSize})`);
      this.shadowRoot.querySelector(".close")?.setAttribute("size", this.getCloseButtonSize());
      this.shadowRoot.querySelector("mui-icon-close")?.setAttribute("size", closeSize);
    }
    if (name === "hide-header") this.updateHeaderVisibility();
  }

  private syncOpenState() {
    if (!this.dialogEl) return;

    if (this.hasAttribute("open")) {
      if (!this.dialogEl.open) {
        this.dialogEl.showModal();
      }
    } else {
      if (this.dialogEl.open) {
        this.dialogEl.close();
      }
    }
  }

  open() {
    this.setAttribute("open", "");
    this.dispatchEvent(new CustomEvent("mui-dialog-open", { bubbles: true, composed: true }));
  }

  close() {
    this.removeAttribute("open");
    this.dispatchEvent(new CustomEvent("mui-dialog-close", { bubbles: true, composed: true }));
  }
}

if (!customElements.get("mui-dialog")) {
  customElements.define("mui-dialog", MuiDialog);
}
