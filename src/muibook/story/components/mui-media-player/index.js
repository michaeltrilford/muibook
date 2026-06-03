import { getComponentDocs } from "../../../utils/story-data";

const videoSrc = new URL("../../../video/japan-small.mp4", import.meta.url).href;
const videoPosterSrc = new URL("../../../video/japan-poster.jpg", import.meta.url).href;
const audioSrc = new URL("../../../audio/twilight.m4a", import.meta.url).href;
const audioThumbnailSrc = new URL("../../../audio/thumbnail.jpg", import.meta.url).href;
const audioArtworkSrc = new URL("../../../audio/artwork.png", import.meta.url).href;
const audioArtworkLightSrc = new URL("../../../audio/artwork-light.png", import.meta.url).href;

class StoryMediaPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("MediaPlayer");

    const renderProfileChip = ({
      primary,
      secondary,
      avatarImage = audioThumbnailSrc,
      avatarLabel = "Mike Trilford",
    }) => {
      const avatarImageAttribute = avatarImage ? ` image="${avatarImage}"` : "";
      const renderRow = (slot, avatarSize) => /*html*/ `
        <mui-h-stack slot="${slot}" space="var(--space-200)" aligny="center">
          <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
            <mui-avatar size="${avatarSize}"${avatarImageAttribute} label="${avatarLabel}"></mui-avatar>
          </mui-button>
          <mui-v-stack space="var(--space-000)">
            <mui-body weight="bold">${primary}</mui-body>
            <mui-body weight="medium">${secondary}</mui-body>
          </mui-v-stack>
        </mui-h-stack>
      `;

      return /*html*/ `
        <mui-responsive slot="metadata" breakpoint="700">
          ${renderRow("showAbove", "medium")}
          ${renderRow("showBelow", "small")}
        </mui-responsive>
      `;
    };

    const renderProfileChipCode = ({
      primary,
      secondary,
      avatarImage = "/audio/thumbnail.jpg",
      avatarLabel = "Mike Trilford",
    }) => {
      const avatarImageAttribute = avatarImage ? ` image="${avatarImage}"` : "";
      const renderRow = (slot, avatarSize) => /*html*/ `
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="${slot}" space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="${avatarSize}"${avatarImageAttribute} label="${avatarLabel}"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;${primary}&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;${secondary}&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />`;

      return /*html*/ `
          &nbsp;&nbsp;&lt;mui-responsive slot="metadata" breakpoint="700"&gt;<br />
          ${renderRow("showAbove", "medium")}
          ${renderRow("showBelow", "small")}
          &nbsp;&nbsp;&lt;/mui-responsive&gt;<br />`;
    };

    const renderProfileChipHelperCode = () => /*html*/ `
          const renderProfileChip = ({ primary, secondary, avatarImage, avatarLabel }) =&gt; {<br />
          &nbsp;&nbsp;const avatarImageAttribute = avatarImage ? \` image="&#36;{avatarImage}"\` : "";<br />
          &nbsp;&nbsp;const renderRow = (slot, avatarSize) =&gt; /*html*/ &#96;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="&#36;{slot}" space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open &#36;{avatarLabel} profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="&#36;{avatarSize}"&#36;{avatarImageAttribute} label="&#36;{avatarLabel}"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;&#36;{primary}&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;&#36;{secondary}&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;&#96;;<br />
          <br />
          &nbsp;&nbsp;return /*html*/ &#96;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-responsive slot="metadata" breakpoint="700"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{renderRow("showAbove", "medium")}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{renderRow("showBelow", "small")}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-responsive&gt;&#96;;<br />
          };<br /><br />`;

    const renderMetaLinks = ({ title, author }) => /*html*/ `
      <mui-h-stack slot="metadata" space="var(--space-200)" aligny="center">
        <mui-link href="#video-metadata" aria-label="Open ${author} profile">
          <mui-avatar size="medium" image="${audioThumbnailSrc}" label="${author}"></mui-avatar>
        </mui-link>
        <mui-v-stack space="var(--space-000)">
          <mui-body weight="bold">${title}</mui-body>
          <mui-h-stack space="var(--space-100)" aligny="center">
            <mui-link href="#video-metadata">${author}</mui-link>
          </mui-h-stack>
        </mui-v-stack>
      </mui-h-stack>
    `;

    const renderSubscribeAction = ({ label = "Subscribe", href = "#subscribe" }) => /*html*/ `
      <mui-responsive breakpoint="700" style="padding-inline-end: var(--space-200)">
        <mui-link slot="showAbove" href="${href}" variant="overlay" size="small">
          <mui-avatar slot="before" size="x-small" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>${label}
        </mui-link>
        <mui-link slot="showBelow" href="${href}" variant="overlay" size="x-small">${label}</mui-link>
      </mui-responsive>
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-media-player" title="Media Player"></story-api-types>

      <story-card
        canvas-bleed
        id="video"
        title="Video"
        description="Direct video file rendered with the native video element and Muibook controls."
        usage="Use Muibook controls when the player needs to match the product visual language.|||The native video element remains the playback engine underneath the UI.|||Use poster for iOS Safari so the preview has a stable image before playback.|||Picture-in-Picture only appears when the browser reports support; iPhone may hide it when the current video or browser context does not support it.|||Fullscreen may start playback first on iPhone because native video fullscreen must be triggered from the media element.">
        <mui-media-player
          slot="body"
          type="video"
          poster="${videoPosterSrc}"
          src="${videoSrc}">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan-small.mp4"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="video-center-play"
        title="Visible Play/Pause"
        description="Direct video file rendered with an always-visible centered play/pause action."
        usage="Use center-play when the preview needs an obvious primary playback action before the user explores the bottom controls.|||The centered action toggles between play and pause while the native video element remains the playback engine underneath the UI.">
        <mui-media-player
          slot="body"
          type="video"
          center-play
          poster="${videoPosterSrc}"
          src="${videoSrc}">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;center-play<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan-small.mp4"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="video-metadata"
        title="Video Metadata"
        description="Direct video file rendered with optional top-left metadata."
        usage="Compose avatar, title, and supporting metadata inside slot='metadata' when video needs context over the preview.|||The avatar can be wrapped in a tertiary button or link when it should open a profile, dialog, or related destination.|||Keep the metadata action scoped to the composed item so interacting with it does not accidentally start playback.">
        <mui-media-player
          slot="body"
          type="video"
          poster="${videoPosterSrc}"
          src="${videoSrc}">
          ${renderProfileChip({
            primary: "Japan",
            secondary: "Mike Trilford",
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderProfileChipHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan-small.mp4"&gt;<br />
          &nbsp;&nbsp;&#36;{renderProfileChip({<br />
          &nbsp;&nbsp;&nbsp;&nbsp;primary: "Japan",<br />
          &nbsp;&nbsp;&nbsp;&nbsp;secondary: "Mike Trilford",<br />
          &nbsp;&nbsp;&nbsp;&nbsp;avatarImage: "/audio/thumbnail.jpg",<br />
          &nbsp;&nbsp;&nbsp;&nbsp;avatarLabel: "Mike Trilford",<br />
          &nbsp;&nbsp;})}<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="metadata-links"
        title="Metadata Links"
        description="Direct video file rendered with metadata composed from navigational links."
        usage="Use this pattern when metadata should navigate to related media, creators, chapters, or collections.|||Keep links as links when the destination is navigational instead of a local action.|||Group primary and secondary destinations so the overlay feels authored rather than a row of unrelated links.">
        <mui-media-player
          slot="body"
          type="video"
          poster="${videoPosterSrc}"
          src="${videoSrc}">
          ${renderMetaLinks({ title: "Garden Walk", author: "Mike Trilford" })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          const renderMetaLinks = ({ title, author }) =&gt; /*html*/ &#96;...&#96;;<br />
          <br />
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan-small.mp4"&gt;<br />
          &nbsp;&nbsp;&#36;{renderMetaLinks({ title: "Garden Walk", author: "Mike Trilford" })}<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="metadata-subscribe"
        title="Metadata Subscribe"
        description="Direct video file rendered with metadata and a responsive subscribe action."
        usage="Use this pattern when the media identity and a supporting commercial or creator action need to share the top metadata area.|||Keep the action inside slot='metadata' so it remains part of the same authored layout.|||Use overlay action styling when the action sits over video or artwork.">
        <mui-media-player
          slot="body"
          type="video"
          poster="${videoPosterSrc}"
          src="${videoSrc}">
          <mui-h-stack slot="metadata" aligny="center" alignx="space-between" width="100%">
            <mui-h-stack space="var(--space-200)" aligny="center">
              <mui-avatar size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
              <mui-v-stack space="var(--space-000)">
                <mui-body weight="bold">Sugoi Travels</mui-body>
                <mui-body weight="medium">77k subscribers</mui-body>
              </mui-v-stack>
            </mui-h-stack>
            ${renderSubscribeAction({ label: "Subscribe" })}
          </mui-h-stack>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          const renderSubscribeAction = ({ label }) =&gt; /*html*/ &#96;...&#96;;<br />
          <br />
          &lt;mui-h-stack slot="metadata" aligny="center" alignx="space-between" width="100%"&gt;<br />
          &nbsp;&nbsp;&lt;!-- media identity --&gt;<br />
          &nbsp;&nbsp;&#36;{renderSubscribeAction({ label: "Subscribe" })}<br />
          &lt;/mui-h-stack&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
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
        canvas-bleed
        id="audio-waveform"
        title="Audio Waveform"
        description="Direct audio file rendered with an opt-in generated waveform."
        usage="Use waveform when audio needs a visual signature without adding artwork.|||The waveform is generated from the audio source when the browser can fetch and decode the file.|||Remote audio can fail to render a waveform when CORS blocks decoding, so keep the player usable without it.">
        <mui-media-player
          slot="body"
          type="audio"
          waveform
          height="14rem"
          src="${audioSrc}">
          ${renderProfileChip({
            primary: "Twilight",
            secondary: "by Mike Trilford",
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderProfileChipHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;waveform<br />
          &nbsp;&nbsp;height="14rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          ${renderProfileChipCode({
            primary: "Twilight",
            secondary: "by Mike Trilford",
            avatarImage: "",
          })}
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
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
          ${renderProfileChip({
            primary: "Twilight",
            secondary: "by Mike Trilford",
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderProfileChipHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;height="18rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          ${renderProfileChipCode({
            primary: "Twilight",
            secondary: "by Mike Trilford",
          })}
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="audio-artwork-waveform"
        title="Audio Artwork Waveform"
        description="Direct audio file rendered with artwork and an opt-in generated waveform."
        usage="Use waveform with artwork when the audio needs both an image-led presentation and a visible sense of sound structure.|||The active waveform colour follows the same range colour as the player controls, while inactive bars stay quieter over the artwork.|||Keep this opt-in because waveform generation depends on the browser being able to fetch and decode the audio source.">
        <mui-media-player
          slot="body"
          type="audio"
          artwork="${audioArtworkLightSrc}"
          waveform
          height="18rem"
          src="${audioSrc}">
          ${renderProfileChip({
            primary: "Twilight",
            secondary: "by Mike Trilford",
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderProfileChipHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;waveform<br />
          &nbsp;&nbsp;height="18rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          ${renderProfileChipCode({
            primary: "Twilight",
            secondary: "by Mike Trilford",
          })}
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="audio-artwork-action"
        title="Audio Artwork Action"
        description="Direct audio file rendered with artwork and a secondary overlay action."
        usage="Compose secondary actions inside slot='metadata' when artwork-backed audio needs a badge, product action, or sponsored placement.|||Use variant='overlay' on image-backed audio because the action is placed over artwork.|||Keep the metadata and action in one authored stack so responsive layout stays predictable.">
        <mui-media-player
          slot="body"
          type="audio"
          artwork="${audioArtworkSrc}"
          height="18rem"
          src="${audioSrc}">
          <mui-h-stack slot="metadata" aligny="center" alignx="space-between" width="100%">
            <mui-h-stack space="var(--space-200)" aligny="center">
              <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
                <mui-avatar size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
              </mui-button>
              <mui-v-stack space="var(--space-000)">
                <mui-body weight="bold" truncate>Twilight</mui-body>
                <mui-body weight="medium" truncate>by Mike Trilford</mui-body>
              </mui-v-stack>
            </mui-h-stack>
            <mui-link href="#buy-album" variant="overlay" size="small" style="padding-inline-end: var(--space-200)">Buy Album</mui-link>
          </mui-h-stack>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;height="18rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="metadata" aligny="center" alignx="space-between" width="100%"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="medium" image="/audio/thumbnail.jpg" label="Mike Trilford"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;by Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link href="#buy-album" variant="overlay" size="small"&gt;Buy Album&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="audio-metadata"
        title="Audio Metadata"
        description="Direct audio file rendered with required title metadata and optional supporting metadata."
        usage="Compose audio title, supporting metadata, and secondary actions inside slot='metadata' when audio needs context without background artwork.|||Use normal action hierarchy, such as variant='tertiary', for surface-based audio because the action is not sitting over image content.">
        <mui-media-player
          slot="body"
          type="audio"
          src="${audioSrc}">
          <mui-h-stack slot="metadata" aligny="center" alignx="space-between" width="100%" space="0">
            <mui-h-stack space="var(--space-200)" aligny="center">
              <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
                <mui-avatar size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
              </mui-button>
              <mui-v-stack space="var(--space-000)">
                <mui-body weight="bold" truncate>Twilight</mui-body>
                <mui-body weight="medium" truncate>by Mike Trilford</mui-body>
              </mui-v-stack>
            </mui-h-stack>
            <mui-link href="#buy-album" variant="tertiary" size="small" style="padding-inline-end: var(--space-200)">Buy Album</mui-link>
          </mui-h-stack>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="metadata" aligny="center" alignx="space-between" width="100%"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="medium" image="/audio/thumbnail.jpg" label="Mike Trilford"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;by Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link href="#buy-album" variant="tertiary" size="small"&gt;Buy Album&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-bleed id="youtube" title="YouTube Embed" description="Auto-detected YouTube URL rendered as embed.">
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

      <story-card canvas-bleed id="soundcloud" title="SoundCloud Embed" description="Auto-detected SoundCloud URL rendered as embed.">
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
      <style>
      </style>
      <story-template
        title="${data?.title || "Media Player"}"
        description="${data?.description || "Media Player is a new exploration for the system and will iterate over time."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
      
        imports='["@muibook/components/mui-media-player", "@muibook/components/mui-responsive"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="video::Video|||video-center-play::Visible Play/Pause|||video-metadata::Video Metadata|||metadata-links::Metadata Links|||metadata-subscribe::Metadata Subscribe|||audio::Audio|||audio-waveform::Audio Waveform|||audio-artwork::Audio Artwork|||audio-artwork-waveform::Audio Artwork Waveform|||audio-artwork-action::Audio Artwork Action|||audio-metadata::Audio Metadata|||youtube::YouTube Embed|||soundcloud::SoundCloud Embed"
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
