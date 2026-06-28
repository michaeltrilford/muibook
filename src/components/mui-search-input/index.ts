import "../mui-button";
import "../mui-icons/search";
import "../mui-input";

class MuiSearchInput extends HTMLElement {
  static get observedAttributes() {
    return ["id", "label", "placeholder", "value", "name", "size", "disabled", "open", "autofocus", "cancel-label"];
  }

  private slotChangeHandler = () => this.syncAfterSlotState();
  private actionSlotChangeHandler = () => {
    this.syncAction();
    this.syncOpenState();
  };
  private animationFrame = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  set value(next: string) {
    this.setAttribute("value", next ?? "");
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(next: boolean) {
    if (next) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    if (!this.hasAttribute("label")) this.setAttribute("label", "Search");
    if (!this.hasAttribute("placeholder")) this.setAttribute("placeholder", "Search...");
    this.render();
    this.setupListeners();
    this.syncAfterSlotState();
    this.queueAutofocus();
  }

  disconnectedCallback() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === "value") {
      const input = this.inputEl;
      if (input && input.getAttribute("value") !== (newValue || "")) {
        input.setAttribute("value", newValue || "");
      }
      return;
    }

    if (name === "open") {
      this.syncOpenState(true);
      if (newValue !== null) this.queueAutofocus();
      return;
    }

    this.render();
    this.setupListeners();
    this.syncAfterSlotState();
    this.queueAutofocus();
  }

  focus(options?: FocusOptions) {
    this.inputEl?.focus(options);
  }

  openSearch() {
    this.open = true;
  }

  closeSearch() {
    this.open = false;
  }

  toggleSearch() {
    this.open = !this.open;
  }

  private get inputEl() {
    return this.shadowRoot?.querySelector("mui-input") as HTMLElement | null;
  }

  private get actionEl() {
    const actionSlot = this.shadowRoot?.querySelector('slot[name="action"]') as HTMLSlotElement | null;
    const assignedAction = actionSlot
      ?.assignedElements({ flatten: true })
      .find((element) => element instanceof HTMLElement) as HTMLElement | undefined;

    return assignedAction || (this.shadowRoot?.querySelector(".search-trigger") as HTMLElement | null);
  }

  private syncAction() {
    const trigger = this.actionEl;
    if (!trigger) return;

    trigger.classList.add("search-trigger");
    trigger.setAttribute("aria-expanded", this.open ? "true" : "false");
    if (!trigger.hasAttribute("aria-label") && !trigger.textContent?.trim()) {
      trigger.setAttribute("aria-label", "Search");
    }
    if (this.hasAttribute("disabled")) {
      trigger.setAttribute("disabled", "");
    } else {
      trigger.removeAttribute("disabled");
    }
    trigger.onclick = () => this.openSearch();
  }

  private emitToggleEvent() {
    this.dispatchEvent(
      new CustomEvent("toggle", {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncAfterSlotState() {
    const slot = this.shadowRoot?.querySelector('slot[name="after"]') as HTMLSlotElement | null;
    const hasAfter = Boolean(
      slot
        ?.assignedNodes({ flatten: true })
        .some((node) => node.nodeType === Node.ELEMENT_NODE || (node.textContent || "").trim()),
    );

    this.toggleAttribute("has-after", hasAfter);
    this.syncOpenState();
  }

  private syncOpenState(emit = false) {
    const trigger = this.actionEl;
    const cancel = this.shadowRoot?.querySelector(".cancel") as HTMLElement | null;
    const afterPanel = this.shadowRoot?.querySelector(".after-panel") as HTMLElement | null;
    const searchPanel = this.shadowRoot?.querySelector(".search-panel") as HTMLElement | null;
    const hasAfter = this.hasAttribute("has-after");

    if (this.open) {
      trigger?.setAttribute("aria-expanded", "true");
      cancel?.removeAttribute("tabindex");
      afterPanel?.setAttribute("aria-hidden", "true");
      afterPanel?.setAttribute("inert", "");
      searchPanel?.removeAttribute("inert");
    } else {
      trigger?.setAttribute("aria-expanded", "false");
      cancel?.setAttribute("tabindex", "-1");
      afterPanel?.setAttribute("aria-hidden", "false");
      afterPanel?.removeAttribute("inert");
      if (hasAfter) {
        searchPanel?.setAttribute("inert", "");
      } else {
        searchPanel?.removeAttribute("inert");
      }
    }

    if (emit) this.emitToggleEvent();
  }

  private queueAutofocus() {
    if (!this.hasAttribute("autofocus") && !this.open) return;

    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(() => {
      this.animationFrame = requestAnimationFrame(() => {
        this.focus({ preventScroll: true });
      });
    });
  }

  private setupListeners() {
    if (!this.shadowRoot) return;

    const input = this.inputEl;
    const afterSlot = this.shadowRoot.querySelector('slot[name="after"]') as HTMLSlotElement | null;
    const actionSlot = this.shadowRoot.querySelector('slot[name="action"]') as HTMLSlotElement | null;
    const cancel = this.shadowRoot.querySelector(".cancel") as HTMLElement | null;

    afterSlot?.removeEventListener("slotchange", this.slotChangeHandler);
    afterSlot?.addEventListener("slotchange", this.slotChangeHandler);
    actionSlot?.removeEventListener("slotchange", this.actionSlotChangeHandler);
    actionSlot?.addEventListener("slotchange", this.actionSlotChangeHandler);

    if (input) {
      input.oninput = (event: Event) => {
        event.stopPropagation();
        const detailValue = (event as CustomEvent<{ value?: string }>).detail?.value;
        const nextValue = detailValue ?? input.getAttribute("value") ?? "";
        this.setAttribute("value", nextValue);
        this.dispatchEvent(
          new CustomEvent("input", {
            detail: { value: nextValue },
            bubbles: true,
            composed: true,
          }),
        );
      };

      input.onchange = (event: Event) => {
        event.stopPropagation();
        const detailValue = (event as CustomEvent<{ value?: string }>).detail?.value;
        const nextValue = detailValue ?? input.getAttribute("value") ?? "";
        this.dispatchEvent(
          new CustomEvent("change", {
            detail: { value: nextValue },
            bubbles: true,
            composed: true,
          }),
        );
      };

      input.onkeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && this.open) {
          event.preventDefault();
          this.closeSearch();
          this.actionEl?.focus();
        }
      };
    }

    this.syncAction();
    cancel?.addEventListener("click", () => {
      this.closeSearch();
      this.actionEl?.focus();
    });

    this.syncOpenState();
  }

  private render() {
    const id = this.getAttribute("id") || `mui-search-input-${Math.random().toString(36).slice(2, 9)}`;
    const label = this.getAttribute("label") || "Search";
    const placeholder = this.getAttribute("placeholder") || "Search...";
    const name = this.getAttribute("name") || "";
    const value = this.value;
    const size = this.getAttribute("size") || "medium";
    const disabled = this.hasAttribute("disabled");
    const cancelLabel = this.getAttribute("cancel-label") || "Cancel";

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          --search-transition-duration: 280ms;
          --search-transition-easing: cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          width: 100%;
          gap: var(--space-200);
        }

        .after-panel {
          grid-area: 1 / 1;
          display: none;
          min-width: 0;
          opacity: 0;
          transform: translateY(calc(var(--space-400) * -1));
          transition:
            opacity 180ms ease,
            transform var(--search-transition-duration) var(--search-transition-easing);
          z-index: 1;
        }

        :host([has-after]) .after-panel {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: center;
          gap: var(--space-200);
          opacity: 1;
          transform: translateY(0);
        }

        :host([has-after][open]) .after-panel {
          opacity: 0;
          transform: translateY(var(--space-500));
          pointer-events: none;
        }

        .after-content {
          min-width: 0;
          overflow: hidden;
          opacity: 1;
          transition: opacity 180ms ease;
        }

        :host([has-after][open]) .after-content {
          opacity: 0;
        }

        .search-panel {
          grid-area: 1 / 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: var(--space-300);
          min-width: 0;
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 180ms ease,
            transform var(--search-transition-duration) var(--search-transition-easing);
          z-index: 2;
        }

        :host(:not([open])) .search-panel {
          grid-template-columns: minmax(0, 1fr) 0fr;
        }

        :host([has-after]:not([open])) .search-panel {
          opacity: 0;
          transform: translateY(calc(var(--space-500) * -1));
          pointer-events: none;
        }

        .cancel-wrap {
          min-width: 0;
          overflow: hidden;
          opacity: 1;
          transition: opacity 180ms ease;
        }

        :host(:not([open])) .cancel-wrap {
          opacity: 0;
          pointer-events: none;
        }

        .search-trigger {
          --action-focus-outline-offset: var(--stroke-size-200);
        }

        .input-wrap {
          min-width: 0;
          opacity: 1;
          transition: opacity 120ms ease;
        }

        :host([has-after]:not([open])) .input-wrap {
          opacity: 0;
          pointer-events: none;
        }

        mui-input {
          display: block;
          width: 100%;
        }

        mui-icon-search {
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .shell,
          .after-panel,
          .search-panel,
          .input-wrap,
          .cancel-wrap {
            transition: none;
          }
        }
      </style>

      <div class="shell">
        <div class="after-panel" aria-hidden="${this.open ? "true" : "false"}">
          <slot name="action">
            <mui-button class="search-trigger" variant="tertiary" icon-only aria-label="Search" aria-expanded="${this.open ? "true" : "false"}" ${disabled ? "disabled" : ""}>
              <mui-icon-search></mui-icon-search>
            </mui-button>
          </slot>
          <div class="after-content">
            <slot name="after"></slot>
          </div>
        </div>

        <div class="search-panel">
          <div class="input-wrap">
            <mui-input
              id="${id}"
              type="search"
              name="${name}"
              size="${size}"
              label="${label}"
              hide-label
              placeholder="${placeholder}"
              value="${value}"
              ${disabled ? "disabled" : ""}
              ${this.hasAttribute("autofocus") ? "autofocus" : ""}
            >
              <mui-icon-search slot="inside-before"></mui-icon-search>
            </mui-input>
          </div>
          <div class="cancel-wrap">
            <mui-button class="cancel" variant="tertiary" ${disabled ? "disabled" : ""} ${this.open ? "" : "tabindex=\"-1\""}>
              ${cancelLabel}
            </mui-button>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("mui-search-input")) {
  customElements.define("mui-search-input", MuiSearchInput);
}
