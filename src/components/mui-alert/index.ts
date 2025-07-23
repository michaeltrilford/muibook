import "../mui-body";
import "../mui-icons/check";
import "../mui-icons/info";
import "../mui-icons/warning";
import "../mui-icons/attention";

// Type definitions
type Variant = "positive" | "info" | "warning" | "attention";
type VariantAlias = "success" | "error";

// Utility function to check if a string is a valid Variant
function isVariant(value: string): value is Variant {
  return ["positive", "info", "warning", "attention"].includes(value);
}

class MuiAlert extends HTMLElement {
  static get observedAttributes() {
    return ["variant"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const rawVariant = this.getAttribute("variant") || "positive";

    const variantAliases: Record<VariantAlias, Variant> = {
      success: "positive",
      error: "attention",
    };

    const variant: Variant = isVariant(rawVariant)
      ? rawVariant
      : variantAliases[rawVariant as VariantAlias] || "positive";

    this.setAttribute("variant", variant);

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

    this.setAttribute("aria-live", ariaLiveMapping[variant]);
    const iconTag = iconTags[variant];
    const iconColor = iconColors[variant];
    const labelColor = labelColors[variant];
    const labelText = labelTexts[variant];

    const styles = /*css*/ `
      :host {
        border-radius: var(--alert-radius);
        padding-left: var(--alert-padding);
        padding-right: var(--alert-padding);
        background: var(--white);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: start;
        gap: var(--alert-gap-horizontal-mobile);
        box-sizing: border-box;
      }

      .icon,
      mui-body {
        padding-top: var(--alert-padding);
        padding-bottom: var(--alert-padding);
      }

      :host([has-action]) {
        padding-right: var(--space-100);
        grid-template-columns: auto 1fr auto;
      }

      ::slotted(mui-button[slot="action"]),
      ::slotted(mui-link[slot="action"]) { padding-top: var(--space-100); }


      @media (min-width: 600px) {
        :host { gap: var(--alert-gap-horizontal-desktop); }
        :host([has-action]) { padding-right: var(--space-100); }
        ::slotted(mui-button[slot="action"]),
        ::slotted(mui-link[slot="action"]) { align-self: center; padding-top: var(--space-000); }
      }

      .label {
        color: var(${labelColor}); 
        font-weight: var(--font-weight-bold);
      }

      mui-body::part(display) {
        display: inline;
      }

      mui-body::part(gap) {
        gap: var(--space-000);
      }

      ${["positive", "info", "warning", "attention"]
        .map(
          (v) => /*css*/ `
        :host([variant="${v}"]) {
          border: var(--feedback-${v}-border);
          background: var(--feedback-${v}-background);
        }
      `
        )
        .join("")}
    `;

    // Add the feedback states to body
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <${iconTag} size="small" color="var(${iconColor})" class="icon"></${iconTag}>
      <mui-body>
        <span class="label">${labelText}</span>
        <slot></slot>
      </mui-body>
      <slot name="action"></slot>
    `;

    const actionSlot = this.shadowRoot?.querySelector('slot[name="action"]') as HTMLSlotElement | null;

    if (actionSlot) {
      const checkForAction = () => {
        const assigned = actionSlot.assignedElements();
        let hasAction = false;

        assigned.forEach((el: Element) => {
          const tag = el.tagName;

          const isActionComponent = tag === "MUI-BUTTON" || tag === "MUI-LINK";

          if (isActionComponent) {
            hasAction = true;
            el.setAttribute("variant", "tertiary");
            el.classList.add("alert-slot", `alert-${variant}-slot`);
          }
        });

        if (hasAction) {
          this.setAttribute("has-action", "");
        } else {
          this.removeAttribute("has-action");
        }
      };

      actionSlot.addEventListener("slotchange", checkForAction);
      requestAnimationFrame(checkForAction); // Run once on init
    }
  }
}

if (!customElements.get("mui-alert")) {
  customElements.define("mui-alert", MuiAlert);
}
