import "../mui-body";
import "../mui-icons/check";
import "../mui-icons/info";
import "../mui-icons/warning";
import "../mui-icons/attention";

// Type definitions
type Variant = "positive" | "info" | "warning" | "attention";
type VariantAlias = "success" | "error";
type AlertSize = "small" | "medium" | "large";

// Utility function to check if a string is a valid Variant
function isVariant(value: string): value is Variant {
  return ["positive", "info", "warning", "attention"].includes(value);
}

class MuiAlert extends HTMLElement {
  private actionSlotListener: (() => void) | null = null;
  private contentSlotListener: (() => void) | null = null;

  static get observedAttributes() {
    return ["variant", "label", "hide-label", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (
      (name === "variant" || name === "label" || name === "hide-label" || name === "size") &&
      oldValue !== newValue &&
      this.shadowRoot
    ) {
      this.render();
    }
  }

  render() {
    const rawVariant = this.getAttribute("variant") || "positive";

    const variantAliases: Record<VariantAlias, Variant> = {
      success: "positive",
      error: "attention",
    };

    const variant: Variant = isVariant(rawVariant)
      ? rawVariant
      : variantAliases[rawVariant as VariantAlias] || "positive";

    // Update the variant attribute if it was an alias
    if (rawVariant !== variant) {
      this.setAttribute("variant", variant);
      return; // Will trigger attributeChangedCallback again with correct variant
    }

    // Define aria-live mapping based on variant
    const ariaLiveMapping: Record<Variant, "polite" | "assertive"> = {
      positive: "polite",
      info: "polite",
      warning: "assertive",
      attention: "assertive",
    };

    // Apply accessibility attributes to the host element
    this.setAttribute("role", "alert");
    this.setAttribute("aria-live", ariaLiveMapping[variant] || "polite");

    const iconTags: Record<Variant, string> = {
      positive: "mui-icon-check",
      info: "mui-icon-info",
      warning: "mui-icon-warning",
      attention: "mui-icon-attention",
    };

    const iconColors: Record<Variant, string> = {
      positive: "--feedback-positive-icon",
      info: "--feedback-info-icon",
      warning: "--feedback-warning-icon",
      attention: "--feedback-attention-icon",
    };

    const labelColors: Record<Variant, string> = {
      positive: "--feedback-positive-text",
      info: "--feedback-info-text",
      warning: "--feedback-warning-text",
      attention: "--feedback-attention-text",
    };

    const labelTexts: Record<Variant, string> = {
      positive: "Success!",
      info: "Info:",
      warning: "Warning!",
      attention: "Error!",
    };

    const iconTag = iconTags[variant];
    const iconColor = iconColors[variant];
    const labelColor = labelColors[variant];
    const customLabel = this.getAttribute("label");
    const labelText = customLabel && customLabel.trim().length > 0 ? customLabel : labelTexts[variant];
    const hideLabel = this.hasAttribute("hide-label");
    const size = this.getAlertSize();
    const iconSize = size === "large" ? "medium" : "small";
    const bodySize = size === "large" ? "medium" : "small";
    const verticalPaddingTop =
      size === "large"
        ? "var(--alert-padding-large)"
        : size === "medium"
          ? "var(--alert-padding-medium)"
          : "var(--alert-padding-small)";
    const verticalPaddingBottom =
      size === "large"
        ? "var(--alert-padding-large)"
        : size === "medium"
          ? "var(--alert-padding-medium)"
          : "var(--alert-padding-small)";
    const iconVerticalPadding =
      size === "large"
        ? "var(--alert-padding-large)"
        : size === "medium"
          ? "var(--alert-padding-medium)"
          : "var(--alert-padding-small)";
    const horizontalPadding =
      size === "large"
        ? "var(--alert-padding-large)"
        : size === "medium"
          ? "var(--alert-padding-medium)"
          : "var(--alert-padding-small)";
    const horizontalGap =
      size === "large"
        ? "var(--alert-gap-horizontal-mobile)"
        : size === "medium"
          ? "var(--space-200)"
          : "var(--space-200)";
    const actionPaddingRight =
      size === "small" || size === "large" ? "var(--space-100)" : "calc(var(--space-050) + var(--space-025))";

    const styles = /*css*/ `

      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      section {
        border-radius: var(--alert-radius);
        padding-left: ${horizontalPadding};
        padding-right: ${horizontalPadding};
        background: var(--white);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: start;
        gap: ${horizontalGap};
        box-sizing: border-box;
        border: var(--feedback-${variant}-border);
        background: var(--feedback-${variant}-background);
      }

      .icon {
        padding-top: ${iconVerticalPadding};
        padding-bottom: ${iconVerticalPadding};
      }

      mui-body {
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
      }

      mui-body::part(padding) {
        padding-top: ${verticalPaddingTop};
        padding-bottom: ${verticalPaddingBottom};
      }

      section[has-action] {
        padding-right: ${actionPaddingRight};
        grid-template-columns: auto 1fr auto;
      }

      ::slotted(mui-button[slot="action"]),
      ::slotted(mui-link[slot="action"]) {
        padding-top: var(--space-100);
      }

      @media (min-width: 600px) {
        :section { gap: var(--alert-gap-horizontal-desktop); }
        :section([has-action]) { padding-right: ${actionPaddingRight}; }
        ::slotted(mui-button[slot="action"]),
        ::slotted(mui-link[slot="action"]) { align-self: center; padding-top: var(--space-000); }
      }

      .label {
        color: var(${labelColor}); 
        font-weight: var(--font-weight-bold);
      }

      mui-body::part(gap) {
        gap: var(--space-000);
      }

    `;

    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <section>
      <${iconTag} size="${iconSize}" color="var(${iconColor})" class="icon"></${iconTag}>
      <mui-body size="${bodySize}">
        ${hideLabel ? "" : `<span class="label">${labelText}</span>`}
        <slot></slot>
      </mui-body>
      <slot name="action"></slot>
      </section>
    `;

    // Re-setup action slot after rendering
    this.setupActionSlot();
    this.setupContentSlot();
  }

  private getAlertSize(): AlertSize {
    const sizeAttr = this.getAttribute("size");
    return sizeAttr === "small" || sizeAttr === "large" ? sizeAttr : "medium";
  }

  private getInlineContentSize(size: AlertSize): string {
    if (size === "small") return "small";
    if (size === "medium") return "small";
    return "medium";
  }

  private getActionControlSize(size: AlertSize): string {
    if (size === "small") return "x-small";
    if (size === "medium") return "small";
    return "medium";
  }

  setupActionSlot() {
    const actionSlot = this.shadowRoot?.querySelector('slot[name="action"]') as HTMLSlotElement | null;

    if (actionSlot) {
      // Prevent memory leaks
      if (this.actionSlotListener) {
        actionSlot.removeEventListener("slotchange", this.actionSlotListener);
      }

      const checkForAction = () => {
        const variant = this.getAttribute("variant") || "positive";
        const size = this.getAlertSize();
        const actionSize = this.getActionControlSize(size);
        const assigned = actionSlot.assignedElements();
        let hasAction = false;

        assigned.forEach((el: Element) => {
          const tag = el.tagName;
          const isActionComponent = tag === "MUI-BUTTON" || tag === "MUI-LINK";

          if (isActionComponent) {
            hasAction = true;
            el.setAttribute("variant", "tertiary");
            el.setAttribute("size", actionSize);
            if (el.hasAttribute("icon-only")) {
              const icons = Array.from(el.querySelectorAll("*")).filter((node) =>
                node.tagName.toLowerCase().startsWith("mui-icon-"),
              );
              icons.forEach((icon) => {
                icon.setAttribute("size", actionSize);
              });
            }
            el.removeAttribute("alert-slot");
            el.removeAttribute("alert-positive-slot");
            el.removeAttribute("alert-info-slot");
            el.removeAttribute("alert-warning-slot");
            el.removeAttribute("alert-attention-slot");
            el.setAttribute("alert-slot", "");
            el.setAttribute(`alert-${variant}-slot`, "");
          }
        });

        const section = this.shadowRoot?.querySelector("section");
        if (section) {
          if (hasAction) {
            section.setAttribute("has-action", "");
          } else {
            section.removeAttribute("has-action");
          }
        }
      };

      // Store reference to listener for cleanup
      this.actionSlotListener = checkForAction;
      actionSlot.addEventListener("slotchange", this.actionSlotListener);
      requestAnimationFrame(checkForAction);
    }
  }

  setupContentSlot() {
    const contentSlot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;
    if (!contentSlot) return;

    if (this.contentSlotListener) {
      contentSlot.removeEventListener("slotchange", this.contentSlotListener);
    }

    const checkForContent = () => {
      const size = this.getAlertSize();
      const inlineSize = this.getInlineContentSize(size);
      const assigned = contentSlot.assignedElements({ flatten: true });

      assigned.forEach((el) => {
        const tag = el.tagName.toLowerCase();
        const isMuiLink = tag === "mui-link";
        const isMuiBody = tag === "mui-body";

        if (isMuiLink || isMuiBody) {
          el.setAttribute("size", inlineSize);
        }
      });
    };

    this.contentSlotListener = checkForContent;
    contentSlot.addEventListener("slotchange", this.contentSlotListener);
    requestAnimationFrame(checkForContent);
  }
}

if (!customElements.get("mui-alert")) {
  customElements.define("mui-alert", MuiAlert);
}
