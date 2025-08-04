class MuiSlatGroup extends HTMLElement {
  static get observedAttributes() {
    return ["usage"];
  }

  private usage = "";
  private mutationObserver: MutationObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "usage") {
      this.usage = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.usage = this.getAttribute("usage") || "";
    this.render();
    this.observeSlotChanges();
    this.setLastInGroup();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  private observeSlotChanges() {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return;

    slot.addEventListener("slotchange", () => {
      this.setLastInGroup();
    });

    this.mutationObserver = new MutationObserver(() => {
      this.setLastInGroup();
    });

    this.mutationObserver.observe(this, { childList: true, subtree: true });
  }
  private setLastInGroup() {
    const children = Array.from(this.children) as HTMLElement[];

    const isSlat = (el: Element | undefined): el is HTMLElement => !!el && el.tagName.toLowerCase() === "mui-slat";

    const slats = children.filter(isSlat);

    // Clear classes first
    slats.forEach((el) => {
      el.classList.remove("last-in-group");
      el.classList.remove("before-header");
    });

    // Mark the last slat
    const last = slats.at(-1);
    if (last) last.classList.add("last-in-group");

    // Mark any slat directly before a header
    for (let i = 0; i < children.length - 1; i++) {
      const current = children[i];
      const next = children[i + 1];

      if (isSlat(current) && next?.tagName.toLowerCase() === "mui-slat") {
        const nextVariant = next.getAttribute("variant") || "";
        if (nextVariant === "header") {
          current.classList.add("before-header");
        }
      }
    }
  }

  render() {
    const isCard = this.usage === "card";
    const isAccordion = this.usage === "accordion";

    const SlatOffset = `
      margin-left: calc(-1 * var(--space-400));
      margin-right: calc(-1 * var(--space-400));
      width: calc(100% + (var(--space-400) * 2));
    `;

    const RuleMobileOffset = `
      margin-left: calc(-1 * var(--space-500));
      margin-right: calc(-1 * var(--space-500));
      width: calc(100% + (var(--space-500) * 2));
    `;

    const RuleDesktopOffset = `
      margin-left: calc(-1 * var(--space-600));
      margin-right: calc(-1 * var(--space-600));
      width: calc(100% + (var(--space-600) * 2));
    `;

    const styles = /*css*/ `
      :host { display: block; }

      /* Default Specific */
      ::slotted(mui-slat:not([variant])) { margin-bottom: var(--space-100) }
      ::slotted(mui-rule) { margin-top: var(--space-200); }
      ::slotted(mui-rule:first-child) { margin-top: var(--space-000);}

      /* Variant Specific */
      ::slotted(mui-slat[variant="header"]:first-child) { padding-top: var(--space-000); }

      ::slotted(mui-slat[variant="action"]),
      ::slotted(mui-slat[variant="row"]) { margin-bottom: var(--space-050); }

      /* Reset Margin Bottom If applied */
      ::slotted(mui-slat.before-header),
      ::slotted(mui-slat.last-in-group) { margin-bottom: 0 !important; }

      @media (min-width: 768px) {
        ::slotted(mui-rule) { margin-top: var(--space-400); }
      }

      ${
        isCard
          ? /*css*/ `

        /* Has Variant */
        ::slotted(mui-slat[variant]) {
          ${SlatOffset}
        }

        ::slotted(mui-rule) {
          ${RuleMobileOffset}
          margin-top: var(--space-200);
        }

        /* Reset Margin Bottom */
        ::slotted(mui-slat[variant="action"]),
        ::slotted(mui-slat[variant="row"]) {
          margin-bottom: var(--space-000);
        }

        @media (min-width: 768px) {
          ::slotted(mui-rule) {
            ${RuleDesktopOffset}
            margin-top: var(--space-400);
          }
        }
      `
          : ""
      }

      ${
        isAccordion
          ? /*css*/ `


        /* Has Variant */
        ::slotted(mui-slat[variant]) {
          ${SlatOffset}
        }

        ::slotted(mui-rule) {
          ${RuleMobileOffset}
          /* Unique spacing for accordion use */
          margin-top: var(--space-500);
          margin-bottom: var(--space-100);
        }

        @media (min-width: 768px) {
          ::slotted(mui-rule) {
            ${RuleDesktopOffset}
          }
        }
      `
          : ""
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      <slot></slot>
    `;
  }
}

if (!customElements.get("mui-slat-group")) {
  customElements.define("mui-slat-group", MuiSlatGroup);
}
