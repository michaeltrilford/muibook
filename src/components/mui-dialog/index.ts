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
      dialog {
        border: none;
        width: ${width};
        max-width: 90vw;
        padding: 0;
        overflow: hidden;
        border-radius: var(--dialog-radius);
        background: var(--surface-elevated-100);
      }

      dialog,
      dialog:focus,
      dialog:focus-visible {
       outline: none;
      }

      dialog::backdrop {
        background: var(--dialog-backdrop);
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-400) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
      }

      main {
        max-height: 60vh;
        overflow-y: auto;
        padding: var(--space-500);
      }

      footer {
        display: flex;
        justify-content: flex-end;
        padding: var(--space-400) var(--space-500);
        border-top: var(--border-thin);
        gap: var(--space-300);
      }

      footer[hidden] {
        display: none !important;
      }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <dialog>
        <header>
          <slot name="title"></slot>
          <mui-button class="close" aria-label="Close" variant="tertiary"><mui-icon-close></mui-icon-close></mui-button>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer hidden>
          <slot name="actions"></slot>
        </footer>
      </dialog>
    `;

    this.dialogEl = this.shadowRoot.querySelector("dialog")!;
    this.footerEl = this.shadowRoot.querySelector("footer");
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
  }

  close() {
    this.removeAttribute("open");
  }
}

if (!customElements.get("mui-dialog")) {
  customElements.define("mui-dialog", MuiDialog);
}
