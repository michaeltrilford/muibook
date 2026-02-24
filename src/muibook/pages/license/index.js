class LicensePage extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = /*css*/ `
      :host { display: block; }
    `;

    shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="License"
        description="Muibook is source-available. Source visibility is open, and usage rights are governed by the repository license plus any signed commercial agreement. Commercial and redistribution rights require separate commercial terms."
        container-max-width="78rem"
      >

          <mui-v-stack space="var(--space-800)">

            <mui-v-stack space="var(--space-800)">
              <mui-form-section class="form-shell" heading="Commercial Licensing" heading-level="2">
                <mui-field label="Company">
                  <mui-input id="license-company" placeholder="Company name"></mui-input>
                </mui-field>
                <mui-field label="Use Case">
                  <mui-textarea id="license-use-case" placeholder="Briefly describe your product and intended usage." rows="3"></mui-textarea>
                </mui-field>
                <mui-field label="Contact Email">
                  <mui-input id="license-contact-email" type="email" placeholder="you@company.com"></mui-input>
                  <mui-form-message slot="message" size="small">
                    <mui-icon-info slot="before" size="small" color="var(--text-color-optional)"></mui-icon-info>
                    We reply with a commercial licensing path based on your use case.
                  </mui-form-message>
                </mui-field>
 
                <mui-form-section-footer slot="footer">
                  <mui-rule></mui-rule>
                  <mui-responsive breakpoint="700">
                    <mui-v-stack slot="showBelow" space="var(--space-200)" alignx="stretch">
                    <mui-button id="request-terms-btn-mobile" variant="primary" size="medium">Request now</mui-button>
                    <mui-link
                      size="medium"
                      href="https://github.com/michaeltrilford/muibook/blob/main/LICENSE"
                      target="_blank"
                      weight="regular"
                      variant="tertiary"
                    >
                      License
                    </mui-link>
                    </mui-v-stack>
                    <mui-h-stack slot="showAbove" space="var(--space-200)" aligny="center" alignx="end">
                      <mui-link
                        size="medium"
                        href="https://github.com/michaeltrilford/muibook/blob/main/LICENSE"
                        target="_blank"
                        weight="regular"
                        variant="tertiary"
                      >
                        License
                      </mui-link>
                      <mui-button id="request-terms-btn" variant="primary" size="medium">Request now</mui-button>
                    </mui-h-stack>
                  </mui-responsive>
                </mui-form-section-footer>

              </mui-form-section>

              
            </mui-v-stack>


            <mui-v-stack space="var(--space-800)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="2" size="2">License Documents</mui-heading>
                <mui-list as="ul">
                  <mui-list-item size="medium">
                    Repository license:
                    <mui-link size="medium" href="https://github.com/michaeltrilford/muibook/blob/main/LICENSE" target="_blank">
                      LICENSE
                    </mui-link>
                  </mui-list-item>
                  <mui-list-item class="list-item" size="medium">
                    Package distribution:
                    <mui-link size="medium" href="https://www.npmjs.com/package/@muibook/components" target="_blank">
                      @muibook/components
                    </mui-link>
                  </mui-list-item>
                </mui-list>
              </mui-v-stack>

              <mui-rule></mui-rule>

              <mui-v-stack class="faq" space="var(--space-400)">
                <mui-heading level="2" size="2">FAQ</mui-heading>
                <mui-card>
                  <mui-card-body>
                    <mui-accordion-group>
                      <mui-accordion-block heading="Can a company use Muibook in production by default?">
                        <mui-body slot="detail" size="small">
                          Production-at-scale, redistribution, SaaS, and white-label use should run under commercial terms.
                        </mui-body>
                      </mui-accordion-block>
                      <mui-accordion-block heading="Can we evaluate internally first?">
                        <mui-body slot="detail" size="small">
                          Yes. Internal evaluation and education are supported by the source-available license.
                        </mui-body>
                      </mui-accordion-block>
                      <mui-accordion-block heading="Where do legal terms live?">
                        <mui-body slot="detail" size="small">
                          Start with the repository LICENSE. Commercial rights are granted via a separate agreement.
                        </mui-body>
                      </mui-accordion-block>
                    </mui-accordion-group>
                  </mui-card-body>
                </mui-card>
              </mui-v-stack>
            </mui-v-stack>
          </mui-v-stack>

      </story-template>
    `;

    const openRequestMail = () => {
      const readValue = (id) => {
        const el = shadowRoot.querySelector(`#${id}`);
        if (!el) return "";
        return String(el.value ?? el.getAttribute("value") ?? "").trim();
      };
      const company = readValue("license-company");
      const useCase = readValue("license-use-case");
      const email = readValue("license-contact-email");
      const subject = encodeURIComponent("Muibook Commercial Licensing Request");
      const body = encodeURIComponent(
        [
          "Hi Muibook team,",
          "",
          "I'd like to discuss commercial licensing for @muibook/components.",
          "",
          `Company: ${company || ""}`,
          `Primary use case: ${useCase || ""}`,
          `Contact email: ${email || ""}`,
          "",
          "Best regards,",
        ].join("\n"),
      );
      window.location.href = `mailto:muibook@proton.me?subject=${subject}&body=${body}`;
    };

    const requestBtn = shadowRoot.querySelector("#request-terms-btn");
    const requestBtnMobile = shadowRoot.querySelector("#request-terms-btn-mobile");
    requestBtn?.addEventListener("click", openRequestMail);
    requestBtnMobile?.addEventListener("click", openRequestMail);
  }
}

customElements.define("license-page", LicensePage);
