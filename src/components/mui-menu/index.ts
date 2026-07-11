class MuiMenu extends HTMLElement {
  private slotElement: HTMLSlotElement | null = null;
  private observer: MutationObserver | null = null;

  static get observedAttributes() {
    return ["size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.normalizeSize();
    this.render();
    this.slotElement = this.shadowRoot!.querySelector("slot");
    this.slotElement?.addEventListener("slotchange", this.syncActions);
    this.syncActions();
    this.observer = new MutationObserver(this.syncActions);
    this.observer.observe(this, { attributes: true, childList: true, subtree: true, attributeFilter: ["size"] });
  }

  disconnectedCallback() {
    this.slotElement?.removeEventListener("slotchange", this.syncActions);
    this.observer?.disconnect();
    this.observer = null;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name !== "size" || oldValue === newValue) return;
    this.normalizeSize();
    this.syncActions();
  }

  private normalizeSize() {
    const size = this.getAttribute("size");
    if (!size || !["x-small", "small", "medium", "large"].includes(size)) {
      this.setAttribute("size", "medium");
    }
  }

  private syncActions = () => {
    const size = this.getAttribute("size") || "medium";
    const directChildren = Array.from(this.children) as HTMLElement[];
    const formControlTags = new Set([
      "mui-input",
      "mui-select",
      "mui-date-picker",
      "mui-time-picker",
      "mui-textarea",
      "mui-search-input",
      "mui-range-input",
      "mui-chip-input",
    ]);
    const formControls = directChildren.filter(
      (element): element is HTMLElement => formControlTags.has(element.tagName.toLowerCase()),
    );
    const bodies = directChildren.filter(
      (element): element is HTMLElement => element.tagName.toLowerCase() === "mui-body",
    );
    const actions = directChildren.filter((element): element is HTMLElement => {
      const tagName = element.tagName.toLowerCase();
      return tagName === "mui-button" || tagName === "mui-link";
    });
    const firstActionIndex = actions.length > 0 ? directChildren.indexOf(actions[0]) : -1;
    const hasBodyBeforeFirstAction =
      firstActionIndex > 0 && directChildren.slice(0, firstActionIndex).some((element) => element.tagName.toLowerCase() === "mui-body");

    bodies.forEach((body) => {
      if (body.getAttribute("size") !== size) body.setAttribute("size", size);
      if (body.getAttribute("weight") !== "bold") body.setAttribute("weight", "bold");
      body.setAttribute("menu-slot", "");
    });

    formControls.forEach((control) => {
      if (control.getAttribute("size") !== size) control.setAttribute("size", size);
      control.setAttribute("menu-slot", "");
    });

    actions.forEach((action, index) => {
      if (action.getAttribute("size") !== size) action.setAttribute("size", size);
      action.setAttribute("menu-slot", "");
      action.toggleAttribute("menu-slot-first", index === 0 && !hasBodyBeforeFirstAction);
      action.toggleAttribute("menu-slot-last", index === actions.length - 1);
      if (!action.hasAttribute("variant")) action.setAttribute("variant", "tertiary");
    });
  };

  private render() {
    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: var(--menu-min-width);
          box-sizing: border-box;
          border: var(--border-thin);
          border-color: var(--menu-border-color);
          border-radius: var(--menu-radius);
          background: var(--menu-background);
          box-shadow: 0 var(--space-100) var(--space-200) var(--menu-shadow-color);
          padding: 1px;
        }

        :host([size="x-small"]) { border-radius: min(var(--action-radius-x-small), var(--form-radius-x-small)); }
        :host([size="small"]) { border-radius: min(var(--action-radius-small), var(--form-radius-small)); }
        :host([size="medium"]) { border-radius: min(var(--action-radius-medium), var(--form-radius-medium)); }
        :host([size="large"]) { border-radius: min(var(--action-radius-large), var(--form-radius-large)); }

        :host([size="x-small"]) ::slotted(mui-input),
        :host([size="x-small"]) ::slotted(mui-select),
        :host([size="x-small"]) ::slotted(mui-date-picker),
        :host([size="x-small"]) ::slotted(mui-time-picker),
        :host([size="x-small"]) ::slotted(mui-textarea),
        :host([size="x-small"]) ::slotted(mui-search-input),
        :host([size="x-small"]) ::slotted(mui-range-input),
        :host([size="x-small"]) ::slotted(mui-chip-input),
        :host([size="small"]) ::slotted(mui-input),
        :host([size="small"]) ::slotted(mui-select),
        :host([size="small"]) ::slotted(mui-date-picker),
        :host([size="small"]) ::slotted(mui-time-picker),
        :host([size="small"]) ::slotted(mui-textarea),
        :host([size="small"]) ::slotted(mui-search-input),
        :host([size="small"]) ::slotted(mui-range-input),
        :host([size="small"]) ::slotted(mui-chip-input) {
          padding: var(--space-050);
          box-sizing: border-box;
        }

        :host([size="medium"]) ::slotted(mui-input),
        :host([size="medium"]) ::slotted(mui-select),
        :host([size="medium"]) ::slotted(mui-date-picker),
        :host([size="medium"]) ::slotted(mui-time-picker),
        :host([size="medium"]) ::slotted(mui-textarea),
        :host([size="medium"]) ::slotted(mui-search-input),
        :host([size="medium"]) ::slotted(mui-range-input),
        :host([size="medium"]) ::slotted(mui-chip-input) {
          padding: var(--space-100);
          box-sizing: border-box;
        }

        :host([size="large"]) ::slotted(mui-input),
        :host([size="large"]) ::slotted(mui-select),
        :host([size="large"]) ::slotted(mui-date-picker),
        :host([size="large"]) ::slotted(mui-time-picker),
        :host([size="large"]) ::slotted(mui-textarea),
        :host([size="large"]) ::slotted(mui-search-input),
        :host([size="large"]) ::slotted(mui-range-input),
        :host([size="large"]) ::slotted(mui-chip-input) {
          padding: var(--space-200);
          box-sizing: border-box;
        }

        ::slotted(mui-button),
        ::slotted(mui-link) {
          width: 100%;
          text-align: left;
        }

        ::slotted(mui-button:focus),
        ::slotted(mui-link:focus) {
          z-index: 1;
        }
      </style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-menu")) {
  customElements.define("mui-menu", MuiMenu);
}

export { MuiMenu };
