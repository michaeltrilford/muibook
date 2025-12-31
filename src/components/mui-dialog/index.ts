import "../mui-icons/close";
import "../mui-button";

class MuiDialog extends HTMLElement {
  private dialogEl!: HTMLDialogElement;
  private footerEl!: HTMLElement | null;
  private actionsSlot!: HTMLSlotElement | null;

  static get observedAttributes() {
    return ["open", "width"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    const width = this.getAttribute("width") || "350px";

    const styles = /*css*/ `
      :host {
        display: contents;
      }

      dialog {
        border: none;
        width: ${width};
        max-width: 90vw;
        padding: 0;
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
        justify-content: space-between;
        align-items: center;
        padding: var(--space-400) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
      }

      .content {
        max-height: 60vh;
        overflow-y: auto;
        padding: var(--space-500);
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
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <dialog>
        <div class="header">
          <slot name="title"></slot>
          <mui-button class="close" aria-label="Close" variant="tertiary"><mui-icon-close size="medium"></mui-icon-close></mui-button>
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
    this.updateFooterVisibility();

    this.syncOpenState();
  }

  private updateFooterVisibility() {
    if (!this.footerEl || !this.actionsSlot) return;
    const hasActions = this.actionsSlot.assignedElements().length > 0;
    this.footerEl.hidden = !hasActions;
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    if (name === "open") this.syncOpenState();
    if (name === "width" && this.dialogEl) {
      this.dialogEl.style.width = value || "350px";
    }
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
