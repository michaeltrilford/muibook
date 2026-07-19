import { getComponentDocs } from "../../../utils/story-data";

import MikeAvatar from "../../../images/mui/avatar-mike.jpg";

class storyDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("Drawer");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="Drawer"></story-metadata-empty>`;
      return;
    }

    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: story.list.join("|||") }]),
    );

    const attrsReference = JSON.stringify([
      {
        component: "mui-drawer",
        parentAttrs: ["has-header", "has-footer"],
        childAttrs: [],
      },
    ]);
    const styles = /*css*/ `
      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }

      :host { display: block; }

      .canvas {
        background: var(--surface);
        padding: 1px;
        margin-top: calc(var(--space-400) * -1);
        margin-bottom: calc(var(--space-400) * -1);
        margin-left: calc(var(--space-400) * -1);
        margin-right: calc(var(--space-400) * -1);
      }

      mui-container { min-width: initial; }

      .menu-item {
        text-align: left;
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      }

      .page-header {
        background: var(--drawer-background);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-400) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
        box-sizing: border-box;
        min-height: var(--header-min-height);
      }

      .canvas-page-header {
        background: var(--surface-elevated-100);
      }

      .canvas-page-header,
      .canvas-drawer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-400) var(--space-400) var(--space-400) var(--space-400);
        border-bottom: var(--border-thin);
        box-sizing: border-box;
        min-height: var(--header-min-height);
        transition: padding var(--speed-100) ease;
      }

      mui-drawer[variant="workspace"]:not([mobile])[left-open] .canvas-page-header {
        padding-inline-start: calc(var(--space-400) + var(--space-100));
      }

      .page-main {
        background: var(--surface-elevated-100);
      }

      .page-content {
        padding: var(--space-800) var(--space-500);
        box-sizing: border-box;
        overflow: scroll;
      }

      .resize-page-main {
        min-width: 0;
        container-type: inline-size;
      }

      .resize-page-content {
        min-width: 0;
        overflow: auto;
      }

      .resize-test-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-300);
        min-width: 0;
      }

      .resize-test-panel {
        min-width: 0;
        padding: var(--space-400);
        border: var(--border-thin);
        border-radius: var(--radius-200);
        background: var(--surface-elevated-100);
        box-sizing: border-box;
      }

      .workspace-demo-panel {
        min-height: 100%;
        box-sizing: border-box;
        background: var(--drawer-background);
      }

      .workspace-demo-canvas {
        min-height: 100%;
        box-sizing: border-box;
        background: var(--surface);
      }

      .workspace-demo-frame {
        width: min(100%, 42rem);
        margin-inline: auto;
        border: var(--border-thin);
        border-radius: var(--radius-300);
        background: var(--surface-elevated-100);
        box-sizing: border-box;
      }

      .workspace-demo-preview {
        height: var(--space-800);
        border-radius: var(--radius-200);
        background: var(--surface-elevated-200);
      }

      .left-panel-open-btn {
        transition:
          opacity var(--speed-400) ease var(--speed-200),
          width var(--speed-400) ease-out,
          margin var(--speed-400) ease-out,
          padding var(--speed-400) ease-out;
        overflow: hidden;
        width: var(--action-size-small);
        margin-right: 0;
      }

      /* Desktop: hide button if left-open is set */
      mui-drawer[variant="workspace"]:not([mobile])[left-open] .left-panel-open-btn {
        transition:
          opacity var(--speed-100) ease,
          width var(--speed-100) ease-out,
          margin var(--speed-100) ease-out,
          padding var(--speed-100) ease-out;
        opacity: 0;
        pointer-events: none;
        width: 0;
        min-width: 0;
        padding: 0;
        margin-right: calc(-1 * var(--space-200));
      }

      mui-drawer[variant="workspace"]:not([left-open]) .left-panel-close-btn,
      mui-drawer[variant="workspace"][mobile] .left-panel-close-btn {
        display: none;
      }

      @container (max-width: 90rem) {
        .resize-test-grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      @media (max-width: 768px) {
        .page-content {
          height: auto;
        }
      }

      .video-menu-item,
      .video-menu-more,
      .video-menu-group-heading { text-align: left; }

      .video-menu-more {
        margin: var(--space-100);
      }

      .video-menu-more_hero {
        margin-left: calc(var(--space-300) + var(--space-025));
        margin-right: calc(var(--space-300) + var(--space-025));
      }

      .video-menu-group-heading {
        margin-bottom: var(--space-200);
      }

      .video-menu-group {
        width: 100%;
      }
      .video-menu-group::part(padding) {
        padding: var(--space-300) var(--space-200);
      }



    `;

    const invoiceHeader = /*html*/ `
      <mui-h-stack space="var(--space-300)" alignY="center">
        <mui-heading size="4" level="4">New Invoice</mui-heading>
        <mui-badge>Preview</mui-badge>
      </mui-h-stack>
    `;

    const content = /*html*/ `
      <mui-v-stack space="var(--space-300);">
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 200px; background:var(--surface); border-radius:var(--radius-200);"></div>
        <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface); border-radius:var(--radius-200);"></div>
      </mui-v-stack>
    `;

    const invoice = /*html*/ `
      <mui-v-stack space="var(--space-600);" style="margin-bottom: var(--space-500)">

        <mui-h-stack alignX="space-between">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-100); width: 100px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-400); min-width: 80px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-100); min-width: 80px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-h-stack>

        <mui-v-stack alignX="stretch" space="var(--space-300);">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100);">
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-v-stack>

      </mui-v-stack>
    `;

    const bill = /*html*/ `
      <mui-v-stack space="var(--space-600);" style="margin-bottom: var(--space-500)">

        <mui-h-stack alignX="space-between">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-100); width: 60px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-400); width: 100px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100);" alignX="end">
            <div style="height: 0.8rem; width: 40px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 0.8rem; width: 60px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 0.8rem; width: 30px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-h-stack>

        <mui-grid col="1fr auto">
          <mui-v-stack space="var(--space-300);" alignX="end">
            <div style="height: 9.6rem; width: 180px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-grid>

        <mui-v-stack alignX="stretch" space="var(--space-300);">
          <mui-v-stack space="var(--space-300);">
            <div style="height: 1.6rem; width: 90px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>

          <mui-v-stack space="var(--space-100);">
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-v-stack>

      </mui-v-stack>
    `;

    const reviewStepper = /*html*/ `
        <mui-v-stack space="0" style="margin-bottom: var(--space-400);">
          <div
            style="
              background: var(--surface-elevated-200);
              padding: var(--space-400);
              border-top-left-radius: var(--radius-300);
              border-top-right-radius: var(--radius-300);
              border: var(--border-thin);
            "
          >
            <mui-body size="small" weight="bold">Guru has prefilled the fields</mui-body>
            <mui-body size="small">Review the items and proceed</mui-body>
          </div>
          <div
            style="
              background: var(--surface-elevated-200);
              padding: var(--space-400) 0 var(--space-500);
              border-bottom-left-radius: var(--radius-300);
              border-bottom-right-radius: var(--radius-300);
              border: var(--border-thin);
                border-top: none;
            "
          >
            <mui-stepper direction="horizontal" active-step="2">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
        </mui-v-stack>
      `;

    const menuBillItems = /*html*/ `
      <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); background: var(--drawer-background);">
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Home">
            <mui-icon-home slot="before"></mui-icon-home>
            Home
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Shorts">
            <mui-icon-play-stack slot="before"></mui-icon-play-stack>
            Shorts
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Subscriptions">
            Subscriptions
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Real Estate">
            <mui-avatar slot="before" size="small" image="${MikeAvatar}" label="Real Estate Profile Image"></mui-avatar>
            Real Estate
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Jazz Beats">
            <mui-avatar slot="before" size="small" label="Jazz Beats"></mui-avatar>
            Jazz Beats
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Julie Cooks">
            <mui-avatar slot="before" size="small" image="${MikeAvatar}" label="Mike Trilford Profile Image"></mui-avatar>
            Julie Cooks
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Sidebar Court">
            <mui-avatar slot="before" size="small" label="Sidebar Court">
              <mui-icon-left-sidebar></mui-icon-left-sidebar>
            </mui-avatar>
            Sidebar Court
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Hot Grill">
            <mui-avatar slot="before" size="small" label="Hot Grill" background="attention">
              <mui-icon-sun></mui-icon-sun>
            </mui-avatar>
            Hot Grill
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more video-menu-more_hero" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Subscriptions">
            You
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Playlists">
            <mui-icon-list-and-film slot="before"></mui-icon-list-and-film>
            Playlists
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Your videos">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Your videos
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Downloads">
            <mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle>
            Downloads
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Explore">
            Explore
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Music">
            <mui-icon-music-microphone slot="before"></mui-icon-music-microphone>
            Music
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Movies & TV">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Movies & TV
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Gaming">
            <mui-icon-game-controller slot="before"></mui-icon-game-controller>
            Gaming
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
      </mui-v-stack>
    `;

    const menuItems = /*html*/ `
      <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); background: var(--drawer-background);">
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Home">
            <mui-icon-home slot="before"></mui-icon-home>
            Home
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Shorts">
            <mui-icon-play-stack slot="before"></mui-icon-play-stack>
            Shorts
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Subscriptions">
            Subscriptions
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Real Estate">
            <mui-avatar slot="before" size="small" image="${MikeAvatar}" label="Real Estate Profile Image"></mui-avatar>
            Real Estate
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Jazz Beats">
            <mui-avatar slot="before" size="small" label="Jazz Beats"></mui-avatar>
            Jazz Beats
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Julie Cooks">
            <mui-avatar slot="before" size="small" image="${MikeAvatar}" label="Mike Trilford Profile Image"></mui-avatar>
            Julie Cooks
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Sidebar Court">
            <mui-avatar slot="before" size="small" label="Sidebar Court">
              <mui-icon-left-sidebar></mui-icon-left-sidebar>
            </mui-avatar>
            Sidebar Court
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Hot Grill">
            <mui-avatar slot="before" size="small" label="Hot Grill" background="attention">
              <mui-icon-sun></mui-icon-sun>
            </mui-avatar>
            Hot Grill
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more video-menu-more_hero" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Subscriptions">
            You
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Playlists">
            <mui-icon-list-and-film slot="before"></mui-icon-list-and-film>
            Playlists
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Your videos">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Your videos
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Downloads">
            <mui-icon-down-arrow-circle slot="before"></mui-icon-down-arrow-circle>
            Downloads
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
        <mui-rule weight="var(--stroke-size-100)" width="100%" direction="horizontal"></mui-rule>
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">
          <mui-button variant="tertiary" size="small" class="video-menu-group-heading" aria-label="Explore">
            Explore
            <mui-icon-right-chevron slot="after"></mui-icon-right-chevron>
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Music">
            <mui-icon-music-microphone slot="before"></mui-icon-music-microphone>
            Music
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Movies & TV">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Movies & TV
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Gaming">
            <mui-icon-game-controller slot="before"></mui-icon-game-controller>
            Gaming
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
            <mui-icon-down-chevron slot="before"></mui-icon-down-chevron>
            Show more
          </mui-button>
        </mui-v-stack>
      </mui-v-stack>
    `;

    const workspaceComponentsPanel = /*html*/ `
      <div class="workspace-demo-panel">
        <mui-h-stack class="canvas-drawer-header" space="var(--space-200)" alignx="space-between" aligny="center" width="100%">
          <mui-heading size="5" level="2" style="margin-left: var(--space-200)">Components</mui-heading>
          <mui-button variant="tertiary" size="small" data-drawer-toggle="drawer-resize-workspace-left-rail" class="left-panel-close-btn">
            <mui-icon-rectangle-left-drawer size="small"></mui-icon-rectangle-left-drawer>
          </mui-button>
        </mui-h-stack>

        <mui-v-stack space="var(--space-400)" style="padding: var(--space-400)">
          <mui-v-stack alignx="stretch" space="var(--space-100)">
            <mui-button size="small" class="menu-item" variant="tertiary">
              <mui-icon-rectangle-media-text slot="before"></mui-icon-rectangle-media-text>
              Media Card
            </mui-button>
            <mui-button size="small" class="menu-item" variant="tertiary">
              <mui-icon-left-sidebar slot="before"></mui-icon-left-sidebar>
              Sidebar
            </mui-button>
            <mui-button size="small" class="menu-item" variant="tertiary">
              <mui-icon-message slot="before"></mui-icon-message>
              Message
            </mui-button>
          </mui-v-stack>
          <mui-rule></mui-rule>
          <mui-v-stack alignx="stretch" space="var(--space-100)">
            <mui-body size="small" weight="bold" style="margin-bottom: var(--space-100)">Sections</mui-body>
            <mui-button size="small" class="menu-item" variant="tertiary">
              <mui-icon-rectangle-media-text slot="before"></mui-icon-rectangle-media-text>
              Hero
            </mui-button>
            <mui-button size="small" class="menu-item" variant="tertiary">
              <mui-icon-rectangle-media-text slot="before"></mui-icon-rectangle-media-text>
              Feature Grid
            </mui-button>
            <mui-button size="small" class="menu-item" variant="tertiary">
              <mui-icon-rectangle-media-text slot="before"></mui-icon-rectangle-media-text>
              Action Footer
            </mui-button>
          </mui-v-stack>
        </mui-v-stack>
      </div>
    `;

    const workspaceInspectorPanel = /*html*/ `
      <div class="workspace-demo-panel">
        <mui-h-stack class="canvas-drawer-header" space="var(--space-200)" alignx="space-between" aligny="center" width="100%">
          <mui-dropdown position="left" size="medium">
            <mui-button slot="action" aria-label="Open Mike profile menu">
              <mui-avatar size="small" image="/src/muibook/images/mui/avatar-mike.jpg" label="Mike Trilford"></mui-avatar>
            </mui-button>
            <mui-menu width="min(100%, 14rem)">
              <mui-button size="small" variant="tertiary">Profile</mui-button>
              <mui-button size="small" variant="tertiary">Settings</mui-button>
              <mui-button size="small" variant="tertiary">Sign out</mui-button>
            </mui-menu>
          </mui-dropdown>
          <mui-button size="small" variant="primary">Share</mui-button>
        </mui-h-stack>

        <mui-v-stack space="var(--space-400)" style="padding: var(--space-400)">
          <mui-h-stack alignx="space-between" aligny="center">
            <mui-body size="small">Styles</mui-body>
            <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
          </mui-h-stack>
          <mui-rule></mui-rule>
          <mui-h-stack alignx="space-between" aligny="center">
            <mui-body size="small">Layout</mui-body>
            <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
          </mui-h-stack>
          <mui-rule></mui-rule>
          <mui-h-stack alignx="space-between" aligny="center">
            <mui-body size="small">Export</mui-body>
            <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
          </mui-h-stack>
          <mui-rule></mui-rule>
        </mui-v-stack>
      </div>
    `;

    const workspaceCanvasPage = /*html*/ `
      <div class="workspace-demo-canvas">
        <div class="canvas-page-header">
          <mui-h-stack space="var(--space-200)" aligny="center" alignx="space-between" width="100%">
            <mui-h-stack space="var(--space-200)" aligny="center">
              <mui-button variant="tertiary" size="small" data-drawer-toggle="drawer-resize-workspace-left-rail" class="left-panel-open-btn">
                <mui-icon-rectangle-left-drawer size="small"></mui-icon-rectangle-left-drawer>
              </mui-button>
              <mui-heading size="4" level="2">Canvas</mui-heading>
              <mui-badge variant="neutral">Draft</mui-badge>
            </mui-h-stack>
              <mui-button variant="tertiary" size="small" data-drawer-toggle="drawer-resize-workspace-right-rail">
                <mui-icon-rectangle-right-drawer size="small"></mui-icon-rectangle-right-drawer>
              </mui-button>
          </mui-h-stack>
        </div>

        <mui-v-stack class="page-content resize-page-content" space="var(--space-500)" alignx="center">
          <mui-v-stack class="workspace-demo-frame" space="var(--space-400)" style="padding: var(--space-500);">
            <mui-h-stack alignx="space-between" aligny="center">
              <mui-heading size="5" level="3">Customer Portal</mui-heading>
              <mui-badge variant="positive">Live</mui-badge>
            </mui-h-stack>
            <mui-grid col="1fr" space="var(--space-400)">
              <div class="resize-test-panel">
                <mui-v-stack space="var(--space-300)">
                  <mui-body size="small" weight="bold">Right Drawer</mui-body>
                  <mui-code wrap size="x-small">resize-min-right-width="200"</mui-code>
                  <mui-code wrap size="x-small">right-width="30rem"</mui-code>
                </mui-v-stack>
              </div>
              <div class="resize-test-panel">
                <mui-v-stack space="var(--space-300)">
                  <mui-body size="small" weight="bold">Page Content</mui-body>
                  <mui-code wrap size="x-small">resize-min-page-width="400"</mui-code>
                </mui-v-stack>
              </div>
              <div class="resize-test-panel">
                <mui-v-stack space="var(--space-300)">
                  <mui-body size="small" weight="bold">Left Drawer</mui-body>
                  <mui-code wrap size="x-small">resize-min-left-width="200"</mui-code>
                  <mui-code wrap size="x-small">left-width="24rem"</mui-code>
                </mui-v-stack>
              </div>
            </mui-grid>
          </mui-v-stack>
        </mui-v-stack>
      </div>
    `;

    const stories = /*html*/ `
      <mui-v-stack space="var(--space-100)">
        <story-api-types tag="mui-drawer" title="Drawer"></story-api-types>
      </mui-v-stack>

      <story-card id="drawer-overlay-left" title="${storyMeta["drawer-overlay-left"].title}" description="${storyMeta["drawer-overlay-left"].description}" usage="${storyMeta["drawer-overlay-left"].usage}">
        <mui-button variant="primary" data-drawer="drawer-1" slot="body">Open</mui-button>

        <mui-drawer variant="overlay" data-drawer="drawer-1" side="left" slot="body">
            <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
              <guides-logo style="width: 24px;"></guides-logo>
              <mui-heading size="4" level="4">Guides</mui-heading>
            </mui-h-stack>
            ${content}
          <mui-button slot="actions" variant="secondary" data-close size="small">Cancel</mui-button>
          <mui-button slot="actions" variant="primary" size="small">Confirm</mui-button>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="hook"&gt;Open&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="left"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Overlay Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close size="small"&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary" size="small"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card id="drawer-overlay-right" title="${storyMeta["drawer-overlay-right"].title}" description="${storyMeta["drawer-overlay-right"].description}" usage="${storyMeta["drawer-overlay-right"].usage}">
        <mui-button variant="primary" data-drawer="drawer-2" slot="body">Open</mui-button>

        <mui-drawer variant="overlay" data-drawer="drawer-2" width="400px" side="right" slot="body">
          <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
            <guides-logo style="width: 24px;"></guides-logo>
            <mui-heading size="4" level="4">Guides</mui-heading>
          </mui-h-stack>
          ${content}
          <mui-button slot="actions" variant="secondary" data-close size="small">Cancel</mui-button>
          <mui-button slot="actions" variant="primary" size="small">Confirm</mui-button>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="hook"&gt;Open&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="right"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Overlay Drawer&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close size="small"&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary" size="small"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card id="drawer-overlay-no-header" title="${storyMeta["drawer-overlay-no-header"].title}" description="${storyMeta["drawer-overlay-no-header"].description}" usage="${storyMeta["drawer-overlay-no-header"].usage}">
        <mui-button variant="primary" data-drawer="overlay-no-header" slot="body">Open</mui-button>

        <mui-drawer variant="overlay" data-drawer="overlay-no-header" width="400px" side="left" slot="body">
          ${content}
          <mui-button slot="actions" variant="secondary" data-close size="small">Cancel</mui-button>
          <mui-button slot="actions" variant="primary" size="small">Confirm</mui-button>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="hook"&gt;Open&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="left"&gt;<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="secondary" data-close size="small"&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&lt;mui-button slot="actions" variant="primary" size="small"&gt;Confirm&lt;/mui-button&gt;<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-overlay-custom-footer"
        title="${storyMeta["drawer-overlay-custom-footer"].title}"
        description="${storyMeta["drawer-overlay-custom-footer"].description}"
        usage="${storyMeta["drawer-overlay-custom-footer"].usage}">
        <mui-button variant="primary" data-drawer="overlay-custom-footer" slot="body">Open</mui-button>

        <mui-drawer variant="overlay" data-drawer="overlay-custom-footer" width="400px" side="right" close-size="small" slot="body">
          <mui-heading size="5" level="4" slot="title">Review Changes</mui-heading>
          ${content}
          <mui-v-stack slot="actions" alignx="stretch" space="var(--space-300)" style="width: 100%;">
            <mui-h-stack alignx="end" space="var(--space-300)">
              <mui-button variant="secondary" data-close size="small">Cancel</mui-button>
              <mui-button variant="primary" size="small">Save changes</mui-button>
            </mui-h-stack>
          </mui-v-stack>
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="right" close-size="small"&gt;<br>
          &nbsp;&nbsp;&lt;mui-heading slot="title"&gt;Review Changes&lt;/mui-heading&gt;<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;&lt;mui-v-stack slot="actions" alignx="stretch" space="var(--space-300)" style="width: 100%;"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack alignx="end" space="var(--space-300)"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="secondary" data-close size="small"&gt;Cancel&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="primary" size="small"&gt;Save changes&lt;/mui-button&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br>
          &nbsp;&nbsp;&lt;/mui-v-stack&gt;<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card id="drawer-overlay-no-footer" title="${storyMeta["drawer-overlay-no-footer"].title}" description="${storyMeta["drawer-overlay-no-footer"].description}" usage="${storyMeta["drawer-overlay-no-footer"].usage}">
        <mui-button variant="primary" data-drawer="overlay-no-footer" slot="body">Open</mui-button>

        <mui-drawer variant="overlay" data-drawer="overlay-no-footer" width="400px" side="left" slot="body">
          <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
            <guides-logo style="width: 24px;"></guides-logo>
            <mui-heading size="4" level="4">Guides</mui-heading>
          </mui-h-stack>
          ${content}
        </mui-drawer>

        <story-code-block slot="footer" scrollable>
          &lt;mui-button variant="primary" data-drawer="hook"&gt;Open&lt;/mui-button&gt;<br><br>
          &lt;mui-drawer variant="overlay" data-drawer="hook" width="400px" side="left"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;<br><br>
          this.shadowRoot.querySelectorAll('[data-drawer]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;btn.addEventListener('click', () =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const target = btn.getAttribute('data-drawer');<br>
          &nbsp;&nbsp;&nbsp;&nbsp;const drawer = this.shadowRoot.querySelector(&#96;[data-drawer=&quot; + target + &quot;]&#96;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (drawer) drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;});<br>
          });<br>
          this.shadowRoot.querySelectorAll('mui-drawer').forEach((drawer) =&gt; {<br>
          &nbsp;&nbsp;drawer.querySelectorAll('[data-close]').forEach((btn) =&gt; {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;btn.addEventListener('click', () =&gt; drawer.removeAttribute('open'));<br>
          &nbsp;&nbsp;});<br>
          });
        </story-code-block>
      </story-card>


      <story-card
        id="drawer-workspace"
        title="${storyMeta["drawer-workspace"].title}"
        description="${storyMeta["drawer-workspace"].description}"
        usage="${storyMeta["drawer-workspace"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer
            contained
            variant="workspace"
            resize-rail
            resize-min-left-width="200"
            resize-min-right-width="200"
            resize-min-page-width="400"
            resize-close-threshold="96"
            left-open
            right-open
            left-width="24rem"
            right-width="30rem"
            data-drawer-toggle-left="drawer-resize-workspace-left-rail"
            data-drawer-toggle-right="drawer-resize-workspace-right-rail"
            breakpoint="1400"
            height="80dvh"
            >
            <div slot="left">${workspaceComponentsPanel}</div>
            <div slot="page">${workspaceCanvasPage}</div>
            <div slot="right">${workspaceInspectorPanel}</div>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;!-- JS: Toggle panels responsively --&gt;<br>
          const drawer = document.querySelector('mui-drawer');<br>
          const side = 'left'; // or 'right'<br><br>
          // 1. Toggle drawer state<br>
          if (drawer.hasAttribute('mobile')) {<br>
          &nbsp;&nbsp;if (drawer.hasAttribute('open') &amp;&amp; drawer.getAttribute('side') === side) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;drawer.removeAttribute('open');<br>
          &nbsp;&nbsp;} else {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;drawer.setAttribute('side', side);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;drawer.setAttribute('open', '');<br>
          &nbsp;&nbsp;}<br>
          } else {<br>
          &nbsp;&nbsp;drawer.toggleAttribute(&#96;\${side}-open&#96;);<br>
          }<br><br>
          // 2. Prevent focus when open button visually hides<br>
          const isMobile = drawer.hasAttribute('mobile');<br>
          const triggerBtn = drawer.querySelector('.left-panel-open-btn');<br>
          if (triggerBtn) {<br>
          &nbsp;&nbsp;triggerBtn.inert = !isMobile &amp;&amp; drawer.hasAttribute('left-open');<br>
          }<br><br>
          &lt;!-- CSS: Style page elements based on viewport state --&gt;<br>
          &lt;style&gt;<br>
          &nbsp;&nbsp;/* Desktop: visually hide open button, consume flex gap */<br>
          &nbsp;&nbsp;mui-drawer[variant="workspace"]:not([mobile])[left-open] .left-panel-open-btn {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;opacity: 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;width: 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;min-width: 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;padding: 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;margin-right: calc(-1 * var(--space-200));<br>
          &nbsp;&nbsp;&nbsp;&nbsp;pointer-events: none;<br>
          &nbsp;&nbsp;}<br><br>
          &nbsp;&nbsp;/* Desktop: maintain visual balance by replacing missing button width with padding */<br>
          &nbsp;&nbsp;mui-drawer[variant="workspace"]:not([mobile])[left-open] .canvas-page-header {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;padding-inline-start: calc(var(--space-400) + var(--space-100));<br>
          &nbsp;&nbsp;}<br><br>
          &nbsp;&nbsp;/* Hide close button if left drawer is not open (on desktop), or always on mobile */<br>
          &nbsp;&nbsp;mui-drawer[variant="workspace"]:not([left-open]) .left-panel-close-btn,<br>
          &nbsp;&nbsp;mui-drawer[variant="workspace"][mobile] .left-panel-close-btn {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;display: none;<br>
          &nbsp;&nbsp;}<br><br>
          &lt;/style&gt;<br><br>

          &lt;!-- HTML Setup --&gt;<br>
          &lt;mui-drawer<br>
          &nbsp;&nbsp;contained<br>
          &nbsp;&nbsp;variant="workspace"<br>
          &nbsp;&nbsp;resize-rail<br>
          &nbsp;&nbsp;resize-min-left-width="200"<br>
          &nbsp;&nbsp;resize-min-right-width="200"<br>
          &nbsp;&nbsp;resize-min-page-width="400"<br>
          &nbsp;&nbsp;resize-close-threshold="96"<br>
          &nbsp;&nbsp;breakpoint="1400"<br>
          &nbsp;&nbsp;left-open<br>
          &nbsp;&nbsp;right-open<br>
          &nbsp;&nbsp;left-width="24rem"<br>
          &nbsp;&nbsp;right-width="30rem"<br>
          &nbsp;&nbsp;height="75dvh"<br>
          &nbsp;&nbsp;data-drawer-toggle-left="drawer-resize-workspace-left-rail"<br>
          &nbsp;&nbsp;data-drawer-toggle-right="drawer-resize-workspace-right-rail"&gt;<br>
          &nbsp;&nbsp;&lt;div slot="left"&gt;...component library...&lt;/div&gt;<br>
          &nbsp;&nbsp;&lt;div slot="page"&gt;...canvas...&lt;/div&gt;<br>
          &nbsp;&nbsp;&lt;div slot="right"&gt;...properties panel...&lt;/div&gt;<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-push-left"
        title="${storyMeta["drawer-push-left"].title}"
        description="${storyMeta["drawer-push-left"].description}"
        usage="${storyMeta["drawer-push-left"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer contained variant="push" data-drawer="drawer-3" width="320px" side="left" height="45dvh">
            <div slot="page" class="page-main workspace-demo-canvas">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right" size="medium">
                  <mui-button variant="tertiary" slot="action"><mui-icon-menu size="medium"></mui-icon-menu></mui-button>
                  <mui-menu width="min(100%, 14rem)">
                    <mui-button variant="tertiary" data-drawer="drawer-3">Edit Details</mui-button>
                    <mui-button disabled variant="tertiary">Add line-item</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </div>
              <div class="page-content">
                ${invoice}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Customer" value="Hank Barry"></mui-input>
                <mui-input label="Invoice ID" value="IV001"></mui-input>
                <mui-input label="Purchase ID" value="9900"></mui-input>
                <mui-input label="Issued" value="16/10/2025"></mui-input>
                <mui-input label="Due" value="15/11/2025"></mui-input>
                <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" data-close size="small">Cancel</mui-button>
            <mui-button slot="actions" variant="primary" size="small">Save</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer contained variant="push" data-drawer="hook" width="320px" side="left"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-push-left-resize-rail"
        title="${storyMeta["drawer-push-left-resize-rail"].title}"
        description="${storyMeta["drawer-push-left-resize-rail"].description}"
        usage="${storyMeta["drawer-push-left-resize-rail"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer
            contained
            variant="push"
            resize-rail
            drawer-space
            resize-min-drawer-width="240"
            resize-min-page-width="320"
            resize-close-threshold="96"
            open
            data-desktop-open
            data-drawer-toggle="drawer-resize-left-rail"
            height="45rem"
            width="260px"
            side="left">
            <div slot="page" class="page-main resize-page-main workspace-demo-canvas">
              <div class="canvas-page-header">
                <mui-h-stack space="var(--space-050)" alignY="center">
                  <mui-button variant="tertiary" size="small" data-drawer-toggle="drawer-resize-left-rail">
                    <mui-icon-rectangle-left-drawer size="small"></mui-icon-rectangle-left-drawer>
                  </mui-button>
                  <mui-heading size="5" level="1">Page 1</mui-heading>
                </mui-h-stack>
              </div>
              <div class="page-content resize-page-content">
                <mui-v-stack space="var(--space-400)">
                  <div class="resize-test-grid">
                    <mui-card>
                      <mui-card-body>
                        <mui-v-stack space="var(--space-200)">
                          <mui-heading size="5" level="5">Page Minimum</mui-heading>
                          <mui-body size="small">Set a minimum page width.</mui-body>
                          <mui-code wrap size="x-small">resize-min-page-width</mui-code>
                        </mui-v-stack>
                      </mui-card-body>
                    </mui-card>
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Drawer Width</mui-heading>
                        <mui-body size="small">Default width of the Drawer.</mui-body>
                        <mui-code wrap size="x-small">E.g. width="260px"</mui-code>
                      </mui-v-stack>
                    </div>
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Drawer Minimum</mui-heading>
                        <mui-body size="small">Set the min-width of the Drawer.</mui-body>
                        <mui-code wrap size="x-small">resize-min-drawer-width</mui-code>
                      </mui-v-stack>
                    </div>
                  </div>
                </mui-v-stack>
              </div>
            </div>
            <mui-h-stack class="canvas-drawer-header" space="var(--space-200)" alignx="space-between" aligny="center" width="100%">
              <mui-dropdown position="left" size="medium">
                <mui-button slot="action" aria-label="Open Mike profile menu">
                  <mui-avatar size="small" image="/src/muibook/images/mui/avatar-mike.jpg" label="Mike Trilford"></mui-avatar>
                </mui-button>
                <mui-menu width="min(100%, 14rem)">
                  <mui-button size="small" variant="tertiary">Profile</mui-button>
                  <mui-button size="small" variant="tertiary">Settings</mui-button>
                  <mui-button size="small" variant="tertiary">Sign out</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-button size="small" variant="primary">Share</mui-button>
            </mui-h-stack>

            <mui-v-stack space="var(--space-400)" style="padding: var(--space-400)">
              <mui-h-stack alignx="space-between" aligny="center">
                <mui-body size="small">Styles</mui-body>
                <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
              </mui-h-stack>
              <mui-rule></mui-rule>
              <mui-h-stack alignx="space-between" aligny="center">
                <mui-body size="small">Export</mui-body>
                <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
              </mui-h-stack>
              <mui-rule></mui-rule>
            </mui-v-stack>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer<br>
          &nbsp;&nbsp;contained<br>
          &nbsp;&nbsp;variant="push"<br>
          &nbsp;&nbsp;resize-rail<br>
          &nbsp;&nbsp;resize-min-drawer-width="240"<br>
          &nbsp;&nbsp;resize-min-page-width="320"<br>
          &nbsp;&nbsp;resize-close-threshold="96"<br>
          &nbsp;&nbsp;open<br>
          &nbsp;&nbsp;height="45rem"<br>
          &nbsp;&nbsp;width="260px"<br>
          &nbsp;&nbsp;side="left"&gt;<br>
          &nbsp;&nbsp;&lt;div slot="page" style="min-width: 0; container-type: inline-size;"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="min-width: 0; overflow: auto;"&gt;...&lt;/div&gt;<br>
          &nbsp;&nbsp;&lt;/div&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-persistent-left-resize-rail"
        title="${storyMeta["drawer-persistent-left-resize-rail"].title}"
        description="${storyMeta["drawer-persistent-left-resize-rail"].description}"
        usage="${storyMeta["drawer-persistent-left-resize-rail"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer
            contained
            variant="persistent"
            resize-rail
            drawer-space
            resize-min-drawer-width="240"
            resize-min-page-width="320"
            height="45rem"
            data-drawer-toggle="drawer-persistent-left-rail"
            width="260px"
            side="left">
            <div slot="page" class="page-main resize-page-main workspace-demo-canvas">
              <div class="canvas-page-header">
                <mui-h-stack space="var(--space-050)" alignY="center">
                  <mui-responsive breakpoint="768">
                    <mui-button slot="show-below" variant="tertiary" size="small" data-drawer-toggle="drawer-persistent-left-rail">
                      <mui-icon-rectangle-left-drawer size="small"></mui-icon-rectangle-left-drawer>
                    </mui-button>
                  </mui-responsive>
                  <mui-heading size="5" level="1">Page 1</mui-heading>
                </mui-h-stack>
              </div>
              <div class="page-content resize-page-content">
                <mui-v-stack space="var(--space-400)">
                  <div class="resize-test-grid">
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Page Minimum</mui-heading>
                        <mui-body size="small">Set a minimum page width.</mui-body>
                        <mui-code wrap size="x-small">resize-min-page-width</mui-code>
                      </mui-v-stack>
                    </div>
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Drawer Width</mui-heading>
                        <mui-body size="small">Default width of the Drawer.</mui-body>
                        <mui-code wrap size="x-small">E.g. width="260px"</mui-code>
                      </mui-v-stack>
                    </div>
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Drawer Minimum</mui-heading>
                        <mui-body size="small">Set the min-width of the Drawer.</mui-body>
                        <mui-code wrap size="x-small">resize-min-drawer-width</mui-code>
                      </mui-v-stack>
                    </div>
                  </div>
                </mui-v-stack>
              </div>
            </div>
            <mui-h-stack class="canvas-drawer-header" space="var(--space-200)" alignx="space-between" aligny="center" width="100%">
              <mui-dropdown position="left" size="medium">
                <mui-button slot="action" aria-label="Open Mike profile menu">
                  <mui-avatar size="small" image="/src/muibook/images/mui/avatar-mike.jpg" label="Mike Trilford"></mui-avatar>
                </mui-button>
                <mui-menu width="min(100%, 14rem)">
                  <mui-button size="small" variant="tertiary">Profile</mui-button>
                  <mui-button size="small" variant="tertiary">Settings</mui-button>
                  <mui-button size="small" variant="tertiary">Sign out</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-button size="small" variant="primary">Share</mui-button>
            </mui-h-stack>

            <mui-v-stack space="var(--space-400)" style="padding: var(--space-400)">
              <mui-h-stack alignx="space-between" aligny="center">
                <mui-body size="small">Styles</mui-body>
                <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
              </mui-h-stack>
              <mui-rule></mui-rule>
              <mui-h-stack alignx="space-between" aligny="center">
                <mui-body size="small">Export</mui-body>
                <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
              </mui-h-stack>
              <mui-rule></mui-rule>
            </mui-v-stack>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer<br>
          &nbsp;&nbsp;contained<br>
          &nbsp;&nbsp;variant="persistent"<br>
          &nbsp;&nbsp;resize-rail<br>
          &nbsp;&nbsp;resize-min-drawer-width="240"<br>
          &nbsp;&nbsp;resize-min-page-width="320"<br>
          &nbsp;&nbsp;height="45rem"<br>
          &nbsp;&nbsp;data-drawer-toggle="hook"<br>
          &nbsp;&nbsp;width="260px"<br>
          &nbsp;&nbsp;side="left"&gt;<br>
          &nbsp;&nbsp;&lt;div slot="page" style="min-width: 0; container-type: inline-size;"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="min-width: 0; overflow: auto;"&gt;...&lt;/div&gt;<br>
          &nbsp;&nbsp;&lt;/div&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
       id="drawer-persistent-left"
        title="${storyMeta["drawer-persistent-left"].title}"
        description="${storyMeta["drawer-persistent-left"].description}"
        usage="${storyMeta["drawer-persistent-left"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer contained variant="persistent" width="320px" slot="body" side="left" data-drawer-toggle="drawer-persistent-left-demo" height="45dvh">
            <div slot="page" class="page-main workspace-demo-canvas">
              <div class="page-header">
                <mui-h-stack space="var(--space-050)" alignY="center">
                  <mui-responsive breakpoint="768">
                    <mui-button slot="show-below" variant="tertiary" size="small" data-drawer-toggle="drawer-persistent-left-demo">
                    <mui-icon-rectangle-left-drawer size="small"></mui-icon-rectangle-left-drawer>
                    </mui-button>
                  </mui-responsive>
                  <mui-heading size="4" level="4">Smart Bills</mui-heading>
                </mui-h-stack>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Review Items</mui-heading>

            ${reviewStepper}

            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Item" value="Hank Barry"></mui-input>
                <mui-input label="Description" value="Telstra Upfront 5G Internet"></mui-input>
                <mui-input label="Allocate to" value="Internet"></mui-input>
                <mui-input label="Qty" value="1"></mui-input>
                <mui-input label="Unit price" value="85.50"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" size="small">Back</mui-button>
            <mui-button slot="actions" variant="primary" size="small">Next</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer contained variant="persistent" width="320px" side="left" data-drawer-toggle="hook"&gt;<br>
            &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-push-right"
        title="${storyMeta["drawer-push-right"].title}"
        description="${storyMeta["drawer-push-right"].description}"
        usage="${storyMeta["drawer-push-right"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer contained slot="body" variant="push" data-drawer="drawer-4" width="320px" side="right" height="45dvh">
            <div slot="page" class="page-main workspace-demo-canvas">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right" size="medium">
                  <mui-button variant="tertiary" slot="action"><mui-icon-menu size="medium"></mui-icon-menu></mui-button>
                  <mui-menu width="min(100%, 14rem)">
                    <mui-button variant="tertiary" data-drawer="drawer-4">Edit Details</mui-button>
                    <mui-button disabled variant="tertiary">Add line-item</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </div>
              <div class="page-content">
                ${invoice}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Customer" value="Hank Barry"></mui-input>
                <mui-input label="Invoice ID" value="IV001"></mui-input>
                <mui-input label="Purchase ID" value="9900"></mui-input>
                <mui-input label="Issued" value="16/10/2025"></mui-input>
                <mui-input label="Due" value="15/11/2025"></mui-input>
                <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" data-close size="small">Cancel</mui-button>
            <mui-button slot="actions" variant="primary" size="small">Save</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer contained variant="push" data-drawer="hook" width="320px" side="right"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>


      <story-card
        id="drawer-push-right-resize-rail"
        title="${storyMeta["drawer-push-right-resize-rail"].title}"
        description="${storyMeta["drawer-push-right-resize-rail"].description}"
        usage="${storyMeta["drawer-push-right-resize-rail"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer
            contained
            variant="push"
            drawer-space
            resize-rail
            resize-min-drawer-width="240"
            resize-min-page-width="320"
            resize-close-threshold="96"
            open
            data-desktop-open
            data-drawer-toggle="drawer-resize-right-rail"
            height="45rem"
            width="260px"
            side="right">
            <div slot="page" class="page-main resize-page-main workspace-demo-canvas">
              <div class="canvas-page-header">
                <mui-h-stack space="var(--space-300)" alignY="center" style="padding-left: var(--space-100);">
                  <mui-heading size="4" level="4">Page 1</mui-heading>
                </mui-h-stack>
                <mui-button variant="tertiary" size="small" data-drawer-toggle="drawer-resize-right-rail">
                  <mui-icon-rectangle-left-drawer size="small"></mui-icon-rectangle-left-drawer>
                </mui-button>
              </div>
              <div class="page-content resize-page-content">
                <mui-v-stack space="var(--space-400)">
                  <div class="resize-test-grid">
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Page Minimum</mui-heading>
                        <mui-body size="small">Set a minimum page width.</mui-body>
                        <mui-code wrap size="x-small">resize-min-page-width</mui-code>
                      </mui-v-stack>
                    </div>
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Drawer Width</mui-heading>
                        <mui-body size="small">Default width of the Drawer.</mui-body>
                        <mui-code wrap size="x-small">E.g. width="260px"</mui-code>
                      </mui-v-stack>
                    </div>
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Drawer Minimum</mui-heading>
                        <mui-body size="small">Set the min-width of the Drawer.</mui-body>
                        <mui-code wrap size="x-small">resize-min-drawer-width</mui-code>
                      </mui-v-stack>
                    </div>
                  </div>
                </mui-v-stack>
              </div>
            </div>

            <mui-h-stack class="canvas-drawer-header" space="var(--space-200)" alignx="space-between" aligny="center" width="100%">
              <mui-dropdown position="left" size="medium">
                <mui-button slot="action" aria-label="Open Mike profile menu">
                  <mui-avatar size="small" image="/src/muibook/images/mui/avatar-mike.jpg" label="Mike Trilford"></mui-avatar>
                </mui-button>
                <mui-menu width="min(100%, 14rem)">
                  <mui-button size="small" variant="tertiary">Profile</mui-button>
                  <mui-button size="small" variant="tertiary">Settings</mui-button>
                  <mui-button size="small" variant="tertiary">Sign out</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-button size="small" variant="primary">Share</mui-button>
            </mui-h-stack>

            <mui-v-stack space="var(--space-400)" style="padding: var(--space-400)">
              <mui-h-stack alignx="space-between" aligny="center">
                <mui-body size="small">Styles</mui-body>
                <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
              </mui-h-stack>
              <mui-rule></mui-rule>
              <mui-h-stack alignx="space-between" aligny="center">
                <mui-body size="small">Export</mui-body>
                <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
              </mui-h-stack>
              <mui-rule></mui-rule>
            </mui-v-stack>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer<br>
          &nbsp;&nbsp;contained<br>
          &nbsp;&nbsp;variant="push"<br>
          &nbsp;&nbsp;resize-rail<br>
          &nbsp;&nbsp;resize-min-drawer-width="240"<br>
          &nbsp;&nbsp;resize-min-page-width="320"<br>
          &nbsp;&nbsp;resize-close-threshold="96"<br>
          &nbsp;&nbsp;open<br>
          &nbsp;&nbsp;height="45rem"<br>
          &nbsp;&nbsp;width="260px"<br>
          &nbsp;&nbsp;side="right"&gt;<br>
          &nbsp;&nbsp;&lt;div slot="page" style="min-width: 0; container-type: inline-size;"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="min-width: 0; overflow: auto;"&gt;...&lt;/div&gt;<br>
          &nbsp;&nbsp;&lt;/div&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-persistent-right-resize-rail"
        title="${storyMeta["drawer-persistent-right-resize-rail"].title}"
        description="${storyMeta["drawer-persistent-right-resize-rail"].description}"
        usage="${storyMeta["drawer-persistent-right-resize-rail"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer
            contained
            variant="persistent"
            drawer-space
            resize-rail
            resize-min-drawer-width="240"
            resize-min-page-width="320"
            height="45rem"
            data-drawer-toggle="drawer-persistent-right-rail"
            width="260px"
            side="right">
            <div slot="page" class="page-main resize-page-main workspace-demo-canvas">
              <div class="canvas-page-header">
                <mui-h-stack space="var(--space-300)" alignY="center" style="padding-left: var(--space-100);">
                  <mui-heading size="4" level="4">Page 1</mui-heading>
                </mui-h-stack>
                <mui-responsive breakpoint="768">
                  <mui-button slot="show-below" variant="tertiary" size="small" data-drawer-toggle="drawer-persistent-right-rail">
                    <mui-icon-rectangle-left-drawer size="small"></mui-icon-rectangle-left-drawer>
                  </mui-button>
                </mui-responsive>
              </div>
              <div class="page-content resize-page-content">
                <mui-v-stack space="var(--space-400)">
                  <div class="resize-test-grid">
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Page Minimum</mui-heading>
                        <mui-body size="small">Set a minimum page width.</mui-body>
                        <mui-code wrap size="x-small">resize-min-page-width</mui-code>
                      </mui-v-stack>
                    </div>
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Drawer Width</mui-heading>
                        <mui-body size="small">Default width of the Drawer.</mui-body>
                        <mui-code wrap size="x-small">E.g. width="260px"</mui-code>
                      </mui-v-stack>
                    </div>
                    <div class="resize-test-panel">
                      <mui-v-stack space="var(--space-200)">
                        <mui-heading size="5" level="5">Drawer Minimum</mui-heading>
                        <mui-body size="small">Set the min-width of the Drawer.</mui-body>
                        <mui-code wrap size="x-small">resize-min-drawer-width</mui-code>
                      </mui-v-stack>
                    </div>
                  </div>
                </mui-v-stack>
              </div>
            </div>

            <mui-h-stack class="canvas-drawer-header" space="var(--space-200)" alignx="space-between" aligny="center" width="100%">
              <mui-dropdown position="left" size="medium">
                <mui-button slot="action" aria-label="Open Mike profile menu">
                  <mui-avatar size="small" image="/src/muibook/images/mui/avatar-mike.jpg" label="Mike Trilford"></mui-avatar>
                </mui-button>
                <mui-menu width="min(100%, 14rem)">
                  <mui-button size="small" variant="tertiary">Profile</mui-button>
                  <mui-button size="small" variant="tertiary">Settings</mui-button>
                  <mui-button size="small" variant="tertiary">Sign out</mui-button>
                </mui-menu>
              </mui-dropdown>
              <mui-button size="small" variant="primary">Share</mui-button>
            </mui-h-stack>

            <mui-v-stack space="var(--space-400)" style="padding: var(--space-400)">
              <mui-h-stack alignx="space-between" aligny="center">
                <mui-body size="small">Styles</mui-body>
                <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
              </mui-h-stack>
              <mui-rule></mui-rule>
              <mui-h-stack alignx="space-between" aligny="center">
                <mui-body size="small">Export</mui-body>
                <mui-button size="x-small" variant="tertiary"><mui-icon-add></mui-icon-add></mui-button>
              </mui-h-stack>
              <mui-rule></mui-rule>
            </mui-v-stack>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer<br>
          &nbsp;&nbsp;contained<br>
          &nbsp;&nbsp;variant="persistent"<br>
          &nbsp;&nbsp;resize-rail<br>
          &nbsp;&nbsp;resize-min-drawer-width="240"<br>
          &nbsp;&nbsp;resize-min-page-width="320"<br>
          &nbsp;&nbsp;height="45rem"<br>
          &nbsp;&nbsp;data-drawer-toggle="hook"<br>
          &nbsp;&nbsp;width="260px"<br>
          &nbsp;&nbsp;side="right"&gt;<br>
          &nbsp;&nbsp;&lt;div slot="page" style="min-width: 0; container-type: inline-size;"&gt;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;div style="min-width: 0; overflow: auto;"&gt;...&lt;/div&gt;<br>
          &nbsp;&nbsp;&lt;/div&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-persistent-right"
        title="${storyMeta["drawer-persistent-right"].title}"
        description="${storyMeta["drawer-persistent-right"].description}"
        usage="${storyMeta["drawer-persistent-right"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer contained variant="persistent" width="320px" slot="body" side="right" data-drawer-toggle="drawer-persistent-right-demo" height="45dvh">
            <div slot="page" class="page-main workspace-demo-canvas">
              <div class="page-header">
                <mui-heading size="4" level="4">Smart Bills</mui-heading>
                <mui-responsive breakpoint="768">
                  <mui-button slot="show-below" variant="tertiary" size="small" data-drawer-toggle="drawer-persistent-right-demo">
                    <mui-icon-rectangle-left-drawer size="small"></mui-icon-rectangle-left-drawer>
                  </mui-button>
                </mui-responsive>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Review Items</mui-heading>

            ${reviewStepper}

            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Item" value="Hank Barry"></mui-input>
                <mui-input label="Description" value="Telstra Upfront 5G Internet"></mui-input>
                <mui-input label="Allocate to" value="Internet"></mui-input>
                <mui-input label="Qty" value="1"></mui-input>
                <mui-input label="Unit price" value="85.50"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" size="small">Back</mui-button>
            <mui-button slot="actions" variant="primary" size="small">Next</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer contained variant="persistent" width="320px" side="right" data-drawer-toggle="hook"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
       id="drawer-menu"
        title="${storyMeta["drawer-menu"].title}"
        description="${storyMeta["drawer-menu"].description}"
        usage="${storyMeta["drawer-menu"].usage}"
      >
        <div class="canvas" slot="body">
          <mui-drawer contained variant="push" width="260px" side="left" data-drawer="hook" drawer-space="none" height="45dvh">
            <div slot="page" class="page-main workspace-demo-canvas">
              <div class="page-header">
                <mui-h-stack space="var(--space-200)" alignY="center">
                  <mui-button variant="tertiary" data-drawer="hook">
                    <mui-icon-menu size="medium"></mui-icon-menu>
                  </mui-button>
                  <mui-heading size="4" level="4">Premium</mui-heading>
                </mui-h-stack>
              </div>
              <div class="page-content">
                ${bill}
              </div>
            </div>
            <mui-h-stack slot="title" space="var(--space-100)" alignY="center">
              <guides-logo style="width: 24px;"></guides-logo>
              <mui-heading size="4" level="4">Guru</mui-heading>
            </mui-h-stack>

            ${menuBillItems}
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer contained variant="push" width="320px" side="left" data-drawer="hook" drawer-space="none"&gt;<br>
            &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
       id="drawer-advanced-menu"
        title="${storyMeta["drawer-advanced-menu"].title}"
        description="${storyMeta["drawer-advanced-menu"].description}"
        usage="${storyMeta["drawer-advanced-menu"].usage}"
      >
        <div class="canvas" slot="body">

          <div class="page-header" style="padding-left: var(--space-400);">
            <mui-h-stack space="var(--space-300)" alignY="center">

              <mui-responsive breakpoint="768">
                <mui-button slot="show-above" variant="tertiary" data-drawer-toggle="custom-header-toggle">
                  <mui-icon-menu size="medium"></mui-icon-menu>
                </mui-button>
                <mui-button slot="show-below" variant="tertiary" data-drawer="custom-header-overlay">
                  <mui-icon-menu size="medium"></mui-icon-menu>
                </mui-button>
              </mui-responsive>

              <mui-h-stack space="var(--space-100)" alignY="center">
                <guides-logo style="width: 24px;"></guides-logo>
                <mui-heading size="4" level="4">Guru</mui-heading>
              </mui-h-stack>
            </mui-h-stack>
          </div>

          <mui-responsive breakpoint="768">

            <mui-drawer
              contained
              slot="show-above"
              variant="push"
              width="260px"
              side="left"
              data-drawer-toggle="custom-header-toggle"
              drawer-space="none"
              height="45dvh"
            >
              ${menuItems}
              <div slot="page" class="page-main workspace-demo-canvas">
                <div class="page-content">
                  ${bill}
                </div>
              </div>

            </mui-drawer>

            <div slot="show-below">
              <mui-drawer
                variant="overlay"
                width="260px"
                side="left"
                data-drawer="custom-header-overlay"
                drawer-space="none"
              >

              <mui-h-stack space="var(--space-300)" alignY="center" style="padding: var(--space-300) var(--space-500) var(--space-300) var(--space-400)">
                <mui-button variant="tertiary" data-close>
                  <mui-icon-menu size="medium"></mui-icon-menu>
                </mui-button>
                <mui-h-stack space="var(--space-100)" alignY="center">
                  <guides-logo style="width: 24px;"></guides-logo>
                  <mui-heading size="4" level="4">Guides</mui-heading>
                </mui-h-stack>
              </mui-h-stack>

                ${menuItems}
              </mui-drawer>
              <div class="page-main">
                <div class="page-content">
                  ${bill}
                </div>
              </div>
            </div>

          </mui-responsive>

        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer contained variant="push" width="320px" side="left" data-drawer-toggle="hook" drawer-space="none"&gt;<br>
            &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

      <story-card
        id="drawer-breakpoint"
        title="${storyMeta["drawer-breakpoint"].title}"
        description="${storyMeta["drawer-breakpoint"].description}"
        usage="${storyMeta["drawer-breakpoint"].usage}"

      >
        <div class="canvas" slot="body">
          <mui-drawer contained slot="body" variant="push" breakpoint="1500" data-drawer="breakpoint" width="320px" side="right" height="45dvh">
            <div slot="page" class="page-main workspace-demo-canvas">
              <div class="page-header">
                ${invoiceHeader}
                <mui-dropdown position="right" size="medium">
                  <mui-button variant="tertiary" slot="action"><mui-icon-menu size="medium"></mui-icon-menu></mui-button>
                  <mui-menu width="min(100%, 14rem)">
                    <mui-button variant="tertiary" data-drawer="breakpoint">Edit Details</mui-button>
                    <mui-button disabled variant="tertiary">Add line-item</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </div>
              <div class="page-content">
                ${invoice}
              </div>
            </div>
            <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
            <form>
              <mui-v-stack space="var(--space-400)">
                <mui-input label="Customer" value="Hank Barry"></mui-input>
                <mui-input label="Invoice ID" value="IV001"></mui-input>
                <mui-input label="Purchase ID" value="9900"></mui-input>
                <mui-input label="Issued" value="16/10/2025"></mui-input>
                <mui-input label="Due" value="15/11/2025"></mui-input>
                <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
              </mui-v-stack>
            </form>
            <mui-button slot="actions" variant="tertiary" data-close size="small">Cancel</mui-button>
            <mui-button slot="actions" variant="primary" size="small">Save</mui-button>
          </mui-drawer>
        </div>
        <story-code-block slot="footer" scrollable>
          &lt;mui-drawer contained variant="push" data-drawer="hook" width="320px" side="right"&gt;<br>
          &nbsp;&nbsp;...<br>
          &lt;/mui-drawer&gt;
        </story-code-block>
      </story-card>

    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github}"
        figma="${data.figma}"
        guides="${data.guides}"
        storybook="${data.storybook}"
        accessibility="${data.accessibility.engineerList.join("|||")}"
        attrs-reference='${attrsReference}'

        imports='["@muibook/components/mui-drawer"]'>
        <story-quicklinks
          slot="message"
          heading="Quicklinks"
          limit="10"
          links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"
        ></story-quicklinks>

        ${stories}
      </story-template>
    `;

    // Open drawer buttons
    this.shadowRoot.querySelectorAll("mui-button[data-drawer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-drawer");
        const drawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer="${target}"]`);
        if (drawer) drawer.setAttribute("open", "");
      });
    });

    // Close buttons inside each drawer
    this.shadowRoot.querySelectorAll("mui-drawer[data-drawer]").forEach((drawer) => {
      drawer.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => drawer.removeAttribute("open"));
      });
    });

    // Toggle drawer buttons
    this.shadowRoot
      .querySelectorAll(
        "mui-button[data-drawer-toggle], mui-button[data-drawer-toggle-left], mui-button[data-drawer-toggle-right]",
      )
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const explicitLeftTarget = btn.getAttribute("data-drawer-toggle-left");
          const explicitRightTarget = btn.getAttribute("data-drawer-toggle-right");
          const target = btn.getAttribute("data-drawer-toggle") || explicitLeftTarget || explicitRightTarget;
          const drawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer-toggle="${target}"]`);
          const leftDrawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer-toggle-left="${target}"]`);
          const rightDrawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer-toggle-right="${target}"]`);
          const workspaceSide =
            explicitLeftTarget || (!drawer && leftDrawer)
              ? "left"
              : explicitRightTarget || (!drawer && rightDrawer)
                ? "right"
                : null;
          const workspaceDrawer =
            workspaceSide === "left" ? leftDrawer : workspaceSide === "right" ? rightDrawer : null;

          if (workspaceDrawer && workspaceSide) {
            if (workspaceDrawer.hasAttribute("mobile")) {
              if (workspaceDrawer.hasAttribute("open") && workspaceDrawer.getAttribute("side") === workspaceSide) {
                workspaceDrawer.removeAttribute("open");
              } else {
                workspaceDrawer.setAttribute("side", workspaceSide);
                workspaceDrawer.setAttribute("open", "");
              }
              return;
            }

            workspaceDrawer.toggleAttribute(`${workspaceSide}-open`);
            return;
          }

          if (!drawer) return;

          if (drawer.hasAttribute("open")) {
            drawer.removeAttribute("open");
          } else {
            drawer.setAttribute("open", "");
          }
        });
      });

    const desktopOpenQuery = window.matchMedia("(min-width: 769px)");
    const syncDesktopOpenDrawers = () => {
      this.shadowRoot.querySelectorAll("mui-drawer[data-desktop-open]").forEach((drawer) => {
        drawer.toggleAttribute("open", desktopOpenQuery.matches);
      });
    };

    syncDesktopOpenDrawers();
    desktopOpenQuery.addEventListener("change", syncDesktopOpenDrawers);

    // Sync inert property for workspace buttons
    const workspaceDrawers = this.shadowRoot.querySelectorAll('mui-drawer[variant="workspace"]');
    if (workspaceDrawers.length > 0) {
      const syncInert = (drawer) => {
        const isMobile = drawer.hasAttribute("mobile");
        const leftBtn = drawer.querySelector(".left-panel-open-btn");
        if (leftBtn) {
          leftBtn.inert = !isMobile && drawer.hasAttribute("left-open");
        }
        const rightBtn = drawer.querySelector(".right-panel-open-btn");
        if (rightBtn) {
          rightBtn.inert = !isMobile && drawer.hasAttribute("right-open");
        }
      };

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes") {
            syncInert(mutation.target);
          }
        });
      });

      workspaceDrawers.forEach((drawer) => {
        observer.observe(drawer, {
          attributes: true,
          attributeFilter: ["left-open", "right-open", "mobile"],
        });
        syncInert(drawer);
      });
    }

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    this.shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = this.shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("story-drawer", storyDrawer);
