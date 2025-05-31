class TabController extends HTMLElement {
  constructor() {
    super();
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  connectedCallback() {
    this.addEventListener("tab-change", this.handleTabChange);

    // Initialize visibility based on currently active tab-item
    const tabBar = this.querySelector("mui-tab-bar");
    if (tabBar) {
      const activeTab = tabBar.querySelector("mui-tab-item[active]");
      if (activeTab) this.updatePanels(activeTab.id);
    }
  }

  handleTabChange(event: Event): void {
    const customEvent = event as CustomEvent<{ activeId: string }>;
    this.updatePanels(customEvent.detail.activeId);
  }

  updatePanels(activeId: string): void {
    const panels = this.querySelectorAll<HTMLElement>("mui-tab-panel");
    panels.forEach((panel) => {
      if (panel.getAttribute("item") === activeId) {
        panel.style.display = ""; // or block/flex depending on your styling
      } else {
        panel.style.display = "none";
      }
    });
  }
}

customElements.define("mui-tab-controller", TabController);
