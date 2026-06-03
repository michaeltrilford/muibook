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
type ControlsMode = "player" | "none";
type VolumeIconName = "muted" | "volumeLow" | "volumeHigh";
type WebKitVideoPresentationMode = "inline" | "fullscreen" | "picture-in-picture";
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

type WebKitVideoElement = HTMLVideoElement & {
  webkitDisplayingFullscreen?: boolean;
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitPresentationMode?: WebKitVideoPresentationMode;
  webkitSetPresentationMode?: (mode: WebKitVideoPresentationMode) => void;
  webkitSupportsPresentationMode?: (mode: WebKitVideoPresentationMode) => boolean;
  webkitSupportsFullscreen?: boolean;
};

type WebKitFullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  webkitRequestFullScreen?: () => Promise<void> | void;
};

type WebKitFullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
};

type WaveformCanvas = HTMLCanvasElement & {
  __muiWaveformPeaks?: number[];
};

class MuiMediaPlayer extends HTMLElement {
  private countdownMode = false;
  private cleanupControlBindings: (() => void) | null = null;
  private waveformAbortController: AbortController | null = null;
  private waveformResizeObserver: ResizeObserver | null = null;
  private waveformThemeObserver: MutationObserver | null = null;
  private waveformRenderId = 0;
  private static waveformPeaksCache = new Map<string, number[]>();

  static get observedAttributes() {
    return [
      "src",
      "type",
      "autoplay",
      "muted",
      "loop",
      "poster",
      "artwork",
      "media-title",
      "height",
      "center-play",
      "controls",
      "waveform",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindControls();
    void this.renderWaveform();
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.render();
    this.bindControls();
    void this.renderWaveform();
  }

  disconnectedCallback() {
    this.cleanupControlBindings?.();
    this.cleanupControlBindings = null;
    this.cleanupWaveform();
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

  private cleanupWaveform() {
    this.waveformAbortController?.abort();
    this.waveformAbortController = null;
    this.waveformResizeObserver?.disconnect();
    this.waveformResizeObserver = null;
    this.waveformThemeObserver?.disconnect();
    this.waveformThemeObserver = null;
    this.waveformRenderId += 1;
  }

  private async getWaveformPeaks(src: string, signal: AbortSignal) {
    const cachedPeaks = MuiMediaPlayer.waveformPeaksCache.get(src);
    if (cachedPeaks) return cachedPeaks;

    const AudioContextConstructor =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextConstructor) return [];

    const response = await fetch(src, { signal });
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new AudioContextConstructor();

    try {
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const sampleCount = 192;
      const samplesPerPeak = Math.max(1, Math.floor(audioBuffer.length / sampleCount));
      const peaks = Array.from({ length: sampleCount }, (_, peakIndex) => {
        let peak = 0;
        const start = peakIndex * samplesPerPeak;
        const end = Math.min(audioBuffer.length, start + samplesPerPeak);

        for (let channelIndex = 0; channelIndex < audioBuffer.numberOfChannels; channelIndex += 1) {
          const channel = audioBuffer.getChannelData(channelIndex);
          for (let sampleIndex = start; sampleIndex < end; sampleIndex += 1) {
            peak = Math.max(peak, Math.abs(channel[sampleIndex] || 0));
          }
        }

        return Math.min(1, peak);
      });

      MuiMediaPlayer.waveformPeaksCache.set(src, peaks);
      return peaks;
    } finally {
      void audioContext.close();
    }
  }

  private getVisibleWaveformPeaks(peaks: number[], width: number) {
    const targetCount = Math.min(peaks.length, Math.max(72, Math.min(192, Math.floor(width / 4.5))));

    if (targetCount >= peaks.length) return peaks;

    return Array.from({ length: targetCount }, (_, index) => {
      const start = Math.floor((index / targetCount) * peaks.length);
      const end = Math.max(start + 1, Math.floor(((index + 1) / targetCount) * peaks.length));
      let peak = 0;

      for (let peakIndex = start; peakIndex < end; peakIndex += 1) {
        peak = Math.max(peak, peaks[peakIndex] || 0);
      }

      return peak;
    });
  }

  private drawWaveform(canvas: HTMLCanvasElement, peaks: number[], progress = 0) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height || !peaks.length) return;

    const styles = getComputedStyle(canvas);
    const color = styles.getPropertyValue("--media-player-waveform-color").trim() || "rgba(255, 255, 255, 0.42)";
    const mirrorColor =
      styles.getPropertyValue("--media-player-waveform-mirror-color").trim() || "rgba(255, 255, 255, 0.18)";
    const activeColor =
      styles.getPropertyValue("--media-player-waveform-active-color").trim() || "rgba(255, 255, 255, 0.78)";
    const activeMirrorColor =
      styles.getPropertyValue("--media-player-waveform-active-mirror-color").trim() || "rgba(255, 255, 255, 0.32)";
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);

    const centerY = height / 2;
    const gap = Math.max(1, Math.round(2 * dpr));
    const visiblePeaks = this.getVisibleWaveformPeaks(peaks, rect.width);
    const step = width / visiblePeaks.length;
    const barWidth = Math.max(1, Math.floor(step - gap) + dpr);
    const activeIndex = Math.floor(Math.max(0, Math.min(1, progress)) * visiblePeaks.length);

    visiblePeaks.forEach((peak, index) => {
      const x = index * step + (step - barWidth) / 2;
      const amplitude = Math.max(2 * dpr, peak * centerY * 0.92);
      const isActive = index <= activeIndex;

      context.fillStyle = isActive ? activeColor : color;
      context.fillRect(x, centerY - amplitude, barWidth, amplitude);
      context.fillStyle = isActive ? activeMirrorColor : mirrorColor;
      context.fillRect(x, centerY, barWidth, amplitude * 0.72);
    });
  }

  private async renderWaveform() {
    this.cleanupWaveform();

    if (!this.shadowRoot || !this.hasAttribute("waveform")) return;

    const src = this.getAttribute("src") || "";
    const canvas = this.shadowRoot.querySelector(".audio-waveform") as WaveformCanvas | null;
    if (!src || !canvas) return;

    const renderId = this.waveformRenderId;
    const abortController = new AbortController();
    this.waveformAbortController = abortController;

    try {
      const peaks = await this.getWaveformPeaks(src, abortController.signal);
      if (abortController.signal.aborted || renderId !== this.waveformRenderId || !peaks.length) return;

      canvas.__muiWaveformPeaks = peaks;
      const draw = () => this.drawWaveform(canvas, peaks, Number(canvas.dataset.progress || 0));
      const scheduleDraw = () => {
        requestAnimationFrame(draw);
        requestAnimationFrame(() => requestAnimationFrame(draw));
        window.setTimeout(draw, 80);
        window.setTimeout(draw, 180);
      };
      scheduleDraw();

      this.waveformResizeObserver = new ResizeObserver(draw);
      this.waveformResizeObserver.observe(canvas);

      this.waveformThemeObserver = new MutationObserver(scheduleDraw);
      this.waveformThemeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "style", "data-brand", "data-theme", "theme"],
      });
      if (document.body) {
        this.waveformThemeObserver.observe(document.body, {
          attributes: true,
          attributeFilter: ["class", "style", "data-brand", "data-theme", "theme"],
        });
      }
    } catch {
      canvas.hidden = true;
    }
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
    if (controls === "player" || controls === "none") return controls;
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
      <mui-button slot="trigger" data-action="time-mode" size="small" variant="tertiary" aria-pressed="false" aria-label="Toggle time display">
        <span class="time-label-full">0:00 / 0:00</span>
        <span class="time-label-compact">0:00</span>
      </mui-button>
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

  private shouldRenderPictureInPictureControl() {
    return Boolean(
      "pictureInPictureEnabled" in document ||
      "webkitSupportsPresentationMode" in HTMLVideoElement.prototype ||
      "webkitSetPresentationMode" in HTMLVideoElement.prototype,
    );
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
        ${type === "video" && this.shouldRenderPictureInPictureControl() ? this.renderPictureInPictureControl() : ""}
        ${type === "video" ? this.renderFullscreenControl() : ""}
        ${this.renderOptionsMenu(escapedSrc, type === "video" ? "var(--space-500)" : "var(--space-400)")}
      </span>
    </div>`;
  }

  private renderCompactAudioControls(muted: boolean, escapedSrc: string) {
    return `<div class="controls-row compact-scrub-row">
      ${this.renderSeekControl()}
    </div>
    <div class="controls-row compact-action-row">
      <span class="controls-left">
        ${this.renderPlayHintControl()}
        ${this.renderTimeControl()}
      </span>
      <span class="controls-right">
        ${this.renderMuteControl(muted)}
        ${this.renderVolumeControl(muted)}
        ${this.renderOptionsMenu(escapedSrc, "var(--space-400)")}
      </span>
    </div>`;
  }

  private renderPlayerControls(
    type: "video" | "audio",
    hasAudioPresentation: boolean,
    muted: boolean,
    escapedSrc: string,
    showCenterPlay: boolean,
  ) {
    const centerPlaySize = type === "audio" ? "medium" : "large";
    const hasOverlayControls = type === "video" || hasAudioPresentation;
    const controlsMarkup = hasOverlayControls
      ? this.renderOverlayControls(type, muted, escapedSrc)
      : this.renderCompactAudioControls(muted, escapedSrc);

    return `${
      type === "video"
        ? showCenterPlay
          ? `<mui-button class="center-play" data-action="play" variant="tertiary" type="button" aria-label="Play media" size="${centerPlaySize}">
      <mui-icon-play-fill class="control-icon" size="${centerPlaySize}" aria-hidden="true"></mui-icon-play-fill>
    </mui-button>`
          : `<div class="center-play" aria-hidden="true">
      <mui-icon-play-fill class="control-icon" size="${centerPlaySize}" aria-hidden="true"></mui-icon-play-fill>
    </div>`
        : hasAudioPresentation
          ? `<mui-button class="center-play" data-action="play" variant="tertiary" type="button" aria-label="Play media" size="${centerPlaySize}">
      <mui-icon-play-fill class="control-icon" size="${centerPlaySize}" aria-hidden="true"></mui-icon-play-fill>
    </mui-button>`
          : ""
    }
    ${type === "audio" && hasAudioPresentation ? `<div class="controls-hover-zone" aria-hidden="true"></div>` : ""}
    <div class="controls" part="controls">
      ${controlsMarkup}
    </div>
    ${hasOverlayControls ? `<span class="controls-peek" aria-hidden="true"></span>` : ""}`;
  }

  private bindControls() {
    this.cleanupControlBindings?.();
    this.cleanupControlBindings = null;

    if (!this.shadowRoot) return;
    const media = this.shadowRoot.querySelector("video, audio") as HTMLMediaElement | null;
    if (!media) return;

    const frame = this.shadowRoot.querySelector(".frame") as HTMLElement | null;
    const playBtns = Array.from(this.shadowRoot.querySelectorAll('[data-action="play"]')) as HTMLElement[];
    const centerPlay = this.shadowRoot.querySelector(".center-play") as HTMLElement | null;
    const centerPlayButton = this.shadowRoot.querySelector('.center-play[data-action="play"]') as HTMLElement | null;
    const inlinePlayBtns = playBtns.filter((button) => button !== centerPlayButton);
    const playHint = this.shadowRoot.querySelector('[data-hint="play"]') as HTMLElement | null;
    const muteBtn = this.shadowRoot.querySelector('[data-action="mute"]') as HTMLElement | null;
    const seek = this.shadowRoot.querySelector('[data-action="seek"]') as HTMLInputElement | null;
    const volume = this.shadowRoot.querySelector('[data-action="volume"]') as HTMLInputElement | null;
    const timeToggle = this.shadowRoot.querySelector('[data-action="time-mode"]') as HTMLElement | null;
    const pipBtn = this.shadowRoot.querySelector('[data-action="pip"]') as HTMLElement | null;
    const pipControl = pipBtn?.closest("mui-hint") as HTMLElement | null;
    const fullscreenBtn = this.shadowRoot.querySelector('[data-action="fullscreen"]') as HTMLElement | null;
    const controls = this.shadowRoot.querySelector(".controls") as HTMLElement | null;
    const controlsPeek = this.shadowRoot.querySelector(".controls-peek") as HTMLElement | null;
    const controlsHoverZone = this.shadowRoot.querySelector(".controls-hover-zone") as HTMLElement | null;
    const optionsMenu = this.shadowRoot.querySelector(".options-menu") as HTMLElement | null;
    const waveform = this.shadowRoot.querySelector(".audio-waveform") as WaveformCanvas | null;
    const hasCustomControls = Boolean(
      playBtns.length || muteBtn || seek || volume || timeToggle || pipBtn || fullscreenBtn,
    );
    if (!hasCustomControls) return;

    const isVideo = media instanceof HTMLVideoElement;
    const videoMedia = isVideo ? (media as WebKitVideoElement) : null;
    const fullscreenFrame = frame as WebKitFullscreenElement | null;
    const fullscreenDocument = document as WebKitFullscreenDocument;
    const usesHoverOverlayControls = Boolean(frame && !frame.classList.contains("audio-player-only"));
    let lastPaused: boolean | null = null;
    let lastMuted: boolean | null = null;
    let lastVolume: number | null = null;
    let lastVolumeIcon: VolumeIconName | null = null;
    let isSeeking = false;
    let animationFrame = 0;
    let inactivityTimer = 0;
    let controlsRevealTimer = 0;
    let touchRevealTimer = 0;
    let playFeedbackTimer = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let isOptionsMenuOpen = false;
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
      if (!input.classList.contains("is-previewing")) {
        input.style.setProperty("--media-player-range-solid-end", `${progress}%`);
      }
    };

    const setSeekPreview = (event: PointerEvent) => {
      if (!seek) return;
      const rect = seek.getBoundingClientRect();
      const max = Number(seek.max || 0);
      if (!rect.width || max <= 0) return;

      const hoverProgress = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const currentProgress = Math.max(0, Math.min(100, ((Number(seek.value || 0) || 0) / max) * 100));
      const previewStart = Math.min(currentProgress, hoverProgress);
      const previewEnd = Math.max(currentProgress, hoverProgress);

      seek.classList.add("is-previewing");
      seek.style.setProperty("--media-player-range-solid-end", `${previewStart}%`);
      seek.style.setProperty("--media-player-range-preview-start", `${previewStart}%`);
      seek.style.setProperty("--media-player-range-preview-end", `${previewEnd}%`);
    };

    const clearSeekPreview = () => {
      if (!seek) return;
      seek.classList.remove("is-previewing");
      const duration = Number.isFinite(media.duration) ? media.duration : 0;
      setRangeProgress(seek, Number(seek.value || 0), duration);
    };

    const syncSeek = () => {
      if (!seek || isSeeking) return;
      const duration = Number.isFinite(media.duration) ? media.duration : 0;
      const currentTime = media.currentTime || 0;

      seek.max = String(duration || 0);
      seek.value = String(currentTime);
      setRangeProgress(seek, currentTime, duration);
    };

    const syncWaveform = () => {
      if (!waveform?.__muiWaveformPeaks) return;
      const duration = Number.isFinite(media.duration) ? media.duration : 0;
      const progress = duration > 0 ? Math.max(0, Math.min(1, (media.currentTime || 0) / duration)) : 0;
      waveform.dataset.progress = String(progress);
      this.drawWaveform(waveform, waveform.__muiWaveformPeaks, progress);
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
      const fullLabel = this.countdownMode
        ? `-${this.formatTime(remaining)} / ${this.formatTime(duration)}`
        : `${this.formatTime(media.currentTime)} / ${this.formatTime(duration)}`;
      const compactLabel = media.paused || media.ended ? this.formatTime(duration) : `-${this.formatTime(remaining)}`;
      const fullTimeLabel = timeToggle.querySelector(".time-label-full");
      const compactTimeLabel = timeToggle.querySelector(".time-label-compact");

      if (fullTimeLabel) fullTimeLabel.textContent = fullLabel;
      if (compactTimeLabel) compactTimeLabel.textContent = compactLabel;
      timeToggle.setAttribute("aria-label", `Toggle time display, ${fullLabel}`);
      timeToggle.setAttribute("aria-pressed", String(this.countdownMode));
    };

    const tick = () => {
      syncSeek();
      syncTime();
      syncWaveform();
      if (!media.paused && !media.ended) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const startTick = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(tick);
    };

    const clearControlsReveal = () => {
      window.clearTimeout(controlsRevealTimer);
      window.clearTimeout(touchRevealTimer);
      controlsRevealTimer = 0;
      touchRevealTimer = 0;
      frame?.classList.remove("is-controls-revealing", "is-controls-ready");
    };

    const scheduleControlsReveal = (force = false) => {
      if (!usesHoverOverlayControls || !frame) return;
      if (
        !force &&
        (frame.classList.contains("is-controls-ready") || frame.classList.contains("is-controls-revealing"))
      )
        return;

      window.clearTimeout(controlsRevealTimer);
      frame.classList.remove("is-controls-ready");
      frame.classList.add("is-controls-revealing");
      controlsRevealTimer = window.setTimeout(() => {
        frame.classList.remove("is-controls-revealing");
        frame.classList.add("is-controls-ready");
      }, 300);
    };

    const scheduleTouchControlsReveal = () => {
      scheduleControlsReveal(true);
      window.clearTimeout(touchRevealTimer);
      touchRevealTimer = window.setTimeout(() => {
        clearControlsReveal();
      }, 3200);
    };

    const showPlayFeedback = (nextPaused: boolean) => {
      if (!frame) return;
      if (frame.classList.contains("has-center-play")) return;

      window.clearTimeout(playFeedbackTimer);
      if (centerPlay) {
        centerPlay.innerHTML = this.getControlIcon(nextPaused ? "pause" : "play");
      }
      frame.classList.add("show-play-feedback");
      playFeedbackTimer = window.setTimeout(() => {
        frame.classList.remove("show-play-feedback");
        syncPlayState(media.paused, true);
      }, 650);
    };

    const shouldUseVideoInactivity = () => frame && isVideo && !media.paused && !media.ended;

    const clearVideoInactivity = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = 0;
      frame?.classList.remove("is-video-inactive");
    };

    const scheduleVideoInactivity = () => {
      clearVideoInactivity();
      if (!shouldUseVideoInactivity()) return;

      inactivityTimer = window.setTimeout(() => {
        if (shouldUseVideoInactivity() && !isOptionsMenuOpen) {
          clearControlsReveal();
          frame?.classList.add("is-video-inactive");
        }
      }, 1600);
    };

    const isPointerNearBottomEdge = (event: PointerEvent) => {
      if (!frame) return false;
      const distanceFromBottom = frame.getBoundingClientRect().bottom - event.clientY;
      return distanceFromBottom >= 0 && distanceFromBottom <= 24;
    };

    const handleOverlayPointerMove = (event: Event) => {
      if (!(event instanceof PointerEvent) || !frame) return;
      if (event.pointerType === "touch") return;
      if (event.clientX === lastPointerX && event.clientY === lastPointerY) return;

      lastPointerX = event.clientX;
      lastPointerY = event.clientY;

      const isPointerInsideControls = Boolean(controls && event.composedPath().includes(controls));
      const isNearBottomEdge = isPointerNearBottomEdge(event);

      if (isNearBottomEdge || isPointerInsideControls) {
        scheduleControlsReveal(isVideo && frame.classList.contains("is-video-inactive"));
        if (isVideo) {
          scheduleVideoInactivity();
        }
        return;
      }

      if (!isOptionsMenuOpen) {
        clearControlsReveal();
      }
      if (isVideo) {
        scheduleVideoInactivity();
      }
    };

    const handleControlsPointerLeave = (event: Event) => {
      if (!(event instanceof PointerEvent) || event.pointerType === "touch") return;
      if (isPointerNearBottomEdge(event)) return;
      if (isOptionsMenuOpen) return;

      clearControlsReveal();
      blurActiveControl();
    };

    const handleFramePointerDown = (event: Event) => {
      if (!usesHoverOverlayControls) return;
      const path = event.composedPath();
      if (path.includes(controls as EventTarget)) return;
      if (controlsPeek && path.includes(controlsPeek)) return;
      if (centerPlay && path.includes(centerPlay)) return;
      if (
        path.some(
          (target) =>
            target instanceof HTMLElement &&
            (target.classList.contains("controls-hover-zone") ||
              target.classList.contains("audio-visual-copy") ||
              target.classList.contains("media-visual-copy")),
        )
      ) {
        return;
      }

      const nextPaused = !media.paused;
      handlePlayClick();
      blurActiveControl();
      clearControlsReveal();
      if (isVideo) {
        showPlayFeedback(nextPaused);
      }
      if (isVideo) {
        scheduleVideoInactivity();
      }
    };

    const syncPlayState = (paused: boolean, force = false) => {
      playBtns.forEach((button) => {
        button.setAttribute("aria-label", paused ? "Play media" : "Pause media");
        button.setAttribute("aria-pressed", String(!paused));
      });
      frame?.classList.toggle("is-playing", !paused);
      frame?.classList.toggle("is-paused", paused);
      if (playBtns.length && (force || paused !== lastPaused)) {
        inlinePlayBtns.forEach((button) => {
          button.innerHTML = this.getControlIcon(paused ? "play" : "pause");
        });
        if (playHint) {
          playHint.textContent = paused ? "Play" : "Pause";
        }
        lastPaused = paused;
      }
    };

    const canUseStandardPictureInPicture = () =>
      Boolean(
        videoMedia &&
        "pictureInPictureEnabled" in document &&
        document.pictureInPictureEnabled &&
        "requestPictureInPicture" in videoMedia,
      );

    const canUseWebKitPictureInPicture = () =>
      Boolean(
        videoMedia?.webkitSupportsPresentationMode?.("picture-in-picture") && videoMedia.webkitSetPresentationMode,
      );

    const isPictureInPictureActive = () =>
      Boolean(
        (videoMedia && document.pictureInPictureElement === videoMedia) ||
        videoMedia?.webkitPresentationMode === "picture-in-picture",
      );

    const canUseFullscreen = () =>
      Boolean(
        fullscreenFrame?.requestFullscreen ||
        fullscreenFrame?.webkitRequestFullscreen ||
        fullscreenFrame?.webkitRequestFullScreen ||
        videoMedia?.webkitSupportsFullscreen ||
        videoMedia?.webkitEnterFullscreen,
      );

    const isFullscreenActive = () =>
      Boolean(
        document.fullscreenElement === fullscreenFrame ||
        fullscreenDocument.webkitFullscreenElement === fullscreenFrame ||
        videoMedia?.webkitDisplayingFullscreen ||
        videoMedia?.webkitPresentationMode === "fullscreen",
      );

    const sync = () => {
      const paused = media.paused;
      syncPlayState(paused);
      if (muteBtn && media.muted !== lastMuted) {
        muteBtn.setAttribute("aria-label", media.muted ? "Unmute media" : "Mute media");
        lastMuted = media.muted;
      }
      syncVolumeIcon();
      if (pipBtn) {
        const canPictureInPicture = canUseWebKitPictureInPicture() || canUseStandardPictureInPicture();
        if (canPictureInPicture) {
          pipControl?.removeAttribute("hidden");
          pipBtn.removeAttribute("disabled");
          pipBtn.setAttribute("aria-pressed", String(isPictureInPictureActive()));
        } else {
          pipControl?.setAttribute("hidden", "");
          pipBtn.setAttribute("disabled", "");
          pipBtn.setAttribute("aria-pressed", "false");
        }
      }
      if (fullscreenBtn && frame) {
        if (canUseFullscreen()) {
          fullscreenBtn.removeAttribute("disabled");
          fullscreenBtn.setAttribute("aria-pressed", String(isFullscreenActive()));
        } else {
          fullscreenBtn.setAttribute("disabled", "");
          fullscreenBtn.setAttribute("aria-pressed", "false");
        }
      }
      syncSeek();
      syncVolume();
      syncTime();
      syncWaveform();
      if (!shouldUseVideoInactivity()) {
        clearVideoInactivity();
      }
    };

    const blurActiveControl = () => {
      const activeElement = this.shadowRoot?.activeElement as HTMLElement | null;
      if (activeElement && frame?.contains(activeElement)) {
        activeElement.blur();
      }
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

    on(frame, "pointerleave", (event) => {
      if (event instanceof PointerEvent && event.pointerType === "touch") return;
      clearControlsReveal();
      if (!usesHoverOverlayControls || media.paused) return;

      blurActiveControl();
    });
    on(frame, "pointerdown", handleFramePointerDown);
    on(frame, "pointermove", handleOverlayPointerMove);
    on(controls, "pointerleave", handleControlsPointerLeave);
    on(optionsMenu, "dropdown-toggle", (event) => {
      isOptionsMenuOpen = Boolean((event as CustomEvent<{ open: boolean }>).detail?.open);
      if (isOptionsMenuOpen) {
        scheduleControlsReveal(true);
        return;
      }
      if (isVideo) {
        scheduleVideoInactivity();
      }
    });
    on(controlsHoverZone, "pointerdown", (event) => {
      if (event instanceof PointerEvent && event.pointerType === "touch") {
        scheduleTouchControlsReveal();
        return;
      }
      scheduleControlsReveal(true);
    });
    on(controlsPeek, "pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event instanceof PointerEvent && event.pointerType === "touch") {
        scheduleTouchControlsReveal();
        return;
      }
      scheduleControlsReveal(true);
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
      syncWaveform();
    });
    on(seek, "pointermove", (event) => {
      if (event instanceof PointerEvent && event.pointerType !== "touch") {
        setSeekPreview(event);
      }
    });
    on(seek, "pointerleave", clearSeekPreview);
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
    const playForNativeMode = async () => {
      if (!videoMedia?.paused) return;
      await videoMedia.play();
      syncPlayState(false, true);
    };

    on(pipBtn, "click", async () => {
      if (!videoMedia) return;
      try {
        if (canUseWebKitPictureInPicture()) {
          const isWebKitPictureInPictureActive = videoMedia.webkitPresentationMode === "picture-in-picture";
          if (isWebKitPictureInPictureActive) {
            videoMedia.webkitSetPresentationMode?.("inline");
            sync();
            return;
          }
          await playForNativeMode();
          videoMedia.webkitSetPresentationMode?.("picture-in-picture");
        } else if (canUseStandardPictureInPicture()) {
          if (document.pictureInPictureElement === videoMedia) {
            await document.exitPictureInPicture();
          } else {
            await playForNativeMode();
            await videoMedia.requestPictureInPicture();
          }
        } else {
          return;
        }
      } catch {
        return;
      }
      sync();
    });
    on(fullscreenBtn, "click", async () => {
      if (!frame || !fullscreenFrame) return;
      try {
        if (document.fullscreenElement === fullscreenFrame) {
          await document.exitFullscreen();
        } else if (fullscreenDocument.webkitFullscreenElement === fullscreenFrame) {
          await fullscreenDocument.webkitExitFullscreen?.();
        } else if (videoMedia?.webkitDisplayingFullscreen && videoMedia.webkitExitFullscreen) {
          videoMedia.webkitExitFullscreen();
        } else if (fullscreenFrame.requestFullscreen) {
          await playForNativeMode();
          await fullscreenFrame.requestFullscreen();
        } else if (fullscreenFrame.webkitRequestFullscreen) {
          await playForNativeMode();
          await fullscreenFrame.webkitRequestFullscreen();
        } else if (fullscreenFrame.webkitRequestFullScreen) {
          await playForNativeMode();
          await fullscreenFrame.webkitRequestFullScreen();
        } else if (videoMedia?.webkitEnterFullscreen) {
          await playForNativeMode();
          videoMedia.webkitEnterFullscreen();
        } else {
          return;
        }
      } catch {
        return;
      }
      sync();
    });
    on(media, "timeupdate", sync);
    on(media, "loadedmetadata", sync);
    on(media, "loadeddata", sync);
    on(media, "canplay", sync);
    on(media, "volumechange", sync);
    on(media, "enterpictureinpicture", sync);
    on(media, "leavepictureinpicture", sync);
    on(media, "webkitbeginfullscreen", sync);
    on(media, "webkitendfullscreen", sync);
    on(media, "webkitpresentationmodechanged", sync);
    on(document, "fullscreenchange", () => {
      sync();
      scheduleVideoInactivity();
    });
    on(document, "webkitfullscreenchange", () => {
      sync();
      scheduleVideoInactivity();
    });
    on(media, "play", () => {
      sync();
      startTick();
      scheduleVideoInactivity();
    });
    on(media, "pause", () => {
      cancelAnimationFrame(animationFrame);
      clearVideoInactivity();
      sync();
    });
    on(media, "ended", () => {
      cancelAnimationFrame(animationFrame);
      clearVideoInactivity();
      sync();
    });
    this.cleanupControlBindings = () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(playFeedbackTimer);
      clearControlsReveal();
      clearVideoInactivity();
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
    const showCenterPlay = this.hasAttribute("center-play");
    const artwork = this.getAttribute("artwork") || "";
    const showWaveform = this.hasAttribute("waveform");
    const mediaTitle = this.getAttribute("media-title") || "";
    const height = this.getAttribute("height") || "";
    const audioHeightStyle = height ? ` style="--media-player-audio-height: ${height.replace(/"/g, "&quot;")}"` : "";
    const hasMetadataSlot = this.querySelector('[slot="metadata"]') !== null;
    const escapedMediaTitle = mediaTitle.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const renderMetaContent = (className = "") => {
      if (!mediaTitle && !hasMetadataSlot) return "";
      const visualCopyClass = [className, className === "audio" ? "audio-visual-copy" : "", "media-visual-copy"]
        .filter(Boolean)
        .join(" ");

      return `<div class="${visualCopyClass}">
            <slot name="metadata">
              ${mediaTitle ? `<mui-body size="small" weight="bold">${escapedMediaTitle}</mui-body>` : ""}
            </slot>
          </div>`;
    };
    const hasAudioPresentation =
      type === "audio" && renderPlayerControls && Boolean(artwork || mediaTitle || hasMetadataSlot || showWaveform);
    const audioVisualMarkup = hasAudioPresentation
      ? `<div class="audio-visual ${artwork ? "has-artwork" : ""} ${showWaveform ? "has-waveform" : ""}" part="audio-visual"${audioHeightStyle}>
            ${
              artwork
                ? `<img class="audio-artwork" src="${artwork.replace(/"/g, "&quot;")}" alt="" loading="lazy" />`
                : ""
            }
            ${showWaveform ? `<canvas class="audio-waveform" aria-hidden="true"></canvas>` : ""}
            ${renderMetaContent("audio")}
          </div>`
      : "";
    const videoMetaMarkup = type === "video" && (mediaTitle || hasMetadataSlot) ? renderMetaContent("video") : "";

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
                <video part="media" ${autoplay ? "autoplay" : ""} ${muted ? "muted" : ""} ${loop ? "loop" : ""} ${poster ? `poster="${poster.replace(/"/g, "&quot;")}"` : ""} preload="metadata" playsinline webkit-playsinline src="${escapedSrc}"></video>
                ${videoMetaMarkup}
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
          --media-player-range-solid-end: var(--media-player-range-progress);
          --media-player-range-preview-start: var(--media-player-range-progress);
          --media-player-range-preview-end: var(--media-player-range-progress);
          --media-player-range-thumb-size: 1.6rem;
          --media-player-range-track-height: 0.4rem;
          --media-player-waveform-color: color-mix(in srgb, var(--text-color) 46%, transparent);
          --media-player-waveform-mirror-color: color-mix(in srgb, var(--text-color) 24%, transparent);
          --media-player-waveform-active-color: var(--media-player-range-color);
          --media-player-waveform-active-mirror-color: color-mix(
            in srgb,
            var(--media-player-range-color) 42%,
            transparent
          );
          --dropdown-min-width: 16rem;
          --dropdown-offset: var(--space-100);
        }
        mui-hint[hidden] {
          display: none;
        }
        mui-button::part(border-radius) {
          border-radius: var(--radius-400);
        }
        .frame {
          width: 100%;
          display: grid;
          position: relative;
          --media-player-main-radius: 2rem;
        }
        .frame.custom-controls {
          border-radius: var(--media-player-main-radius);
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
          border-radius: var(--media-player-main-radius);
        }
        .video-frame.custom-controls,
        .video-frame.custom-controls .media-shell,
        .video-frame.custom-controls .controls,
        .audio-frame.custom-controls.has-artwork,
        .audio-frame.custom-controls.has-artwork .controls,
        .audio-visual.has-artwork {
          --text-color: var(--white);
          --text-color-optional: rgba(255, 255, 255, 0.72);
          --link-text-color-default: var(--white);
          --link-text-color-default-hover: var(--white);
          --link-text-color-default-focus: var(--white);
          --link-text-color-default-disabled: rgba(255, 255, 255, 0.48);
          --icon-color-default: var(--white);
          --icon-color-inverted: var(--white);
          --media-player-range-color: var(--media-player-dark-range-color);
          --media-player-range-thumb-color: var(--media-player-dark-range-thumb-color);
          --media-player-range-track-color: var(--media-player-dark-range-track-color);
          --media-player-range-preview-color: var(--white-opacity-50);
          --media-player-range-thumb-shadow: var(--media-player-dark-range-thumb-shadow);
          --media-player-waveform-color: rgba(255, 255, 255, 0.48);
          --media-player-waveform-mirror-color: rgba(255, 255, 255, 0.22);
          --media-player-waveform-active-color: var(--media-player-range-color);
          --media-player-waveform-active-mirror-color: color-mix(
            in srgb,
            var(--media-player-range-color) 42%,
            transparent
          );
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
          --hint-border-color: var(--white-opacity-30);
          --hint-shadow: 0 var(--space-100) var(--space-200) var(--black-opacity-30);
          --hint-text-color: var(--white);
        }
        .audio-frame.custom-controls {
          box-sizing: border-box;
          position: relative;
          border-radius: var(--media-player-main-radius);
          background: var(--surface-elevated-200);
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
          border-radius: var(--media-player-main-radius);
          box-shadow: var(--media-player-video-shadow);
        }
        .video-frame.custom-controls .media-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to top, var(--black-opacity-80) 0%, transparent 44%);
          opacity: 1;
          transition: opacity var(--speed-300) ease;
        }
        .video-frame.custom-controls.has-metadata .media-shell::after {
          background:
            linear-gradient(to bottom, var(--black-opacity-70) 0%, transparent 28%),
            linear-gradient(to top, var(--black-opacity-80) 0%, transparent 44%);
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
        .video-frame.custom-controls:hover .media-shell > video {
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
          z-index: 5;
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
        .audio-frame.custom-controls:not(.audio-player-only):not(.has-artwork) .controls {
          background: linear-gradient(
            180deg,
            transparent 0%,
            color-mix(in srgb, var(--media-player-surface-overlay-end) 72%, var(--grey-100) 28%) 50%,
            color-mix(in srgb, var(--media-player-surface-overlay-end) 62%, var(--grey-100) 38%) 100%
          );
        }
        :host-context(html[data-theme="dark"])
          .audio-frame.custom-controls:not(.audio-player-only):not(.has-artwork)
          .controls {
          background: linear-gradient(
            180deg,
            transparent 0%,
            color-mix(in srgb, var(--media-player-surface-overlay-end) 72%, var(--grey-1200) 28%) 50%,
            color-mix(in srgb, var(--media-player-surface-overlay-end) 62%, var(--grey-1200) 38%) 100%
          );
        }
        .video-frame.custom-controls .controls,
        .audio-frame.custom-controls.has-artwork .controls {
          background: linear-gradient(
            180deg,
            transparent 0%,
            var(--media-player-dark-overlay-controls-background, var(--media-player-dark-overlay-background)) 100%
          );
          color: var(--media-player-dark-control-color);
        }
        .controls-peek {
          display: none;
          position: absolute;
          z-index: 4;
          left: 50%;
          bottom: 0;
          width: 3.6rem;
          height: 2.4rem;
          border-radius: 999rem;
          opacity: 0.6;
          pointer-events: auto;
          transform: translateX(-50%);
          cursor: pointer;
          transition:
            opacity var(--speed-200) ease,
            transform var(--speed-200) ease;
        }
        .controls-peek::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 0.4rem;
          border-radius: inherit;
          background: var(--media-player-controls-peek-background);
          box-shadow: var(--media-player-controls-peek-shadow);
          transform: translateY(-50%);
        }
        .video-frame.custom-controls .controls-peek,
        .audio-frame.custom-controls:not(.audio-player-only) .controls-peek {
          display: block;
        }
        .audio-frame.custom-controls:not(.has-artwork):not(.audio-player-only) .controls-peek {
          --media-player-controls-peek-background: var(--media-player-audio-controls-peek-background);
          --media-player-controls-peek-shadow: var(--media-player-audio-controls-peek-shadow);
        }
        .frame.custom-controls:fullscreen .controls-peek,
        .video-frame.custom-controls.is-controls-revealing .controls-peek,
        .video-frame.custom-controls.is-controls-ready .controls-peek,
        .audio-frame.custom-controls:not(.audio-player-only).is-controls-revealing .controls-peek,
        .audio-frame.custom-controls:not(.audio-player-only).is-controls-ready .controls-peek,
        .frame.custom-controls .controls:focus-within + .controls-peek {
          opacity: 0;
          transform: translate(-50%, var(--space-050));
        }
        .video-frame.custom-controls.is-controls-revealing .controls,
        .video-frame.custom-controls.is-controls-ready .controls,
        .audio-frame.custom-controls:not(.audio-player-only).is-controls-revealing .controls,
        .audio-frame.custom-controls:not(.audio-player-only).is-controls-ready .controls,
        .frame.custom-controls .controls:focus-within {
          opacity: 1;
          transform: translateY(0);
        }
        .video-frame.custom-controls.is-controls-ready .controls,
        .audio-frame.custom-controls:not(.audio-player-only).is-controls-ready .controls,
        .frame.custom-controls .controls:focus-within {
          pointer-events: auto;
        }
        .video-frame.custom-controls.is-video-inactive {
          cursor: none;
        }
        .video-frame.custom-controls.is-video-inactive .controls {
          opacity: 0;
          transform: translateY(var(--space-300));
          pointer-events: none;
        }
        .video-frame.custom-controls.is-video-inactive .controls-peek {
          opacity: 0.6;
          transform: translateX(-50%);
        }
        .video-frame.custom-controls.is-video-inactive:fullscreen .controls-peek {
          opacity: 0;
          transform: translate(-50%, var(--space-050));
        }
        /* Bottom proximity trigger for audio presentation controls */
        .controls-hover-zone {
          display: none;
        }
        .audio-frame.custom-controls:not(.audio-player-only) .controls-hover-zone {
          display: block;
          position: absolute;
          z-index: 5;
          inset: auto var(--space-000) var(--space-000);
          height: 2.4rem;
          pointer-events: auto;
        }
        /* Center play feedback */
        .center-play {
          position: absolute;
          z-index: 4;
          inset: 50% auto auto 50%;
          display: grid;
          place-items: center;
          width: var(--action-size-large);
          height: var(--action-size-large);
          border-radius: 999rem;
          color: var(--media-player-dark-control-color);
          background: var(--media-player-center-play-background);
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0.92);
          transition:
            opacity var(--speed-300) ease,
            transform var(--speed-300) ease;
        }
        .video-frame.custom-controls .center-play,
        .audio-frame.custom-controls.has-artwork .center-play {
          background: var(--media-player-dark-overlay-background);
        }
        .video-frame.custom-controls .center-play {
          width: 6rem;
          height: 6rem;
        }
        .video-frame.custom-controls .center-play mui-icon-play-fill,
        .video-frame.custom-controls .center-play mui-icon-pause-fill,
        .video-frame.custom-controls .center-play mui-icon-pause {
          width: 4rem;
          height: 4rem;
        }
        .video-frame.custom-controls.has-center-play .center-play {
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, -50%) scale(1);
        }
        .video-frame.custom-controls.has-center-play.is-playing .center-play {
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0.92);
        }
        .video-frame.custom-controls.has-center-play.is-controls-revealing .center-play,
        .video-frame.custom-controls.has-center-play.is-controls-ready .center-play {
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0.92);
        }
        .audio-frame.custom-controls .center-play::part(background) {
          background: var(--media-player-center-play-background);
          border-radius: 100%;
        }
        .audio-frame.custom-controls.has-artwork .center-play::part(background) {
          background: var(--media-player-dark-overlay-background);
        }
        .audio-frame.custom-controls .center-play {
          width: var(--action-size-medium);
          height: var(--action-size-medium);
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, -50%) scale(1);
        }
        .audio-frame.custom-controls.is-playing .center-play {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.92);
          pointer-events: none;
        }
        .audio-frame.custom-controls.is-controls-revealing .center-play,
        .audio-frame.custom-controls.is-controls-ready .center-play {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.92);
          pointer-events: none;
        }
        .frame.custom-controls.show-play-feedback .center-play {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
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
        }
        .video-frame.custom-controls .controls-row.action-row {
          margin-block-end: var(--space-050);
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
          display: grid;
          grid-template-rows: auto auto;
          gap: var(--space-075);
          align-items: stretch;
          padding-block: var(--space-100);
          color: var(--media-player-control-color);
          background: var(--media-player-control-background);
          box-shadow: none;
        }
        .audio-frame.custom-controls.audio-player-only .compact-scrub-row {
          width: 100%;
          padding-inline: var(--space-300);
          padding-block-start: var(--space-100);
          padding-block-end: var(--space-000);
        }
        .audio-frame.custom-controls.audio-player-only .compact-action-row {
          width: 100%;
          justify-content: space-between;
          padding-inline-start: var(--space-050);
          padding-inline-end: var(--space-000);
        }
        /* Audio metadata and artwork presentation */
        .audio-visual {
          display: flex;
          align-items: flex-start;
          min-height: 11.6rem;
          height: var(--media-player-audio-height, 11.6rem);
          gap: var(--space-300);
          padding: var(--space-400);
          background:
            linear-gradient(135deg, var(--media-player-surface-overlay-end), transparent 52%),
            var(--surface-elevated-100);
          position: relative;
          border-radius: var(--media-player-main-radius);
        }
        .audio-visual.has-artwork {
          align-items: flex-start;
          color: var(--media-player-dark-control-color);
          background: var(--media-player-dark-background);
          overflow: hidden;
        }
        .audio-frame.custom-controls.has-artwork,
        .audio-frame.custom-controls.has-artwork .controls {
          overflow: hidden;
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
          z-index: 1;
          background: linear-gradient(to top, var(--black-opacity-80) 0%, transparent 44%);
          opacity: 1;
        }
        .audio-frame.custom-controls.has-artwork.has-metadata .audio-visual::after {
          background:
            linear-gradient(to bottom, var(--black-opacity-70) 0%, transparent 28%),
            linear-gradient(to top, var(--black-opacity-80) 0%, transparent 44%);
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
          z-index: 0;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 0;
          box-shadow: none;
          transform: scale(1);
          transition:
            filter var(--speed-300) ease,
            transform var(--speed-300) ease;
        }
        .audio-waveform {
          position: absolute;
          z-index: 1;
          inset: auto var(--space-400) var(--space-600);
          width: calc(100% - (var(--space-400) * 2));
          height: 5.6rem;
          opacity: 1;
          pointer-events: none;
          bottom: calc(var(--space-500) + var(--stroke-size-300));
        }
        .audio-visual.has-artwork .audio-waveform {
          z-index: 3;
          opacity: 1;
          filter: drop-shadow(0 var(--stroke-size-100) var(--stroke-size-100) var(--black-opacity-90));
          --media-player-waveform-color: var(--white-opacity-50);
          --media-player-waveform-mirror-color: var(--white-opacity-30);
          --media-player-waveform-active-color: var(--white);
          --media-player-waveform-active-mirror-color: var(--white-opacity-60);
        }
        .audio-visual.has-waveform:not(.has-artwork) {
          --media-player-audio-height: 14rem;
          --media-player-waveform-color: color-mix(in srgb, var(--text-color) 40%, transparent);
          --media-player-waveform-mirror-color: color-mix(in srgb, var(--text-color) 20%, transparent);
          --media-player-waveform-active-color: var(--media-player-range-color);
          --media-player-waveform-active-mirror-color: color-mix(
            in srgb,
            var(--media-player-range-color) 40%,
            transparent
          );
        }
        .audio-visual.has-waveform:not(.has-artwork) .audio-waveform {
          opacity: 0.85;
        }
        .audio-frame.has-artwork:hover .audio-visual.has-artwork .audio-artwork,
        .audio-frame.has-artwork.is-controls-revealing .audio-visual.has-artwork .audio-artwork,
        .audio-frame.has-artwork.is-controls-ready .audio-visual.has-artwork .audio-artwork {
          filter: saturate(1.08) brightness(1.03);
          transform: scale(1.025);
        }
        .audio-visual-copy,
        .media-visual-copy {
          appearance: none;
          border: 0;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          min-width: 0;
          box-sizing: border-box;
          width: 100%;
          padding: var(--space-400);
          pointer-events: none;
          color: inherit;
          font: inherit;
          text-align: left;
          opacity: 1;
          visibility: visible;
          transition:
            opacity var(--speed-200) ease,
            visibility var(--speed-200) ease;
        }
        .audio-visual.has-artwork .audio-visual-copy,
        .audio-visual.has-artwork .media-visual-copy {
          z-index: 2;
        }
        .audio-visual:not(.has-artwork) .audio-visual-copy {
          background: linear-gradient(180deg, var(--media-player-surface-overlay-start), transparent);
        }
        .audio-visual.has-artwork .audio-visual-copy,
        .audio-visual.has-artwork .media-visual-copy,
        .video-frame.custom-controls .media-visual-copy {
          background: linear-gradient(180deg, var(--media-player-dark-overlay-background) 60%, transparent);
          text-shadow: 0 var(--stroke-size-100) 0 var(--media-player-dark-overlay-background);
          padding-block-end: calc(var(--space-800) * 2);
        }
        .video-frame.custom-controls.is-playing .media-visual-copy {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        slot[name="metadata"] {
          display: flex;
          align-items: center;
          gap: var(--space-300);
          width: 100%;
          max-width: 100%;
          pointer-events: auto;
          --action-avatar-border: var(--border-thin);
          --action-avatar-shadow: none;
          --text-color-optional: var(--text-color);
          --text-font-size-m: var(--text-font-size-s);
          --text-line-height-m: var(--text-line-height-s);
        }
        slot[name="metadata"]::slotted(*) {
          max-width: 100%;
        }
        slot[name="metadata"]::slotted(mui-avatar) {
          border: var(--border-thin);
          box-shadow: none;
        }
        slot[name="metadata"]::slotted(mui-button) {
          --action-avatar-border: var(--border-thin);
          --action-avatar-shadow: none;
        }
        .audio-visual.has-artwork slot[name="metadata"]::slotted(mui-avatar),
        .video-frame.custom-controls slot[name="metadata"]::slotted(mui-avatar) {
          border: var(--media-player-dark-thumbnail-border);
          box-shadow: var(--media-player-dark-thumbnail-shadow);
        }
        .audio-visual.has-artwork slot[name="metadata"],
        .video-frame.custom-controls slot[name="metadata"],
        .audio-visual.has-artwork slot[name="metadata"]::slotted(*),
        .video-frame.custom-controls slot[name="metadata"]::slotted(*),
        .audio-visual.has-artwork slot[name="metadata"]::slotted(mui-button),
        .video-frame.custom-controls slot[name="metadata"]::slotted(mui-button),
        .audio-visual.has-artwork slot[name="metadata"]::slotted(mui-link),
        .video-frame.custom-controls slot[name="metadata"]::slotted(mui-link) {
          --action-avatar-border: var(--media-player-dark-thumbnail-border);
          --action-avatar-shadow: var(--media-player-dark-thumbnail-shadow);
          --text-color: var(--white);
          --text-color-optional: var(--white);
          --link-text-color-default: var(--white);
          --link-text-color-default-hover: var(--white);
          --link-text-color-default-focus: var(--white);
          --link-text-color-default-disabled: rgba(255, 255, 255, 0.48);
        }
        .audio-visual.has-artwork slot[name="metadata"]::slotted(*),
        .video-frame.custom-controls slot[name="metadata"]::slotted(*) {
          color: var(--white);
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
          transition: filter var(--speed-200) ease;
          width: 100%;
        }
        .video-frame.custom-controls .range {
          margin-block-end: var(--space-050);
        }
        .video-frame.custom-controls .volume {
          margin-block-end: var(--space-000);
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
              var(--media-player-range-color, var(--white)) var(--media-player-range-solid-end),
              var(--media-player-range-preview-color, var(--white-opacity-50)) var(--media-player-range-preview-start),
              var(--media-player-range-preview-color, var(--white-opacity-50)) var(--media-player-range-preview-end),
              var(--media-player-range-track-color, var(--white-opacity-30)) var(--media-player-range-preview-end),
              var(--media-player-range-track-color, var(--white-opacity-30)) 100%
            );
        }
        .range::-moz-range-track {
          height: var(--media-player-range-track-height);
          border: 0;
          border-radius: 999rem;
          background:
            linear-gradient(
              to right,
              var(--media-player-range-track-color, var(--white-opacity-30)) 0%,
              var(--media-player-range-track-color, var(--white-opacity-30)) var(--media-player-range-preview-start),
              var(--media-player-range-preview-color, var(--white-opacity-50)) var(--media-player-range-preview-start),
              var(--media-player-range-preview-color, var(--white-opacity-50)) var(--media-player-range-preview-end),
              var(--media-player-range-track-color, var(--white-opacity-30)) var(--media-player-range-preview-end),
              var(--media-player-range-track-color, var(--white-opacity-30)) 100%
            );
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
          font-variant-numeric: tabular-nums;
        }
        [data-action="time-mode"]::part(font-size) {
          font-variant-numeric: tabular-nums;
        }
        .time-label-compact {
          display: none;
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
        @container (max-width: 102.4rem) {
          .frame {
            --media-player-main-radius: 1.8rem;
          }
        }
        @container (max-width: 70rem) {
          .frame {
            --media-player-main-radius: 1.6rem;
          }

          .audio-visual-copy,
          .media-visual-copy {
            padding: var(--space-300) var(--space-400);
          }

        .audio-visual.has-artwork .audio-visual-copy,
        .audio-visual.has-artwork .media-visual-copy,
        .video-frame.custom-controls .media-visual-copy {
          background: linear-gradient(180deg, var(--media-player-dark-overlay-background) 50%, transparent);
          padding-block-end: calc(var(--space-800) * 2);
        }

        }
        @container (max-width: 52rem) {
          .frame {
            --media-player-main-radius: 1.2rem;
          }

          .volume,
          .video-only {
            display: none;
          }
          .audio-visual {
            gap: var(--space-200);
          }

          .audio-visual-copy, .media-visual-copy {
            padding: var(--space-300) var(--space-400);
          }

          .audio-artwork {
            width: 4.8rem;
            height: 4.8rem;
          }
        }
        @container (max-width: 42rem) {
          .frame {
            --media-player-main-radius: 1rem;
          }

          .controls-row {
            padding: var(--space-000) var(--space-000);
          }
          .controls-left {
            gap: var(--space-000);
          }
          .controls-right {
            gap: var(--space-000);
          }
          [data-action="pip"] {
            display: none;
          }
          .time-label-full {
            display: none;
          }
          .time-label-compact {
            display: inline;
          }
          .audio-frame.custom-controls.audio-player-only .controls {
            display: grid;
            grid-template-rows: auto auto;
            gap: var(--space-075);
            padding-block: var(--space-100);
          }
          .audio-frame.custom-controls.audio-player-only .compact-action-row {
            justify-content: space-between;
          }
        }

      </style>
      <div class="frame ${renderPlayerControls ? "custom-controls" : ""} ${showCenterPlay ? "has-center-play" : ""} ${type}-frame ${(type === "video" || type === "audio") && (mediaTitle || hasMetadataSlot) ? "has-metadata" : ""} ${type === "audio" && artwork ? "has-artwork" : ""} ${type === "audio" && renderPlayerControls && !hasAudioPresentation ? "audio-player-only" : ""}">
        ${mediaMarkup}
        ${renderPlayerControls ? this.renderPlayerControls(type as "video" | "audio", hasAudioPresentation, muted, escapedSrc, showCenterPlay) : ""}
      </div>
    `;
  }
}

if (!customElements.get("mui-media-player")) {
  customElements.define("mui-media-player", MuiMediaPlayer);
}
