class DarkModeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // --- THEME INITIALIZATION LOGIC ---
    // Detect system preference
    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Decide current theme based on system preference
    const currentTheme = systemPrefersDark ? "dark" : "light";

    // Apply theme
    document.documentElement.setAttribute("data-theme", currentTheme);
    this.render(currentTheme);

    const btn = this.shadowRoot.querySelector("mui-button");
    const toggle = this.shadowRoot.querySelector("mui-icon-toggle");

    // Handle toggle
    btn.addEventListener("click", () => {
      // Toggle the property and the attribute if needed
      const isDarkMode = !toggle.hasAttribute("toggle");
      if (isDarkMode) {
        toggle.setAttribute("toggle", "");
        btn.setAttribute("aria-pressed", "true");
      } else {
        toggle.removeAttribute("toggle");
        btn.setAttribute("aria-pressed", "false");
      }

      const theme = isDarkMode ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
    });

    // SYSTEM PREFERENCE CHANGE LISTENER
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        // No stored preference, so always follow system
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        if (e.matches) {
          toggle.setAttribute("toggle", "");
          btn.setAttribute("aria-pressed", "true");
        } else {
          toggle.removeAttribute("toggle");
          btn.setAttribute("aria-pressed", "false");
        }
      });
    }

    // Listen for brand capability updates
    window.addEventListener("brand-theme-capability", (e) => {
      btn.disabled = !e.detail.themeEnabled;
    });
  }

  render(theme) {
    const isDark = theme === "dark";
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }

        mui-button::part(border-radius) {
          border-radius: 100%;
        }
      </style>

      <mui-button variant="tertiary" size="small" icon-only aria-label="Toggle dark mode" aria-pressed="${isDark}">
        <mui-icon-toggle size="small"  ${isDark ? "toggle" : ""} rotate>
          <mui-icon-sun slot="start"></mui-icon-sun>
          <mui-icon-moon slot="end"></mui-icon-moon>
        </mui-icon-toggle>
      </mui-button>
    `;
  }

  set disabled(value) {
    const btn = this.shadowRoot.querySelector("mui-button");
    if (btn) {
      btn.disabled = value;
    }
  }

  get disabled() {
    const btn = this.shadowRoot.querySelector("mui-button");
    return btn ? btn.disabled : false;
  }
}

customElements.define("dark-mode-toggle", DarkModeToggle);
