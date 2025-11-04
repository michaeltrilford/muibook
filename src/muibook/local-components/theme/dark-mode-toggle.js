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

    // --- WAIT FOR <mui-switch> DEFINITION ---
    customElements.whenDefined("mui-switch").then(() => {
      const switchEl = this.shadowRoot.querySelector("mui-switch");
      switchEl.checked = currentTheme === "dark";

      // Handle toggle (temporary, no localStorage)
      switchEl.addEventListener("change", (e) => {
        const isDarkMode = e.detail.checked;
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
          switchEl.checked = e.matches;
        });
      }

      // Listen for brand capability updates
      window.addEventListener("brand-theme-capability", (e) => {
        switchEl.disabled = !e.detail.themeEnabled;
      });
    });
  }

  render(theme) {
    const isDark = theme === "dark";
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }

        mui-switch {
          --switch-track-background: var(--app-theme-toggle-bg);
          --switch-track-background-checked: var(--app-theme-toggle-bg);
        }
      </style>

      <mui-switch label="Dark mode toggle" ${isDark ? "checked" : ""}>
        <mui-icon-sun slot="off-icon"></mui-icon-sun>
        <mui-icon-moon slot="on-icon"></mui-icon-moon>
      </mui-switch>
    `;
  }

  set disabled(value) {
    const switchEl = this.shadowRoot.querySelector("mui-switch");
    if (switchEl) {
      switchEl.disabled = value;
    }
  }

  get disabled() {
    const switchEl = this.shadowRoot.querySelector("mui-switch");
    return switchEl ? switchEl.disabled : false;
  }
}

customElements.define("dark-mode-toggle", DarkModeToggle);
