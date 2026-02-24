import { getComponentDocs } from "../../../utils/story-data";

class StoryMediaPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("MediaPlayer");

    const propItems = [
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
      <spec-card title="Import">
        <mui-code slot="footer" size="small" scrollable>
          import "@muibook/components/mui-media-player";<br>
        </mui-code>
      </spec-card>

      <props-card title="Media Player">
        <story-type-table slot="body">
          ${rows}
        </story-type-table>
      </props-card>

      <story-card id="video-native" title="Native Video" description="Direct video file rendered with native controls.">
        <mui-media-player
          slot="body"
          type="video"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="video"<br />
          &nbsp;&nbsp;src="https://www.w3schools.com/html/mov_bbb.mp4"<br />
          &nbsp;&nbsp;poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&amp;fit=crop&amp;w=1200&amp;q=80"&gt;<br />
          &lt;/mui-media-player&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="audio-native"
        title="Native Audio"
        description="Direct audio file rendered with native controls."
        usage="Chrome currently does not support full theming for native media controls, so the seek bar can appear in light styling.|||Muibook defaults to native media controls for reliability and accessibility.|||If you need deeper visual customization, bring your own player UI.">
        <mui-media-player
          slot="body"
          type="audio"
          src="https://www.w3schools.com/html/horse.mp3">
        </mui-media-player>
        <story-code-block slot="footer" scrollable>
          &lt;mui-media-player<br />
          &nbsp;&nbsp;type="audio"<br />
          &nbsp;&nbsp;src="https://www.w3schools.com/html/horse.mp3"&gt;<br />
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
      >
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="video-native::Native Video|||audio-native::Native Audio|||youtube::YouTube Embed|||soundcloud::SoundCloud Embed"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-media-player", StoryMediaPlayer);
