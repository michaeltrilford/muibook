// Adds 'data-user-is-tabbing="true"' to the body for specific styles
// Used to ensure focus state doesn't appear on Icon Toggle but still works on Keyboard
// --- Focus visibility detection (keep outlines for keyboard users only)
document.addEventListener("DOMContentLoaded", () => {
  // Optional: Detect keyboard navigation for focus styles
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.dataset.userIsTabbing = "true";
    }
  });

  document.body.addEventListener("mousedown", () => {
    delete document.body.dataset.userIsTabbing;
  });
});
