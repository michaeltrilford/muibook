class appNavbar extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { 
        display: block;
        position: static;
        width: 100%;
        height: 100%;
        min-height: 0;
        z-index: auto;
      }

      .menu-shell {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
      }

      .menu-top {
        flex: 0 0 auto;
        min-height: 0;
      }

      .menu-scroll {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .nav-search {
        display: block;
        padding: var(--space-000) var(--space-000);
        background: var(--app-navbar-surface);
        border-bottom: var(--app-navbar-border);
      }

      .nav-search mui-input {
        display: block;
      }

      .nav-search-input {
        --input-background: var(--app-navbar-surface-opacity);
        --border-thin: none;
        --outline-thick: none;
        padding-inline: var(--space-200);
        box-sizing: border-box;
      }

      .grid {
        display: grid;
        grid-template-rows: auto 1fr;
        height: 100%;
      }

      .spacer {
        background: var(--app-navbar-surface-opacity);
      }

      .nav-search {
        background: var(--app-navbar-surface-opacity);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }

      mui-link::part(color),
      mui-link::part(color):hover {
        color: var(--app-nav-accent);
      }

      mui-link::part(text-decoration) {
        text-decoration: none;
      }

      mui-link::part(text-decoration):hover {
        text-decoration: underline;
      }


      mui-body::part(color) {
        color: var(--app-nav-accent);
      }
      mui-body::part(padding) {
        padding-left: var(--space-500);
        padding-right: var(--space-500);
      }
      mui-body::part(box-sizing) {
        box-sizing: border-box;
      }
      mui-body::part(margin) {
        margin-top: var(--space-400);
        margin-bottom: var(--space-200);
      }
      mui-body.first::part(margin) {
        margin-top: var(--space-200);
      }
    `;

    const Home = /*html*/ `
      <app-navbar-home  link="/home" title="muibook.com"></app-navbar-home>
    `;

    const Theme = /*html*/ `
      <app-navbar-theme></app-navbar-theme>
    `;

    const Search = /*html*/ `
      <div class="nav-search">
        <mui-input
          class="nav-search-input"
          type="search"
          size="medium"
          label="Search..."
          hide-label
          placeholder="Search..."
        >
          <mui-icon-search slot="inside-before"></mui-icon-search>
        </mui-input>
      </div>
    `;

    const Resources = /*html*/ `
      <app-navbar-group id="resources" groupname="Resources">
        <app-navbar-section heading="Setup">
          <app-navbar-link link="/create-mui-app" title="Create App"></app-navbar-link>
          <app-navbar-link link="/npm" title="NPM Package"></app-navbar-link>
          <app-navbar-link link="/storybook" title="Storybook"></app-navbar-link>
          <app-navbar-link link="/changelog" title="Changelog"></app-navbar-link>
          <app-navbar-link link="/license" title="License"></app-navbar-link>
        </app-navbar-section>
        <app-navbar-section heading="Knowledge">
          <app-navbar-link link="/knowledge-overview" title="Overview"></app-navbar-link>
          <app-navbar-link link="/knowledge-mcp" title="MCP"></app-navbar-link>
          <app-navbar-link link="/manifest" title="Manifest"></app-navbar-link>
          <app-navbar-link link="/skills" title="Skills"></app-navbar-link>
          <app-navbar-link link="/knowledge-compositions" title="Compositions"></app-navbar-link>
          <app-navbar-link link="/knowledge-rules" title="Rules"></app-navbar-link>
          <app-navbar-link link="/knowledge-keywords" title="Keywords"></app-navbar-link>
        </app-navbar-section>
        <app-navbar-section heading="AI Agent">
          <app-navbar-link link="/keywords" title="Keywords"></app-navbar-link>
          <app-navbar-link link="/prompts" title="Prompts"></app-navbar-link>
        </app-navbar-section>
        <app-navbar-section heading="Design">
          <app-navbar-link link="/design-guidelines" title="UX Guidelines"></app-navbar-link>
          <app-navbar-link link="/muikit" title="Mui Kit"></app-navbar-link>
          <app-navbar-link link="/redactd" title="Redactd"></app-navbar-link>
        </app-navbar-section>
        <app-navbar-section heading="Theming">
          <app-navbar-link link="/base-theme" title="Base Theme"></app-navbar-link>
          <app-navbar-link link="/multi-brand-theme" title="Multi-Brand Theme"></app-navbar-link>
          <app-navbar-link link="/overrides" title="Overrides"></app-navbar-link>
        </app-navbar-section>
        <app-navbar-section heading="Showcase">
        <app-navbar-link link="/showcase" title="Projects"></app-navbar-link>
        </app-navbar-section>
        <app-navbar-section heading="React Helpers">
          <app-navbar-link link="/typed-elements" title="Typed Elements"></app-navbar-link>
          <app-navbar-link link="/wrapped-components" title="Wrapped Components"></app-navbar-link>
          <app-navbar-link link="/react-input-helper" title="Input Helper"></app-navbar-link>
        </app-navbar-section>
      </app-navbar-group>
    `;

    const Required = /*html*/ `
      <app-navbar-group id="design-tokens" groupname="Design Tokens">
        <app-navbar-link link="/brand-design-tokens" title="Brand" badge="Tier 1"></app-navbar-link>
        <app-navbar-link link="/semantic-design-tokens" title="Semantic" badge="Tier 2"></app-navbar-link>
        <app-navbar-link link="/components-design-tokens" title="Components" badge="Tier 3"></app-navbar-link>
      </app-navbar-group>
    `;

    const Parts = /*html*/ `
      <app-navbar-group id="part-types" groupname="Part Selectors">
        <app-navbar-link link="/text-part-selectors" title="Text"></app-navbar-link>
        <app-navbar-link link="/spacing-part-selectors" title="Spacing"></app-navbar-link>
        <app-navbar-link link="/layout-part-selectors" title="Layout"></app-navbar-link>
        <app-navbar-link link="/visual-part-selectors" title="Visual"></app-navbar-link>
      </app-navbar-group>
    `;

    const Components = /*html*/ `
      <app-navbar-group id="web-components" groupname="Components">
        <app-navbar-section heading="AI & LLM" default-open>
          <app-navbar-link link="/prompt" title="Prompt"></app-navbar-link>
          <app-navbar-link link="/prompt-message" title="Prompt Message"></app-navbar-link>
          <app-navbar-link link="/prompt-preview" title="Prompt Preview"></app-navbar-link>
          <app-navbar-link link="/prompt-toggle" title="Prompt Toggle"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Actions" default-open>
          <app-navbar-link link="/button" title="Button"></app-navbar-link>
          <app-navbar-link link="/chip" title="Chip"></app-navbar-link>
          <app-navbar-link link="/dropdown" title="Dropdown"></app-navbar-link>
          <app-navbar-link link="/link" title="Link"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Visuals" default-open>
          <app-navbar-link link="/icons" title="Icons"></app-navbar-link>
          <app-navbar-link link="/illustrations" title="Illustrations"></app-navbar-link>
          <app-navbar-link link="/avatar" title="Avatar"></app-navbar-link>
          <app-navbar-link link="/avatar-group" title="Avatar Group"></app-navbar-link>
          <app-navbar-link link="/avatar-chip" title="Avatar Chip"></app-navbar-link>
          <app-navbar-link link="/carousel" title="Carousel"></app-navbar-link>
          <app-navbar-link link="/smart-card" title="Smart Card"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Media" default-open>
          <app-navbar-link link="/image" title="Image"></app-navbar-link>
          <app-navbar-link link="/media-player" title="Media Player"></app-navbar-link>
          <app-navbar-link link="/model-viewer" title="Model Viewer"></app-navbar-link>
          <app-navbar-link link="/video-thumbnail" title="Video Thumbnail"></app-navbar-link>
          <app-navbar-link link="/slide-frame" title="Slide Frame"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Feedback" default-open>
          <app-navbar-link link="/badge" title="Badge"></app-navbar-link>
          <app-navbar-link link="/status" title="Status"></app-navbar-link>
          <app-navbar-link link="/alert" title="Alert"></app-navbar-link>
          <app-navbar-link link="/message" title="Message"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Loading" default-open>
          <app-navbar-link link="/loader" title="Loader"></app-navbar-link>
          <app-navbar-link link="/skeleton" title="Skeleton"></app-navbar-link>
          <app-navbar-link link="/spinner" title="Spinner"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Navigation" default-open>
          <app-navbar-link link="/stepper" title="Stepper"></app-navbar-link>
          <app-navbar-link link="/tab-bar" title="Tab Bar"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Overlays" default-open>
          <app-navbar-link link="/dialog" title="Dialog"></app-navbar-link>
          <app-navbar-link link="/drawer" title="Drawer"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Forms" default-open>
          <app-navbar-link link="/form-section" title="Form Section"></app-navbar-link>
          <app-navbar-link link="/form-section-footer" title="Form Section Footer"></app-navbar-link>
          <app-navbar-link link="/form-group" title="Form Group"></app-navbar-link>
          <app-navbar-link link="/field" title="Field"></app-navbar-link>
          <app-navbar-link link="/input" title="Input"></app-navbar-link>
          <app-navbar-link link="/textarea" title="Textarea"></app-navbar-link>
          <app-navbar-link link="/select" title="Select"></app-navbar-link>
          <app-navbar-link link="/checkbox" title="Checkbox"></app-navbar-link>
          <app-navbar-link link="/radio" title="Radio"></app-navbar-link>
          <app-navbar-link link="/switch" title="Switch"></app-navbar-link>
          <app-navbar-link link="/search-input" title="Search Input"></app-navbar-link>
          <app-navbar-link link="/chip-input" title="Chip Input"></app-navbar-link>
          <app-navbar-link link="/date-picker" title="Date Picker"></app-navbar-link>
          <app-navbar-link link="/time" title="Time"></app-navbar-link>
          <app-navbar-link link="/time-picker" title="Time Picker"></app-navbar-link>
          <app-navbar-link link="/calendar" title="Calendar"></app-navbar-link>
          <app-navbar-link link="/range-input" title="Range Input"></app-navbar-link>
          <app-navbar-link link="/file-upload" title="File Upload"></app-navbar-link>
          <app-navbar-link link="/addon" title="Add On"></app-navbar-link>
          <app-navbar-link link="/form-message" title="Form Message"></app-navbar-link>
          <app-navbar-link link="/hint" title="Hint"></app-navbar-link>
          <app-navbar-link link="/progress" title="Progress"></app-navbar-link>
          <app-navbar-link link="/progress-ring" title="Progress Ring"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Content" default-open>
          <app-navbar-link link="/accordion" title="Accordion"></app-navbar-link>
          <app-navbar-link link="/body" title="Body"></app-navbar-link>
          <app-navbar-link link="/code" title="Code"></app-navbar-link>
          <app-navbar-link link="/heading" title="Heading"></app-navbar-link>
          <app-navbar-link link="/list" title="List"></app-navbar-link>
          <app-navbar-link link="/quote" title="Quote"></app-navbar-link>
          <app-navbar-link link="/slat" title="Slat"></app-navbar-link>
          <app-navbar-link link="/table" title="Table"></app-navbar-link>
        </app-navbar-section>

        <app-navbar-section heading="Layout" default-open>
          <app-navbar-link link="/card" title="Card"></app-navbar-link>
          <app-navbar-link link="/container" title="Container"></app-navbar-link>
          <app-navbar-link link="/grid" title="Grid"></app-navbar-link>
          <app-navbar-link link="/responsive" title="Responsive"></app-navbar-link>
          <app-navbar-link link="/rule" title="Rule"></app-navbar-link>
          <app-navbar-link link="/stack" title="Stack"></app-navbar-link>
        </app-navbar-section>

      </app-navbar-group>
    `;

    const Compositions = /*html*/ `
      <app-navbar-group id="compositions" groupname="Compositions">
        <app-navbar-link link="/onboarding" title="Onboarding"></app-navbar-link> 
        <app-navbar-link link="/wallet" title="Wallet"></app-navbar-link> 
        <app-navbar-link link="/muitube" title="MuiTube"></app-navbar-link> 
        <app-navbar-link link="/song-page" title="Song Page"></app-navbar-link>
        <app-navbar-link link="/dashboard" title="Dashboard"></app-navbar-link>
      </app-navbar-group>
    `;

    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <app-navbar-menu id="menu">
        <div class="grid">
          <div class="menu-shell">
            <div class="menu-top">
              ${Theme}
              ${Home}
              ${Search}
            </div>
            <div class="menu-scroll">
              ${Resources}
              ${Required}
              ${Parts}
              ${Components}
              ${Compositions}
            </div>
          </div>
          <div class="spacer"></div>
        </div>
      </app-navbar-menu>
    `;

    // Measure theme element and position home element
    const measureAndPositionHome = () => {
      const themeEl = shadowRoot.querySelector("app-navbar-theme");
      const homeEl = shadowRoot.querySelector("app-navbar-home");

      if (themeEl && homeEl) {
        const themeHeight = themeEl.offsetHeight;
        homeEl.style.top = `calc(${themeHeight}px)`;
      }
    };

    // Initial measurement
    requestAnimationFrame(() => {
      measureAndPositionHome();
    });

    // Re-measure on resize
    window.addEventListener("resize", measureAndPositionHome);

    this.searchInputs = Array.from(this.shadowRoot.querySelectorAll(".nav-search-input"));
    this.navGroups = Array.from(this.shadowRoot.querySelectorAll("app-navbar-group"));

    this.applySearchQuery = (value = "") => {
      const query = value.trim();
      this.searchQuery = query;
      this.searchInputs.forEach((input) => {
        if (input.getAttribute("value") !== query) {
          input.setAttribute("value", query);
        }
      });
      this.navGroups.forEach((group) => group.applyFilter?.(query));
    };

    this.searchInputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        const query = event.detail?.value ?? input.getAttribute("value") ?? "";
        this.applySearchQuery(query);
      });
    });

    this.applySearchQuery("");

    this.shadowRoot.querySelectorAll("app-navbar-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("app-navbar-link-activate", { bubbles: true, composed: true }));
      });
    });
  }
}

customElements.define("app-navbar", appNavbar);
