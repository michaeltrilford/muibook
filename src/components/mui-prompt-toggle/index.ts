class MuiPromptToggle extends HTMLElement {
  static get observedAttributes() {
    return ["mode"];
  }

  private observer: MutationObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("mode")) this.setAttribute("mode", "icon");
    this.observer = new MutationObserver(() => this.syncMode());
    this.observer.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
    this.render();
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name !== "mode" || oldValue === newValue) return;
    this.syncMode();
  }

  private normalizeMode() {
    return this.getAttribute("mode") === "chip" ? "chip" : "icon";
  }

  private syncMode() {
    const mode = this.normalizeMode();
    const toggleNodes = Array.from(this.querySelectorAll('[slot="toggle"], [context-toggle]')) as HTMLElement[];
    const activeNodes = Array.from(
      this.querySelectorAll(
        '[slot="active"], [context-active], [context-close], [slot="chip"], [context-chip], [slot="spinner"], [context-spinner]',
      ),
    ) as HTMLElement[];
    toggleNodes.forEach((node) => {
      const show = mode === "icon";
      node.toggleAttribute("hidden", !show);
      node.style.display = show ? "" : "none";
    });
    activeNodes.forEach((node) => {
      const show = mode === "chip";
      node.toggleAttribute("hidden", !show);
      node.style.display = show ? "" : "none";
    });
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
        }
      </style>
      <slot></slot>
    `;
    this.syncMode();
  }
}

if (!customElements.get("mui-prompt-toggle")) {
  customElements.define("mui-prompt-toggle", MuiPromptToggle);
}
