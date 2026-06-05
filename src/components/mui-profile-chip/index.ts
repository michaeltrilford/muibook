import "../mui-avatar";
import "../mui-body";
import "../mui-link";
import "../mui-responsive";
import "../mui-stack/hstack";
import "../mui-stack/vstack";

class MuiProfileChip extends HTMLElement {
  static get observedAttributes() {
    return ["primary", "secondary", "image", "label", "href", "target", "usage", "breakpoint"];
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

  private renderAvatar(size: "medium" | "small") {
    const image = this.getAttribute("image");
    const label = this.getAttribute("label") || this.getAttribute("primary") || "Profile";
    const imageAttribute = image ? ` image="${this.escapeAttribute(image)}"` : "";

    return `<mui-avatar slot="${size === "medium" ? "showAbove" : "showBelow"}" size="${size}"${imageAttribute} label="${this.escapeAttribute(label)}"></mui-avatar>`;
  }

  render() {
    if (!this.shadowRoot) return;

    const primary = this.getAttribute("primary");
    const secondary = this.getAttribute("secondary");
    const label = this.getAttribute("label") || primary || "Profile";
    const href = this.getAttribute("href");
    const target = this.getAttribute("target");
    const breakpoint = this.getAttribute("breakpoint") || "700";
    const targetAttribute = target ? ` target="${this.escapeAttribute(target)}"` : "";

    const avatar = /*html*/ `
      <mui-responsive class="avatar-responsive" breakpoint="${this.escapeAttribute(breakpoint)}">
        ${this.renderAvatar("medium")}
        ${this.renderAvatar("small")}
      </mui-responsive>
    `;

    const avatarMarkup = href
      ? /*html*/ `
          <mui-link class="avatar-action" href="${this.escapeAttribute(href)}" aria-label="Open ${this.escapeAttribute(label)} profile"${targetAttribute}>
            ${avatar}
          </mui-link>
        `
      : /*html*/ `<span class="avatar-static">${avatar}</span>`;

    const styles = /*css*/ `
      :host {
        display: inline-flex;
        min-width: 0;
        max-width: 100%;
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

      .avatar-action,
      .avatar-static,
      .avatar-responsive {
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
      }

      .copy {
        min-width: 0;
        max-width: 100%;
      }

      mui-avatar {
        border: 0;
        box-shadow: none;
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
        display: block;
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
            <mui-body weight="bold" truncate>${this.escapeText(primary)}</mui-body>
          </slot>
          <slot name="secondary">
            ${secondary ? `<mui-body weight="medium" size="small" truncate>${this.escapeText(secondary)}</mui-body>` : ""}
          </slot>
        </mui-v-stack>
      </mui-h-stack>
    `;
  }
}

if (!customElements.get("mui-profile-chip")) {
  customElements.define("mui-profile-chip", MuiProfileChip);
}

export { MuiProfileChip };
