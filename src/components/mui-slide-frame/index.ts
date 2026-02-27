import "../mui-heading";
import "../mui-body";
import "../mui-stack/vstack";
import "../mui-stack/hstack";
import "../mui-button";
import "../mui-icons/warning";
import "../mui-dialog";

class MuiSlideFrame extends HTMLElement {
  static get observedAttributes() {
    return [
      "ratio",
      "ratio-width",
      "ratio-height",
      "present",
      "active-section",
      "padding",
      "notes-open",
      "variant",
      "radius",
      "title",
      "footer-text",
      "hide-counter",
      "preview",
      "lightbox",
      "scroll",
    ];
  }

  private defaultSlot: HTMLSlotElement | null = null;
  private headerSlot: HTMLSlotElement | null = null;
  private headerAfterSlot: HTMLSlotElement | null = null;
  private headerDescriptionSlot: HTMLSlotElement | null = null;
  private footerSlot: HTMLSlotElement | null = null;
  private footerAfterSlot: HTMLSlotElement | null = null;
  private footerDescriptionSlot: HTMLSlotElement | null = null;
  private notesSlot: HTMLSlotElement | null = null;
  private imageSlot: HTMLSlotElement | null = null;
  private surfaceEl: HTMLElement | null = null;
  private pointerStartX: number | null = null;
  private pointerStartY: number | null = null;
  private onSlotChange = () => this.syncSections();
  private onChromeSlotChange = () => this.syncChromeState();
  private onSurfaceClick = (event: Event) => this.handleSurfaceClick(event);
  private onPointerDown = (event: PointerEvent) => this.handlePointerDown(event);
  private onPointerUp = (event: PointerEvent) => this.handlePointerUp(event);
  private onKeyDown = (event: KeyboardEvent) => this.handleArrowNavigation(event);
  private onDocumentKeyDown = (event: KeyboardEvent) => {
    if (!this.shouldHandleGlobalKeys(event)) return;
    if (this.isEditableTarget(event.target)) return;
    this.handleArrowNavigation(event);
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("ratio")) this.setAttribute("ratio", "16:9");
    if (!this.hasAttribute("padding")) this.setAttribute("padding", "medium");
    if (!this.hasAttribute("active-section")) this.setAttribute("active-section", "0");
    if (!this.hasAttribute("variant")) this.setAttribute("variant", "default");
    if (!this.hasAttribute("radius")) this.setAttribute("radius", "default");
    this.render();
    this.syncSections();
    this.syncChromeState();
    this.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keydown", this.onDocumentKeyDown);
  }

  disconnectedCallback() {
    this.defaultSlot?.removeEventListener("slotchange", this.onSlotChange);
    this.headerSlot?.removeEventListener("slotchange", this.onChromeSlotChange);
    this.headerAfterSlot?.removeEventListener("slotchange", this.onChromeSlotChange);
    this.headerDescriptionSlot?.removeEventListener("slotchange", this.onChromeSlotChange);
    this.footerSlot?.removeEventListener("slotchange", this.onChromeSlotChange);
    this.footerAfterSlot?.removeEventListener("slotchange", this.onChromeSlotChange);
    this.footerDescriptionSlot?.removeEventListener("slotchange", this.onChromeSlotChange);
    this.notesSlot?.removeEventListener("slotchange", this.onChromeSlotChange);
    this.imageSlot?.removeEventListener("slotchange", this.onChromeSlotChange);
    this.surfaceEl?.removeEventListener("click", this.onSurfaceClick);
    this.surfaceEl?.removeEventListener("pointerdown", this.onPointerDown);
    this.surfaceEl?.removeEventListener("pointerup", this.onPointerUp);
    this.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keydown", this.onDocumentKeyDown);
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
    this.syncSections();
    this.syncChromeState();
  }

  private getSections() {
    const sections = this.defaultSlot?.assignedElements({ flatten: true }) || [];
    return sections.filter((el) => !["header", "footer"].includes(el.getAttribute("slot") || ""));
  }

  private getActiveSectionIndex() {
    const sections = this.getSections();
    const parsed = parseInt(this.getAttribute("active-section") || "0", 10);
    if (!Number.isFinite(parsed) || sections.length === 0) return 0;
    return Math.max(0, Math.min(parsed, sections.length - 1));
  }

  private setActiveSectionIndex(index: number) {
    this.setAttribute("active-section", String(index));
  }

  nextSection() {
    const sections = this.getSections();
    if (sections.length === 0) return;
    const next = Math.min(this.getActiveSectionIndex() + 1, sections.length - 1);
    this.setActiveSectionIndex(next);
    this.dispatchEvent(
      new CustomEvent("section-change", {
        detail: { index: next, total: sections.length },
        bubbles: true,
        composed: true,
      }),
    );
  }

  prevSection() {
    const sections = this.getSections();
    if (sections.length === 0) return;
    const next = Math.max(this.getActiveSectionIndex() - 1, 0);
    this.setActiveSectionIndex(next);
    this.dispatchEvent(
      new CustomEvent("section-change", {
        detail: { index: next, total: sections.length },
        bubbles: true,
        composed: true,
      }),
    );
  }

  addSection(content?: HTMLElement | string) {
    const section = document.createElement("div");
    section.setAttribute("data-slide-section", "");
    if (typeof content === "string") {
      section.textContent = content;
    } else if (content instanceof HTMLElement) {
      section.appendChild(content);
    }
    this.appendChild(section);
    const sections = this.getSections();
    const next = Math.max(0, sections.length - 1);
    this.setActiveSectionIndex(next);
    this.syncSections();
    this.dispatchEvent(
      new CustomEvent("section-add", {
        detail: { index: next, total: sections.length },
        bubbles: true,
        composed: true,
      }),
    );
  }

  toggleNotes(force?: boolean) {
    const next = typeof force === "boolean" ? force : !this.hasAttribute("notes-open");
    this.toggleAttribute("notes-open", next);
    this.dispatchEvent(
      new CustomEvent("notes-toggle", {
        detail: { open: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private resolveRatio() {
    const ratio = (this.getAttribute("ratio") || "16:9").trim();
    if (ratio === "custom") {
      const width = parseFloat(this.getAttribute("ratio-width") || "16");
      const height = parseFloat(this.getAttribute("ratio-height") || "9");
      if (width > 0 && height > 0) return `${width} / ${height}`;
      return "16 / 9";
    }
    const ratioParts = ratio.split(":");
    if (ratioParts.length === 2) {
      const width = parseFloat(ratioParts[0]);
      const height = parseFloat(ratioParts[1]);
      if (width > 0 && height > 0) return `${width} / ${height}`;
    }
    return "16 / 9";
  }

  private syncSections() {
    if (!this.shadowRoot) return;
    const sections = this.getSections();
    const activeIndex = this.getActiveSectionIndex();
    const collapse = this.hasAttribute("present") || sections.length > 1;
    sections.forEach((section, index) => {
      section.setAttribute("data-slide-section", "");
      if (index === activeIndex) {
        section.removeAttribute("slide-hidden");
        section.setAttribute("slide-active", "");
      } else {
        section.removeAttribute("slide-active");
        if (collapse) section.setAttribute("slide-hidden", "");
        else section.removeAttribute("slide-hidden");
      }
    });
    this.style.setProperty("--slide-frame-ratio", this.resolveRatio());
  }

  private handleArrowNavigation(event: KeyboardEvent) {
    if (this.getSections().length < 2) return;
    if (event.defaultPrevented) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      this.nextSection();
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      this.prevSection();
    }
  }

  private isEditableTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false;
    if (target.closest("input, textarea, select")) return true;
    if (target.isContentEditable) return true;
    return false;
  }

  private shouldHandleGlobalKeys(event: KeyboardEvent) {
    const target = event.target instanceof Node ? event.target : null;
    if (target && this.contains(target)) return true;
    if (this.matches(":hover")) return true;
    const active = document.activeElement;
    if (active && this.contains(active)) return true;
    return false;
  }

  private render() {
    if (!this.shadowRoot) return;
    const title = (this.getAttribute("title") || "").trim();
    const footerText = (this.getAttribute("footer-text") || "").trim();
    const escapedTitle = this.escapeHtml(title);
    const escapedFooterText = this.escapeHtml(footerText);
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          --slide-frame-ratio: 16 / 9;
          --slide-frame-padding-active: var(--slide-frame-padding-medium);
          --slide-frame-leading-offset: var(--space-025);
          --slide-frame-border-active: var(--border-thin);
          --slide-frame-border-color-active: var(--slide-frame-border-color);
          --slide-frame-background-active: var(--slide-frame-background);
          --slide-frame-shadow-active: var(--slide-frame-shadow);
          --slide-frame-radius-active: var(--slide-frame-radius);
        }
        :host([variant="plain"]) {
          --slide-frame-border-active: none;
          --slide-frame-border-color-active: transparent;
          --slide-frame-background-active: transparent;
          --slide-frame-shadow-active: none;
        }
        :host([variant="ghost"]) {
          --slide-frame-border-active: none;
          --slide-frame-border-color-active: transparent;
          --slide-frame-background-active: var(--slide-frame-background-ghost);
          --slide-frame-shadow-active: none;
        }
        :host([radius="none"]) { --slide-frame-radius-active: 0; }
        :host([radius="small"]) { --slide-frame-radius-active: var(--slide-frame-radius-small); }
        :host([radius="medium"]) { --slide-frame-radius-active: var(--slide-frame-radius-medium); }
        :host([radius="large"]) { --slide-frame-radius-active: var(--slide-frame-radius-large); }

        .frame {
          display: grid;
          width: 100%;
          gap: 0;
          padding: var(--space-400);
          background: var(--surface-recessed-200);
          box-sizing: border-box;
        }
        :host([has-chrome]) .frame {
          gap: var(--slide-frame-gap, var(--space-300));
        }

        .surface {
          position: relative;
          width: 100%;
          aspect-ratio: var(--slide-frame-ratio);
          border: var(--slide-frame-border-active);
          border-color: var(--slide-frame-border-color-active);
          border-radius: var(--slide-frame-radius-active);
          background: var(--slide-frame-background-active);
          box-shadow: var(--slide-frame-shadow-active);
          box-sizing: border-box;
          padding: var(--slide-frame-padding-active);
          overflow: hidden;
          display: block;
        }
        :host([scroll]) .surface {
          overflow: auto;
        }
        :host([preview]) .surface {
          border-color: var(--slide-frame-preview-border-color, var(--text-color-warning));
          box-shadow:
            var(--slide-frame-shadow-active),
            0 0 0 var(--stroke-size-100) color-mix(in srgb, var(--slide-frame-preview-border-color, var(--text-color-warning)) 45%, transparent);
        }
        .header,
        .footer {
          display: block;
        }
        .leading {
          margin-inline: var(--slide-frame-leading-offset);
        }

        .leading_top {
          margin-block-start: var(--space-050);
          margin-block-end: var(--space-100);
        }

        .header-main,
        .footer-main {
          min-width: 0;
          width: 100%;
        }
        .header-leading,
        .footer-leading {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          gap: var(--space-200);
          min-width: 0;
          flex: 1 1 auto;
        }
        
        .header-title,
        .footer-copy {
          min-width: 0;
        }
        .header-description {
          min-width: 0;
        }
        .header-after,
        .footer-after {
          justify-content: flex-end;
          min-width: 0;
        }
        .footer-counter {
          white-space: nowrap;
        }
        .notes {
          display: none;
        }
        :host([notes-open]) .notes {
          display: block;
          padding: var(--space-400);
          background: var(--surface-elevated-100);
          border-radius: var(--radius-200);

        }
        :host([present]) .surface {
          background: var(--slide-frame-background-present, var(--slide-frame-background-active));
        }
        .lightbox-image {
          display: block;
          width: 100%;
          max-height: 75vh;
          height: auto;
          object-fit: contain;
        }

        .present-controls {
          display: grid;
          padding-bottom: var(--space-100);
          border-bottom: var(--border-thin);
        }
        :host([present]) .present-controls {
          display: none;
        }
        :host(:not([present])) #slideFrameTogglePresentBtn {
          /* optional: style to indicate inactive state */
        }

        ::slotted([data-slide-section][slide-hidden]) {
          display: none !important;
        }
      </style>
      <div class="frame">
        <mui-grid col="1fr auto" class="present-controls" aligny="center">
          <mui-h-stack space="var(--space-050)" aligny="center">
            <mui-button id="slideFrameAddSectionBtn" variant="tertiary" size="x-small">Add Section</mui-button>
            <mui-rule direction="vertical" length="var(--space-300)"></mui-rule>
            <mui-button id="slideFrameTogglePresentBtn" variant="tertiary" size="x-small">Present Mode</mui-button>
            <mui-rule direction="vertical" length="var(--space-300)"></mui-rule>
            <mui-button id="slideFrameToggleNotesBtn" variant="tertiary" size="x-small">Notes</mui-button>
          </mui-h-stack>
          <mui-h-stack space="var(--space-050)" aligny="center">
            <mui-button id="slideFramePrevSectionBtn" variant="tertiary" size="x-small"><mui-icon-left-chevron slot="before"></mui-icon-left-chevron>Previous</mui-button>
            <mui-rule direction="vertical" length="var(--space-300)"></mui-rule>
            <mui-button id="slideFrameNextSectionBtn" variant="tertiary" size="x-small">Next<mui-icon-right-chevron slot="after"></mui-icon-right-chevron></mui-button>
          </mui-h-stack>
        </mui-grid>
        <div class="header" id="headerRegion">
          <mui-v-stack class="leading leading_top" space="var(--space-100)" alignx="stretch" aligny="center"> 
            <mui-h-stack class="header-main" alignx="space-between" aligny="center" space="var(--space-300)">
              <div class="header-leading">
                <mui-heading class="header-title" size="4" level="4" id="headerTitle"${escapedTitle ? "" : " hidden"}>${escapedTitle}</mui-heading>
                <slot name="header"></slot>
              </div>
              <mui-h-stack class="header-after" alignx="end" aligny="center" space="var(--space-200)">
                <slot name="header-after"></slot>
              </mui-h-stack>
            </mui-h-stack>
            <mui-h-stack class="header-description" alignx="start" aligny="start" space="var(--space-200)">
              <slot name="header-description"></slot>
            </mui-h-stack>
          </mui-v-stack>
        </div>
        <div class="surface" tabindex="0" role="region" aria-label="Slide frame">
          <slot name="image"></slot>
          <slot></slot>
        </div>
        <div class="notes"><mui-body variant="optional" size="x-small">Notes...</mui-body><slot name="notes"></slot></div>
        <div class="footer" id="footerRegion">
          <mui-v-stack class="leading leading_bottom" space="var(--space-400)">
            <mui-h-stack class="footer-main" alignx="space-between" aligny="center" space="var(--space-300)">
              <div class="footer-leading">
                <mui-body class="footer-copy" size="small" id="footerText"${escapedFooterText ? "" : " hidden"}>${escapedFooterText}</mui-body>
                <slot name="footer"></slot>
              </div>
              <mui-h-stack class="footer-after" alignx="end" aligny="center" space="var(--space-200)">
                <mui-body class="footer-counter" id="footerCounter" size="x-small" variant="optional" hidden>Section 1/1</mui-body>
                <slot name="footer-after"></slot>
              </mui-h-stack>
            </mui-h-stack>
          </mui-v-stack>
        </div>
      </div>
      <mui-dialog id="lightboxDialog" width="min(94vw, 1200px)" content-padding="none">
        <mui-heading slot="title" size="5" level="3">Image Preview</mui-heading>
        <img id="lightboxImage" class="lightbox-image" alt="Slide image preview" />
      </mui-dialog>
    `;
    this.defaultSlot = this.shadowRoot.querySelector("slot:not([name])");
    this.defaultSlot?.addEventListener("slotchange", this.onSlotChange);
    this.headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
    this.headerAfterSlot = this.shadowRoot.querySelector('slot[name="header-after"]');
    this.headerDescriptionSlot = this.shadowRoot.querySelector('slot[name="header-description"]');
    this.footerSlot = this.shadowRoot.querySelector('slot[name="footer"]');
    this.footerAfterSlot = this.shadowRoot.querySelector('slot[name="footer-after"]');
    this.notesSlot = this.shadowRoot.querySelector('slot[name="notes"]');
    this.imageSlot = this.shadowRoot.querySelector('slot[name="image"]');
    this.surfaceEl = this.shadowRoot.querySelector(".surface");
    this.headerSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.headerAfterSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.headerDescriptionSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.footerSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.footerAfterSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.footerDescriptionSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.notesSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.surfaceEl?.addEventListener("click", this.onSurfaceClick);
    this.surfaceEl?.addEventListener("pointerdown", this.onPointerDown);
    this.surfaceEl?.addEventListener("pointerup", this.onPointerUp);
    this.style.setProperty("--slide-frame-ratio", this.resolveRatio());
    this.shadowRoot.querySelector("#lightboxDialog")?.addEventListener("mui-dialog-close", () => {
      this.dispatchEvent(new CustomEvent("lightbox-close", { bubbles: true, composed: true }));
    });
    this.shadowRoot.querySelector("#notesActionBtn")?.addEventListener("click", () => {
      this.toggleNotes();
    });
    this.shadowRoot.querySelector("#slideFrameAddSectionBtn")?.addEventListener("click", () => {
      this.addSection(`Section ${(this.getSections().length + 1).toString()}: New`);
    });
    this.shadowRoot.querySelector("#slideFramePrevSectionBtn")?.addEventListener("click", () => {
      this.prevSection();
    });
    this.shadowRoot.querySelector("#slideFrameNextSectionBtn")?.addEventListener("click", () => {
      this.nextSection();
    });
    this.shadowRoot.querySelector("#slideFrameTogglePresentBtn")?.addEventListener("click", () => {
      this.toggleAttribute("present");
      this.syncChromeState();
    });
    this.shadowRoot.querySelector("#slideFrameToggleNotesBtn")?.addEventListener("click", () => {
      this.toggleNotes();
    });
  }

  private syncChromeState() {
    if (!this.shadowRoot) return;
    const hasNodes = (slot: HTMLSlotElement | null) =>
      (slot?.assignedNodes({ flatten: true }) || []).some(
        (node) => node.nodeType === Node.ELEMENT_NODE || (node.textContent || "").trim().length > 0,
      );
    const hasHeaderTitle = Boolean((this.getAttribute("title") || "").trim());
    const hasFooterText = Boolean((this.getAttribute("footer-text") || "").trim());
    const showCounter = !this.hasAttribute("hide-counter") && this.getSections().length > 0;
    const hasHeader =
      hasHeaderTitle ||
      hasNodes(this.headerSlot) ||
      hasNodes(this.headerAfterSlot) ||
      hasNodes(this.headerDescriptionSlot);
    const hasFooter =
      hasFooterText ||
      hasNodes(this.footerSlot) ||
      hasNodes(this.footerAfterSlot) ||
      hasNodes(this.footerDescriptionSlot) ||
      showCounter;
    const hasNotes = hasNodes(this.notesSlot);
    const notesVisible = this.hasAttribute("notes-open");
    const headerRegion = this.shadowRoot.querySelector<HTMLElement>("#headerRegion");
    const footerRegion = this.shadowRoot.querySelector<HTMLElement>("#footerRegion");
    const counter = this.shadowRoot.querySelector<HTMLElement>("#footerCounter");
    const total = Math.max(this.getSections().length, 1);
    const index = this.getActiveSectionIndex() + 1;
    if (counter) {
      counter.hidden = !showCounter;
      counter.textContent = `Section ${Math.min(index, total)}/${total}`;
    }
    if (headerRegion) headerRegion.hidden = !hasHeader;
    if (footerRegion) footerRegion.hidden = !hasFooter;
    this.toggleAttribute("has-header", hasHeader);
    this.toggleAttribute("has-footer", hasFooter);
    this.toggleAttribute("has-notes", hasNotes);
    this.toggleAttribute("notes-visible", notesVisible);
    this.toggleAttribute("has-chrome", hasHeader || hasFooter || notesVisible);
  }

  private handleSurfaceClick(event: Event) {
    if (!this.hasAttribute("lightbox")) return;
    if (!this.imageSlot) return;
    const assigned = this.imageSlot.assignedElements({ flatten: true });
    if (assigned.length === 0) return;
    const path = event.composedPath();
    const clickedImageRegion = assigned.some((el) => path.includes(el));
    if (!clickedImageRegion) return;
    const image = this.resolveLightboxImage(path, assigned);
    if (!image || !image.src) return;
    this.openLightbox(image.src, image.alt || "Slide image preview");
  }

  private handlePointerDown(event: PointerEvent) {
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;
  }

  private handlePointerUp(event: PointerEvent) {
    if (this.pointerStartX == null || this.pointerStartY == null) return;
    if (this.getSections().length < 2) return;
    const dx = event.clientX - this.pointerStartX;
    const dy = event.clientY - this.pointerStartY;
    this.pointerStartX = null;
    this.pointerStartY = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) this.nextSection();
    else this.prevSection();
  }

  private resolveLightboxImage(path: EventTarget[], assigned: Element[]) {
    const direct = path.find((target) => target instanceof HTMLImageElement);
    if (direct instanceof HTMLImageElement) return direct;
    for (const el of assigned) {
      if (el instanceof HTMLImageElement) return el;
      const nested = el.querySelector?.("img");
      if (nested instanceof HTMLImageElement) return nested;
    }
    return null;
  }

  private openLightbox(src: string, alt: string) {
    const dialog = this.shadowRoot?.querySelector("#lightboxDialog") as (HTMLElement & { open?: () => void }) | null;
    const image = this.shadowRoot?.querySelector<HTMLImageElement>("#lightboxImage");
    if (!dialog || !image) return;
    image.src = src;
    image.alt = alt;
    dialog.open?.();
    this.dispatchEvent(
      new CustomEvent("lightbox-open", {
        detail: { src, alt },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private escapeHtml(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}

if (!customElements.get("mui-slide-frame")) {
  customElements.define("mui-slide-frame", MuiSlideFrame);
}
