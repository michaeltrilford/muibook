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
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Avatar Chip"></story-metadata-empty>`;
      return;
    }
    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const styles = /*css*/ `
      :host {
        display: block;
      }

      .canvas {
        background: var(--surface);
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

      <story-card id="default" title="${storyMeta["default"].title}" description="${storyMeta["default"].description}" usage="${storyMeta["default"].usage}">
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

      <story-card id="image" title="${storyMeta["image"].title}" description="${storyMeta["image"].description}" usage="${storyMeta["image"].usage}">
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

      <story-card id="avatar-background" title="${storyMeta["avatar-background"].title}" description="${storyMeta["avatar-background"].description}" usage="${storyMeta["avatar-background"].usage}">
        <div slot="body" class="canvas">
          <div class="size-list">
            <mui-avatar-chip
              background="purple"
              primary="Alex Morgan"
              secondary="Named background"
              label="Alex Morgan">
            </mui-avatar-chip>
            <mui-avatar-chip
              background-color="var(--feedback-info-background)"
              primary="Riley Chen"
              secondary="Custom background color"
              label="Riley Chen">
            </mui-avatar-chip>
          </div>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-avatar-chip<br />
          &nbsp;&nbsp;background="purple"<br />
          &nbsp;&nbsp;primary="Alex Morgan"<br />
          &nbsp;&nbsp;secondary="Named background"<br />
          &nbsp;&nbsp;label="Alex Morgan"&gt;<br />
          &lt;/mui-avatar-chip&gt;<br /><br />
          &lt;mui-avatar-chip<br />
          &nbsp;&nbsp;background-color="var(--feedback-info-background)"<br />
          &nbsp;&nbsp;primary="Riley Chen"<br />
          &nbsp;&nbsp;secondary="Custom background color"<br />
          &nbsp;&nbsp;label="Riley Chen"&gt;<br />
          &lt;/mui-avatar-chip&gt;
        </story-code-block>
      </story-card>

      <story-card id="dropdown" title="${storyMeta["dropdown"].title}" description="${storyMeta["dropdown"].description}" usage="${storyMeta["dropdown"].usage}">
        <div slot="body" class="canvas">
          <div class="dropdown-list">
            <mui-dropdown size="x-small">
              <mui-button slot="action" size="x-small">
                <mui-avatar-chip
                  image="${MikeAvatar}"
                  size="x-small"
                  label="Mike Trilford">
                  <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                  <mui-body slot="secondary" weight="medium">Product Designer</mui-body>
                </mui-avatar-chip>
              </mui-button>
              <mui-menu>
                <mui-button size="x-small">Profile</mui-button>
                <mui-button size="x-small">Settings</mui-button>
                <mui-rule></mui-rule>
                <mui-button size="x-small">Log out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown size="small">
              <mui-button slot="action" size="small" variant="secondary">
                <mui-avatar-chip
                  image="${MikeAvatar}"
                  size="small"
                  label="Mike Trilford">
                  <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                  <mui-body slot="secondary" weight="medium">Product Designer</mui-body>
                </mui-avatar-chip>
              </mui-button>
              <mui-menu>
                <mui-button size="small">Profile</mui-button>
                <mui-button size="small">Settings</mui-button>
                <mui-rule></mui-rule>
                <mui-button size="small">Log out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown size="medium">
              <mui-button slot="action" size="medium" variant="secondary">
                <mui-avatar-chip
                  image="${MikeAvatar}"
                  size="medium"
                  label="Mike Trilford">
                  <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                  <mui-body slot="secondary" weight="medium">Product Designer</mui-body>
                </mui-avatar-chip>
              </mui-button>
              <mui-menu>
                <mui-button size="medium">Profile</mui-button>
                <mui-button size="medium">Settings</mui-button>
                <mui-rule></mui-rule>
                <mui-button size="medium">Log out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown size="large">
              <mui-button slot="action" size="large" variant="secondary">
                <mui-avatar-chip
                  image="${MikeAvatar}"
                  size="large"
                  label="Mike Trilford">
                  <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                  <mui-body slot="secondary" weight="medium">Product Designer</mui-body>
                </mui-avatar-chip>
              </mui-button>
              <mui-menu>
                <mui-button size="large">Profile</mui-button>
                <mui-button size="large">Settings</mui-button>
                <mui-rule></mui-rule>
                <mui-button size="large">Log out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown position="right" size="x-small">
              <mui-button
                slot="action"
                variant="tertiary"
                size="x-small"
                gap="var(--space-400)"
                aria-label="Open profile menu">
                <mui-avatar-chip
                  label="Alex"
                  size="x-small"
                  background="blue"
                  primary="Alex Hurt"
                  secondary="Product Designer">
                </mui-avatar-chip>
                <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
              </mui-button>
              <mui-menu size="x-small" width="16rem">
                <mui-button variant="tertiary" align="start" size="x-small" weight="regular">Profile</mui-button>
                <mui-button variant="tertiary" align="start" size="x-small" weight="regular">Settings</mui-button>
                <mui-button variant="tertiary" align="start" size="x-small" weight="regular">Sign out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown position="right" size="small">
              <mui-button
                slot="action"
                variant="tertiary"
                size="small"
                gap="var(--space-400)"
                aria-label="Open profile menu">
                <mui-avatar-chip
                  label="Alex"
                  size="small"
                  background="blue"
                  primary="Alex Hurt"
                  secondary="Product Designer">
                </mui-avatar-chip>
                <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
              </mui-button>
              <mui-menu size="small" width="16rem">
                <mui-button variant="tertiary" align="start" size="small" weight="regular">Profile</mui-button>
                <mui-button variant="tertiary" align="start" size="small" weight="regular">Settings</mui-button>
                <mui-button variant="tertiary" align="start" size="small" weight="regular">Sign out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown position="right" size="medium">
              <mui-button
                slot="action"
                variant="tertiary"
                size="medium"
                gap="var(--space-400)"
                aria-label="Open profile menu">
                <mui-avatar-chip
                  label="Alex"
                  size="medium"
                  background="blue"
                  primary="Alex Hurt"
                  secondary="Product Designer">
                </mui-avatar-chip>
                <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
              </mui-button>
              <mui-menu size="medium" width="16rem">
                <mui-button variant="tertiary" align="start" size="medium" weight="regular">Profile</mui-button>
                <mui-button variant="tertiary" align="start" size="medium" weight="regular">Settings</mui-button>
                <mui-button variant="tertiary" align="start" size="medium" weight="regular">Sign out</mui-button>
              </mui-menu>
            </mui-dropdown>

            <mui-dropdown position="right" size="large">
              <mui-button
                slot="action"
                variant="tertiary"
                size="large"
                gap="var(--space-400)"
                aria-label="Open profile menu">
                <mui-avatar-chip
                  label="Alex"
                  size="large"
                  background="blue"
                  primary="Alex Hurt"
                  secondary="Product Designer">
                </mui-avatar-chip>
                <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
              </mui-button>
              <mui-menu size="large" width="16rem">
                <mui-button variant="tertiary" align="start" size="large" weight="regular">Profile</mui-button>
                <mui-button variant="tertiary" align="start" size="large" weight="regular">Settings</mui-button>
                <mui-button variant="tertiary" align="start" size="large" weight="regular">Sign out</mui-button>
              </mui-menu>
            </mui-dropdown>
          </div>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-dropdown position=&quot;right&quot; size=&quot;medium&quot;&gt;<br />
          &nbsp;&nbsp;&lt;mui-button<br />
          &nbsp;&nbsp;&nbsp;&nbsp;slot=&quot;action&quot;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;variant=&quot;tertiary&quot;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;size=&quot;medium&quot;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;gap=&quot;var(--space-400)&quot;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;aria-label=&quot;Open profile menu&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar-chip<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label=&quot;Alex&quot;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size=&quot;medium&quot;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background=&quot;blue&quot;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;primary=&quot;Alex Hurt&quot;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secondary=&quot;Product Designer&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-avatar-chip&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-down-chevron slot=&quot;after&quot;&gt;&lt;/mui-icon-down-chevron&gt;<br />
          &nbsp;&nbsp;&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;mui-menu size=&quot;medium&quot; width=&quot;16rem&quot;&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot; align=&quot;start&quot; size=&quot;medium&quot; weight=&quot;regular&quot;&gt;Profile&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot; align=&quot;start&quot; size=&quot;medium&quot; weight=&quot;regular&quot;&gt;Settings&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant=&quot;tertiary&quot; align=&quot;start&quot; size=&quot;medium&quot; weight=&quot;regular&quot;&gt;Sign out&lt;/mui-button&gt;<br />
          &nbsp;&nbsp;&lt;/mui-menu&gt;<br />
          &lt;/mui-dropdown&gt;
        </story-code-block>
      </story-card>

      <story-card id="sizes" title="${storyMeta["sizes"].title}" description="${storyMeta["sizes"].description}" usage="${storyMeta["sizes"].usage}">
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

      <story-card id="linked-avatar" title="${storyMeta["linked-avatar"].title}" description="${storyMeta["linked-avatar"].description}" usage="${storyMeta["linked-avatar"].usage}">
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

      <story-card id="custom-secondary" title="${storyMeta["custom-secondary"].title}" description="${storyMeta["custom-secondary"].description}" usage="${storyMeta["custom-secondary"].usage}">
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

      <story-card id="media-player-usage" title="${storyMeta["media-player-usage"].title}" description="${storyMeta["media-player-usage"].description}" usage="${storyMeta["media-player-usage"].usage}">
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
        imports='["@muibook/components/mui-avatar-chip"]'>
        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>
        ${stories}
      </story-template>
    `;
  }
}

customElements.define("story-avatar-chip", StoryAvatarChip);
