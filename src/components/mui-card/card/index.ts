/* Mui Card */
import { applySurfaceUsage } from "../../../utils/surface-usage";

class MuiCard extends HTMLElement {
  private slotElement: HTMLSlotElement | null = null;
  private sectionObserver: MutationObserver | null = null;
  private managedSectionSizes = new Map<HTMLElement, string | null>();

  static get observedAttributes() {
    return ["footer", "borderless", "size", "usage"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    let html = /*html*/ `
    <style>
      :host {
        display: block;
        border-radius: var(--card-radius);
        background: var(--surface-elevated-100);
        border: var(--border-thin);
        border-color: var(--border-color);
      }
      :host([borderless]) {
        border: none;
      }
      :host([usage="grid"]),
      :host([usage="h-stack"]) {
        display: grid;
        grid-template-rows: var(--card-grid-rows, auto 1fr auto);
      }
      ::slotted(*:last-child) {
        margin-bottom: 0;
      }
      ::slotted([inner-space-top]) {
        padding-top: 0;
      }
    </style>
    <slot></slot>
    `;

    this.shadowRoot.innerHTML = html;

    this.slotElement = this.shadowRoot.querySelector("slot");

    if (this.slotElement) {
      this.slotElement.addEventListener("slotchange", this.syncSections);
      this.syncSections();
    }

    this.sectionObserver = new MutationObserver(this.syncSectionSizes);
    this.sectionObserver.observe(this, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["size"],
    });
  }

  disconnectedCallback() {
    this.slotElement?.removeEventListener("slotchange", this.syncSections);
    this.slotElement = null;
    this.sectionObserver?.disconnect();
    this.sectionObserver = null;
    this.restoreManagedSectionSizes();
    this.style.removeProperty("--card-grid-rows");
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === "size" && oldValue !== newValue) {
      this.syncSectionSizes();
    }
    if (name === "usage" && oldValue !== newValue) {
      this.syncGridRows();
    }
  }

  private getCardSections() {
    const sectionTags = new Set(["mui-card-header", "mui-card-body", "mui-card-footer"]);
    return Array.from(this.children).filter((element): element is HTMLElement =>
      sectionTags.has(element.tagName.toLowerCase()),
    );
  }

  private restoreSectionSize(section: HTMLElement, size: string | null) {
    if (size === null) {
      section.removeAttribute("size");
    } else {
      section.setAttribute("size", size);
    }
  }

  private restoreManagedSectionSizes() {
    this.managedSectionSizes.forEach((size, section) => this.restoreSectionSize(section, size));
    this.managedSectionSizes.clear();
  }

  private syncGridRows() {
    const usage = this.getAttribute("usage");
    if (usage !== "grid" && usage !== "h-stack") {
      this.style.removeProperty("--card-grid-rows");
      return;
    }

    const rows = Array.from(this.children).map((element) =>
      element.tagName.toLowerCase() === "mui-card-body" ? "1fr" : "auto",
    );
    this.style.setProperty("--card-grid-rows", rows.join(" ") || "auto");
  }

  private syncSectionSizes = () => {
    const size = this.getAttribute("size");
    const sections = this.getCardSections();
    const currentSections = new Set(sections);

    this.managedSectionSizes.forEach((originalSize, section) => {
      if (size && currentSections.has(section)) return;
      this.restoreSectionSize(section, originalSize);
      this.managedSectionSizes.delete(section);
    });

    if (!size) return;

    sections.forEach((section) => {
      if (!this.managedSectionSizes.has(section)) {
        this.managedSectionSizes.set(section, section.getAttribute("size"));
      }
      if (section.getAttribute("size") !== size) {
        section.setAttribute("size", size);
      }
    });
  };

  private syncSections = () => {
    const nodes = this.slotElement?.assignedElements() || [];
    const hasHeader = nodes.some((node) => node.tagName.toLowerCase() === "mui-card-header");
    const body = nodes.find((node) => node.tagName.toLowerCase() === "mui-card-body");

    this.syncGridRows();
    this.syncSectionSizes();
    applySurfaceUsage(this);

    if (body) {
      if (hasHeader) {
        body.setAttribute("inner-space-top", "");
      } else {
        body.removeAttribute("inner-space-top");
      }
    }
  };
}

if (!customElements.get("mui-card")) {
  customElements.define("mui-card", MuiCard);
}
