/* Mui Model Viewer */

class MuiModelViewer extends HTMLElement {
  static get observedAttributes() {
    return [
      "src",
      "ios-src",
      "poster",
      "alt",
      "controls",
      "camera-controls",
      "auto-rotate",
      "ar",
      "loading"
    ];
  }

  private static loadScriptPromise: Promise<void> | null = null;
  private supportsNativeModel = false;
  private scriptLoaded = false;
  private isModelLoading = true;
  private loadError = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Check native <model> support (e.g. Safari on visionOS 2+)
    this.supportsNativeModel = typeof window !== "undefined" && "HTMLModelElement" in window;
  }

  private static loadModelViewerScript(): Promise<void> {
    if (this.loadScriptPromise) return this.loadScriptPromise;

    this.loadScriptPromise = new Promise((resolve, reject) => {
      // If already registered globally
      if (customElements.get("model-viewer")) {
        resolve();
        return;
      }
      // Check if the script tag already exists in the document
      const existingScript = document.querySelector('script[src*="model-viewer"]');
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", (e) => reject(e));
        return;
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });

    return this.loadScriptPromise;
  }

  connectedCallback() {
    this.render();

    if (!this.supportsNativeModel) {
      MuiModelViewer.loadModelViewerScript()
        .then(() => {
          this.scriptLoaded = true;
          this.render();
          this.bindViewerEvents();
        })
        .catch((err) => {
          console.error("Failed to load <model-viewer> library", err);
          this.loadError = true;
          this.isModelLoading = false;
          this.render();
        });
    } else {
      this.bindViewerEvents();
    }
  }

  disconnectedCallback() {
    // Clean up if necessary
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
    if (this.scriptLoaded || this.supportsNativeModel) {
      this.bindViewerEvents();
    }
  }

  private bindViewerEvents() {
    const root = this.shadowRoot;
    if (!root) return;

    const viewer = root.querySelector("model-viewer") || root.querySelector("model");
    if (!viewer) return;

    // Listeners for model-viewer loading lifecycle
    viewer.addEventListener("load", () => {
      this.isModelLoading = false;
      this.loadError = false;
      this.updateLoadingState();
    });

    viewer.addEventListener("error", () => {
      this.isModelLoading = false;
      this.loadError = true;
      this.updateLoadingState();
    });
  }

  private updateLoadingState() {
    const root = this.shadowRoot;
    if (!root) return;

    const overlay = root.querySelector(".loading-overlay") as HTMLElement | null;
    if (overlay) {
      if (!this.isModelLoading) {
        overlay.classList.add("hidden");
      } else {
        overlay.classList.remove("hidden");
      }
    }

    const errorMsg = root.querySelector(".error-message") as HTMLElement | null;
    if (errorMsg) {
      if (this.loadError) {
        errorMsg.classList.remove("hidden");
      } else {
        errorMsg.classList.add("hidden");
      }
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const src = this.getAttribute("src") || "";
    const iosSrc = this.getAttribute("ios-src") || "";
    const poster = this.getAttribute("poster") || "";
    const alt = this.getAttribute("alt") || "3D model";
    const hasControls = this.hasAttribute("controls") || this.hasAttribute("camera-controls");
    const autoRotate = this.hasAttribute("auto-rotate");
    const ar = this.hasAttribute("ar");
    const loadingAttr = this.getAttribute("loading") || "lazy";

    // CSS Custom Properties fallbacks
    const background = this.style.getPropertyValue("--mui-model-viewer-background") || "var(--surface-elevated-200, #f5f5f7)";
    const radius = this.style.getPropertyValue("--mui-model-viewer-radius") || "var(--radius-300, 1.2rem)";
    const aspectRatio = this.style.getPropertyValue("--mui-model-viewer-aspect-ratio") || "16/9";

    const styles = /*css*/ `
      :host {
        display: block;
        width: 100%;
        --mui-model-viewer-background: ${background};
        --mui-model-viewer-radius: ${radius};
        --mui-model-viewer-aspect-ratio: ${aspectRatio};
      }

      .container {
        position: relative;
        background: var(--mui-model-viewer-background);
        border-radius: var(--mui-model-viewer-radius);
        overflow: hidden;
        aspect-ratio: var(--mui-model-viewer-aspect-ratio);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-300, 0 4px 12px rgba(0, 0, 0, 0.08));
        border: var(--stroke-size-100, 1px) solid var(--border-color, rgba(0, 0, 0, 0.1));
      }

      model-viewer, model, .fallback-poster {
        width: 100%;
        height: 100%;
        display: block;
      }

      .fallback-poster {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      /* Premium Glassmorphic Loading Overlay */
      .loading-overlay {
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 10;
        gap: var(--space-300, 1.2rem);
      }

      :host([data-theme="dark"]) .loading-overlay {
        background: rgba(0, 0, 0, 0.4);
      }

      .loading-overlay.hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      /* Premium micro-animated spinner */
      .spinner {
        width: 2.8rem;
        height: 2.8rem;
        border: 3px solid var(--border-color, rgba(0, 0, 0, 0.1));
        border-top-color: var(--action-primary-background, #0071e3);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .error-message {
        position: absolute;
        background: var(--feedback-error-background, rgba(255, 235, 235, 0.9));
        border: var(--stroke-size-100, 1px) solid var(--feedback-error-border-color, #ff453a);
        color: var(--text-color-attention, #ff453a);
        padding: var(--space-300, 1.2rem) var(--space-400, 1.6rem);
        border-radius: var(--radius-200, 0.8rem);
        font-family: var(--font-family, system-ui, sans-serif);
        font-size: var(--text-font-size-xs, 1.2rem);
        z-index: 20;
        text-align: center;
        max-width: 80%;
      }

      .error-message.hidden {
        display: none;
      }

      /* AR trigger quick-look style overlay on iOS when fallback is preferred */
      .ar-button {
        position: absolute;
        bottom: var(--space-400, 1.6rem);
        right: var(--space-400, 1.6rem);
        background: var(--surface-elevated-100, #ffffff);
        color: var(--text-color, #1d1d1f);
        border: var(--stroke-size-100, 1px) solid var(--border-color, rgba(0, 0, 0, 0.15));
        padding: var(--space-200, 0.8rem) var(--space-300, 1.2rem);
        border-radius: var(--radius-pill, 9999px);
        font-family: var(--font-family, system-ui, sans-serif);
        font-size: var(--text-font-size-xs, 1.2rem);
        font-weight: var(--font-weight-medium, 500);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--space-100, 0.6rem);
        box-shadow: var(--shadow-200, 0 2px 8px rgba(0, 0, 0, 0.1));
        z-index: 5;
        transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s ease;
        text-decoration: none;
      }

      .ar-button:hover {
        transform: scale(1.04);
        background: var(--surface-elevated-200, #f5f5f7);
      }

      .ar-icon {
        width: 1.6rem;
        height: 1.6rem;
        fill: currentColor;
      }
    `;

    let viewerMarkup = "";

    if (this.supportsNativeModel) {
      // Safari on visionOS 2+ native <model>
      viewerMarkup = /*html*/ `
        <model
          src="${iosSrc || src}"
          alt="${alt}"
          ${hasControls ? "interactive" : ""}
        ></model>
      `;
    } else if (this.scriptLoaded) {
      // standard <model-viewer>
      viewerMarkup = /*html*/ `
        <model-viewer
          src="${src}"
          ios-src="${iosSrc}"
          poster="${poster}"
          alt="${alt}"
          loading="${loadingAttr}"
          ${hasControls ? "camera-controls" : ""}
          ${autoRotate ? "auto-rotate" : ""}
          ${ar ? "ar" : ""}
        >
          <slot name="poster"></slot>
          <slot></slot>
        </model-viewer>
      `;
    } else {
      // Fallback poster image layout before library load completes
      viewerMarkup = /*html*/ `
        <div class="fallback-poster" style="background-image: url('${poster}');" aria-label="${alt}">
          <slot></slot>
        </div>
      `;
    }

    // AR fallback link for iOS Safari (Apple Quick Look)
    const showIosArFallback = ar && iosSrc && /iPad|iPhone|iPod/.test(navigator.userAgent) && !this.supportsNativeModel;
    const arButtonMarkup = showIosArFallback
      ? /*html*/ `
        <a class="ar-button" rel="ar" href="${iosSrc}">
          <svg class="ar-icon" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          View in AR
        </a>
      `
      : "";

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div class="container">
        ${viewerMarkup}
        ${arButtonMarkup}
        
        <div class="loading-overlay ${!this.isModelLoading ? "hidden" : ""}">
          <div class="spinner"></div>
          <slot name="loading-text"></slot>
        </div>

        <div class="error-message ${!this.loadError ? "hidden" : ""}">
          Failed to load 3D model scene. Please check the source URL or CORS configuration.
        </div>
      </div>
    `;

    this.updateLoadingState();
  }
}

if (!customElements.get("mui-model-viewer")) {
  customElements.define("mui-model-viewer", MuiModelViewer);
}
export { MuiModelViewer };
