import "../mui-body";
import "../mui-hint";

type ColorInputSize = "x-small" | "small" | "medium" | "large";

const COLOR_INPUT_SIZES: ColorInputSize[] = ["x-small", "small", "medium", "large"];
const DESCRIPTION_SIZES: Record<ColorInputSize, string> = {
  "x-small": "xx-small",
  small: "x-small",
  medium: "small",
  large: "medium",
};

const normalizeHex = (value: string) => (/^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : "#000000");

const getLuminance = (hex: string) => {
  const value = normalizeHex(hex).slice(1);
  const channels = [0, 2, 4]
    .map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255)
    .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const readableText = (hex: string) => (getLuminance(hex) > 0.179 ? "#000" : "#fff");

const hoverMixColor = (hex: string) => (getLuminance(hex) < 0.04 ? "#ffffff" : "#000000");

export class MuiColorInput extends HTMLElement {
  static get observedAttributes() {
    return [
      "value",
      "name",
      "id",
      "label",
      "description",
      "size",
      "disabled",
      "hide-label",
      "hide-value",
      "hide-text",
      "gap",
      "copyable",
      "no-copy",
    ];
  }

  private inputId = `mui-color-input-${Math.random().toString(36).slice(2, 11)}`;
  private copyTimeout: number | null = null;
  private _documentPointerDownHandler = (event: PointerEvent) => {
    if (event.composedPath().includes(this)) return;
    const activeEl = this.shadowRoot?.activeElement as HTMLElement | null;
    activeEl?.blur();
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    input?.blur();
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this.render();
    document.addEventListener("pointerdown", this._documentPointerDownHandler, true);
  }

  disconnectedCallback() {
    if (this.copyTimeout) clearTimeout(this.copyTimeout);
    document.removeEventListener("pointerdown", this._documentPointerDownHandler, true);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (!this.isConnected || oldValue === newValue) return;

    if (name === "value") {
      this.syncValue(newValue || "#000000");
      return;
    }

    if (name === "disabled") {
      const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
      if (input) input.disabled = this.hasAttribute("disabled");
      return;
    }

    if (name === "name") {
      const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
      if (input) input.name = newValue || "";
      return;
    }

    this.render();
  }

  get value() {
    return this.getAttribute("value") || "#000000";
  }

  set value(value: string) {
    this.setAttribute("value", normalizeHex(value));
  }

  focus(options?: FocusOptions) {
    this.shadowRoot?.querySelector("input")?.focus(options);
  }

  blur() {
    (this.shadowRoot?.activeElement as HTMLElement | null)?.blur();
    this.shadowRoot?.querySelector("input")?.blur();
  }

  private syncDescriptionState() {
    const label = this.shadowRoot?.querySelector("label");
    const descriptionSlot = this.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement | null;
    const descriptionWrapper = this.shadowRoot?.querySelector(".color-input-description") as HTMLElement | null;
    const assignedNodes = descriptionSlot?.assignedNodes() || [];
    const hasAssignedContent = assignedNodes.some(
      (node) => node.nodeType === Node.ELEMENT_NODE || Boolean(node.textContent?.trim()),
    );
    const hasDescription = Boolean(this.getAttribute("description")?.trim() || hasAssignedContent);

    if (descriptionWrapper) {
      descriptionWrapper.hidden = !hasDescription;
    }

    if (label) {
      label.classList.toggle("label-with-description", hasDescription);
    }
  }

  private updateSlottedElements() {
    const beforeSlot = this.shadowRoot?.querySelector('slot[name="before"]') as HTMLSlotElement | null;
    const afterSlot = this.shadowRoot?.querySelector('slot[name="after"]') as HTMLSlotElement | null;
    const beforeWrapper = this.shadowRoot?.querySelector(".before-slot") as HTMLElement | null;
    const afterWrapper = this.shadowRoot?.querySelector(".after-slot") as HTMLElement | null;
    const requestedSize = this.getAttribute("size") as ColorInputSize | null;
    const size = requestedSize && COLOR_INPUT_SIZES.includes(requestedSize) ? requestedSize : "medium";

    const syncSlot = (slot: HTMLSlotElement | null, wrapper: HTMLElement | null) => {
      if (!slot || !wrapper) return;
      const elements = slot.assignedElements();
      wrapper.hidden = elements.length === 0;

      elements.forEach((element) => {
        if (!element.hasAttribute("usage")) {
          element.setAttribute("usage", "color-input");
        }
        if (!element.hasAttribute("size")) {
          element.setAttribute("size", size);
        }
      });
    };

    syncSlot(beforeSlot, beforeWrapper);
    syncSlot(afterSlot, afterWrapper);
  }

  private setupSlots() {
    const descriptionSlot = this.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement | null;
    descriptionSlot?.addEventListener("slotchange", () => this.syncDescriptionState());
    this.syncDescriptionState();

    const beforeSlot = this.shadowRoot?.querySelector('slot[name="before"]') as HTMLSlotElement | null;
    const afterSlot = this.shadowRoot?.querySelector('slot[name="after"]') as HTMLSlotElement | null;
    beforeSlot?.addEventListener("slotchange", () => this.updateSlottedElements());
    afterSlot?.addEventListener("slotchange", () => this.updateSlottedElements());
    this.updateSlottedElements();
  }

  private syncValue(next: string) {
    const value = normalizeHex(next);
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    const control = this.shadowRoot?.querySelector(".control") as HTMLElement | null;
    const swatch = this.shadowRoot?.querySelector(".swatch") as HTMLElement | null;
    const text = this.shadowRoot?.querySelector(".value") as HTMLElement | null;
    const contrastColor = readableText(value);
    const hoverMix = hoverMixColor(value);

    if (input && input.value !== value) input.value = value;
    if (control) {
      control.style.borderColor = value;
      control.style.setProperty("--color-input-value", value);
      control.style.setProperty("--color-input-contrast", contrastColor);
      control.style.setProperty("--color-input-hover-mix", hoverMix);
    }
    if (swatch) {
      swatch.style.background = value;
      swatch.style.borderColor = value;
      swatch.style.color = contrastColor;
    }
    if (text) {
      if (text.textContent !== "Copied!") {
        text.textContent = value;
      }
      if (text instanceof HTMLButtonElement) {
        text.setAttribute("aria-label", `Copy colour ${value}`);
      }
      text.style.color = contrastColor;
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const value = normalizeHex(this.value);
    const requestedSize = this.getAttribute("size") as ColorInputSize | null;
    const size = requestedSize && COLOR_INPUT_SIZES.includes(requestedSize) ? requestedSize : "medium";
    const contrastColor = readableText(value);
    const hoverMix = hoverMixColor(value);
    const gap = this.getAttribute("gap") || "var(--space-400)";
    const id = this.getAttribute("id") || this.inputId;
    const label = this.getAttribute("label") || "Colour";
    const description = this.getAttribute("description") || "";
    const descriptionId = `${id}-description`;
    const hasDescription = Boolean(description.trim() || this.querySelector('[slot="description"]'));
    const hidden = this.hasAttribute("hide-label");
    const disabled = this.hasAttribute("disabled");
    const hideValue = this.hasAttribute("hide-value") || this.hasAttribute("hide-text");
    const noCopy = this.hasAttribute("no-copy");
    const heights: Record<ColorInputSize, string> = {
      "x-small": "var(--action-size-x-small)",
      small: "var(--action-size-small)",
      medium: "var(--action-size-medium)",
      large: "var(--action-size-large)",
    };

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: inline-block;
          width: 100%;
        }
        .vh {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }
        label {
          display: block;
          margin-block-end: var(--space-100);
          color: var(--text-color);
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
          font-weight: var(--font-weight-medium);
        }
        :host([size="x-small"]) label {
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
        }
        :host([size="small"]) label {
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
        }
        :host([size="large"]) label {
          font-size: var(--text-font-size-l);
          line-height: var(--text-line-height-l);
        }
        label.label-with-description {
          margin-block-end: var(--space-000);
        }
        .color-input-description {
          margin-block-end: var(--space-100);
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          gap: ${gap};
          width: 100%;
        }
        .before-slot,
        .after-slot {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
        }
        .before-slot[hidden],
        .after-slot[hidden] {
          display: none;
        }
        .control {
          position: relative;
          flex: 1 1 100%;
          width: 100%;
          min-width: 0;
          height: ${heights[size]};
          box-sizing: border-box;
          background: transparent;
          border: var(--border-thin);
          border-color: ${value};
          border-radius: var(--form-radius-${size});
          padding: var(--space-025);
          display: flex;
          align-items: stretch;
        }
        .control:has(input:focus) {
          outline: var(--outline-medium);
          outline-color: var(--outline-color);
        }
        .swatch {
          position: relative;
          flex: 1 1 auto;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          background: ${value};
          border: var(--border-thin);
          border-color: ${value};
          color: var(--color-input-contrast, ${contrastColor});
          border-radius: calc(var(--form-radius-${size}) - var(--space-025));
          display: flex;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
        }
        :host([size="x-small"]) .swatch {
          padding-inline: var(--action-padding-inline-x-small) var(--stroke-size-100);
        }
        :host([size="small"]) .swatch {
          padding-inline: var(--action-padding-inline-small) var(--stroke-size-200);
        }
        :host([size="medium"]) .swatch {
          padding-inline: var(--action-padding-inline) var(--stroke-size-200);
        }
        :host([size="large"]) .swatch {
          padding-inline: var(--action-padding-inline-large) var(--stroke-size-300);
        }
        input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          opacity: 0;
          cursor: pointer;
          z-index: 1;
        }
        input:disabled {
          cursor: not-allowed;
        }
        .value {
          position: relative;
          z-index: 0;
          color: var(--color-input-contrast, ${contrastColor});
          font-family: inherit;
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
          font-weight: var(--font-weight-regular);
          user-select: none;
          pointer-events: none;
        }
        .swatch mui-hint {
          display: inline-flex;
          position: relative;
          z-index: 2;
        }
        button.value.copyable {
          appearance: none;
          background: transparent;
          border: 0;
          padding: 0;
          margin: 0;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          font-weight: inherit;
          color: var(--color-input-contrast, ${contrastColor});
          position: relative;
          z-index: 2;
          pointer-events: auto;
          cursor: pointer;
          border-radius: var(--form-radius-x-small);
          transition: background-color var(--motion-duration-fast, 150ms) ease;
        }
        button.value.copyable:hover {
          background: color-mix(in srgb, var(--color-input-value, ${value}) 85%, var(--color-input-hover-mix, ${hoverMix}));
        }
        button.value.copyable:focus-visible {
          outline: var(--outline-medium);
          outline-color: var(--outline-color);
          outline-offset: calc(-1 * var(--stroke-size-200));
        }
        :host([size="x-small"]) .value {
          font-size: var(--text-font-size-xxs);
          line-height: var(--text-line-height-xxs);
        }
        :host([size="x-small"]) button.value.copyable {
          padding: var(--space-000) var(--space-100);
          border-radius: calc(var(--form-radius-x-small) - var(--stroke-size-100));
        }
        :host([size="small"]) .value {
          font-size: var(--text-font-size-s);
          line-height: var(--text-line-height-s);
        }
        :host([size="small"]) button.value.copyable {
          padding: var(--space-025) var(--space-200);
          border-radius: calc(var(--form-radius-small) - var(--stroke-size-200));
        }
        :host([size="medium"]) .value {
          font-size: var(--text-font-size);
          line-height: var(--text-line-height);
        }
        :host([size="medium"]) button.value.copyable {
          padding: var(--space-050) var(--space-300);
          border-radius: calc(var(--form-radius-medium) - var(--stroke-size-300));
        }
        :host([size="large"]) .value {
          font-size: var(--text-font-size-l);
          line-height: var(--text-line-height-l);
        }
        :host([size="large"]) button.value.copyable {
          padding: var(--space-100) var(--space-400);
          border-radius: calc(var(--form-radius-large) - var(--stroke-size-400));
        }
        :host([disabled]) {
          opacity: 0.5;
        }
      </style>
      <label class="${[hidden ? "vh" : "", hasDescription ? "label-with-description" : ""].filter(Boolean).join(" ")}" for="${id}">${label}</label>
      <div id="${descriptionId}" class="color-input-description"${hasDescription ? "" : " hidden"}>
        <slot name="description">${
          description ? `<mui-body variant="secondary" size="${DESCRIPTION_SIZES[size]}">${description}</mui-body>` : ""
        }</slot>
      </div>
      <div class="input-wrapper">
        <div class="before-slot" hidden>
          <slot name="before"></slot>
        </div>
        <div class="control" style="--color-input-value: ${value}; --color-input-contrast: ${contrastColor}; --color-input-hover-mix: ${hoverMix};">
          <input id="${id}" type="color" value="${value}" ${disabled ? "disabled" : ""} name="${this.getAttribute("name") || ""}" ${
            hasDescription ? `aria-describedby="${descriptionId}"` : ""
          }>
          <div class="swatch">
            ${
              hideValue
                ? ""
                : noCopy
                  ? `<span class="value">${value}</span>`
                  : `<mui-hint size="${size}" placement="top" delay="600" initial-delay="600" disable-on-touch>
                      <button slot="trigger" type="button" class="value copyable" aria-label="Copy colour ${value}">${value}</button>
                      Copy value
                    </mui-hint>`
            }
          </div>
        </div>
        <div class="after-slot" hidden>
          <slot name="after"></slot>
        </div>
      </div>
    `;

    const labelEl = this.shadowRoot.querySelector("label");
    labelEl?.addEventListener("click", () => {
      input.focus();
    });

    const input = this.shadowRoot.querySelector("input") as HTMLInputElement;
    input.addEventListener("input", (event) => {
      event.stopPropagation();
      this.setAttribute("value", input.value);
      this.dispatchEvent(new CustomEvent("input", { bubbles: true, composed: true, detail: { value: input.value } }));
    });
    input.addEventListener("change", (event) => {
      event.stopPropagation();
      this.setAttribute("value", input.value);
      this.dispatchEvent(new CustomEvent("change", { bubbles: true, composed: true, detail: { value: input.value } }));
      input.blur();
    });

    const copyButton = this.shadowRoot.querySelector("button.value.copyable") as HTMLButtonElement | null;
    const copyHint = this.shadowRoot.querySelector(".swatch mui-hint") as
      | (HTMLElement & { close?: (immediate?: boolean) => void })
      | null;
    if (copyButton) {
      copyButton.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        copyHint?.close?.(true);
        copyButton.blur();
        try {
          await navigator.clipboard.writeText(this.value);
        } catch {}
        copyButton.textContent = "Copied";
        this.dispatchEvent(new CustomEvent("copy", { bubbles: true, composed: true, detail: { value: this.value } }));
        if (this.copyTimeout) clearTimeout(this.copyTimeout);
        this.copyTimeout = window.setTimeout(() => {
          copyButton.textContent = this.value;
        }, 1500);
      });
    }

    this.setupSlots();
  }
}

if (!customElements.get("mui-color-input")) customElements.define("mui-color-input", MuiColorInput);
