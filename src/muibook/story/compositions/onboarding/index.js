class Onboarding extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.formValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: false,
    };
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
        storybook="https://stories.muibook.com/?path=/docs/compositions-onboarding--docs"
      >

          <mui-message variant="neutral" heading="Working with Web Component Form Controls">
            <mui-v-stack space="var(--space-200)">
              <mui-body size="small">
                Form logic should use the custom element host contract before reaching into Shadow DOM internals.
                </mui-body>
                <mui-list as="ul">
                  <mui-list-item size="small">Listen for composed, bubbling input/change events on the custom element host.</mui-list-item>
                  <mui-list-item size="small">Read values from event.detail.value or event.detail.checked.</mui-list-item>
                  <mui-list-item size="small">Use shadowRoot.querySelector(...) only for focus recovery, legacy fallbacks, or tests.</mui-list-item>
                </mui-list>
            </mui-v-stack>
          </mui-message>

        <story-card title="Sign Up" description="This composition demonstrates how foundational components can be arranged to create a sign-up form. The form listens to Web Component host events and reads event detail for validation instead of querying internal shadow inputs.">

          <mui-container small center slot="body">
            <mui-card>
              <mui-card-header>
                <mui-heading size="3">Sign up for our product!</mui-heading>
              </mui-card-header>
              <mui-card-body>
                <form>
                  <mui-v-stack space="var(--space-400)">
                    <mui-field id="firstNameField" label="First Name">
                      <mui-input id="firstNameInput" type="text" placeholder="John" />
                    </mui-field>
                    <mui-field id="lastNameField" label="Last Name">
                      <mui-input id="lastNameInput" type="text" placeholder="Doe" />
                    </mui-field>
                    <mui-field id="emailField" label="Email">
                      <mui-input id="emailInput" type="email" placeholder="john@example.com" />
                    </mui-field>
                    <mui-field id="passwordField" label="Password">
                      <mui-input id="passwordInput" type="password" />
                    </mui-field>
                    <mui-field id="confirmPasswordField" label="Confirm Password">
                      <mui-input id="confirmPasswordInput" type="password" />
                    </mui-field>
                    <mui-field id="termsField">
                      <mui-checkbox id="agreeTerms">I agree to the <mui-link href="/terms" size="small">terms and conditions</mui-link></mui-checkbox>
                    </mui-field>
                    <mui-button-group align="right">
                      <mui-button id="signUpButton" variant="primary">Sign up</mui-button>
                    </mui-button-group>
                  </mui-v-stack>
                </form>
              </mui-card-body>
            </mui-card>
          </mui-container>

          <story-code-block slot="footer" scrollable>
            <mui-link size="x-small" href="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/onboarding/index.js">👨‍💻 View full code on Github</mui-link>
            <br /><br /><br /><br />
            // Example: Submit Logic<br />
            ///////////////////////////////////// <br /><br />
            const&nbsp;signUpButton&nbsp;=&nbsp;this.shadowRoot.getElementById("signUpButton");<br /><br />
            if&nbsp;(signUpButton)&nbsp;{<br />
            &nbsp;&nbsp;&nbsp;&nbsp;signUpButton.addEventListener("click",&nbsp;()&nbsp;=&gt;&nbsp;this.handleSubmit());<br />
            }<br /><br /><br /><br />

            // Example: Host Event Binding<br />
            ///////////////////////////////////// <br /><br />
            const&nbsp;bindInput&nbsp;=&nbsp;(id,&nbsp;key)&nbsp;=&gt;&nbsp;{<br />
            &nbsp;&nbsp;const&nbsp;input&nbsp;=&nbsp;this.shadowRoot.getElementById(id);<br />
            &nbsp;&nbsp;if&nbsp;(!input)&nbsp;return;<br /><br />
            &nbsp;&nbsp;input.addEventListener("input",&nbsp;(event)&nbsp;=&gt;&nbsp;{<br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.formValues[key]&nbsp;=&nbsp;event.detail?.value?.trim()&nbsp;??&nbsp;"";<br />
            &nbsp;&nbsp;});<br />
            };<br /><br />

            bindInput("firstNameInput", "firstName");<br />
            bindInput("lastNameInput", "lastName");<br />
            bindInput("emailInput", "email");<br />
            bindInput("passwordInput", "password");<br />
            bindInput("confirmPasswordInput", "confirmPassword");<br /><br />

            const&nbsp;agreeTerms&nbsp;=&nbsp;this.shadowRoot.getElementById("agreeTerms");<br />
            agreeTerms.addEventListener("change",&nbsp;(event)&nbsp;=&gt;&nbsp;{<br />
            &nbsp;&nbsp;this.formValues.agreed&nbsp;=&nbsp;Boolean(event.detail?.checked);<br />
            });<br /><br />

            _gatherFormValues() {<br />
            &nbsp;&nbsp;return&nbsp;{&nbsp;...this.formValues&nbsp;};<br />
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;id="firstNameInput"&nbsp;type="text"&nbsp;placeholder="John"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="lastNameField"&nbsp;label="Last&nbsp;Name"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;id="lastNameInput"&nbsp;type="text"&nbsp;placeholder="Doe"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="emailField"&nbsp;label="Email"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;id="emailInput"&nbsp;type="email"&nbsp;placeholder="john@example.com"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="passwordField"&nbsp;label="Password"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;id="passwordInput"&nbsp;type="password"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="confirmPasswordField"&nbsp;label="Confirm&nbsp;Password"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-input&nbsp;id="confirmPasswordInput"&nbsp;type="password"&nbsp;/&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-field&nbsp;id="termsField"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-checkbox&nbsp;id="agreeTerms"&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I agree to the &lt;mui-link href="/terms" size="small">terms and conditions&lt;/mui-link&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-checkbox&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-field&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button-group&nbsp;align=&quot;right&quot;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;mui-button&nbsp;id="signUpButton"&nbsp;variant="primary"&gt;Sign&nbsp;up&lt;/mui-button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-button-group&gt;<br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-v-stack&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/form&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/mui-card-body&gt;<br />
            &nbsp;&nbsp;&lt;/mui-card&gt;<br />
            &lt;/mui-container&gt;
            </story-code-block>
      

        </story-card>

      </story-template>
    `;

    this._bindFormState();

    const agree = this.shadowRoot.getElementById("agreeTerms");
    if (agree) {
      agree.addEventListener("change", () => {
        const termsField = this.shadowRoot.getElementById("termsField");
        if (termsField) {
          termsField.removeAttribute("message");
          termsField.removeAttribute("variant");
        }
      });
    }

    const signUpButton = this.shadowRoot.getElementById("signUpButton");
    if (signUpButton) {
      signUpButton.addEventListener("click", () => this.handleSubmit());
    }
  }

  _bindFormState() {
    const bindInput = (id, key) => {
      const input = this.shadowRoot.getElementById(id);
      if (!input) return;

      input.addEventListener("input", (event) => {
        this.formValues[key] = event.detail?.value?.trim() ?? "";
      });
    };

    bindInput("firstNameInput", "firstName");
    bindInput("lastNameInput", "lastName");
    bindInput("emailInput", "email");
    bindInput("passwordInput", "password");
    bindInput("confirmPasswordInput", "confirmPassword");

    const agreeTerms = this.shadowRoot.getElementById("agreeTerms");
    if (agreeTerms) {
      agreeTerms.addEventListener("change", (event) => {
        this.formValues.agreed = Boolean(event.detail?.checked);
      });
    }
  }

  handleSubmit(event) {
    if (event && typeof event.preventDefault === "function") event.preventDefault();

    const values = this._gatherFormValues();
    this._clearValidation();

    const errors = this._validate(values);

    if (Object.keys(errors).length) {
      this._showValidationErrors(errors);
      return;
    }

    console.log("Form submitted:", values);
  }

  _gatherFormValues() {
    return { ...this.formValues };
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
      },
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
