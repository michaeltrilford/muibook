import "./css/app.css";
import "./css/themes/jal/brand.css";
import "./css/themes/jal/index.css";
import "./css/themes/ana/brand.css";
import "./css/themes/ana/index.css";
import "./css/themes/modern/brand.css";
import "./css/themes/modern/index.css";
import "./css/themes/sensei/brand.css";
import "./css/themes/sensei/index.css";
import "./css/app-theme.css";

// Utils
import "./utils/tabbing-true";
import "./utils/reveal-loader";
import "./utils/focus-skip";

// Mui Compopnents
import "../components/mui-icons/accessibility";
import "../components/mui-icons/add";
import "../components/mui-icons/ai";
import "../components/mui-icons/attention";
import "../components/mui-icons/check";
import "../components/mui-icons/close";
import "../components/mui-icons/calendar";
import "../components/mui-icons/down-chevron";
import "../components/mui-icons/globe";
import "../components/mui-icons/grid";
import "../components/mui-icons/info";
import "../components/mui-icons/left-arrow";
import "../components/mui-icons/left-sidebar";
import "../components/mui-icons/left-chevron";
import "../components/mui-icons/menu";
import "../components/mui-icons/message";
import "../components/mui-icons/moon";
import "../components/mui-icons/notification";
import "../components/mui-icons/right-chevron";
import "../components/mui-icons/stop";
import "../components/mui-icons/subtract";
import "../components/mui-icons/sun";
import "../components/mui-icons/toggle";
import "../components/mui-icons/up-arrow";
import "../components/mui-icons/up-chevron";
import "../components/mui-icons/warning";
import "../components/mui-icons/down-arrow-circle";
import "../components/mui-icons/ellipsis";
import "../components/mui-icons/gear";
import "../components/mui-icons/translate";
import "../components/mui-icons/home";
import "../components/mui-icons/play-stack";
import "../components/mui-icons/game-controller";
import "../components/mui-icons/movie-clapper";
import "../components/mui-icons/music-microphone";
import "../components/mui-icons/music-quarter-note";
import "../components/mui-icons/play-rectangle";
import "../components/mui-icons/list-and-film";
import "../components/mui-icons/search";
import "../components/mui-icons/checkmark";
import "../components/mui-icons/rectangle";
import "../components/mui-icons/rectangle-media-text";
import "../components/mui-icons/rectangle-dashed";
import "../components/mui-icons/rectangle-left-drawer";
import "../components/mui-icons/rectangle-bottom-panel";
import "../components/mui-icons/pin";
import "../components/mui-icons/pin-slash";
import "../components/mui-icons/text-below-folder";
import "../components/mui-link";
import "../components/mui-button";
import "../components/mui-button-group";
import "../components/mui-dropdown";
import "../components/mui-code";
import "../components/mui-markdown";
import "../components/mui-avatar";
import "../components/mui-image";
import "../components/mui-select";
import "../components/mui-card/card";
import "../components/mui-card/header";
import "../components/mui-card/body";
import "../components/mui-card/footer";
import "../components/mui-chip";
import "../components/mui-dialog";
import "../components/mui-drawer";
import "../components/mui-responsive";
import "../components/mui-stack/hstack";
import "../components/mui-stack/vstack";
import "../components/mui-accordion/group";
import "../components/mui-accordion/core";
import "../components/mui-accordion/block";
import "../components/mui-accordion/inline";
import "../components/mui-container";
import "../components/mui-addon";
import "../components/mui-badge";
import "../components/mui-grid";
import "../components/mui-switch";
import "../components/mui-slat/slat";
import "../components/mui-slat/group";
import "../components/mui-body";
import "../components/mui-rule";
import "../components/mui-quote";
import "../components/mui-progress";
import "../components/mui-smart-card";
import "../components/mui-table/table";
import "../components/mui-table/row";
import "../components/mui-table/cell";
import "../components/mui-table/row-group";
import "../components/mui-field";
import "../components/mui-form-section";
import "../components/mui-form-section-footer";
import "../components/mui-form-group";
import "../components/mui-form-message";
import "../components/mui-form-hint";
import "../components/mui-hint";
import "../components/mui-prompt";
import "../components/mui-prompt-toggle";
import "../components/mui-prompt-message";
import "../components/mui-prompt-preview";
import "../components/mui-alert";
import "../components/mui-message";
import "../components/mui-file-upload";
import "../components/mui-carousel/controller";
import "../components/mui-carousel/panel";
import "../components/mui-tabs/tab-bar";
import "../components/mui-tabs/controller";
import "../components/mui-tabs/item";
import "../components/mui-tabs/panel";
import "../components/mui-list/list";
import "../components/mui-list/item";
import "../components/mui-input";
import "../components/mui-chip-input";
import "../components/mui-textarea";
import "../components/mui-checkbox";
import "../components/mui-radio";
import "../components/mui-radio-group";
import "../components/mui-loader";
import "../components/mui-skeleton";
import "../components/mui-spinner";
import "../components/mui-media-player";
import "../components/mui-range-input";
import "../components/mui-stepper/step";
import "../components/mui-stepper/stepper";

// Muibook Components
import "./container";
import "./navbar";
import "./local-components/theme";
import "./local-components/page-banner-browser";
import "./local-components/page-banner-plugin";
import "./local-components/page-card";
import "./local-components/spec-card";
import "./local-components/props-card";
import "./local-components/story-card";
import "./local-components/story-code-block";
import "./local-components/story-code-snippet";
import "./local-components/story-demo";
import "./local-components/story-icon-grid";
import "./local-components/story-part-slat";
import "./local-components/story-quicklinks";
import "./local-components/story-template";
import "./local-components/story-token-slat";
import "./local-components/story-token-types";
import "./local-components/story-types";
import "./local-components/changelog";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
  <app-navbar>
    <app-navbar-skip slot="skip"></app-navbar-skip>
  </app-navbar>
  <app-container />
`;

function setStatusBarColorFromCSSVar(cssVarName: string) {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVarName)
    .trim();

  setStatusBarColor(color);
}

function setStatusBarColor(color: string) {
  let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  meta.content = color;
}

// Initial set
setStatusBarColorFromCSSVar("--app-container-surface");

// Watch for data-theme changes
const observer = new MutationObserver(() => {
  setStatusBarColorFromCSSVar("--app-container-surface");
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});
