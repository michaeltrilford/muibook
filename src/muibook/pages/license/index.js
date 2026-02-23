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
        description="Muibook is source-available for education and internal use. Source visibility is open, and usage rights are governed by the repository license plus any signed commercial agreement. Commercial and redistribution rights require separate commercial terms."
        container-max-width="78rem"
      >

          <mui-v-stack space="var(--space-800)">

            <mui-v-stack space="var(--space-600)">
              <mui-form-section class="form-shell" heading="Commercial Licensing Request">
                <mui-field label="Company">
                  <mui-input id="license-company" placeholder="Company name"></mui-input>
                </mui-field>
                <mui-field label="Use Case">
                  <mui-textarea id="license-use-case" placeholder="Briefly describe your product and intended usage." rows="3"></mui-textarea>
                </mui-field>
                <mui-field label="Contact Email">
                  <mui-input id="license-contact-email" type="email" placeholder="you@company.com"></mui-input>
                  <mui-form-hint slot="message" size="small">
                    We reply with a commercial licensing path based on your use case.
                  </mui-form-hint>
                </mui-field>
              </mui-form-section>

              <mui-v-stack class="cta-actions" space="var(--space-400)" alignx="end">
                <mui-h-stack space="var(--space-200)" aligny="center">
                  <mui-link
                    size="medium"
                    href="https://github.com/michaeltrilford/muibook/blob/main/LICENSE"
                    target="_blank"
                    weight="regular"
                    variant="tertiary"
                  >
                    Review LICENSE
                  </mui-link>
                  <mui-button id="request-terms-btn" variant="primary" size="medium">Request Commercial Terms</mui-button>
                </mui-h-stack>
              </mui-v-stack>

              <mui-rule></mui-rule>
              
            </mui-v-stack>


            <mui-v-stack space="var(--space-800)">
              <mui-v-stack space="var(--space-300)">
                <mui-heading level="3" size="5">License Documents</mui-heading>
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

              <mui-v-stack class="faq" space="var(--space-200)">
                <mui-heading level="3" size="5">FAQ</mui-heading>
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

    const requestBtn = shadowRoot.querySelector("#request-terms-btn");
    requestBtn?.addEventListener("click", () => {
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
    });
  }
}

customElements.define("license-page", LicensePage);
