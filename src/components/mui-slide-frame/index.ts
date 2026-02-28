import "../mui-heading";
import "../mui-body";
import "../mui-stack/vstack";
import "../mui-stack/hstack";
import "../mui-button";
import "../mui-icons/warning";
import "../mui-select";

class MuiSlideFrame extends HTMLElement {
  static get observedAttributes() {
    return [
      "ratio",
      "present",
      "active-section",
      "padding",
      "notes-open",
      "variant",
      "radius",
      "title",
      "footer-text",
      "hide-header",
      "hide-footer",
      "hide-counter",
      "allow-add-section",
      "scroll",
      "fullscreen",
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
  private stageEl: HTMLElement | null = null;
  private surfaceEl: HTMLElement | null = null;
  private activeSectionEl: Element | null = null;
  private nativeFullscreenActive = false;
  private pointerStartX: number | null = null;
  private pointerStartY: number | null = null;
  private onSlotChange = () => this.syncSections();
  private onChromeSlotChange = () => this.syncChromeState();
  private onPointerDown = (event: PointerEvent) => this.handlePointerDown(event);
  private onPointerUp = (event: PointerEvent) => this.handlePointerUp(event);
  private onKeyDown = (event: KeyboardEvent) => this.handleArrowNavigation(event);
  private onFullscreenChange = () => this.handleFullscreenChange();
  private onFullscreenError = () => this.handleFullscreenError();
  private onWindowResize = () => this.updateFullscreenSurfaceFit();
  private onDocumentKeyDown = (event: KeyboardEvent) => {
    const inNativeFullscreen = document.fullscreenElement === this;
    if (event.key === "Escape" && this.hasAttribute("present") && !inNativeFullscreen) {
      event.preventDefault();
      this.resetPresentationState();
      return;
    }
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
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
    document.addEventListener("fullscreenerror", this.onFullscreenError);
    window.addEventListener("resize", this.onWindowResize);
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
    this.surfaceEl?.removeEventListener("pointerdown", this.onPointerDown);
    this.surfaceEl?.removeEventListener("pointerup", this.onPointerUp);
    this.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keydown", this.onDocumentKeyDown);
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
    document.removeEventListener("fullscreenerror", this.onFullscreenError);
    window.removeEventListener("resize", this.onWindowResize);
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
    this.syncSections();
    this.syncChromeState();
  }

  async enterFullscreen() {
    if (document.fullscreenElement === this) return true;
    const host = this as HTMLElement & { requestFullscreen?: () => Promise<void> };
    if (typeof host.requestFullscreen !== "function") return true;
    try {
      await host.requestFullscreen();
      return true;
    } catch {
      this.dispatchEvent(new CustomEvent("fullscreen-error", { bubbles: true, composed: true }));
      return true;
    }
  }

  async exitFullscreen() {
    if (document.fullscreenElement === this && typeof document.exitFullscreen === "function") {
      try {
        await document.exitFullscreen();
      } catch {
        this.dispatchEvent(new CustomEvent("fullscreen-error", { bubbles: true, composed: true }));
      }
    }
    return true;
  }

  async toggleFullscreen(force?: boolean) {
    const shouldEnable = typeof force === "boolean" ? force : !this.hasAttribute("fullscreen");
    return shouldEnable ? this.enterFullscreen() : this.exitFullscreen();
  }

  private resetPresentationState() {
    this.nativeFullscreenActive = false;
    this.removeAttribute("present");
    this.removeAttribute("fullscreen");
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
    this.activeSectionEl = null;
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
    const section = document.createElement("mui-v-stack");
    section.setAttribute("space", "var(--space-400)");
    section.setAttribute("alignx", "center");
    section.setAttribute("aligny", "center");
    section.setAttribute("data-slide-section", "");
    if (typeof content === "string") {
      const body = document.createElement("mui-body");
      body.setAttribute("size", "large");
      body.textContent = content;
      section.appendChild(body);
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
    const ratioParts = ratio.split(":");
    if (ratioParts.length === 2) {
      const width = parseFloat(ratioParts[0]);
      const height = parseFloat(ratioParts[1]);
      if (width > 0 && height > 0) return `${width} / ${height}`;
    }
    return "16 / 9";
  }

  private resolveRatioParts() {
    const ratio = (this.getAttribute("ratio") || "16:9").trim();
    const ratioParts = ratio.split(":");
    if (ratioParts.length === 2) {
      const width = parseFloat(ratioParts[0]);
      const height = parseFloat(ratioParts[1]);
      if (width > 0 && height > 0) return { width, height };
    }
    return { width: 16, height: 9 };
  }

  private syncSections() {
    if (!this.shadowRoot) return;
    const sections = this.getSections();
    let activeIndex = this.getActiveSectionIndex();
    if (this.activeSectionEl && sections.includes(this.activeSectionEl)) {
      activeIndex = sections.indexOf(this.activeSectionEl);
    }
    activeIndex = Math.max(0, Math.min(activeIndex, Math.max(0, sections.length - 1)));
    if ((this.getAttribute("active-section") || "0") !== String(activeIndex)) {
      this.setAttribute("active-section", String(activeIndex));
    }
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
    this.activeSectionEl = sections[activeIndex] ?? null;
    this.style.setProperty("--slide-frame-ratio", this.resolveRatio());
    this.updateFullscreenSurfaceFit();
  }

  private handleArrowNavigation(event: KeyboardEvent) {
    const inNativeFullscreen = document.fullscreenElement === this;
    if (event.key === "Escape" && this.hasAttribute("present") && !inNativeFullscreen) {
      event.preventDefault();
      this.resetPresentationState();
      return;
    }
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
          --slide-frame-leading-offset: var(--space-025);
          --slide-frame-surface-padding-active: var(--slide-frame-padding-medium);
          --slide-frame-header-padding-inline: var(--slide-frame-surface-padding-active);
          --slide-frame-header-padding-block: var(--slide-frame-surface-padding-active);
          --slide-frame-header-padding-top: var(--slide-frame-header-padding-block);
          --slide-frame-header-padding-bottom: 0;
          --slide-frame-footer-padding-inline: var(--slide-frame-surface-padding-active);
          --slide-frame-footer-padding-block: var(--slide-frame-surface-padding-active);
          --slide-frame-footer-padding-top: 0;
          --slide-frame-footer-padding-bottom: var(--space-400);
        }
        :host([padding="none"]) { --slide-frame-surface-padding-active: 0; }
        :host([padding="small"]) { --slide-frame-surface-padding-active: var(--slide-frame-padding-small); }
        :host([padding="medium"]),
        :host(:not([padding])) { --slide-frame-surface-padding-active: var(--slide-frame-padding-medium); }
        :host([padding="large"]) { --slide-frame-surface-padding-active: var(--slide-frame-padding-large); }
        :host([fullscreen]) {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100dvh;
          z-index: var(--slide-frame-fullscreen-z-index, 1000);
        }
        :host([padding="none"]) .surface { padding: 0; }
        :host([padding="small"]) .surface { padding: var(--slide-frame-padding-small); }
        :host([padding="large"]) .surface { padding: var(--slide-frame-padding-large); }
        :host([padding="medium"]) .surface,
        :host(:not([padding])) .surface { padding: var(--slide-frame-padding-medium); }

        :host([variant="plain"]) .stage {
          border: none;
          border-color: transparent;
          background: transparent;
          box-shadow: none;
        }
        :host([variant="ghost"]) .stage {
          border: none;
          border-color: transparent;
          background: var(--slide-frame-background-ghost);
          box-shadow: none;
        }
        :host([radius="none"]) .stage { border-radius: 0; }
        :host([radius="small"]) .stage { border-radius: var(--slide-frame-radius-small); }
        :host([radius="medium"]) .stage { border-radius: var(--slide-frame-radius-medium); }
        :host([radius="large"]) .stage { border-radius: var(--slide-frame-radius-large); }

        .frame {
          display: grid;
          width: 100%;
          height: 100%;
          gap: 0;
          padding: var(--space-400);
          background: var(--surface-recessed-100);
          box-sizing: border-box;
        }
        :host([fullscreen]) .frame {
          width: 100%;
          min-height: 100%;
          grid-template-rows: auto minmax(0, 1fr) auto;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0;
        }
        :host(:fullscreen) .frame {
          padding: 0;
        }
        :host([has-chrome]) .frame {
          gap: var(--slide-frame-gap, var(--space-300));
        }

        .stage {
          position: relative;
          width: 100%;
          height: 100%;
          aspect-ratio: var(--slide-frame-ratio);
          border: var(--border-thin);
          border-color: var(--slide-frame-border-color);
          border-radius: var(--slide-frame-radius);
          background: var(--slide-frame-background);
          box-shadow: var(--slide-frame-shadow);
          box-sizing: border-box;
          overflow: hidden;
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
        }
        :host([fullscreen]) .stage,
        :host([present]) .stage {
          justify-self: center;
          align-self: center;
          height: 100%;
          max-height: 100%;
          width: auto;
          max-width: 100%;
        }
        :host([fullscreen]) .stage,
        :host(:fullscreen) .stage {
          border: none;
          border-radius: 0;
        }
        .surface {
          position: relative;
          width: 100%;
          min-width: 0;
          min-height: 0;
          box-sizing: border-box;
          overflow: hidden;
          display: block;
        }
        :host([scroll]) .surface {
          overflow: auto;
        }
        :host([fullscreen]) .surface,
        :host([present]) .surface {
          overflow: auto !important;
        }
        .header,
        .footer {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        .header {
          padding:
            var(--slide-frame-header-padding-top)
            var(--slide-frame-header-padding-inline)
            var(--slide-frame-header-padding-bottom);
        }
        .footer {
          padding:
            var(--slide-frame-footer-padding-top)
            var(--slide-frame-footer-padding-inline)
            var(--slide-frame-footer-padding-bottom);
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
        .footer-counter .counter-value {
          display: inline-block;
          min-width: calc(var(--slide-frame-counter-digits, 1) * 1ch);
          text-align: right;
        }
        .footer-counter::part(text) {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
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
        :host([present]) .stage {
          background: var(--slide-frame-background-present, var(--slide-frame-background));
        }
        .present-controls {
          display: grid;
        }
        :host([fullscreen]) .present-controls,
        :host(:fullscreen) .present-controls {
          display: none !important;
        }
        :host(:not([fullscreen])) #slideFrameExitPresentBtn {
          display: none !important;
        }

        ::slotted([data-slide-section][slide-hidden]) {
          display: none !important;
        }
      </style>
      <div class="frame">
        <mui-grid col="1fr auto" class="present-controls" aligny="center">
          <mui-h-stack space="var(--space-050)" aligny="center">
            <mui-button id="slideFrameAddSectionBtn" variant="tertiary" size="x-small">Add Section</mui-button>
            <mui-button id="slideFrameToggleFullscreenBtn" variant="tertiary" size="x-small">Full Screen</mui-button>
            <mui-button id="slideFrameToggleNotesBtn" variant="tertiary" size="x-small">Notes</mui-button>
          </mui-h-stack>
          <mui-h-stack space="var(--space-050)" aligny="center">
            <mui-button id="slideFramePrevSectionBtn" variant="tertiary" size="x-small"><mui-icon-left-chevron slot="before"></mui-icon-left-chevron>Previous</mui-button>
            <mui-button id="slideFrameNextSectionBtn" variant="tertiary" size="x-small">Next<mui-icon-right-chevron slot="after"></mui-icon-right-chevron></mui-button>
          </mui-h-stack>
        </mui-grid>
        <div class="stage">
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
          <div class="footer" id="footerRegion">
            <mui-v-stack class="leading leading_bottom" space="var(--space-400)">
              <mui-h-stack class="footer-main" alignx="space-between" aligny="center" space="var(--space-300)">
                <div class="footer-leading">
                  <mui-body class="footer-copy" size="small" id="footerText"${escapedFooterText ? "" : " hidden"}>${escapedFooterText}</mui-body>
                  <slot name="footer"></slot>
                </div>
                <mui-h-stack class="footer-after" alignx="end" aligny="center" space="var(--space-200)">
                  <mui-select
                    id="slideFrameRatioSelect"
                    size="x-small"
                    style="width: 7rem; margin-right: var(--space-025)"
                    options='[{"label":"16:9","value":"16:9"},{"label":"4:3","value":"4:3"},{"label":"1:1","value":"1:1"}]'
                    value="${this.getAttribute("ratio") || "16:9"}"
                    aria-label="Slide ratio">
                  </mui-select>
                  <mui-button id="slideFrameExitPresentBtn" size="x-small" variant="tertiary" hidden style="margin-right: var(--space-025)">Exit Fullscreen</mui-button>
                  <mui-body class="footer-counter" id="footerCounter" size="x-small" variant="optional" hidden>Section 1/1</mui-body>
                  <slot name="footer-after"></slot>
                </mui-h-stack>
              </mui-h-stack>
            </mui-v-stack>
          </div>
        </div>
        <div class="notes"><mui-body variant="optional" size="x-small">Notes...</mui-body><slot name="notes"></slot></div>
      </div>
    `;
    this.defaultSlot = this.shadowRoot.querySelector("slot:not([name])");
    this.defaultSlot?.addEventListener("slotchange", this.onSlotChange);
    this.headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
    this.headerAfterSlot = this.shadowRoot.querySelector('slot[name="header-after"]');
    this.headerDescriptionSlot = this.shadowRoot.querySelector('slot[name="header-description"]');
    this.footerSlot = this.shadowRoot.querySelector('slot[name="footer"]');
    this.footerAfterSlot = this.shadowRoot.querySelector('slot[name="footer-after"]');
    this.notesSlot = this.shadowRoot.querySelector('slot[name="notes"]');
    this.stageEl = this.shadowRoot.querySelector(".stage");
    this.surfaceEl = this.shadowRoot.querySelector(".surface");
    this.headerSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.headerAfterSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.headerDescriptionSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.footerSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.footerAfterSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.footerDescriptionSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.notesSlot?.addEventListener("slotchange", this.onChromeSlotChange);
    this.surfaceEl?.addEventListener("pointerdown", this.onPointerDown);
    this.surfaceEl?.addEventListener("pointerup", this.onPointerUp);
    this.style.setProperty("--slide-frame-ratio", this.resolveRatio());
    this.shadowRoot.querySelector("#notesActionBtn")?.addEventListener("click", () => {
      this.toggleNotes();
    });
    this.shadowRoot.querySelector("#slideFrameAddSectionBtn")?.addEventListener("click", () => {
      this.addSection(`Section ${(this.getSections().length + 1).toString()}`);
    });
    this.shadowRoot.querySelector("#slideFramePrevSectionBtn")?.addEventListener("click", () => {
      this.prevSection();
    });
    this.shadowRoot.querySelector("#slideFrameNextSectionBtn")?.addEventListener("click", () => {
      this.nextSection();
    });
    this.shadowRoot.querySelector("#slideFrameToggleFullscreenBtn")?.addEventListener("click", () => {
      const isActive = this.hasAttribute("fullscreen") || document.fullscreenElement === this;
      if (isActive) {
        this.resetPresentationState();
        void this.exitFullscreen();
        return;
      }
      this.setAttribute("present", "");
      this.setAttribute("fullscreen", "");
      this.syncChromeState();
      void this.enterFullscreen().then((ok) => {
        if (!ok) return;
        this.syncChromeState();
      });
    });
    this.shadowRoot.querySelector("#slideFrameExitPresentBtn")?.addEventListener("click", () => {
      this.resetPresentationState();
      void this.exitFullscreen();
    });
    this.shadowRoot.querySelector("#slideFrameToggleNotesBtn")?.addEventListener("click", () => {
      this.toggleNotes();
    });
    this.shadowRoot.querySelector("#slideFrameRatioSelect")?.addEventListener("change", (event) => {
      const target = event.currentTarget as HTMLElement & {
        value?: string;
        getAttribute?: (name: string) => string | null;
      };
      const selected = target?.value || target?.getAttribute?.("value") || "16:9";
      this.setAttribute("ratio", selected);
    });
    requestAnimationFrame(() => this.updateFullscreenSurfaceFit());
  }

  private syncChromeState() {
    if (!this.shadowRoot) return;
    const hasNodes = (slot: HTMLSlotElement | null) =>
      (slot?.assignedNodes({ flatten: true }) || []).some(
        (node) => node.nodeType === Node.ELEMENT_NODE || (node.textContent || "").trim().length > 0,
      );
    const hasHeaderTitle = Boolean((this.getAttribute("title") || "").trim());
    const hasFooterText = Boolean((this.getAttribute("footer-text") || "").trim());
    const forceHideHeader = this.hasAttribute("hide-header");
    const forceHideFooter = this.hasAttribute("hide-footer");
    const showCounter = !this.hasAttribute("hide-counter") && this.getSections().length > 0;
    const hasHeader =
      !forceHideHeader &&
      (hasHeaderTitle ||
        hasNodes(this.headerSlot) ||
        hasNodes(this.headerAfterSlot) ||
        hasNodes(this.headerDescriptionSlot));
    const hasFooter =
      !forceHideFooter &&
      (hasFooterText ||
        hasNodes(this.footerSlot) ||
        hasNodes(this.footerAfterSlot) ||
        hasNodes(this.footerDescriptionSlot) ||
        showCounter ||
        this.hasAttribute("present") ||
        this.hasAttribute("fullscreen"));
    const hasNotes = hasNodes(this.notesSlot);
    const notesVisible = this.hasAttribute("notes-open");
    const headerRegion = this.shadowRoot.querySelector<HTMLElement>("#headerRegion");
    const footerRegion = this.shadowRoot.querySelector<HTMLElement>("#footerRegion");
    const counter = this.shadowRoot.querySelector<HTMLElement>("#footerCounter");
    const exitPresent = this.shadowRoot.querySelector<HTMLElement>("#slideFrameExitPresentBtn");
    const fullscreenBtn = this.shadowRoot.querySelector<HTMLElement>("#slideFrameToggleFullscreenBtn");
    const controls = this.shadowRoot.querySelector<HTMLElement>(".present-controls");
    const addSectionBtn = this.shadowRoot.querySelector<HTMLElement>("#slideFrameAddSectionBtn");
    const addSectionRule = this.shadowRoot.querySelector<HTMLElement>("#slideFrameAddSectionRule");
    const total = Math.max(this.getSections().length, 1);
    const index = this.getActiveSectionIndex() + 1;
    if (controls) {
      const isFullscreen = this.hasAttribute("fullscreen") || document.fullscreenElement === this;
      controls.hidden = isFullscreen;
    }
    if (addSectionBtn) {
      const showAddSection = this.hasAttribute("allow-add-section");
      addSectionBtn.hidden = !showAddSection;
      addSectionBtn.style.display = showAddSection ? "" : "none";
      if (addSectionRule) addSectionRule.hidden = !showAddSection;
      if (addSectionRule) addSectionRule.style.display = showAddSection ? "" : "none";
    }
    if (counter) {
      counter.hidden = !showCounter;
      const current = Math.min(index, total);
      const digits = String(total).length;
      counter.style.setProperty("--slide-frame-counter-digits", String(digits));
      counter.setAttribute("aria-label", `Section ${current} of ${total}`);
      counter.innerHTML = `Section <span class="counter-value">${current}</span>/<span class="counter-value">${total}</span>`;
    }
    if (exitPresent) {
      exitPresent.hidden = !this.hasAttribute("fullscreen");
    }
    if (fullscreenBtn) {
      fullscreenBtn.textContent = this.hasAttribute("fullscreen") ? "Exit Fullscreen" : "Full Screen";
    }
    if (headerRegion) headerRegion.hidden = !hasHeader;
    if (footerRegion) footerRegion.hidden = !hasFooter;
    this.toggleAttribute("has-header", hasHeader);
    this.toggleAttribute("has-footer", hasFooter);
    this.toggleAttribute("has-notes", hasNotes);
    this.toggleAttribute("notes-visible", notesVisible);
    this.toggleAttribute("has-chrome", hasHeader || hasFooter || notesVisible);
    this.updateFullscreenSurfaceFit();
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

  private handleFullscreenChange() {
    const active = document.fullscreenElement === this;
    const hadFullscreenState = this.hasAttribute("fullscreen");
    if (active) {
      this.nativeFullscreenActive = true;
      this.toggleAttribute("fullscreen", true);
      this.toggleAttribute("present", true);
    } else if (this.nativeFullscreenActive || hadFullscreenState) {
      this.resetPresentationState();
    } else {
      return;
    }
    this.syncChromeState();
    this.updateFullscreenSurfaceFit();
    this.dispatchEvent(
      new CustomEvent("fullscreen-change", {
        detail: { active },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleFullscreenError() {
    this.nativeFullscreenActive = false;
    if (this.hasAttribute("fullscreen")) {
      this.resetPresentationState();
      this.dispatchEvent(new CustomEvent("fullscreen-error", { bubbles: true, composed: true }));
      return;
    }
    this.syncChromeState();
    this.dispatchEvent(new CustomEvent("fullscreen-error", { bubbles: true, composed: true }));
  }

  private updateFullscreenSurfaceFit() {
    if (!this.shadowRoot || !this.stageEl) return;
    const shouldFit = this.hasAttribute("fullscreen") || this.hasAttribute("present");
    if (!shouldFit) {
      this.stageEl.style.width = "";
      this.stageEl.style.height = "";
      return;
    }
    const frame = this.shadowRoot.querySelector<HTMLElement>(".frame");
    const controls = this.shadowRoot.querySelector<HTMLElement>(".present-controls");
    const notes = this.shadowRoot.querySelector<HTMLElement>(".notes");
    if (!frame) return;
    const frameRect = frame.getBoundingClientRect();
    const frameStyle = getComputedStyle(frame);
    const padTop = parseFloat(frameStyle.paddingTop || "0") || 0;
    const padBottom = parseFloat(frameStyle.paddingBottom || "0") || 0;
    const padLeft = parseFloat(frameStyle.paddingLeft || "0") || 0;
    const padRight = parseFloat(frameStyle.paddingRight || "0") || 0;
    const rowGap = parseFloat(frameStyle.rowGap || frameStyle.gap || "0") || 0;
    const controlsH =
      controls && getComputedStyle(controls).display !== "none" ? controls.getBoundingClientRect().height : 0;
    const notesH = notes && getComputedStyle(notes).display !== "none" ? notes.getBoundingClientRect().height : 0;
    const visibleRows = [controlsH > 0, true, notesH > 0].filter(Boolean).length;
    const gaps = Math.max(0, visibleRows - 1);
    const availableW = Math.max(0, frameRect.width - padLeft - padRight);
    const availableH = Math.max(0, frameRect.height - padTop - padBottom - controlsH - notesH - rowGap * gaps);
    const ratio = this.resolveRatioParts();
    const fitByHeight = this.hasAttribute("fullscreen") || document.fullscreenElement === this;
    let width: number;
    let height: number;
    if (fitByHeight) {
      height = availableH;
      width = height * (ratio.width / ratio.height);
    } else {
      width = availableW;
      height = width * (ratio.height / ratio.width);
      if (height > availableH) {
        height = availableH;
        width = height * (ratio.width / ratio.height);
      }
    }
    this.stageEl.style.width = `${Math.max(0, Math.floor(width))}px`;
    this.stageEl.style.height = `${Math.max(0, Math.floor(height))}px`;
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
