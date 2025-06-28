class DesignGuidelines extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
      .panel {
        padding: var(--space-600);
        border: var(--border-thin);
        border-radius: var(--radius-400);
        background: var(--surface-elevated-200);
      }
    
    `;

    const figmaContent = /*html*/ `
      <mui-v-stack space="var(--space-200)" class="panel">
        <mui-heading size="4" level="4">Figma Plugin</mui-heading>  
        <mui-body size="medium">Install via <mui-link size="medium" weight="bold" href="https://www.figma.com/community/plugin/1471341082690554711/guru-guides" target="_blank">Figma</mui-link> and login to access MUI Guides directly in Figma.</mui-body>
      </mui-v-stack>
    `;
    const websiteContent = /*html*/ `
      <mui-v-stack space="var(--space-200)" class="panel">
        <mui-heading size="4" level="4">Website</mui-heading>
        <mui-body size="medium">Visit <mui-link size="medium" weight="bold" href="https://guides.muibook.com" target="_blank">guides.muibook.com</mui-link> and view Mui Guides in-browser.</mui-body>
      </mui-v-stack>
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Design Guidelines"
        figma="https://www.figma.com/design/l0mt1lXu97XoHJCEdnrWLp/Mui-Design-System?node-id=0-1&t=dSPmUahUSkrLxFYS-1"
        website="https://guides.muibook.com"
      >


      <mui-v-stack space="var(--space-700)">

       <page-banner></page-banner>

        <page-card title="MUI Credentials" description="To view the MUI Guidelines in Guru Guides, you must be logged in.">
          <mui-v-stack slot="body" space="var(--space-600)">  

            <mui-v-stack space="var(--space-400)">        

              <mui-input label="Email" id="email-input" name="email" value="muibook@proton.me">
                <mui-button slot="after">Copy</mui-button>
              </mui-input>
              <mui-input label="Password" id="password-input" name="password" value="muikit">
                <mui-button slot="after">Copy</mui-button>
              </mui-input>

            </mui-v-stack>


            <mui-responsive breakpoint="1080">

              <mui-grid space="var(--space-500)" slot="showAbove">
                ${figmaContent}
                ${websiteContent}
              </mui-grid>

              <mui-v-stack space="var(--space-400)" slot="showBelow">  
                ${figmaContent}
                ${websiteContent}
              </mui-v-stack>

            </mui-responsive>


          </mui-v-stack>
        </page-card>

      </mui-v-stack>

      </story-template>
    `;

    // Wait for the DOM to render
    requestAnimationFrame(() => {
      const copyButtons = shadowRoot.querySelectorAll("mui-button");

      copyButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const parentInput = button.closest("mui-input");
          const value = parentInput?.getAttribute("value");

          if (value) {
            try {
              await navigator.clipboard.writeText(value);
              button.innerText = "Copied!";
              setTimeout(() => {
                button.innerText = "Copy";
              }, 1500);
            } catch (err) {
              console.error("Failed to copy text: ", err);
              button.innerText = "Error";
              setTimeout(() => {
                button.innerText = "Copy";
              }, 1500);
            }
          }
        });
      });
    });
  }
}

customElements.define("design-guidelines", DesignGuidelines);
