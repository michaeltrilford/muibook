class MuiProgress extends HTMLElement {
  static get observedAttributes() {
    return ["progress", "state"];
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

  render() {
    const progress = Math.min(Math.max(Number(this.getAttribute("progress") || 0), 0), 100);
    const state = this.getAttribute("state");

    // decide animation + width
    let displayWidth = `${progress}%`;
    let animation = "none";
    let extraStyles = "";
    let barRadius = "var(--progress-radius) 0 0 var(--progress-radius)";

    if (state === "syncing") {
      displayWidth = "var(--progress-syncing-width)";
      animation = "slideAnim calc(var(--speed-400) * 4) linear infinite";
      barRadius = "var(--progress-radius)";
      } else if (state === "pending") {
      displayWidth = "100%";
      animation = "zebraAnim calc(var(--speed-300) * 4) linear infinite";
      barRadius = "var(--progress-radius)";
      extraStyles = `
        background-image: repeating-linear-gradient(
          45deg,
          var(--progress-loading-bar-100) 0,
          var(--progress-loading-bar-100) var(--progress-pending-stripe-size),
          var(--progress-loading-bar-200) var(--progress-pending-stripe-size),
          var(--progress-loading-bar-200) calc(var(--progress-pending-stripe-size) * 2)
        );
        background-size: 200% 100%;
      `;
    }

    const styles = /*css*/ `
      :host {
        display: block;
        width: 100%;
      }
      .progress-container {
        width: 100%;
        height: var(--space-300);
        background-color: var(--progress-track-background);
        border-radius: var(--progress-radius);
        overflow: hidden;
        position: relative;
      }
      .progress-bar {
        height: 100%;
        width: ${displayWidth};
        background-color: ${state === "syncing" ? "var(--progress-syncing-bar-background)" : "var(--progress-bar-background)"};
        border-radius: ${barRadius};
        position: absolute;
        left: 0;
        top: 0;
        transition: ${state ? "none" : "width var(--speed-300) ease"};
        animation: ${animation};
        ${extraStyles}
      }

      @keyframes slideAnim {
        0% { left: -30%; }
        100% { left: 100%; }
      }

      @keyframes zebraAnim {
        0% { background-position: 0 0; }
        100% { background-position: calc(var(--progress-pending-stripe-size) * 4) 0; }
      }
    `;

    this.shadowRoot!.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
    `;
  }
}

if (!customElements.get("mui-progress")) {
  customElements.define("mui-progress", MuiProgress);
}
