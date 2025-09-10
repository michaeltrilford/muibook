class storyPersistentRight extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }

      .fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 101;
        background: var(--surface);
        overflow-y: scroll;
      }

      .page-header {
        background: var(--surface-elevated-100);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: calc(var(--space-400) + env(safe-area-inset-top)) var(--space-400) var(--space-400) var(--space-500);
        border-bottom: var(--border-thin);
        box-sizing: border-box;
        min-height: 7.7rem;
      }

      .page-main {
        background: var(--surface-elevated-200);
      }

      .page-content {
        padding: var(--space-500) var(--space-500);
        box-sizing: border-box;
        height: calc(100dvh - (7.7rem  + (env(safe-area-inset-top) + env(safe-area-inset-bottom)) ));
        overflow: scroll;
      }

      @media (max-width: 768px) {
        .page-content {
          height: auto;
        }
      }

    `;

    const bill = /*html*/ `
      <mui-v-stack space="var(--space-600);" style="margin-bottom: var(--space-500)">

        <mui-h-stack alignX="space-between">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-100); width: 60px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-400); width: 100px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100);" alignX="end">
            <div style="height: 0.8rem; width: 40px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 0.8rem; width: 60px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 0.8rem; width: 30px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-h-stack>

        <mui-grid col="1fr auto">
          <mui-v-stack space="var(--space-300);" alignX="end">
            <div style="height: 9.6rem; width: 180px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-grid>

        <mui-v-stack alignX="stretch" space="var(--space-300);">
          <mui-v-stack space="var(--space-300);">
            <div style="height: 1.6rem; width: 90px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>

          <mui-v-stack space="var(--space-100);">
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 2.4rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-v-stack>

      </mui-v-stack>
    `;

    const reviewStepper = /*html*/ `
        <mui-v-stack space="0" style="margin-bottom: var(--space-400);">
          <div 
            style="
              background: var(--surface-elevated-200);
              padding: var(--space-400);
              border-top-left-radius: var(--radius-300); 
              border-top-right-radius: var(--radius-300); 
              border: var(--border-thin);
            "
          >
            <mui-body size="small" weight="bold">Guru has prefilled the fields</mui-body>
            <mui-body size="small">Review the items and proceed</mui-body>
          </div>
          <div 
            style="
              background: var(--surface-elevated-200);
              padding: var(--space-400) 0 var(--space-500);
              border-bottom-left-radius: var(--radius-300); 
              border-bottom-right-radius: var(--radius-300); 
              border: var(--border-thin);
                border-top: none;
            "
          >
            <mui-stepper direction="horizontal" active-step="2">
              <mui-step title="Details">
              </mui-step>
              <mui-step title="Items">
              </mui-step>
              <mui-step title="Pay">
              </mui-step>
            </mui-stepper>
          </div>
        </mui-v-stack>
      `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div class="fullscreen">
      <mui-drawer  variant="persistent" width="320px" slot="body" side="right">
        <div slot="page" class="page-main">
          <div class="page-header">
            <mui-heading size="4" level="4">Smart Bills</mui-heading>
          </div>
          <div class="page-content">
            ${bill}
          </div>
        </div>
        <mui-heading size="4" level="4" slot="title">Review Items</mui-heading>
        ${reviewStepper}
        <form>
          <mui-v-stack space="var(--space-400)">
            <mui-input label="Item" value="Hank Barry"></mui-input>
            <mui-input label="Description" value="Telstra Upfront 5G Internet"></mui-input>
            <mui-input label="Allocate to" value="Internet"></mui-input>
            <mui-input label="Qty" value="1"></mui-input>
            <mui-input label="Unit price" value="85.50"></mui-input>
          </mui-v-stack>
        </form>
        <mui-button slot="actions" variant="tertiary">Back</mui-button>
        <mui-button slot="actions" variant="primary">Next</mui-button>
      </mui-drawer>
      </div>
    `;
  }
}

customElements.define("story-persistent-right", storyPersistentRight);
