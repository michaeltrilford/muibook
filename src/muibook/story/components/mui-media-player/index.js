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
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Media Player"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

    const stories = /*html*/ `
      <story-api-types tag="mui-media-player" title="Media Player"></story-api-types>

      <story-card canvas-bleed id="video" title="${storyMeta["video"].title}" description="${storyMeta["video"].description}" usage="${storyMeta["video"].usage}">
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

      <story-card canvas-bleed id="center-action" title="${storyMeta["center-action"].title}" description="${storyMeta["center-action"].description}" usage="${storyMeta["center-action"].usage}">
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

      <story-card canvas-bleed id="video-loading" title="${storyMeta["video-loading"].title}" description="${storyMeta["video-loading"].description}" usage="${storyMeta["video-loading"].usage}">
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

      <story-card canvas-bleed id="metadata" title="${storyMeta["metadata"].title}" description="${storyMeta["metadata"].description}" usage="${storyMeta["metadata"].usage}">
        <mui-media-player
          slot="body"
          type="video"
          poster="${videoPosterSrc}"
          src="${videoSrc}">
          <mui-avatar-chip
            slot="meta-before"
            href="#creator-profile"
            image="${profileAvatarSrc}"
            label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Sugoi Travels</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                77k subscribers
              </mui-link>
          </mui-avatar-chip>
          <mui-button slot="meta-after" variant="overlay" type="button">Subscribe</mui-button>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;poster="/video/japan-poster.jpg"<br />
          &nbsp;&nbsp;src="/video/japan.mp4"&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-avatar-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="meta-before"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;image="/images/mui/avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Sugoi Travels&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;77k subscribers<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-avatar-chip&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-button slot="meta-after" variant="overlay" type="button"&gt;Subscribe&lt;/mui-button&gt;<br /><br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-bleed id="audio" title="${storyMeta["audio"].title}" description="${storyMeta["audio"].description}" usage="${storyMeta["audio"].usage}">
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

      <story-card canvas-bleed id="audio-waveform" title="${storyMeta["audio-waveform"].title}" description="${storyMeta["audio-waveform"].description}" usage="${storyMeta["audio-waveform"].usage}">
        <mui-media-player
          slot="body"
          type="audio"
          waveform
          src="${audioSrc}">
          <mui-avatar-chip
            slot="meta-before"
            href="#creator-profile"
            image="${profileAvatarSrc}"
            label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Twilight</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                by Michael Trilford
              </mui-link>
          </mui-avatar-chip>
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;waveform<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-avatar-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="meta-before"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;image="/images/mui/avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by Michael Trilford<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-avatar-chip&gt;<br /><br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-bleed id="audio-artwork" title="${storyMeta["audio-artwork"].title}" description="${storyMeta["audio-artwork"].description}" usage="${storyMeta["audio-artwork"].usage}">
        <mui-media-player
          slot="body"
          type="audio"
          artwork="${audioArtworkSrc}"
          height="14rem"
          src="${audioSrc}">
          <mui-avatar-chip
            slot="meta-before"
            href="#creator-profile"
            image="${profileAvatarSrc}"
            label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Twilight</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                by Michael Trilford
              </mui-link>
          </mui-avatar-chip>

        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork.png"<br />
          &nbsp;&nbsp;height="14rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-avatar-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="meta-before"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;image="/images/mui/avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by Michael Trilford<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-avatar-chip&gt;<br /><br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-bleed id="audio-artwork-waveform" title="${storyMeta["audio-artwork-waveform"].title}" description="${storyMeta["audio-artwork-waveform"].description}" usage="${storyMeta["audio-artwork-waveform"].usage}">
        <mui-media-player
          slot="body"
          type="audio"
          artwork="${audioArtworkLightSrc}"
          waveform
          height="14rem"
          src="${audioSrc}">
          <mui-avatar-chip
            slot="meta-before"
            href="#creator-profile"
            image="${profileAvatarSrc}"
            label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Twilight</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                by Michael Trilford
              </mui-link>
          </mui-avatar-chip>
          <mui-button slot="meta-after" variant="overlay" type="button">Buy now</mui-button>

        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;artwork="/audio/artwork-light.png"<br />
          &nbsp;&nbsp;waveform<br />
          &nbsp;&nbsp;height="14rem"<br />
          &nbsp;&nbsp;src="/audio/twilight.m4a"&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-avatar-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot="meta-before"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;image="/images/mui/avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by Michael Trilford<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-avatar-chip&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-button slot="meta-after" variant="overlay" type="button"&gt;Buy now&lt;/mui-button&gt;<br /><br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card canvas-bleed id="youtube-embed" title="${storyMeta["youtube-embed"].title}" description="${storyMeta["youtube-embed"].description}" usage="${storyMeta["youtube-embed"].usage}">
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

      <story-card canvas-bleed id="soundcloud-embed" title="${storyMeta["soundcloud-embed"].title}" description="${storyMeta["soundcloud-embed"].description}" usage="${storyMeta["soundcloud-embed"].usage}">
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
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-media-player", StoryMediaPlayer);
