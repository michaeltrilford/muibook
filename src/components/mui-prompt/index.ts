import "../mui-stack/hstack";
import "../mui-dialog";
import "../mui-heading";
import "../mui-code";

class MuiPrompt extends HTMLElement {
  static get observedAttributes() {
    return [
      "placeholder",
      "value",
      "disabled",
      "rows",
      "enter-submit",
      "actions-fan",
      "fan-open",
      "preview-overflow-to-preview",
      "preview-threshold-chars",
      "preview-auto-clickable",
      "preview-dialog-width",
      "preview-dialog-title",
      "aria-label",
      "aria-labelledby",
      "aria-describedby",
    ];
  }

  private triggerEl: HTMLElement | null = null;
  private previewShellEl: HTMLElement | null = null;
  private previewRowEl: HTMLElement | null = null;
  private previewSlotEl: HTMLSlotElement | null = null;
  private previewResizeObserver: ResizeObserver | null = null;
  private fanAnimations = new Map<HTMLElement, Animation>();

  private onPaste = (event: Event) => {
    const pasteEvent = event as ClipboardEvent;
    const clipboard = pasteEvent.clipboardData;
    if (!clipboard) return;

    type PromptPasteItem = {
      kind: "text" | "image" | "file";
      mimeType: string;
      badge: string;
      preview: string;
      value: string;
      file?: File;
      fileName?: string;
      size?: number;
    };

    const files: File[] = Array.from(clipboard.files || []);
    const rawText = clipboard.getData("text/plain") || "";
    const text = rawText.trim();
    const hasText = text.length > 0;
    const imageUrl = hasText ? this.detectImageUrl(text) : "";
    const overflowToPreview = this.getAttribute("preview-overflow-to-preview") !== "false";
    const thresholdRaw = this.getAttribute("preview-threshold-chars");
    const thresholdChars = Number.isFinite(Number.parseInt(thresholdRaw || "", 10))
      ? Math.max(1, Number.parseInt(thresholdRaw || "", 10))
      : 220;
    const detectedTextBadge = hasText ? this.detectBadge(text) : "";
    const isStructuredSnippet = detectedTextBadge !== "" && detectedTextBadge !== "Insightful";
    const shouldOverflowText =
      overflowToPreview && hasText && (Boolean(imageUrl) || text.length >= thresholdChars || isStructuredSnippet);
    const hasBinaryItems = files.length > 0;

    if (!hasBinaryItems && !hasText) return;
    if (hasBinaryItems || shouldOverflowText) pasteEvent.preventDefault();

    const items: PromptPasteItem[] = files.map((file) => ({
      kind: file.type.startsWith("image/") ? "image" : "file",
      mimeType: file.type || "",
      file,
      fileName: file.name || "",
      size: file.size || 0,
      badge: file.type.startsWith("image/") ? "IMG" : "FILE",
      preview: file.name || "Pasted file",
      value: file.name || "",
    }));

    if (shouldOverflowText && text) {
      if (imageUrl) {
        items.unshift({
          kind: "image",
          mimeType: "text/uri-list",
          badge: "IMG",
          preview: imageUrl,
          value: imageUrl,
        });
      } else {
        items.unshift({
          kind: "text",
          mimeType: "text/plain",
          badge: this.detectBadge(text),
          preview: text.slice(0, 260),
          value: rawText,
        });
      }
    }

    this.dispatchEvent(
      new CustomEvent("prompt-paste", {
        detail: {
          items,
          text: rawText || "",
          textBadge: imageUrl ? "IMG" : detectedTextBadge,
          overflowed: shouldOverflowText,
          thresholdChars,
          timestamp: new Date().toISOString(),
        },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    if (!target || target.tagName !== "TEXTAREA") return;
    this.syncTextareaHeight(target);

    if (this.getAttribute("value") !== target.value) {
      this.setAttribute("value", target.value);
    }
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value: target.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onKeyDown = (event: Event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === "Escape") {
      if (this.hasAttribute("fan-open")) {
        this.removeAttribute("fan-open");
        this.updateActionsLayout();
      }
      this.dispatchEvent(
        new CustomEvent("escape", {
          detail: { value: this.getValue() },
          bubbles: true,
          composed: true,
        }),
      );
      return;
    }

    const shouldSubmitOnEnter = this.getAttribute("enter-submit") !== "false";
    if (!shouldSubmitOnEnter) return;
    if (keyboardEvent.key !== "Enter" || keyboardEvent.shiftKey || keyboardEvent.isComposing) return;
    if (this.hasAttribute("disabled")) return;

    keyboardEvent.preventDefault();
    this.dispatchEvent(
      new CustomEvent("submit", {
        detail: { value: this.getValue() },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private onPreviewScroll = () => {
    this.syncPreviewEdgeShadows();
  };

  private onPreviewSlotChange = () => {
    this.syncPreviewVisibility();
    this.syncPreviewEdgeShadows();
  };

  private onPreviewOpen = (event: Event) => {
    const customEvent = event as CustomEvent;
    const detail = this.normalizePreviewDetail(customEvent.detail || {});
    this.openInternalPreviewDialog(detail);
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
    this.updateActionsLayout();
    const textarea = this.shadowRoot?.querySelector("textarea") as HTMLTextAreaElement | null;
    if (textarea) {
      this.syncTextareaHeight(textarea);
      requestAnimationFrame(() => this.syncTextareaHeight(textarea));
    }
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (!this.shadowRoot || oldValue === newValue) return;

    const textarea = this.shadowRoot.querySelector("textarea") as HTMLTextAreaElement | null;

    if (name === "value" && textarea) {
      textarea.value = newValue ?? "";
      this.syncTextareaHeight(textarea);
      return;
    }

    if (name === "disabled" && textarea) {
      if (newValue === null || newValue === "false") textarea.removeAttribute("disabled");
      else textarea.setAttribute("disabled", "");
      return;
    }

    if (name === "placeholder" && textarea) {
      textarea.setAttribute("placeholder", newValue ?? "");
      return;
    }

    if (name === "rows" && textarea) {
      textarea.setAttribute("rows", newValue || "3");
      this.syncTextareaHeight(textarea);
      return;
    }

    if ((name === "aria-label" || name === "aria-labelledby" || name === "aria-describedby") && textarea) {
      if (newValue === null) textarea.removeAttribute(name);
      else textarea.setAttribute(name, newValue);
      return;
    }

    if (name === "fan-open" || name === "actions-fan") {
      this.updateActionsLayout();
      return;
    }

    this.render();
    this.bindEvents();
    this.updateActionsLayout();
  }

  private getValue() {
    const textarea = this.shadowRoot?.querySelector("textarea");
    return textarea?.value ?? this.getAttribute("value") ?? "";
  }

  private syncTextareaHeight(textarea: HTMLTextAreaElement) {
    const baseRows = 3;
    const rows = Number.parseInt(this.getAttribute("rows") || String(baseRows), 10) || baseRows;
    const maxRows = Math.max(rows + 6, 10);
    const styles = getComputedStyle(textarea);
    const fontSize = Number.parseFloat(styles.fontSize) || 16;
    const lineHeight = fontSize * 1.55;
    const paddingTop = Number.parseFloat(styles.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(styles.paddingBottom) || 0;
    const borderTop = Number.parseFloat(styles.borderTopWidth) || 0;
    const borderBottom = Number.parseFloat(styles.borderBottomWidth) || 0;
    const boxExtra = paddingTop + paddingBottom + borderTop + borderBottom;
    const minHeight = baseRows * lineHeight + boxExtra;
    const maxHeight = maxRows * lineHeight + boxExtra;

    textarea.style.height = "auto";
    const contentHeight = textarea.scrollHeight;
    const nextHeight = Math.max(minHeight, Math.min(contentHeight, maxHeight));
    textarea.style.height = `${Math.ceil(nextHeight)}px`;
    textarea.style.overflowY = contentHeight > maxHeight ? "auto" : "hidden";
  }

  private detectBadge(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return "Insightful";

    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        JSON.parse(trimmed);
        return "JSON";
      } catch {
        // Ignore parse failure and continue heuristic checks
      }
    }

    if (/(^|\n)\s*[@.#a-zA-Z0-9\-\s]+\{[\s\S]*:[\s\S]*\}/.test(trimmed)) return "CSS";
    if (/^\s{0,3}(#{1,6}|\* |- |\d+\. )/.test(trimmed)) return "MD";
    if (/\b(select|from|where|group by|order by|join)\b/i.test(trimmed)) return "SQL";
    if (/\b(const|let|function|=>|import|export|return)\b/.test(trimmed)) return "JS";
    return "Insightful";
  }

  private detectImageUrl(value: string) {
    const trimmed = value.trim();
    if (!/^https?:\/\//i.test(trimmed)) return "";

    try {
      const url = new URL(trimmed);
      const path = url.pathname.toLowerCase();
      if (/\.(png|jpe?g|gif|webp|svg|avif|bmp)$/.test(path)) return trimmed;
    } catch {
      return "";
    }

    return "";
  }

  private bindEvents() {
    if (!this.shadowRoot) return;
    this.unbindEvents();
    const textarea = this.shadowRoot.querySelector("textarea") as HTMLTextAreaElement | null;
    textarea?.addEventListener("input", this.onInput);
    textarea?.addEventListener("keydown", this.onKeyDown);
    textarea?.addEventListener("paste", this.onPaste);
    const actionSlot = this.shadowRoot.querySelector('slot[name="actions"]') as HTMLSlotElement | null;
    actionSlot?.addEventListener("slotchange", () => this.updateActionsLayout());
    this.addEventListener("prompt-preview-open", this.onPreviewOpen as EventListener);
    this.bindPreviewOverflow();
    this.bindActionTrigger();
  }

  private unbindEvents() {
    if (!this.shadowRoot) return;
    const textarea = this.shadowRoot.querySelector("textarea") as HTMLTextAreaElement | null;
    textarea?.removeEventListener("input", this.onInput);
    textarea?.removeEventListener("keydown", this.onKeyDown);
    textarea?.removeEventListener("paste", this.onPaste);
    this.removeEventListener("prompt-preview-open", this.onPreviewOpen as EventListener);
    if (this.triggerEl) {
      this.triggerEl.removeEventListener("click", this.toggleFanOpen);
      this.triggerEl = null;
    }
    this.previewRowEl?.removeEventListener("scroll", this.onPreviewScroll);
    this.previewSlotEl?.removeEventListener("slotchange", this.onPreviewSlotChange);
    this.previewResizeObserver?.disconnect();
    this.previewResizeObserver = null;
    this.previewShellEl = null;
    this.previewRowEl = null;
    this.previewSlotEl = null;
  }

  private bindPreviewOverflow() {
    if (!this.shadowRoot) return;
    this.previewShellEl = this.shadowRoot.querySelector(".preview-shell") as HTMLElement | null;
    this.previewRowEl = this.shadowRoot.querySelector(".preview-row") as HTMLElement | null;
    this.previewSlotEl = this.shadowRoot.querySelector('slot[name="preview"]') as HTMLSlotElement | null;

    this.previewRowEl?.addEventListener("scroll", this.onPreviewScroll, { passive: true });
    this.previewSlotEl?.addEventListener("slotchange", this.onPreviewSlotChange);

    if (typeof ResizeObserver !== "undefined" && this.previewRowEl) {
      this.previewResizeObserver = new ResizeObserver(() => this.syncPreviewEdgeShadows());
      this.previewResizeObserver.observe(this.previewRowEl);
    }

    this.syncPreviewVisibility();
    this.syncPreviewEdgeShadows();
  }

  private syncPreviewVisibility() {
    if (!this.previewShellEl || !this.previewSlotEl) return;
    const assigned = this.previewSlotEl.assignedElements({ flatten: true });
    const hasItems = assigned.length > 0;
    this.previewShellEl.toggleAttribute("hidden", !hasItems);
    this.syncPreviewInteractivity(assigned);
  }

  private syncPreviewInteractivity(assigned?: Element[]) {
    if (this.getAttribute("preview-auto-clickable") === "false") return;
    const previews = (assigned || this.previewSlotEl?.assignedElements({ flatten: true }) || []) as HTMLElement[];
    previews.forEach((el) => {
      if (el.tagName.toLowerCase() !== "mui-prompt-preview") return;
      if (el.getAttribute("clickable") === "false") return;
      el.setAttribute("clickable", "");
    });
  }

  private normalizePreviewDetail(detail: Record<string, unknown>) {
    const value = String(detail.value || "").trim();
    const bgImage = String(detail.bgImage || "").trim();
    const badge = String(detail.badge || "").trim();
    const label = String(detail.label || "Pasted Content");
    const imageTint = String(detail.imageTint || "").trim();
    const type = bgImage ? "image" : value ? "code" : "text";

    return {
      id: String(detail.id || ""),
      value,
      badge: badge || (bgImage ? "IMG" : this.detectBadge(value)),
      label,
      bgImage,
      imageTint,
      type,
    };
  }

  private openInternalPreviewDialog(detail: Record<string, unknown>) {
    if (!this.shadowRoot) return;

    const dialog = this.shadowRoot.querySelector("#promptAutoPreviewDialog") as HTMLElement | null;
    const title = this.shadowRoot.querySelector("#promptAutoPreviewTitle") as HTMLElement | null;
    const code = this.shadowRoot.querySelector("#promptAutoPreviewCode") as HTMLElement | null;
    const image = this.shadowRoot.querySelector("#promptAutoPreviewImage") as HTMLImageElement | null;

    const normalized = this.normalizePreviewDetail(detail);
    const dialogTitle = this.getAttribute("preview-dialog-title") || normalized.label;
    const value = normalized.value;
    const bgImage = normalized.bgImage;
    const badge = normalized.badge;
    const hasImage = bgImage.length > 0;
    const hasCode = value.length > 0;

    if (!hasImage && !hasCode) return;

    this.setAttribute("preview-dialog-value", value);
    this.setAttribute("preview-dialog-image", bgImage);
    this.setAttribute("preview-dialog-type", badge || (hasImage ? "IMG" : "CODE"));

    if (title) title.textContent = dialogTitle;

    if (hasImage) {
      if (image) {
        image.setAttribute("src", bgImage);
        image.removeAttribute("hidden");
      }
      if (code) code.setAttribute("hidden", "");
    } else {
      if (code) {
        code.textContent = value;
        code.removeAttribute("hidden");
      }
      if (image) {
        image.removeAttribute("src");
        image.setAttribute("hidden", "");
      }
    }

    (dialog as any)?.open?.();
  }

  private syncPreviewEdgeShadows() {
    if (!this.previewShellEl || !this.previewRowEl) return;
    const maxScroll = Math.max(0, this.previewRowEl.scrollWidth - this.previewRowEl.clientWidth);
    const hasOverflow = maxScroll > 1;
    const atStart = this.previewRowEl.scrollLeft <= 1;
    const atEnd = this.previewRowEl.scrollLeft >= maxScroll - 1;

    this.previewShellEl.toggleAttribute("show-start", hasOverflow && !atStart);
    this.previewShellEl.toggleAttribute("show-end", hasOverflow && !atEnd);
  }

  private toggleFanOpen = () => {
    if (!this.hasAttribute("actions-fan")) return;
    this.toggleAttribute("fan-open");
    this.updateActionsLayout();
  };

  private bindActionTrigger() {
    if (!this.shadowRoot || !this.hasAttribute("actions-fan")) return;
    const actionSlot = this.shadowRoot.querySelector('slot[name="actions"]') as HTMLSlotElement | null;
    if (!actionSlot) return;

    if (this.triggerEl) {
      this.triggerEl.removeEventListener("click", this.toggleFanOpen);
      this.triggerEl = null;
    }

    const actions = actionSlot.assignedElements({ flatten: true }) as HTMLElement[];
    const trigger =
      (actions.find((action) => action.hasAttribute("fan-trigger")) as HTMLElement | undefined) || actions[0] || null;
    if (!trigger) return;

    this.triggerEl = trigger;
    this.triggerEl.addEventListener("click", this.toggleFanOpen);
    this.syncTriggerIconState();
  }

  private syncTriggerIconState() {
    if (!this.triggerEl) return;
    const iconToggle = this.triggerEl.querySelector("mui-icon-toggle") as HTMLElement | null;
    if (!iconToggle) return;
    const isOpen = this.hasAttribute("fan-open");
    iconToggle.toggleAttribute("toggle", isOpen);
    iconToggle.setAttribute("aria-pressed", String(isOpen));
  }

  private updateActionsLayout() {
    if (!this.shadowRoot) return;
    const actionSlot = this.shadowRoot.querySelector('slot[name="actions"]') as HTMLSlotElement | null;
    if (!actionSlot) return;

    const actions = actionSlot.assignedElements({ flatten: true }) as HTMLElement[];
    const rightActionSlot = this.shadowRoot.querySelector('slot[name="actions-right"]') as HTMLSlotElement | null;
    const rightActions = (rightActionSlot?.assignedElements({ flatten: true }) || []) as HTMLElement[];
    const fanMode = this.hasAttribute("actions-fan");
    const fanOpen = this.hasAttribute("fan-open");
    const fanSpeed = 100;
    const fanStep = "calc(var(--action-icon-only-size-medium) + var(--space-100))";
    actions.forEach((action, index) => {
      action.style.transition = `transform ${fanSpeed}ms ease, opacity ${fanSpeed}ms ease`;
      action.style.zIndex = "";
      const existing = this.fanAnimations.get(action);
      if (existing) {
        existing.cancel();
        this.fanAnimations.delete(action);
      }

      if (!fanMode) {
        action.style.transitionDelay = "";
        action.style.transform = "";
        action.style.opacity = "";
        action.style.pointerEvents = "";
        action.style.filter = "";
        return;
      }

      if (index === 0) {
        action.style.transitionDelay = "";
        action.style.transform = "translateX(0)";
        action.style.opacity = "1";
        action.style.pointerEvents = "";
        action.style.filter = "";
        return;
      }

      if (!fanOpen) {
        action.style.transitionDelay = "";
        action.style.transform = "translateX(0) scale(0.8)";
        action.style.opacity = "0";
        action.style.pointerEvents = "none";
        action.style.filter = "";
        return;
      }

      const x = `calc(${fanStep} * -${index})`;
      const staggerDelay = index * 50;
      action.style.transition = `opacity ${Math.max(120, fanSpeed - 40)}ms ease, transform ${fanSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      action.style.transitionDelay = `${staggerDelay}ms`;
      action.style.transform = "translateX(0) scale(0.92)";
      action.style.opacity = "0";
      action.style.pointerEvents = "none";
      action.style.filter = "";

      requestAnimationFrame(() => {
        action.style.transform = `translateX(${x})`;
        action.style.opacity = "1";
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
          action.style.pointerEvents = "";
          return;
        }

        const bounce = action.animate(
          [
            { transform: "translateX(0) scale(0.92)" },
            { transform: `translateX(${x}) scale(1.03)`, offset: 0.68 },
            { transform: `translateX(calc(${x} - var(--space-050))) scale(0.99)`, offset: 0.86 },
            { transform: `translateX(${x}) scale(1)` },
          ],
          {
            duration: fanSpeed + 180,
            delay: staggerDelay,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          },
        );
        this.fanAnimations.set(action, bounce);
        bounce.finished
          .catch(() => undefined)
          .finally(() => {
            action.style.pointerEvents = "";
          });
      });
    });

    rightActions.forEach((action) => {
      action.style.transition = "";
      action.style.zIndex = "";
    });

    this.bindActionTrigger();
    this.syncTriggerIconState();
  }

  render() {
    if (!this.shadowRoot) return;

    const placeholder = this.getAttribute("placeholder") || "Reply to Mui...";
    const value = this.getAttribute("value") || "";
    const rows = this.getAttribute("rows") || "3";
    const disabled = this.hasAttribute("disabled");
    const previewDialogWidth = this.getAttribute("preview-dialog-width") || "560px";
    const ariaLabel = this.getAttribute("aria-label");
    const ariaLabelledBy = this.getAttribute("aria-labelledby");
    const ariaDescribedBy = this.getAttribute("aria-describedby");
    const fallbackAriaLabel = !ariaLabel && !ariaLabelledBy ? "Prompt input" : "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }
        .surface {
          position: relative;
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-300);
          background: var(--surface-elevated-100);
          padding: 0;
          box-sizing: border-box;
        }
        .input-wrap {
          width: 100%;
          padding-bottom: 5rem;
          box-sizing: border-box;
        }
        .preview-shell {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          margin-inline: 0;
          padding-top: var(--space-300);
        }
        .preview-shell[hidden] {
          display: none;
        }
        .preview-shell::before,
        .preview-shell::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0px;
          width: calc(var(--space-300) + var(--space-100));
          pointer-events: none;
          opacity: 0;
          transition: opacity var(--speed-200) ease, filter var(--speed-200) ease;
          z-index: 2;
          filter: blur(var(--space-050));
        }
        .preview-shell::before {
          left: 0;
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--black-opacity-30) 90%, transparent 10%) 0%,
            color-mix(in srgb, var(--black-opacity-20) 70%, transparent 30%) 35%,
            transparent 100%
          );
        }
        .preview-shell::after {
          right: 0;
          background: linear-gradient(
            270deg,
            color-mix(in srgb, var(--black-opacity-30) 90%, transparent 10%) 0%,
            color-mix(in srgb, var(--black-opacity-20) 70%, transparent 30%) 35%,
            transparent 100%
          );
        }
        .preview-shell[show-start]::before {
          opacity: 0.45;
        }
        .preview-shell[show-end]::after {
          opacity: 0.45;
        }
        .preview-row {
          display: block;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
          overflow-y: hidden;
          padding-inline: calc(var(--space-300) + var(--stroke-size-100));
          padding-top:  var(--stroke-size-200);
          padding-bottom:  var(--stroke-size-200);
          scrollbar-width: thin;
          scrollbar-color: color-mix(in srgb, var(--text-color-optional) 65%, transparent) transparent;
        }
        .preview-row::-webkit-scrollbar {
          height: var(--space-100);
        }
        .preview-row::-webkit-scrollbar-track {
          background: transparent;
        }
        .preview-row::-webkit-scrollbar-thumb {
          background: color-mix(in srgb, var(--text-color-optional) 65%, transparent);
          border-radius: var(--radius-300);
          border: var(--stroke-size-100) solid transparent;
          background-clip: padding-box;
        }
        .preview-row::-webkit-scrollbar-thumb:hover {
          background: color-mix(in srgb, var(--text-color-optional) 85%, transparent);
          background-clip: padding-box;
        }
        .preview-row::part(display) {
          display: flex;
        }
        .preview-row::part(flex-wrap) {
          flex-wrap: nowrap;
        }
        .preview-row::part(gap) {
          gap: var(--space-100);
        }
        .preview-end-spacer {
          flex: 0 0 calc(var(--space-300) - var(--space-100) + var(--stroke-size-100));
          width: calc(var(--space-300) - var(--space-100) + var(--stroke-size-100));
          min-width: calc(var(--space-300) - var(--space-100) + var(--stroke-size-100));
          pointer-events: none;
        }
        ::slotted([slot="preview"]) {
          display: block;
          flex: 0 0 auto;
        }
        textarea {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: var(--text-color);
          font: inherit;
          padding-block-start: calc(var(--space-300) + var(--space-050));
          padding-inline: calc(var(--space-300) + var(--space-100));
          padding-block-end: var(--space-000);
          line-height: var(--text-line-height-medium);
          resize: none;
          height: calc(3 * 1.55em);
          min-height: calc(3 * 1.55em);
          box-sizing: border-box;
        }
        textarea::placeholder {
          color: var(--text-color-optional);
        }
        textarea:disabled {
          cursor: not-allowed;
        }
        .actions-slot {
          position: absolute;
          bottom: var(--space-300);
          display: inline-flex;
          align-items: center;
          gap: var(--space-100);
          pointer-events: none;
        }
        .actions-slot-left {
          left: var(--space-300);
        }
        .actions-slot-right {
          right: var(--space-300);
        }
        ::slotted([slot="actions"]),
        ::slotted([slot="actions-right"]) {
          display: inline-flex;
          align-items: center;
          gap: var(--space-100);
          pointer-events: auto;
        }
        .auto-preview-image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: var(--radius-100);
        }
        #promptAutoPreviewCode[hidden],
        #promptAutoPreviewImage[hidden] {
          display: none !important;
        }
      </style>

        <div class="surface">
        <div class="input-wrap">
          <div class="preview-shell" part="preview-shell">
            <mui-h-stack class="preview-row" part="preview-row" aligny="stretch" alignx="start" space="var(--space-100)">
              <slot name="preview"></slot>
              <span class="preview-end-spacer" aria-hidden="true"></span>
            </mui-h-stack>
          </div>
          <slot name="input">
            <textarea
              rows="${rows}"
              placeholder="${placeholder}"
              ${ariaLabel ? `aria-label="${ariaLabel.replace(/"/g, "&quot;")}"` : ""}
              ${ariaLabelledBy ? `aria-labelledby="${ariaLabelledBy.replace(/"/g, "&quot;")}"` : ""}
              ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy.replace(/"/g, "&quot;")}"` : ""}
              ${fallbackAriaLabel ? `aria-label="${fallbackAriaLabel}"` : ""}
              ${disabled ? "disabled" : ""}
            >${value}</textarea>
          </slot>
        </div>
        <slot name="actions" class="actions-slot actions-slot-left"></slot>
        <slot name="actions-right" class="actions-slot actions-slot-right"></slot>
      </div>

      <mui-dialog
        id="promptAutoPreviewDialog"
        width="${previewDialogWidth}"
        content-padding="none"
      >
        <mui-heading id="promptAutoPreviewTitle" slot="title" size="5">Pasted Content</mui-heading>
        <mui-code id="promptAutoPreviewCode" size="x-small" wrap hidden></mui-code>
        <img id="promptAutoPreviewImage" class="auto-preview-image" alt="Pasted preview" hidden />
      </mui-dialog>
    `;
  }
}

if (!customElements.get("mui-prompt")) {
  customElements.define("mui-prompt", MuiPrompt);
}
