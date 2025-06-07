class MuiCarouselController extends HTMLElement {
  private shadow: ShadowRoot;
  constructor() {
    super();
    if (!this.hasAttribute("direction")) {
      this.setAttribute("direction", "horizontal");
    }
    this.handleTabChange = this.handleTabChange.bind(this);
    this.shadow = this.attachShadow({ mode: "open" });

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

  connectedCallback() {
    this.addEventListener("tab-change", this.handleTabChange);

    // Show the initially active panel (based on tab-bar)
    const tabBar = this.querySelector("tab-bar");
    if (tabBar) {
      const activeTab = tabBar.querySelector("tab-item[active]");
      if (activeTab) {
        this.updatePanels(activeTab.id);
      }
    }
  }

  handleTabChange(event: Event) {
    const customEvent = event as CustomEvent<{ activeId: string }>;
    this.updatePanels(customEvent.detail.activeId);
  }

  updatePanels(activeId: string) {
    const panels = this.querySelectorAll("mui-carousel-panel");
    const track = this.shadow.querySelector(".carousel-track") as HTMLElement | null;

    const index = Array.from(panels).findIndex((panel) => panel.getAttribute("item") === activeId);

    if (index === -1) return;

    (track as HTMLElement).style.transform = `translateX(-${index * 100}%)`;
  }
}

customElements.define("mui-carousel-controller", MuiCarouselController);
