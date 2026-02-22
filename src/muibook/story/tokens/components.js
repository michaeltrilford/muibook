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

    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Components"
        description="Tokens that map brand and semantic decisions to UI components, applying consistent, themed styling across components and their states."
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=3-527&t=fSFYVey9aCoE5oQa-1"
        github="https://github.com/michaeltrilford/muibook/blob/main/public/css/mui-tokens.css"
      >

          <story-quicklinks
            slot="message"
            heading="Quicklinks"
            limit="10"
            links="addon::Add On|||alert::Alert|||avatar::Avatar|||badge::Badge|||body::Body|||button::Button|||card::Card|||carousel::Carousel|||checkbox::Checkbox|||chip::Chip|||code::Code|||dialog::Dialog|||drawer::Drawer|||dropdown::Dropdown|||heading::Heading|||icon::Icon|||image::Image|||input::Input|||label::Label|||link-button::Link Button|||link-default::Link Default|||list::List|||message::Message|||progress::Progress|||radio::Radio|||slat::Slat|||stepper::Stepper|||switch::Switch|||tab::Tab Bar|||table::Table"
          ></story-quicklinks>

          <spec-card
            id="addon"
            title="Add On"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-addon/index.ts"
          >
            <story-token-slat slot="body" token="--addon-background" variant="color"></story-token-slat>
          </spec-card>

          <spec-card id="alert" title="Alert" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-alert/index.ts">
            <story-token-slat slot="body" token="--alert-radius" variant="radius"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Feedback</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="avatar" title="Avatar" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-avatar/index.ts">
            <story-token-slat slot="body" token="--avatar-x-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--avatar-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--avatar-medium" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--avatar-large" variant="size"></story-token-slat>

            <story-token-slat slot="body" token="--avatar-background-neutral" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--avatar-background-positive" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--avatar-background-warning" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--avatar-background-attention" variant="color"></story-token-slat>

            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Text</mui-link> tokens</mui-body>
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

          <spec-card id="body" title="Body" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-card/body/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Text</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="button" title="Button" description="Button uses the 'Action' tokens to define the visual behavior of call-to-action button elements." github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-button/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Action</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="card" title="Card" github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-card">
            <story-token-slat slot="body" token="--card-radius" variant="radius"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Surface</mui-link> tokens</mui-body>
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
            id="checkbox"
            title="Checkbox"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-checkbox/index.ts"
          >
            <story-token-slat slot="body" token="--checkbox-size" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--checkbox-radius" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--checkbox-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--checkbox-background-checked" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--checkbox-background-disabled" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--checkbox-background-checked-disabled" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--checkbox-icon-color-checked" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--checkbox-icon-color-checked-disabled" variant="color"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Form</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card
            id="chip"
            title="Chip"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-chip/index.ts"
          >
            <story-token-slat slot="body" token="--chip-radius" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--chip-radius-x-small" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--chip-radius-small" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--chip-radius-medium" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--chip-radius-large" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--chip-height-x-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-height-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-height-medium" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-height-large" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-padding-x-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-padding-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-padding-medium" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-padding-large" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-gap-x-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-gap-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-gap-medium" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-gap-large" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--chip-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-background-focus" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-background-active" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-border-color-focus" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-border-color-active" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-text-color-active" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-icon-fill" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-dismiss-action-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--chip-dismiss-action-background-hover" variant="color"></story-token-slat>
          </spec-card>

          <spec-card id="code" title="Code" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-code/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Text</mui-link> tokens</mui-body>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Surface</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card
            id="dialog"
            title="Dialog"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-dialog/index.ts"
          >
            <story-token-slat slot="body" token="--dialog-radius" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--dialog-background" variant="color"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Surface</mui-link> tokens</mui-body>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Border</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card
            id="drawer"
            title="Drawer"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-drawer/index.ts"
          >
            <story-token-slat slot="body" token="--drawer-background" variant="color"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Surface</mui-link> tokens</mui-body>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Border</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card
            id="dropdown"
            title="Dropdown"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-dropdown/index.ts"
          >
            <story-token-slat slot="body" token="--dropdown-radius" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--dropdown-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--dropdown-button-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--dropdown-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--dropdown-shadow-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--dropdown-offset" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--dropdown-min-width" variant="size"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Surface</mui-link> tokens</mui-body>
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

          <spec-card id="icon" title="Icon" github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-icons">
            <story-token-slat slot="body" token="--icon-color-default" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--icon-color-inverted" variant="color"></story-token-slat>
          </spec-card>

          <spec-card id="image" title="Image" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-image/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Text</mui-link> tokens</mui-body>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Surface</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card
            id="input"
            title="Input"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-input/index.ts"
          >
            <story-token-slat slot="body" token="--input-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--input-background-disabled" variant="color"></story-token-slat>
          </spec-card>

          <spec-card id="label" title="Label" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-input/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Text</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="link-button" title="Link Button" description="Link button uses the 'Action' tokens to define the visual behavior of call-to-action button elements." github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-link/index.ts">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Action</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="link-default" title="Link Default" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-link/index.ts">
            <story-token-slat slot="body" token="--link-text-color-default" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--link-text-color-default-hover" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--link-text-color-default-focus" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--link-text-color-default-disabled" variant="text-color"></story-token-slat>
          </spec-card>

          <spec-card id="list" title="List" github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-list">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Text</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card id="message" title="Message" github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-message/index.ts">
            <story-token-slat slot="body" token="--message-radius" variant="radius"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Feedback</mui-link> tokens</mui-body>
          </spec-card>

          <spec-card
            id="progress"
            title="Progress"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-progress/index.ts"
          >
            <story-token-slat slot="body" token="--progress-bar-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--progress-syncing-bar-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--progress-track-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--progress-loading-bar-100" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--progress-loading-bar-200" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--progress-radius" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--progress-syncing-width" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--progress-pending-stripe-size" variant="size"></story-token-slat>
          </spec-card>

          <spec-card
            id="radio"
            title="Radio"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-radio/index.ts"
          >
            <story-token-slat slot="body" token="--radio-size" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--radio-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--radio-background-disabled" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--radio-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--radio-border-color-hover" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--radio-border-color-checked" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--radio-border-color-disabled" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--radio-dot-color-checked" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--radio-dot-color-checked-disabled" variant="color"></story-token-slat>
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
            <story-token-slat slot="body" token="--slat-avatar-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--slat-avatar-background-hover" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--slat-card-avatar-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--slat-card-avatar-background-hover" variant="color"></story-token-slat>
          </spec-card>

          <spec-card
            id="stepper"
            title="Stepper"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-stepper/index.ts"
          >
            <story-token-slat slot="body" token="--stepper-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-background-active" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-background-inactive" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-text-color-active" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-icon-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-dot-size" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-dot-size-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-dot-size-x-small" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-success-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-warning-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-error-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-disabled-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--stepper-disabled-opacity" variant="opacity"></story-token-slat>
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Text</mui-link> tokens</mui-body>
          </spec-card>

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

          <spec-card
            id="tab"
            title="Tab Bar"
            github="https://github.com/michaeltrilford/muibook/blob/main/src/components/mui-tabs"
          >
            <story-token-slat slot="body" token="--tab-border-color" variant="border-color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-background" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-background-active" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-icon" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-icon-active" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-text-color" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-text-color-active" variant="text-color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-shadow-active" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-radius" variant="radius"></story-token-slat>
            <story-token-slat slot="body" token="--tab-padding" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--tab-before-slot-padding" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--tab-after-slot-padding" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--tab-edge-padding-extra" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--tab-gap" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--tab-dot-size" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--tab-dot-gap" variant="size"></story-token-slat>
            <story-token-slat slot="body" token="--tab-dot-color" variant="color"></story-token-slat>
            <story-token-slat slot="body" token="--tab-dot-color-active" variant="color"></story-token-slat>
          </spec-card>

          <spec-card id="table" title="Table" github="https://github.com/michaeltrilford/muibook/tree/main/src/components/mui-table">
            <mui-body size="x-small" class="reference" slot="body">Refer to <mui-link size="x-small" href="/#/semantic-design-tokens">Border</mui-link> tokens</mui-body>
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

    shadowRoot.addEventListener("story-quicklink-select", (event) => {
      const targetId = event.detail?.targetId;
      if (!targetId) return;

      const targetEl = shadowRoot.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

customElements.define("tokens-components", tokensComponents);
