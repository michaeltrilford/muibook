import "../mui-stack/hstack";
import "../mui-dialog";
import "../mui-heading";
import "../mui-code";
import "../mui-button";
import "../mui-icons/grid";
import "../mui-icons/close";
import "../mui-icons/toggle";
import "../mui-rule";
import "../mui-prompt-toggle";

type PromptItem = {
  kind: "text" | "image" | "file";
  mimeType: string;
  badge: string;
  preview: string;
  value: string;
  file?: File;
  fileName?: string;
  size?: number;
};

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
      "preview-scrollbar",
      "preview-threshold-chars",
      "preview-auto-clickable",
      "preview-dialog-width",
      "preview-dialog-title",
      "context-mode",
      "effects-off",
      "color-layout",
      "color-top-start",
      "color-top-mid",
      "color-top-end",
      "color-top-accent",
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
  private pendingColorFade = false;
  private readonly enforceActionVariants = () => {
    if (!this.shadowRoot) return;
    const selector = 'slot[name="actions"], slot[name="actions-trigger"], slot[name="actions-right"]';
    const slots = Array.from(this.shadowRoot.querySelectorAll(selector)) as HTMLSlotElement[];
    const applyActionsSlotSpacing = (node: HTMLElement, isActionsSlot: boolean) => {
      if (!isActionsSlot || node.tagName.toLowerCase() !== "mui-button") return;
      const isIconOnly = node.hasAttribute("icon-only");
      if (isIconOnly) {
        node.style.marginRight = "var(--space-025)";
        return;
      }
      if (node.style.marginRight === "var(--space-025)") node.style.marginRight = "";
    };
    slots.forEach((slot) => {
      const isActionsSlot = slot.name === "actions";
      const elements = slot.assignedElements({ flatten: true }) as HTMLElement[];
      elements.forEach((el) => {
        const nodes: HTMLElement[] = [el, ...(Array.from(el.querySelectorAll("*")) as HTMLElement[])];
        nodes.forEach((node) => {
          const tag = node.tagName.toLowerCase();
          if (tag === "mui-button") {
            node.setAttribute("variant", "tertiary");
            applyActionsSlotSpacing(node, isActionsSlot);
            return;
          }
          if (tag === "mui-dropdown") {
            const actionNodes = node.querySelectorAll('[slot="action"]');
            actionNodes.forEach((actionNode) => {
              if (actionNode instanceof HTMLElement && actionNode.tagName.toLowerCase() === "mui-button") {
                actionNode.setAttribute("variant", "tertiary");
                applyActionsSlotSpacing(actionNode, isActionsSlot);
              }
            });
          }
        });
      });
    });
  };

  private emitPromptItems({
    items,
    text,
    textBadge,
    overflowed,
    thresholdChars,
    source,
  }: {
    items: PromptItem[];
    text: string;
    textBadge: string;
    overflowed: boolean;
    thresholdChars: number;
    source: "paste" | "upload";
  }) {
    this.dispatchEvent(
      new CustomEvent("prompt-paste", {
        detail: {
          source,
          items,
          text,
          textBadge,
          overflowed,
          thresholdChars,
          timestamp: new Date().toISOString(),
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onPaste = (event: Event) => {
    const pasteEvent = event as ClipboardEvent;
    const clipboard = pasteEvent.clipboardData;
    if (!clipboard) return;

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

    const items: PromptItem[] = files.map((file) => ({
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

    this.emitPromptItems({
      source: "paste",
      items,
      text: rawText || "",
      textBadge: imageUrl ? "IMG" : detectedTextBadge,
      overflowed: shouldOverflowText,
      thresholdChars,
    });
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

  private normalizeContextMode(mode: string | null) {
    return mode === "chip" ? "chip" : "icon";
  }

  private setContextMode(mode: "icon" | "chip", source: "api" | "click" | "dismiss" = "api") {
    const next = this.normalizeContextMode(mode);
    if (this.getAttribute("context-mode") !== next) this.setAttribute("context-mode", next);
    this.syncContextModeUI();
    this.dispatchEvent(
      new CustomEvent("prompt-context-change", {
        detail: { mode: next, source },
        bubbles: true,
        composed: true,
      }),
    );
    if (source === "dismiss") {
      this.dispatchEvent(
        new CustomEvent("prompt-context-dismiss", {
          detail: { mode: next },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private syncContextModeUI() {
    if (!this.shadowRoot) return;
    const mode = this.normalizeContextMode(this.getAttribute("context-mode"));
    const slots = Array.from(
      this.shadowRoot.querySelectorAll(
        'slot[name="actions"], slot[name="actions-right"], slot[name="actions-trigger"]',
      ),
    ) as HTMLSlotElement[];
    const actionNodes = slots.flatMap((slot) => slot.assignedElements({ flatten: true }) as HTMLElement[]);
    actionNodes.forEach((root) => {
      const nodes: HTMLElement[] = [root, ...(Array.from(root.querySelectorAll("*")) as HTMLElement[])];
      nodes.forEach((el) => {
        const tag = el.tagName.toLowerCase();
        const isToggleWrapper = tag === "mui-prompt-toggle";
        const isToggle = el.hasAttribute("context-toggle");
        const isChip = el.hasAttribute("context-chip");
        if (isToggleWrapper) {
          el.setAttribute("mode", mode);
          return;
        }
        if (isToggle || isChip) {
          const show = isToggle ? mode === "icon" : mode === "chip";
          el.toggleAttribute("hidden", !show);
          el.style.display = show ? "inline-flex" : "none";
        }
      });
    });
  }

  private onContextToggleClick = (event: Event) => {
    const path = event.composedPath();
    const toggle = path.find(
      (node) =>
        node instanceof HTMLElement &&
        (node.tagName.toLowerCase() === "mui-prompt-toggle" || node.hasAttribute?.("context-toggle")),
    ) as HTMLElement | undefined;
    if (!toggle) return;
    this.setContextMode("chip", "click");
    this.updateActionsLayout();
  };

  private onContextChipDismiss = (event: Event) => {
    const path = event.composedPath();
    const chip = path.find((node) => node instanceof HTMLElement && node.hasAttribute?.("context-chip")) as
      | HTMLElement
      | undefined;
    if (!chip) return;
    this.setContextMode("icon", "dismiss");
    this.updateActionsLayout();
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("context-mode")) this.setAttribute("context-mode", "icon");
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

    if (name === "context-mode") {
      const normalized = this.normalizeContextMode(newValue);
      if (newValue !== normalized) {
        this.setAttribute("context-mode", normalized);
        return;
      }
      this.syncContextModeUI();
      this.updateActionsLayout();
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

    if (
      name === "color-layout" ||
      name === "color-top-start" ||
      name === "color-top-mid" ||
      name === "color-top-end" ||
      name === "color-top-accent"
    ) {
      this.pendingColorFade = true;
    }

    this.render();
    this.bindEvents();
    this.updateActionsLayout();
    if (this.pendingColorFade) {
      this.runColorFade();
      this.pendingColorFade = false;
    }
  }

  private runColorFade() {
    const surface = this.shadowRoot?.querySelector(".surface") as HTMLElement | null;
    if (!surface || typeof surface.animate !== "function") return;
    surface.animate(
      [
        { opacity: 0.82, filter: "saturate(0.92)" },
        { opacity: 1, filter: "saturate(1)" },
      ],
      {
        duration: 240,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "none",
      },
    );
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
    const actionTriggerSlot = this.shadowRoot.querySelector('slot[name="actions-trigger"]') as HTMLSlotElement | null;
    const actionRightSlot = this.shadowRoot.querySelector('slot[name="actions-right"]') as HTMLSlotElement | null;
    actionSlot?.addEventListener("slotchange", () => this.updateActionsLayout());
    actionTriggerSlot?.addEventListener("slotchange", () => this.updateActionsLayout());
    actionRightSlot?.addEventListener("slotchange", () => this.updateActionsLayout());
    this.addEventListener("prompt-preview-open", this.onPreviewOpen as EventListener);
    this.addEventListener("click", this.onContextToggleClick);
    this.addEventListener("dismiss", this.onContextChipDismiss as EventListener);
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
    this.removeEventListener("click", this.onContextToggleClick);
    this.removeEventListener("dismiss", this.onContextChipDismiss as EventListener);
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
    const triggerSlot = this.shadowRoot.querySelector('slot[name="actions-trigger"]') as HTMLSlotElement | null;
    const defaultTrigger = this.shadowRoot.querySelector("#promptDefaultActionsTrigger") as HTMLElement | null;
    if (!actionSlot) return;

    if (this.triggerEl) {
      this.triggerEl.removeEventListener("click", this.toggleFanOpen);
      this.triggerEl = null;
    }

    const triggerActions = ((triggerSlot?.assignedElements({ flatten: true }) || []) as HTMLElement[]).filter(
      (el) => !el.hasAttribute("hidden"),
    );
    const slottedActions = (actionSlot.assignedElements({ flatten: true }) as HTMLElement[]).filter(
      (el) => !el.hasAttribute("hidden"),
    );
    const trigger =
      (triggerActions.find((action) => action.hasAttribute("fan-trigger")) as HTMLElement | undefined) ||
      triggerActions[0] ||
      defaultTrigger ||
      (slottedActions.find((action) => action.hasAttribute("fan-trigger")) as HTMLElement | undefined) ||
      slottedActions[0] ||
      null;
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

  private setFanItemInert(element: HTMLElement, shouldBeInert: boolean) {
    if (!shouldBeInert) {
      element.removeAttribute("inert");
      element.removeAttribute("aria-hidden");
      const previousTabIndex = element.getAttribute("data-fan-tabindex");
      if (previousTabIndex !== null) {
        if (previousTabIndex === "__none__") element.removeAttribute("tabindex");
        else element.setAttribute("tabindex", previousTabIndex);
        element.removeAttribute("data-fan-tabindex");
      }
      return;
    }

    if (!element.hasAttribute("data-fan-tabindex")) {
      element.setAttribute("data-fan-tabindex", element.getAttribute("tabindex") ?? "__none__");
    }
    element.setAttribute("tabindex", "-1");
    element.setAttribute("inert", "");
    element.setAttribute("aria-hidden", "true");
  }

  private updateActionsLayout() {
    if (!this.shadowRoot) return;
    this.syncContextModeUI();
    const actionSlot = this.shadowRoot.querySelector('slot[name="actions"]') as HTMLSlotElement | null;
    const triggerSlot = this.shadowRoot.querySelector('slot[name="actions-trigger"]') as HTMLSlotElement | null;
    const defaultTrigger = this.shadowRoot.querySelector("#promptDefaultActionsTrigger") as HTMLElement | null;
    const actionsSeparator = this.shadowRoot.querySelector(".actions-separator") as HTMLElement | null;
    if (!actionSlot) return;

    const triggerActions = ((triggerSlot?.assignedElements({ flatten: true }) || []) as HTMLElement[]).filter(
      (el) => !el.hasAttribute("hidden"),
    );
    const slottedActions = (actionSlot.assignedElements({ flatten: true }) as HTMLElement[]).filter(
      (el) => !el.hasAttribute("hidden"),
    );
    const trigger =
      (triggerActions.find((action) => action.hasAttribute("fan-trigger")) as HTMLElement | undefined) ||
      triggerActions[0] ||
      defaultTrigger ||
      (slottedActions.find((action) => action.hasAttribute("fan-trigger")) as HTMLElement | undefined) ||
      slottedActions[0] ||
      null;
    const nonTriggerActions = slottedActions.filter((action) => action !== trigger);
    const actions = trigger ? [trigger, ...nonTriggerActions] : slottedActions;
    const rightActionSlot = this.shadowRoot.querySelector('slot[name="actions-right"]') as HTMLSlotElement | null;
    const rightActions = (rightActionSlot?.assignedElements({ flatten: true }) || []) as HTMLElement[];
    const fanMode = this.hasAttribute("actions-fan");
    const fanOpen = this.hasAttribute("fan-open");
    const fanSpeed = 100;
    const fanStep = "calc(var(--action-icon-only-size-medium) + var(--space-100))";
    if (actionsSeparator) {
      const showSeparator = fanMode && fanOpen && slottedActions.length > 0;
      actionsSeparator.toggleAttribute("hidden", !showSeparator);
      actionsSeparator.style.display = showSeparator ? "inline-flex" : "none";
    }
    this.enforceActionVariants();
    actions.forEach((action, index) => {
      action.style.transition = `transform ${fanSpeed}ms ease, opacity ${fanSpeed}ms ease`;
      action.style.zIndex = "";
      const existing = this.fanAnimations.get(action);
      if (existing) {
        existing.cancel();
        this.fanAnimations.delete(action);
      }

      if (!fanMode) {
        this.setFanItemInert(action, false);
        action.style.transitionDelay = "";
        action.style.transform = "";
        action.style.opacity = "";
        action.style.pointerEvents = "";
        action.style.filter = "";
        return;
      }

      if (index === 0) {
        this.setFanItemInert(action, false);
        action.style.transitionDelay = "";
        action.style.transform = "translateX(0)";
        action.style.opacity = "1";
        action.style.pointerEvents = "";
        action.style.filter = "";
        return;
      }

      if (!fanOpen) {
        this.setFanItemInert(action, true);
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
      this.setFanItemInert(action, true);

      requestAnimationFrame(() => {
        action.style.transform = `translateX(${x})`;
        action.style.opacity = "1";
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
          action.style.pointerEvents = "";
          this.setFanItemInert(action, false);
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
            this.setFanItemInert(action, false);
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
    const colorTopStart = this.getAttribute("color-top-start") || "";
    const colorTopMid = this.getAttribute("color-top-mid") || "";
    const colorTopEnd = this.getAttribute("color-top-end") || "";
    const colorTopAccent = this.getAttribute("color-top-accent") || "";
    const colorLayout = (this.getAttribute("color-layout") || "default").toLowerCase();
    const swapLayout = colorLayout === "swap";
    const startSource = swapLayout
      ? colorTopEnd || "var(--prompt-color-top-end, var(--green-500))"
      : colorTopStart || "var(--prompt-color-top-start, var(--mui-brand-400))";
    const midSource = swapLayout
      ? colorTopAccent || "var(--prompt-color-top-accent, var(--orange-500))"
      : colorTopMid || "var(--prompt-color-top-mid, var(--blue-500))";
    const endSource = swapLayout
      ? colorTopStart || "var(--prompt-color-top-start, var(--mui-brand-400))"
      : colorTopEnd || "var(--prompt-color-top-end, var(--green-500))";
    const accentSource = swapLayout
      ? colorTopMid || "var(--prompt-color-top-mid, var(--blue-500))"
      : colorTopAccent || "var(--prompt-color-top-accent, var(--orange-500))";
    const ariaLabel = this.getAttribute("aria-label");
    const ariaLabelledBy = this.getAttribute("aria-labelledby");
    const ariaDescribedBy = this.getAttribute("aria-describedby");
    const fallbackAriaLabel = !ariaLabel && !ariaLabelledBy ? "Prompt input" : "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          --prompt-action-radius: var(--chip-radius-small, var(--radius-400));
          --_prompt-color-top-start-source: ${startSource};
          --_prompt-color-top-mid-source: ${midSource};
          --_prompt-color-top-end-source: ${endSource};
          --_prompt-color-top-accent-source: ${accentSource};
          --_prompt-accent-primary: var(--prompt-accent-primary, var(--prompt-spectrum-start, var(--mui-brand-400)));
          --_prompt-accent-secondary: var(--prompt-accent-secondary, var(--blue-500));
          --_prompt-accent-mid: color-mix(in srgb, var(--_prompt-accent-primary) 52%, var(--_prompt-accent-secondary) 48%);
          --_prompt-start-tint: color-mix(in srgb, var(--_prompt-color-top-start-source) 24%, transparent 76%);
          --_prompt-mid-tint: color-mix(in srgb, var(--_prompt-color-top-mid-source) 18%, transparent 82%);
          --_prompt-end-tint: color-mix(in srgb, var(--_prompt-color-top-end-source) 20%, transparent 80%);
          --_prompt-accent-tint: color-mix(
            in srgb,
            var(--_prompt-color-top-accent-source) 16%,
            transparent 84%
          );
          --_prompt-layer-start-tint: ${swapLayout ? "var(--_prompt-end-tint)" : "var(--_prompt-start-tint)"};
          --_prompt-layer-mid-tint: ${swapLayout ? "var(--_prompt-accent-tint)" : "var(--_prompt-mid-tint)"};
          --_prompt-layer-end-tint: ${swapLayout ? "var(--_prompt-start-tint)" : "var(--_prompt-end-tint)"};
          --_prompt-layer-accent-tint: ${swapLayout ? "var(--_prompt-mid-tint)" : "var(--_prompt-accent-tint)"};
          --_prompt-spectrum-blend-mode-hover: normal;
          --_prompt-spectrum-blend-mode-focus: normal;
          --prompt-placeholder-color-hover-light: var(--grey-1200);
          --prompt-placeholder-color-hover-dark: var(--white);
          --prompt-placeholder-color-focus-light: var(--grey-1200);
          --prompt-placeholder-color-focus-dark: var(--white);
          --prompt-focus-border-color: var(--black-opacity-50);
          --prompt-surface-filter: drop-shadow(
            0 var(--stroke-size-100) 0 var(--black-opacity-5)
          );
          --prompt-focus-after-opacity: 0.28;
          --prompt-focus-after-opacity-min: 0;
          --prompt-focus-after-opacity-max: 0.28;
          --prompt-focus-after-pulse-speed-global: calc(var(--speed-400) * 4);
          --prompt-focus-after-pulse-speed-light: var(--prompt-focus-after-pulse-speed-global);
          --prompt-focus-after-pulse-speed-dark: var(--prompt-focus-after-pulse-speed-global);
          --prompt-focus-after-pulse-speed: var(--prompt-focus-after-pulse-speed-global);
          --prompt-focus-surface-opacity: 0.35;
          --prompt-mesh-scale-max-x: 1;
          --prompt-mesh-scale-max-y: 1.09;
          --prompt-mesh-scale-min-x: 0.98;
          --prompt-mesh-scale-min-y: 1.04;
          --prompt-mesh-overflow: calc((var(--prompt-mesh-scale-max-y) - 1) * 50%);
          --prompt-mesh-blur-pad: var(--space-100);
          --prompt-hover-border-pulse-start: color-mix(
            in srgb,
            var(--prompt-focus-border-color) 10%,
            transparent 90%
          );
          --prompt-hover-border-pulse-end: color-mix(
            in srgb,
            var(--prompt-focus-border-color) 25%,
            transparent 75%
          );
          --_prompt-border-hover-primary-soft: color-mix(
            in srgb,
            var(--prompt-border-color-hover-primary, var(--_prompt-accent-primary)) 46%,
            var(--form-default-border-color-hover) 54%
          );
          --_prompt-border-hover-primary-strong: color-mix(
            in srgb,
            var(--prompt-border-color-hover-primary, var(--_prompt-accent-primary)) 70%,
            var(--form-default-border-color-hover) 30%
          );
          --_prompt-border-hover-secondary-soft: color-mix(
            in srgb,
            var(--prompt-border-color-hover-secondary, var(--_prompt-accent-secondary)) 46%,
            var(--form-default-border-color-hover) 54%
          );
          --_prompt-border-hover-secondary-strong: color-mix(
            in srgb,
            var(--prompt-border-color-hover-secondary, var(--_prompt-accent-secondary)) 70%,
            var(--form-default-border-color-hover) 30%
          );
          overflow: visible;
        }
        .surface {
          position: relative;
          border: var(--border-thin);
          border-color: var(--form-default-border-color);
          border-radius: var(--radius-300);
          background: var(--surface-elevated-100);
          padding: 0;
          box-sizing: border-box;
          overflow: visible;
          isolation: isolate;
          transition:
            border-color var(--speed-200) cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow var(--speed-200) cubic-bezier(0.22, 1, 0.36, 1);
          filter: var(--prompt-surface-filter);
          box-shadow: none;
        }
        .surface::before {
          content: "";
          position: absolute;
          inset: var(--stroke-size-200);
          pointer-events: none;
          border-radius: calc(var(--radius-300) - var(--stroke-size-200));
          z-index: 1;
          opacity: 1;
          background: var(--surface-elevated-100);
          transition: opacity var(--speed-200) cubic-bezier(0.22, 1, 0.36, 1);
        }
        .surface::after {
          content: "";
          position: absolute;
          inset: calc((var(--prompt-mesh-overflow) + var(--prompt-mesh-blur-pad)) * -1);
          pointer-events: none;
          border-radius: calc(var(--radius-300) + var(--prompt-mesh-overflow) + var(--prompt-mesh-blur-pad));
          z-index: 0;
          opacity: 0;
          background:
            radial-gradient(
              90% 120% at 12% 16%,
              var(--_prompt-layer-start-tint) 0%,
              transparent 62%
            ),
            radial-gradient(
              90% 120% at 72% 8%,
              var(--_prompt-layer-mid-tint) 0%,
              transparent 60%
            ),
            radial-gradient(
              80% 120% at 86% 72%,
              var(--_prompt-layer-end-tint) 0%,
              transparent 58%
            ),
            radial-gradient(
              110% 120% at 34% 88%,
              var(--_prompt-layer-accent-tint) 0%,
              transparent 64%
            );
          mix-blend-mode: var(--_prompt-spectrum-blend-mode-hover);
          filter: blur(var(--space-050));
          transform: translate3d(0, 0, 0) scaleX(0.94) scaleY(1.01);
          transform-origin: center;
          will-change: transform, opacity, filter;
          transition: opacity var(--speed-200) cubic-bezier(0.22, 1, 0.36, 1), filter var(--speed-200) ease;
        }
        .surface:hover {
          overflow: hidden;
          background: var(--surface-elevated-100);
          animation: promptBorderHoverPulse var(--prompt-hover-border-pulse-speed, var(--speed-500)) ease-in-out infinite;
        }
        :host(:has(.actions-slot:hover)) .surface,
        :host(:has(.actions-slot:focus-within)) .surface {
          overflow: visible;
        }
        .surface:hover::before {
          opacity: 1;
          background:
            radial-gradient(
              90% 120% at 12% 16%,
              var(--_prompt-layer-start-tint) 0%,
              transparent 62%
            ),
            radial-gradient(
              90% 120% at 72% 8%,
              var(--_prompt-layer-mid-tint) 0%,
              transparent 60%
            ),
            radial-gradient(
              80% 120% at 86% 72%,
              var(--_prompt-layer-end-tint) 0%,
              transparent 58%
            ),
            radial-gradient(
              110% 120% at 34% 88%,
              var(--_prompt-layer-accent-tint) 0%,
              transparent 64%
            ),
            var(--surface-elevated-100);
          mix-blend-mode: var(--_prompt-spectrum-blend-mode-hover);
          filter: none;
          animation:
            promptMeshHoverPulse var(--prompt-hover-sweep-speed, var(--speed-500)) ease-in-out infinite alternate,
            promptMeshPulse calc(var(--prompt-hover-sweep-speed, var(--speed-500)) * 1.15) ease-in-out infinite;
        }
        .surface:hover::after {
          opacity: 0;
          animation: none;
        }
        .surface:focus-within {
          overflow: visible;
          border-color: var(--prompt-focus-border-color);
          background: var(--surface-elevated-100);
          animation: none;
        }
        .surface:focus-within::after {
          z-index: 1;
          opacity: 0;
          mix-blend-mode: normal;
          filter: blur(var(--space-200));
          animation: promptMeshPulseFocusSoft var(--prompt-focus-after-pulse-speed) ease-in-out infinite;
        }
        .surface:focus-within::before {
          z-index: 2;
          inset: 0;
          border-radius: var(--radius-300);
          opacity: var(--prompt-focus-surface-opacity);
          background:
            radial-gradient(
              90% 120% at 12% 16%,
              var(--_prompt-layer-start-tint) 0%,
              transparent 62%
            ),
            radial-gradient(
              90% 120% at 72% 8%,
              var(--_prompt-layer-mid-tint) 0%,
              transparent 60%
            ),
            radial-gradient(
              80% 120% at 86% 72%,
              var(--_prompt-layer-end-tint) 0%,
              transparent 58%
            ),
            radial-gradient(
              110% 120% at 34% 88%,
              var(--_prompt-layer-accent-tint) 0%,
              transparent 64%
            ),
            var(--prompt-focus-surface-background, var(--surface-elevated-100));
          mix-blend-mode: var(--_prompt-spectrum-blend-mode-hover);
          animation: none;
        }
        :host([effects-off]) .surface::before {
          inset: 0;
          border-radius: var(--radius-300);
          background: var(--surface-elevated-100);
          mix-blend-mode: normal;
          opacity: 1;
          filter: none;
          animation: none;
        }
        :host([effects-off]) .surface::after {
          display: none;
        }
        :host([effects-off]) .surface:hover {
          box-shadow: none;
          border-color: var(--form-default-border-color-hover);
        }
        :host([effects-off]) .surface:focus-within {
          background: var(--surface-elevated-100);
        }
        @keyframes promptMeshFloat {
          0% {
            transform: translate3d(0, 0, 0) scaleX(var(--prompt-mesh-scale-max-x)) scaleY(var(--prompt-mesh-scale-max-y));
          }
          100% {
            transform: translate3d(0, 0, 0) scaleX(var(--prompt-mesh-scale-min-x)) scaleY(var(--prompt-mesh-scale-min-y));
          }
        }
        @keyframes promptBorderHoverPulse {
          0%,
          100% {
            border-color: var(--prompt-hover-border-pulse-start);
          }
          50% {
            border-color: var(--prompt-hover-border-pulse-end);
          }
        }
        @keyframes promptMeshPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes promptMeshPulseStrong {
          0%,
          100% {
            opacity: 0.18;
          }
          50% {
            opacity: 0.34;
          }
        }
        @keyframes promptMeshPulseFocusSoft {
          0%,
          100% {
            opacity: var(--prompt-focus-after-opacity-min);
          }
          50% {
            opacity: var(--prompt-focus-after-opacity-max);
          }
        }
        @keyframes promptMeshHoverPulse {
          0% {
            transform: translate3d(0, 0, 0) scale(1.02);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1.04);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .surface,
          .surface::before,
          .surface::after {
            transition: none;
            animation: none !important;
          }
          .surface:focus-within {
            animation: none !important;
          }
        }
        .input-wrap {
          position: relative;
          z-index: 2;
          width: 100%;
          padding-bottom: 5rem;
          box-sizing: border-box;
          overflow: visible;
        }
        .preview-shell {
          position: relative;
          width: 100%;
          z-index: 2;
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
        :host([preview-scrollbar="hidden"]) .preview-row {
          scrollbar-width: none;
        }
        :host([preview-scrollbar="hidden"]) .preview-row::-webkit-scrollbar {
          display: none;
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
          color: var(--prompt-placeholder-color, var(--form-default-placeholder-color, var(--text-color-optional)));
          opacity: 1;
          transition: color var(--speed-200) cubic-bezier(0.22, 1, 0.36, 1);
        }
        .surface:hover textarea::placeholder {
          color: var(
            --prompt-placeholder-color-hover,
            var(--prompt-placeholder-color-hover-light)
          );
        }
        :host-context([data-theme="dark"]) .surface:hover textarea::placeholder,
        :host-context([theme="dark"]) .surface:hover textarea::placeholder,
        :host-context(.theme-dark) .surface:hover textarea::placeholder {
          color: var(
            --prompt-placeholder-color-hover,
            var(--prompt-placeholder-color-hover-dark)
          );
        }
        :host-context([data-theme="dark"]),
        :host-context([theme="dark"]),
        :host-context(.theme-dark) {
          --prompt-focus-surface-opacity: 0.35;
          --_prompt-accent-secondary: var(
            --prompt-accent-secondary,
            color-mix(in srgb, var(--_prompt-accent-primary) 64%, var(--grey-1200) 36%)
          );
          --_prompt-accent-mid: color-mix(
            in srgb,
            var(--_prompt-accent-primary) 56%,
            var(--_prompt-accent-secondary) 44%
          );
          --_prompt-start-tint: color-mix(in srgb, var(--_prompt-color-top-start-source) 22%, transparent 78%);
          --_prompt-mid-tint: color-mix(in srgb, var(--_prompt-color-top-mid-source) 18%, transparent 82%);
          --_prompt-end-tint: color-mix(in srgb, var(--_prompt-color-top-end-source) 20%, transparent 80%);
          --_prompt-accent-tint: color-mix(
            in srgb,
            var(--_prompt-color-top-accent-source) 16%,
            transparent 84%
          );
          --_prompt-border-hover-primary-soft: color-mix(
            in srgb,
            var(--prompt-border-color-hover-primary, var(--_prompt-accent-primary)) 56%,
            var(--form-default-border-color-hover) 44%
          );
          --_prompt-border-hover-primary-strong: color-mix(
            in srgb,
            var(--prompt-border-color-hover-primary, var(--_prompt-accent-primary)) 78%,
            var(--form-default-border-color-hover) 22%
          );
          --_prompt-border-hover-secondary-soft: color-mix(
            in srgb,
            var(--prompt-border-color-hover-secondary, var(--_prompt-accent-secondary)) 56%,
            var(--form-default-border-color-hover) 44%
          );
          --_prompt-border-hover-secondary-strong: color-mix(
            in srgb,
            var(--prompt-border-color-hover-secondary, var(--_prompt-accent-secondary)) 78%,
            var(--form-default-border-color-hover) 22%
          );
          --prompt-hover-border-pulse-start: color-mix(
            in srgb,
            var(--prompt-focus-border-color) 10%,
            transparent 90%
          );
          --prompt-hover-border-pulse-end: color-mix(
            in srgb,
            var(--prompt-focus-border-color) 25%,
            transparent 75%
          );
          --prompt-focus-border-color: var(--white-opacity-50);
          --prompt-surface-filter: drop-shadow(
            0 var(--stroke-size-100) 0 var(--black-opacity-10)
          );
          --prompt-focus-after-opacity: 0.3;
          --prompt-focus-after-opacity-min: 0;
          --prompt-focus-after-opacity-max: 0.3;
          --_prompt-spectrum-blend-mode-hover: soft-light;
          --_prompt-spectrum-blend-mode-focus: normal;
        }
        :host-context([data-theme="light"]),
        :host-context([theme="light"]),
        :host-context(.theme-light) {
          --prompt-focus-after-pulse-speed: var(--prompt-focus-after-pulse-speed-light);
        }
        :host-context([data-theme="dark"]),
        :host-context([theme="dark"]),
        :host-context(.theme-dark) {
          --prompt-focus-after-pulse-speed: var(--prompt-focus-after-pulse-speed-dark);
        }
        .surface:focus-within textarea::placeholder {
          color: var(
            --prompt-placeholder-color-focus,
            var(--prompt-placeholder-color-focus-light)
          );
        }
        :host-context([data-theme="dark"]) .surface:focus-within textarea::placeholder,
        :host-context([theme="dark"]) .surface:focus-within textarea::placeholder,
        :host-context(.theme-dark) .surface:focus-within textarea::placeholder {
          color: var(
            --prompt-placeholder-color-focus,
            var(--prompt-placeholder-color-focus-dark)
          );
        }
        textarea:disabled {
          cursor: not-allowed;
        }
        .actions-slot {
          position: absolute;
          z-index: 2;
          bottom: var(--space-300);
          display: inline-flex;
          align-items: center;
          gap: var(--space-100);
          pointer-events: none;
          overflow: visible;
        }
        .actions-slot > * {
          pointer-events: auto;
        }
        .actions-slot-left {
          left: var(--space-300);
          gap: 0;
        }
        .actions-slot-right {
          right: var(--space-300);
        }
        .actions-separator {
          margin-inline: var(--space-200);
          pointer-events: none;
        }
        .actions-separator[hidden] {
          display: none !important;
        }
        .actions-slot mui-button {
          --action-radius-x-small: var(--prompt-action-radius);
          --action-radius-small: var(--prompt-action-radius);
          --action-radius-medium: var(--prompt-action-radius);
          --action-radius-large: var(--prompt-action-radius);
        }
        slot[name="actions-trigger"]::slotted(mui-button),
        slot[name="actions"]::slotted(mui-button),
        slot[name="actions-right"]::slotted(mui-button) {
          --action-radius-x-small: var(--prompt-action-radius);
          --action-radius-small: var(--prompt-action-radius);
          --action-radius-medium: var(--prompt-action-radius);
          --action-radius-large: var(--prompt-action-radius);
        }
        slot[name="actions-trigger"]::slotted(mui-dropdown),
        slot[name="actions"]::slotted(mui-dropdown),
        slot[name="actions-right"]::slotted(mui-dropdown) {
          --action-radius-x-small: var(--prompt-action-radius);
          --action-radius-small: var(--prompt-action-radius);
          --action-radius-medium: var(--prompt-action-radius);
          --action-radius-large: var(--prompt-action-radius);
          position: relative;
          z-index: 4;
        }
        slot[name="actions-trigger"]::slotted(mui-h-stack),
        slot[name="actions"]::slotted(mui-h-stack),
        slot[name="actions-right"]::slotted(mui-h-stack) {
          --action-radius-x-small: var(--prompt-action-radius);
          --action-radius-small: var(--prompt-action-radius);
          --action-radius-medium: var(--prompt-action-radius);
          --action-radius-large: var(--prompt-action-radius);
        }
        slot[name="actions-trigger"]::slotted(mui-prompt-toggle),
        slot[name="actions"]::slotted(mui-prompt-toggle),
        slot[name="actions-right"]::slotted(mui-prompt-toggle) {
          --action-radius-x-small: var(--prompt-action-radius);
          --action-radius-small: var(--prompt-action-radius);
          --action-radius-medium: var(--prompt-action-radius);
          --action-radius-large: var(--prompt-action-radius);
        }
        slot[name="actions-trigger"],
        slot[name="actions"],
        slot[name="actions-right"] {
          display: inline-flex;
          align-items: center;
          gap: var(--space-025);
        }
        slot[name="actions-trigger"] {
          flex: 0 0 auto;
        }
        ::slotted([slot="actions"]:not([hidden])),
        ::slotted([slot="actions-trigger"]:not([hidden])),
        ::slotted([slot="actions-right"]:not([hidden])) {
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
        <div class="actions-slot actions-slot-left">
          <slot name="actions-trigger">
            <mui-button id="promptDefaultActionsTrigger" variant="tertiary" fan-trigger icon-only size="small" aria-label="More actions">
              <mui-icon-toggle rotate size="small">
                <mui-icon-grid slot="start" size="small"></mui-icon-grid>
                <mui-icon-close slot="end" size="small"></mui-icon-close>
              </mui-icon-toggle>
            </mui-button>
          </slot>
          <mui-rule class="actions-separator" direction="vertical" length="var(--space-400)" weight="var(--stroke-size-100)" aria-hidden="true"></mui-rule>
          <slot name="actions"></slot>
        </div>
        <div class="actions-slot actions-slot-right">
          <slot name="actions-right"></slot>
        </div>
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
