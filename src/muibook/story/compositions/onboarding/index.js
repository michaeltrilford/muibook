class Onboarding extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const styles = /*css*/ `
      :host { 
        display: block;
      }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template 
        title="Onboarding"
        description="Creating compositions provide the Design System a view of how the system is working and where it needs flexibility."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/onboarding/index.js"
      >

      <mui-v-stack space="var(--space-700)">

          <mui-message id="colors" variant="info" heading="Working with Web Components and Shadow DOM">
            <mui-v-stack space="var(--space-200)">
              <mui-body size="small">
                Accessing internal input values and handling actions requires awareness of Shadow DOM boundaries.
                </mui-body>
                <mui-list as="ul">
                  <mui-list-item size="small">Use shadowRoot.querySelector(...) to target elements inside Web Components.</mui-list-item>
                  <mui-list-item size="small">Use await to ensure components are defined and their internal state (like .value or .checked) is ready.</mui-list-item>
                  <mui-list-item size="small">Ensures accurate state reading and avoids race conditions during form logic or validation.</mui-list-item>
                </mui-list>
            </mui-v-stack>
          </mui-message>

        <story-card title="Sign Up" description="This composition demonstrates how foundational components can be arranged to create a sign-up form. Due to Shadow DOM boundaries, native form submission via type='submit' doesn’t behave as expected. Instead, manual logic is applied to ensure proper submission — a pattern often required when working with Web Components.">

          <mui-container small center slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Sign up for our product!</mui-heading>
              </mui-card-header>
              <mui-card-body>
                <form>
                  <mui-v-stack space="var(--space-400)">
                    <mui-field id="firstNameField" label="First Name">
                      <mui-input type="text" placeholder="John" />
                    </mui-field>
                    <mui-field id="lastNameField" label="Last Name">
                      <mui-input type="text" placeholder="Doe" />
                    </mui-field>
                    <mui-field id="emailField" label="Email">
                      <mui-input type="email" placeholder="john@example.com" />
                    </mui-field>
                    <mui-field id="passwordField" label="Password">
                      <mui-input type="password" />
                    </mui-field>
                    <mui-field id="confirmPasswordField" label="Confirm Password">
                      <mui-input type="password" />
                    </mui-field>
                    <mui-field id="termsField">
                      <mui-checkbox id="agreeTerms">I agree to the <mui-link href="/terms" size="small">terms and conditions</mui-link></mui-checkbox>
                    </mui-field>
                    <mui-button-group right>
                      <mui-button variant="primary">Sign up</mui-button>
                    </mui-button-group>
                  </mui-v-stack>
                </form>
              </mui-card-body>
            </mui-card>
          </mui-container>

          <mui-code slot="footer" scrollable>
            <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/onboarding/index.js">👨‍💻 View full code on Github</mui-link>
            <br /><br /><br /><br />
            // Example: Submit Logic<br />
            ///////////////////////////////////// <br /><br />
            const&nbsp;signUpButton&nbsp;=&nbsp;this.shadowRoot.querySelector("mui-button");<br /><br />
            if&nbsp;(signUpButton)&nbsp;{<br />
            &nbsp;&nbsp;&nbsp;&nbsp;signUpButton.addEventListener("click",&nbsp;()&nbsp;=&gt;&nbsp;this.handleSubmit());<br />
            }<br /><br /><br /><br />

            // Example: Validation Query<br />
            ///////////////////////////////////// <br /><br />
            async _gatherFormValues() {<br />
              &nbsp;&nbsp;const getField = (id) => this.shadowRoot.getElementById(id);<br /><br />

              &nbsp;&nbsp;const fields = {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;firstName: getField("firstNameField"),<br />
                &nbsp;&nbsp;&nbsp;&nbsp;lastName: getField("lastNameField"),<br />
                &nbsp;&nbsp;&nbsp;&nbsp;...<br />
                &nbsp;&nbsp;&nbsp;&nbsp;terms: getField("termsField"),<br />
              &nbsp;&nbsp;};<br /><br />

              &nbsp;&nbsp;return {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;firstName: await this.getInputValue(fields.firstName),<br />
                &nbsp;&nbsp;&nbsp;&nbsp;lastName: await this.getInputValue(fields.lastName),<br />
                &nbsp;&nbsp;&nbsp;&nbsp;...<br />
                &nbsp;&nbsp;&nbsp;&nbsp;agreed: await this.getCheckboxChecked(fields.terms),<br />
              &nbsp;&nbsp;};<br />
            }<br /><br /><br /><br />

            // Sign Up Form<br />
            ///////////////////////////////////// <br /><br />
            &lt;mui-container&nbsp;small&nbsp;center&gt;<br />
            &nbsp;&nbsp;&lt;mui-card&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-header&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-heading&nbsp;size="3"&gt;Sign&nbsp;up&nbsp;for&nbsp;our&nbsp;product!&lt;/mui-heading&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-header&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-card-body&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;form&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-v-stack&nbsp;space="var(--space-400)"&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="firstNameField"&nbsp;label="First&nbsp;Name"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;type="text"&nbsp;placeholder="John"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="lastNameField"&nbsp;label="Last&nbsp;Name"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;type="text"&nbsp;placeholder="Doe"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="emailField"&nbsp;label="Email"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;type="email"&nbsp;placeholder="john@example.com"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="passwordField"&nbsp;label="Password"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;type="password"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="confirmPasswordField"&nbsp;label="Confirm&nbsp;Password"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;type="password"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="termsField"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-checkbox&nbsp;id="agreeTerms"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I agree to the &lt;mui-link href="/terms" size="small">terms and conditions&lt;/mui-link&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-checkbox&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&nbsp;right&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&nbsp;variant="primary"&gt;Sign&nbsp;up&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/form&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card&gt;<br />
            &lt;/mui-container&gt;
            </mui-code>
      

        </story-card>

      </mui-v-stack>

      </story-template>
    `;

    const agree = this.shadowRoot.querySelector("#agreeTerms");
    if (agree) {
      agree.addEventListener("change", () => {
        const termsField = this.shadowRoot.getElementById("termsField");
        if (termsField) {
          termsField.removeAttribute("message");
          termsField.removeAttribute("variant");
        }
      });
    }

    const signUpButton = this.shadowRoot.querySelector("mui-button");
    if (signUpButton) {
      signUpButton.addEventListener("click", () => this.handleSubmit());
    }
  }

  async _getShadowInputValue(selector) {
    const el = this.shadowRoot.querySelector(selector);
    if (!el) return "";
    await customElements.whenDefined(el.tagName.toLowerCase());
    const inner = el.shadowRoot?.querySelector("input, textarea");
    return inner?.value.trim() || "";
  }

  async getInputValue(field) {
    if (!field) return "";
    return this._getShadowInputValue(`#${field.id} mui-input`);
  }

  async getCheckboxChecked(field) {
    if (!field) return false;
    const checkbox = field.querySelector("mui-checkbox");
    if (!checkbox) return false;
    await customElements.whenDefined("mui-checkbox");
    const inner = checkbox.shadowRoot?.querySelector("input[type='checkbox']");
    return inner?.checked ?? false;
  }

  async handleSubmit(event) {
    if (event && typeof event.preventDefault === "function") event.preventDefault();

    const values = await this._gatherFormValues();
    this._clearValidation();

    const errors = this._validate(values);

    if (Object.keys(errors).length) {
      this._showValidationErrors(errors);
      return;
    }

    console.log("Form submitted:", values);
  }

  async _gatherFormValues() {
    const getField = (id) => this.shadowRoot.getElementById(id);

    const fields = {
      firstName: getField("firstNameField"),
      lastName: getField("lastNameField"),
      email: getField("emailField"),
      password: getField("passwordField"),
      confirmPassword: getField("confirmPasswordField"),
      terms: getField("termsField"),
    };

    return {
      firstName: await this.getInputValue(fields.firstName),
      lastName: await this.getInputValue(fields.lastName),
      email: await this.getInputValue(fields.email),
      password: await this.getInputValue(fields.password),
      confirmPassword: await this.getInputValue(fields.confirmPassword),
      agreed: await this.getCheckboxChecked(fields.terms),
      fields, // keep for validation display
    };
  }

  _clearValidation() {
    const getField = (id) => this.shadowRoot.getElementById(id);
    ["firstNameField", "lastNameField", "emailField", "passwordField", "confirmPasswordField", "termsField"].forEach(
      (id) => {
        const field = getField(id);
        if (field) {
          field.removeAttribute("message");
          field.removeAttribute("variant");
        }
      }
    );
  }

  _validate(values) {
    const errors = {};

    if (!values.email.includes("@")) {
      errors.email = "Enter a valid email to proceed";
    }
    if (!values.password || values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!values.agreed) {
      errors.terms = "You must agree to the terms and conditions";
    }
    return errors;
  }

  _showValidationErrors(errors) {
    const getField = (id) => this.shadowRoot.getElementById(id);

    if (errors.email) {
      const field = getField("emailField");
      if (field) {
        field.setAttribute("message", errors.email);
        field.setAttribute("variant", "error");
      }
    }
    if (errors.password) {
      const field = getField("passwordField");
      if (field) {
        field.setAttribute("message", errors.password);
        field.setAttribute("variant", "error");
      }
    }
    if (errors.confirmPassword) {
      const field = getField("confirmPasswordField");
      if (field) {
        field.setAttribute("message", errors.confirmPassword);
        field.setAttribute("variant", "error");
      }
    }
    if (errors.terms) {
      const field = getField("termsField");
      if (field) {
        field.setAttribute("message", errors.terms);
        field.setAttribute("variant", "error");
      }
    }
  }
}

customElements.define("comp-onboarding", Onboarding);
