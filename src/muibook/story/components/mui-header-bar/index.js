import { getComponentDocs } from "../../../utils/story-data";

class storyHeaderBar extends HTMLElement {
  drawerWidthObserver = null;
  headerResizeHandler = null;
  headerResizeStartHandler = null;
  headerResizeEndHandler = null;
  drawerToggleHandler = null;
  drawerStateHandler = null;
  pushDrawerToggleHandler = null;
  pushDrawerStateHandler = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const data = await getComponentDocs("HeaderBar");
    const storyItems = data?.stories?.items;
    if (!storyItems?.length) {
      this.shadowRoot.innerHTML = `<story-metadata-empty component="HeaderBar"></story-metadata-empty>`;
      return;
    }

    const storyMeta = Object.fromEntries(
      storyItems.map((story) => [story.key, { ...story, usage: (story.list || []).join("|||") }]),
    );

    const attrsReference = JSON.stringify([
      {
        component: "mui-header-bar",
        parentAttrs: ["has-left", "has-right"],
        childAttrs: [],
      },
    ]);

    const styles = /*css*/ `
      :host { display: block; }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="${data.title}"
        description="${data.description}"
        github="${data.github || ""}"
        figma="${data.figma || ""}"
        guides="${data.guides || ""}"
        storybook="${data.storybook || ""}"
        accessibility="${data.accessibility?.engineerList?.join("|||") || ""}"
        attrs-reference='${attrsReference}'
        imports='["@muibook/components/mui-header-bar"]'>

        <story-quicklinks slot="message" heading="Quicklinks" links="${storyItems.map((story) => `${story.key}::${story.title}`).join("|||")}"></story-quicklinks>

        <story-api-types tag="mui-header-bar" title="Header Bar"></story-api-types>

        <!-- Story 1: 2-Column Shell Header -->
        <story-card
          id="two-column-shell"
          title="${storyMeta["two-column-shell"]?.title || "2-Column Shell Header"}"
          description="${storyMeta["two-column-shell"]?.description || "Standard top application header aligned with a left navigation drawer."}"
          usage="${storyMeta["two-column-shell"]?.usage || ""}"
        >
          <mui-responsive slot="body" variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;">
          <mui-header-bar slot="show-above" left-width="280px" size="medium">
            <mui-h-stack slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)">
              <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation">
                <mui-icon-menu slot="before"></mui-icon-menu>
              </mui-button>
              <mui-h-stack space="var(--space-200)" aligny="center">
                <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
            </mui-h-stack>

            <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 0 0 var(--space-500)">
              <mui-search-input placeholder="Search Acme..." size="medium"></mui-search-input>
              <mui-h-stack space="var(--space-500)" aligny="center">
                <mui-button variant="secondary" shape="circle" aria-label="Notifications">
                  <mui-icon-notification slot="before"></mui-icon-notification>
                  <mui-badge slot="badge" variant="attention">3</mui-badge>
                </mui-button>
                <mui-dropdown position="right">
                  <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open profile menu">
                    <mui-avatar-chip label="Alex" background="blue" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip>
                    <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
                  </mui-button>
                  <mui-menu width="16rem">
                    <mui-button variant="tertiary" align="start">Profile</mui-button>
                    <mui-button variant="tertiary" align="start">Settings</mui-button>
                    <mui-button variant="tertiary" align="start">Sign out</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </mui-h-stack>
            </mui-grid>
          </mui-header-bar>
          <mui-header-bar slot="show-below" size="medium">
            <mui-grid col="minmax(0, 1fr) auto" space="var(--space-200)" aligny="center" width="100%" padding="0 var(--space-300)">
              <mui-h-stack space="var(--space-200)" aligny="center">
                <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation"><mui-icon-menu slot="before"></mui-icon-menu></mui-button>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
              <mui-dropdown position="right">
                <mui-button slot="action" variant="tertiary" shape="circle" aria-label="Open profile menu"><mui-avatar label="Alex" background="blue"></mui-avatar></mui-button>
                <mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu>
              </mui-dropdown>
            </mui-grid>
          </mui-header-bar>
          </mui-responsive>

          <story-code-block slot="footer">
            &lt;mui-responsive variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;"&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-above" left-width="280px" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-menu slot="before"&gt;&lt;/mui-icon-menu&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-200)" aligny="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-rectangle-dashed size="large"&gt;&lt;/mui-icon-rectangle-dashed&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="4" level="1"&gt;Acme&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br /><br />
            &nbsp;&nbsp;&lt;mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 0 0 var(--space-500)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-search-input placeholder="Search Acme..." size="medium"&gt;&lt;/mui-search-input&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-500)" aligny="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="secondary" shape="circle" aria-label="Notifications"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-notification slot="before"&gt;&lt;/mui-icon-notification&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot="badge" variant="attention"&gt;3&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open profile menu"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar-chip label="Alex" background="blue" primary="Alex Hurt" secondary="Product Designer"&gt;&lt;/mui-avatar-chip&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-down-chevron slot="after"&gt;&lt;/mui-icon-down-chevron&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu width="16rem"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start"&gt;Profile&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start"&gt;Settings&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start"&gt;Sign out&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-grid&gt;<br />
            &nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-below" size="medium"&gt;...compact header...&lt;/mui-header-bar&gt;<br />
            &lt;/mui-responsive&gt;
          </story-code-block>
        </story-card>

        <!-- Story 2: 3-Column Workspace Header -->
        <story-card
          id="three-column-workspace"
          title="${storyMeta["three-column-workspace"]?.title || "3-Column Workspace Header"}"
          description="${storyMeta["three-column-workspace"]?.description || "Full workspace header aligned with both left navigation and right panel drawers."}"
          usage="${storyMeta["three-column-workspace"]?.usage || ""}"
        >
          <mui-responsive slot="body" variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;">
          <mui-header-bar slot="show-above" left-width="280px" right-width="280px" size="medium">
            <mui-h-stack slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)">
              <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation">
                <mui-icon-menu slot="before"></mui-icon-menu>
              </mui-button>
              <mui-h-stack space="var(--space-200)" aligny="center">
                <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
            </mui-h-stack>

            <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-500)">
              <mui-search-input placeholder="Search Acme..." size="medium"></mui-search-input>
              <mui-h-stack space="var(--space-200)" aligny="center">
                <mui-button variant="secondary" shape="circle" aria-label="Notifications">
                  <mui-icon-notification slot="before"></mui-icon-notification>
                  <mui-badge slot="badge" variant="attention">3</mui-badge>
                </mui-button>
              </mui-h-stack>
            </mui-grid>

            <mui-h-stack slot="right" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-500)">
              <mui-heading size="5" level="2">Properties</mui-heading>
            </mui-h-stack>
          </mui-header-bar>
          <mui-header-bar slot="show-below" size="medium">
            <mui-grid col="minmax(0, 1fr) auto" space="var(--space-200)" aligny="center" width="100%" padding="0 var(--space-300)">
              <mui-h-stack space="var(--space-200)" aligny="center">
                <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation"><mui-icon-menu slot="before"></mui-icon-menu></mui-button>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
              <mui-button variant="secondary" shape="circle" aria-label="Notifications"><mui-icon-notification slot="before"></mui-icon-notification><mui-badge slot="badge" variant="attention">3</mui-badge></mui-button>
            </mui-grid>
          </mui-header-bar>
          </mui-responsive>

          <story-code-block slot="footer">
            &lt;mui-responsive variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;"&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-above" left-width="280px" right-width="280px" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-menu slot="before"&gt;&lt;/mui-icon-menu&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-200)" aligny="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-rectangle-dashed size="large"&gt;&lt;/mui-icon-rectangle-dashed&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="4" level="1"&gt;Acme&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br /><br />
            &nbsp;&nbsp;&lt;mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-500)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-search-input placeholder="Search Acme..." size="medium"&gt;&lt;/mui-search-input&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-200)" aligny="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="secondary" shape="circle" aria-label="Notifications"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-notification slot="before"&gt;&lt;/mui-icon-notification&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot="badge" variant="attention"&gt;3&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-grid&gt;<br /><br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="right" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-500)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="5" level="2"&gt;Properties&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-below" size="medium"&gt;...compact workspace header...&lt;/mui-header-bar&gt;<br />
            &lt;/mui-responsive&gt;
          </story-code-block>
        </story-card>

        <!-- Story 3: Custom Right Section -->
        <story-card
          id="custom-right-section"
          title="${storyMeta["custom-right-section"]?.title || "Custom Right Section"}"
          description="${storyMeta["custom-right-section"]?.description || "Header bar with a dedicated right section column."}"
          usage="${storyMeta["custom-right-section"]?.usage || ""}"
        >
          <mui-responsive slot="body" variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;">
          <mui-header-bar slot="show-above" left-width="280px" right-width="auto" size="medium">

            <mui-h-stack slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)">
              <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation">
                <mui-icon-menu slot="before"></mui-icon-menu>
              </mui-button>

              <mui-h-stack space="var(--space-200)" aligny="center">
                <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>

            </mui-h-stack>

            <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-300) 0 var(--space-500)">
              <mui-search-input placeholder="Search Acme..." size="medium"></mui-search-input>
              <mui-button variant="secondary" shape="circle" aria-label="Notifications">
                <mui-icon-notification slot="before"></mui-icon-notification>
                <mui-badge slot="badge" variant="attention">3</mui-badge>
              </mui-button>
            </mui-grid>

            <mui-h-stack slot="right" space="var(--space-300)" alignx="end" aligny="center" padding="0">
              <mui-dropdown position="right">
                <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open profile menu">
                  <mui-avatar-chip label="Alex" background="blue" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip>
                  <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
                </mui-button>
                <mui-menu width="16rem">
                  <mui-button variant="tertiary" align="start">Profile</mui-button>
                  <mui-button variant="tertiary" align="start">Settings</mui-button>
                  <mui-button variant="tertiary" align="start">Sign out</mui-button>
                </mui-menu>
              </mui-dropdown>
            </mui-h-stack>
          </mui-header-bar>
          <mui-header-bar slot="show-below" size="medium">
            <mui-grid col="minmax(0, 1fr) auto" space="var(--space-200)" aligny="center" width="100%" padding="0 var(--space-300)">
              <mui-h-stack space="var(--space-200)" aligny="center">
                <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation"><mui-icon-menu slot="before"></mui-icon-menu></mui-button>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
              <mui-dropdown position="right">
                <mui-button slot="action" variant="tertiary" shape="circle" aria-label="Open profile menu"><mui-avatar label="Alex" background="blue"></mui-avatar></mui-button>
                <mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu>
              </mui-dropdown>
            </mui-grid>
          </mui-header-bar>
          </mui-responsive>

          <story-code-block slot="footer">
            &lt;mui-responsive variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;"&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-above" left-width="280px" right-width="auto" size="medium"&gt;<br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-menu slot="before"&gt;&lt;/mui-icon-menu&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack space="var(--space-200)" aligny="center"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-rectangle-dashed size="large"&gt;&lt;/mui-icon-rectangle-dashed&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="4" level="1"&gt;Acme&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br /><br />
            &nbsp;&nbsp;&lt;mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-300) 0 var(--space-500)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-search-input placeholder="Search Acme..." size="medium"&gt;&lt;/mui-search-input&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="secondary" shape="circle" aria-label="Notifications"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-notification slot="before"&gt;&lt;/mui-icon-notification&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot="badge" variant="attention"&gt;3&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&lt;/mui-grid&gt;<br /><br />
            &nbsp;&nbsp;&lt;mui-h-stack slot="right" space="var(--space-300)" alignx="end" aligny="center" padding="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open profile menu"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar-chip label="Alex" background="blue" primary="Alex Hurt" secondary="Product Designer"&gt;&lt;/mui-avatar-chip&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-down-chevron slot="after"&gt;&lt;/mui-icon-down-chevron&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu width="16rem"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start"&gt;Profile&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start"&gt;Settings&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start"&gt;Sign out&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-menu&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
            &nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-below" size="medium"&gt;...compact custom action header...&lt;/mui-header-bar&gt;<br />
            &lt;/mui-responsive&gt;
          </story-code-block>
        </story-card>

        <!-- Story 4: Size Scale -->
        <story-card
          id="size-scale"
          title="${storyMeta["size-scale"]?.title || "Size Scale"}"
          description="${storyMeta["size-scale"]?.description || "Header bar heights bound to x-small, small, medium, and large design tokens."}"
          usage="${storyMeta["size-scale"]?.usage || ""}"
        >
          <div slot="body" style="display: flex; flex-direction: column; gap: var(--space-400); width: 100%;">
            <mui-responsive variant="container" observe="self" breakpoint="800" style="width: 100%;">
            <mui-header-bar slot="show-above" size="x-small" left-width="240px">
              <mui-h-stack slot="left" space="var(--space-200)" aligny="center" padding="0 var(--space-500)">
                <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
              <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-500)">
                <mui-search-input placeholder="Search Acme..." size="small"></mui-search-input>
                <mui-button variant="secondary" shape="circle" size="small" aria-label="Notifications">
                  <mui-icon-notification slot="before" size="small"></mui-icon-notification>
                  <mui-badge slot="badge" variant="attention">3</mui-badge>
                </mui-button>
              </mui-grid>
              <mui-h-stack slot="right" aligny="center" padding="0">
                <mui-dropdown position="right" size="small">
                  <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open x-small profile menu">
                    <mui-avatar-chip label="Alex" background="orange" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip>
                    <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
                  </mui-button>
                  <mui-menu width="16rem">
                    <mui-button variant="tertiary" align="start">Profile</mui-button>
                    <mui-button variant="tertiary" align="start">Settings</mui-button>
                    <mui-button variant="tertiary" align="start">Sign out</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </mui-h-stack>
            </mui-header-bar>
            <mui-header-bar slot="show-below" size="x-small">
              <mui-grid col="minmax(0, 1fr) auto" aligny="center" width="100%" padding="0 var(--space-500)">
                <mui-h-stack space="var(--space-200)" aligny="center"><mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed><mui-heading size="4" level="1">Acme</mui-heading></mui-h-stack>
                <mui-dropdown position="right" size="small"><mui-button slot="action" variant="tertiary" aria-label="Open x-small profile menu"><mui-avatar label="Alex" background="orange"></mui-avatar></mui-button><mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu></mui-dropdown>
              </mui-grid>
            </mui-header-bar>
            </mui-responsive>
            <mui-responsive variant="container" observe="self" breakpoint="800" style="width: 100%;">
            <mui-header-bar slot="show-above" size="small" left-width="240px">
              <mui-h-stack slot="left" space="var(--space-200)" aligny="center" padding="0 var(--space-500)">
                <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
              <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-500)">
                <mui-search-input placeholder="Search Acme..." size="small"></mui-search-input>
                <mui-button variant="secondary" shape="circle" aria-label="Notifications">
                  <mui-icon-notification slot="before" size="small"></mui-icon-notification>
                  <mui-badge slot="badge" variant="attention">3</mui-badge>
                </mui-button>
              </mui-grid>
              <mui-h-stack slot="right" aligny="center" padding="0">
                <mui-dropdown position="right">
                  <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open small profile menu">
                    <mui-avatar-chip label="Alex" background="blue" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip>
                    <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
                  </mui-button>
                  <mui-menu width="16rem">
                    <mui-button variant="tertiary" align="start">Profile</mui-button>
                    <mui-button variant="tertiary" align="start">Settings</mui-button>
                    <mui-button variant="tertiary" align="start">Sign out</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </mui-h-stack>
            </mui-header-bar>
            <mui-header-bar slot="show-below" size="small">
              <mui-grid col="minmax(0, 1fr) auto" aligny="center" width="100%" padding="0 var(--space-500)">
                <mui-h-stack space="var(--space-200)" aligny="center"><mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed><mui-heading size="4" level="1">Acme</mui-heading></mui-h-stack>
                <mui-dropdown position="right"><mui-button slot="action" variant="tertiary" aria-label="Open small profile menu"><mui-avatar label="Alex" background="blue"></mui-avatar></mui-button><mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu></mui-dropdown>
              </mui-grid>
            </mui-header-bar>
            </mui-responsive>
            <mui-responsive variant="container" observe="self" breakpoint="800" style="width: 100%;">
            <mui-header-bar slot="show-above" size="medium" left-width="240px">
              <mui-h-stack slot="left" space="var(--space-200)" aligny="center" padding="0 var(--space-500)">
                <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
              <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-500)">
                <mui-search-input placeholder="Search Acme..." size="medium"></mui-search-input>
                <mui-button variant="secondary" shape="circle" aria-label="Notifications">
                  <mui-icon-notification slot="before"></mui-icon-notification>
                  <mui-badge slot="badge" variant="attention">3</mui-badge>
                </mui-button>
              </mui-grid>
              <mui-h-stack slot="right" aligny="center" padding="0">
                <mui-dropdown position="right">
                  <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open medium profile menu">
                    <mui-avatar-chip label="Alex" background="red" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip>
                    <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
                  </mui-button>
                  <mui-menu width="16rem">
                    <mui-button variant="tertiary" align="start">Profile</mui-button>
                    <mui-button variant="tertiary" align="start">Settings</mui-button>
                    <mui-button variant="tertiary" align="start">Sign out</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </mui-h-stack>
            </mui-header-bar>
            <mui-header-bar slot="show-below" size="medium">
              <mui-grid col="minmax(0, 1fr) auto" aligny="center" width="100%" padding="0 var(--space-500)">
                <mui-h-stack space="var(--space-200)" aligny="center"><mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed><mui-heading size="4" level="1">Acme</mui-heading></mui-h-stack>
                <mui-dropdown position="right"><mui-button slot="action" variant="tertiary" aria-label="Open medium profile menu"><mui-avatar label="Alex" background="red"></mui-avatar></mui-button><mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu></mui-dropdown>
              </mui-grid>
            </mui-header-bar>
            </mui-responsive>
            <mui-responsive variant="container" observe="self" breakpoint="800" style="width: 100%;">
            <mui-header-bar slot="show-above" size="large" left-width="240px">
              <mui-h-stack slot="left" space="var(--space-200)" aligny="center" padding="0 var(--space-500)">
                <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                <mui-heading size="4" level="1">Acme</mui-heading>
              </mui-h-stack>
              <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-500)">
                <mui-search-input placeholder="Search Acme..." size="large"></mui-search-input>
                <mui-button variant="secondary" shape="circle" aria-label="Notifications">
                  <mui-icon-notification slot="before" size="large"></mui-icon-notification>
                  <mui-badge slot="badge" variant="attention">3</mui-badge>
                </mui-button>
              </mui-grid>
              <mui-h-stack slot="right" aligny="center" padding="0">
                <mui-dropdown position="right">
                  <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open large profile menu">
                    <mui-avatar-chip label="Alex" background="green" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip>
                    <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
                  </mui-button>
                  <mui-menu width="16rem">
                    <mui-button variant="tertiary" align="start">Profile</mui-button>
                    <mui-button variant="tertiary" align="start">Settings</mui-button>
                    <mui-button variant="tertiary" align="start">Sign out</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </mui-h-stack>
            </mui-header-bar>
            <mui-header-bar slot="show-below" size="large">
              <mui-grid col="minmax(0, 1fr) auto" aligny="center" width="100%" padding="0 var(--space-500)">
                <mui-h-stack space="var(--space-200)" aligny="center"><mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed><mui-heading size="4" level="1">Acme</mui-heading></mui-h-stack>
                <mui-dropdown position="right"><mui-button slot="action" variant="tertiary" aria-label="Open large profile menu"><mui-avatar label="Alex" background="green"></mui-avatar></mui-button><mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu></mui-dropdown>
              </mui-grid>
            </mui-header-bar>
            </mui-responsive>

            ${[
              { size: "x-small", background: "orange" },
              { size: "small", background: "blue" },
              { size: "medium", background: "red" },
              { size: "large", background: "green" },
            ]
              .map(
                ({ size, background }) => `
              <mui-responsive variant="container" observe="self" breakpoint="800" style="width: 100%;">
                <mui-header-bar slot="show-above" size="${size}" left-width="240px">
                  <mui-h-stack slot="left" space="var(--space-200)" aligny="center" padding="0 var(--space-500)">
                    <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                    <mui-heading size="4" level="1">Acme</mui-heading>
                  </mui-h-stack>
                  <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 var(--space-500)">
                    <mui-search-input placeholder="Search Acme..." size="${size === "x-small" ? "small" : size}"></mui-search-input>
                    <mui-h-stack space="var(--space-500)" aligny="center">
                      <mui-button variant="secondary" shape="circle"${size === "x-small" ? ` size="small"` : ""} aria-label="Notifications">
                        <mui-icon-notification slot="before"${size === "medium" ? "" : ` size="${size === "x-small" ? "small" : size}"`}></mui-icon-notification>
                        <mui-badge slot="badge" variant="attention">3</mui-badge>
                      </mui-button>
                      <mui-dropdown position="right"${size === "x-small" ? ` size="small"` : ""}>
                        <mui-button slot="action" variant="tertiary" aria-label="Open ${size} profile menu">
                          <mui-avatar label="Alex" background="${background}"></mui-avatar>
                        </mui-button>
                        <mui-menu width="16rem">
                          <mui-button variant="tertiary" align="start">Profile</mui-button>
                          <mui-button variant="tertiary" align="start">Settings</mui-button>
                          <mui-button variant="tertiary" align="start">Sign out</mui-button>
                        </mui-menu>
                      </mui-dropdown>
                    </mui-h-stack>
                  </mui-grid>
                </mui-header-bar>
                <mui-header-bar slot="show-below" size="${size}">
                  <mui-grid col="minmax(0, 1fr) auto" aligny="center" width="100%" padding="0 var(--space-500)">
                    <mui-h-stack space="var(--space-200)" aligny="center"><mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed><mui-heading size="4" level="1">Acme</mui-heading></mui-h-stack>
                    <mui-dropdown position="right"${size === "x-small" ? ` size="small"` : ""}><mui-button slot="action" variant="tertiary" aria-label="Open ${size} profile menu"><mui-avatar label="Alex" background="${background}"></mui-avatar></mui-button><mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu></mui-dropdown>
                  </mui-grid>
                </mui-header-bar>
              </mui-responsive>
            `,
              )
              .join("")}
          </div>

          <story-code-block slot="footer">
            &lt;mui-responsive variant="container" observe="self" breakpoint="768"&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-above" size="x-small" left-width="240px"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;...product identity...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid col="minmax(0, 1fr) auto" padding="0 var(--space-500)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-search-input placeholder="Search Acme..." size="small"&gt;&lt;/mui-search-input&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="secondary" shape="circle" size="small" aria-label="Notifications"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-notification slot="before" size="small"&gt;&lt;/mui-icon-notification&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-badge slot="badge" variant="attention"&gt;3&lt;/mui-badge&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-grid&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="right" padding="0"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown position="right" size="small"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" gap="var(--space-400)" aria-label="Open profile menu"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar-chip label="Alex" background="orange" primary="Alex Hurt" secondary="Product Designer"&gt;&lt;/mui-avatar-chip&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-down-chevron slot="after"&gt;&lt;/mui-icon-down-chevron&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu width="16rem"&gt;...&lt;/mui-menu&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-below" size="x-small"&gt;&lt;mui-grid padding="0 var(--space-500)"&gt;...compact identity and avatar-only profile action...&lt;/mui-grid&gt;&lt;/mui-header-bar&gt;<br />
            &lt;/mui-responsive&gt;<br />
            &lt;!-- Repeat the same responsive pair for small, medium, and large. --&gt;
            <br /><br />
            &lt;!-- Avatar-only profile action: the inherited Button size controls the Avatar footprint. --&gt;<br />
            &lt;mui-h-stack space="var(--space-500)" aligny="center"&gt;<br />
            &nbsp;&nbsp;...notification action...<br />
            &nbsp;&nbsp;&lt;mui-dropdown position="right" size="small"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button slot="action" variant="tertiary" aria-label="Open profile menu"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-avatar label="Alex" background="orange"&gt;&lt;/mui-avatar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-menu width="16rem"&gt;...&lt;/mui-menu&gt;<br />
            &nbsp;&nbsp;&lt;/mui-dropdown&gt;<br />
            &lt;/mui-h-stack&gt;
          </story-code-block>
        </story-card>

        <!-- Story 5: Push Drawer Shell -->
        <story-card
          id="push-drawer-shell"
          title="Push Drawer Shell"
          description="Top application header paired with an open push navigation drawer."
        >
          <mui-v-stack slot="body" space="none" width="100%">
            <mui-responsive variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;">
              <mui-header-bar slot="show-above" left-width="280px" size="medium">
                <mui-h-stack data-push-header-left slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)">
                  <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation" aria-controls="push-drawer" aria-expanded="true" data-push-drawer-toggle>
                    <mui-icon-menu slot="before"></mui-icon-menu>
                  </mui-button>
                  <mui-h-stack space="var(--space-200)" aligny="center">
                    <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                    <mui-heading size="4" level="1">Acme</mui-heading>
                  </mui-h-stack>
                </mui-h-stack>

                <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 0 0 var(--space-500)">
                  <mui-search-input placeholder="Search Acme..." size="medium"></mui-search-input>
                  <mui-h-stack space="var(--space-500)" aligny="center">
                    <mui-button variant="secondary" shape="circle" aria-label="Notifications">
                      <mui-icon-notification slot="before"></mui-icon-notification>
                      <mui-badge slot="badge" variant="attention">3</mui-badge>
                    </mui-button>
                    <mui-dropdown position="right">
                      <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open profile menu">
                        <mui-avatar-chip label="Alex" background="blue" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip>
                        <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
                      </mui-button>
                      <mui-menu width="16rem">
                        <mui-button variant="tertiary" align="start">Profile</mui-button>
                        <mui-button variant="tertiary" align="start">Settings</mui-button>
                        <mui-button variant="tertiary" align="start">Sign out</mui-button>
                      </mui-menu>
                    </mui-dropdown>
                  </mui-h-stack>
                </mui-grid>
              </mui-header-bar>

              <mui-header-bar slot="show-below" size="medium">
                <mui-grid col="minmax(0, 1fr) auto" space="var(--space-200)" aligny="center" width="100%" padding="0 var(--space-300)">
                  <mui-h-stack space="var(--space-200)" aligny="center">
                    <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation" aria-controls="push-drawer" aria-expanded="true" data-push-drawer-toggle>
                      <mui-icon-menu slot="before"></mui-icon-menu>
                    </mui-button>
                    <mui-heading size="4" level="1">Acme</mui-heading>
                  </mui-h-stack>
                  <mui-dropdown position="right">
                    <mui-button slot="action" variant="tertiary" shape="circle" aria-label="Open profile menu">
                      <mui-avatar label="Alex" background="blue"></mui-avatar>
                    </mui-button>
                    <mui-menu width="16rem">
                      <mui-button variant="tertiary" align="start">Profile</mui-button>
                      <mui-button variant="tertiary" align="start">Settings</mui-button>
                      <mui-button variant="tertiary" align="start">Sign out</mui-button>
                    </mui-menu>
                  </mui-dropdown>
                </mui-grid>
              </mui-header-bar>
            </mui-responsive>

            <mui-drawer id="push-drawer" variant="push" open width="280px" side="left" hide-header panel-padding="none" height="60rem">
              <mui-v-stack space="var(--space-100)" width="100%" padding="var(--space-400)">
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-home slot="before"></mui-icon-home>Dashboard</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-grid slot="before"></mui-icon-grid>Analytics</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-text-below-folder slot="before"></mui-icon-text-below-folder>Projects</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-accessibility slot="before"></mui-icon-accessibility>Team</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-calendar slot="before"></mui-icon-calendar>Calendar</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-rectangle-media-text slot="before"></mui-icon-rectangle-media-text>Documents</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-gear slot="before"></mui-icon-gear>Settings</mui-button>
              </mui-v-stack>
              <div slot="page">
                <mui-container space="var(--space-400)">
                  <mui-v-stack space="var(--space-300)">
                    <mui-heading size="3" level="2">Dashboard</mui-heading>
                    <mui-body text="Page main content pushed by left drawer."></mui-body>
                  </mui-v-stack>
                </mui-container>
              </div>
            </mui-drawer>
          </mui-v-stack>

          <story-code-block slot="footer">
            &lt;mui-v-stack space="none" width="100%"&gt;<br />
            &nbsp;&nbsp;&lt;mui-responsive variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-header-bar slot="show-above" left-width="280px" size="medium"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack data-push-header-left slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation" aria-controls="push-drawer" aria-expanded="true" data-push-drawer-toggle&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-icon-menu slot="before"&gt;&lt;/mui-icon-menu&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...product identity...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid col="minmax(0, 1fr) auto" width="100%"&gt;...search and profile actions...&lt;/mui-grid&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-header-bar slot="show-below" size="medium"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid col="minmax(0, 1fr) auto" width="100%"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation" aria-controls="push-drawer" aria-expanded="true" data-push-drawer-toggle&gt;&lt;mui-icon-menu slot="before"&gt;&lt;/mui-icon-menu&gt;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...product identity...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...avatar action...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-grid&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &nbsp;&nbsp;&lt;/mui-responsive&gt;<br /><br />
            &nbsp;&nbsp;&lt;mui-drawer id="push-drawer" variant="push" open width="280px" side="left" hide-header panel-padding="none" height="60rem"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-100)" width="100%" padding="var(--space-400)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-home slot="before"&gt;&lt;/mui-icon-home&gt;Dashboard&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-grid slot="before"&gt;&lt;/mui-icon-grid&gt;Analytics&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-text-below-folder slot="before"&gt;&lt;/mui-icon-text-below-folder&gt;Projects&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-accessibility slot="before"&gt;&lt;/mui-icon-accessibility&gt;Team&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-calendar slot="before"&gt;&lt;/mui-icon-calendar&gt;Calendar&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-rectangle-media-text slot="before"&gt;&lt;/mui-icon-rectangle-media-text&gt;Documents&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" align="start" gap="var(--space-200)"&gt;&lt;mui-icon-gear slot="before"&gt;&lt;/mui-icon-gear&gt;Settings&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="page"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-container space="var(--space-400)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack space="var(--space-300)"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading size="3" level="2"&gt;Dashboard&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-body text="Page main content pushed by left drawer."&gt;&lt;/mui-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-container&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
            &nbsp;&nbsp;&lt;/mui-drawer&gt;<br />
            &lt;/mui-v-stack&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;const drawer = document.querySelector("#push-drawer");<br />
            &nbsp;&nbsp;const actions = document.querySelectorAll("[data-push-drawer-toggle]");<br />
            &nbsp;&nbsp;const headerLeft = document.querySelector("[data-push-header-left]");<br />
            &nbsp;&nbsp;const syncState = () =&gt; {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;const isOpen = drawer.hasAttribute("open");<br />
            &nbsp;&nbsp;&nbsp;&nbsp;actions.forEach((action) =&gt; action.setAttribute("aria-expanded", isOpen));<br />
            &nbsp;&nbsp;&nbsp;&nbsp;if (isOpen) headerLeft.setAttribute("slot", "left");<br />
            &nbsp;&nbsp;&nbsp;&nbsp;else headerLeft.removeAttribute("slot");<br />
            &nbsp;&nbsp;};<br />
            &nbsp;&nbsp;actions.forEach((action) =&gt; action.addEventListener("click", () =&gt; drawer.hasAttribute("open") ? drawer.close() : drawer.open()));<br />
            &nbsp;&nbsp;drawer.addEventListener("mui-drawer-open", syncState);<br />
            &nbsp;&nbsp;drawer.addEventListener("mui-drawer-close", syncState);<br />
            &nbsp;&nbsp;syncState();<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <!-- Story 6: Push Rail Drawer Shell -->
        <story-card
          id="push-rail-drawer-shell"
          title="Push Rail Drawer Shell"
          description="Responsive application header paired with an open, resizable push navigation drawer."
        >
          <mui-v-stack slot="body" space="none" width="100%">
            <mui-responsive breakpoint="768" style="width: 100%;">
              <mui-header-bar id="push-rail-header-wide" slot="show-above" resize-rail resize-min-column-width="240" resize-min-main-width="320" left-width="280px" size="medium">
                <mui-h-stack data-push-rail-header-left slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)">
                  <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation" aria-controls="push-rail-drawer" aria-expanded="true" data-push-rail-drawer-toggle><mui-icon-menu slot="before"></mui-icon-menu></mui-button>
                  <mui-h-stack space="var(--space-200)" aligny="center"><mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed><mui-heading size="4" level="1">Acme</mui-heading></mui-h-stack>
                </mui-h-stack>
                <mui-responsive variant="container" breakpoint="640" style="width: 100%;">
                  <mui-grid slot="show-above" col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 0 0 var(--space-500)">
                    <mui-search-input placeholder="Search Acme..." size="medium"></mui-search-input>
                    <mui-h-stack space="var(--space-500)" aligny="center">
                      <mui-button variant="secondary" shape="circle" aria-label="Notifications"><mui-icon-notification slot="before"></mui-icon-notification><mui-badge slot="badge" variant="attention">3</mui-badge></mui-button>
                      <mui-dropdown position="right">
                        <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open profile menu"><mui-avatar-chip label="Alex" background="blue" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip><mui-icon-down-chevron slot="after"></mui-icon-down-chevron></mui-button>
                        <mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu>
                      </mui-dropdown>
                    </mui-h-stack>
                  </mui-grid>
                  <mui-h-stack slot="show-below" space="var(--space-000)" alignx="end" aligny="center" width="100%" padding="0 var(--space-300)">
                    <mui-button variant="tertiary" shape="circle" aria-label="Search"><mui-icon-search slot="before"></mui-icon-search></mui-button>
                    <mui-button variant="secondary" shape="circle" aria-label="Notifications"><mui-icon-notification slot="before"></mui-icon-notification><mui-badge slot="badge" variant="attention">3</mui-badge></mui-button>
                    <mui-dropdown position="right"><mui-button slot="action" variant="tertiary" shape="circle" aria-label="Open profile menu"><mui-avatar label="Alex" background="blue"></mui-avatar></mui-button><mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu></mui-dropdown>
                  </mui-h-stack>
                </mui-responsive>
              </mui-header-bar>
              <mui-header-bar slot="show-below" size="medium">
                <mui-grid col="minmax(0, 1fr) auto" space="var(--space-200)" aligny="center" width="100%" padding="0 var(--space-300)">
                  <mui-h-stack space="var(--space-200)" aligny="center"><mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation" aria-controls="push-rail-drawer" aria-expanded="true" data-push-rail-drawer-toggle><mui-icon-menu slot="before"></mui-icon-menu></mui-button><mui-heading size="4" level="1">Acme</mui-heading></mui-h-stack>
                  <mui-dropdown position="right"><mui-button slot="action" variant="tertiary" shape="circle" aria-label="Open profile menu"><mui-avatar label="Alex" background="blue"></mui-avatar></mui-button><mui-menu width="16rem"><mui-button variant="tertiary" align="start">Profile</mui-button><mui-button variant="tertiary" align="start">Settings</mui-button><mui-button variant="tertiary" align="start">Sign out</mui-button></mui-menu></mui-dropdown>
                </mui-grid>
              </mui-header-bar>
            </mui-responsive>

            <mui-drawer id="push-rail-drawer" variant="push" open resize-rail resize-min-drawer-width="240" resize-min-page-width="320" width="280px" side="left" hide-header panel-padding="none" height="60rem">
              <mui-v-stack space="var(--space-100)" width="100%" padding="var(--space-400)">
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-home slot="before"></mui-icon-home>Dashboard</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-grid slot="before"></mui-icon-grid>Analytics</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-text-below-folder slot="before"></mui-icon-text-below-folder>Projects</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-accessibility slot="before"></mui-icon-accessibility>Team</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-calendar slot="before"></mui-icon-calendar>Calendar</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-rectangle-media-text slot="before"></mui-icon-rectangle-media-text>Documents</mui-button>
                <mui-button variant="tertiary" align="start" gap="var(--space-200)"><mui-icon-gear slot="before"></mui-icon-gear>Settings</mui-button>
              </mui-v-stack>
              <div slot="page">
                <mui-container space="var(--space-400)">
                  <mui-v-stack space="var(--space-300)">
                    <mui-heading size="3" level="2">Dashboard</mui-heading>
                    <mui-body text="Drag the rail to resize the navigation drawer and keep the Header Bar left column aligned."></mui-body>
                  </mui-v-stack>
                </mui-container>
              </div>
            </mui-drawer>
          </mui-v-stack>

          <story-code-block slot="footer">
            &lt;mui-v-stack space="none" width="100%"&gt;<br />
            &nbsp;&nbsp;&lt;mui-responsive breakpoint="768" style="width: 100%;"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-header-bar id="push-rail-header-wide" slot="show-above" resize-rail resize-min-column-width="240" resize-min-main-width="320" left-width="280px" size="medium"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack data-push-rail-header-left slot="left"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation" aria-controls="push-rail-drawer" aria-expanded="true" data-push-rail-drawer-toggle&gt;&lt;mui-icon-menu slot="before"&gt;&lt;/mui-icon-menu&gt;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...product identity...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-responsive variant="container" breakpoint="640" style="width: 100%;"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid slot="show-above"&gt;...search, notifications, and profile chip...&lt;/mui-grid&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="show-below"&gt;...compact search, notifications, and avatar menu...&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-responsive&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-header-bar slot="show-below" size="medium"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation" aria-controls="push-rail-drawer" aria-expanded="true" data-push-rail-drawer-toggle&gt;&lt;mui-icon-menu slot="before"&gt;&lt;/mui-icon-menu&gt;&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...compact identity and avatar action...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &nbsp;&nbsp;&lt;/mui-responsive&gt;<br />
            &nbsp;&nbsp;&lt;mui-drawer id="push-rail-drawer" variant="push" open resize-rail resize-min-drawer-width="240" resize-min-page-width="320" width="280px" side="left" hide-header panel-padding="none" height="60rem"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;...navigation actions...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div slot="page"&gt;...page content...&lt;/div&gt;<br />
            &nbsp;&nbsp;&lt;/mui-drawer&gt;<br />
            &lt;/mui-v-stack&gt;<br /><br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;const drawer = document.querySelector("#push-rail-drawer");<br />
            &nbsp;&nbsp;const header = document.querySelector("#push-rail-header-wide");<br />
            &nbsp;&nbsp;const headerLeft = header.querySelector("[data-push-rail-header-left]");<br />
            &nbsp;&nbsp;const syncLeftWidth = () =&gt; header.setAttribute("left-width", drawer.getAttribute("width"));<br />
            &nbsp;&nbsp;new MutationObserver(syncLeftWidth).observe(drawer, { attributes: true, attributeFilter: ["width"] });<br />
            &nbsp;&nbsp;header.addEventListener("mui-header-bar-resize", (event) =&gt; {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;if (event.detail.side === "left") drawer.setAttribute("width", event.detail.width);<br />
            &nbsp;&nbsp;});<br />
            &nbsp;&nbsp;header.addEventListener("mui-header-bar-resize-start", () =&gt; drawer.setAttribute("resizing", ""));<br />
            &nbsp;&nbsp;header.addEventListener("mui-header-bar-resize-end", () =&gt; drawer.removeAttribute("resizing"));<br />
            &nbsp;&nbsp;const toggleActions = document.querySelectorAll("[data-push-rail-drawer-toggle]");<br />
            &nbsp;&nbsp;const syncDrawerState = () =&gt; {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;const expanded = drawer.hasAttribute("open").toString();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;toggleActions.forEach((action) =&gt; action.setAttribute("aria-expanded", expanded));<br />
            &nbsp;&nbsp;&nbsp;&nbsp;if (drawer.hasAttribute("open")) headerLeft.setAttribute("slot", "left");<br />
            &nbsp;&nbsp;&nbsp;&nbsp;else headerLeft.removeAttribute("slot");<br />
            &nbsp;&nbsp;};<br />
            &nbsp;&nbsp;toggleActions.forEach((action) =&gt; {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;action.addEventListener("click", () =&gt; {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;drawer.hasAttribute("open") ? drawer.close() : drawer.open();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;syncDrawerState();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;});<br />
            &nbsp;&nbsp;});<br />
            &nbsp;&nbsp;drawer.addEventListener("mui-drawer-open", syncDrawerState);<br />
            &nbsp;&nbsp;drawer.addEventListener("mui-drawer-close", syncDrawerState);<br />
            &nbsp;&nbsp;syncDrawerState();<br />
            &nbsp;&nbsp;syncLeftWidth();<br />
            &lt;/script&gt;
          </story-code-block>
        </story-card>

        <!-- Story 7: Responsive Container Query Shell -->
        <story-card
          id="responsive-container-query"
          title="Responsive Container Query Shell"
          description="Uses mui-responsive container mode to switch between complete wide and compact header bar compositions at 48rem."
        >
          <mui-responsive slot="body" variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;">
            <mui-header-bar slot="show-above" left-width="280px" size="medium">
              <mui-h-stack slot="left" space="var(--space-300)" alignx="start" aligny="center" padding="0 var(--space-400)">
                <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation">
                  <mui-icon-menu slot="before"></mui-icon-menu>
                </mui-button>
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-icon-rectangle-dashed size="large"></mui-icon-rectangle-dashed>
                  <mui-heading size="4" level="1">Acme</mui-heading>
                </mui-h-stack>
              </mui-h-stack>

              <mui-grid col="minmax(0, 1fr) auto" space="var(--space-300)" aligny="center" width="100%" padding="0 0 0 var(--space-500)">
                <mui-search-input placeholder="Search Acme..." size="medium"></mui-search-input>
                <mui-h-stack space="var(--space-500)" aligny="center">
                  <mui-button variant="secondary" shape="circle" aria-label="Notifications">
                    <mui-icon-notification slot="before"></mui-icon-notification>
                    <mui-badge slot="badge" variant="attention">3</mui-badge>
                  </mui-button>
                  <mui-dropdown position="right">
                    <mui-button gap="var(--space-400)" slot="action" variant="tertiary" aria-label="Open profile menu">
                      <mui-avatar-chip label="Alex" background="blue" primary="Alex Hurt" secondary="Product Designer"></mui-avatar-chip>
                      <mui-icon-down-chevron slot="after"></mui-icon-down-chevron>
                    </mui-button>
                    <mui-menu width="16rem">
                      <mui-button variant="tertiary" align="start">Profile</mui-button>
                      <mui-button variant="tertiary" align="start">Settings</mui-button>
                      <mui-button variant="tertiary" align="start">Sign out</mui-button>
                    </mui-menu>
                  </mui-dropdown>
                </mui-h-stack>
              </mui-grid>
            </mui-header-bar>

            <mui-header-bar slot="show-below" size="medium">
              <mui-grid col="minmax(0, 1fr) auto" space="var(--space-200)" aligny="center" width="100%" padding="0 var(--space-300)">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-button variant="tertiary" shape="circle" aria-label="Toggle navigation">
                    <mui-icon-menu slot="before"></mui-icon-menu>
                  </mui-button>
                  <mui-heading size="4" level="1">Acme</mui-heading>
                </mui-h-stack>
                <mui-dropdown position="right">
                  <mui-button slot="action" variant="tertiary" shape="circle" aria-label="Open profile menu">
                    <mui-avatar label="Alex" background="blue"></mui-avatar>
                  </mui-button>
                  <mui-menu width="16rem">
                    <mui-button variant="tertiary" align="start">Profile</mui-button>
                    <mui-button variant="tertiary" align="start">Settings</mui-button>
                    <mui-button variant="tertiary" align="start">Sign out</mui-button>
                  </mui-menu>
                </mui-dropdown>
              </mui-grid>
            </mui-header-bar>
          </mui-responsive>

          <story-code-block slot="footer">
            &lt;mui-responsive variant="container" observe="mui-header-bar" breakpoint="768" style="width: 100%;"&gt;<br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-above" left-width="280px" size="medium"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack slot="left"&gt;...&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid col="minmax(0, 1fr) auto" width="100%"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-search-input placeholder="Search Acme..." size="medium"&gt;&lt;/mui-search-input&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack&gt;...notifications and profile chip...&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-grid&gt;<br /><br />
            &nbsp;&nbsp;&lt;/mui-header-bar&gt;<br /><br />
            &nbsp;&nbsp;&lt;mui-header-bar slot="show-below" size="medium"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-grid col="minmax(0, 1fr) auto" width="100%"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-h-stack&gt;...menu and product identity...&lt;/mui-h-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-dropdown&gt;...avatar-only profile action...&lt;/mui-dropdown&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-grid&gt;<br />
            &nbsp;&nbsp;&lt;/mui-header-bar&gt;<br />
            &lt;/mui-responsive&gt;
          </story-code-block>
        </story-card>
      </story-template>
    `;

    const pushDrawer = this.shadowRoot.querySelector("#push-drawer");
    const pushDrawerToggleActions = this.shadowRoot.querySelectorAll("[data-push-drawer-toggle]");
    const pushHeaderLeft = this.shadowRoot.querySelector("[data-push-header-left]");
    if (pushDrawer) {
      const syncPushDrawerState = () => {
        const isOpen = pushDrawer.hasAttribute("open");
        const expanded = isOpen.toString();
        pushDrawerToggleActions.forEach((action) => action.setAttribute("aria-expanded", expanded));
        if (isOpen) pushHeaderLeft?.setAttribute("slot", "left");
        else pushHeaderLeft?.removeAttribute("slot");
      };
      this.pushDrawerToggleHandler = () => {
        pushDrawer.hasAttribute("open") ? pushDrawer.close() : pushDrawer.open();
      };
      this.pushDrawerStateHandler = syncPushDrawerState;
      pushDrawerToggleActions.forEach((action) => action.addEventListener("click", this.pushDrawerToggleHandler));
      pushDrawer.addEventListener("mui-drawer-open", this.pushDrawerStateHandler);
      pushDrawer.addEventListener("mui-drawer-close", this.pushDrawerStateHandler);
      syncPushDrawerState();
    }

    const railDrawer = this.shadowRoot.querySelector("#push-rail-drawer");
    const railHeader = this.shadowRoot.querySelector("#push-rail-header-wide");
    const railHeaderLeft = railHeader?.querySelector("[data-push-rail-header-left]");
    const syncRailHeaderWidth = () => {
      const width = railDrawer?.getAttribute("width");
      if (width && railHeader) railHeader.setAttribute("left-width", width);
    };

    if (railDrawer && railHeader) {
      this.drawerWidthObserver?.disconnect();
      this.drawerWidthObserver = new MutationObserver(syncRailHeaderWidth);
      this.drawerWidthObserver.observe(railDrawer, { attributes: true, attributeFilter: ["width"] });
      this.headerResizeHandler = (event) => {
        if (event.detail?.side === "left") railDrawer.setAttribute("width", event.detail.width);
      };
      this.headerResizeStartHandler = () => railDrawer.setAttribute("resizing", "");
      this.headerResizeEndHandler = () => railDrawer.removeAttribute("resizing");
      railHeader.addEventListener("mui-header-bar-resize", this.headerResizeHandler);
      railHeader.addEventListener("mui-header-bar-resize-start", this.headerResizeStartHandler);
      railHeader.addEventListener("mui-header-bar-resize-end", this.headerResizeEndHandler);
      const drawerToggleActions = this.shadowRoot.querySelectorAll("[data-push-rail-drawer-toggle]");
      const syncDrawerToggleState = () => {
        const isOpen = railDrawer.hasAttribute("open");
        const expanded = isOpen.toString();
        drawerToggleActions.forEach((action) => action.setAttribute("aria-expanded", expanded));
        if (isOpen) railHeaderLeft?.setAttribute("slot", "left");
        else railHeaderLeft?.removeAttribute("slot");
      };
      this.drawerToggleHandler = () => {
        railDrawer.hasAttribute("open") ? railDrawer.close() : railDrawer.open();
        syncDrawerToggleState();
      };
      this.drawerStateHandler = syncDrawerToggleState;
      drawerToggleActions.forEach((action) => action.addEventListener("click", this.drawerToggleHandler));
      railDrawer.addEventListener("mui-drawer-open", this.drawerStateHandler);
      railDrawer.addEventListener("mui-drawer-close", this.drawerStateHandler);
      syncRailHeaderWidth();
      syncDrawerToggleState();
    }
  }

  disconnectedCallback() {
    this.drawerWidthObserver?.disconnect();
    if (this.pushDrawerToggleHandler)
      this.shadowRoot
        ?.querySelectorAll("[data-push-drawer-toggle]")
        .forEach((action) => action.removeEventListener("click", this.pushDrawerToggleHandler));
    const pushDrawer = this.shadowRoot?.querySelector("#push-drawer");
    if (pushDrawer && this.pushDrawerStateHandler) {
      pushDrawer.removeEventListener("mui-drawer-open", this.pushDrawerStateHandler);
      pushDrawer.removeEventListener("mui-drawer-close", this.pushDrawerStateHandler);
    }
    const railHeader = this.shadowRoot?.querySelector("#push-rail-header-wide");
    if (railHeader && this.headerResizeHandler)
      railHeader.removeEventListener("mui-header-bar-resize", this.headerResizeHandler);
    if (railHeader && this.headerResizeStartHandler)
      railHeader.removeEventListener("mui-header-bar-resize-start", this.headerResizeStartHandler);
    if (railHeader && this.headerResizeEndHandler)
      railHeader.removeEventListener("mui-header-bar-resize-end", this.headerResizeEndHandler);
    if (this.drawerToggleHandler)
      this.shadowRoot
        ?.querySelectorAll("[data-push-rail-drawer-toggle]")
        .forEach((action) => action.removeEventListener("click", this.drawerToggleHandler));
    const railDrawer = this.shadowRoot?.querySelector("#push-rail-drawer");
    if (railDrawer && this.drawerStateHandler) {
      railDrawer.removeEventListener("mui-drawer-open", this.drawerStateHandler);
      railDrawer.removeEventListener("mui-drawer-close", this.drawerStateHandler);
    }
  }
}

if (!customElements.get("story-header-bar")) {
  customElements.define("story-header-bar", storyHeaderBar);
}
