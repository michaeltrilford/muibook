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
import MikeAvatar from "../../../images/mui/avatar-mike.jpg";

const videos = [
  {
    title: "Urban Photography Tips",
    author: "LensMaster",
    views: "120K views • 2 days ago",
  },
  {
    title: "Beginner Yoga Routine",
    author: "Flex & Flow",
    views: "980K views • 1 week ago",
  },
  {
    title: "Amazing Street Food Tour",
    author: "TasteTravels",
    views: "1.1M views • 3 days ago",
  },
  {
    title: "Ultimate Coding 101",
    author: "Dev Explorer",
    views: "450K views • 9 hours ago",
  },
  {
    title: "Minimalist Home Makeover",
    author: "Cozy Living",
    views: "800K views • 4 days ago",
  },
  {
    title: "History of Samurai",
    author: "Ancient Stories",
    views: "2.2M views • 2 weeks ago",
  },
  {
    title: "Daily Productivity Hacks",
    author: "Focus Lab",
    views: "56K views • 6 hours ago",
  },
  {
    title: "Wildlife of the Amazon",
    author: "EcoVision",
    views: "1.9M views • 1 month ago",
  },
  {
    title: "DIY Woodworking Basics",
    author: "Crafted Corner",
    views: "310K views • 5 days ago",
  },
  {
    title: "Piano Chill Beats",
    author: "LoFi House",
    views: "760K views • 3 hours ago",
  },
  {
    title: "Inside Tokyo Nightlife",
    author: "Travel Pulse",
    views: "1.3M views • 1 week ago",
  },
  {
    title: "Ultimate Gym Routine",
    author: "Fit Nation",
    views: "670K views • 2 days ago",
  },
  {
    title: "Building AI Assistants",
    author: "Tech Forge",
    views: "900K views • 10 hours ago",
  },
  {
    title: "The Secrets of Typography",
    author: "Design Lab",
    views: "140K views • 3 weeks ago",
  },
  {
    title: "Relaxing Rain Sounds",
    author: "Calm Channel",
    views: "3.5M views • 1 month ago",
  },
  {
    title: "Speedrunning 101",
    author: "GameMaster",
    views: "280K views • 4 hours ago",
  },
  {
    title: "How to Grow Indoor Plants",
    author: "GreenSpace",
    views: "510K views • 2 days ago",
  },
  {
    title: "Mastering Colour Grading",
    author: "CinePro",
    views: "820K views • 1 week ago",
  },
  {
    title: "Beginner Meditation Guide",
    author: "Peaceful Mind",
    views: "400K views • 8 hours ago",
  },
  {
    title: "Streetwear Lookbook 2024",
    author: "StyleWorks",
    views: "1.7M views • 2 weeks ago",
  },
  {
    title: "Mountain Biking Adventure",
    author: "Ride Wild",
    views: "230K views • 1 day ago",
  },
  {
    title: "Deep Sea Mysteries",
    author: "OceanX",
    views: "2.9M views • 3 weeks ago",
  },
  {
    title: "Quick & Healthy Recipes",
    author: "FoodLab",
    views: "640K views • 12 hours ago",
  },
  {
    title: "Top 10 Indie Games",
    author: "Pixel Corner",
    views: "520K views • 5 days ago",
  },
  {
    title: "Zen Garden Tutorial",
    author: "CalmScape",
    views: "110K views • 2 days ago",
  },
  {
    title: "Cinematic Drone Shots",
    author: "SkyVision",
    views: "1.4M views • 1 week ago",
  },
  {
    title: "How Planes Really Fly",
    author: "AeroTech",
    views: "870K views • 4 days ago",
  },
  {
    title: "Ultimate Coffee Guide",
    author: "Brew Studio",
    views: "300K views • 9 hours ago",
  },
  {
    title: "Fantasy Worldbuilding Tips",
    author: "LoreCrafter",
    views: "480K views • 3 days ago",
  },
  {
    title: "The Art of Animation",
    author: "Frame by Frame",
    views: "2M views • 1 month ago",
  },
];

const videoMenuItems = /*html*/ `
  <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); background: var(--surface-elevated-100);">

    <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" class="video-menu-group">

      <mui-button variant="tertiary" class="video-menu-item skip-menu-button" aria-label="Skip menu">
        Skip Menu
      </mui-button>

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

const styles = /*css*/ `

  /* Skip Menu Button */
  .skip-menu-button {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .skip-menu-button:focus,
  .skip-menu-button:focus-within {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
  }

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

  mui-avatar { margin-right: var(--space-050); }

  .video-menu-group-heading {
    margin-bottom: var(--space-200);
  }

  .filter {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: var(--space-600) var(--space-500) var(--space-500);
  }
  
  .card_content { padding-left: var(--space-100); }

  .card::part(background) {
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
      box-shadow var(--speed-100),
      outline var(--speed-100);
  }
  .card::part(background):hover,
  .card::part(background):focus-visible {
    background: var(--video-thumbnail-card-hover-background, var(--surface-elevated-100));
    box-shadow:
      0 0 0 var(--space-400) var(--video-thumbnail-card-hover-background, var(--surface-elevated-100)),
      0 0 0 calc(var(--space-400) + var(--video-thumbnail-card-hover-edge-width, 0px)) var(--video-thumbnail-card-hover-edge-color-token, transparent),
      0 var(--space-200) var(--space-400) var(--space-300) var(--surface-recessed-alpha);
  }
  .card::part(background):focus-visible {
    outline: var(--outline-thick);
    outline-offset: var(--space-300);
  }

  .video-page {
    height: calc(100dvh - 7.7rem);
    overflow-y: scroll;
  }
  .video-page:focus-visible {
      outline: var(--outline-thick);
      outline-offset: calc(-1 * var(--stroke-size-500))
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

  .content-container {
    container-type: inline-size;
    container-name: muitube;
  }

  @container muitube (min-width: 768px) {
    .filter {
      padding: var(--space-600) var(--space-700) var(--space-500);
    }

    .video_grid {
      width: 100%;
      padding: var(--space-700); 
      padding-top: var(--space-200);
    }

  }

`;

class compMuiTube extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getThemedThumbnailAttributes() {
    return `
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
  }

  generateVideoHTML(videos) {
    const themedThumbnailAttributes = this.getThemedThumbnailAttributes();
    return videos
      .map((v) => {
        return /*html*/ `
          <mui-link variant="tertiary" href="#" class="card">
            <mui-v-stack alignx="start" aligny="start" space="var(--space-300)">
              <mui-video-thumbnail ${themedThumbnailAttributes} alt="${v.title}"></mui-video-thumbnail>
              <mui-h-stack alignx="start" aligny="start" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
                <mui-v-stack class="card_content" alignx="start" aligny="start" space="var(--space-025)" style="border-radius: var(--radius-000); width: 100%;">
                  <mui-body size="large" variant="default" weight="bold">${v.title}</mui-body>
                  <mui-v-stack alignx="start" aligny="start" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000); width: 100%;">
                    <mui-body size="x-small" variant="default" weight="bold">${v.author}</mui-body>
                    <mui-body size="x-small" variant="default" weight="bold">${v.views}</mui-body>
                  </mui-v-stack>
                </mui-v-stack>
              </mui-h-stack>
            </mui-v-stack>
          </mui-link>
        `;
      })
      .join("\n");
  }

  render() {
    const videoPageContent = /*html*/ `
      <mui-v-stack slot="page" class="video-page" space="var(--space-000)" alignx="stretch" aligny="start" id="main-content">
        <div class="filter">
          <mui-chip-rail size="medium" aria-label="Video filters" style="--chip-rail-background: var(--app-muitube-background, var(--surface-elevated-100));">
            <mui-chip active variant="clickable">All</mui-chip>
            <mui-chip variant="clickable">Gaming</mui-chip>
            <mui-chip variant="clickable">Podcasts</mui-chip>
            <mui-chip variant="clickable">Thrillers</mui-chip>
            <mui-chip variant="clickable">Marco Pierre White</mui-chip>
            <mui-chip variant="clickable">Italian cuisine</mui-chip>
            <mui-chip variant="clickable">Roasting</mui-chip>
            <mui-chip variant="clickable">Music</mui-chip>
            <mui-chip variant="clickable">Satire</mui-chip>
            <mui-chip variant="clickable">Hamburgers</mui-chip>
            <mui-chip variant="clickable">Japan</mui-chip>
          </mui-chip-rail>
        </div>
        <mui-grid
          class="video_grid"
          alignx="start"
          aligny="start"
          space="var(--space-600)"
          col="repeat(auto-fit, minmax(268px, 1fr))"
        >
          ${this.generateVideoHTML(videos)}
        </mui-grid>
      </mui-v-stack>
    `;

    const Comp = /*html*/ `
      <style>${styles}</style>
      <mui-v-stack class="content-container" alignx="stretch" aligny="start" space="var(--space-000)" style="background: var(--app-muitube-background, var(--surface-elevated-100))" slot="body">
        <mui-h-stack style="padding: var(--space-400); border-radius: var(--radius-000); background: var(--surface-elevated-100); border-bottom: var(--stroke-size-100) solid var(--border-color);" alignx="space-between" aligny="center">
          <mui-h-stack alignx="start" aligny="center" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000);">
            <mui-responsive variant="container" breakpoint="768" observe=".content-container">
              <mui-button slot="showAbove" variant="tertiary" aria-label="Open menu" size="medium" data-drawer-toggle="video-header-toggle">
                <mui-icon-menu size="medium"></mui-icon-menu>
              </mui-button>
              <mui-button slot="showBelow" variant="tertiary" aria-label="Open menu" size="medium" data-drawer="video-header-overlay">
                <mui-icon-menu size="medium"></mui-icon-menu>
              </mui-button>
            </mui-responsive>
            <mui-h-stack alignx="start" aligny="center" space="var(--space-200)" style="padding: var(--space-000) var(--space-200) var(--space-000) var(--space-200); border-radius: var(--radius-000);">
              <mui-heading level="1" size="3">Premium</mui-heading>
              <mui-badge variant="neutral">AU</mui-badge>
            </mui-h-stack>
          </mui-h-stack>
          <mui-responsive variant="container" breakpoint="768" observe=".content-container" style="max-width: 70rem; width: 100%;">
            <mui-h-stack slot="showAbove" alignx="center" aligny="center" space="var(--space-300)" style="padding: var(--space-000) var(--space-300) var(--space-000) var(--space-300); width: 100%;">
              <mui-input content="placeholder" state="default" variant="default" placeholder="Search">
                <mui-button variant="secondary" slot="after" aria-label="Search">
                  <mui-icon-search size="medium"></mui-icon-search>
                </mui-button>
              </mui-input>
              <mui-button variant="tertiary" aria-label="Settings">
                <mui-icon-gear size="medium"></mui-icon-gear>
              </mui-button>
            </mui-h-stack>
          </mui-responsive>
          <mui-h-stack alignx="start" aligny="center" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000);">
            <mui-responsive variant="container" breakpoint="768" observe=".content-container">
              <mui-button variant="primary" slot="showAbove">Create</mui-button>
              <mui-button variant="primary" slot="showBelow"><mui-icon-add size="medium"></mui-icon-add></mui-button>
            </mui-responsive>
            <mui-button variant="tertiary" aria-label="Notifications">
              <mui-icon-notification size="medium"></mui-icon-notification>
            </mui-button>
          </mui-h-stack>
        </mui-h-stack>
        <mui-responsive variant="container" breakpoint="768" observe=".content-container">
          <mui-drawer contained width="240px" variant="push" drawer-space="none" open side="left" slot="showAbove" data-drawer-toggle="video-header-toggle">
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
                  <mui-icon-menu size="medium"></mui-icon-menu>
                </mui-button>
                <mui-h-stack alignx="start" aligny="center" space="var(--space-200)" style="padding: var(--space-000) var(--space-200) var(--space-000) var(--space-200); border-radius: var(--radius-000);">
                  <mui-heading level="1" size="3">Premium</mui-heading>
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
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="MuiTube"
        description="
          A composition demonstrating how to build a YouTube-like experience using components from the Design System, arranged in a way that effectively supports real content.
        "
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/muitube/index.js"
        storybook="https://stories.muibook.com/?path=/docs/compositions-muitube--docs"
      >

        <story-card noheader composition>
          <div slot="body">
            ${Comp}
          </div>
        </story-card>

      </story-template>
    `;

    this.setupEventListeners();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.brandObserver?.disconnect();
  }

  setupEventListeners() {
    // Handle skip menu buttons
    this.shadowRoot.querySelectorAll(".skip-menu-button").forEach((skipButton) => {
      skipButton.addEventListener("click", (e) => {
        const mainContent = this.shadowRoot.querySelector("#main-content");
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

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
    this.shadowRoot.querySelectorAll("mui-button[data-drawer-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-drawer-toggle");
        const drawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer-toggle="${target}"]`);
        if (!drawer) return;

        if (drawer.hasAttribute("open")) {
          drawer.removeAttribute("open");
        } else {
          drawer.setAttribute("open", "");
        }
      });
    });

  }
}

customElements.define("comp-mui-tube", compMuiTube);
