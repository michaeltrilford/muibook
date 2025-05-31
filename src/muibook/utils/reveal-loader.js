// src/muibook/utils/reveal-loader.js
export const reveal = () => {
  const loader = document.getElementById("loader");

  const transitionOutLoader = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        if (loader) {
          loader.style.opacity = "0";
        }
      });
    } else {
      if (loader) {
        loader.style.opacity = "0";
      }
    }

    setTimeout(() => {
      if (loader) {
        loader.style.display = "none";
      }
    }, 1000);
  };

  if (document.readyState === "complete") {
    transitionOutLoader();
  } else {
    window.addEventListener("load", transitionOutLoader);
  }
};

reveal();
