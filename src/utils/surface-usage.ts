const SURFACE_OWNER_SELECTOR = "mui-card, mui-card-body, mui-carousel-controller, mui-dialog, mui-drawer";

export function hasSurfaceOwner(element: HTMLElement): boolean {
  return element.closest(SURFACE_OWNER_SELECTOR) !== null;
}

export function applySurfaceUsage(surface: HTMLElement): void {
  surface.querySelectorAll<HTMLElement>("mui-tab-bar").forEach((tabBar) => {
    if (tabBar.closest(SURFACE_OWNER_SELECTOR) === surface) {
      tabBar.setAttribute("usage", "surface");
    }
  });
}
