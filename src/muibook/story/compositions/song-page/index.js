import MikeAvatar from "../../../images/mui/avatar-mike.jpg";

const audioArtworkLightSrc = new URL("../../../audio/artwork-light.png", import.meta.url).href;
const audioSrc = new URL("../../../audio/twilight.m4a", import.meta.url).href;

class SongPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const styles = /*css*/ `
      :host {
        display: block;
      }

      mui-card-body {
        padding: var(--space-400) var(--space-500);
      }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Song Page"
        description="A page composition that combines Avatar Chip, Dropdown, and Media Player into a single music detail view."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/song-page/index.js"
        storybook="https://stories.muibook.com/?path=/docs/compositions-song-page--docs">
        <story-card noheader composition>
          <mui-container large center slot="body">

            <mui-h-stack alignx="space-between" aligny="center" space="var(--space-300)" width="100%" style="margin-block-end: var(--space-500);">
              <mui-h-stack alignx="start" aligny="center" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000);">
                <mui-h-stack alignx="start" aligny="center" space="var(--space-200)" style="padding: var(--space-000) var(--space-200) var(--space-000) var(--space-200); border-radius: var(--radius-000);">
                  <mui-heading level="1" size="3">Amp</mui-heading>
                  <mui-badge variant="neutral">AU</mui-badge>
                </mui-h-stack>
              </mui-h-stack>
              <mui-dropdown zindex="2" size="small">
                <mui-button slot="action" size="small" variant="tertiary" aria-label="Open account menu">
                  <mui-avatar-chip image="${MikeAvatar}" size="small" label="Mike Trilford">
                    <mui-body slot="primary" weight="bold">Mike Trilford</mui-body>
                    <mui-body slot="secondary" weight="medium">Solo Artist</mui-body>
                  </mui-avatar-chip>
                </mui-button>
                <mui-menu>
                  <mui-button size="small">Profile</mui-button>
                  <mui-button size="small">Library</mui-button>
                  <mui-rule></mui-rule>
                  <mui-button size="small">Sign out</mui-button>
                </mui-menu>
              </mui-dropdown>
            </mui-h-stack>

            <mui-v-stack space="var(--space-500)" alignx="stretch">
              <mui-media-player
                type="audio"
                artwork="${audioArtworkLightSrc}"
                waveform
                height="14rem"
                src="${audioSrc}">
                <mui-avatar-chip
                  slot="meta-before"
                  image="${MikeAvatar}"
                  label="Mike Trilford"
                  href="#creator-profile">
                  <mui-body slot="primary" weight="bold">Twilight</mui-body>
                  <mui-link slot="secondary" href="#creator-profile" weight="medium">by Mike Trilford</mui-link>
                </mui-avatar-chip>
                <mui-link slot="meta-after" href="#buy-album" variant="overlay" size="small">Buy Album</mui-link>
              </mui-media-player>

              <mui-responsive breakpoint="1200">
                <mui-grid col="1fr 1fr 1fr" slot="showAbove" alignx="stretch" aligny="stretch" space="var(--space-500)" width="100%">
                  <mui-card>
                    <mui-card-body size="none">
                      <mui-v-stack space="var(--space-000)">
                        <mui-body size="large" weight="bold">Released</mui-body>
                        <mui-body size="large" variant="secondary">June 2026</mui-body>
                      </mui-v-stack>
                    </mui-card-body>
                  </mui-card>
                  <mui-card>
                    <mui-card-body size="none">
                      <mui-v-stack space="var(--space-000)">
                        <mui-body size="large" weight="bold">Format</mui-body>
                        <mui-body size="large" variant="secondary">Single · 2:47</mui-body>
                      </mui-v-stack>
                    </mui-card-body>
                  </mui-card>
                  <mui-card>
                    <mui-card-body size="none">
                      <mui-v-stack space="var(--space-000)">
                        <mui-body size="large" weight="bold">Mood</mui-body>
                        <mui-body size="large" variant="secondary">Ambient electronic</mui-body>
                      </mui-v-stack>
                    </mui-card-body>
                  </mui-card>
                </mui-grid>

                <mui-grid col="1fr" slot="showBelow" alignx="stretch" space="var(--space-400)">
                  <mui-card>
                    <mui-card-body size="none">
                      <mui-v-stack space="var(--space-000)">
                        <mui-body size="large" weight="bold">Released</mui-body>
                        <mui-body size="large" variant="secondary">June 2026</mui-body>
                      </mui-v-stack>
                    </mui-card-body>
                  </mui-card>
                  <mui-card>
                    <mui-card-body size="none">
                      <mui-v-stack space="var(--space-000)">
                        <mui-body size="large" weight="bold">Format</mui-body>
                        <mui-body size="large" variant="secondary">Single · 2:47</mui-body>
                      </mui-v-stack>
                    </mui-card-body>
                  </mui-card>
                  <mui-card>
                    <mui-card-body size="none">
                      <mui-v-stack space="var(--space-000)">
                        <mui-body size="large" weight="bold">Mood</mui-body>
                        <mui-body size="large" variant="secondary">Ambient electronic</mui-body>
                      </mui-v-stack>
                    </mui-card-body>
                  </mui-card>
                </mui-grid>
              </mui-responsive>
            </mui-v-stack>

          </mui-container>
        </story-card>
      </story-template>
    `;
  }
}

customElements.define("comp-song-page", SongPage);
