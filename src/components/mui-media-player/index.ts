import "../mui-button";
import "../mui-body";
import "../mui-dropdown";
import "../mui-hint";
import "../mui-icons/fullscreen";
import "../mui-icons/pause";
import "../mui-icons/picture-in-picture";
import "../mui-icons/play-fill";
import "../mui-icons/reload";
import "../mui-icons/music-microphone";
import "../mui-icons/speaker-mute";
import "../mui-icons/speaker-one-wave";
import "../mui-icons/speaker-two-wave";
import "../mui-icons/stop-fill";
import "../mui-icons/vertical-ellipsis";
import "../mui-link";

type ResolvedType = "video" | "audio" | "youtube" | "soundcloud";
type ControlsMode = "player" | "thumbnail" | "none";
type VolumeIconName = "muted" | "volumeLow" | "volumeHigh";
type ControlIconName =
  | "play"
  | "pause"
  | "stop"
  | "reload"
  | "muted"
  | "volumeLow"
  | "volumeHigh"
  | "pip"
  | "fullscreen"
  | "more";

class MuiMediaPlayer extends HTMLElement {
  private countdownMode = false;
  private cleanupControlBindings: (() => void) | null = null;

  static get observedAttributes() {
    return ["src", "type", "autoplay", "muted", "loop", "poster", "artwork", "thumbnail", "media-title", "controls"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindControls();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
    this.bindControls();
  }

  disconnectedCallback() {
    this.cleanupControlBindings?.();
    this.cleanupControlBindings = null;
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

  private getControlIcon(name: ControlIconName) {
    const tagName = {
      play: "mui-icon-play-fill",
      pause: "mui-icon-pause",
      stop: "mui-icon-stop-fill",
      reload: "mui-icon-reload",
      muted: "mui-icon-speaker-mute",
      volumeLow: "mui-icon-speaker-one-wave",
      volumeHigh: "mui-icon-speaker-two-wave",
      pip: "mui-icon-picture-in-picture",
      fullscreen: "mui-icon-fullscreen",
      more: "mui-icon-vertical-ellipsis",
    }[name];

    return `<${tagName} class="control-icon" size="medium" aria-hidden="true"></${tagName}>`;
  }

  private getVolumeIconName(muted: boolean, volume: number): VolumeIconName {
    if (muted || volume === 0) return "muted";
    return volume < 0.5 ? "volumeLow" : "volumeHigh";
  }

  private getControlsMode(): ControlsMode {
    const controls = (this.getAttribute("controls") || "").toLowerCase();
    if (controls === "player" || controls === "thumbnail" || controls === "none") return controls;
    if (controls === "system" || controls === "custom") return "player";

    return "player";
  }

  private renderSeekControl() {
    return `<input class="range seek" data-action="seek" type="range" min="0" max="0" value="0" step="0.01" aria-label="Media seek" />`;
  }

  private renderVolumeControl(muted: boolean) {
    return `<input class="range volume" data-action="volume" type="range" min="0" max="1" value="${muted ? "0" : "1"}" step="0.01" aria-label="Volume" />`;
  }

  private renderPlayHintControl() {
    return `<mui-hint placement="top">
      <mui-button slot="trigger" data-action="play" size="small" icon-only variant="tertiary" aria-label="Play media">
        ${this.getControlIcon("play")}
      </mui-button>
      <span data-hint="play">Play</span>
    </mui-hint>`;
  }

  private renderTimeControl() {
    return `<mui-hint placement="top">
      <mui-button slot="trigger" data-action="time-mode" size="small" variant="tertiary" aria-pressed="false">0:00 / 0:00</mui-button>
      Time
    </mui-hint>`;
  }

  private renderMuteControl(muted: boolean) {
    return `<mui-hint placement="top">
      <mui-button slot="trigger" data-action="mute" size="small" icon-only variant="tertiary" aria-label="Mute media">
        ${this.getControlIcon(this.getVolumeIconName(muted, muted ? 0 : 1))}
      </mui-button>
      Volume
    </mui-hint>`;
  }

  private renderPictureInPictureControl() {
    return `<mui-hint placement="top">
      <mui-button slot="trigger" data-action="pip" size="small" icon-only variant="tertiary" aria-label="Picture in picture" aria-pressed="false">
        ${this.getControlIcon("pip")}
      </mui-button>
      Picture in picture
    </mui-hint>`;
  }

  private renderFullscreenControl() {
    return `<mui-hint placement="top">
      <mui-button slot="trigger" data-action="fullscreen" size="small" icon-only variant="tertiary" aria-label="Fullscreen" aria-pressed="false">
        ${this.getControlIcon("fullscreen")}
      </mui-button>
      Fullscreen
    </mui-hint>`;
  }

  private renderOptionsMenu(escapedSrc: string, offset: string) {
    return `<mui-dropdown class="options-menu" position="right" vertical-position="up" zindex="4" style="--dropdown-offset: ${offset};">
      <mui-button slot="action" data-action="options" size="small" icon-only variant="tertiary" aria-label="Media options">
        ${this.getControlIcon("more")}
      </mui-button>
      <mui-link class="options-item" role="menuitem" variant="tertiary" size="small" href="${escapedSrc}" download>
        Download
      </mui-link>
      <mui-link class="options-item" role="menuitem" variant="tertiary" size="small" href="${escapedSrc}" target="_blank">
        Open source
      </mui-link>
    </mui-dropdown>`;
  }

  private renderOverlayControls(type: "video" | "audio", muted: boolean, escapedSrc: string) {
    return `<div class="controls-row scrub-row">
      ${this.renderSeekControl()}
    </div>
    <div class="controls-row action-row">
      <span class="controls-left">
        ${this.renderPlayHintControl()}
        ${this.renderTimeControl()}
      </span>
      <span class="controls-right">
        ${this.renderMuteControl(muted)}
        ${this.renderVolumeControl(muted)}
        ${type === "video" ? `${this.renderPictureInPictureControl()}${this.renderFullscreenControl()}` : ""}
        ${this.renderOptionsMenu(escapedSrc, type === "video" ? "var(--space-500)" : "var(--space-400)")}
      </span>
    </div>`;
  }

  private renderCompactAudioControls(muted: boolean, escapedSrc: string) {
    return `<span class="control-group">
      <mui-button data-action="play" size="small" icon-only variant="tertiary" aria-label="Play media">
        ${this.getControlIcon("play")}
      </mui-button>
    </span>
    ${this.renderSeekControl()}
    <span class="control-group">
      <mui-button data-action="mute" size="small" icon-only variant="tertiary" aria-label="Mute media">
        ${this.getControlIcon(this.getVolumeIconName(muted, muted ? 0 : 1))}
      </mui-button>
      ${this.renderVolumeControl(muted)}
    </span>
    <mui-button data-action="time-mode" size="small" variant="tertiary" aria-pressed="false">0:00 / 0:00</mui-button>
    ${this.renderOptionsMenu(escapedSrc, "var(--space-400)")}`;
  }

  private renderPlayerControls(type: "video" | "audio", hasAudioPresentation: boolean, muted: boolean, escapedSrc: string) {
    const centerPlaySize = type === "audio" ? "medium" : "large";
    const controlsMarkup =
      type === "video" || hasAudioPresentation
        ? this.renderOverlayControls(type, muted, escapedSrc)
        : this.renderCompactAudioControls(muted, escapedSrc);

    return `<mui-button class="center-play" data-action="play" variant="tertiary" type="button" aria-label="Play media" size="${centerPlaySize}">
      <mui-icon-play-fill class="control-icon" size="${centerPlaySize}" aria-hidden="true"></mui-icon-play-fill>
    </mui-button>
    ${type === "audio" && hasAudioPresentation ? `<div class="controls-hover-zone" aria-hidden="true"></div>` : ""}
    <div class="controls" part="controls">
      ${controlsMarkup}
    </div>`;
  }

  private bindControls() {
    this.cleanupControlBindings?.();
    this.cleanupControlBindings = null;

    if (!this.shadowRoot) return;
    const media = this.shadowRoot.querySelector("video, audio") as HTMLMediaElement | null;
    if (!media) return;

    const frame = this.shadowRoot.querySelector(".frame") as HTMLElement | null;
    const playBtns = Array.from(this.shadowRoot.querySelectorAll('[data-action="play"]')) as HTMLElement[];
    const playHint = this.shadowRoot.querySelector('[data-hint="play"]') as HTMLElement | null;
    const muteBtn = this.shadowRoot.querySelector('[data-action="mute"]') as HTMLElement | null;
    const seek = this.shadowRoot.querySelector('[data-action="seek"]') as HTMLInputElement | null;
    const volume = this.shadowRoot.querySelector('[data-action="volume"]') as HTMLInputElement | null;
    const timeToggle = this.shadowRoot.querySelector('[data-action="time-mode"]') as HTMLElement | null;
    const pipBtn = this.shadowRoot.querySelector('[data-action="pip"]') as HTMLElement | null;
    const fullscreenBtn = this.shadowRoot.querySelector('[data-action="fullscreen"]') as HTMLElement | null;
    const hasCustomControls = Boolean(
      playBtns.length || muteBtn || seek || volume || timeToggle || pipBtn || fullscreenBtn,
    );
    if (!hasCustomControls) return;

    const isVideo = media instanceof HTMLVideoElement;
    const usesHoverOverlayControls = Boolean(frame && !frame.classList.contains("audio-player-only"));
    let lastPaused: boolean | null = null;
    let lastMuted: boolean | null = null;
    let lastVolume: number | null = null;
    let lastVolumeIcon: VolumeIconName | null = null;
    let isSeeking = false;
    let animationFrame = 0;
    const cleanups: (() => void)[] = [];
    const on = (target: EventTarget | null | undefined, type: string, listener: EventListener) => {
      if (!target) return;
      target.addEventListener(type, listener);
      cleanups.push(() => target.removeEventListener(type, listener));
    };

    const setRangeProgress = (input: HTMLInputElement | null, value: number, max: number) => {
      if (!input) return;
      const progress = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
      input.style.setProperty("--media-player-range-progress", `${progress}%`);
    };

    const syncSeek = () => {
      if (!seek || isSeeking) return;
      const duration = Number.isFinite(media.duration) ? media.duration : 0;
      const currentTime = media.currentTime || 0;

      seek.max = String(duration || 0);
      seek.value = String(currentTime);
      setRangeProgress(seek, currentTime, duration);
    };

    const syncVolume = () => {
      if (!volume) return;
      const nextVolume = media.muted ? 0 : media.volume;
      if (nextVolume === lastVolume) return;
      volume.value = String(nextVolume);
      setRangeProgress(volume, nextVolume, 1);
      lastVolume = nextVolume;
    };

    const syncVolumeIcon = () => {
      if (!muteBtn) return;
      const nextIcon = this.getVolumeIconName(media.muted, media.volume);
      if (nextIcon === lastVolumeIcon) return;

      muteBtn.innerHTML = this.getControlIcon(nextIcon);
      lastVolumeIcon = nextIcon;
    };

    const syncTime = () => {
      if (!timeToggle) return;
      const duration = Number.isFinite(media.duration) ? media.duration : 0;
      const remaining = Math.max(0, duration - media.currentTime);
      timeToggle.textContent = this.countdownMode
        ? `-${this.formatTime(remaining)} / ${this.formatTime(duration)}`
        : `${this.formatTime(media.currentTime)} / ${this.formatTime(duration)}`;
      timeToggle.setAttribute("aria-pressed", String(this.countdownMode));
    };

    const tick = () => {
      syncSeek();
      syncTime();
      if (!media.paused && !media.ended) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const startTick = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(tick);
    };

    const syncPlayState = (paused: boolean, force = false) => {
      playBtns.forEach((button) => {
        button.setAttribute("aria-label", paused ? "Play media" : "Pause media");
        button.setAttribute("aria-pressed", String(!paused));
      });
      frame?.classList.toggle("is-playing", !paused);
      frame?.classList.toggle("is-paused", paused);
      if (playBtns.length && (force || paused !== lastPaused)) {
        playBtns.forEach((button) => {
          button.innerHTML = this.getControlIcon(paused ? "play" : "pause");
        });
        if (playHint) {
          playHint.textContent = paused ? "Play" : "Pause";
        }
        lastPaused = paused;
      }
    };

    const sync = () => {
      const paused = media.paused;
      syncPlayState(paused);
      if (muteBtn && media.muted !== lastMuted) {
        muteBtn.setAttribute("aria-label", media.muted ? "Unmute media" : "Mute media");
        lastMuted = media.muted;
      }
      syncVolumeIcon();
      if (pipBtn) {
        const canPictureInPicture =
          isVideo &&
          "pictureInPictureEnabled" in document &&
          document.pictureInPictureEnabled &&
          "requestPictureInPicture" in media;
        if (canPictureInPicture) {
          pipBtn.removeAttribute("disabled");
          pipBtn.setAttribute("aria-pressed", String(document.pictureInPictureElement === media));
        } else {
          pipBtn.setAttribute("disabled", "");
          pipBtn.setAttribute("aria-pressed", "false");
        }
      }
      if (fullscreenBtn && frame) {
        const canFullscreen = "requestFullscreen" in frame;
        if (canFullscreen) {
          fullscreenBtn.removeAttribute("disabled");
          fullscreenBtn.setAttribute("aria-pressed", String(document.fullscreenElement === frame));
        } else {
          fullscreenBtn.setAttribute("disabled", "");
          fullscreenBtn.setAttribute("aria-pressed", "false");
        }
      }
      syncSeek();
      syncVolume();
      syncTime();
    };

    const handlePlayClick = () => {
      if (media.paused) {
        syncPlayState(false, true);
        media.play().catch(() => sync());
      } else {
        syncPlayState(true, true);
        media.pause();
      }
    };
    playBtns.forEach((button) => on(button, "click", handlePlayClick));

    on(frame, "pointerleave", () => {
      if (!usesHoverOverlayControls || media.paused) return;

      const activeElement = this.shadowRoot?.activeElement as HTMLElement | null;
      if (activeElement && frame?.contains(activeElement)) {
        activeElement.blur();
      }
    });
    on(muteBtn, "click", () => {
      media.muted = !media.muted;
      sync();
    });
    on(seek, "pointerdown", () => {
      isSeeking = true;
    });
    on(seek, "pointerup", () => {
      isSeeking = false;
      sync();
      if (!media.paused) startTick();
    });
    on(seek, "input", () => {
      if (!seek) return;
      const duration = Number.isFinite(media.duration) ? media.duration : 0;
      const value = Number(seek.value || 0);

      setRangeProgress(seek, value, duration);
      media.currentTime = value;
      syncTime();
    });
    on(volume, "input", () => {
      if (!volume) return;
      const nextVolume = Math.max(0, Math.min(1, Number(volume.value || 0)));
      media.volume = nextVolume;
      media.muted = nextVolume === 0;
      setRangeProgress(volume, nextVolume, 1);
      sync();
    });
    on(timeToggle, "click", () => {
      this.countdownMode = !this.countdownMode;
      sync();
    });
    on(pipBtn, "click", async () => {
      if (!(media instanceof HTMLVideoElement) || !("requestPictureInPicture" in media)) return;
      try {
        if (document.pictureInPictureElement === media) {
          await document.exitPictureInPicture();
        } else {
          await media.requestPictureInPicture();
        }
      } catch {
        return;
      }
      sync();
    });
    on(fullscreenBtn, "click", async () => {
      if (!frame || !("requestFullscreen" in frame)) return;
      try {
        if (document.fullscreenElement === frame) {
          await document.exitFullscreen();
        } else {
          await frame.requestFullscreen();
        }
      } catch {
        return;
      }
      sync();
    });
    on(media, "timeupdate", sync);
    on(media, "loadedmetadata", sync);
    on(media, "volumechange", sync);
    on(media, "enterpictureinpicture", sync);
    on(media, "leavepictureinpicture", sync);
    on(document, "fullscreenchange", sync);
    on(media, "play", () => {
      sync();
      startTick();
    });
    on(media, "pause", () => {
      cancelAnimationFrame(animationFrame);
      sync();
    });
    on(media, "ended", () => {
      cancelAnimationFrame(animationFrame);
      sync();
    });
    this.cleanupControlBindings = () => {
      cancelAnimationFrame(animationFrame);
      cleanups.forEach((cleanup) => cleanup());
    };
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
    const escapedSrc = src.replace(/"/g, "&quot;");
    const isNative = type === "video" || type === "audio";
    const controlsMode = this.getControlsMode();
    const renderPlayerControls = isNative && controlsMode !== "none";
    const thumbnail = this.getAttribute("thumbnail") || "";
    const artwork = this.getAttribute("artwork") || (type === "audio" && controlsMode === "thumbnail" ? poster : "");
    const metaImage = thumbnail || artwork;
    const mediaTitle = this.getAttribute("media-title") || "";
    const hasAudioPresentation = type === "audio" && renderPlayerControls && Boolean(metaImage || mediaTitle);
    const audioVisualMarkup = hasAudioPresentation
      ? `<div class="audio-visual ${artwork ? "has-artwork" : ""}" part="audio-visual">
            ${
              artwork
                ? `<img class="audio-artwork" src="${artwork.replace(/"/g, "&quot;")}" alt="" loading="lazy" />`
                : ""
            }
            ${
              mediaTitle
                ? `<div class="audio-visual-copy">
                    <div class="audio-meta">
                      ${
                        metaImage
                          ? `<img class="audio-meta-thumbnail" src="${metaImage.replace(/"/g, "&quot;")}" alt="" loading="lazy" />`
                          : `<span class="audio-meta-icon" aria-hidden="true"><mui-icon-music-microphone size="medium"></mui-icon-music-microphone></span>`
                      }
                      <div class="audio-meta-copy">
                        <mui-body size="small" weight="bold">${mediaTitle.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</mui-body>
                        <slot name="meta"></slot>
                      </div>
                    </div>
                  </div>`
                : ""
            }
          </div>`
      : "";

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
                <video part="media" ${autoplay ? "autoplay" : ""} ${muted ? "muted" : ""} ${loop ? "loop" : ""} ${poster ? `poster="${poster.replace(/"/g, "&quot;")}"` : ""} playsinline src="${escapedSrc}"></video>
                ${renderPlayerControls ? `<slot name="system-controls"></slot>` : ""}
              </div>`
            : `${audioVisualMarkup}<audio part="media" ${autoplay ? "autoplay" : ""} ${muted ? "muted" : ""} ${loop ? "loop" : ""} src="${escapedSrc}"></audio>`;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          container-type: inline-size;
          --media-player-range-progress: 0%;
          --media-player-range-thumb-size: 1.6rem;
          --media-player-range-track-height: 0.4rem;
          --dropdown-min-width: 16rem;
          --dropdown-offset: var(--space-100);
        }
        mui-button::part(border-radius) {
          border-radius: var(--radius-400);
        }
        .frame {
          width: 100%;
          display: grid;
          position: relative;
        }
        .frame.custom-controls {
          border-radius: var(--radius-100);
          overflow: hidden;
          background: var(--surface-elevated-200);
          border: var(--border-thin);
          transition:
            background-color var(--speed-200) ease,
            border-color var(--speed-200) ease,
            box-shadow var(--speed-200) ease;
        }
        .video-frame.custom-controls {
          border: 0;
          background: transparent;
          overflow: hidden;
          border-radius: 2rem;
        }
        .video-frame.custom-controls,
        .video-frame.custom-controls .media-shell,
        .video-frame.custom-controls .controls,
        .audio-frame.custom-controls.has-artwork,
        .audio-frame.custom-controls.has-artwork .controls,
        .audio-visual.has-artwork {
          --text-color: var(--white);
          --text-color-optional: rgba(255, 255, 255, 0.72);
          --icon-color-default: var(--white);
          --icon-color-inverted: var(--white);
          --media-player-range-color: var(--media-player-dark-range-color);
          --media-player-range-thumb-color: var(--media-player-dark-range-thumb-color);
          --media-player-range-track-color: var(--media-player-dark-range-track-color);
          --action-tertiary-background: transparent;
          --action-tertiary-background-hover: var(--media-player-dark-control-background-hover);
          --action-tertiary-background-focus: var(--media-player-dark-control-background-hover);
          --action-tertiary-border: var(--stroke-size-100) var(--stroke-solid) transparent;
          --action-tertiary-border-hover: var(--stroke-size-100) var(--stroke-solid) transparent;
          --action-tertiary-border-focus: var(--stroke-size-100) var(--stroke-solid) transparent;
          --action-tertiary-text-color: var(--white);
          --action-tertiary-text-color-hover: var(--white);
          --action-tertiary-text-color-focus: var(--white);
          --dropdown-background: var(--black-opacity-80);
          --dropdown-border-color: var(--white-opacity-30);
          --dropdown-shadow-color: var(--black-opacity-30);
          --dropdown-radius: 1.2rem;
          --hint-background: var(--black-opacity-80);
        }
        .audio-frame.custom-controls {
          box-sizing: border-box;
          position: relative;
          border-radius: 2rem;
          background: var(--surface-elevated-200);
          box-shadow: var(--media-player-frame-shadow);
        }
        .media-shell {
          position: relative;
          width: 100%;
          border-radius: var(--radius-100);
          overflow: hidden;
          background: var(--surface-elevated-200);
        }
        .custom-controls .media-shell {
          border-radius: 0;
          background: var(--surface-elevated-100);
        }
        .video-frame.custom-controls .media-shell {
          background: var(--media-player-dark-background);
          border-radius: 2rem;
          box-shadow: var(--media-player-video-shadow);
        }
        .video-frame.custom-controls .media-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(to bottom, var(--black-opacity-50) 0%, transparent 28%),
            linear-gradient(to top, var(--black-opacity-70) 0%, transparent 44%);
          opacity: 1;
          transition: opacity var(--speed-300) ease;
        }
        .video-frame.custom-controls.is-playing .media-shell::after {
          opacity: 0.42;
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
        .media-shell > video {
          transition:
            filter var(--speed-300) ease,
            transform var(--speed-300) ease;
        }
        .video-frame.custom-controls:hover .media-shell > video,
        .video-frame.custom-controls:focus-within .media-shell > video {
          filter: brightness(1.06) saturate(1.04);
          transform: scale(1.01);
        }
        video,
        audio {
          width: 100%;
          background: var(--surface-elevated-100);
        }
        audio:not([controls]) {
          display: none;
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
          gap: var(--space-050);
          padding: var(--space-200);
          box-sizing: border-box;
          background: var(--media-player-control-background);
          color: var(--media-player-control-color);
        }

        /* Overlay controls for video and audio presentations */
        .video-frame.custom-controls .controls,
        .audio-frame.custom-controls:not(.audio-player-only) .controls {
          position: absolute;
          z-index: 2;
          inset: auto var(--space-000) var(--space-000);
          width: auto;
          display: grid;
          grid-template-rows: auto auto;
          gap: var(--space-075);
          align-items: stretch;
          border-radius: 0;
          background: linear-gradient(180deg, transparent 0%, var(--media-player-surface-overlay-end) 100%);
          color: var(--media-player-control-color);
          transform: translateY(var(--space-300));
          opacity: 0;
          pointer-events: none;
          transition:
            opacity var(--speed-300) ease,
            transform var(--speed-300) ease;
        }
        .video-frame.custom-controls .controls,
        .audio-frame.custom-controls.has-artwork .controls {
          background: linear-gradient(180deg, transparent 0%, var(--media-player-dark-overlay-background) 100%);
          color: var(--media-player-dark-control-color);
        }
        .video-frame.custom-controls:hover .controls,
        .video-frame.custom-controls:focus-within .controls,
        .audio-frame.custom-controls:not(.audio-player-only) .controls-hover-zone:hover + .controls,
        .audio-frame.custom-controls:not(.audio-player-only) .controls:hover,
        .audio-frame.custom-controls:not(.audio-player-only):focus-within .controls {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        /* Bottom proximity trigger for audio presentation controls */
        .controls-hover-zone {
          display: none;
        }
        .audio-frame.custom-controls:not(.audio-player-only) .controls-hover-zone {
          display: block;
          position: absolute;
          z-index: 1;
          inset: auto var(--space-000) var(--space-000);
          height: 2.4rem;
          pointer-events: auto;
        }
        /* Center play affordance */
        .center-play {
          position: absolute;
          z-index: 2;
          inset: 50% auto auto 50%;
          transform: translate(-50%, -50%) scale(1);
          transition:
            opacity var(--speed-300) ease,
        }
        .center-play::part(background) {
          background: var(--media-player-center-play-background);
          border-radius: 100%;
        }
        .video-frame.custom-controls .center-play::part(background),
        .audio-frame.custom-controls.has-artwork .center-play::part(background) {
          background: var(--media-player-dark-overlay-background);
        }
        .frame.custom-controls .center-play {
          display: grid;
        }
        .audio-frame.custom-controls.audio-player-only .center-play {
          display: none;
        }
        .frame.custom-controls.is-playing .center-play {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.92);
          pointer-events: none;
        }
        /* Control row layout */
        .control-group {
          display: inline-flex;
          align-items: center;
          gap: var(--space-025);
          flex: 0 0 auto;
        }
        .controls-row {
          display: flex;
          align-items: center;
          gap: var(--space-050);
          min-width: 0;
          padding: var(--space-000) var(--space-200);
          box-sizing: border-box;
        }
        .controls-row.scrub-row {
          grid-row: 1;
          width: 100%;
        }
        .controls-row.action-row {
          grid-row: 2;
          justify-content: space-between;
          margin-block-end: var(--space-050);
        }
        .audio-frame.custom-controls.audio-player-only .controls-row.action-row {
          margin-block-end: var(--space-000);
        }
        .controls-left,
        .controls-right {
          display: inline-flex;
          align-items: center;
          gap: var(--space-050);
          min-width: 0;
        }
        .controls-right {
          margin-left: auto;
        }
        /* Compact audio player */
        .audio-frame.custom-controls.audio-player-only {
          padding: var(--space-000);
          background: transparent;
          box-shadow: none;
        }
        .audio-frame.custom-controls.audio-player-only .controls {
          position: static;
          inset: auto;
          width: 100%;
          min-height: var(--action-size-medium);
          color: var(--media-player-control-color);
          background: var(--media-player-control-background);
          box-shadow: none;
        }
        .audio-frame.custom-controls.audio-player-only .range {
          margin-block-end: var(--space-000);
        }
        /* Audio metadata and thumbnail presentation */
        .audio-visual {
          display: flex;
          align-items: flex-start;
          min-height: var(--media-player-audio-height, 18rem);
          gap: var(--space-300);
          padding: var(--space-300);
          background:
            linear-gradient(135deg, var(--media-player-surface-overlay-end), transparent 52%),
            var(--surface-elevated-100);
          position: relative;
        }
        .audio-visual.has-artwork {
          min-height: var(--media-player-audio-height, 18rem);
          align-items: flex-start;
          color: var(--media-player-dark-control-color);
          background: var(--media-player-dark-background);
        }
        .audio-visual::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.06), transparent);
          opacity: 0.5;
        }
        .audio-visual.has-artwork::after {
          background:
            linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.66)),
            radial-gradient(circle at top right, rgba(255, 255, 255, 0.16), transparent 44%);
          opacity: 1;
        }
        .audio-artwork {
          position: relative;
          z-index: 1;
          width: 6.4rem;
          height: 6.4rem;
          border-radius: 1.6rem;
          object-fit: cover;
          flex: 0 0 auto;
          box-shadow: var(--media-player-artwork-shadow);
        }
        .audio-visual.has-artwork .audio-artwork {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 0;
          box-shadow: none;
          filter: saturate(1.08);
        }
        .audio-visual-copy {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          min-width: 0;
          background: linear-gradient(180deg, var(--media-player-surface-overlay-start), transparent);
          width: 100%;
          padding: var(--space-300);
        }
        .audio-visual.has-artwork .audio-visual-copy {
          background: linear-gradient(180deg, var(--media-player-dark-overlay-background), transparent);
        }
        .audio-meta {
          display: flex;
          align-items: center;
          gap: var(--space-300);
          min-width: 0;
        }
        .audio-meta-icon,
        .audio-meta-thumbnail {
          width: 4.8rem;
          height: 4.8rem;
          flex: 0 0 4.8rem;
          border-radius: var(--radius-300);
          border: var(--border-thin);
          box-shadow: var(--media-player-meta-icon-shadow);
        }
        .audio-meta-icon {
          display: inline-grid;
          place-items: center;
          color: var(--text-color);
          background: var(--surface-elevated-300);
        }
        .audio-meta-thumbnail {
          object-fit: cover;
          box-shadow: var(--media-player-thumbnail-shadow);
        }
        .audio-visual.has-artwork .audio-meta-thumbnail {
          border: var(--media-player-dark-thumbnail-border);
          box-shadow: var(--media-player-dark-thumbnail-shadow);
        }
        .audio-meta-copy {
          display: grid;
          gap: var(--space-025);
          min-width: 0;
          text-shadow: none;
        }
        .audio-visual.has-artwork .audio-meta-copy {
          text-shadow: var(--media-player-meta-text-shadow);
        }
        .audio-visual.has-artwork .audio-meta-copy ::slotted(*) {
          --text-color: var(--white);
          --text-color-optional: rgba(255, 255, 255, 0.72);
          --icon-color-default: var(--white);
          --icon-color-inverted: var(--white);
        }
        .audio-frame .video-only {
          display: none;
        }
        /* Range controls */
        .range {
          flex: 1 1 auto;
          min-width: 0;
          appearance: none;
          -webkit-appearance: none;
          height: 1.6rem;
          padding: 0;
          border: 0;
          border-radius: 999rem;
          background: transparent;
          cursor: pointer;
          margin: 0;
          margin-block-end: var(--space-050);
          transition: filter var(--speed-200) ease;
        }
        .range:hover,
        .range:focus-visible {
          filter: brightness(1.12);
        }
        .range::-webkit-slider-runnable-track {
          height: var(--media-player-range-track-height);
          border: 0;
          border-radius: 999rem;
          background:
            linear-gradient(
              to right,
              var(--media-player-range-color, var(--white)) 0%,
              var(--media-player-range-color, var(--white)) var(--media-player-range-progress),
              var(--media-player-range-track-color, var(--white-opacity-30)) var(--media-player-range-progress),
              var(--media-player-range-track-color, var(--white-opacity-30)) 100%
            );
        }
        .range::-moz-range-track {
          height: var(--media-player-range-track-height);
          border: 0;
          border-radius: 999rem;
          background: var(--media-player-range-track-color, var(--white-opacity-30));
        }
        .range::-moz-range-progress {
          height: var(--media-player-range-track-height);
          border: 0;
          border-radius: 999rem;
          background: var(--media-player-range-color, var(--white));
        }
        .range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: var(--media-player-range-thumb-size);
          height: var(--media-player-range-thumb-size);
          margin-top: calc((var(--media-player-range-track-height) - var(--media-player-range-thumb-size)) / 2);
          border: 0;
          border-radius: 999rem;
          background: var(--media-player-range-thumb-color, var(--media-player-range-color, var(--white)));
          box-shadow: var(--media-player-range-thumb-shadow);
        }
        .range::-moz-range-thumb {
          width: var(--media-player-range-thumb-size);
          height: var(--media-player-range-thumb-size);
          border: 0;
          border-radius: 999rem;
          background: var(--media-player-range-thumb-color, var(--media-player-range-color, var(--white)));
          box-shadow: var(--media-player-range-thumb-shadow);
        }
        .range:hover::-webkit-slider-runnable-track,
        .range:focus-visible::-webkit-slider-runnable-track {
          height: 0.5rem;
        }
        .range:hover::-moz-range-track,
        .range:hover::-moz-range-progress,
        .range:focus-visible::-moz-range-track,
        .range:focus-visible::-moz-range-progress {
          height: 0.5rem;
        }
        .range:hover::-webkit-slider-thumb,
        .range:focus-visible::-webkit-slider-thumb {
          width: 1.8rem;
          height: 1.8rem;
          margin-top: calc((0.5rem - 1.8rem) / 2);
        }
        .range:hover::-moz-range-thumb,
        .range:focus-visible::-moz-range-thumb {
          width: 1.8rem;
          height: 1.8rem;
        }
        .range:focus-visible {
          outline: var(--action-focus-outline);
          outline-offset: var(--action-focus-outline-offset);
        }
        .seek {
          flex: 1 1 auto;
        }
        .volume {
          width: 6rem;
          flex: 0 0 6rem;
        }
        [data-action="time-mode"] {
          white-space: nowrap;
          flex: 0 0 auto;
        }
        .options-menu {
          flex: 0 0 auto;
        }

        .control-icon {
          fill: currentColor;
          color: currentColor;
        }
        .controls mui-button {
          transition: filter var(--speed-200) ease;
        }
        .controls mui-button:hover,
        .controls mui-button:focus-visible {
          filter: brightness(1.12);
        }
        .controls mui-button:active {
          filter: brightness(0.96);
        }
        mui-button[disabled] {
          opacity: var(--opacity-disabled);
          pointer-events: none;
        }
        @container (max-width: 52rem) {
          .volume,
          .video-only {
            display: none;
          }
          .audio-visual {
            min-height: auto;
            gap: var(--space-200);
            padding: var(--space-200);
          }
          .audio-visual-copy {
            padding: var(--space-200);
          }
          .audio-meta {
            gap: var(--space-200);
          }
          .audio-artwork {
            width: 4.8rem;
            height: 4.8rem;
          }
        }

      </style>
      <div class="frame ${renderPlayerControls ? "custom-controls" : ""} ${type}-frame ${type === "audio" && artwork ? "has-artwork" : ""} ${type === "audio" && renderPlayerControls && !hasAudioPresentation ? "audio-player-only" : ""}">
        ${mediaMarkup}
        ${renderPlayerControls ? this.renderPlayerControls(type as "video" | "audio", hasAudioPresentation, muted, escapedSrc) : ""}
      </div>
    `;
  }
}

if (!customElements.get("mui-media-player")) {
  customElements.define("mui-media-player", MuiMediaPlayer);
}
