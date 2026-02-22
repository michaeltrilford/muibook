class MuiTabController extends HTMLElement {
  constructor() {
    super();
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  connectedCallback() {
    this.addEventListener("tab-change", this.handleTabChange);
    requestAnimationFrame(() => this.initializePanels());
  }

  disconnectedCallback() {
    this.removeEventListener("tab-change", this.handleTabChange);
  }

  private initializePanels(): void {
    const tabBar = this.querySelector("mui-tab-bar");
    const activeTab = tabBar?.querySelector<HTMLElement>("mui-tab-item[active]");
    const fallbackTab = tabBar?.querySelector<HTMLElement>("mui-tab-item");
    const activeId = activeTab?.id || fallbackTab?.id || "";
    this.updatePanels(activeId);
  }

  handleTabChange(event: Event): void {
    const customEvent = event as CustomEvent<{ activeId: string }>;
    const activeId = customEvent?.detail?.activeId || "";
    this.updatePanels(activeId);
  }

  updatePanels(activeId: string): void {
    const panels = Array.from(this.querySelectorAll<HTMLElement>("mui-tab-panel"));
    if (!panels.length) return;

    let targetPanel = panels.find((panel) => panel.getAttribute("item") === activeId) || null;
    if (!targetPanel) targetPanel = panels[0];

    panels.forEach((panel) => {
      const isActive = panel === targetPanel;
      panel.toggleAttribute("hidden", !isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
      panel.style.display = isActive ? "" : "none";
    });
  }
}

if (!customElements.get("mui-tab-controller")) {
  customElements.define("mui-tab-controller", MuiTabController);
}
