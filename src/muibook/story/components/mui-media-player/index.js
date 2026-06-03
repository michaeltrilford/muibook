import { getComponentDocs } from "../../../utils/story-data";

const videoSrc = new URL("../../../video/japan.mp4", import.meta.url).href;
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

    const renderMetadata = ({
      title,
      meta,
      compactMeta = meta,
      avatarImage = audioThumbnailSrc,
      avatarLabel = "Mike Trilford",
    }) => {
      const avatarImageAttribute = avatarImage ? ` image="${avatarImage}"` : "";
      const renderRow = (slot, avatarSize, metaContent) => /*html*/ `
        <mui-h-stack slot="${slot}" space="var(--space-200)" aligny="center">
          <mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile">
            <mui-avatar size="${avatarSize}"${avatarImageAttribute} label="${avatarLabel}"></mui-avatar>
          </mui-button>
          <mui-v-stack space="var(--space-000)">
            <mui-body weight="bold">${title}</mui-body>
            ${metaContent}
          </mui-v-stack>
        </mui-h-stack>
      `;

      return /*html*/ `
        <mui-responsive slot="metadata" breakpoint="700">
          ${renderRow("showAbove", "medium", meta)}
          ${renderRow("showBelow", "small", compactMeta)}
        </mui-responsive>
      `;
    };

    const renderMetadataCode = ({
      title,
      meta,
      compactMeta = meta,
      avatarImage = "/audio/thumbnail.jpg",
      avatarLabel = "Mike Trilford",
    }) => {
      const avatarImageAttribute = avatarImage ? ` image="${avatarImage}"` : "";
      const renderRow = (slot, avatarSize, metaContent) => /*html*/ `
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="${slot}" space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="${avatarSize}"${avatarImageAttribute} label="${avatarLabel}"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;${title}&lt;/mui-body&gt;<br />
          ${metaContent}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />`;

      return /*html*/ `
          &nbsp;&nbsp;&lt;mui-responsive slot="metadata" breakpoint="700"&gt;<br />
          ${renderRow("showAbove", "medium", meta)}
          ${renderRow("showBelow", "small", compactMeta)}
          &nbsp;&nbsp;&lt;/mui-responsive&gt;<br />`;
    };

    const renderMetadataHelperCode = () => /*html*/ `
          const renderMetadata = ({ title, meta, compactMeta = meta, avatarImage, avatarLabel }) =&gt; {<br />
          &nbsp;&nbsp;const avatarImageAttribute = avatarImage ? \` image="&#36;{avatarImage}"\` : "";<br />
          &nbsp;&nbsp;const renderRow = (slot, avatarSize, metaContent) =&gt; /*html*/ &#96;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="&#36;{slot}" space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open &#36;{avatarLabel} profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="&#36;{avatarSize}"&#36;{avatarImageAttribute} label="&#36;{avatarLabel}"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;&#36;{title}&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{metaContent}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;&#96;;<br />
          <br />
          &nbsp;&nbsp;return /*html*/ &#96;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-responsive slot="metadata" breakpoint="700"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{renderRow("showAbove", "medium", meta)}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{renderRow("showBelow", "small", compactMeta)}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-responsive&gt;&#96;;<br />
          };<br /><br />`;

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
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
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
          ${renderMetadata({
            title: "Japan",
            meta: `<mui-body weight="medium">Mike Trilford</mui-body>`,
            compactMeta: `<mui-body weight="medium">Sugoi</mui-body>`,
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderMetadataHelperCode()}
          const meta = &#96;&lt;mui-body weight="medium"&gt;Mike Trilford&lt;/mui-body&gt;&#96;;<br />
          const compactMeta = &#96;&lt;mui-body weight="medium"&gt;Sugoi&lt;/mui-body&gt;&#96;;<br />
          <br />
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &nbsp;&nbsp;&#36;{renderMetadata({<br />
          &nbsp;&nbsp;&nbsp;&nbsp;title: "Japan",<br />
          &nbsp;&nbsp;&nbsp;&nbsp;meta,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;compactMeta,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;avatarImage: "/audio/thumbnail.jpg",<br />
          &nbsp;&nbsp;&nbsp;&nbsp;avatarLabel: "Mike Trilford",<br />
          &nbsp;&nbsp;})}<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="video-auxiliary"
        title="Video Auxiliary"
        description="Direct video file rendered with a secondary overlay action."
        usage="Use slot='auxiliary' for top-right secondary content such as ads, badges, or supporting actions.|||Auxiliary actions are separate from metadata and do not toggle playback when interacted with.|||Use variant='overlay' when the action sits over video or artwork so it keeps enough contrast against image content.">
        <mui-media-player
          slot="body"
          type="video"
          poster="${videoPosterSrc}"
          src="${videoSrc}">
          <mui-button slot="auxiliary" variant="overlay" size="small">Sponsored</mui-button>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="auxiliary" variant="overlay" size="small"&gt;Sponsored&lt;/mui-button&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="metadata-button"
        title="Metadata Button"
        description="Direct video file rendered with the metadata slot composed as a tertiary button."
        usage="Use this pattern when the metadata itself should trigger an action, such as opening a profile or detail dialog.|||The button owns the interaction while the media player keeps playback interactions separate.|||Use the composed stack alignment to keep the metadata copy aligned to the start.|||Apply a small negative offset class when the button action padding needs to visually align with the overlay edge.">
        <mui-media-player
          slot="body"
          type="video"
          poster="${videoPosterSrc}"
          src="${videoSrc}">
          <mui-link slot="auxiliary" href="#aux-link" variant="overlay" size="small">Subscribe</mui-link>
          <mui-responsive slot="metadata" breakpoint="500">
            <mui-button class="metadata-button-offset" slot="showAbove" data-dialog="video-meta-profile" variant="tertiary" size="large" aria-label="Open Japan details">
              <mui-avatar slot="before" size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
              <mui-v-stack space="var(--space-000)" alignX="start">
                <mui-body weight="bold">Japan</mui-body>
                <mui-body weight="medium">Sugoi Travels</mui-body>
              </mui-v-stack>
            </mui-button>
            <mui-button class="metadata-button-offset" slot="showBelow" data-dialog="video-meta-profile" variant="tertiary" size="small" aria-label="Open Japan details">
              <mui-avatar slot="before" size="small" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
              <mui-v-stack space="var(--space-000)" alignX="start">
                <mui-body weight="bold">Japan</mui-body>
                <mui-body weight="medium">Sugoi Travels</mui-body>
              </mui-v-stack>
            </mui-button>
          </mui-responsive>
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
          .metadata-button-offset {<br />
          &nbsp;&nbsp;margin-block-start: calc(var(--space-200) * -1);<br />
          &nbsp;&nbsp;margin-inline-start: calc(var(--space-200) * -1);<br />
          }<br />
          @container (max-width: 52rem) {<br />
          &nbsp;&nbsp;.metadata-button-offset {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;margin-block-start: calc(var(--space-025) * -1);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;margin-inline-start: calc(var(--space-025) * -1);<br />
          &nbsp;&nbsp;}<br />
          }<br />
          <br />
          const renderMetadataButton = ({ title, meta, avatarImage, avatarLabel }) =&gt; {<br />
          &nbsp;&nbsp;const renderButton = (slot, buttonSize, avatarSize) =&gt; /*html*/ &#96;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button class="metadata-button-offset" slot="&#36;{slot}" data-dialog="video-meta-profile" variant="tertiary" size="&#36;{buttonSize}" aria-label="Open &#36;{title} details"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar slot="before" size="&#36;{avatarSize}" image="&#36;{avatarImage}" label="&#36;{avatarLabel}"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)" alignX="start"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;&#36;{title}&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{meta}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;&#96;;<br />
          <br />
          &nbsp;&nbsp;return /*html*/ &#96;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-responsive slot="metadata" breakpoint="500"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{renderButton("showAbove", "large", "medium")}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#36;{renderButton("showBelow", "small", "small")}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-responsive&gt;&#96;;<br />
          };<br />
          <br />
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link slot="auxiliary" href="#aux-link" variant="overlay" size="small"&gt;Subscribe&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&#36;{renderMetadataButton({<br />
          &nbsp;&nbsp;&nbsp;&nbsp;title: "Japan",<br />
          &nbsp;&nbsp;&nbsp;&nbsp;meta: &#96;&lt;mui-body weight="medium"&gt;Sugoi Travels&lt;/mui-body&gt;&#96;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;avatarImage: "/audio/thumbnail.jpg",<br />
          &nbsp;&nbsp;&nbsp;&nbsp;avatarLabel: "Mike Trilford",<br />
          &nbsp;&nbsp;})}<br />
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
          <mui-h-stack slot="metadata" space="var(--space-200)" aligny="center">
            <mui-link href="#metadata-button" aria-label="Open Mike Trilford profile">
              <mui-avatar size="medium" image="${audioThumbnailSrc}" label="Mike Trilford"></mui-avatar>
            </mui-link>
            <mui-v-stack space="var(--space-000)">
              <mui-body weight="bold">Garden Walk</mui-body>
              <mui-h-stack space="var(--space-100)" aligny="center">
                <mui-link href="#metadata-button">Mike Trilford</mui-link>
                <span>•</span>
                <mui-link href="#video-metadata">Field notes</mui-link>
              </mui-h-stack>
            </mui-v-stack>
          </mui-h-stack>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br />
          &nbsp;&nbsp;&lt;mui-h-stack slot="metadata" space="var(--space-200)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link href="#metadata-button" aria-label="Open Mike Trilford profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar size="medium" image="/audio/thumbnail.jpg" label="Mike Trilford"&gt;&lt;/mui-avatar&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-000)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="bold"&gt;Japan Garden Walk&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-150)" aligny="center"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link href="#metadata-button"&gt;Mike Trilford&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link href="#video-metadata"&gt;Field notes&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
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
          height="14rem"
          src="${audioSrc}">
          ${renderMetadata({
            title: "Twilight",
            meta: `<mui-body weight="medium">by Mike Trilford</mui-body>`,
            avatarImage: "",
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderMetadataHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;waveform<br />
          &nbsp;&nbsp;height="14rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          ${renderMetadataCode({
            title: "Twilight",
            meta: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;by Mike Trilford&lt;/mui-body&gt;<br />`,
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
          ${renderMetadata({
            title: "Twilight",
            meta: `<mui-body weight="medium">by Mike Trilford</mui-body>`,
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderMetadataHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;height="18rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          ${renderMetadataCode({
            title: "Twilight",
            meta: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;by Mike Trilford&lt;/mui-body&gt;<br />`,
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
          ${renderMetadata({
            title: "Twilight",
            meta: `<mui-body weight="medium">by Mike Trilford</mui-body>`,
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderMetadataHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;waveform<br />
          &nbsp;&nbsp;height="18rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          ${renderMetadataCode({
            title: "Twilight",
            meta: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;by Mike Trilford&lt;/mui-body&gt;<br />`,
          })}
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="audio-artwork-auxiliary"
        title="Audio Artwork Auxiliary"
        description="Direct audio file rendered with artwork and a secondary overlay action."
        usage="Use slot='auxiliary' when artwork-backed audio needs a secondary action, badge, or sponsored placement.|||Auxiliary content sits apart from metadata so the title area stays focused on media context.|||Use variant='overlay' on image-backed audio because the action is placed over artwork.">
        <mui-media-player
          slot="body"
          type="audio"
          artwork="${audioArtworkSrc}"
          height="18rem"
          src="${audioSrc}">
          <mui-link slot="auxiliary" href="#aux-link" variant="overlay" size="small">Buy Album</mui-link>
          ${renderMetadata({
            title: "Twilight",
            meta: `<mui-body weight="medium">by Mike Trilford</mui-body>`,
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderMetadataHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;height="18rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link slot="auxiliary" href="#aux-link" variant="overlay" size="small"&gt;Buy Album&lt;/mui-link&gt;<br />
          ${renderMetadataCode({
            title: "Twilight",
            meta: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;by Mike Trilford&lt;/mui-body&gt;<br />`,
          })}
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        canvas-bleed
        id="audio-metadata"
        title="Audio Metadata"
        description="Direct audio file rendered with required title metadata and optional supporting metadata."
        usage="Compose audio title and supporting metadata inside slot='metadata' when audio needs context without background artwork.|||Use normal action hierarchy, such as variant='tertiary', for auxiliary links on surface-based audio because the action is not sitting over image content.">
        <mui-media-player
          slot="body"
          type="audio"
          src="${audioSrc}">
          <mui-link slot="auxiliary" href="#aux-link" variant="tertiary" size="small">Buy Album</mui-link>
          ${renderMetadata({
            title: "Twilight",
            meta: `<mui-body weight="medium">by Mike Trilford</mui-body>`,
            avatarImage: "",
          })}
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          ${renderMetadataHelperCode()}
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link slot="auxiliary" href="#aux-link" variant="tertiary" size="small"&gt;Buy Album&lt;/mui-link&gt;<br />
          ${renderMetadataCode({
            title: "Twilight",
            meta: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body weight="medium"&gt;by Mike Trilford&lt;/mui-body&gt;<br />`,
            avatarImage: "",
          })}
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
        .metadata-button-offset {
          margin-block-start: calc(var(--space-200) * -1);
          margin-inline-start: calc(var(--space-200) * -1);
        }
        @container (max-width: 52rem) {
          .metadata-button-offset {
            margin-block-start: calc(var(--space-025) * -1);
            margin-inline-start: calc(var(--space-025) * -1);
          }
        }
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
          links="video::Video|||video-center-play::Visible Play/Pause|||video-metadata::Video Metadata|||video-auxiliary::Video Auxiliary|||metadata-button::Metadata Button|||metadata-links::Metadata Links|||audio::Audio|||audio-waveform::Audio Waveform|||audio-metadata::Audio Metadata|||audio-artwork::Audio Artwork|||audio-artwork-waveform::Audio Artwork Waveform|||audio-artwork-auxiliary::Audio Artwork Auxiliary|||youtube::YouTube Embed|||soundcloud::SoundCloud Embed"
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
