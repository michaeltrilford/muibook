import "../mui-icons/play-rectangle";

class MuiVideoThumbnail extends HTMLElement {
  static get observedAttributes() {
    return [
      "src",
      "src-light",
      "src-dark",
      "src-mui",
      "src-mui-light",
      "src-mui-dark",
      "src-jal",
      "src-jal-light",
      "src-jal-dark",
      "src-ana",
      "src-ana-light",
      "src-ana-dark",
      "src-sensei",
      "src-sensei-light",
      "src-sensei-dark",
      "src-paperclip",
      "src-paperclip-light",
      "src-paperclip-dark",
      "alt",
      "aspect-ratio",
      "loading",
      "decoding",
      "play",
      "overlay",
      "hide-play",
    ];
  }

  private themeObserver: MutationObserver | null = null;

  connectedCallback() {
    this.render();
    this.bindThemeObserver();
  }

  disconnectedCallback() {
    this.themeObserver?.disconnect();
    this.themeObserver = null;
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (!this.shadowRoot) return;
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  private render() {
    if (!this.shadowRoot) return;

    const src = this.getThemedSrc();
    const alt = this.getAttribute("alt") || "";
    const aspectRatio = this.getAttribute("aspect-ratio") || "var(--video-thumbnail-aspect-ratio, 16 / 9)";
    const loading = this.getAttribute("loading") || "lazy";
    const decoding = this.getAttribute("decoding") || "async";
    const showPlay = this.hasAttribute("play") && !this.hasAttribute("hide-play");
    const showOverlay = this.hasAttribute("overlay");

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .media {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
          gap: var(--video-thumbnail-meta-gap, var(--space-300));
        }

        .frame {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: var(--video-thumbnail-aspect-ratio-active, var(--video-thumbnail-aspect-ratio));
          margin: 0;
          overflow: hidden;
          box-sizing: border-box;
          border: var(--video-thumbnail-border, none);
          border-radius: var(--video-thumbnail-radius, var(--radius-300));
          background: var(--video-thumbnail-background, var(--surface-elevated-200));
          box-shadow: var(--video-thumbnail-box-shadow, none);
          transition:
            border var(--speed-100),
            box-shadow var(--speed-100);
          isolation: isolate;
        }

        :host(:hover) .frame {
          border: var(--video-thumbnail-border-hover, var(--video-thumbnail-border, none));
          box-shadow: var(--video-thumbnail-box-shadow-hover, var(--video-thumbnail-box-shadow, none));
        }

        .frame:hover {
          border: var(--video-thumbnail-border-hover, var(--video-thumbnail-border, none));
          box-shadow: var(--video-thumbnail-box-shadow-hover, var(--video-thumbnail-box-shadow, none));
        }

        .image,
        ::slotted([slot="image"]) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border: none;
          filter: var(--video-thumbnail-image-filter, none);
          transition: filter var(--speed-100), transform var(--speed-100);
        }

        :host(:hover) .image,
        :host(:hover) ::slotted([slot="image"]),
        .frame:hover .image,
        .frame:hover ::slotted([slot="image"]) {
          filter: var(--video-thumbnail-image-filter-hover, var(--video-thumbnail-image-filter, none));
        }

        .overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: var(--video-thumbnail-overlay-background, transparent);
          transition: background var(--speed-100);
        }

        :host(:hover) .overlay,
        .frame:hover .overlay {
          background: var(--video-thumbnail-overlay-background-hover, var(--black-opacity-20));
        }

        .play {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: var(--video-thumbnail-play-size, var(--action-icon-only-size-large));
          height: var(--video-thumbnail-play-size, var(--action-icon-only-size-large));
          border-radius: var(--video-thumbnail-play-size, var(--action-icon-only-size-large));
          background: var(--video-thumbnail-play-background, var(--black-opacity-80));
          color: var(--video-thumbnail-play-color, var(--white));
          opacity: var(--video-thumbnail-play-opacity, 0);
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition:
            background var(--speed-100),
            opacity var(--speed-100);
        }

        :host(:hover) .play,
        .frame:hover .play {
          background: var(--video-thumbnail-play-background-hover, var(--black-opacity-70));
          opacity: var(--video-thumbnail-play-opacity-hover, 1);
        }

        .play[hidden] {
          display: none;
        }

        .play mui-icon-play-fill {
          fill: currentColor;
        }

        @media (prefers-reduced-motion: reduce) {
          .frame,
          .image,
          ::slotted([slot="image"]),
          .overlay,
          .play {
            transition: none;
          }
        }
      </style>

      <div class="media">
        <figure class="frame" style="--video-thumbnail-aspect-ratio-active: ${this.escapeAttribute(aspectRatio)}">
          ${
            src
              ? `<img class="image" src="${this.escapeAttribute(src)}" alt="${this.escapeAttribute(alt)}" loading="${this.escapeAttribute(loading)}" decoding="${this.escapeAttribute(decoding)}" />`
              : `<slot name="image"></slot>`
          }
          ${showOverlay ? `<span class="overlay" aria-hidden="true"></span>` : ""}
          <span class="play" aria-hidden="true" ${showPlay ? "" : "hidden"}>
            <mui-icon-play-fill size="large"></mui-icon-play-fill>
          </span>
        </figure>
        <slot name="meta"></slot>
      </div>
    `;
  }

  private bindThemeObserver() {
    if (this.themeObserver) return;
    const root = document.documentElement;
    this.themeObserver = new MutationObserver((mutations) => {
      if (
        mutations.some((mutation) => mutation.attributeName === "data-brand" || mutation.attributeName === "data-theme")
      ) {
        this.syncImageSrc();
      }
    });
    this.themeObserver.observe(root, { attributes: true, attributeFilter: ["data-brand", "data-theme"] });
  }

  private syncImageSrc() {
    const image = this.shadowRoot?.querySelector(".image") as HTMLImageElement | null;
    if (!image) return;
    const nextSrc = this.getThemedSrc();
    if (image.getAttribute("src") !== nextSrc) image.setAttribute("src", nextSrc);
  }

  private getThemedSrc() {
    const brand = document.documentElement.getAttribute("data-brand") || "mui";
    const theme = document.documentElement.getAttribute("data-theme") || "light";
    return (
      this.getAttribute(`src-${brand}-${theme}`) ||
      this.getAttribute(`src-${theme}`) ||
      this.getAttribute(`src-${brand}`) ||
      this.getAttribute("src") ||
      ""
    );
  }

  private escapeAttribute(value: string) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
}

if (!customElements.get("mui-video-thumbnail")) {
  customElements.define("mui-video-thumbnail", MuiVideoThumbnail);
}
