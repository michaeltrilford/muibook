import { getComponentDocs } from "../../../utils/story-data";
import MikeAvatar from "../../../images/mui/avatar-mike.jpg";
const audioArtworkLightSrc = new URL("../../../audio/artwork-light.png", import.meta.url).href;
const audioSrc = new URL("../../../audio/twilight.m4a", import.meta.url).href;

class StoryAvatarChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("AvatarChip");

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
          url(${MikeAvatar}) center / cover;
        color: var(--white);
      }

      .size-list {
        display: grid;
        width: max-content;
        max-width: 100%;
        gap: var(--space-300);
        margin-inline: auto;
        justify-items: center;
      }

      .dropdown-list {
        display: grid;
        width: max-content;
        max-width: 100%;
        gap: var(--space-300);
      }
    `;

    const stories = /*html*/ `
      <story-api-types tag="mui-avatar-chip" title="Avatar Chip"></story-api-types>

      <story-card
        id="default"
        title="Default"
        description="A compact profile identity row with initials fallback."
        usage="Use primary and secondary for simple profile text.|||When image is omitted, the internal avatar derives initials from label.">
        <div slot="body" class="canvas">
          <mui-avatar-chip
            label="Sugoi Travels">
            <mui-body slot="primary" weight="bold">Sugoi Travels</mui-body>
            <mui-body slot="secondary" weight="medium">
              77k subscribers
            </mui-body>
          </mui-avatar-chip>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-chip<br />
          &nbsp;&nbsp;label="Sugoi Travels"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Sugoi Travels&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="secondary" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;77k subscribers<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-avatar-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="image"
        title="Image"
        description="Profile identity row with an avatar image."
        usage="Use image when the identity benefits from a recognisable avatar.|||Keep label meaningful so the avatar remains accessible and initials can be generated if the image fails.">
        <div slot="body" class="canvas">
          <mui-avatar-chip
            image="${MikeAvatar}"
            label="Mike Trilford">
            <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
            <mui-body slot="secondary" weight="medium">
              Product Designer
            </mui-body>
          </mui-avatar-chip>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-chip<br />
          &nbsp;&nbsp;image="avatar-mike.jpg"<br />
          &nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="secondary" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Product Designer<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-avatar-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="dropdown"
        title="Dropdown"
        description="Avatar Chip can sit inside a dropdown trigger when an identity row opens account or profile actions."
        usage="Wrap Avatar Chip in the dropdown action when the visible trigger should carry avatar and profile copy.|||Keep dropdown behavior in the parent composition; Avatar Chip remains responsible for the identity layout only.|||Match the Avatar Chip size to the surrounding action size so the trigger density stays consistent.">
        <div slot="body" class="canvas">
          <div class="dropdown-list">
            <mui-dropdown>
              <mui-button slot="action" size="x-small">
                <mui-avatar-chip
                  image="${MikeAvatar}"
                  size="x-small"
                  label="Mike Trilford">
                  <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                  <mui-body slot="secondary" weight="medium">Product Designer</mui-body>
                </mui-avatar-chip>
              </mui-button>
              <mui-button size="x-small">Profile</mui-button>
              <mui-button size="x-small">Settings</mui-button>
              <mui-rule></mui-rule>
              <mui-button size="x-small">Log out</mui-button>
            </mui-dropdown>

            <mui-dropdown>
              <mui-button slot="action" size="small" variant="secondary">
                <mui-avatar-chip
                  image="${MikeAvatar}"
                  size="small"
                  label="Mike Trilford">
                  <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                  <mui-body slot="secondary" weight="medium">Product Designer</mui-body>
                </mui-avatar-chip>
              </mui-button>
              <mui-button size="small">Profile</mui-button>
              <mui-button size="small">Settings</mui-button>
              <mui-rule></mui-rule>
              <mui-button size="small">Log out</mui-button>
            </mui-dropdown>

            <mui-dropdown>
              <mui-button slot="action" size="medium" variant="secondary">
                <mui-avatar-chip
                  image="${MikeAvatar}"
                  size="medium"
                  label="Mike Trilford">
                  <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                  <mui-body slot="secondary" weight="medium">Product Designer</mui-body>
                </mui-avatar-chip>
              </mui-button>
              <mui-button size="medium">Profile</mui-button>
              <mui-button size="medium">Settings</mui-button>
              <mui-rule></mui-rule>
              <mui-button size="medium">Log out</mui-button>
            </mui-dropdown>

            <mui-dropdown>
              <mui-button slot="action" size="large" variant="secondary">
                <mui-avatar-chip
                  image="${MikeAvatar}"
                  size="large"
                  label="Mike Trilford">
                  <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                  <mui-body slot="secondary" weight="medium">Product Designer</mui-body>
                </mui-avatar-chip>
              </mui-button>
              <mui-button size="large">Profile</mui-button>
              <mui-button size="large">Settings</mui-button>
              <mui-rule></mui-rule>
              <mui-button size="large">Log out</mui-button>
            </mui-dropdown>
          </div>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown&gt;<br />
          &nbsp;&nbsp;&lt;mui-button slot="action" size="small" variant="secondary"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image="avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size="small"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="secondary" weight="medium"&gt;Product Designer&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-avatar-chip&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br /><br />
          &nbsp;&nbsp;&lt;mui-button size="small"&gt;Profile&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-button size="small"&gt;Settings&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-rule&gt;&lt;/mui-rule&gt;<br />
          &nbsp;&nbsp;&lt;mui-button size="small"&gt;Log out&lt;/mui-button&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="sizes"
        title="Sizes"
        description="Avatar Chip supports explicit sizing for different density needs."
        usage="Use size to scale the internal avatar, primary text, and secondary text together.|||Keep responsive behavior in the parent composition when the chip needs to change size across breakpoints.">
        <div slot="body" class="canvas">
          <div class="size-list">
            <mui-avatar-chip
              size="x-small"
              image="${MikeAvatar}"
              label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
              <mui-body slot="secondary" weight="medium">x-small</mui-body>
            </mui-avatar-chip>
            <mui-avatar-chip
              size="small"
              image="${MikeAvatar}"
              label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
              <mui-body slot="secondary" weight="medium">small</mui-body>
            </mui-avatar-chip>
            <mui-avatar-chip
              size="medium"
              image="${MikeAvatar}"
              label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
              <mui-body slot="secondary" weight="medium">medium</mui-body>
            </mui-avatar-chip>
            <mui-avatar-chip
              size="large"
              image="${MikeAvatar}"
              label="Mike Trilford">
              <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
              <mui-body slot="secondary" weight="medium">large</mui-body>
            </mui-avatar-chip>
          </div>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-chip<br />
          &nbsp;&nbsp;size="small"<br />
          &nbsp;&nbsp;image="avatar-mike.jpg"<br />
          &nbsp;&nbsp;label="Mike Trilford"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="secondary" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Product Designer<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-avatar-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="linked-avatar"
        title="Linked Avatar"
        description="Profile identity row where the avatar opens the profile."
        usage="Use href when the avatar is the profile action.|||Keep the copy separate when the profile row also includes supporting links or counts.">
        <div slot="body" class="canvas">
          <mui-avatar-chip
            image="${MikeAvatar}"
            label="Mike Trilford"
            href="#linked-avatar">
            <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
            <mui-body slot="secondary" weight="medium">
              Content Editor
            </mui-body>
          </mui-avatar-chip>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-chip<br />
          &nbsp;&nbsp;image="avatar-mike.jpg"<br />
          &nbsp;&nbsp;label="Mike Trilford"<br />
          &nbsp;&nbsp;href="#linked-avatar"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Mike Trilford&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="secondary" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Content Editor<br />
          &nbsp;&nbsp;&lt;/mui-body&gt;<br />
          &lt;/mui-avatar-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="custom-secondary"
        title="Custom Secondary"
        description="Secondary content can be slotted when it needs richer composition."
        usage="Use slot='secondary' for links, badges, counts, or supporting icons.|||Use attributes for simple text so the component stays quick to author.">
        <div slot="body" class="canvas">
          <mui-avatar-chip
            image="${MikeAvatar}"
            label="Mike Trilford"
            href="#custom-secondary">
            <mui-body slot="primary" weight="bold">Sugoi Travels</mui-body>
            <mui-link slot="secondary" href="#custom-secondary" weight="medium">
              77k subscribers
              <mui-icon-right-chevron slot="after" size="x-small"></mui-icon-right-chevron>
            </mui-link>
          </mui-avatar-chip>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-chip<br />
          &nbsp;&nbsp;image="avatar-mike.jpg"<br />
          &nbsp;&nbsp;label="Mike Trilford"<br />
          &nbsp;&nbsp;href="#custom-secondary"&gt;<br />
          &nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Sugoi Travels&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&lt;mui-link slot="secondary" href="#custom-secondary" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;77k subscribers<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-right-chevron slot="after" size="x-small"&gt;&lt;/mui-icon-right-chevron&gt;<br />
          &nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &lt;/mui-avatar-chip&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="media-player"
        title="Media Player Usage"
        description="Avatar Chip can be slotted into Media Player metadata."
        usage="Slot Avatar Chip into Media Player metadata when the player needs reusable avatar and profile copy composition.|||Media Player applies usage='media-player' automatically, so consumers do not need to set it by hand.">
        <mui-media-player
          slot="body"
          type="audio"
          artwork="${audioArtworkLightSrc}"
          waveform
          height="14rem"
          src="${audioSrc}">
            <mui-avatar-chip
              slot="meta-before"
              image="${MikeAvatar}"
              label="Mike Trilford"
              href="#media-player">
              <mui-body slot="primary" weight="bold">Twilight</mui-body>
              <mui-link slot="secondary" href="#creator-profile" weight="medium">
                by Mike Trilford
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
          &nbsp;&nbsp;&nbsp;&nbsp;image="avatar-mike.jpg"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;label="Mike Trilford"<br />
          &nbsp;&nbsp;&nbsp;&nbsp;href="#creator-profile"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body slot="primary" weight="bold"&gt;Twilight&lt;/mui-body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-link slot="secondary" href="#creator-profile" weight="medium"&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by Mike Trilford<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-link&gt;<br />
          &nbsp;&nbsp;&lt;/mui-avatar-chip&gt;<br /><br />
          &lt;/mui-media-player&gt;

        </story-code-block>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <story-template
        title="${data?.title || "Avatar Chip"}"
        description="${data?.description || "Avatar Chip composes avatar and profile copy into a compact identity row."}"
        github="${(data?.github || []).join("|||")}"
        figma="${(data?.figma || []).join("|||")}"
        guides="${(data?.guides || []).join("|||")}"
        storybook="${(data?.storybook || []).join("|||")}"
        accessibility="${(data?.accessibility?.engineerList || []).join("|||")}"
        imports='["@muibook/components/mui-avatar-chip","@muibook/components/mui-dropdown","@muibook/components/mui-button","@muibook/components/mui-rule","@muibook/components/mui-media-player"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          links="default::Default|||image::Image|||dropdown::Dropdown|||sizes::Sizes|||linked-avatar::Linked Avatar|||custom-secondary::Custom Secondary|||media-player::Media Player Usage">
        </story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-avatar-chip", StoryAvatarChip);
