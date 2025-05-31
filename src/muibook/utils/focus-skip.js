export const setupSkipToMain = () => {
  const navbarSkip = document.querySelector("app-navbar-skip");

  if (navbarSkip && navbarSkip.shadowRoot) {
    const skipLink = navbarSkip.shadowRoot.querySelector(".skip-to-main");

    if (skipLink) {
      skipLink.addEventListener("click", (e) => {
        e.preventDefault();
        const appContainer = document.querySelector("app-container");
        console.log("skipLink clicked, appContainer:", appContainer);
        if (appContainer) {
          appContainer.focus();
          appContainer.classList.add("focused");
        }
      });

      skipLink.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          skipLink.click();
        }
      });
    }
  }

  const appContainer = document.querySelector("app-container");
  if (appContainer) {
    appContainer.addEventListener("blur", (e) => {
      if (e.target && e.target.classList) {
        e.target.classList.remove("focused");
      }
    });
  }
};

// Wait until DOM is loaded
window.addEventListener("load", () => {
  setupSkipToMain();
});
