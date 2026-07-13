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
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Video Thumbnail"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]));

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

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
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

      <story-card id="play-affordance" title="${storyMeta["play-affordance"].title}" description="${storyMeta["play-affordance"].description}" usage="${storyMeta["play-affordance"].usage}">
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

      <story-card id="linked-card" title="${storyMeta["linked-card"].title}" description="${storyMeta["linked-card"].description}" usage="${storyMeta["linked-card"].usage}">
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

      <story-card id="button-card" title="${storyMeta["button-card"].title}" description="${storyMeta["button-card"].description}" usage="${storyMeta["button-card"].usage}">
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

      <story-card id="token-border" title="${storyMeta["token-border"].title}" description="${storyMeta["token-border"].description}" usage="${storyMeta["token-border"].usage}">
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

      <story-card id="custom-ratio" title="${storyMeta["custom-ratio"].title}" description="${storyMeta["custom-ratio"].description}" usage="${storyMeta["custom-ratio"].usage}">
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
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-video-thumbnail", StoryVideoThumbnail);
