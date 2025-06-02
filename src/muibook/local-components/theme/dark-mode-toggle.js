class DarkModeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    this.render(currentTheme);

    // Ensure mui-switch is defined before proceeding
    customElements.whenDefined("mui-switch").then(() => {
      const switchEl = this.shadowRoot.querySelector("mui-switch");
      switchEl.checked = currentTheme === "dark";

      // Listen for switch toggle events
      switchEl.addEventListener("change", (e) => {
        const isDarkMode = e.detail.checked;
        const theme = isDarkMode ? "dark" : "light";
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
      });

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
