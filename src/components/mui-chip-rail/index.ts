import "../mui-button";
import "../mui-chip";
import "../mui-icons/left-chevron";
import "../mui-icons/right-chevron";

class MuiChipRail extends HTMLElement {
  static get observedAttributes() {
    return ["size", "bleed", "bleed-inline-size", "bleed-block-size", "skip-label", "aria-label"];
  }

  private scrollEl: HTMLElement | null = null;
  private slotEl: HTMLSlotElement | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private readonly onScroll = () => this.syncEdges();
  private readonly onSlotChange = () => this.syncSlottedItems();
  private readonly onFocusIn = (event: FocusEvent) => this.scrollFocusedItemIntoView(event);
  private readonly onPreviousClick = () => this.scrollByPage(-1);
  private readonly onNextClick = () => this.scrollByPage(1);
  private readonly onSkipClick = () => this.skipRail();
  private readonly onSkipKeyDown = (event: Event) => this.handleSkipKeyDown(event);

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this.render();
    this.syncBleed();
    this.bindEvents();
    this.syncSlottedItems();
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (!this.shadowRoot) return;

    if (name === "size") {
      this.syncActionSizes();
      this.syncSlottedItems();
      return;
    }

    if (name === "bleed" || name === "bleed-inline-size" || name === "bleed-block-size") {
      this.syncBleed();
      return;
    }

    if (name === "skip-label") {
      this.render();
      this.syncBleed();
      this.bindEvents();
      this.syncSlottedItems();
      return;
    }

    if (name === "aria-label" && this.scrollEl) {
      this.scrollEl.setAttribute("aria-label", newValue || "Chip rail");
    }
  }

  private render() {
    const size = this.normalizeSize(this.getAttribute("size"));
    const ariaLabel = this.getAttribute("aria-label") || "Chip rail";
    const iconSize = this.getIconSize(size);
    const skipLabel = this.getAttribute("skip-label") || "Skip";

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          contain: inline-size;
          padding-block: var(--chip-rail-bleed-block-size);
          padding-inline: var(--chip-rail-bleed-inline-size);
          --chip-rail-background: var(--surface-elevated-100);
          --chip-rail-bleed-inline-size: 0px;
          --chip-rail-bleed-block-size: 0px;
          --chip-rail-gap: var(--space-200);
          --chip-rail-action-size: var(--chip-height-medium, 4rem);
          --chip-rail-edge-size: calc(var(--action-icon-only-size-medium) + var(--space-700));
          --chip-rail-focus-scroll-margin-inline: calc(
            var(--chip-rail-edge-size) + var(--chip-rail-bleed-inline-size) + var(--chip-rail-gap)
          );
          --chip-rail-edge-solid: 54%;
        }

        :host([size="x-small"]) {
          --chip-rail-gap: var(--space-100);
          --chip-rail-edge-size: calc(var(--action-icon-only-size-x-small) + var(--space-500));
        }

        :host([size="small"]) {
          --chip-rail-gap: var(--space-100);
          --chip-rail-edge-size: calc(var(--action-icon-only-size-small) + var(--space-600));
        }

        :host([size="large"]) {
          --chip-rail-gap: var(--space-300);
          --chip-rail-edge-size: calc(var(--action-icon-only-size-large) + var(--space-800));
        }

        .rail {
          position: relative;
          width: 100%;
          min-width: 0;
          max-width: 100%;
        }

        .scroll {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          scroll-behavior: smooth;
          overscroll-behavior-inline: contain;
        }

        .scroll::-webkit-scrollbar {
          display: none;
        }

        .items {
          display: flex;
          align-items: center;
          width: max-content;
          min-width: max-content;
          gap: var(--chip-rail-gap);
        }

        .skip-chip,
        ::slotted(*) {
          flex: 0 0 auto;
          scroll-margin-inline: var(--chip-rail-focus-scroll-margin-inline);
        }

        .skip-chip {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }

        .skip-chip:focus,
        .skip-chip:focus-visible {
          position: static;
          width: auto;
          height: auto;
          overflow: visible;
          clip-path: none;
          white-space: normal;
        }

        .edge {
          position: absolute;
          top: calc(-1 * var(--chip-rail-bleed-block-size));
          bottom: calc(-1 * var(--chip-rail-bleed-block-size));
          z-index: 2;
          display: flex;
          align-items: center;
          width: calc(var(--chip-rail-edge-size) + var(--chip-rail-bleed-inline-size));
          pointer-events: none;
          opacity: 1;
          transition: opacity var(--speed-200) ease;
        }

        .edge[hidden] {
          display: none;
        }

        .edge mui-button {
          pointer-events: auto;
          --action-size-x-small: var(--chip-rail-action-size);
          --action-size-small: var(--chip-rail-action-size);
          --action-size-medium: var(--chip-rail-action-size);
          --action-size-large: var(--chip-rail-action-size);
          --action-icon-only-size-x-small: var(--chip-rail-action-size);
          --action-icon-only-size-small: var(--chip-rail-action-size);
          --action-icon-only-size-medium: var(--chip-rail-action-size);
          --action-icon-only-size-large: var(--chip-rail-action-size);
        }

        .edge mui-button::part(height) {
          height: var(--chip-rail-action-size);
          min-height: var(--chip-rail-action-size);
        }

        .edge mui-button::part(width) {
          width: var(--chip-rail-action-size);
        }

        .edge mui-button::part(padding) {
          padding: var(--space-000);
        }

        .edge-start {
          left: calc(-1 * var(--chip-rail-bleed-inline-size));
          justify-content: flex-start;
          padding-inline-start: var(--chip-rail-bleed-inline-size);
          background:
            linear-gradient(
              90deg,
              var(--chip-rail-background) 0%,
              var(--chip-rail-background) var(--chip-rail-edge-solid),
              color-mix(in srgb, var(--chip-rail-background) 68%, transparent) 78%,
              transparent 100%
            );
        }

        .edge-end {
          right: calc(-1 * var(--chip-rail-bleed-inline-size));
          justify-content: flex-end;
          padding-inline-end: var(--chip-rail-bleed-inline-size);
          background:
            linear-gradient(
              270deg,
              var(--chip-rail-background) 0%,
              var(--chip-rail-background) var(--chip-rail-edge-solid),
              color-mix(in srgb, var(--chip-rail-background) 68%, transparent) 78%,
              transparent 100%
            );
        }
      </style>

      <div class="rail">
        <div class="scroll" role="group" aria-label="${this.escapeAttribute(ariaLabel)}">
          <div class="items">
            <mui-chip class="skip-chip" variant="clickable" tabindex="0" size="${size}">${this.escapeHtml(skipLabel)}</mui-chip>
            <slot></slot>
          </div>
        </div>
        <div class="edge edge-end" hidden>
          <mui-button class="rail-action rail-action-end" variant="tertiary" size="${size}" icon-only aria-label="Next items">
            <mui-icon-right-chevron class="mui-icon" size="${iconSize}"></mui-icon-right-chevron>
          </mui-button>
        </div>
        <div class="edge edge-start" hidden>
          <mui-button class="rail-action rail-action-start" variant="tertiary" size="${size}" icon-only aria-label="Previous items">
            <mui-icon-left-chevron class="mui-icon" size="${iconSize}"></mui-icon-left-chevron>
          </mui-button>
        </div>
      </div>
    `;

    this.scrollEl = this.shadowRoot!.querySelector(".scroll");
    this.slotEl = this.shadowRoot!.querySelector("slot");
  }

  private bindEvents() {
    this.unbindEvents();

    this.scrollEl?.addEventListener("scroll", this.onScroll, { passive: true });
    this.addEventListener("focusin", this.onFocusIn);
    this.slotEl?.addEventListener("slotchange", this.onSlotChange);

    const previous = this.shadowRoot?.querySelector(".rail-action-start");
    const next = this.shadowRoot?.querySelector(".rail-action-end");
    const skip = this.shadowRoot?.querySelector(".skip-chip");
    previous?.addEventListener("click", this.onPreviousClick);
    next?.addEventListener("click", this.onNextClick);
    skip?.addEventListener("click", this.onSkipClick);
    skip?.addEventListener("keydown", this.onSkipKeyDown);

    if (typeof ResizeObserver !== "undefined" && this.scrollEl) {
      this.resizeObserver = new ResizeObserver(() => this.syncEdges());
      this.resizeObserver.observe(this.scrollEl);
    }

    if (typeof MutationObserver !== "undefined") {
      this.mutationObserver = new MutationObserver(() => this.syncSlottedItems());
      this.mutationObserver.observe(this, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["hidden", "size"],
      });
    }

    requestAnimationFrame(() => this.syncEdges());
  }

  private unbindEvents() {
    this.scrollEl?.removeEventListener("scroll", this.onScroll);
    this.removeEventListener("focusin", this.onFocusIn);
    this.slotEl?.removeEventListener("slotchange", this.onSlotChange);
    this.shadowRoot?.querySelector(".rail-action-start")?.removeEventListener("click", this.onPreviousClick);
    this.shadowRoot?.querySelector(".rail-action-end")?.removeEventListener("click", this.onNextClick);
    this.shadowRoot?.querySelector(".skip-chip")?.removeEventListener("click", this.onSkipClick);
    this.shadowRoot?.querySelector(".skip-chip")?.removeEventListener("keydown", this.onSkipKeyDown);
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    this.resizeObserver = null;
    this.mutationObserver = null;
  }

  private syncSlottedItems() {
    const size = this.normalizeSize(this.getAttribute("size"));
    const elements = this.slotEl?.assignedElements({ flatten: true }) as HTMLElement[] | undefined;
    elements?.forEach((el) => {
      if (el.tagName.toLowerCase() === "mui-chip") {
        if (el.getAttribute("size") !== size) el.setAttribute("size", size);
      }
    });
    requestAnimationFrame(() => this.syncEdges());
  }

  private syncActionSizes() {
    const size = this.normalizeSize(this.getAttribute("size"));
    const iconSize = this.getIconSize(size);
    this.shadowRoot?.querySelectorAll("mui-button.rail-action").forEach((button) => {
      button.setAttribute("size", size);
    });
    this.shadowRoot?.querySelectorAll(".rail-action .mui-icon").forEach((icon) => {
      icon.setAttribute("size", iconSize);
    });
    this.shadowRoot?.querySelector(".skip-chip")?.setAttribute("size", size);
  }

  private syncEdges() {
    if (!this.scrollEl || !this.shadowRoot) return;

    const maxScroll = Math.max(0, this.scrollEl.scrollWidth - this.scrollEl.clientWidth);
    const scrollLeft = this.scrollEl.scrollLeft;
    const canScroll = maxScroll > 1;
    const showStart = canScroll && scrollLeft > 1;
    const showEnd = canScroll && scrollLeft < maxScroll - 1;

    this.shadowRoot.querySelector(".edge-start")?.toggleAttribute("hidden", !showStart);
    this.shadowRoot.querySelector(".edge-end")?.toggleAttribute("hidden", !showEnd);
  }

  private syncBleed() {
    this.style.setProperty("--chip-rail-bleed-inline-size", this.getBleedInlineValue());
    this.style.setProperty("--chip-rail-bleed-block-size", this.getBleedBlockValue());
  }

  private scrollByPage(direction: -1 | 1) {
    if (!this.scrollEl) return;
    const distance = Math.max(this.scrollEl.clientWidth * 0.72, 120);
    this.scrollEl.scrollBy({ left: distance * direction, behavior: "smooth" });
  }

  private skipRail() {
    const previous = this.shadowRoot?.querySelector(".rail-action-start") as HTMLElement | null;
    const next = this.shadowRoot?.querySelector(".rail-action-end") as HTMLElement | null;
    const target = previous && !previous.closest("[hidden]") ? previous : next;

    if (target) {
      this.focusRailAction(target);
      return;
    }

    const focusable = Array.from(
      document.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute("disabled") && !el.closest("[hidden]") && !el.closest("[inert]"));
    const nextOutsideRail = focusable.find(
      (el) => Boolean(this.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) && !this.contains(el),
    );
    nextOutsideRail?.focus();
  }

  private handleSkipKeyDown(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key !== "Enter" && keyboardEvent.key !== " ") return;
    keyboardEvent.preventDefault();
    this.skipRail();
  }

  private focusRailAction(action: HTMLElement) {
    const internalButton = action.shadowRoot?.querySelector("button") as HTMLButtonElement | null;
    (internalButton || action).focus();
  }

  private scrollFocusedItemIntoView(event: FocusEvent) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (this.shadowRoot?.contains(target)) return;
    if (!this.contains(target)) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }

  private getBleedInlineValue() {
    return this.normalizeBleedValue(this.getAttribute("bleed-inline-size") || this.getAttribute("bleed"));
  }

  private getBleedBlockValue() {
    return this.normalizeBleedValue(this.getAttribute("bleed-block-size"));
  }

  private normalizeBleedValue(value: string | null) {
    const bleed = (value || "0").trim();
    const tokenValues = new Set(["000", "025", "050", "100", "200", "300", "400", "500", "600", "700", "800"]);

    if (!bleed || bleed === "0" || bleed === "none" || bleed === "false") return "0px";
    if (tokenValues.has(bleed)) return `var(--space-${bleed})`;
    return bleed;
  }

  private normalizeSize(size: string | null) {
    const allowed = new Set(["x-small", "small", "medium", "large"]);
    return size && allowed.has(size) ? size : "medium";
  }

  private getIconSize(size: string) {
    const map: Record<string, string> = {
      "x-small": "x-small",
      small: "x-small",
      medium: "medium",
      large: "large",
    };
    return map[size] || "medium";
  }

  private escapeAttribute(value: string) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  private escapeHtml(value: string) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

if (!customElements.get("mui-chip-rail")) {
  customElements.define("mui-chip-rail", MuiChipRail);
}
