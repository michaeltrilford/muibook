import "../mui-badge";
import "../mui-body";
import "../mui-button";
import "../mui-icons/close";
import "../mui-stack/vstack";
import { getPartMap } from "../../utils/part-map";

class MuiPromptPreview extends HTMLElement {
  static get observedAttributes() {
    return [
      "value",
      "badge",
      "label",
      "accent",
      "bg-image",
      "image-tint",
      "inverted",
      "badge-only",
      "show-text",
      "animated",
      "animation-mode",
      "variant",
      "clickable",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  private onDismiss = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    const dismissed = this.dispatchEvent(
      new CustomEvent("dismiss", {
        detail: {
          id: this.id || "",
          value: this.getAttribute("value") || "",
          label: this.getAttribute("label") || "Pasted Content",
          badge: this.getAttribute("badge") || this.getBadge(this.getAttribute("value") || ""),
          bgImage: this.getAttribute("bg-image") || "",
          imageTint: this.getAttribute("image-tint") || "",
        },
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );
    if (dismissed) this.remove();
  };

  private onOpenPreview = (event: Event) => {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("prompt-preview-open", {
        detail: {
          id: this.id || "",
          value: this.getAttribute("value") || "",
          label: this.getAttribute("label") || "Pasted Content",
          badge: this.getAttribute("badge") || this.getBadge(this.getAttribute("value") || ""),
          bgImage: this.getAttribute("bg-image") || "",
          imageTint: this.getAttribute("image-tint") || "",
        },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onKeyOpenPreview = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const path = event.composedPath();
    const fromDismissAction = path.some((node) => {
      return node instanceof HTMLElement && node.classList?.contains("dismiss-action");
    });
    if (fromDismissAction) return;
    event.preventDefault();
    this.onOpenPreview(event);
  };

  get value() {
    return this.getAttribute("value") || "";
  }
  set value(val: string) {
    this.setAttribute("value", val ?? "");
  }

  get badge() {
    return this.getAttribute("badge") || "";
  }
  set badge(val: string) {
    if (val == null || val === "") this.removeAttribute("badge");
    else this.setAttribute("badge", val);
  }

  get label() {
    return this.getAttribute("label") || "";
  }
  set label(val: string) {
    if (val == null || val === "") this.removeAttribute("label");
    else this.setAttribute("label", val);
  }

  get accent() {
    return this.getAttribute("accent") || "";
  }
  set accent(val: string) {
    if (val == null || val === "") this.removeAttribute("accent");
    else this.setAttribute("accent", val);
  }

  get bgImage() {
    return this.getAttribute("bg-image") || "";
  }
  set bgImage(val: string) {
    if (val == null || val === "") this.removeAttribute("bg-image");
    else this.setAttribute("bg-image", val);
  }

  get imageTint() {
    return this.getAttribute("image-tint") || "";
  }
  set imageTint(val: string) {
    if (val == null || val === "") this.removeAttribute("image-tint");
    else this.setAttribute("image-tint", val);
  }

  connectedCallback() {
    this.applyAnimationDelayOffset();
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
  }

  private getBadge(value: string) {
    const explicit = this.getAttribute("badge");
    if (explicit) return explicit;
    const trimmed = value.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "JSON";
    if (/\{[\s\S]*\}/.test(trimmed) && /:/.test(trimmed)) return "CSS";
    return "Insightful";
  }

  private getAccessibleSummary(value: string, badge: string) {
    const explicitLabel = this.getAttribute("aria-label");
    if (explicitLabel) return explicitLabel;
    const label = this.getAttribute("label") || "Pasted content";
    const trimmed = value.trim();
    const previewText = trimmed ? trimmed.slice(0, 120) : "No preview text";
    return `${label}. Type: ${badge}. ${previewText}`;
  }

  private applyAnimationDelayOffset() {
    const parent = this.parentElement;
    if (!parent) return;
    const siblings = Array.from(parent.querySelectorAll("mui-prompt-preview"));
    const index = Math.max(0, siblings.indexOf(this));
    this.style.setProperty("--prompt-preview-sheen-delay", `${index * 220}ms`);
  }

  render() {
    if (!this.shadowRoot) return;

    const value = this.getAttribute("value") || "";
    const snippet = value.trim() || "Paste long content to preview it here.";
    const badge = this.getBadge(value);
    const partMap = getPartMap("text", "spacing", "layout", "visual");
    const accent = this.getAttribute("accent") || "var(--prompt-preview-accent, var(--surface-elevated-200))";
    const bgImage = this.getAttribute("bg-image") || "";
    const imageTint = this.getAttribute("image-tint") || accent;
    const glowTone = bgImage ? imageTint : accent;
    const isInverted = this.hasAttribute("inverted");
    const textVisible = this.hasAttribute("badge-only") ? false : !bgImage || this.hasAttribute("show-text");
    const animationMode = (this.getAttribute("animation-mode") || "loop").toLowerCase();
    const variant = (this.getAttribute("variant") || "").toLowerCase();
    const canAnimate = this.hasAttribute("animated") || Boolean(bgImage);
    const animated = canAnimate && animationMode !== "off";
    const animationIterations = animationMode === "once" ? "1" : "infinite";
    const isOverlayVariant = variant === "overlay" || Boolean(bgImage);
    const badgeVariant = isOverlayVariant ? "overlay" : "neutral";
    const dismissVariant = isOverlayVariant ? "overlay" : "secondary";
    const dismissClass = `dismiss-action${isOverlayVariant ? "" : " dismiss-secondary"}`;
    const isClickable = this.hasAttribute("clickable");
    const safeBgImage = bgImage.replace(/"/g, "&quot;");
    const imageBackground = bgImage
      ? `
            linear-gradient(
              180deg,
              color-mix(in srgb, ${imageTint} 42%, transparent 58%) 0%,
              color-mix(in srgb, ${imageTint} 22%, transparent 78%) 30%,
              color-mix(in srgb, #000 24%, transparent 76%) 100%
            ),
            url("${safeBgImage}") center / cover no-repeat
      `
      : `
            radial-gradient(
              circle at 12% 18%,
              color-mix(in srgb, ${accent} var(--prompt-preview-accent-mix-100), transparent) 0 14%,
              transparent 46%
            ),
            radial-gradient(
              circle at 82% 22%,
              color-mix(in srgb, ${accent} var(--prompt-preview-accent-mix-200), transparent) 0 11%,
              transparent 42%
            ),
            radial-gradient(
              circle at 34% 76%,
              color-mix(in srgb, ${accent} var(--prompt-preview-accent-mix-300), transparent) 0 12%,
              transparent 44%
            ),
            radial-gradient(
              circle at 74% 70%,
              color-mix(in srgb, ${accent} var(--prompt-preview-accent-mix-400), transparent) 0 9%,
              transparent 40%
            ),
            linear-gradient(
              180deg,
              color-mix(in srgb, ${accent} var(--prompt-preview-accent-mix-400), transparent) 0%,
              color-mix(in srgb, ${accent} var(--prompt-preview-accent-mix-500), transparent) 30%,
              var(--prompt-preview-surface) 100%
            )
      `;
    const boxClasses = `box${bgImage ? " has-image" : ""}${isOverlayVariant ? " variant-overlay" : ""}${isInverted ? " inverted" : ""}`;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: min(100%, calc(var(--space-800) * 2));
        }
        :host([clickable]) {
          cursor: pointer;
        }
        :host([clickable]:focus-visible) {
          outline: none;
        }
        :host([clickable]:focus-visible) .box {
          outline: var(--outline-thick);
          outline-width: var(--stroke-size-200);
          outline-offset: 0;
        }
        .box {
          position: relative;
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-200);
          box-shadow:
            var(--shadow-200),
            0 var(--stroke-size-100) var(--stroke-size-200) var(--black-opacity-20),
            inset 0 0 0 1px color-mix(in srgb, ${glowTone} 12%, transparent 88%),
            inset 0 calc(var(--space-050) * -1) var(--space-300) color-mix(in srgb, #000 12%, transparent 88%);
          filter: var(
            --prompt-preview-box-drop-shadow,
            drop-shadow(0 var(--stroke-size-100) var(--stroke-size-200) var(--black-opacity-20))
          );
          background: ${imageBackground};
          box-sizing: border-box;
          width: 100%;
          min-height: calc(var(--space-600) * 2);
          max-height: calc(var(--space-600) * 2);
          overflow: hidden;
          padding: var(--space-200);
          display: flex;
          flex-direction: column;
          --prompt-preview-text-color: var(--text-color);
          --prompt-preview-top-shade-start-active: var(--prompt-preview-top-shade-start);
          --prompt-preview-top-shade-end-active: var(--prompt-preview-top-shade-end);
          color: var(--prompt-preview-text-color);
        }
        .box.animated {
          overflow: hidden;
        }
        .box.variant-overlay,
        .box.has-image,
        .box.inverted {
          --prompt-preview-text-color: var(--white);
          --prompt-preview-top-shade-start-active: var(--prompt-preview-top-shade-start-overlay);
          --prompt-preview-top-shade-end-active: var(--prompt-preview-top-shade-end-overlay);
        }
        .top-shade {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: var(--prompt-preview-top-shade-height);
          pointer-events: none;
          z-index: 1;
          background: linear-gradient(
            180deg,
            var(--prompt-preview-top-shade-start-active) 0%,
            var(--prompt-preview-top-shade-end-active) 100%
          );
        }
        .box::before,
        .box::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 0;
        }
        .box::before {
          background: radial-gradient(
            120% 80% at 50% -10%,
            color-mix(in srgb, ${glowTone} 32%, transparent 68%) 0%,
            transparent 70%
          );
          filter: blur(var(--space-050));
        }
        .box::after {
          background: radial-gradient(
            120% 90% at 50% 110%,
            color-mix(in srgb, #000 14%, transparent 86%) 0%,
            transparent 72%
          );
          filter: blur(var(--space-100));
        }
        .box.animated::before {
          animation: previewPulse 2400ms ease-in-out var(--prompt-preview-iterations);
        }
        .box.animated::after {
          animation: previewPulse 3000ms ease-in-out var(--prompt-preview-iterations) reverse;
        }
        .box.animated .snippet {
          animation: previewSnippetPulse 2600ms ease-in-out var(--prompt-preview-iterations);
        }
        .box.animated:not(.has-image)::before,
        .box.animated:not(.has-image)::after {
          opacity: 0.28;
        }
        .box.animated:not(.has-image) .snippet {
          animation: none;
        }
        .scanline {
          display: none;
        }
        .box.animated .scanline {
          display: block;
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          z-index: 2;
          background: linear-gradient(
            100deg,
            transparent 0%,
            color-mix(in srgb, var(--white-opacity-70) 35%, transparent 65%) 45%,
            transparent 100%
          );
          transform: translateX(-120%);
          animation: previewScanline 2600ms cubic-bezier(0.22, 1, 0.36, 1) var(--prompt-preview-iterations);
          animation-delay: var(--prompt-preview-sheen-delay, 0ms);
          opacity: 0.36;
        }
        .box.animated:not(.has-image) .scanline {
          opacity: 0.08;
          filter: blur(var(--space-025));
          animation-duration: 4200ms;
          background: linear-gradient(
            100deg,
            transparent 0%,
            color-mix(in srgb, var(--white-opacity-30) 35%, transparent 65%) 45%,
            transparent 100%
          );
        }
        @keyframes previewScanline {
          0% { transform: translateX(-120%); opacity: 0; }
          10% { opacity: 1; }
          65% { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes previewPulse {
          0%, 100% { opacity: 0.78; }
          50% { opacity: 1; }
        }
        @keyframes previewSnippetPulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .box.animated::before,
          .box.animated::after,
          .box.animated .snippet,
          .box.animated .scanline {
            animation: none;
          }
        }
        mui-badge {
          position: absolute;
          z-index: 3;
          top: calc(var(--space-100) + var(--stroke-size-100));
          left: calc(var(--space-100) + var(--stroke-size-100));

        }
        .dismiss-action {
          position: absolute;
          top: var(--space-100);
          right: var(--space-100);
          z-index: 3;
          opacity: 0;
          pointer-events: none;
          transform: translateY(calc(var(--stroke-size-100) * -1));
          transition: opacity var(--speed-200) ease, transform var(--speed-200) ease;
        }
        :host(:hover) .dismiss-action,
        :host(:focus-within) .dismiss-action {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .dismiss-secondary::part(background) {
          background: var(--prompt-preview-dismiss-secondary-background);
        }
        .dismiss-secondary:hover::part(background),
        .dismiss-secondary:focus-visible::part(background) {
          background: var(--prompt-preview-dismiss-secondary-background-hover);
        }
        .dismiss-secondary::part(border) {
          border: var(--prompt-preview-dismiss-secondary-border);
        }
        .dismiss-secondary:hover::part(border),
        .dismiss-secondary:focus-visible::part(border) {
          border: var(--prompt-preview-dismiss-secondary-border-hover);
        }
        .dismiss-action::part(outline) {
          outline-width: var(--stroke-size-200);
        }
        .box.variant-overlay mui-badge,
        .box.has-image mui-badge,
        .box.inverted mui-badge {
          box-shadow:
            0 var(--space-025) var(--space-100) var(--black-opacity-60);
          border-radius: var(--badge-radius);
          -webkit-backdrop-filter: blur(var(--space-050));
          backdrop-filter: blur(var(--space-050));
        }

        .name,
        .snippet {
          flex: 1 1 auto;
          min-height: 0;
          min-width: 0;
          position: relative;
          z-index: 1;
        }

        .name::part(font-size),
        .snippet::part(font-size) {
          font-size: calc(var(--font-size-15) / 2);
          line-height: var(--line-height-100);
        }

        .name {
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--prompt-preview-text-color);
        }

        .snippet {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
          color: color-mix(in srgb, var(--prompt-preview-text-color) 84%, transparent 16%);
        }

        .inner {
          margin-top: var(--space-500);
          min-width: 0;
          width: 100%;
        }


        .box.inverted .snippet {
          color: color-mix(in srgb, var(--prompt-preview-text-color) 88%, transparent 12%);
        }
      </style>

      <div class="${boxClasses}${animated ? " animated" : ""}" part="${partMap}" style="--prompt-preview-iterations: ${animationIterations};">
        <span class="top-shade"></span>
        <span class="scanline"></span>
        <mui-button class="${dismissClass}" icon-only size="xx-small" variant="${dismissVariant}" aria-label="Dismiss preview">
          <mui-icon-close size="xx-small"></mui-icon-close>
        </mui-button>
        <mui-badge variant="${badgeVariant}" size="x-small">${badge}</mui-badge>
        <mui-v-stack class="inner" space="var(--space-025)" alignX="stretch">
          ${textVisible ? `<mui-body class="snippet" size="x-small" variant="optional">${snippet.slice(0, 260)}</mui-body>` : ""}
        </mui-v-stack>
      </div>
    `;

    const dismissButton = this.shadowRoot.querySelector(".dismiss-action");
    dismissButton?.addEventListener("click", this.onDismiss);

    const box = this.shadowRoot.querySelector(".box");
    box?.removeEventListener("click", this.onOpenPreview);
    this.removeEventListener("keydown", this.onKeyOpenPreview);

    if (isClickable) {
      this.setAttribute("tabindex", this.getAttribute("tabindex") || "0");
      this.setAttribute("role", this.getAttribute("role") || "button");
      this.setAttribute("aria-haspopup", this.getAttribute("aria-haspopup") || "dialog");
      if (!this.hasAttribute("aria-label")) {
        this.setAttribute("aria-label", this.getAccessibleSummary(value, badge));
      }
      box?.addEventListener("click", this.onOpenPreview);
      this.addEventListener("keydown", this.onKeyOpenPreview);
    } else {
      if (this.getAttribute("tabindex") === "0") this.removeAttribute("tabindex");
      if (this.getAttribute("role") === "button") this.removeAttribute("role");
      if (this.getAttribute("aria-haspopup") === "dialog") this.removeAttribute("aria-haspopup");
    }
  }
}

if (!customElements.get("mui-prompt-preview")) {
  customElements.define("mui-prompt-preview", MuiPromptPreview);
}
