class MuiCarouselController extends HTMLElement {
  private shadow: ShadowRoot;
  private autoRotateInterval?: number;
  private currentIndex: number = 0;

  // Add these bound methods
  private boundMouseEnter = () => this.pauseAutoRotate();
  private boundMouseLeave = () => this.resumeAutoRotate();
  private boundFocusIn = () => this.pauseAutoRotate();
  private boundFocusOut = () => this.resumeAutoRotate();

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

    // Show the initially active panel (based on tab-bar)
    const tabBar = this.querySelector("tab-bar");
    if (tabBar) {
      const activeTab = tabBar.querySelector("tab-item[active]");
      if (activeTab) {
        this.updatePanels(activeTab.id);
      } else {
        // No active tab? Activate the first one
        const firstTab = tabBar.querySelector("tab-item");
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
    console.log("🔄 rotateNext called, panels:", panels.length, "currentIndex:", this.currentIndex);

    if (panels.length === 0) return;

    this.currentIndex = (this.currentIndex + 1) % panels.length;
    const nextPanel = panels[this.currentIndex];
    const itemId = nextPanel.getAttribute("item");

    console.log("➡️ Rotating to index:", this.currentIndex, "itemId:", itemId);

    if (itemId) {
      // Directly update the carousel without touching tab bar
      // (let updatePanels handle everything)
      this.updatePanels(itemId);

      // THEN sync tab bar (don't trigger tab-change event)
      const tabBar = this.querySelector("tab-bar");
      if (tabBar) {
        const tabItem = tabBar.querySelector(`tab-item#${itemId}`);
        if (tabItem) {
          // Silently update without triggering events
          tabBar.querySelectorAll("tab-item").forEach((tab) => {
            tab.removeAttribute("active");
          });
          tabItem.setAttribute("active", "");
        }
      }
    }
  }

  render() {
    this.shadow.innerHTML = /*html*/ `
    <style>
      :host {
        display: block;
        overflow: hidden;
        position: relative;
        background: var(--carousel-background);
        border-radius: var(--carousel-radius);
      }
  
      .panel-slot {
        width: 100%;
        height: 100%;
        overflow: hidden;
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
        z-index: 10;
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
