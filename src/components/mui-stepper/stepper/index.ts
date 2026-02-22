class MuiStepper extends HTMLElement {
  static get observedAttributes() {
    return ["direction", "active-step", "linear", "interactive", "size"];
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const steps = this.steps;
    if (!steps.length) return;

    const key = event.key;
    const current = this.activeStepIndex;

    if (key === "ArrowRight" || key === "ArrowDown") {
      event.preventDefault();
      this.setActiveStep(current + 1, "keyboard");
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      event.preventDefault();
      this.setActiveStep(current - 1, "keyboard");
    } else if (key === "Home") {
      event.preventDefault();
      this.setActiveStep(0, "keyboard");
    } else if (key === "End") {
      event.preventDefault();
      this.setActiveStep(steps.length - 1, "keyboard");
    }
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setAttribute("direction", this.getAttribute("direction") || "horizontal");
    this.setAttribute("active-step", this.getAttribute("active-step") || "1");
    const rawSize = this.getAttribute("size");
    this.setAttribute("size", rawSize === "x-small" || rawSize === "small" ? rawSize : "medium");
  }

  connectedCallback() {
    this.addEventListener("keydown", this.onKeyDown);
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this.onKeyDown);
  }

  attributeChangedCallback(name: string, _old: string | null, _new: string | null) {
    if (name === "direction" || name === "active-step" || name === "linear" || name === "interactive" || name === "size") {
      this.render();
    }
  }

  private get steps() {
    const slot = this.shadowRoot?.querySelector("slot");
    return (slot?.assignedElements() as HTMLElement[]) || [];
  }

  private get activeStepIndex() {
    const raw = Number.parseInt(this.getAttribute("active-step") || "1", 10);
    return Number.isFinite(raw) ? Math.max(raw - 1, 0) : 0;
  }

  private emitStepChange(previousIndex: number, nextIndex: number, source: "click" | "keyboard" | "api") {
    this.dispatchEvent(
      new CustomEvent("step-change", {
        detail: {
          previousStep: previousIndex + 1,
          activeStep: nextIndex + 1,
          previousIndex,
          activeIndex: nextIndex,
          source,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private setActiveStep(index: number, source: "click" | "keyboard" | "api") {
    const steps = this.steps;
    if (!steps.length) return;

    const clamped = Math.min(Math.max(index, 0), steps.length - 1);
    const previous = this.activeStepIndex;
    if (previous === clamped) return;

    this.setAttribute("active-step", String(clamped + 1));
    this.emitStepChange(previous, clamped, source);
  }

  private resolveStepState(step: HTMLElement, index: number, activeIndex: number): string {
    const explicit = step.getAttribute("state");
    if (explicit && explicit !== "active" && explicit !== "upcoming") {
      if (explicit === "disabled") return "disabled";
      if (explicit === "error") return "error";
      if (explicit === "success") return "success";
      if (explicit === "pending") return "pending";
      if (explicit === "completed") return "completed";
    }

    if (index < activeIndex) return "completed";
    if (index === activeIndex) return "active";
    return "upcoming";
  }

  private canActivateStep(targetIndex: number, activeIndex: number, steps: HTMLElement[]) {
    if (!this.hasAttribute("interactive")) return false;
    const target = steps[targetIndex];
    const isDisabled = target.hasAttribute("disabled") || target.getAttribute("state") === "disabled";
    if (isDisabled) return false;

    // Always allow backwards navigation; linear only restricts forward jumps.
    if (!this.hasAttribute("linear")) return true;
    if (targetIndex <= activeIndex) return true;
    return targetIndex === activeIndex + 1;
  }

  render() {
    if (!this.shadowRoot) return;

    const direction = this.getAttribute("direction") === "vertical" ? "vertical" : "horizontal";
    const rawSize = this.getAttribute("size");
    const size = rawSize === "x-small" || rawSize === "small" ? rawSize : "medium";
    const steps = this.steps;
    const activeIndex = Math.min(Math.max(this.activeStepIndex, 0), Math.max(steps.length - 1, 0));

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: flex;
          flex-direction: ${direction === "horizontal" ? "row" : "column"};
          ${direction === "horizontal" ? "justify-content: space-between;" : ""}
          width: 100%;
          outline: none;
        }
      </style>
      <slot></slot>
    `;

    steps.forEach((step, i) => {
      const state = this.resolveStepState(step, i, activeIndex);
      const isInteractive = this.canActivateStep(i, activeIndex, steps);

      step.setAttribute("resolved-state", state);
      step.setAttribute("direction", direction);
      step.setAttribute("size", size);
      step.setAttribute("position", i === 0 ? "first" : i === steps.length - 1 ? "last" : "middle");

      if (isInteractive) {
        step.setAttribute("tabindex", i === activeIndex ? "0" : "-1");
        step.setAttribute("role", "button");
        step.setAttribute("aria-current", i === activeIndex ? "step" : "false");
        step.onclick = () => this.setActiveStep(i, "click");
      } else {
        step.setAttribute("tabindex", "-1");
        step.removeAttribute("role");
        step.removeAttribute("aria-current");
        step.onclick = null;
      }
    });
  }
}

if (!customElements.get("mui-stepper")) {
  customElements.define("mui-stepper", MuiStepper);
}
