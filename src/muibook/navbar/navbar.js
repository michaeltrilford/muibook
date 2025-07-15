class appNavbar extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = /*css*/ `
      :host { 
        display: grid;
        position: fixed;
        z-index: 100;
        bottom: 0;
        left: 0;
        width: 100%;
      }

      #desktop {
        display: none;
      }
      #mobile {
        display: block;
      }

      .color-icon {
        fill: var(--app-nav-accent);
      }

      @media (min-width: 960px) {

      :host { 
        position: static;
        bottom: 0;
        left: 0;
        min-height: 100vh;
      }

        #desktop {
          display: block;
          box-shadow: var(--stroke-size-100) 0 0 0 var(--border-color);
        }
        #mobile {
          display: none;
        }
      }
    
      #mobile {
        opacity: 0;
        transform: translate(0, 100%);
        transition: transform 100ms linear, width 100ms linear, opacity 100ms linear;
      }
      #mobile[open] {
        opacity: 1;
        transform: translate(0, 0);
        transition: transform 200ms ease-in, width 200ms ease-in, opacity 200ms ease-in;
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
      mui-body::part(margin) {
        margin-top: var(--space-400);
        margin-bottom: var(--space-200);
      }
      mui-body.first::part(margin) {
        margin-top: var(--space-200);
      }
    `;

    const Home = /*html*/ `
      <app-navbar-home  link="#/home" title="muibook.com"></app-navbar-home>
    `;

    const Theme = /*html*/ `
      <app-navbar-theme></app-navbar-theme>
    `;

    const Resources = /*html*/ `
      <app-navbar-group id="resources" groupname="Resources">
        <mui-body class="first" weight="bold">Get Started</mui-body>
        <app-navbar-link link="#/create-mui-app" title="Create App"></app-navbar-link>
        <mui-body weight="bold">Design</mui-body>
        <app-navbar-link link="#/design-guidelines" title="UX Guidelines"></app-navbar-link>
        <app-navbar-link link="#/muikit" title="Mui Kit"></app-navbar-link>
        <app-navbar-link link="#/muiplay" title="Muiplay"></app-navbar-link>
        <mui-body weight="bold">Theming</mui-body>
        <app-navbar-link link="#/base-theme" title="Base Theme"></app-navbar-link>
        <app-navbar-link link="#/multi-brand-theme" title="Multi-Brand Theme"></app-navbar-link>
        <mui-body weight="bold">React Helpers</mui-body>
        <app-navbar-link link="#/typed-elements" title="Typed Elements"></app-navbar-link>
        <app-navbar-link link="#/wrapped-components" title="Wrapped Components"></app-navbar-link>
        <mui-body weight="bold">AI Agent</mui-body>
        <app-navbar-link link="#/keywords" title="Keywords"></app-navbar-link>
        <app-navbar-link link="#/prompts" title="Prompts"></app-navbar-link>
      </app-navbar-group>
    `;

    const Required = /*html*/ `
      <app-navbar-group id="design-tokens" groupname="Design Tokens">
        <app-navbar-link link="#/brand-design-tokens" title="Brand"></app-navbar-link>
        <app-navbar-link link="#/semantic-design-tokens" title="Semantic"></app-navbar-link>
        <app-navbar-link link="#/contextual-design-tokens" title="Contextual"></app-navbar-link>
        <app-navbar-link link="#/components-design-tokens" title="Components"></app-navbar-link>
      </app-navbar-group>
    `;

    const Parts = /*html*/ `
      <app-navbar-group id="part-types" groupname="Part Selectors">
        <app-navbar-link link="#/text-part-selectors" title="Text"></app-navbar-link>
        <app-navbar-link link="#/spacing-part-selectors" title="Spacing"></app-navbar-link>
        <app-navbar-link link="#/layout-part-selectors" title="Layout"></app-navbar-link>
        <app-navbar-link link="#/visual-part-selectors" title="Visual"></app-navbar-link>
      </app-navbar-group>
    `;

    const Components = /*html*/ `
      <app-navbar-group id="web-components" groupname="Components">
      
        <mui-body class="first" weight="bold">Inputs</mui-body>
        <app-navbar-link link="#/field" title="Field"></app-navbar-link> 
        <app-navbar-link link="#/file-upload" title="File Upload"></app-navbar-link> 
        <app-navbar-link link="#/addon" title="Add On"></app-navbar-link>   
        <app-navbar-link link="#/input" title="Input"></app-navbar-link>  
        <app-navbar-link link="#/select" title="Select"></app-navbar-link>  
        <app-navbar-link link="#/switch" title="Switch"></app-navbar-link>  

        <mui-body weight="bold">Content</mui-body>
        <app-navbar-link link="#/table" title="Table"></app-navbar-link>
        <app-navbar-link link="#/slat" title="Slat"></app-navbar-link>
        <app-navbar-link link="#/accordion" title="Accordion"></app-navbar-link>
        <app-navbar-link link="#/heading" title="Heading"></app-navbar-link>
        <app-navbar-link link="#/body" title="Body"></app-navbar-link>
        <app-navbar-link link="#/list" title="List"></app-navbar-link>
        <app-navbar-link link="#/quote" title="Quote"></app-navbar-link>
        <app-navbar-link link="#/code" title="Code"></app-navbar-link>
        <app-navbar-link link="#/image" title="Image"></app-navbar-link>
        <app-navbar-link link="#/smart-card" title="Smart Card"></app-navbar-link>   
        <app-navbar-link link="#/icons" title="Icons"></app-navbar-link>

        <mui-body weight="bold">Layout</mui-body>
        <app-navbar-link link="#/stack" title="Stack"></app-navbar-link>
        <app-navbar-link link="#/grid" title="Grid"></app-navbar-link>
        <app-navbar-link link="#/responsive" title="Responsive"></app-navbar-link>
        <app-navbar-link link="#/container" title="Container"></app-navbar-link>
        <app-navbar-link link="#/rule" title="Rule"></app-navbar-link>
        <app-navbar-link link="#/card" title="Card"></app-navbar-link>
        
        <mui-body weight="bold">Feedback</mui-body>
        <app-navbar-link link="#/alert" title="Alert"></app-navbar-link>
        <app-navbar-link link="#/message" title="Message"></app-navbar-link>
        <app-navbar-link link="#/badge" title="Badge"></app-navbar-link>
        
        <mui-body weight="bold">Actions</mui-body>
        <app-navbar-link link="#/button" title="Button"></app-navbar-link>
        <app-navbar-link link="#/link" title="Link"></app-navbar-link>
        
        <mui-body weight="bold">Navigation</mui-body>
        <app-navbar-link link="#/tab-bar" title="Tab Bar"></app-navbar-link>  
        <app-navbar-link link="#/carousel" title="Carousel"></app-navbar-link>  
        
      </app-navbar-group>
    `;

    const Compositions = /*html*/ `
      <app-navbar-group id="compositions" groupname="Compositions">
        <app-navbar-link link="#/agent" title="Agent UI"></app-navbar-link> 
        <app-navbar-link link="#/wallet" title="Wallet"></app-navbar-link> 
      </app-navbar-group>
    `;

    // We provide the shadow root with some HTML
    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <app-navbar-menu desktop id="desktop">
        <slot name="skip"></slot>
        ${Theme}
        ${Home}
        ${Resources}
        ${Required}
        ${Parts}
        ${Compositions}
        ${Components}
      </app-navbar-menu>
      
      <app-navbar-menu mobile id="mobile">
        <slot name="skip"></slot>
        ${Theme}
        ${Resources}
        ${Required}
        ${Parts}
        ${Compositions}
        ${Components}
      </app-navbar-menu>

      <app-navbar-toggle>
        <mui-button variant="tertiary">
          <mui-icon-toggle rotate>
            <mui-icon-menu class="color-icon" slot="start"></mui-icon-menu>
            <mui-icon-close class="color-icon" slot="end"></mui-icon-close>
          </mui-icon-toggle>
        </mui-button>

        
        <mui-link slot="home-link" data-close-menu link="#/home-page">muibook.com</mui-link>
      </app-navbar-toggle>
    `;

    const btn = shadowRoot.querySelector("mui-button");
    const toggle = shadowRoot.querySelector("mui-icon-toggle");

    btn.addEventListener("click", () => {
      toggle.toggle = !toggle.toggle;
      toggle.setAttribute("aria-pressed", toggle.toggle);
    });

    // Query elements
    this.menuIconEl = this.shadowRoot.querySelector("mui-button");
    this.navbarEl = this.shadowRoot.getElementById("mobile");

    // Helper method to update tabindex
    this.updateTabIndexForMenuLinks = (container, enable) => {
      const links = container.querySelectorAll("app-navbar-link");
      links.forEach((link) => {
        if (enable) {
          link.removeAttribute("tabindex");
        } else {
          link.setAttribute("tabindex", "-1");
        }
      });
    };

    // Close mobile menu when a link is clicked
    const mobileLinks = this.navbarEl.querySelectorAll("app-navbar-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (this.navbarEl.hasAttribute("open")) {
          // 1. Close the mobile menu
          this.navbarEl.removeAttribute("open");

          // 2. Update tabindex
          this.updateTabIndexForMenuLinks(this.navbarEl, false);

          // 3. Reset the menu icon toggle state
          toggle.toggle = false;
          toggle.removeAttribute("aria-pressed");
          toggle.removeAttribute("toggle");
        }
      });
    });

    // Close mobile menu when a home link is clicked
    const homeLinks = this.shadowRoot.querySelectorAll("mui-link[data-close-menu]");

    homeLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (this.navbarEl.hasAttribute("open")) {
          // 1. Close the mobile menu
          this.navbarEl.removeAttribute("open");

          // 2. Update tabindex
          this.updateTabIndexForMenuLinks(this.navbarEl, false);

          // 3. Reset the menu icon toggle state
          toggle.toggle = false;
          toggle.removeAttribute("aria-pressed");
          toggle.removeAttribute("toggle");
        }
      });
    });

    // Method to handle responsive behavior
    this.handleResponsiveTabIndex = () => {
      const isDesktop = window.innerWidth >= 961;
      if (isDesktop) {
        this.updateTabIndexForMenuLinks(this.navbarEl, true);
      } else {
        const isOpen = this.navbarEl.hasAttribute("open");
        this.updateTabIndexForMenuLinks(this.navbarEl, isOpen);
      }
    };

    // Call initially and on resize
    this.handleResponsiveTabIndex();
    window.addEventListener("resize", this.handleResponsiveTabIndex);

    // Reveal navigation on mobile
    this.menuIconEl.addEventListener("click", () => {
      this.navbarEl.toggleAttribute("open");
      const isNowOpen = this.navbarEl.hasAttribute("open");
      this.updateTabIndexForMenuLinks(this.navbarEl, isNowOpen);

      if (isNowOpen) {
        requestAnimationFrame(() => {
          const homeLink = this.shadowRoot.querySelector("app-navbar-home");
          if (homeLink) homeLink.focus();
        });
      }
    });
  }

  connectedCallback() {
    const desktopNav = this.shadowRoot.querySelector("#desktop");
    const mobileNav = this.shadowRoot.querySelector("#mobile");

    const setOverflowHidden = (shouldHide) => {
      document.documentElement.style.overflow = shouldHide ? "hidden" : "";
      document.body.style.overflow = shouldHide ? "hidden" : "";
    };

    const checkAndUpdateOverflow = () => {
      const isHovered = this._isHovered;
      const isMobileOpen = mobileNav?.hasAttribute("open");
      setOverflowHidden(isHovered || isMobileOpen);
    };

    // Track hover state for desktop
    this._isHovered = false;

    const handleMouseEnter = () => {
      this._isHovered = true;
      checkAndUpdateOverflow();
    };

    const handleMouseLeave = () => {
      this._isHovered = false;
      checkAndUpdateOverflow();
    };

    if (desktopNav) {
      desktopNav.addEventListener("mouseenter", handleMouseEnter);
      desktopNav.addEventListener("mouseleave", handleMouseLeave);
    }

    // Observe mobile 'open' attribute
    let observer = null;
    if (mobileNav) {
      observer = new MutationObserver(checkAndUpdateOverflow);
      observer.observe(mobileNav, { attributes: true, attributeFilter: ["open"] });
    }

    // Save references for cleanup
    this._cleanup = () => {
      if (desktopNav) {
        desktopNav.removeEventListener("mouseenter", handleMouseEnter);
        desktopNav.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (observer) observer.disconnect();
    };

    checkAndUpdateOverflow();
  }
}

customElements.define("app-navbar", appNavbar);
