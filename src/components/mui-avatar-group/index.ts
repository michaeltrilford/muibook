import "../mui-avatar";

class MuiAvatarGroup extends HTMLElement {
  static get observedAttributes() {
    return ["size", "overlap", "label", "fan"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private syncAvatars() {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return;

    const size = this.getAttribute("size") || "";
    const avatars = slot.assignedElements({ flatten: true }).filter((element) => {
      return element.tagName.toLowerCase() === "mui-avatar";
    });

    avatars.forEach((avatar, index) => {
      if (size && !avatar.hasAttribute("size")) avatar.setAttribute("size", size);
      const avatarElement = avatar as HTMLElement;
      avatarElement.style.zIndex = String(avatars.length - index);
      avatarElement.style.marginInlineStart = index === 0 ? "0" : "var(--avatar-group-overlap)";
    });
  }

  render() {
    if (!this.shadowRoot) return;

    const size = this.getAttribute("size") || "medium";
    const overlap = this.getAttribute("overlap") || "tight";
    const label = this.getAttribute("label") || "Avatar group";

    const sizeMap: Record<string, string> = {
      "xxx-small": "var(--avatar-xxx-small)",
      "xx-small": "var(--avatar-xx-small)",
      "x-small": "var(--avatar-x-small)",
      small: "var(--avatar-small)",
      medium: "var(--avatar-medium)",
      large: "var(--avatar-large)",
    };

    const overlapMap: Record<string, string> = {
      loose: "calc(var(--avatar-group-size) * -0.2)",
      tight: "calc(var(--avatar-group-size) * -0.32)",
      compact: "calc(var(--avatar-group-size) * -0.44)",
    };

    const avatarSize = sizeMap[size] || sizeMap.medium;
    const avatarOverlap = overlapMap[overlap] || overlapMap.tight;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          --avatar-group-size: ${avatarSize};
          --avatar-group-overlap: ${avatarOverlap};
          --avatar-group-ring-color: var(--surface);
          --avatar-group-fan-overlap: var(--space-100);
          --avatar-group-transition: var(--speed-200) ease;
          display: inline-flex;
          align-items: center;
          isolation: isolate;
        }

        .group {
          display: inline-flex;
          align-items: center;
          min-height: var(--avatar-group-size);
        }

        ::slotted(mui-avatar) {
          position: relative;
          transition:
            margin-inline-start var(--avatar-group-transition),
            transform var(--avatar-group-transition),
            box-shadow var(--avatar-group-transition);
          box-shadow: 0 0 0 var(--avatar-group-ring-width, var(--stroke-size-200))
            var(--avatar-group-ring-color, var(--surface));
        }

        :host([card-slot]) {
          --avatar-group-ring-color: var(--surface-elevated-100);
        }

        :host([fan]:hover),
        :host([fan]:focus-within) {
          --avatar-group-overlap: var(--avatar-group-fan-overlap);
        }

      </style>
      <span class="group" role="group" aria-label="${label}">
        <slot></slot>
      </span>
    `;

    const slot = this.shadowRoot.querySelector("slot");
    slot?.addEventListener("slotchange", () => this.syncAvatars());
    this.syncAvatars();
  }
}

if (!customElements.get("mui-avatar-group")) {
  customElements.define("mui-avatar-group", MuiAvatarGroup);
}
