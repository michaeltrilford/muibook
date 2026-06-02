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
        options: "player, thumbnail, none",
        default: "player",
        description:
          "Chooses the controls presentation. Player uses Muibook controls over the native media element; thumbnail opts audio into the richer thumbnail presentation.",
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
        name: "thumbnail",
        type: "string",
        options: "url",
        default: "",
        description: "Optional thumbnail image for audio thumbnail presentation.",
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
        description: "Required title for the audio metadata presentation.",
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
          controls="thumbnail"
          media-title="Twilight"
          thumbnail="${audioThumbnailSrc}"
          artwork="${audioArtworkSrc}"
          src="${audioSrc}">
          <mui-body slot="meta" size="small" variant="optional">Mike Trilford</mui-body>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;controls="thumbnail"<br />
          &nbsp;&nbsp;media-title="Twilight"<br />
          &nbsp;&nbsp;thumbnail="/audio/thumbnail.jpg"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.jpg"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="meta" size="small" variant="optional"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="audio-metadata"
        title="Audio Metadata"
        description="Direct audio file rendered with required title metadata and optional supporting metadata."
        usage="Use media-title when audio needs context without a thumbnail.|||Slot optional metadata into slot='meta'.">
        <mui-media-player
          slot="body"
          type="audio"
          media-title="Twilight"
          src="${audioSrc}">
          <mui-body slot="meta" size="small" variant="optional">Mike Trilford</mui-body>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;media-title="Twilight"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="meta" size="small" variant="optional"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="audio-thumbnail"
        title="Audio Thumbnail"
        description="Direct audio file rendered with a thumbnail replacing the basic metadata presentation."
        usage="Add a thumbnail when the audio needs a stronger visual presentation.|||The thumbnail fills the visual area while the native audio element remains the playback engine underneath the UI.">
        <mui-media-player
          slot="body"
          type="audio"
          controls="thumbnail"
          media-title="Twilight"
          thumbnail="${audioThumbnailSrc}"
          src="${audioSrc}">
          <mui-body slot="meta" size="small" variant="optional">Mike Trilford</mui-body>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;controls="thumbnail"<br />
          &nbsp;&nbsp;media-title="Twilight"<br />
          &nbsp;&nbsp;thumbnail="/audio/thumbnail.jpg"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="meta" size="small" variant="optional"&gt;Mike Trilford&lt;/mui-body&gt;<br />
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
          links="video::Video|||audio::Audio|||audio-metadata::Audio Metadata|||audio-thumbnail::Audio Thumbnail|||audio-artwork::Audio Artwork|||youtube::YouTube Embed|||soundcloud::SoundCloud Embed"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-media-player", StoryMediaPlayer);
