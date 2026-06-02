import { getComponentDocs } from "../../../utils/story-data";

const videoSrc = new URL("../../../video/japan.mp4", import.meta.url).href;
const audioSrc = new URL("../../../audio/twilight.m4a", import.meta.url).href;
const audioThumbnailSrc = new URL("../../../audio/thumbnail.jpg", import.meta.url).href;
const audioArtworkSrc = new URL("../../../audio/artwork.png", import.meta.url).href;

class StoryMediaPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("MediaPlayer");

    const propItems = [
      {
        name: "controls",
        type: "string",
        options: "player, none",
        default: "player",
        description: "Chooses whether Muibook controls are rendered over the native media element.",
      },
      {
        name: "src",
        type: "string",
        options: "url",
        default: "",
        description: "Media source URL. Supports direct files and provider URLs.",
      },
      {
        name: "type",
        type: "string",
        options: "video, audio, youtube, soundcloud",
        default: "auto",
        description: "Optional override for media type; otherwise inferred from src.",
      },
      {
        name: "poster",
        type: "string",
        options: "url",
        default: "",
        description: "Poster image for native video.",
      },
      {
        name: "artwork",
        type: "string",
        options: "url",
        default: "",
        description: "Optional artwork image for audio artwork presentation.",
      },
      {
        name: "media-title",
        type: "string",
        options: "text",
        default: "",
        description: "Title displayed in audio presentations or video metadata.",
      },
      {
        name: "height",
        type: "string",
        options: "css height",
        default: "",
        description: "Sets the audio metadata or artwork presentation height and maps to --media-player-audio-height.",
      },
      {
        name: "center-play",
        type: "boolean",
        options: "",
        default: "false",
        description: "Displays an always-visible centered play/pause action over native video.",
      },
      {
        name: "autoplay",
        type: "boolean",
        options: "",
        default: "false",
        description: "Autoplays native media.",
      },
      {
        name: "muted",
        type: "boolean",
        options: "",
        default: "false",
        description: "Starts native media muted.",
      },
      {
        name: "loop",
        type: "boolean",
        options: "",
        default: "false",
        description: "Loops native media playback.",
      },
    ];

    const rows = propItems
      .map(
        (prop) => /*html*/ `
          <story-type-row
            name="${prop.name}"
            type="${prop.type}"
            options="${prop.options || ""}"
            default="${prop.default || ""}"
            description="${prop.description}">
          </story-type-row>
        `,
      )
      .join("");

    const stories = /*html*/ `
      <story-api-types tag="mui-media-player" title="Media Player"></story-api-types>

      <story-card
        id="video"
        title="Video"
        description="Direct video file rendered with the native video element and Muibook controls."
        usage="Use Muibook controls when the player needs to match the product visual language.|||The native video element remains the playback engine underneath the UI.">
        <mui-media-player
          slot="body"
          type="video"
          src="${videoSrc}">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="video-center-play"
        title="Visible Play/Pause"
        description="Direct video file rendered with an always-visible centered play/pause action."
        usage="Use center-play when the preview needs an obvious primary playback action before the user explores the bottom controls.|||The centered action toggles between play and pause while the native video element remains the playback engine underneath the UI.">
        <mui-media-player
          slot="body"
          type="video"
          center-play
          src="${videoSrc}">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;center-play<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="video-metadata"
        title="Video Metadata"
        description="Direct video file rendered with optional top-left metadata."
        usage="Compose avatar, title, and supporting metadata inside slot='metadata' when video needs context over the preview.|||Metadata is non-interactive by default so interacting with the composed content does not accidentally start playback.">
        <mui-media-player
          slot="body"
          type="video"
          src="${videoSrc}">
          <mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
            <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
              <mui-avatar size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
            </mui-button>
            <mui-v-stack space="var(--space-000)">
              <mui-body weight="bold">Japan</mui-body>
              <mui-body size="small" weight="medium" variant="optional">Mike Trilford</mui-body>
            </mui-v-stack>
          </mui-h-stack>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="medium" image="/audio/thumbnail.jpg" label="Mike Trilford"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Japan&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="medium" variant="optional"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="video-metadata-time"
        title="Video Metadata Duration"
        description="Direct video file rendered with composed title and duration metadata."
        usage="Compose title and duration together inside slot='metadata' instead of relying on generated metadata.|||Use this pattern when duration is part of the authored metadata content.">
        <mui-media-player
          slot="body"
          type="video"
          src="${videoSrc}">
          <mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
            <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
              <mui-avatar size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
            </mui-button>
            <mui-v-stack space="var(--space-000)">
              <mui-body weight="bold">Japan</mui-body>
              <mui-body size="small" variant="optional" weight="medium">2:47</mui-body>
            </mui-v-stack>
          </mui-h-stack>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="medium" image="/audio/thumbnail.jpg" label="Mike Trilford"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Japan&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" variant="optional" weight="medium"&gt;2:47&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="video-metadata-action"
        title="Video Metadata Action"
        description="Direct video file rendered with a composed metadata action."
        usage="Slot custom leading media when the metadata needs an avatar, link, or richer visual.|||Slotted metadata actions can open dialogs or navigate without toggling playback behind the metadata row.">
        <mui-media-player
          slot="body"
          type="video"
          src="${videoSrc}">
          <mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
            <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
              <mui-avatar size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
            </mui-button>
            <mui-v-stack space="var(--space-000)">
              <mui-body weight="bold">Japan</mui-body>
              <mui-body size="small" weight="medium" variant="optional">Mike Trilford</mui-body>
            </mui-v-stack>
          </mui-h-stack>
        </mui-media-player>
        <mui-dialog
          slot="body"
          data-dialog="video-meta-profile"
          width="400px"
          aria-labelledby="video-meta-profile-title"
          aria-describedby="video-meta-profile-desc">
          <mui-heading size="4" level="4" slot="title" id="video-meta-profile-title">Mike Trilford</mui-heading>
          <mui-body id="video-meta-profile-desc">Profile actions can be composed outside the media player while the metadata row hosts the trigger.</mui-body>
        </mui-dialog>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="medium" image="/audio/thumbnail.jpg" label="Mike Trilford"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Japan&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="medium" variant="optional"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-media-player&gt;<br /><br />
          &lt;mui-dialog<br />
          &nbsp;&nbsp;data-dialog="video-meta-profile"<br />
          &nbsp;&nbsp;width="400px"<br />
          &nbsp;&nbsp;aria-labelledby="video-meta-profile-title"<br />
          &nbsp;&nbsp;aria-describedby="video-meta-profile-desc"&gt;<br />
          &nbsp;&nbsp;&lt;mui-heading size="4" level="4" slot="title" id="video-meta-profile-title"&gt;Mike Trilford&lt;/mui-heading&gt;<br />
          &nbsp;&nbsp;&lt;mui-body id="video-meta-profile-desc"&gt;Profile actions can be composed outside the media player while the metadata row hosts the trigger.&lt;/mui-body&gt;<br />
          &lt;/mui-dialog&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="audio"
        title="Audio"
        description="Direct audio file rendered as a compact player."
        usage="Use this state when the player only needs playback controls.|||The native audio element remains the playback engine underneath the UI.">
        <mui-media-player
          slot="body"
          type="audio"
          src="${audioSrc}">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="audio-artwork"
        title="Audio Artwork"
        description="Direct audio file rendered with artwork replacing the basic metadata presentation."
        usage="Add artwork when the audio needs a stronger visual presentation.|||The artwork fills the visual area while the native audio element remains the playback engine underneath the UI.">
        <mui-media-player
          slot="body"
          type="audio"
          artwork="${audioArtworkSrc}"
          height="18rem"
          src="${audioSrc}">
          <mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
            <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
              <mui-avatar size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
            </mui-button>
            <mui-v-stack space="var(--space-000)">
              <mui-body weight="bold">Twilight</mui-body>
              <mui-body size="small" weight="medium" variant="optional">Mike Trilford</mui-body>
            </mui-v-stack>
          </mui-h-stack>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;height="18rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="medium" image="/audio/thumbnail.jpg" label="Mike Trilford"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" weight="medium" variant="optional"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="audio-metadata"
        title="Audio Metadata"
        description="Direct audio file rendered with required title metadata and optional supporting metadata."
        usage="Compose audio title and supporting metadata inside slot='metadata' when audio needs context without background artwork.">
        <mui-media-player
          slot="body"
          type="audio"
          src="${audioSrc}">
          <mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;">
            <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
              <mui-avatar size="medium" label="Mike Trilford"></mui-avatar>
            </mui-button>
            <mui-v-stack space="var(--space-000)">
              <mui-body weight="bold">Twilight</mui-body>
              <mui-body size="small" variant="optional">by Mike Trilford</mui-body>
            </mui-v-stack>
          </mui-h-stack>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="metadata" space="var(--space-200)" aligny="center" style="--stack-height: auto; --stack-width: auto;"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="medium" label="Mike Trilford"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="small" variant="optional"&gt;by Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card id="youtube" title="YouTube Embed" description="Auto-detected YouTube URL rendered as embed.">
        <mui-media-player
          slot="body"
          src="https://youtu.be/2HTtfmXkeZQ?si=uM5dXCf3fb2M_9YB">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;src="https://youtu.be/2HTtfmXkeZQ?si=uM5dXCf3fb2M_9YB"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card id="soundcloud" title="SoundCloud Embed" description="Auto-detected SoundCloud URL rendered as embed.">
        <mui-media-player
          slot="body"
          src="https://soundcloud.com/dustinlynch/ridin-roads?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;src="https://soundcloud.com/dustinlynch/ridin-roads?utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <story-template
        title="${data?.title || "Media Player"}"
        description="${data?.description || "Media Player is a new exploration for the system and will iterate over time."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      
        imports='["@muibook/components/mui-media-player"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="video::Video|||video-center-play::Visible Play/Pause|||video-metadata::Video Metadata|||video-metadata-time::Video Metadata Duration|||video-metadata-action::Video Metadata Action|||audio::Audio|||audio-metadata::Audio Metadata|||audio-artwork::Audio Artwork|||youtube::YouTube Embed|||soundcloud::SoundCloud Embed"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;

    this.shadowRoot.querySelectorAll("[data-dialog]").forEach((trigger) => {
      if (trigger.tagName.toLowerCase() === "mui-dialog") return;

      trigger.addEventListener("click", (event) => {
        const target = trigger.getAttribute("data-dialog");
        const dialog = this.shadowRoot.querySelector(`mui-dialog[data-dialog="${target}"]`);

        if (!dialog) return;

        event.preventDefault();
        dialog.setAttribute("open", "");
      });
    });
  }
}

customElements.define("story-media-player", StoryMediaPlayer);
