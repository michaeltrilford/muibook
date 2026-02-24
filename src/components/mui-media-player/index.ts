import "../mui-button";
import "../mui-body";
import "../mui-hint";
import "../mui-range-input";
import "../mui-icons/play-rectangle";
import "../mui-icons/stop";
import "../mui-icons/music-microphone";
import "../mui-icons/movie-clapper";

type ResolvedType = "video" | "audio" | "youtube" | "soundcloud";

class MuiMediaPlayer extends HTMLElement {
  private countdownMode = false;

  static get observedAttributes() {
    return ["src", "type", "autoplay", "muted", "loop", "poster", "prefer-native-controls"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindControls();
  }

  attributeChangedCallback(oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
    this.bindControls();
  }

  private resolveType(src: string): ResolvedType {
    const explicit = (this.getAttribute("type") || "").toLowerCase();
    if (explicit === "video" || explicit === "audio" || explicit === "youtube" || explicit === "soundcloud") {
      return explicit as ResolvedType;
    }
    try {
      const url = new URL(src);
      const host = url.hostname.toLowerCase();
      const path = url.pathname.toLowerCase();
      if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
        return "youtube";
      }
      if (host.endsWith("soundcloud.com")) return "soundcloud";
      if (/\.(mp4|webm|mov|m4v|ogv)$/.test(path)) return "video";
      if (/\.(mp3|wav|m4a|aac|flac|ogg|oga)$/.test(path)) return "audio";
    } catch {
      return "audio";
    }
    return "audio";
  }

  private getYouTubeEmbed(src: string) {
    try {
      const url = new URL(src);
      const host = url.hostname.toLowerCase();
      if (host === "youtu.be") return `https://www.youtube.com/embed/${url.pathname.replace("/", "")}?rel=0`;
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
    } catch {
      return "";
    }
    return "";
  }

  private getSoundcloudEmbed(src: string) {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(src)}&auto_play=false&show_comments=false&show_teaser=false&visual=false`;
  }

  private formatTime(seconds: number) {
    const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  private bindControls() {
    if (!this.shadowRoot) return;
    const media = this.shadowRoot.querySelector("video, audio") as HTMLMediaElement | null;
    if (!media) return;

    const playBtn = this.shadowRoot.querySelector('[data-action="play"]') as HTMLElement | null;
    const muteBtn = this.shadowRoot.querySelector('[data-action="mute"]') as HTMLElement | null;
    const seek = this.shadowRoot.querySelector('[data-action="seek"]') as HTMLElement | null;
    const timeToggle = this.shadowRoot.querySelector('[data-action="time-mode"]') as HTMLElement | null;
    const hasCustomControls = Boolean(playBtn || muteBtn || seek || timeToggle);
    if (!hasCustomControls) return;

    let lastPaused: boolean | null = null;
    let lastMuted: boolean | null = null;

    const sync = () => {
      const paused = media.paused;
      playBtn?.setAttribute("aria-label", paused ? "Play media" : "Pause media");
      if (playBtn && paused !== lastPaused) {
        playBtn.innerHTML = paused
          ? '<mui-icon-play-rectangle size="x-small"></mui-icon-play-rectangle>'
          : '<mui-icon-stop size="x-small"></mui-icon-stop>';
        lastPaused = paused;
      }
      if (muteBtn && media.muted !== lastMuted) {
        muteBtn.setAttribute("aria-label", media.muted ? "Unmute media" : "Mute media");
        lastMuted = media.muted;
      }
      if (seek) {
        const range = seek as any;
        const duration = Number.isFinite(media.duration) ? media.duration : 0;
        seek.setAttribute("max", String(duration || 0));
        range.value = media.currentTime || 0;
      }
      if (timeToggle) {
        const duration = Number.isFinite(media.duration) ? media.duration : 0;
        const remaining = Math.max(0, duration - media.currentTime);
        timeToggle.textContent = this.countdownMode
          ? `-${this.formatTime(remaining)} / ${this.formatTime(duration)}`
          : `${this.formatTime(media.currentTime)} / ${this.formatTime(duration)}`;
        timeToggle.setAttribute("aria-pressed", String(this.countdownMode));
      }
    };

    playBtn?.addEventListener("click", () => {
      if (media.paused) {
        media.play().catch(() => undefined);
      } else {
        media.pause();
      }
    });
    muteBtn?.addEventListener("click", () => {
      media.muted = !media.muted;
      sync();
    });
    seek?.addEventListener("input", (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      media.currentTime = Number(detail.value || 0);
      sync();
    });
    timeToggle?.addEventListener("click", () => {
      this.countdownMode = !this.countdownMode;
      sync();
    });
    media.addEventListener("timeupdate", sync);
    media.addEventListener("loadedmetadata", sync);
    media.addEventListener("play", sync);
    media.addEventListener("pause", sync);
    sync();
  }

  render() {
    if (!this.shadowRoot) return;
    const src = this.getAttribute("src") || "";
    const poster = this.getAttribute("poster") || "";
    const muted = this.hasAttribute("muted");
    const autoplay = this.hasAttribute("autoplay");
    const loop = this.hasAttribute("loop");
    const type = this.resolveType(src);
    const preferNativeControls = this.getAttribute("prefer-native-controls") !== "false";

    const mediaMarkup =
      type === "youtube"
        ? `<div class="media-shell video-shell">
            <iframe class="embed" src="${this.getYouTubeEmbed(src)}" title="Video preview" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
          </div>`
        : type === "soundcloud"
          ? `<div class="media-shell soundcloud-shell">
              <iframe class="embed soundcloud" src="${this.getSoundcloudEmbed(src)}" title="Audio preview" loading="lazy"></iframe>
            </div>`
          : type === "video"
            ? `<div class="media-shell video-shell">
                <video ${autoplay ? "autoplay" : ""} ${muted ? "muted" : ""} ${loop ? "loop" : ""} ${preferNativeControls ? "controls" : ""} ${poster ? `poster="${poster.replace(/"/g, "&quot;")}"` : ""} playsinline src="${src.replace(/"/g, "&quot;")}"></video>
              </div>`
            : `<audio ${autoplay ? "autoplay" : ""} ${muted ? "muted" : ""} ${loop ? "loop" : ""} ${preferNativeControls ? "controls" : ""} src="${src.replace(/"/g, "&quot;")}"></audio>`;

    const isNative = type === "video" || type === "audio";
    const renderCustomControls = isNative && !preferNativeControls;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .frame {
          width: 100%;
          display: grid;
        }
        .media-shell {
          position: relative;
          width: 100%;
          border-radius: var(--radius-100);
          overflow: hidden;
          background: var(--surface-elevated-200);
        }
        .video-shell {
          aspect-ratio: var(--media-player-video-ratio, 16 / 9);
        }
        .soundcloud-shell {
          aspect-ratio: var(--media-player-soundcloud-ratio, 16 / 5);
          min-height: 16rem;
        }
        .media-shell > video,
        .media-shell > .embed {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        video,
        audio {
          width: 100%;
          background: var(--surface-elevated-100);
        }
        video {
          object-fit: cover;
        }
        .embed {
          border: 0;
          background: var(--surface-elevated-100);
        }
        .controls {
          display: inline-flex;
          width: 100%;
          align-items: center;
          padding: var(--space-100);
          box-sizing: border-box;
        }
        .controls mui-range-input {
          flex: 1 1 auto;
          min-width: 0;
          --range-input-accent-color: var(--media-player-seek-color, var(--grey-1200));
          --range-input-bubble-background: var(--media-player-seek-time-background, var(--surface-elevated-100));
          --range-input-bubble-border-color: var(--media-player-seek-time-border-color, var(--border-color));
        }
        [data-action="time-mode"] {
          white-space: nowrap;
          flex: 0 0 auto;
        }

      </style>
      <div class="frame">
        ${mediaMarkup}
        ${
          renderCustomControls
            ? `<div class="controls">
                <mui-hint placement="top">
                  <mui-button slot="trigger" data-action="play" size="x-small" icon-only variant="tertiary" aria-label="Play media">
                    <mui-icon-play-rectangle size="x-small"></mui-icon-play-rectangle>
                  </mui-button>
                  Play/Stop
                </mui-hint>
                <mui-range-input data-action="seek" min="0" max="0" value="0" step="0.1" bubble bubble-format="time" label="Media seek"></mui-range-input>
                <mui-hint placement="top">
                  <mui-button slot="trigger" data-action="mute" size="x-small" icon-only variant="tertiary" aria-label="Mute media">
                    <mui-icon-music-microphone size="x-small"></mui-icon-music-microphone>
                  </mui-button>
                  Mute
                </mui-hint>
                <mui-hint placement="top">
                  <mui-button slot="trigger" data-action="time-mode" size="x-small" variant="tertiary" aria-pressed="false">0:00 / 0:00</mui-button>
                  Time
                </mui-hint>
              </div>`
            : ""
        }
      </div>
    `;
  }
}

if (!customElements.get("mui-media-player")) {
  customElements.define("mui-media-player", MuiMediaPlayer);
}
