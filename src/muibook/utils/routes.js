export function normalizeRoutePath(value = "") {
  if (!value) return "/home";

  let path = String(value).trim();

  if (path.startsWith("/#/")) path = path.slice(2);
  if (path.startsWith("#/")) path = path.slice(1);

  if (!path.startsWith("/")) return path;
  if (path === "/") return "/home";

  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function getCurrentRoutePath() {
  const hashRoute = window.location.hash.startsWith("#/") ? window.location.hash.slice(1) : "";
  return normalizeRoutePath(hashRoute || window.location.pathname);
}

export function getCleanRouteHref(value = "") {
  const href = String(value).trim();
  if (!href || /^[a-z][a-z0-9+.-]*:/i.test(href)) return href;

  const route = normalizeRoutePath(href);
  return route.startsWith("/") ? route : href;
}

export function normalizeLegacyHashRoute() {
  if (!window.location.hash.startsWith("#/")) return false;

  const route = normalizeRoutePath(window.location.hash);
  const nextUrl = `${route}${window.location.search}`;
  window.history.replaceState({}, "", nextUrl);
  return true;
}

export function navigateToRoute(value = "") {
  const href = getCleanRouteHref(value);
  if (!href.startsWith("/")) return false;

  const nextUrl = `${href}${window.location.search}`;
  if (nextUrl !== `${window.location.pathname}${window.location.search}`) {
    window.history.pushState({}, "", nextUrl);
  }

  window.dispatchEvent(new PopStateEvent("popstate"));
  return true;
}

export function isCurrentRoute(value = "") {
  return normalizeRoutePath(value) === getCurrentRoutePath();
}
