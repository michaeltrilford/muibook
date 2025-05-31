// Mui CSS
import "../css/mui-tokens.css";
import "../css/mui-reset.css";
import "../css/mui-base.css";

// Mui Components
import "../components/mui-icons/sun";
import "../components/mui-icons/moon";
import "../components/mui-switch";
import "../components/mui-container";
import "../components/mui-heading";
import "../components/mui-body";
import "../components/mui-link";
import "../components/mui-stack/hstack";
import "../components/mui-stack/vstack";

// Author CSS
import "./author.css";

// Assets
import "./assets/logo.js";

// Author Components
import "./components/dark-mode/index.js";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
  <mui-container small>
    <mui-v-stack space="var(--space-600)" alignX="center">
      <create-mui-app-logo color="var(--logo-color)"></create-mui-app-logo>
      <mui-body weight="medium" class="introduction">
        Create fast, accessible, and themeable components with MUI styling,
        without the need for React or other dependencies.
      </mui-body>
      <mui-h-stack space="var(--space-300)">
        <mui-link
          variant="primary"
          href="https://muibook.com"
          target="_blank"
        >
          View Docs
        </mui-link>
        <mui-link
          class="github-link"
          variant="secondary"
          href="#"
          target="_blank"
        >
          View Github
        </mui-link>
      </mui-h-stack>
      <mui-h-stack space="var(--space-300)" alignY="center">
        <mui-body weight="bold">Toggle Theme</mui-body>
        <dark-mode-toggle></dark-mode-toggle>
      </mui-h-stack>
    </mui-v-stack>
  </mui-container>
`;
