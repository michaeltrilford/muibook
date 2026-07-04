import { getComponentDocs } from "../../../utils/story-data";
import MuiVideoDark from "../../../images/muitube/mui-video-dark.png";
import SenseiVideoDark from "../../../images/muitube/sensei-video-dark.png";
import JalVideoDark from "../../../images/muitube/jal-video-dark.png";
import AnaVideoDark from "../../../images/muitube/ana-video-dark.png";
import PaperclipVideoDark from "../../../images/muitube/paperclip-video-dark.png";
import MuiVideoLight from "../../../images/muitube/mui-video-light.png";
import SenseiVideoLight from "../../../images/muitube/sensei-video-light.png";
import JalVideoLight from "../../../images/muitube/jal-video-light.png";
import AnaVideoLight from "../../../images/muitube/ana-video-light.png";
import PaperclipVideoLight from "../../../images/muitube/paperclip-video-light.png";

const themedThumbnailAttributes = `
  src="${MuiVideoLight}"
  src-light="${MuiVideoLight}"
  src-dark="${MuiVideoDark}"
  src-mui-light="${MuiVideoLight}"
  src-mui-dark="${MuiVideoDark}"
  src-jal-light="${JalVideoLight}"
  src-jal-dark="${JalVideoDark}"
  src-ana-light="${AnaVideoLight}"
  src-ana-dark="${AnaVideoDark}"
  src-sensei-light="${SenseiVideoLight}"
  src-sensei-dark="${SenseiVideoDark}"
  src-paperclip-light="${PaperclipVideoLight}"
  src-paperclip-dark="${PaperclipVideoDark}"
`;

class StoryVideoThumbnail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("VideoThumbnail");

    const styles = /*css*/ `
      :host {
        display: block;
      }

      .thumbnail-demo {
        width: min(100%, 54rem);
      }

      .border-demo {
        --video-thumbnail-border: var(--stroke-size-100) solid var(--border-color);
        --video-thumbnail-border-hover: var(--stroke-size-100) solid var(--outline-color);
        --video-thumbnail-box-shadow-hover: 0 var(--space-100) var(--space-300) var(--shadow-color-medium);
      }

      .card-demo {
        --video-thumbnail-card-hover-background: var(--surface-elevated-100);
        --video-thumbnail-card-hover-edge: var(--video-thumbnail-card-hover-edge-width, 0px);
        --video-thumbnail-card-hover-edge-color: var(--video-thumbnail-card-hover-edge-color-token, transparent);
      }

      .card-demo mui-link,
      .card-demo mui-button {
        width: min(100%, 36rem);
      }

      .card-demo mui-link::part(background),
      .card-demo mui-button::part(background) {
        padding: var(--space-000);
        border: none;
        border-top-left-radius: var(--radius-300);
        border-top-right-radius: var(--radius-300);
        border-bottom-left-radius: var(--radius-100);
        border-bottom-right-radius: var(--radius-100);
        outline-offset: var(--space-300);
        transition:
          background var(--speed-100),
          border-radius var(--speed-100),
          outline var(--speed-100),
          box-shadow var(--speed-100),
          transform var(--speed-100);
      }

      .card-demo mui-link::part(background):hover,
      .card-demo mui-link::part(background):focus-visible,
      .card-demo mui-button::part(background):hover,
      .card-demo mui-button::part(background):focus-visible {
        background: var(--video-thumbnail-card-hover-background);
        box-shadow:
          0 0 0 var(--space-400) var(--video-thumbnail-card-hover-background),
          0 0 0 calc(var(--space-400) + var(--video-thumbnail-card-hover-edge)) var(--video-thumbnail-card-hover-edge-color),
          0 var(--space-200) var(--space-400) var(--space-300) var(--shadow-color-medium);
      }

      .card-demo mui-link::part(background):focus-visible,
      .card-demo mui-button::part(background):focus-visible {
        outline: var(--outline-thick);
      }

      .card-content {
        padding-left: var(--space-100);
      }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-video-thumbnail" title="Video Thumbnail"></story-api-types>

      <story-card
        id="default"
        title="Default"
        description="A reusable video poster thumbnail with no icon or shade overlay by default."
        usage="Use Video Thumbnail when a card, list, or composition needs a consistent poster surface.|||Use src-light, src-dark, or src-{brand}-{theme} when artwork needs to follow the active theme or brand.|||The border is none by default so themes can opt into a framed treatment with tokens."
      >
        <div slot="body" class="thumbnail-demo">
          <mui-video-thumbnail ${themedThumbnailAttributes} alt="MuiTube video thumbnail"></mui-video-thumbnail>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-video-thumbnail<br />
          &nbsp;&nbsp;src="thumbnail-light.png"<br />
          &nbsp;&nbsp;src-light="thumbnail-light.png"<br />
          &nbsp;&nbsp;src-dark="thumbnail-dark.png"<br />
          &nbsp;&nbsp;src-paperclip-light="paperclip-video-light.png"<br />
          &nbsp;&nbsp;src-paperclip-dark="paperclip-video-dark.png"<br />
          &nbsp;&nbsp;alt="Video title"&gt;<br />
          &lt;/mui-video-thumbnail&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="play"
        title="Play Affordance"
        description="Use play and overlay when the thumbnail should expose a stronger video affordance."
        usage="Use play to reveal the centered video icon on hover.|||Use overlay to opt into the shade layer; it is transparent until tokens or hover state style it."
      >
        <div slot="body" class="thumbnail-demo">
          <mui-video-thumbnail play overlay ${themedThumbnailAttributes} alt="MuiTube video thumbnail with play affordance"></mui-video-thumbnail>
        </div>
        <story-code-block slot="footer" scrollable>
          .video-thumbnail {<br />
          &nbsp;&nbsp;--video-thumbnail-overlay-background-hover: var(--black-opacity-20);<br />
          &nbsp;&nbsp;--video-thumbnail-play-opacity-hover: 1;<br />
          &nbsp;&nbsp;--video-thumbnail-play-background-hover: var(--black-opacity-70);<br />
          }<br />
          <br />
          &lt;mui-video-thumbnail<br />
          &nbsp;&nbsp;play<br />
          &nbsp;&nbsp;overlay<br />
          &nbsp;&nbsp;src="thumbnail-light.png"<br />
          &nbsp;&nbsp;src-dark="thumbnail-dark.png"<br />
          &nbsp;&nbsp;alt="Video title"&gt;<br />
          &lt;/mui-video-thumbnail&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="composition"
        title="Linked Card"
        description="Compose the thumbnail inside a link or button surface and slot metadata into the thumbnail."
        usage="Keep interaction semantics on the outer control.|||When mui-link contains mui-video-thumbnail it receives has-video internally, which removes the default action chrome.|||Use the meta slot when the thumbnail and text should move as one composed media card."
      >
        <mui-v-stack slot="body" class="card-demo" width="100%" alignx="center" aligny="start" padding="var(--space-500)" space="var(--space-000)">
          <mui-link href="#">
            <mui-video-thumbnail play overlay ${themedThumbnailAttributes} alt="Urban Photography Tips">
              <mui-v-stack slot="meta" class="card-content" alignx="start" aligny="start" space="var(--space-025)" style="border-radius: var(--radius-000); width: 100%; --stack-height: auto; --stack-width: auto;">
                <mui-body size="large" variant="default" weight="bold">Urban Photography Tips</mui-body>
                <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%; --stack-height: auto; --stack-width: auto;">
                  <mui-body size="x-small" variant="default" weight="bold">LensMaster</mui-body>
                  <mui-body size="x-small" variant="default" weight="bold">120K views • 2 days ago</mui-body>
                </mui-v-stack>
              </mui-v-stack>
            </mui-video-thumbnail>
          </mui-link>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          .video-card mui-link::part(background) {<br />
          &nbsp;&nbsp;padding: var(--space-000);<br />
          &nbsp;&nbsp;border: none;<br />
          &nbsp;&nbsp;border-top-left-radius: var(--radius-300);<br />
          &nbsp;&nbsp;border-top-right-radius: var(--radius-300);<br />
          &nbsp;&nbsp;border-bottom-left-radius: var(--radius-100);<br />
          &nbsp;&nbsp;border-bottom-right-radius: var(--radius-100);<br />
          &nbsp;&nbsp;outline-offset: var(--video-thumbnail-action-focus-outline-offset, var(--space-300));<br />
          }<br />
          <br />
          .video-card mui-link::part(background):hover {<br />
          &nbsp;&nbsp;box-shadow:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;0 0 0 var(--space-400) var(--video-thumbnail-card-hover-background),<br />
          &nbsp;&nbsp;&nbsp;&nbsp;0 0 0 calc(var(--space-400) + var(--video-thumbnail-card-hover-edge-width, 0px)) var(--video-thumbnail-card-hover-edge-color, transparent);<br />
          }<br />
          <br />
          &lt;mui-v-stack class="video-card" alignx="center" padding="var(--space-500)"&gt;<br />
          &nbsp;&nbsp;&lt;mui-link href="#"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-video-thumbnail play overlay src="thumbnail-light.png" src-dark="thumbnail-dark.png" alt="Urban Photography Tips"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="meta" alignx="start" aligny="start" space="var(--space-025)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="large" variant="default" weight="bold"&gt;Urban Photography Tips&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="default" weight="bold"&gt;LensMaster&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="default" weight="bold"&gt;120K views • 2 days ago&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-video-thumbnail&gt;<br />
          &nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="button-card"
        title="Button Card"
        description="Use a button surface when the thumbnail card performs an in-page action."
        usage="Keep button semantics when the card triggers behaviour instead of navigating.|||When mui-button contains mui-video-thumbnail it receives has-video internally, which removes size and variant visual styling.|||The thumbnail remains the media surface, while the button owns the interaction."
      >
        <mui-v-stack slot="body" class="card-demo" width="100%" alignx="center" aligny="start" padding="var(--space-500)" space="var(--space-000)">
          <mui-button aria-label="Play Urban Photography Tips">
            <mui-video-thumbnail play overlay ${themedThumbnailAttributes} alt="Urban Photography Tips">
              <mui-v-stack slot="meta" class="card-content" alignx="start" aligny="start" space="var(--space-025)" style="border-radius: var(--radius-000); width: 100%; --stack-height: auto; --stack-width: auto;">
                <mui-body size="large" variant="default" weight="bold">Urban Photography Tips</mui-body>
                <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%; --stack-height: auto; --stack-width: auto;">
                  <mui-body size="x-small" variant="default" weight="bold">LensMaster</mui-body>
                  <mui-body size="x-small" variant="default" weight="bold">120K views • 2 days ago</mui-body>
                </mui-v-stack>
              </mui-v-stack>
            </mui-video-thumbnail>
          </mui-button>
        </mui-v-stack>
        <story-code-block slot="footer" scrollable>
          &lt;mui-v-stack class="video-card" alignx="center" padding="var(--space-500)"&gt;<br />
          &nbsp;&nbsp;&lt;mui-button aria-label="Play Urban Photography Tips"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-video-thumbnail play overlay src="thumbnail-light.png" src-dark="thumbnail-dark.png" alt="Urban Photography Tips"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack slot="meta" alignx="start" aligny="start" space="var(--space-025)"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="large" variant="default" weight="bold"&gt;Urban Photography Tips&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="default" weight="bold"&gt;LensMaster&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body size="x-small" variant="default" weight="bold"&gt;120K views • 2 days ago&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-video-thumbnail&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &lt;/mui-v-stack&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="border"
        title="Token Border"
        description="Use tokens to opt into a framed thumbnail treatment."
        usage="Use --video-thumbnail-border when the image frame itself needs a line.|||Use --video-thumbnail-box-shadow-hover when the hover ring should sit on the faux card surface instead of changing the image border."
      >
        <div slot="body" class="thumbnail-demo border-demo">
          <mui-video-thumbnail play overlay ${themedThumbnailAttributes} alt="MuiTube video thumbnail with border"></mui-video-thumbnail>
        </div>
        <story-code-block slot="footer" scrollable>
          .media-surface {<br />
          &nbsp;&nbsp;--video-thumbnail-border: var(--stroke-size-100) solid var(--border-color);<br />
          &nbsp;&nbsp;--video-thumbnail-border-hover: var(--stroke-size-100) solid var(--outline-color);<br />
          &nbsp;&nbsp;--video-thumbnail-box-shadow-hover: 0 var(--space-100) var(--space-300) var(--shadow-color-medium);<br />
          }<br />
          <br />
          &lt;mui-video-thumbnail play overlay src="thumbnail-light.png" src-dark="thumbnail-dark.png" alt="Video title"&gt;&lt;/mui-video-thumbnail&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="custom-ratio"
        title="Custom Ratio"
        description="Use aspect-ratio when the poster should match a different media format."
        usage="Use the aspect-ratio attribute for one-off layout changes.|||Use --video-thumbnail-aspect-ratio when a theme or page should adjust multiple thumbnails consistently."
      >
        <div slot="body" class="thumbnail-demo">
          <mui-video-thumbnail aspect-ratio="4 / 3" ${themedThumbnailAttributes} alt="Four by three video thumbnail"></mui-video-thumbnail>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-video-thumbnail<br />
          &nbsp;&nbsp;aspect-ratio="4 / 3"<br />
          &nbsp;&nbsp;src="thumbnail-light.png"<br />
          &nbsp;&nbsp;src-dark="thumbnail-dark.png"<br />
          &nbsp;&nbsp;alt="Video title"&gt;<br />
          &lt;/mui-video-thumbnail&gt;
        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data?.title || "Video Thumbnail"}"
        description="${data?.description || "A reusable video poster thumbnail with themeable hover, play affordance, and optional border tokens."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-video-thumbnail"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Default|||play::Play Affordance|||composition::Linked Card|||button-card::Button Card|||border::Token Border|||custom-ratio::Custom Ratio"
        ></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-video-thumbnail", StoryVideoThumbnail);
