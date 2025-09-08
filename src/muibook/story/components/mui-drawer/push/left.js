class storyPushLeft extends HTMLElement {
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

    const invoiceHeader = /*html*/ `
      <mui-h-stack space="var(--space-300)" alignY="center">
        <mui-heading size="4" level="4">New Invoice</mui-heading>
        <mui-badge>Preview</mui-badge>
      </mui-h-stack>
    `;

    const invoice = /*html*/ `
      <mui-v-stack space="var(--space-600);" style="margin-bottom: var(--space-500)">
      
        <mui-h-stack alignX="space-between">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-400); width: 90px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>  
            <div style="height:var(--heading-font-size-100); width: 100px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-400); width: 150px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-400); min-width: 80px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height:var(--heading-font-size-100); min-width: 80px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-h-stack>

        <mui-v-stack alignX="stretch" space="var(--space-300);">
          <mui-v-stack space="var(--space-300);">
            <div style="height:var(--heading-font-size-100); width:80%; max-width:200px; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
          <mui-v-stack space="var(--space-100);">
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
            <div style="height: 6rem; width:100%; background:var(--surface-elevated-100); border-radius:var(--radius-200);"></div>
          </mui-v-stack>
        </mui-v-stack>

      </mui-v-stack>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>
      <div class="fullscreen">
        <mui-drawer slot="body" variant="push" data-drawer="drawer-4" width="320px" side="left">
          <div slot="page" class="page-main">
            <div class="page-header">
              ${invoiceHeader}
              <mui-dropdown position="right">
                <mui-button variant="tertiary" slot="action"><mui-icon-ellipsis></mui-icon-ellipsis></mui-button>
                <mui-button variant="tertiary" data-drawer="drawer-4">Edit Details</mui-button>
                <mui-button disabled variant="tertiary">Add line-item</mui-button>
              </mui-dropdown>
            </div>
            <div class="page-content">
              ${invoice}
            </div>
          </div>
          <mui-heading size="4" level="4" slot="title">Invoice Details</mui-heading>
          <form>
            <mui-v-stack space="var(--space-400)">
              <mui-input label="Customer" value="Hank Barry"></mui-input>
              <mui-input label="Invoice ID" value="IV001"></mui-input>
              <mui-input label="Purchase ID" value="9900"></mui-input>
              <mui-input label="Issued" value="16/10/2025"></mui-input>
              <mui-input label="Due" value="15/11/2025"></mui-input>
              <mui-input label="Invoice note" value="Thank you for your business Hank, we hope you enjoy the delicious product - Wendy"></mui-input>
            </mui-v-stack>
          </form>
          <mui-button slot="actions" variant="tertiary" data-close>Cancel</mui-button>
          <mui-button slot="actions" variant="primary">Save</mui-button>
        </mui-drawer>
      </div>
    `;

    // Open dialog buttons
    this.shadowRoot.querySelectorAll("mui-button[data-drawer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-drawer");
        const drawer = this.shadowRoot.querySelector(`mui-drawer[data-drawer="${target}"]`);
        if (drawer) drawer.setAttribute("open", "");
      });
    });

    // Close buttons inside each dialog
    this.shadowRoot.querySelectorAll("mui-drawer[data-drawer]").forEach((drawer) => {
      drawer.querySelectorAll("mui-button[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => drawer.removeAttribute("open"));
      });
    });
  }
}

customElements.define("story-push-left", storyPushLeft);
