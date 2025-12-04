import C from "../../../images/jal/crystal.png";
import D from "../../../images/jal/diamond.png";
import P from "../../../images/jal/premier.png";
import S from "../../../images/jal/sapphire.png";
import MaxAvatar from "../../../images/mui/avatar-max.png";
import JulieAvatar from "../../../images/mui/avatar-julie.png";

const videos = [
  {
    title: "Urban Photography Tips",
    author: "LensMaster",
    views: "120K views • 2 days ago",
    image: D,
  },
  {
    title: "Beginner Yoga Routine",
    author: "Flex & Flow",
    views: "980K views • 1 week ago",
    image: S,
  },
  {
    title: "Amazing Street Food Tour",
    author: "TasteTravels",
    views: "1.1M views • 3 days ago",
    image: D,
  },
  {
    title: "Ultimate Coding 101",
    author: "Dev Explorer",
    views: "450K views • 9 hours ago",
    image: S,
  },
  {
    title: "Minimalist Home Makeover",
    author: "Cozy Living",
    views: "800K views • 4 days ago",
    image: P,
  },
  {
    title: "History of Samurai",
    author: "Ancient Stories",
    views: "2.2M views • 2 weeks ago",
    image: C,
  },
  {
    title: "Daily Productivity Hacks",
    author: "Focus Lab",
    views: "56K views • 6 hours ago",
    image: D,
  },
  {
    title: "Wildlife of the Amazon",
    author: "EcoVision",
    views: "1.9M views • 1 month ago",
    image: P,
  },
  {
    title: "DIY Woodworking Basics",
    author: "Crafted Corner",
    views: "310K views • 5 days ago",
    image: P,
  },
  {
    title: "Piano Chill Beats",
    author: "LoFi House",
    views: "760K views • 3 hours ago",
    image: D,
  },
  {
    title: "Inside Tokyo Nightlife",
    author: "Travel Pulse",
    views: "1.3M views • 1 week ago",
    image: P,
  },
  {
    title: "Ultimate Gym Routine",
    author: "Fit Nation",
    views: "670K views • 2 days ago",
    image: P,
  },
  {
    title: "Building AI Assistants",
    author: "Tech Forge",
    views: "900K views • 10 hours ago",
    image: C,
  },
  {
    title: "The Secrets of Typography",
    author: "Design Lab",
    views: "140K views • 3 weeks ago",
    image: D,
  },
  {
    title: "Relaxing Rain Sounds",
    author: "Calm Channel",
    views: "3.5M views • 1 month ago",
    image: C,
  },
  {
    title: "Speedrunning 101",
    author: "GameMaster",
    views: "280K views • 4 hours ago",
    image: D,
  },
  {
    title: "How to Grow Indoor Plants",
    author: "GreenSpace",
    views: "510K views • 2 days ago",
    image: P,
  },
  {
    title: "Mastering Colour Grading",
    author: "CinePro",
    views: "820K views • 1 week ago",
    image: D,
  },
  {
    title: "Beginner Meditation Guide",
    author: "Peaceful Mind",
    views: "400K views • 8 hours ago",
    image: S,
  },
  {
    title: "Streetwear Lookbook 2024",
    author: "StyleWorks",
    views: "1.7M views • 2 weeks ago",
    image: D,
  },
  {
    title: "Mountain Biking Adventure",
    author: "Ride Wild",
    views: "230K views • 1 day ago",
    image: C,
  },
  {
    title: "Deep Sea Mysteries",
    author: "OceanX",
    views: "2.9M views • 3 weeks ago",
    image: D,
  },
  {
    title: "Quick & Healthy Recipes",
    author: "FoodLab",
    views: "640K views • 12 hours ago",
    image: C,
  },
  {
    title: "Top 10 Indie Games",
    author: "Pixel Corner",
    views: "520K views • 5 days ago",
    image: P,
  },
  {
    title: "Zen Garden Tutorial",
    author: "CalmScape",
    views: "110K views • 2 days ago",
    image: C,
  },
  {
    title: "Cinematic Drone Shots",
    author: "SkyVision",
    views: "1.4M views • 1 week ago",
    image: S,
  },
  {
    title: "How Planes Really Fly",
    author: "AeroTech",
    views: "870K views • 4 days ago",
    image: P,
  },
  {
    title: "Ultimate Coffee Guide",
    author: "Brew Studio",
    views: "300K views • 9 hours ago",
    image: S,
  },
  {
    title: "Fantasy Worldbuilding Tips",
    author: "LoreCrafter",
    views: "480K views • 3 days ago",
    image: P,
  },
  {
    title: "The Art of Animation",
    author: "Frame by Frame",
    views: "2M views • 1 month ago",
    image: S,
  },
];

const videoPageContent = /*html*/ `
  <mui-v-stack slot="page" class="video-page" space="var(--space-000)" alignx="stretch" aligny="start" id="main-content">
    <div class="filter">
      <div class="filter_next">
        <mui-button variant="tertiary" class="filter-action" aria-label="Next filters">
          <mui-icon-right-chevron size="medium"></mui-icon-right-chevron>
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
          <mui-chip class="skip-chip" style="margin-right: var(--space-100)">Skip Filters</mui-chip>  
          <mui-chip active>All</mui-chip>
          <mui-chip>Gaming</mui-chip>
          <mui-chip>Podcasts</mui-chip>
          <mui-chip>Thrillers</mui-chip>
          <mui-chip>Marco Pierre White</mui-chip>
          <mui-chip>Italian cuisine</mui-chip>
          <mui-chip>Roasting</mui-chip>
          <mui-chip>Music</mui-chip>
          <mui-chip>Satire</mui-chip>
          <mui-chip>Hamburgers</mui-chip>
          <mui-chip>Japan</mui-chip>
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
      ${videos
        .map(
          (v) => /*html*/ `
            <mui-link variant="tertiary" href="#" class="card">
              <mui-v-stack alignx="start" aligny="start" space="var(--space-300)">
                <mui-image variants="image"><img slot="image" src="${v.image}" alt="${v.title}" /></mui-image>
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
          `
        )
        .join("\n")}
    </mui-grid>
  </mui-v-stack>
  `;

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
        <mui-avatar slot="before" size="small" image="${MaxAvatar}" label="Real Estate Profile Image"></mui-avatar>
        Real Estate
      </mui-button>
      <mui-button variant="tertiary" class="video-menu-item" aria-label="Jazz Beats">        
        <mui-avatar slot="before" size="small" label="Jazz Beats"></mui-avatar>
        Jazz Beats
      </mui-button>
      <mui-button variant="tertiary" class="video-menu-item" aria-label="Julie Cooks">
        <mui-avatar slot="before" size="small" image="${JulieAvatar}" label="Julie Cooks Profile Image"></mui-avatar>
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

  .skip-chip {
    display: none; /* hidden by default */
  }

  .skip-chip.show {
    display: inline-flex; /* shows only on keyboard focus */
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

  .filter-action::part(height) { height: 4rem; width: 4rem; } 
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

  .filter { display: grid; width: 100%; position: relative; }
  .filter_chip-scroll { 
    padding: var(--space-600) 6.4rem var(--space-500) var(--space-500); 
    overflow-x: auto;
    -ms-overflow-style: none; /* IE/Edge */
    scrollbar-width: none;     /* Firefox */
    -webkit-overflow-scrolling: touch;
    margin-right: var(--stroke-size-500);
  }

  .filter_chip-scroll::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  .filter_chip-group {
    width: max-content; 
  }
  .filter_next { 
    background: var(--surface-elevated-200); 
    position: absolute; 
    right: 0; 
    top: calc(var(--space-500) + var(--space-100)); 
    box-shadow: calc(-1 * var(--space-400)) 0 var(--space-200) 0 var(--surface-elevated-200); 
    padding-top: var(--space-100);
    padding-right: calc(var(--space-500) - var(--stroke-size-500));
    padding-bottom: var(--space-100);
    margin-right: var(--stroke-size-500);
  }  
  
  .card_content { padding-left: var(--space-100); }

  .card::part(background) {
    padding: var(--space-000);
    border: none;
  }
  .card::part(background):hover,
  .card::part(background):focus-visible {
    background: var(--surface-elevated-100);
    transition: box-shadow var(--speed-100), outline var(--speed-100);
    box-shadow: 0 0 0 var(--space-400) var(--surface-elevated-100), 0 var(--space-200) var(--space-400) var(--space-300) var(--surface-recessed-alpha);
    border-top-left-radius: var(--radius-300);
    border-top-right-radius: var(--radius-300);
    border-bottom-left-radius: var(--radius-100);
    border-bottom-right-radius: var(--radius-100);
  }
  .card::part(background):focus-visible {
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


  .filter-action.at-end {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    .filter_chip-scroll {
      padding: var(--space-600) 8.8rem var(--space-500) var(--space-700); 
    }

    .filter_next { 
      padding-right: calc(var(--space-700) - var(--stroke-size-500));
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
    const shadowRoot = this.attachShadow({ mode: "open" });

    const Comp = /*html*/ `
      <style>${styles}</style>
      <mui-v-stack alignx="stretch" aligny="start" space="var(--space-000)" style="background: var(--surface-elevated-200);" slot="body">
        <mui-h-stack style="padding: var(--space-400); border-radius: var(--radius-000); background: var(--surface-elevated-100); border-bottom: var(--stroke-size-100) solid var(--border-color);" alignx="space-between" aligny="center">
          <mui-h-stack alignx="start" aligny="center" space="var(--space-000)" style="padding: var(--space-000); border-radius: var(--radius-000);">
            <mui-responsive breakpoint="768">
              <mui-button slot="showAbove" variant="tertiary" aria-label="Open menu" size="medium" data-drawer-toggle="video-header-toggle">
                <mui-icon-menu size="medium"></mui-icon-menu>
              </mui-button>
              <mui-button slot="showBelow" variant="tertiary" aria-label="Open menu" size="medium" data-drawer="video-header-overlay">
                <mui-icon-menu size="medium"></mui-icon-menu>
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
                  <mui-icon-search size="medium"></mui-icon-search>
                </mui-button>
              </mui-input>
              <mui-button variant="tertiary" aria-label="Settings">
                <mui-icon-gear size="medium"></mui-icon-gear>
              </mui-button>
            </mui-h-stack>
          </mui-responsive>
          <mui-h-stack alignx="start" aligny="center" space="var(--space-300)" style="padding: var(--space-000); border-radius: var(--radius-000);">
            <mui-responsive breakpoint="768">
              <mui-button variant="primary" slot="showAbove">Create</mui-button>
              <mui-button variant="primary" slot="showBelow"><mui-icon-add size="medium"></mui-icon-add></mui-button>
            </mui-responsive>
            <mui-button variant="tertiary" aria-label="Notifications">
              <mui-icon-notification size="medium"></mui-icon-notification>
            </mui-button>
          </mui-h-stack>
        </mui-h-stack>
        <mui-responsive breakpoint="768">
          <mui-drawer width="240px" variant="push" drawer-space="none" open side="left" slot="showAbove" data-drawer-toggle="video-header-toggle">
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
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="MuiTube"
        description="
          A composition demonstrating how to build a YouTube-like experience using components from the Design System, arranged in a way that effectively supports real content.
        "
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/muitube/index.js"
        storybook="https://stories.muibook.com/?path=/docs/compositions-muitube--docs"
      >

        <story-card noheader>
          <div slot="body">
            ${Comp}
          </div>
        </story-card>

       

      </story-template>
    `;

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

    const filterAction = this.shadowRoot.querySelector(".filter-action");
    const skipChip = this.shadowRoot.querySelector(".skip-chip");
    const firstVideoCard = this.shadowRoot.querySelector(".video_grid .card");

    // Step 1: Show skip chip only on tab forward out of filter-action
    filterAction.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        skipChip.classList.add("show");
        skipChip.setAttribute("tabindex", "0"); // make focusable for keyboard
      }
    });

    // Step 2: Focus first inner <a> when skip chip is activated
    const focusFirstCard = () => {
      if (!firstVideoCard) return;

      // Query the shadow root of the <mui-link> to get the <a> inside
      const linkAnchor = firstVideoCard.shadowRoot?.querySelector("a") || firstVideoCard.querySelector("a");
      if (linkAnchor) {
        linkAnchor.focus();
      } else {
        // Fallback: focus the host itself
        firstVideoCard.focus();
      }

      // Hide skip chip and remove temporary tabindex
      skipChip.classList.remove("show");
      skipChip.removeAttribute("tabindex");
    };

    // Activate skip chip on click or Enter/Space
    skipChip.addEventListener("click", focusFirstCard);
    skipChip.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        focusFirstCard();
      }
    });

    // Optional: hide skip chip if blurred without activating
    skipChip.addEventListener("blur", () => {
      skipChip.classList.remove("show");
      skipChip.removeAttribute("tabindex");
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

    // Filter scroll logic
    this.shadowRoot.querySelectorAll(".filter").forEach((filter) => {
      const button = filter.querySelector(".filter-action");
      const scrollContainer = filter.querySelector(".filter_chip-scroll");

      if (!button || !scrollContainer) return;

      function checkEnd() {
        const isScrollable = scrollContainer.scrollWidth > scrollContainer.clientWidth;
        const atEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;

        if (!isScrollable || atEnd) {
          button.classList.add("at-end");
        } else {
          button.classList.remove("at-end");
        }
      }

      button.addEventListener("click", () => {
        const scrollAmount = 200;
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
        // Recheck after scroll completes
        setTimeout(checkEnd, 350);
      });

      scrollContainer.addEventListener("scroll", checkEnd);

      // Don't check on initial load - wait for connectedCallback
    });
  }
  connectedCallback() {
    // Wait for all custom elements to render before checking scroll
    setTimeout(() => {
      this.shadowRoot.querySelectorAll(".filter").forEach((filter) => {
        const button = filter.querySelector(".filter-action");
        const scrollContainer = filter.querySelector(".filter_chip-scroll");

        if (!button || !scrollContainer) return;

        const isScrollable = scrollContainer.scrollWidth > scrollContainer.clientWidth;
        const atEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;

        if (!isScrollable || atEnd) {
          button.classList.add("at-end");
        } else {
          button.classList.remove("at-end");
        }
      });
    }, 100);
  }
}

customElements.define("comp-mui-tube", compMuiTube);
