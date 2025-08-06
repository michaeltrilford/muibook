class tokensComponents extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .reference {
        padding: var(--space-500) var(--space-500); 
        border-top: var(--border-thin);
      }

      @media (min-width: 768px) {
        .reference {
          padding: var(--space-500) var(--space-600); 
        }
      }

      .token-item-menu::part(flex-wrap) {
        flex-wrap: wrap;
        column-gap: var(--space-300);
        row-gap: var(--space-100);
      }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Components"
        description="Component tokens are a blend of specific values and references to relevant semantic or contextual tokens. They provide the final, practical styling applied directly to UI components and their states."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-527&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >

          <mui-message heading="Quicklinks" slot="message">
            <mui-h-stack class="token-item-menu" alignY="center" style="padding-bottom: var(--space-100);">
              <mui-link size="small" data-scroll-link="switch">Switch</mui-link>  
              <mui-link size="small" data-scroll-link="icon">Icon</mui-link>
              <mui-link size="small" data-scroll-link="card">Card</mui-link>
              <mui-link size="small" data-scroll-link="badge">Badge</mui-link>
              <mui-link size="small" data-scroll-link="table">Table</mui-link>
              <mui-link size="small" data-scroll-link="image">Image</mui-link>
              <mui-link size="small" data-scroll-link="code">Code</mui-link>
              <mui-link size="small" data-scroll-link="alert">Alert</mui-link>
              <mui-link size="small" data-scroll-link="message">Message</mui-link>
              <mui-link size="small" data-scroll-link="button">Button</mui-link>
              <mui-link size="small" data-scroll-link="link-button">Link Button</mui-link>
              <mui-link size="small" data-scroll-link="link-default">Link Default</mui-link>
              <mui-link size="small" data-scroll-link="heading">Heading</mui-link>
              <mui-link size="small" data-scroll-link="body">Body</mui-link>
              <mui-link size="small" data-scroll-link="label">Label</mui-link>
              <mui-link size="small" data-scroll-link="list">List</mui-link>
              <mui-link size="small" data-scroll-link="input">Input</mui-link>
              <mui-link size="small" data-scroll-link="addon">Add On</mui-link>
              <mui-link size="small" data-scroll-link="tab">Tab Bar</mui-link>
              <mui-link size="small" data-scroll-link="carousel">Carousel</mui-link>
              <mui-link size="small" data-scroll-link="slat">Slat</mui-link>
            </mui-h-stack>
          </mui-message>

          <spec-card 
            id="switch"
            title="Switch"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-switch/index.ts"
            description="The width and height is determined by the switch offset and thumb size."
          >
            <story-token-slat slot="body" token="--switch-track-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--switch-track-background-checked" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--switch-thumb-bg" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--switch-icon" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--switch-offset" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--switch-thumb-size" variant="size"></story-token-slat>
          </spec-card>

          <spec-card id="icon" title="Icon" github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-icons">
            <story-token-slat slot="body" token="--icon-color-default" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--icon-color-inverted" variant="color"></story-token-slat>
          </spec-card>

          <spec-card id="card" title="Card" github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-card">
            <story-token-slat slot="body" token="--card-radius" variant="radius"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Surface Contextual</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="badge" title="Badge" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-badge/index.ts">
            <story-token-slat slot="body" token="--badge-radius" variant="radius"></story-token-slat>

            <story-token-slat slot="body" token="--badge-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--badge-font-weight" variant="font-weight"></story-token-slat>

            <story-token-slat slot="body" token="--badge-background-neutral" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--badge-background-positive" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--badge-background-warning" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--badge-background-attention" variant="color"></story-token-slat>
          </spec-card>

          <spec-card id="table" title="Table" github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-table">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Border Contextual</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="image" title="Image" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-image/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Text Contextual</mui-link> tokens</mui-body>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Surface Contextual</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="code" title="Code" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-code/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Text Contextual</mui-link> tokens</mui-body>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Surface Contextual</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="alert" title="Alert" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-alert/index.ts">
            <story-token-slat slot="body" token="--alert-radius" variant="radius"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Feedback Semantic</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="message" title="Message" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-message/index.ts">
            <story-token-slat slot="body" token="--message-radius" variant="radius"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Feedback Semantic</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="button" title="Button" description="Button uses the 'Action' tokens to define the visual behavior of call-to-action button elements." github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-button/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Action Semantic</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="link-button" title="Link Button" description="Link button uses the 'Action' tokens to define the visual behavior of call-to-action button elements." github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-link/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Action Semantic</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="link-default" title="Link Default" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-link/index.ts">
            <story-token-slat slot="body" token="--link-text-color-default" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--link-text-color-default-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--link-text-color-default-focus" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--link-text-color-default-disabled" variant="text-color"></story-token-slat>
          </spec-card>

          <spec-card id="heading" title="Heading" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-heading/index.ts">
            <story-token-slat slot="body" token="--heading-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--heading-font-weight" variant="font-weight"></story-token-slat>

            <story-token-slat slot="body" token="--heading-font-size-100" variant="text-size" line-height="--heading-line-height-100" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-font-size-200" variant="text-size" line-height="--heading-line-height-200" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-font-size-300" variant="text-size" line-height="--heading-line-height-300" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-font-size-400" variant="text-size" line-height="--heading-line-height-400" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-font-size-500" variant="text-size" line-height="--heading-line-height-500" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-font-size-600" variant="text-size" line-height="--heading-line-height-600" font-weight="--heading-font-weight"></story-token-slat>

            <story-token-slat slot="body" token="--heading-line-height-100" variant="line-height" font-size="--heading-font-size-100" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-line-height-200" variant="line-height" font-size="--heading-font-size-200" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-line-height-300" variant="line-height" font-size="--heading-font-size-300" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-line-height-400" variant="line-height" font-size="--heading-font-size-400" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-line-height-500" variant="line-height" font-size="--heading-font-size-500" font-weight="--heading-font-weight"></story-token-slat>
            <story-token-slat slot="body" token="--heading-line-height-600" variant="line-height" font-size="--heading-font-size-600" font-weight="--heading-font-weight"></story-token-slat>
          </spec-card>

          <spec-card id="body" title="Body" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-card/body/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Text Contextual</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="label" title="Label" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-input/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Text Contextual</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="list" title="List" github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-list">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/contextual-design-tokens">Text Contextual</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card 
            id="input"
            title="Input"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-input/index.ts"
          >
            <story-token-slat slot="body" token="--input-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--input-background-disabled" variant="color"></story-token-slat>
          </spec-card>

          <spec-card 
            id="addon"
            title="Add On"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-addon/index.ts"
          >
            <story-token-slat slot="body" token="--addon-background" variant="color"></story-token-slat>
          </spec-card>

          <spec-card 
            id="tab"
            title="Tab Bar"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-tabs"
          >
            <story-token-slat slot="body" token="--tab-border-color" variant="border"></story-token-slat>  
            <story-token-slat slot="body" token="--tab-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-background-active" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-icon" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-icon-active" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-text-color-active" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-shadow-active" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-radius" variant="radius"></story-token-slat>
          </spec-card>

          <spec-card 
            id="carousel"
            title="Carousel"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-carousel"
          >
            <story-token-slat slot="body" token="--carousel-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--carousel-radius" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--carousel-tab-position" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--carousel-tab-offset" variant="size"></story-token-slat>
          </spec-card>

          <spec-card 
            id="slat"
            title="Slat"
            description="These tokens are exposed so consumers can tailor background color states to fit their brand."
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-slat/index.ts"
          >
            <story-token-slat slot="body" token="--slat-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--slat-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--slat-card-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--slat-card-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--slat-radius" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--slat-accessory-background" variant="color"></story-token-slat>
          </spec-card>

      </story-template>
    `;

    // Spec Card - Minimal scroll-to handler
    // The common href with hash could not be used because of the hash navigation
    // Usage: <mui-link data-scroll-link="surface">Text</mui-link>
    shadowRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll-link]");
      if (!trigger) return;

      event.preventDefault();

      const targetId = trigger.getAttribute("data-scroll-link");
      if (!targetId) return;

      const targetEl = shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("tokens-components", tokensComponents);
