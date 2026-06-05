import { getComponentDocs } from "../../../utils/story-data";
import MaxAvatar from "../../../images/mui/avatar-max.png";
import JulieAvatar from "../../../images/mui/avatar-julie.png";
const audioArtworkLightSrc = new URL("../../../audio/artwork-light.png", import.meta.url).href;
const audioSrc = new URL("../../../audio/twilight.m4a", import.meta.url).href;

class StoryProfileChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("ProfileChip");

    const styles = /*css*/ `
      :host {
        display: block;
      }

      .canvas {
        background: var(--surface-elevated-100);
        padding: var(--space-600);
        margin: calc(var(--space-400) * -1);
      }

      .media-canvas {
        box-sizing: border-box;
        width: min(100%, 44rem);
        padding: var(--space-500);
        border-radius: var(--radius-400);
        background:
          linear-gradient(180deg, var(--black-opacity-70), transparent 62%),
          url(${MaxAvatar}) center / cover;
        color: var(--white);
      }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-profile-chip" title="Profile Chip"></story-api-types>

      <story-card
        id="default"
        title="Default"
        description="A compact profile identity row with initials fallback."
        usage="Use primary and secondary for simple profile text.|||When image is omitted, the internal avatar derives initials from label.">
        <div slot="body" class="canvas">
          <mui-profile-chip
            label="Sugoi Travels">
            <mui-body slot="primary" weight="bold">Sugoi Travels</mui-body>
            <mui-body slot="secondary" weight="medium" size="small">
              77k subscribers
            </mui-body>
          </mui-profile-chip>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-profile-chip<br />
          &nbsp;&nbsp;label="Sugoi Travels"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Sugoi Travels&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="secondary" weight="medium" size="small"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;77k subscribers<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-profile-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="image"
        title="Image"
        description="Profile identity row with an avatar image."
        usage="Use image when the identity benefits from a recognisable avatar.|||Keep label meaningful so the avatar remains accessible and initials can be generated if the image fails.">
        <div slot="body" class="canvas">
          <mui-profile-chip
            image="${MaxAvatar}"
            label="Max AI">
            <mui-body slot="primary" weight="bold">Max AI</mui-body>
            <mui-body slot="secondary" weight="medium" size="small">
              Product Designer
            </mui-body>
          </mui-profile-chip>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-profile-chip<br />
          &nbsp;&nbsp;image="avatar-max.png"<br />
          &nbsp;&nbsp;label="Max AI"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Max AI&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="secondary" weight="medium" size="small"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Product Designer<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-profile-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="linked-avatar"
        title="Linked Avatar"
        description="Profile identity row where the avatar opens the profile."
        usage="Use href when the avatar is the profile action.|||Keep the copy separate when the profile row also includes supporting links or counts.">
        <div slot="body" class="canvas">
          <mui-profile-chip
            image="${JulieAvatar}"
            label="Julie AI"
            href="#linked-avatar">
            <mui-body slot="primary" weight="bold">Julie AI</mui-body>
            <mui-body slot="secondary" weight="medium" size="small">
              Content Editor
            </mui-body>
          </mui-profile-chip>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-profile-chip<br />
          &nbsp;&nbsp;image="avatar-julie.png"<br />
          &nbsp;&nbsp;label="Julie AI"<br />
          &nbsp;&nbsp;href="#linked-avatar"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Julie AI&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="secondary" weight="medium" size="small"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Content Editor<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-profile-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="custom-secondary"
        title="Custom Secondary"
        description="Secondary content can be slotted when it needs richer composition."
        usage="Use slot='secondary' for links, badges, counts, or supporting icons.|||Use attributes for simple text so the component stays quick to author.">
        <div slot="body" class="canvas">
          <mui-profile-chip
            image="${MaxAvatar}"
            label="Max AI"
            href="#custom-secondary">
            <mui-body slot="primary" weight="bold">Sugoi Travels</mui-body>
            <mui-link slot="secondary" href="#custom-secondary" weight="medium" size="small">
              77k subscribers
              <mui-icon-right-chevron slot="after" size="x-small"></mui-icon-right-chevron>
            </mui-link>
          </mui-profile-chip>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-profile-chip<br />
          &nbsp;&nbsp;image="avatar-max.png"<br />
          &nbsp;&nbsp;label="Max AI"<br />
          &nbsp;&nbsp;href="#custom-secondary"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Sugoi Travels&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-link slot="secondary" href="#custom-secondary" weight="medium" size="small"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;77k subscribers<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-right-chevron slot="after" size="x-small"&gt;&lt;/mui-icon-right-chevron&gt;<br />
          &nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &lt;/mui-profile-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="media-player"
        title="Media Player Usage"
        description="Profile Chip can be slotted into Media Player metadata."
        usage="Slot Profile Chip into Media Player metadata when the player needs reusable avatar and profile copy composition.|||Media Player applies usage='media-player' automatically, so consumers do not need to set it by hand.">
        <mui-media-player
          slot="body"
          type="audio"
          artwork="${audioArtworkLightSrc}"
          waveform
          height="14rem"
          src="${audioSrc}">
            <mui-profile-chip
              slot="meta-before"
              image="${MaxAvatar}"
              label="Max AI"
              href="#media-player">
              <mui-body slot="primary" weight="bold">Twilight</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium" size="small">
                by Max AI
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
          &nbsp;&nbsp;&nbsp;&nbsp;image="avatar-max.png"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Max AI"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium" size="small"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by Max AI<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-profile-chip&gt;<br /><br />
          &lt;/mui-media-player&gt;

        </story-code-block>
      </story-card>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="${data?.title || "Profile Chip"}"
        description="${data?.description || "Profile Chip composes avatar and profile copy into a compact identity row."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-profile-chip"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Default|||image::Image|||linked-avatar::Linked Avatar|||custom-secondary::Custom Secondary|||media-player::Media Player Usage">
        </story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-profile-chip", StoryProfileChip);
