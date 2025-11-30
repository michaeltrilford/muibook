import C from "../../../../images/jal/crystal.png";
import D from "../../../../images/jal/diamond.png";

class storyDrawerVideo extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 101;
        background: var(--surface);
        overflow-y: scroll;
      }

      .filter-action::part(height) { height: 4rem; width: 4rem; } 
      .video-menu-item,
      .video-menu-more,
      .video-menu-group-heading { text-align: left; }

      .video-menu-more {
        margin-top: var(--space-200);
      }

      .video-menu-group-heading {
        margin-bottom: var(--space-200);
      }

      .filter { display: grid; width: 100%; position: relative; }
      .filter_chip-scroll { 
        padding: var(--space-600) 6.4rem var(--space-500) var(--space-500); 
        overflow-x: auto;
      }
      .filter_chip-group {
        width: max-content; 
      }
      .filter_next { 
        background: var(--surface-elevated-200); 
        position: absolute; 
        right: 0; 
        top: var(--space-600); 
        box-shadow: calc(-1 * var(--space-400)) 0 var(--space-200) 0 var(--surface-elevated-200); 
        padding-right: var(--space-500);
      }  
      
      .card_content { padding-left: var(--space-100); }
      .card:hover {
        background: var(--surface-elevated-100);
        transition: box-shadow var(--speed-100);
        box-shadow: 0 0 0 var(--space-400) var(--surface-elevated-100);
        border-top-left-radius: var(--radius-300);
        border-top-right-radius: var(--radius-300);
        border-bottom-left-radius: var(--radius-100);
        border-bottom-right-radius: var(--radius-100);
        cursor: pointer;
      }

      .page {
        height: calc(100dvh - 7.7rem);
      }

      .video_grid {
        width: 100%; 
        padding: var(--space-500); 
        padding-top: var(--space-200);
        box-sizing: border-box;
      }

      .video-menu-group {
        width: 100%;
      }
      .video-menu-group::part(padding) {
        padding: var(--space-300) var(--space-200);
      }

      @media (min-width: 768px) {
        .filter_chip-scroll {
          padding: var(--space-600) 8.8rem var(--space-500) var(--space-700); 
        }

        .filter_next { 
          padding-right: var(--space-700);
        }  

        .video_grid {
          width: 100%;
          padding: var(--space-700); 
          padding-top: var(--space-200);
        }

      }

    `;

    const videoPageContent = /*html*/ `
      <mui-v-stack slot="page" class="page" space="var(--space-000)" alignx="stretch" aligny="start">
        <div class="filter">
          <div class="filter_next">
            <mui-button variant="tertiary" class="filter-action" aria-label="Next filters">
              <mui-icon-right-chevron size="small"></mui-icon-right-chevron>
            </mui-button>
          </div>
          <div class="filter_chip-scroll">
            <mui-grid 
              class="filter_chip-group"
              col="repeat(14, auto)" 
              alignx="start" 
              aligny="center" 
              space="var(--space-200)"
            >
              <mui-chip active>
                <mui-body size="small" variant="default" weight="bold">All</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Gaming</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Podcasts</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Thrillers</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Marco Pierre White</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Italian cuisine</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Roasting</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Music</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Satire</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Hamburgers</mui-body>
              </mui-chip>
              <mui-chip>
                <mui-body size="small" variant="default" weight="bold">Japan</mui-body>
              </mui-chip>
            </mui-grid>
          </div>
        </div>
        <mui-grid
          class="video_grid"
          alignx="start"
          aligny="start"
          space="var(--space-600)"
          col="repeat(auto-fit, minmax(268px, 1fr))"
        >
          <mui-v-stack alignx="start" aligny="start" space="var(--space-300)" class="card">
            <mui-image variants="image"><img slot="image" src="${D}" alt="Urban Photography Tips" /></mui-image>
            <mui-h-stack alignx="start" aligny="start" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
              <mui-v-stack class="card_content" alignx="start" aligny="start" space="var(--space-025)" style="border-radius: var(--radius-000); width: 100%;">
                <mui-body size="large" variant="default" weight="bold">Urban Photography Tips</mui-body>
                <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
                  <mui-body size="x-small" variant="default" weight="bold">LensMaster</mui-body>
                  <mui-body size="x-small" variant="default" weight="bold">120K views • 2 days ago</mui-body>
                </mui-v-stack>
              </mui-v-stack>
            </mui-h-stack>
          </mui-v-stack>
          <mui-v-stack alignx="start" aligny="start" space="var(--space-300)" class="card">
            <mui-image variants="image"><img slot="image" src="${C}" alt="Beginner Yoga Routine" /></mui-image>
            <mui-h-stack alignx="start" aligny="start" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
              <mui-v-stack class="card_content" alignx="start" aligny="start" space="var(--space-025)" style="border-radius: var(--radius-000); width: 100%;">
                <mui-body size="large" variant="default" weight="bold">Beginner Yoga Routine</mui-body>
                <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
                  <mui-body size="x-small" variant="default" weight="bold">Flex & Flow</mui-body>
                  <mui-body size="x-small" variant="default" weight="bold">980K views • 1 week ago</mui-body>
                </mui-v-stack>
              </mui-v-stack>
            </mui-h-stack>
          </mui-v-stack>
        </mui-grid>
      </mui-v-stack>
    `;

    const videoMenuItems = /*html*/ `
      <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); background: var(--surface-elevated-100);">

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
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Library">
            <mui-slat-accessory slot="before">
              <mui-icon-left-sidebar size="x-small"></mui-icon-left-sidebar>
            </mui-slat-accessory>
            Outdoors
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="History">
            <mui-slat-accessory slot="before">
              <mui-icon-music-microphone size="x-small"></mui-icon-music-microphone>
            </mui-slat-accessory>
            Music
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Your Videos">
            <mui-slat-accessory slot="before">
              <mui-icon-music-microphone size="x-small"></mui-icon-music-microphone>
            </mui-slat-accessory>
            Sauce
          </mui-button>
          <mui-button variant="tertiary" size="small" class="video-menu-more" aria-label="Show more">
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
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Library">
            <mui-icon-list-and-film slot="before"></mui-icon-list-and-film>
            Playlists
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="History">
            <mui-icon-play-rectangle slot="before"></mui-icon-play-rectangle>
            Your videos
          </mui-button>
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Your Videos">
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
          <mui-button variant="tertiary" class="video-menu-item" aria-label="Trending">
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

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div class="fullscreen">
        <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" style="background: var(--surface-elevated-200);" slot="body">
          <mui-h-stack style="padding: var(--space-400); border-radius: var(--radius-000); background: var(--surface-elevated-100); border-bottom: var(--stroke-size-100) solid var(--border-color);" alignx="space-between" aligny="center">
            <mui-h-stack alignx="start" aligny="center" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000);">
              <mui-responsive breakpoint="768">
                <mui-button slot="showAbove" variant="tertiary" aria-label="Open menu" size="medium" data-drawer-toggle="video-header-toggle">
                  <mui-icon-menu size="small"></mui-icon-menu>
                </mui-button>
                <mui-button slot="showBelow" variant="tertiary" aria-label="Open menu" size="medium" data-drawer="video-header-overlay">
                  <mui-icon-menu size="small"></mui-icon-menu>
                </mui-button>
              </mui-responsive>
              <mui-h-stack alignx="start" aligny="center" space="var(--space-200)" style="padding: var(--space-000) var(--space-200) var(--space-000) var(--space-200); border-radius: var(--radius-000);">
                <mui-heading level="3" size="3">Premium</mui-heading>
                <mui-badge variant="neutral">AU</mui-badge>
              </mui-h-stack>
            </mui-h-stack>
            <mui-responsive breakpoint="768" style="max-width: 70rem; width: 100%;">
              <mui-h-stack slot="showAbove" alignx="center" aligny="center" space="var(--space-300)" style="padding: var(--space-000) var(--space-300) var(--space-000) var(--space-300); width: 100%;">
                <mui-input content="placeholder" state="default" variant="default" placeholder="Search">
                  <mui-button variant="secondary" slot="after" aria-label="Search">
                    <mui-icon-right-chevron></mui-icon-right-chevron>
                  </mui-button>
                </mui-input>
                <mui-button variant="tertiary" aria-label="Settings">
                  <mui-icon-gear></mui-icon-gear>
                </mui-button>
              </mui-h-stack>
            </mui-responsive>
            <mui-h-stack alignx="start" aligny="center" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000);">
              <mui-button variant="primary">Create</mui-button>
              <mui-button variant="tertiary" aria-label="Notifications">
                <mui-icon-notification></mui-icon-notification>
              </mui-button>
            </mui-h-stack>
          </mui-h-stack>
          <mui-responsive breakpoint="768">
            <mui-drawer width="240px" variant="push" data-drawer="default" drawer-space="none" open side="left" slot="showAbove" data-drawer-toggle="video-header-toggle">
              ${videoMenuItems}
              ${videoPageContent}
            </mui-drawer>
            <div slot="showBelow">
              <mui-drawer 
                variant="overlay" 
                width="260px" 
                side="left" 
                z-index="200" 
                data-drawer="video-header-overlay" 
                drawer-space="none"
              >    
              <mui-h-stack style="padding: var(--space-400); border-radius: var(--radius-000); background: var(--surface-elevated-100); border-bottom: var(--stroke-size-100) solid var(--border-color);" alignx="space-between" aligny="center">
                <mui-h-stack alignx="start" aligny="center" space="var(--space-000)">
                  <mui-button variant="tertiary" aria-label="Open menu" size="medium" data-close>
                    <mui-icon-menu size="small"></mui-icon-menu>
                  </mui-button>
                  <mui-h-stack alignx="start" aligny="center" space="var(--space-200)" style="padding: var(--space-000) var(--space-200) var(--space-000) var(--space-200); border-radius: var(--radius-000);">
                    <mui-heading level="3" size="3">Premium</mui-heading>
                    <mui-badge variant="neutral">AU</mui-badge>
                  </mui-h-stack>
                </mui-h-stack>
              </mui-h-stack>
              ${videoMenuItems}
              </mui-drawer>
              ${videoPageContent}
            </div>
          </mui-responsive>
        </mui-v-stack>
      </div>
    `;
  }
}

customElements.define("story-drawer-video", storyDrawerVideo);
