import { getPartMap } from "../../utils/part-map";

/* Mui Button */
class MuiButton extends HTMLElement {
  static get observedAttributes() {
    return [
      "onclick",
      "type",
      "aria-label",
      "disabled",
      "pending",
      "variant",
      "stroke",
      "stroke-ring-size",
      "focus-ring",
      "size",
      "usage",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    if (!this.hasAttribute("size")) this.setAttribute("size", "medium");
    this.syncRingSizeAttribute();

    await this.waitForPartMap();

    if (!this.shadowRoot) return;

    const partMap = getPartMap("text", "spacing", "layout", "visual");

    let html = /*html*/ `
    <style>


    :host {
      display: inline-block;
      width: auto;
      text-align: center;
      --action-focus-outline: var(--stroke-size-400) var(--stroke-outset) var(--outline-color);
      --action-focus-outline-inset-offset: var(--stroke-size-400);
      --action-focus-outline-offset: calc(-1 * var(--action-focus-outline-inset-offset));
    }
    button {
      vertical-align: baseline;
      border: none;
      cursor: pointer;
      width: 100%;
      border-radius: var(--action-radius-medium);
      padding: var(--action-padding);
      min-height: var(--action-size-medium);
      text-decoration: none;
      line-height: var(--action-line-height);
      display: inherit;
      text-transform: none;
      overflow: visible;
      -webkit-appearance: button;
      font-family: var(--font-family);
      font-size: var(--action-font-size);
      font-weight: var(--action-font-weight);
      background: var(--action-primary-background);
      color: var(--action-primary-text-color);
      border: var(--action-primary-border);
      text-align: inherit;
    }

    /* Turned back on for focus-visible
    ========================================= */
    button:focus-visible, button:active, button:hover { outline: var(--space-000); }

    button:hover {
      background: var(--action-primary-background-hover);
      color: var(--action-primary-text-color-hover);
      border: var(--action-primary-border-hover);
    }

    button:focus-visible {
      background: var(--action-primary-background-focus);
      color: var(--action-primary-text-color-focus);
      border: var(--action-primary-border-focus);
    }

    button:disabled {
      background: var(--action-primary-background-disabled);
      color: var(--action-primary-text-color-disabled);
      border: var(--action-primary-border-disabled);
      cursor: not-allowed;
    }

    :host([pending]) {
      pointer-events: none;
    }

    :host([pending]) button {
      cursor: progress;
    }

    button, button:before, button:after {box-sizing: border-box;}

    button:focus-visible {
      outline: var(--action-focus-outline);
      outline-offset: var(--action-focus-outline-offset);
    }

    :host button ::slotted(.mui-icon) { fill: var(--action-primary-text-color); }
    :host button:hover ::slotted(.mui-icon) { fill: var(--action-primary-text-color-hover); }
    :host button:focus-visible ::slotted(.mui-icon) { fill: var(--action-primary-text-color-focus); }
    :host button:disabled ::slotted(.mui-icon) { fill: var(--action-primary-text-color-disabled); }

    /* Primary 
    ========================================= */
    :host([variant="primary"]) button {
      background: var(--action-primary-background);
      color: var(--action-primary-text-color);
      border: var(--action-primary-border);
    }

    :host([variant="primary"]) button:hover {
      background: var(--action-primary-background-hover);
      color: var(--action-primary-text-color-hover);
      border: var(--action-primary-border-hover);
    }

    :host([variant="primary"]) button:focus-visible {
      background: var(--action-primary-background-focus);
      color: var(--action-primary-text-color-focus);
      border: var(--action-primary-border-focus);
    }

    :host([variant="primary"]) button:disabled {
      background: var(--action-primary-background-disabled);
      color: var(--action-primary-text-color-disabled);
      border: var(--action-primary-border-disabled);
      cursor: not-allowed;
    }

    :host([variant="primary"]) button ::slotted(.mui-icon) { fill: var(--action-primary-text-color); }
    :host([variant="primary"]) button:hover ::slotted(.mui-icon) { fill: var(--action-primary-text-color-hover); }
    :host([variant="primary"]) button:focus-visible ::slotted(.mui-icon) { fill: var(--action-primary-text-color-focus); }
    :host([variant="primary"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-primary-text-color-disabled); }

    /* Secondary
    ========================================= */

    :host([variant="secondary"]) button {
      background: var(--action-secondary-background);
      color: var(--action-secondary-text-color);
      border: var(--action-secondary-border); 
    }

    :host([variant="secondary"]) button:hover {
      background: var(--action-secondary-background-hover);
      color: var(--action-secondary-text-color-hover);
      border: var(--action-secondary-border-hover); 
    }

    :host([variant="secondary"]) button:focus-visible {
      background: var(--action-secondary-background-focus);
      color: var(--action-secondary-text-color-focus);
      border: var(--action-secondary-border-focus); 
    }

    :host([variant="secondary"]) button:disabled {
      background: var(--action-secondary-background-disabled);
      color: var(--action-secondary-text-color-disabled);
      border: var(--action-secondary-border-disabled); 
      cursor: not-allowed;
    }

    :host([variant="secondary"]) button ::slotted(.mui-icon) { fill: var(--action-secondary-text-color); }
    :host([variant="secondary"]) button:hover ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-hover); }
    :host([variant="secondary"]) button:focus-visible ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-focus); }
    :host([variant="secondary"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-secondary-text-color-disabled); }

    /* Tertiary
    ========================================= */

    :host([variant="tertiary"]) button {
      background: var(--action-tertiary-background);
      color: var(--action-tertiary-text-color);
      border: var(--action-tertiary-border);
    }

    :host([variant="tertiary"]) button:hover {
      background: var(--action-tertiary-background-hover);
      color: var(--action-tertiary-text-color-hover);
      border: var(--action-tertiary-border-hover);
    }

    :host([variant="tertiary"]) button:focus-visible {
      background: var(--action-tertiary-background-focus);
      color: var(--action-tertiary-text-color-focus);
      border: var(--action-tertiary-border-focus);
    }

    :host([variant="tertiary"]) button:disabled {
      background: var(--action-tertiary-background-disabled);
      color: var(--action-tertiary-text-color-disabled);
      border: var(--action-tertiary-border-disabled);
      cursor: not-allowed;
    }

    :host([variant="tertiary"]) button ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color); }
    :host([variant="tertiary"]) button:hover ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-hover); }
    :host([variant="tertiary"]) button:focus-visible ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-focus); }
    :host([variant="tertiary"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-tertiary-text-color-disabled); }

    /* Overlay
    ========================================= */
    :host([variant="overlay"]) button {
      background: color-mix(in srgb, var(--action-overlay-background) 85%, transparent);
      color: var(--action-overlay-text-color);
      border: var(--action-overlay-border);
      -webkit-backdrop-filter: blur(var(--space-100)) saturate(120%);
      backdrop-filter: blur(var(--space-100)) saturate(120%);
    }

    :host([variant="overlay"]) button:hover {
      background: color-mix(in srgb, var(--action-overlay-background-hover) 85%, transparent);
      color: var(--action-overlay-text-color-hover);
      border: var(--action-overlay-border-hover);
      -webkit-backdrop-filter: blur(var(--space-100)) saturate(120%);
      backdrop-filter: blur(var(--space-100)) saturate(120%);
    }

    :host([variant="overlay"]) button:focus-visible {
      background: color-mix(in srgb, var(--action-overlay-background-focus) 85%, transparent);
      color: var(--action-overlay-text-color-focus);
      border: var(--action-overlay-border-focus);
      -webkit-backdrop-filter: blur(var(--space-100)) saturate(120%);
      backdrop-filter: blur(var(--space-100)) saturate(120%);
    }

    :host([variant="overlay"]) button:disabled {
      background: color-mix(in srgb, var(--action-overlay-background-disabled) 85%, transparent);
      color: var(--action-overlay-text-color-disabled);
      border: var(--action-overlay-border-disabled);
      -webkit-backdrop-filter: blur(var(--space-100)) saturate(120%);
      backdrop-filter: blur(var(--space-100)) saturate(120%);
      cursor: not-allowed;
    }

    :host([variant="overlay"]) button ::slotted(.mui-icon) { fill: var(--action-overlay-text-color); }
    :host([variant="overlay"]) button:hover ::slotted(.mui-icon) { fill: var(--action-overlay-text-color-hover); }
    :host([variant="overlay"]) button:focus-visible ::slotted(.mui-icon) { fill: var(--action-overlay-text-color-focus); }
    :host([variant="overlay"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-overlay-text-color-disabled); }

    /* Attention
    ========================================= */
    :host([variant="attention"]) button {
      background: var(--action-attention-background);
      color: var(--action-attention-text-color);
      border: var(--action-attention-border);
    }

    :host([variant="attention"]) button:hover {
      background: var(--action-attention-background-hover);
      color: var(--action-attention-text-color-hover);
      border: var(--action-attention-border-hover);
    }

    :host([variant="attention"]) button:focus-visible {
      background: var(--action-attention-background-focus);
      color: var(--action-attention-text-color-focus);
      border: var(--action-attention-border-focus);
    }

    :host([variant="attention"]) button:disabled {
      background: var(--action-attention-background-disabled);
      color: var(--action-attention-text-color-disabled);
      border: var(--action-attention-border-disabled);
      cursor: not-allowed;
    }

    :host([variant="attention"]) button ::slotted(.mui-icon) { fill: var(--action-attention-text-color); }
    :host([variant="attention"]) button:hover ::slotted(.mui-icon) { fill: var(--action-attention-text-color-hover); }
    :host([variant="attention"]) button:focus-visible ::slotted(.mui-icon) { fill: var(--action-attention-text-color-focus); }
    :host([variant="attention"]) button:disabled ::slotted(.mui-icon) { fill: var(--action-attention-text-color-disabled); }

    :host,
    :host([variant="primary"]) {
      --action-ring-color: var(--action-primary-border-color);
      --action-ring-color-hover: var(--action-primary-border-color-hover);
      --action-ring-color-focus: var(--action-primary-border-color-focus);
      --action-ring-color-disabled: var(--action-primary-border-color-disabled);
    }

    :host([variant="secondary"]) {
      --action-ring-color: var(--action-secondary-border-color);
      --action-ring-color-hover: var(--action-secondary-border-color-hover);
      --action-ring-color-focus: var(--action-secondary-border-color-focus);
      --action-ring-color-disabled: var(--action-secondary-border-color-disabled);
    }

    :host([variant="tertiary"]) {
      --action-ring-color: var(--action-tertiary-border-color);
      --action-ring-color-hover: var(--action-tertiary-border-color-hover);
      --action-ring-color-focus: var(--action-tertiary-border-color-focus);
      --action-ring-color-disabled: var(--action-tertiary-border-color-disabled);
    }

    :host([variant="overlay"]) {
      --action-ring-size: var(--stroke-size-100);
      --action-ring-color: var(--action-overlay-border-color);
      --action-ring-color-hover: var(--action-overlay-border-color-hover);
      --action-ring-color-focus: var(--action-overlay-border-color-focus);
      --action-ring-color-disabled: var(--action-overlay-border-color-disabled);
    }

    :host([variant="attention"]) {
      --action-ring-color: var(--action-attention-border-color);
      --action-ring-color-hover: var(--action-attention-border-color-hover);
      --action-ring-color-focus: var(--action-attention-border-color-focus);
      --action-ring-color-disabled: var(--action-attention-border-color-disabled);
    }

    :host([stroke="ring"]:not([usage="input"])) button {
      border: none;
      box-shadow: var(
        --action-ring-shadow,
        inset 0 0 0 var(--action-ring-size, var(--stroke-size-100)) var(--action-ring-color)
      );
    }

    :host([stroke="ring"]:not([usage="input"])) button:hover {
      border: none;
      box-shadow: var(
        --action-ring-shadow-hover,
        inset 0 0 0 var(--action-ring-size, var(--stroke-size-100)) var(--action-ring-color-hover)
      );
    }

    :host([stroke="ring"]:not([usage="input"])) button:focus-visible {
      border: none;
      box-shadow: var(
        --action-ring-shadow-focus,
        inset 0 0 0 var(--action-ring-size, var(--stroke-size-100)) var(--action-ring-color-focus)
      );
    }

    :host([stroke="ring"]:not([usage="input"])) button:disabled {
      border: none;
      box-shadow: var(
        --action-ring-shadow-disabled,
        inset 0 0 0 var(--action-ring-size, var(--stroke-size-100)) var(--action-ring-color-disabled)
      );
    }

    /* Icon only
    ========================================= */
    :host([icon-only]) button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--action-size-medium);
      width: var(--action-size-medium);
      padding: var(--action-icon-only-padding);
    }
    /* ===================================== */


    /* ========================================================================== */
    /* STYLE ADJUSTMENTS WHEN BUTTON IS SLOTTED WITHIN INPUT                      */
    /* Related styles unique to this usage is found in the mui-input/index.js     */
    /* ========================================================================== */
    :host([slot="before"][usage="input"]) button,
    :host([slot="after"][usage="input"]) button {
      border: var(--border-thin);
      min-height: var(--input-slot-min-height);
      background: var(--input-background);
      color: var(--action-secondary-text-color);
      border-color: var(--form-default-border-color);
    }

    :host([slot="before"][usage="input"]) button:hover,
    :host([slot="before"][usage="input"]) button:focus-visible,
    :host([slot="after"][usage="input"]) button:hover,
    :host([slot="after"][usage="input"]) button:focus-visible {
      background: var(--input-background);
      color: var(--action-secondary-text-color-hover);
      border-color: var(--form-default-border-color-hover);
      border-width: var(--stroke-size-100);
    }

    :host([slot="after"][usage="input"]) button ::slotted(.mui-icon),
    :host([slot="before"][usage="input"]) button ::slotted(.mui-icon) { 
      fill: var(--action-secondary-text-color); 
    }
    
    :host([slot="after"][usage="input"]) button:hover ::slotted(.mui-icon),
    :host([slot="before"][usage="input"]) button:hover ::slotted(.mui-icon) { 
      fill: var(--action-secondary-text-color-hover); 
    }

    :host([slot="after"][usage="input"]) button:focus-visible ::slotted(.mui-icon),
    :host([slot="before"][usage="input"]) button:focus-visible ::slotted(.mui-icon) { 
      fill: var(--action-secondary-text-color-focus); 
    }

    :host([slot="after"][usage="input"]) button:disabled ::slotted(.mui-icon),
    :host([slot="before"][usage="input"]) button:disabled ::slotted(.mui-icon) { 
      fill: var(--action-secondary-text-color-disabled); 
    }


    /* ========================================================================== */
    /* BEFORE: When a BUTTON has slot="before" applied to host for INPUT usage    */
    /* ========================================================================== */
    :host([slot="before"][usage="input"]) button {
      border-right: none;
      border-top-right-radius: var(--radius-000);
      border-bottom-right-radius: var(--radius-000);
    }

    :host([slot="before"][usage="input"]) button:hover,
    :host([slot="before"][usage="input"]) button:focus-visible {
      border-right: none;
      box-shadow: var(--stroke-size-100) 0 0 0 var(--form-default-border-color-hover);
    }

    /* ========================================================================== */
    /* AFTER: When a BUTTON has slot="after" applied to host for INPUT usage      */
    /* ========================================================================== */
    :host([slot="after"][usage="input"]) button {
      border-left: none;
      border-top-left-radius: var(--radius-000);
      border-bottom-left-radius: var(--radius-000);
    }

    :host([slot="after"][usage="input"]) button:hover,
    :host([slot="after"][usage="input"]) button:focus-visible {
      border-left: none;
      box-shadow: calc(-1 * var(--stroke-size-100)) 0 0 0 var(--form-default-border-color-hover);
    }

    /* ========================================================================== */


    :host([alert-positive-slot]) {
      --alert-text: var(--feedback-positive-text);
      --alert-icon: var(--feedback-positive-icon);
      --alert-bg-hover: var(--feedback-positive-action-background);
    }

    :host([alert-info-slot]) {
      --alert-text: var(--feedback-info-text);
      --alert-icon: var(--feedback-info-icon);
      --alert-bg-hover: var(--feedback-info-action-background);
    }

    :host([alert-warning-slot]) {
      --alert-text: var(--feedback-warning-text);
      --alert-icon: var(--feedback-warning-icon);
      --alert-bg-hover: var(--feedback-warning-action-background);
    }

    :host([alert-attention-slot]) {
      --alert-text: var(--feedback-attention-text);
      --alert-icon: var(--feedback-attention-icon);
      --alert-bg-hover: var(--feedback-attention-action-background);
    }

    :host([alert-slot]) button {
      font-weight: var(--font-weight-semi-bold);
      color: var(--alert-text);
    }

    :host([alert-slot]) button:hover,
    :host([alert-slot]) button:focus-visible {
      background: var(--alert-bg-hover);
      color: var(--alert-text);
    }

    :host([alert-slot]) ::slotted(.mui-icon),
    :host([alert-slot]):hover ::slotted(.mui-icon),
    :host([alert-slot]):focus-visible ::slotted(.mui-icon) {
      fill: var(--alert-icon);
    }

    /* Dropdown Slot */
    :host([size][dropdown-slot]) button {
      border-radius: var(--radius-000);
      white-space: nowrap;
    }

    :host([size][dropdown-slot-first]) button {
      border-top-left-radius: calc(var(--radius-100) / 2);
      border-top-right-radius: calc(var(--radius-100) / 2);
    }

    :host([size][dropdown-slot-last]) button   {
      border-bottom-left-radius: calc(var(--radius-100) / 2);
      border-bottom-right-radius: calc(var(--radius-100) / 2);
    }

    :host button ::slotted(mui-avatar) {
      --avatar-background-override: var(--action-avatar-background);
    }

    :host([size="xx-small"]) button ::slotted(mui-avatar),
    :host([size="x-small"]) button ::slotted(mui-avatar) {
      margin-right: var(--space-025);
    }
    :host([size="small"]) button ::slotted(mui-avatar),
    :host([size="medium"]) button ::slotted(mui-avatar),
    :host([size="large"]) button ::slotted(mui-avatar) {
      margin-right: var(--space-050);
    }

    :host button:disabled ::slotted(mui-avatar),
    :host button:disabled:hover ::slotted(mui-avatar),
    :host button:disabled:focus ::slotted(mui-avatar) {
      opacity: 0.5;
      --avatar-background-override: var(--action-avatar-background);
    }

    :host button:hover ::slotted(mui-avatar),
    :host button:focus ::slotted(mui-avatar) {
      --avatar-background-override: var(--action-avatar-background-hover);
    }

    /* Badge Spacing */
    :host([has-before]) button ::slotted(mui-badge[slot="before"]) {
      margin-right: var(--space-025);
    }

    :host([has-after]) button ::slotted(mui-badge[slot="after"]) {
      margin-left: var(--space-025);
    }

    :host([size="x-small"][has-before]) button ::slotted(mui-badge[slot="before"]) {
      margin-right: var(--space-025);
    }

    :host([size="x-small"][has-after]) button ::slotted(mui-badge[slot="after"]) {
      margin-left: var(--space-025);
    }

    :host([size="large"][has-before]) button ::slotted(mui-badge[slot="before"]) {
      margin-right: var(--space-050);
    }

    :host([size="large"][has-after]) button ::slotted(mui-badge[slot="after"]) {
      margin-left: var(--space-050);
    }

    /* Before & After Icon
    ========================================= */
    :host([has-after]) button,
    :host([has-before]) button,
    :host([has-after][has-before]) button { 
      display: grid; 
      align-items: center; 
      gap: var(--space-100);
    }

    :host([has-after][has-before]) button {
      grid-template-columns: auto 1fr auto;
      padding-right: var(--action-after-slot-padding);
      padding-left: var(--action-before-slot-padding);
    }

    :host([has-after]) button {
      grid-template-columns: 1fr auto;
      padding-right: var(--action-after-slot-padding);
    }

    :host([has-before]) button {
      grid-template-columns: auto 1fr;
      padding-left: var(--action-before-slot-padding);
    }

    /* Size Variants
    ========================================= */
    :host([size="xx-small"]) button,
    :host([size="xx-small"]) button:hover,
    :host([size="xx-small"]) button:focus,
    :host([size="xx-small"]) button:disabled {
      font-size: var(--text-font-size-xxs);
      line-height: var(--text-line-height-xxs);
      font-weight: var(--font-weight-semi-bold);
      min-height: var(--action-size-xx-small);
      padding: var(--space-025) var(--space-100);
      border-width: var(--stroke-size-100);
      border-radius: var(--action-radius-x-small);
    }

    :host([size="x-small"]) button,
    :host([size="x-small"]) button:hover,
    :host([size="x-small"]) button:focus,
    :host([size="x-small"]) button:disabled {
      font-size: var(--text-font-size-xs);
      line-height: var(--text-line-height-xs);
      font-weight: var(--font-weight-semi-bold);
      min-height: var(--action-size-x-small);
      padding: var(--action-padding-x-small);
      border-width: var(--stroke-size-100);
      border-radius: var(--action-radius-x-small);
    }

    :host([size="small"]) button {
      font-size: var(--text-font-size-s);
      line-height: var(--text-line-height-s);
      min-height: var(--action-size-small);
      padding: var(--action-padding-small);
      border-radius: var(--action-radius-small);
    }

    :host([size="medium"]) button {
      font-size: var(--text-font-size-m);
      line-height: var(--text-line-height-m);
      min-height: var(--action-size-medium);
      border-radius: var(--action-radius-medium);
    }

    :host([size="large"]) button {
      font-size: var(--text-font-size-l);
      line-height: var(--text-line-height-l);
      min-height: var(--action-size-large);
      padding: var(--action-padding-large);
      border-radius: var(--action-radius-large);
    }

    /* Keep input-composed buttons flush against the input edge after size radius applies. */
    :host([slot="before"][usage="input"]) button,
    :host([slot="before"][usage="input"]) button:hover,
    :host([slot="before"][usage="input"]) button:focus,
    :host([slot="before"][usage="input"]) button:focus-visible,
    :host([slot="before"][usage="input"]) button:disabled {
      border-top-right-radius: var(--radius-000);
      border-bottom-right-radius: var(--radius-000);
    }

    :host([slot="after"][usage="input"]) button,
    :host([slot="after"][usage="input"]) button:hover,
    :host([slot="after"][usage="input"]) button:focus,
    :host([slot="after"][usage="input"]) button:focus-visible,
    :host([slot="after"][usage="input"]) button:disabled {
      border-top-left-radius: var(--radius-000);
      border-bottom-left-radius: var(--radius-000);
    }

    /* Dropdown slot corner radius must win over size radius rules */
    :host([size][dropdown-slot]) button,
    :host([size][dropdown-slot]) button:hover,
    :host([size][dropdown-slot]) button:focus,
    :host([size][dropdown-slot]) button:disabled {
      border-radius: var(--radius-000);
      white-space: nowrap;
    }

    :host([size][dropdown-slot-first]) button,
    :host([size][dropdown-slot-first]) button:hover,
    :host([size][dropdown-slot-first]) button:focus,
    :host([size][dropdown-slot-first]) button:disabled {
      border-top-left-radius: calc(var(--radius-100) / 2);
      border-top-right-radius: calc(var(--radius-100) / 2);
    }

    :host([size][dropdown-slot-last]) button,
    :host([size][dropdown-slot-last]) button:hover,
    :host([size][dropdown-slot-last]) button:focus,
    :host([size][dropdown-slot-last]) button:disabled {
      border-bottom-left-radius: calc(var(--radius-100) / 2);
      border-bottom-right-radius: calc(var(--radius-100) / 2);
    }

    :host([size="xx-small"][icon-only]) button {
      height: var(--action-size-xx-small);
      width: var(--action-size-xx-small);
      padding: var(--action-icon-only-padding);
    }

    :host([size="x-small"][icon-only]) button {
      height: var(--action-size-x-small);
      width: var(--action-size-x-small);
      padding: var(--action-icon-only-padding);
    }

    :host([size="small"][icon-only]) button {
      height: var(--action-size-small);
      width: var(--action-size-small);
      padding: var(--action-icon-only-padding);
    }

    :host([size="large"][icon-only]) button {
      height: var(--action-size-large);
      width: var(--action-size-large);
      padding: var(--action-icon-only-padding);
    }


    /* Before & After Icon
      ========================================= */
    :host([size="xx-small"][has-after]) button,
    :host([size="xx-small"][has-before]) button,
    :host([size="xx-small"][has-after][has-before]) button { 
      gap: var(--space-050);
    }
    
    :host([size="xx-small"][has-after][has-before]) button {
      padding-right: var(--action-after-slot-padding-x-small);
      padding-left: var(--action-before-slot-padding-x-small);
    }

    :host([size="xx-small"][has-after]) button {
      padding-right: var(--action-after-slot-padding-x-small);
    }

    :host([size="xx-small"][has-before]) button {
      padding-left: var(--action-before-slot-padding-x-small);
    }

    :host([size="x-small"][has-after]) button,
    :host([size="x-small"][has-before]) button,
    :host([size="x-small"][has-after][has-before]) button { 
      gap: var(--space-050);
    }
    
    :host([size="x-small"][has-after][has-before]) button {
      padding-right: var(--action-after-slot-padding-x-small);
      padding-left: var(--action-before-slot-padding-x-small);
    }

    :host([size="x-small"][has-after]) button {
      padding-right: var(--action-after-slot-padding-x-small);
    }

    :host([size="x-small"][has-before]) button {
      padding-left: var(--action-before-slot-padding-x-small);
    }

    :host([size="small"][has-after]) button,
    :host([size="small"][has-before]) button,
    :host([size="small"][has-after][has-before]) button { 
      gap: var(--space-100);
    }
    
    :host([size="small"][has-after][has-before]) button {
      padding-right: var(--action-after-slot-padding-small);
      padding-left: var(--action-before-slot-padding-small);
    }

    :host([size="small"][has-after]) button {
      padding-right: var(--action-after-slot-padding-small);
    }

    :host([size="small"][has-before]) button {
      padding-left: var(--action-before-slot-padding-small);
    }

    :host([size="large"][has-after]) button,
    :host([size="large"][has-before]) button,
    :host([size="large"][has-after][has-before]) button { 
      gap: var(--space-200);
    }
    
    :host([size="large"][has-after][has-before]) button {
      padding-right: var(--action-after-slot-padding-large);
      padding-left: var(--action-before-slot-padding-large);
    }

    :host([size="large"][has-after]) button {
      padding-right: var(--action-after-slot-padding-large);
    }

    :host([size="large"][has-before]) button {
      padding-left: var(--action-before-slot-padding-large);
    }

    :host([avatar-only]) {
      width: auto;
      display: flex;
    }

    :host([avatar-only]) button,
    :host([avatar-only]) button:hover,
    :host([avatar-only]) button:focus,
    :host([avatar-only]) button:focus-visible,
    :host([avatar-only]) button:disabled {
      width: auto;
      min-width: 0;
      min-height: 0;
      padding: var(--space-000);
      border: var(--action-avatar-border, none);
      background: transparent;
      box-shadow: var(--action-avatar-shadow, none);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-000);
      line-height: 0;
      border-radius: 999rem;
    }

    :host([avatar-only]) button ::slotted(mui-avatar) {
      margin-right: var(--space-000);
      margin-left: var(--space-000);
    }

    :host([has-video]) {
      display: inline-block;
      width: auto;
      text-align: initial;
    }

    :host([has-video]) button,
    :host([has-video]) button:hover,
    :host([has-video]) button:focus,
    :host([has-video]) button:focus-visible,
    :host([has-video]) button:disabled {
      display: block;
      width: 100%;
      min-height: 0;
      padding: var(--space-000);
      border: none;
      border-radius: var(--radius-000);
      background: transparent;
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      text-align: initial;
      box-shadow: none;
      outline-offset: var(--video-thumbnail-action-focus-outline-offset, var(--space-300));
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
    }

    :host([focus-ring="outset"]) button:focus-visible {
      outline-offset: var(--action-focus-outline-outset-offset, var(--stroke-size-200));
    }


    </style>

    <button 
      part="${partMap}"
      onclick="${this.getAttribute("onclick")}" 
      type="${this.getAttribute("type") || "button"}" 
      aria-label="${this.getAttribute("aria-label") || ""}"
      aria-busy="${this.hasAttribute("pending") ? "true" : "false"}"
      ${this.hasAttribute("disabled") ? "disabled" : ""}
    >
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </button>

    `;

    this.shadowRoot.innerHTML = html;

    const button = this.shadowRoot.querySelector("button");
    button?.addEventListener("click", (event) => {
      if (!this.hasAttribute("pending")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    });

    await customElements.whenDefined("mui-button");

    const slots = [
      this.shadowRoot.querySelector("slot:not([name])"),
      this.shadowRoot.querySelector('slot[name="before"]'),
      this.shadowRoot.querySelector('slot[name="after"]'),
    ] as (HTMLSlotElement | null)[];

    slots.forEach((slot) => slot?.addEventListener("slotchange", () => this.syncButtonState()));

    requestAnimationFrame(() => this.syncButtonState());
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "disabled") {
      const button = this.shadowRoot?.querySelector("button");
      if (button) {
        if (this.hasAttribute("disabled")) {
          button.setAttribute("disabled", "");
        } else {
          button.removeAttribute("disabled");
        }
      }
    }

    if (name === "pending") {
      const button = this.shadowRoot?.querySelector("button");
      if (button) {
        button.setAttribute("aria-busy", this.hasAttribute("pending") ? "true" : "false");
      }
    }

    if (name === "size" && oldValue !== newValue && this.shadowRoot) {
      requestAnimationFrame(() => this.syncButtonState());
    }

    if (name === "stroke-ring-size" && oldValue !== newValue) {
      this.syncRingSizeAttribute();
    }
  }

  private syncRingSizeAttribute(): void {
    const raw = this.getAttribute("stroke-ring-size")?.trim();

    if (!raw) {
      this.style.removeProperty("--action-ring-size");
      return;
    }

    const tokenValue = raw.startsWith("stroke-size-") ? raw.replace("stroke-size-", "") : raw;
    const isStrokeToken = /^(100|200|300|400|500)$/.test(tokenValue);
    this.style.setProperty("--action-ring-size", isStrokeToken ? `var(--stroke-size-${tokenValue})` : raw);
  }

  syncButtonState(): void {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    const slotDefault = shadow.querySelector("slot:not([name])") as HTMLSlotElement | null;
    const slotBefore = shadow.querySelector('slot[name="before"]') as HTMLSlotElement | null;
    const slotAfter = shadow.querySelector('slot[name="after"]') as HTMLSlotElement | null;

    const hasAssignedContent = (slot: HTMLSlotElement | null): boolean => {
      if (!slot) return false;
      return slot.assignedNodes({ flatten: true }).some((node: Node) => {
        return node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim());
      });
    };

    const hasBefore = hasAssignedContent(slotBefore);
    const hasAfter = hasAssignedContent(slotAfter);

    this.toggleAttribute("has-before", hasBefore);
    this.toggleAttribute("has-after", hasAfter);

    const assignedNodes = slotDefault?.assignedNodes({ flatten: true }) ?? [];
    const assignedElements = slotDefault?.assignedElements({ flatten: true }) ?? [];
    const hasVideo = assignedElements.some((element) => element.tagName.toLowerCase() === "mui-video-thumbnail");

    this.toggleAttribute("has-video", hasVideo);

    const avatarOnly =
      !hasVideo &&
      assignedElements.length === 1 &&
      assignedElements[0].tagName.toLowerCase() === "mui-avatar" &&
      assignedNodes.every((node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) return !node.textContent?.trim();
        if (node.nodeType === Node.ELEMENT_NODE) {
          return (node as HTMLElement).tagName.toLowerCase() === "mui-avatar";
        }
        return false;
      });

    this.toggleAttribute("avatar-only", avatarOnly);

    const iconOnly =
      !avatarOnly &&
      !hasVideo &&
      assignedNodes.every((node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          return el.tagName.toLowerCase() === "svg" || el.classList.contains("mui-icon");
        }
        return node.nodeType === Node.TEXT_NODE && !node.textContent?.trim();
      });

    if (iconOnly) {
      this.setAttribute("icon-only", "");
      this.updateIconSizes(assignedNodes, true);
      return;
    }

    this.removeAttribute("icon-only");

    const allSlots = [slotBefore, slotDefault, slotAfter];
    allSlots.forEach((slot) => {
      if (!slot) return;
      const nodes = slot.assignedNodes({ flatten: true });
      this.updateIconSizes(nodes, false);
      if (!avatarOnly) {
        this.updateAvatarSizes(nodes);
      }
      this.updateBadgeSizes(nodes);
    });
  }

  // Update avatar sizes based on button size
  updateAvatarSizes(nodes: Node[]): void {
    const buttonSize = this.getAttribute("size") || "medium";

    // Map button sizes to avatar sizes
    const avatarSizeMap: Record<string, string> = {
      "xx-small": "xx-small",
      "x-small": "xx-small",
      small: "xx-small",
      medium: "small",
      large: "medium",
    };

    const targetAvatarSize = avatarSizeMap[buttonSize] || "small";

    nodes.forEach((node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const isAvatar = el.tagName.toLowerCase() === "mui-avatar";

        if (isAvatar) {
          el.setAttribute("size", targetAvatarSize);
        }
      }
    });
  }

  updateIconSizes(nodes: Node[], isIconOnly: boolean): void {
    const buttonSize = this.getAttribute("size") || "medium";

    // Map button sizes to icon sizes
    const iconSizeMap: Record<string, string> = {
      "xx-small": "xx-small",
      "x-small": "x-small",
      small: "x-small",
      medium: isIconOnly ? "medium" : "small", // small for regular, medium for icon-only
      large: isIconOnly ? "large" : "medium",
    };

    const targetIconSize = iconSizeMap[buttonSize] || "small";

    nodes.forEach((node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const isIcon =
          el.tagName.toLowerCase() === "svg" ||
          el.classList.contains("mui-icon") ||
          el.tagName.toLowerCase() === "mui-icon";

        // Only set size if the element doesn't already have one
        if (isIcon && !el.hasAttribute("size")) {
          el.setAttribute("size", targetIconSize);
        }
      }
    });
  }

  updateBadgeSizes(nodes: Node[]): void {
    const buttonSize = this.getAttribute("size") || "medium";
    const badgeSizeMap: Record<string, string> = {
      "xx-small": "x-small",
      "x-small": "x-small",
      small: "small",
      medium: "medium",
      large: "large",
    };
    const targetBadgeSize = badgeSizeMap[buttonSize] || "medium";

    nodes.forEach((node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName.toLowerCase() === "mui-badge") {
          // Enforce host-driven badge sizing for consistency.
          el.setAttribute("size", targetBadgeSize);
        }
      }
    });
  }

  waitForPartMap(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (typeof getPartMap === "function") return resolve();
      const check = () => {
        if (typeof getPartMap === "function") {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }
}

if (!customElements.get("mui-button")) {
  customElements.define("mui-button", MuiButton);
}
