class MuiMenu extends HTMLElement {
  private slotElement: HTMLSlotElement | null = null;
  private topSlotElement: HTMLSlotElement | null = null;
  private bottomSlotElement: HTMLSlotElement | null = null;
  private contentElement: HTMLElement | null = null;
  private observer: MutationObserver | null = null;
  private managedFormControls = new Map<
    HTMLElement,
    Record<"size" | "menu-slot" | "padding-inline" | "surface", string | null>
  >();
  private managedInsetActions = new Set<HTMLElement>();

  static get observedAttributes() {
    return ["size", "inset", "width"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.normalizeSize();
    this.syncWidth();
    this.render();
    this.slotElement = this.shadowRoot!.querySelector("slot:not([name])");
    this.topSlotElement = this.shadowRoot!.querySelector('slot[name="top"]');
    this.bottomSlotElement = this.shadowRoot!.querySelector('slot[name="bottom"]');
    this.contentElement = this.shadowRoot!.querySelector(".content");
    this.slotElement?.addEventListener("slotchange", this.syncActions);
    this.topSlotElement?.addEventListener("slotchange", this.syncRegions);
    this.bottomSlotElement?.addEventListener("slotchange", this.syncRegions);
    this.syncActions();
    this.syncRegions();
    this.observer = new MutationObserver(this.syncActions);
    this.observer.observe(this, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["size", "hidden", "slot"],
    });
  }

  disconnectedCallback() {
    this.slotElement?.removeEventListener("slotchange", this.syncActions);
    this.topSlotElement?.removeEventListener("slotchange", this.syncRegions);
    this.bottomSlotElement?.removeEventListener("slotchange", this.syncRegions);
    this.observer?.disconnect();
    this.observer = null;
    this.managedFormControls.forEach((attributes, control) => this.restoreFormControl(control, attributes));
    this.managedFormControls.clear();
    this.managedInsetActions.forEach((action) => action.removeAttribute("menu-inset"));
    this.managedInsetActions.clear();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (name === "size") this.normalizeSize();
    if (name === "width") this.syncWidth();
    this.syncActions();
  }

  private syncWidth() {
    const width = this.getAttribute("width")?.trim();
    if (width) {
      this.style.setProperty("--menu-width-current", width);
    } else {
      this.style.removeProperty("--menu-width-current");
    }
  }

  private normalizeSize() {
    const size = this.getAttribute("size");
    if (!size || !["x-small", "small", "medium", "large"].includes(size)) {
      this.setAttribute("size", "medium");
    }
  }

  private syncRegions = () => {
    this.toggleAttribute("has-top", Boolean(this.topSlotElement?.assignedElements({ flatten: true }).length));
    this.toggleAttribute("has-bottom", Boolean(this.bottomSlotElement?.assignedElements({ flatten: true }).length));
    this.syncActions();
  };

  private restoreAttribute(control: HTMLElement, name: string, value: string | null) {
    if (value === null) {
      control.removeAttribute(name);
    } else {
      control.setAttribute(name, value);
    }
  }

  private restoreFormControl(
    control: HTMLElement,
    attributes: Record<"size" | "menu-slot" | "padding-inline" | "surface", string | null>,
  ) {
    Object.entries(attributes).forEach(([name, value]) => this.restoreAttribute(control, name, value));
  }

  private syncActions = () => {
    const size = this.getAttribute("size") || "medium";
    const compactPaddingMap: Record<string, string> = {
      "x-small": "var(--space-200)",
      small: "calc(var(--space-300) + var(--stroke-size-100))",
      medium: "calc(var(--space-400) + var(--stroke-size-300))",
      large: "calc(var(--space-500) + var(--stroke-size-100))",
    };
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
    const formControls = directChildren.filter((element): element is HTMLElement =>
      formControlTags.has(element.tagName.toLowerCase()),
    );
    const currentFormControls = new Set(formControls);
    this.managedFormControls.forEach((attributes, control) => {
      if (currentFormControls.has(control)) return;
      this.restoreFormControl(control, attributes);
      this.managedFormControls.delete(control);
    });
    const bodies = directChildren.filter(
      (element): element is HTMLElement => element.tagName.toLowerCase() === "mui-body",
    );
    const contentHasBody = bodies.some((body) => !body.hasAttribute("slot") && !body.hidden);
    this.contentElement?.toggleAttribute("has-body", contentHasBody);
    const actionEntries = directChildren.flatMap((element) => {
      const tagName = element.tagName.toLowerCase();
      if (tagName === "mui-button" || tagName === "mui-link") {
        return [{ action: element, positionElement: element }];
      }
      if (tagName !== "mui-submenu") return [];

      const action = element.querySelector<HTMLElement>(":scope > mui-button");
      return action ? [{ action, positionElement: element }] : [];
    });
    const actions = actionEntries.map(({ action }) => action);
    const currentActions = new Set(actions);
    this.managedInsetActions.forEach((action) => {
      if (currentActions.has(action)) return;
      action.removeAttribute("menu-inset");
      this.managedInsetActions.delete(action);
    });
    const firstActionIndex = actionEntries.length > 0 ? directChildren.indexOf(actionEntries[0].positionElement) : -1;
    const lastActionIndex =
      actionEntries.length > 0 ? directChildren.indexOf(actionEntries[actionEntries.length - 1].positionElement) : -1;
    const hasBufferBeforeFirstAction =
      firstActionIndex > 0 &&
      directChildren.slice(0, firstActionIndex).some((element) => {
        const tagName = element.tagName.toLowerCase();
        return element.getAttribute("slot") === "top" || tagName === "mui-body" || tagName === "mui-rule";
      });
    const hasBufferAfterLastAction =
      lastActionIndex >= 0 &&
      directChildren.slice(lastActionIndex + 1).some((element) => element.getAttribute("slot") === "bottom");
    const bodySizeMap: Record<string, string> = {
      "x-small": "xx-small",
      small: "x-small",
      medium: "small",
      large: "medium",
    };
    const bodySize = bodySizeMap[size] || "small";

    bodies.forEach((body) => {
      if (body.getAttribute("size") !== bodySize) body.setAttribute("size", bodySize);
      if (body.getAttribute("weight") !== "regular") body.setAttribute("weight", "regular");
      body.setAttribute("menu-slot", "");
      body.toggleAttribute("menu-inset", this.hasAttribute("inset"));
    });

    formControls.forEach((control) => {
      if (!this.managedFormControls.has(control)) {
        this.managedFormControls.set(control, {
          size: control.getAttribute("size"),
          "menu-slot": control.getAttribute("menu-slot"),
          "padding-inline": control.getAttribute("padding-inline"),
          surface: control.getAttribute("surface"),
        });
      }
      const originalAttributes = this.managedFormControls.get(control)!;
      if (control.getAttribute("size") !== size) control.setAttribute("size", size);

      if (!this.hasAttribute("inset")) {
        control.setAttribute("menu-slot", "");
      } else {
        this.restoreAttribute(control, "menu-slot", originalAttributes["menu-slot"]);
      }

      const slot = control.getAttribute("slot");
      const isCompact = slot === "top" || slot === "bottom";
      const tagName = control.tagName.toLowerCase();
      const supportsCompactPadding =
        tagName === "mui-input" ||
        tagName === "mui-select" ||
        tagName === "mui-date-picker" ||
        tagName === "mui-time-picker" ||
        tagName === "mui-search-input";

      if (isCompact && supportsCompactPadding) {
        control.setAttribute("padding-inline", compactPaddingMap[size] || compactPaddingMap.medium);
      } else if (supportsCompactPadding) {
        this.restoreAttribute(control, "padding-inline", originalAttributes["padding-inline"]);
      }

      if (isCompact) {
        control.setAttribute("surface", "seamless");
      } else {
        this.restoreAttribute(control, "surface", originalAttributes.surface);
      }
    });

    actions.forEach((action, index) => {
      if (action.getAttribute("size") !== size) action.setAttribute("size", size);
      if (action.getAttribute("weight") !== "regular") action.setAttribute("weight", "regular");
      if (action.getAttribute("align") !== "start") action.setAttribute("align", "start");

      if (!this.hasAttribute("inset")) {
        action.removeAttribute("menu-inset");
        this.managedInsetActions.delete(action);
        action.setAttribute("menu-slot", "");
        action.toggleAttribute("menu-slot-first", index === 0 && !hasBufferBeforeFirstAction);
        action.toggleAttribute("menu-slot-last", index === actions.length - 1 && !hasBufferAfterLastAction);
      } else {
        action.setAttribute("menu-inset", "");
        this.managedInsetActions.add(action);
        action.removeAttribute("menu-slot");
        action.removeAttribute("menu-slot-first");
        action.removeAttribute("menu-slot-last");
      }

      if (!action.hasAttribute("variant")) action.setAttribute("variant", "tertiary");
    });
  };

  private render() {
    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        :host {
          --menu-width-current: var(--menu-width);
          display: flex;
          flex-direction: column;
          gap: 0;
          min-width: var(--menu-min-width);
          width: var(--menu-width-current);
          max-width: 100%;
          box-sizing: border-box;
          border: var(--border-thin);
          border-color: var(--menu-border-color);
          border-radius: var(--menu-radius);
          background: var(--menu-background);
          box-shadow: 0 var(--space-100) var(--space-200) var(--menu-shadow-color);
          padding: 0;
        }

        :host([size="x-small"]) {
          --menu-region-radius: calc(min(var(--action-radius-x-small), var(--form-radius-x-small)) - var(--stroke-size-100));
          border-radius: min(var(--action-radius-x-small), var(--form-radius-x-small));
        }
        :host([size="small"]) {
          --menu-region-radius: calc(min(var(--action-radius-small), var(--form-radius-small)) - var(--stroke-size-100));
          border-radius: min(var(--action-radius-small), var(--form-radius-small));
        }
        :host([size="medium"]) {
          --menu-region-radius: calc(min(var(--action-radius-medium), var(--form-radius-medium)) - var(--stroke-size-100));
          border-radius: min(var(--action-radius-medium), var(--form-radius-medium));
        }
        :host([size="large"]) {
          --menu-region-radius: calc(min(var(--action-radius-large), var(--form-radius-large)) - var(--stroke-size-100));
          border-radius: min(var(--action-radius-large), var(--form-radius-large));
        }

        :host([size="x-small"][inset]) {
          --menu-inset: var(--space-025);
        }
        :host([size="small"][inset]) {
          --menu-inset: var(--space-050);
        }
        :host([size="medium"][inset]) {
          --menu-inset: var(--space-100);
        }
        :host([size="large"][inset]) {
          --menu-inset: var(--space-200);
        }

        .top,
        .bottom {
          display: none;
          flex: none;
          box-sizing: border-box;
          background: var(--menu-background);
          padding: 0;
        }

        :host([has-top]) .top,
        :host([has-bottom]) .bottom {
          display: flex;
        }

        :host([has-top]) .top {
          border-bottom: var(--border-thin);
          border-color: var(--menu-border-color);
          border-top-left-radius: var(--menu-region-radius);
          border-top-right-radius: var(--menu-region-radius);
        }

        :host([has-bottom]) .bottom {
          border-top: var(--border-thin);
          border-color: var(--menu-border-color);
          border-bottom-left-radius: var(--menu-region-radius);
          border-bottom-right-radius: var(--menu-region-radius);
        }

        .content {
          min-height: 0;
        }

        :host([inset]) .content {
          padding-block: var(--menu-inset-padding-block, var(--menu-inset));
          padding-inline: var(--menu-inset-padding-inline, var(--menu-inset));
        }

        :host([inset][size="x-small"]) .content[has-body] {
          padding-bottom: var(--space-200);
        }

        :host([inset][size="small"]) .content[has-body] {
          padding-bottom: var(--space-300);
        }

        :host([inset][size="medium"]) .content[has-body] {
          padding-bottom: var(--space-400);
        }

        :host([inset][size="large"]) .content[has-body] {
          padding-bottom: var(--space-500);
        }

        :host([inset]) ::slotted(mui-rule) {
          margin-block: var(--menu-inset);
        }

        ::slotted(mui-chip),
        ::slotted(mui-chip-input) {
          --chip-background: var(--chip-background-menu);
        }

        ::slotted(mui-button),
        ::slotted(mui-link) {
          width: 100%;
        }

        ::slotted(mui-button:focus),
        ::slotted(mui-link:focus) {
          z-index: 1;
        }
      </style>
      <div class="top"><slot name="top"></slot></div>
      <div class="content" part="content"><slot></slot></div>
      <div class="bottom"><slot name="bottom"></slot></div>
    `;
  }
}

if (!customElements.get("mui-menu")) {
  customElements.define("mui-menu", MuiMenu);
}

export { MuiMenu };
