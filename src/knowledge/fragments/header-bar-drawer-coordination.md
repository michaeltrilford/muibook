## Header Bar And Drawer Coordination

HeaderBar and Drawer deliberately remain independent components. The application shell owns their
shared state: Drawer is the source of truth for whether navigation is open and for its current
width, while HeaderBar reflects that state and can emit resize intent back to Drawer.

This is runtime integration guidance, not part of a static Redactd JSON tree. A generated tree
should describe the initial HeaderBar and Drawer composition; the consuming application should add
the event and state wiring appropriate to its framework.

### Open and close state

- Connect every menu action to the Drawer's public `open()` and `close()` methods.
- Derive each trigger's `aria-expanded` value from the Drawer's `open` attribute. Re-sync from
  `mui-drawer-open` and `mui-drawer-close` so programmatic and user-driven changes remain aligned.
- When the left HeaderBar region only exists for an open Drawer, keep the identity group in the DOM
  and add or remove `slot="left"` from that group. Removing the slot moves the same live content into
  HeaderBar's main region and lets the unused side column collapse; restoring the slot re-establishes
  drawer alignment without recreating the content.
- Apply the same pattern to `slot="right"` for a right-side Drawer.

### Width and resize state

- Treat Drawer `width` as the shared persisted width. Mirror it to HeaderBar `left-width` or
  `right-width`, including width changes made outside the HeaderBar.
- When HeaderBar has `resize-rail`, listen for `mui-header-bar-resize` and write `event.detail.width`
  to the aligned Drawer. Check `event.detail.side` before updating a side.
- During `mui-header-bar-resize-start`, mark the Drawer as resizing so its normal width transition
  does not lag behind pointer movement. Clear that state on `mui-header-bar-resize-end`.
- Avoid separate competing width state in both components. One shared value prevents drift and
  feedback loops.

Framework-neutral example:

```js
const drawer = document.querySelector("#navigation-drawer");
const header = document.querySelector("#application-header");
const headerLeft = header.querySelector("[data-header-left]");
const toggles = document.querySelectorAll("[data-drawer-toggle]");

const syncDrawerState = () => {
  const isOpen = drawer.hasAttribute("open");
  toggles.forEach((toggle) => toggle.setAttribute("aria-expanded", isOpen.toString()));
  if (isOpen) headerLeft.setAttribute("slot", "left");
  else headerLeft.removeAttribute("slot");
};

const syncWidth = () => header.setAttribute("left-width", drawer.getAttribute("width"));

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    drawer.hasAttribute("open") ? drawer.close() : drawer.open();
  });
});

drawer.addEventListener("mui-drawer-open", syncDrawerState);
drawer.addEventListener("mui-drawer-close", syncDrawerState);
new MutationObserver(syncWidth).observe(drawer, {
  attributes: true,
  attributeFilter: ["width"],
});

header.addEventListener("mui-header-bar-resize", (event) => {
  if (event.detail.side === "left") drawer.setAttribute("width", event.detail.width);
});
header.addEventListener("mui-header-bar-resize-start", () => drawer.setAttribute("resizing", ""));
header.addEventListener("mui-header-bar-resize-end", () => drawer.removeAttribute("resizing"));

syncDrawerState();
syncWidth();
```
