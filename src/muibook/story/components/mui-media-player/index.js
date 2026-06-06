import { getComponentDocs } from "../../../utils/story-data";

const videoSrc = new URL("../../../video/japan.mp4", import.meta.url).href;
const videoPosterSrc = new URL("../../../video/japan-poster.jpg", import.meta.url).href;
const audioSrc = new URL("../../../audio/twilight.m4a", import.meta.url).href;
const profileAvatarSrc = new URL("../../../images/mui/avatar-mike.jpg", import.meta.url).href;
const audioArtworkSrc = new URL("../../../audio/artwork.png", import.meta.url).href;
const audioArtworkLightSrc = new URL("../../../audio/artwork-light.png", import.meta.url).href;

class StoryMediaPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("MediaPlayer");

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
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="center-action"
        title="Center Action"
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
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="video-loading"
        title="Video Loading"
        description="Direct video file rendered with the centered loading affordance forced on."
        usage="Use loading when an externally managed media load needs visible feedback.|||This story forces the state so spinner size, placement, and contrast can be inspected without waiting for real buffering.|||Remove loading for normal playback; the player still shows the affordance automatically during native buffering events.">
        <mui-media-player
          slot="body"
          type="video"
          loading
          poster="${videoPosterSrc}">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;loading<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="metadata"
        title="Metadata"
        description="Direct video file rendered with metadata and a responsive subscribe action."
        usage="Use this pattern when the media identity and a supporting commercial or creator action need to share the top metadata area.|||Use mui-profile-chip in slot='meta-before' for reusable avatar and profile copy composition.|||Use slot='meta-after' for the action so the space between remains available for media playback interaction.|||Use overlay action styling when the action sits over video or artwork.">
        <mui-media-player
          slot="body"
          type="video"
          poster="${videoPosterSrc}"
          src="${videoSrc}">
          <mui-profile-chip
            slot="meta-before"
            href="#creator-profile"
            image="${profileAvatarSrc}"
            label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Sugoi Travels</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                77k subscribers
              </mui-link>
          </mui-profile-chip>
          <mui-button slot="meta-after" variant="overlay" type="button">Subscribe</mui-button>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-profile-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="meta-before"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;image="/images/mui/avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Sugoi Travels&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;77k subscribers<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-profile-chip&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-button slot="meta-after" variant="overlay" type="button"&gt;Subscribe&lt;/mui-button&gt;<br /><br />
          &lt;/mui-media-player&gt;
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
          src="${audioSrc}">
          <mui-profile-chip
            slot="meta-before"
            href="#creator-profile"
            image="${profileAvatarSrc}"
            label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Twilight</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                by Michael Trilford
              </mui-link>
          </mui-profile-chip>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;waveform<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-profile-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="meta-before"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;image="/images/mui/avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by Michael Trilford<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-profile-chip&gt;<br /><br />
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
          height="14rem"
          src="${audioSrc}">
          <mui-profile-chip
            slot="meta-before"
            href="#creator-profile"
            image="${profileAvatarSrc}"
            label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Twilight</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                by Michael Trilford
              </mui-link>
          </mui-profile-chip>

        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;height="14rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-profile-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="meta-before"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;image="/images/mui/avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by Michael Trilford<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-profile-chip&gt;<br /><br />
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
          height="14rem"
          src="${audioSrc}">
          <mui-profile-chip
            slot="meta-before"
            href="#creator-profile"
            image="${profileAvatarSrc}"
            label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Twilight</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                by Michael Trilford
              </mui-link>
          </mui-profile-chip>
          <mui-button slot="meta-after" variant="overlay" type="button">Buy now</mui-button>

        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork-light.png"<br />
          &nbsp;&nbsp;waveform<br />
          &nbsp;&nbsp;height="14rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-profile-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="meta-before"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;image="/images/mui/avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by Michael Trilford<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-profile-chip&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-button slot="meta-after" variant="overlay" type="button"&gt;Buy now&lt;/mui-button&gt;<br /><br />
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
      
        imports='@muibook/components/mui-media-player'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="video::Video|||center-action::Center Action|||video-loading::Video Loading|||metadata::Metadata|||audio::Audio|||audio-waveform::Audio Waveform|||audio-artwork::Audio Artwork|||audio-artwork-waveform::Audio Artwork Waveform|||youtube::YouTube Embed|||soundcloud::SoundCloud Embed"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-media-player", StoryMediaPlayer);
