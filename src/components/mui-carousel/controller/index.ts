import { applySurfaceUsage } from "../../../utils/surface-usage";

class MuiCarouselController extends HTMLElement {
  private shadow: ShadowRoot;
  private autoRotateInterval?: number;
  private currentIndex: number = 0;
  private pointerId?: number;
  private pointerType = "";
  private pointerStartX = 0;
  private pointerStartY = 0;
  private isDragging = false;

  // Add these bound methods
  private boundMouseEnter = () => this.pauseAutoRotate();
  private boundMouseLeave = () => this.resumeAutoRotate();
  private boundFocusIn = () => this.pauseAutoRotate();
  private boundFocusOut = () => this.resumeAutoRotate();
  private boundPointerDown = (event: PointerEvent) => this.handlePointerDown(event);
  private boundPointerMove = (event: PointerEvent) => this.handlePointerMove(event);
  private boundPointerUp = (event: PointerEvent) => this.handlePointerEnd(event);
  private boundPointerCancel = (event: PointerEvent) => this.handlePointerEnd(event, true);
  private boundLostPointerCapture = (event: PointerEvent) => this.handlePointerEnd(event, true);
  private boundWindowBlur = () => this.cancelPointerInteraction();
  private boundDragStart = (event: DragEvent) => {
    if (this.getAttribute("swipe") !== "none") event.preventDefault();
  };

  static get observedAttributes() {
    return ["auto-rotate", "rotate-interval"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  connectedCallback() {
    // Set default attribute if missing
    if (!this.hasAttribute("direction")) {
      this.setAttribute("direction", "horizontal");
    }

    // Render template and styles
    this.render();

    this.addEventListener("tab-change", this.handleTabChange);
    applySurfaceUsage(this);

    // Show the initially active panel (based on tab-bar)
    const tabBar = this.querySelector("mui-tab-bar");
    if (tabBar) {
      const activeTab = tabBar.querySelector("mui-tab-item[active]");
      if (activeTab) {
        this.updatePanels(activeTab.id);
      } else {
        // No active tab? Activate the first one
        const firstTab = tabBar.querySelector("mui-tab-item");
        if (firstTab) {
          firstTab.setAttribute("active", "");
          this.updatePanels(firstTab.id);
        }
      }
    }

    // Pause on hover/focus (use bound methods)
    this.addEventListener("mouseenter", this.boundMouseEnter);
    this.addEventListener("mouseleave", this.boundMouseLeave);
    this.addEventListener("focusin", this.boundFocusIn);
    this.addEventListener("focusout", this.boundFocusOut);
    this.addEventListener("dragstart", this.boundDragStart);
    const panelSlot = this.shadow.querySelector<HTMLElement>(".panel-slot");
    panelSlot?.addEventListener("pointerdown", this.boundPointerDown);
    panelSlot?.addEventListener("pointermove", this.boundPointerMove);
    panelSlot?.addEventListener("pointerup", this.boundPointerUp);
    panelSlot?.addEventListener("pointercancel", this.boundPointerCancel);
    panelSlot?.addEventListener("lostpointercapture", this.boundLostPointerCapture);
    window.addEventListener("blur", this.boundWindowBlur);

    // Wait for slotted content to render, then start auto-rotate
    if (this.hasAttribute("auto-rotate")) {
      // Use IntersectionObserver to wait until carousel is visible
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();

          // Give extra time for content to fully render
          setTimeout(() => {
            const track = this.shadow.querySelector(".carousel-track") as HTMLElement;
            if (track && track.offsetWidth > 0) {
              this.startAutoRotate();
            }
          }, 300);
        }
      });

      observer.observe(this);
    }
  }

  disconnectedCallback() {
    this.stopAutoRotate();
    this.removeEventListener("mouseenter", this.boundMouseEnter);
    this.removeEventListener("mouseleave", this.boundMouseLeave);
    this.removeEventListener("focusin", this.boundFocusIn);
    this.removeEventListener("focusout", this.boundFocusOut);
    this.removeEventListener("dragstart", this.boundDragStart);
    const panelSlot = this.shadow.querySelector<HTMLElement>(".panel-slot");
    panelSlot?.removeEventListener("pointerdown", this.boundPointerDown);
    panelSlot?.removeEventListener("pointermove", this.boundPointerMove);
    panelSlot?.removeEventListener("pointerup", this.boundPointerUp);
    panelSlot?.removeEventListener("pointercancel", this.boundPointerCancel);
    panelSlot?.removeEventListener("lostpointercapture", this.boundLostPointerCapture);
    window.removeEventListener("blur", this.boundWindowBlur);
    this.cancelPointerInteraction();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === "auto-rotate") {
      if (newValue !== null) {
        this.startAutoRotate();
      } else {
        this.stopAutoRotate();
      }
    }

    if (name === "rotate-interval" && this.hasAttribute("auto-rotate")) {
      this.stopAutoRotate();
      this.startAutoRotate();
    }
  }

  private startAutoRotate() {
    // Stop any existing interval first
    this.stopAutoRotate();

    const interval = parseInt(this.getAttribute("rotate-interval") || "10000");

    console.log("🎠 Starting auto-rotate with interval:", interval);

    this.autoRotateInterval = window.setInterval(() => {
      this.rotateNext();
    }, interval);
  }

  private stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = undefined;
    }
  }

  private pauseAutoRotate() {
    this.stopAutoRotate();
  }

  private resumeAutoRotate() {
    if (this.hasAttribute("auto-rotate")) {
      this.startAutoRotate();
    }
  }

  private rotateNext() {
    const panels = this.querySelectorAll("mui-carousel-panel");
    if (panels.length === 0) return;

    this.activateIndex((this.currentIndex + 1) % panels.length);
  }

  private isInteractiveTarget(event: PointerEvent): boolean {
    return event.composedPath().some((target) => {
      if (!(target instanceof Element)) return false;
      return target.matches(
        'a, button, input, select, textarea, summary, [contenteditable="true"], mui-button, mui-link, mui-input, mui-select, mui-textarea, mui-search-input, mui-range-input, mui-switch, mui-checkbox, mui-radio',
      );
    });
  }

  private handlePointerDown(event: PointerEvent): void {
    if (this.getAttribute("swipe") === "none" || !event.isPrimary || event.button !== 0 || this.isInteractiveTarget(event)) {
      return;
    }

    this.pointerId = event.pointerId;
    this.pointerType = event.pointerType;
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;
    this.isDragging = false;
  }

  private handlePointerMove(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId) return;

    const deltaX = event.clientX - this.pointerStartX;
    const deltaY = event.clientY - this.pointerStartY;

    if (!this.isDragging) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 4) return;
      if (Math.abs(deltaY) > Math.abs(deltaX) * 1.25) {
        this.resetPointer();
        return;
      }

      this.isDragging = true;
      this.setAttribute("dragging", "");
      document.getSelection()?.removeAllRanges();
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      this.pauseAutoRotate();
    }

    event.preventDefault();
    const track = this.shadow.querySelector(".carousel-track") as HTMLElement | null;
    const panels = this.querySelectorAll("mui-carousel-panel");
    if (!track || panels.length === 0) return;

    const width = track.getBoundingClientRect().width;
    const atStart = this.currentIndex === 0 && deltaX > 0;
    const atEnd = this.currentIndex === panels.length - 1 && deltaX < 0;
    const resistedDelta = atStart || atEnd ? deltaX * 0.3 : deltaX;
    track.style.transition = "none";
    track.style.transform = `translateX(${-(this.currentIndex * width) + resistedDelta}px)`;
  }

  private handlePointerEnd(event: PointerEvent, cancelled = false): void {
    if (event.pointerId !== this.pointerId) return;

    const wasDragging = this.isDragging;
    const pointerType = this.pointerType;
    const deltaX = event.clientX - this.pointerStartX;
    const track = this.shadow.querySelector(".carousel-track") as HTMLElement | null;
    const panels = this.querySelectorAll("mui-carousel-panel");

    this.resetPointer();
    if (!wasDragging || !track || panels.length === 0) return;

    if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
      (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    }

    track.style.removeProperty("transition");
    void track.offsetWidth;

    const shouldAdvance = !cancelled && Math.abs(deltaX) >= 4;
    const direction = deltaX < 0 ? 1 : -1;
    const nextIndex = shouldAdvance
      ? Math.min(Math.max(this.currentIndex + direction, 0), panels.length - 1)
      : this.currentIndex;

    this.activateIndex(nextIndex);
    if (pointerType !== "mouse") this.resumeAutoRotate();
  }

  private resetPointer(): void {
    this.pointerId = undefined;
    this.pointerType = "";
    this.isDragging = false;
    this.removeAttribute("dragging");
  }

  private cancelPointerInteraction(): void {
    if (this.pointerId === undefined) return;

    const pointerId = this.pointerId;
    const pointerType = this.pointerType;
    const wasDragging = this.isDragging;
    const panelSlot = this.shadow.querySelector<HTMLElement>(".panel-slot");
    const track = this.shadow.querySelector<HTMLElement>(".carousel-track");

    this.resetPointer();
    if (panelSlot?.hasPointerCapture(pointerId)) panelSlot.releasePointerCapture(pointerId);

    if (wasDragging && track) {
      track.style.removeProperty("transition");
      void track.offsetWidth;
      this.activateIndex(this.currentIndex);
    }

    if (pointerType !== "mouse") this.resumeAutoRotate();
  }

  private activateIndex(index: number): void {
    const panels = this.querySelectorAll("mui-carousel-panel");
    const panel = panels[index];
    const itemId = panel?.getAttribute("item");
    if (!itemId) return;

    const tabBar = this.querySelector("mui-tab-bar") as (HTMLElement & {
      setActiveTab?: (tab: HTMLElement) => void;
    }) | null;
    const tabItem = tabBar?.querySelector<HTMLElement>(`mui-tab-item#${CSS.escape(itemId)}`);

    if (tabBar?.setActiveTab && tabItem) {
      tabBar.setActiveTab(tabItem);
      return;
    }

    this.updatePanels(itemId);
    tabBar?.querySelectorAll("mui-tab-item").forEach((tab) => {
      tab.toggleAttribute("active", tab.id === itemId);
    });
  }

  render() {
    this.shadow.innerHTML = /*html*/ `
    <style>
      :host {
        display: block;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        background: var(--carousel-background);
        border: var(--border-thin);
        border-color: var(--border-color);
        border-radius: var(--carousel-radius);
      }

      :host([borderless]) {
        border: none;
      }

      :host([radius="none"]) {
        border-radius: var(--radius-000);
      }
  
      .panel-slot {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      :host(:not([swipe="none"])) .panel-slot {
        touch-action: pan-y;
        cursor: grab;
      }

      :host([dragging]) .panel-slot {
        cursor: grabbing;
      }

      :host([dragging]),
      :host([dragging]) .panel-slot,
      :host([dragging]) .carousel-track,
      :host([dragging]) ::slotted([slot="item"]) {
        user-select: none;
        -webkit-user-select: none;
      }
  
      .carousel-track {
        display: grid;
        transition: transform var(--speed-400) ease-in-out;
        width: 100%;
        height: 100%;
        grid-auto-flow: column;
        grid-auto-columns: 100%;
      }
  
      ::slotted([slot="item"]) { width: 100%; height: 100%; }
      .controls { display: flex; }


      /* Base positioning for all control slots */
      ::slotted([slot="controls"]) {
        position: absolute;
        z-index: 1;
      }

      ::slotted([slot="controls"][controlsPosition="top"]) {
        top: var(--carousel-tab-position);
        left: 50%;
        transform: translateX(-50%);
      }

      ::slotted([slot="controls"][controlsPosition="right"]) {
        top: 50%;
        right: var(--carousel-tab-position);
        transform: translateY(-50%);
      }

      ::slotted([slot="controls"][controlsPosition="bottom"]) {
        bottom: var(--carousel-tab-position);
        left: 50%;
        transform: translateX(-50%);
      }
        
      ::slotted([slot="controls"][controlsPosition="left"]) {
        top: 50%;
        left: var(--carousel-tab-position);
        transform: translateY(-50%);
      }

      ::slotted([slot="controls"][controlsPosition="top-left"]) {
        top: var(--carousel-tab-position);
        left: var(--carousel-tab-position);
      }

      ::slotted([slot="controls"][controlsPosition="top-right"]) {
        top: var(--carousel-tab-position);
        right: var(--carousel-tab-position);
      }

      ::slotted([slot="controls"][controlsPosition="bottom-right"]) {
        bottom: var(--carousel-tab-position);
        right: var(--carousel-tab-position);
      }

      ::slotted([slot="controls"][controlsPosition="bottom-left"]) {
        bottom: var(--carousel-tab-position);
        left: var(--carousel-tab-position);
      }

      /* Fallback (bottom-center) if no controlsPosition specified */
      ::slotted([slot="controls"]:not([controlsPosition])) {
        bottom: var(--carousel-tab-position);
        left: 50%;
        transform: translateX(-50%);
      }

    </style>
  
    <slot name="controls"></slot>
    <div class="panel-slot">
      <div class="carousel-track">
        <slot name="item"></slot>
      </div>
    </div>
  `;
  }

  handleTabChange(event: Event) {
    const customEvent = event as CustomEvent<{ activeId: string }>;
    this.updatePanels(customEvent.detail.activeId);
  }

  updatePanels(activeId: string) {
    const panels = this.querySelectorAll("mui-carousel-panel");
    const track = this.shadow.querySelector(".carousel-track") as HTMLElement | null;

    console.log("🎯 updatePanels called with:", activeId);

    if (!track) {
      console.error("❌ Track element not found!");
      return;
    }

    const index = Array.from(panels).findIndex((panel) => panel.getAttribute("item") === activeId);

    if (index === -1) {
      console.warn("⚠️ Panel not found for:", activeId);
      return;
    }

    // Update currentIndex to stay in sync
    this.currentIndex = index;

    const newTransform = `translateX(-${index * 100}%)`;
    console.log("🎬 Setting transform to:", newTransform);
    console.log("📏 Current transform:", track.style.transform);
    console.log("🎨 Current transition:", window.getComputedStyle(track).transition);

    track.style.transform = newTransform;

    // Force reflow to ensure transition happens
    void track.offsetHeight;

    console.log("✅ After setting transform:", track.style.transform);
  }
}

if (!customElements.get("mui-carousel-controller")) {
  customElements.define("mui-carousel-controller", MuiCarouselController);
}
