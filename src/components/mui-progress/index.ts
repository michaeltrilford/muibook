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

    if (state === "syncing") {
      displayWidth = "30%";
      animation = "slideAnim calc(var(--speed-400) * 4) linear infinite";
    } else if (state === "pending") {
      displayWidth = "100%";
      animation = "zebraAnim calc(var(--speed-300) * 4) linear infinite";
      extraStyles = `
        background-image: repeating-linear-gradient(
          45deg,
          var(--progress-bar-state-100) 0,
          var(--progress-bar-state-100) 10px,
          var(--progress-bar-state-200) 10px,
          var(--progress-bar-state-200) 20px
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
        border-radius: var(--space-300);
        overflow: hidden;
        position: relative;
      }
      .progress-bar {
        height: 100%;
        width: ${displayWidth};
        background-color: var(--progress-bar-background);
        border-radius: var(--space-300) 0 0 var(--space-300);
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
        100% { background-position: 40px 0; }
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
