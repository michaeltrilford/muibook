import "../mui-avatar";
import "../mui-body";
import "../mui-link";
import "../mui-stack/hstack";
import "../mui-stack/vstack";

type ProfileChipSize = "x-small" | "small" | "medium" | "large";

const profileChipSizeConfig: Record<ProfileChipSize, { avatar: string; primary: string; secondary: string }> = {
  "x-small": {
    avatar: "x-small",
    primary: "xx-small",
    secondary: "xx-small",
  },
  small: {
    avatar: "small",
    primary: "x-small",
    secondary: "x-small",
  },
  medium: {
    avatar: "medium",
    primary: "small",
    secondary: "x-small",
  },
  large: {
    avatar: "large",
    primary: "medium",
    secondary: "small",
  },
};

type ProfileChipSizeConfig = (typeof profileChipSizeConfig)[ProfileChipSize];

class MuiProfileChip extends HTMLElement {
  static get observedAttributes() {
    return ["primary", "secondary", "image", "label", "href", "target", "usage", "size"];
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

  private escapeAttribute(value: string | null) {
    return (value || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  private escapeText(value: string | null) {
    return (value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  private getSize(): ProfileChipSize {
    const size = (this.getAttribute("size") || "medium").toLowerCase();
    return size in profileChipSizeConfig ? (size as ProfileChipSize) : "medium";
  }

  private renderAvatar(size: string) {
    const image = this.getAttribute("image");
    const label = this.getAttribute("label") || this.getAttribute("primary") || "Profile";
    const imageAttribute = image ? ` image="${this.escapeAttribute(image)}"` : "";

    return `<mui-avatar size="${size}"${imageAttribute} label="${this.escapeAttribute(label)}"></mui-avatar>`;
  }

  private syncSlottedTextSizes(sizeConfig: ProfileChipSizeConfig) {
    const applySize = (element: Element, size: string) => {
      const tagName = element.tagName.toLowerCase();

      if (tagName === "mui-body" || tagName === "mui-link") {
        element.setAttribute("size", size);
      }
    };

    const syncSlot = (slotName: "primary" | "secondary", size: string) => {
      Array.from(this.children)
        .filter((element) => element.getAttribute("slot") === slotName)
        .forEach((element) => applySize(element, size));

      const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${slotName}"]`);
      slot?.assignedElements({ flatten: true }).forEach((element) => applySize(element, size));
    };

    syncSlot("primary", sizeConfig.primary);
    syncSlot("secondary", sizeConfig.secondary);
  }

  render() {
    if (!this.shadowRoot) return;

    const primary = this.getAttribute("primary");
    const secondary = this.getAttribute("secondary");
    const label = this.getAttribute("label") || primary || "Profile";
    const href = this.getAttribute("href");
    const target = this.getAttribute("target");
    const size = this.getSize();
    const sizeConfig = profileChipSizeConfig[size];
    const targetAttribute = target ? ` target="${this.escapeAttribute(target)}"` : "";

    const avatar = this.renderAvatar(sizeConfig.avatar);

    const avatarMarkup = href
      ? /*html*/ `
          <mui-link class="avatar-action" href="${this.escapeAttribute(href)}" aria-label="Open ${this.escapeAttribute(label)} profile"${targetAttribute}>
            ${avatar}
          </mui-link>
        `
      : avatar;

    const styles = /*css*/ `
      :host {
        display: inline-flex;
        min-width: 0;
        max-width: 100%;
        --profile-chip-primary-size: ${sizeConfig.primary};
        --profile-chip-secondary-size: ${sizeConfig.secondary};
        color: var(--profile-chip-text-color, currentColor);
        --text-color: var(--profile-chip-text-color, currentColor);
        --text-color-optional: var(--profile-chip-secondary-color, var(--profile-chip-text-color, currentColor));
        --link-text-color-default: var(--profile-chip-link-color, var(--profile-chip-text-color, currentColor));
        --link-text-color-default-hover: var(--profile-chip-link-color-hover, var(--profile-chip-link-color, var(--profile-chip-text-color, currentColor)));
        --link-text-color-default-focus: var(--profile-chip-link-color-focus, var(--profile-chip-link-color, var(--profile-chip-text-color, currentColor)));
      }

      .profile-chip {
        min-width: 0;
        max-width: 100%;
      }

      .avatar-action {
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
      }

      mui-avatar {
        flex: 0 0 auto;
        border: 0;
        box-shadow: none;
      }

      .copy {
        min-width: 0;
        max-width: 100%;
      }

      :host([usage="media-player"]) mui-avatar {
        border: var(--profile-chip-avatar-border, var(--border-thin));
        box-shadow: var(--profile-chip-avatar-shadow, none);
      }

      mui-body {
        min-width: 0;
        max-width: 100%;
      }

      slot[name="primary"],
      slot[name="secondary"] {
        display: contents;
      }

      slot[name="primary"]::slotted(*),
      slot[name="secondary"]::slotted(*) {
        min-width: 0;
        max-width: 100%;
      }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <mui-h-stack class="profile-chip" space="var(--space-200)" aligny="center">
        ${avatarMarkup}
        <mui-v-stack class="copy" space="var(--space-000)">
          <slot name="primary">
            <mui-body weight="bold" size="${sizeConfig.primary}" truncate>${this.escapeText(primary)}</mui-body>
          </slot>
          <slot name="secondary">
            ${secondary ? `<mui-body weight="medium" size="${sizeConfig.secondary}" truncate>${this.escapeText(secondary)}</mui-body>` : ""}
          </slot>
        </mui-v-stack>
      </mui-h-stack>
    `;

    this.syncSlottedTextSizes(sizeConfig);

    this.shadowRoot
      .querySelector<HTMLSlotElement>('slot[name="primary"]')
      ?.addEventListener("slotchange", () => this.syncSlottedTextSizes(sizeConfig));
    this.shadowRoot
      .querySelector<HTMLSlotElement>('slot[name="secondary"]')
      ?.addEventListener("slotchange", () => this.syncSlottedTextSizes(sizeConfig));
  }
}

if (!customElements.get("mui-profile-chip")) {
  customElements.define("mui-profile-chip", MuiProfileChip);
}

export { MuiProfileChip };
