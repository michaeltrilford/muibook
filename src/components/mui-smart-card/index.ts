import "../mui-body";
import "../mui-badge";

class MuiSmartCard extends HTMLElement {
  static get observedAttributes() {
    return [
      "state",
      "number",
      "variant",
      "partner",
      "type",
      "logo",
      "logo-width",
      "logo-height",
      "bg-color",
      "bg-image",
      "inverted",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const state = this.getAttribute("state") || "default";
    const number = this.getAttribute("number") || "0000";
    const background = this.getAttribute("bg-color");
    const backgroundImage = this.getAttribute("bg-image");
    const variant = this.getAttribute("variant") || "plain";
    const inverted = this.hasAttribute("inverted");
    const type = this.getAttribute("type") || "";
    const isFrozen = state === "frozen";
    const logo = this.getAttribute("logo") || "";
    const partner = this.getAttribute("partner") || "";
    const logoHeightAttr = this.getAttribute("logo-height");
    const logoHeight =
      logoHeightAttr && !isNaN(parseInt(logoHeightAttr, 10)) ? parseInt(logoHeightAttr, 10) : undefined;

    let cardClass = "card";
    let surfaceStyle = "";

    if (variant === "animated") {
      cardClass += " animated";
    } else {
      cardClass += " plain";
    }

    if (backgroundImage) {
      surfaceStyle = `
        background-image: url(${backgroundImage});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `;
    } else if (background) {
      surfaceStyle = `background: ${background};`;
    } else {
      surfaceStyle = `
        background: ${
          inverted
            ? "linear-gradient(180deg, var(--grey-900) 0%, var(--black) 100%)"
            : "linear-gradient(180deg, var(--grey-200) 0%, var(--white) 100%)"
        };
      `;
    }

    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        @keyframes cardAnimationMobile {
          0% {
            background-size: 101.265823% auto;
            background-position: center;
          }
          60% {
            background-size: 106.329114% auto;
            background-position: center;
          }
          100% {
            background-size: 101.265823% auto;
            background-position: center;
          }
        }

        @keyframes cardAnimationDesktop {
          0% {
            background-size: 400px auto;
            background-position: center;
          }
          60% {
            background-size: 420px auto;
            background-position: center;
          }
          100% {
            background-size: 400px auto;
            background-position: center;
          }
        }

        @keyframes cardGradient {
          0% { background-position: 0% 10%; }
          50% { background-position: 100% 91%; }
          100% { background-position: 0% 10%; }
        }

        :host {
          width: 100%;
          max-width: 395px;
          min-width: 247px;
          border-radius: var(--radius-300);
          overflow: hidden;
          box-shadow: 0 0px 8px rgb(0 0 0 / 12%), 0 2px 16px rgb(0 0 0 / 12%),
            0 4px 20px rgb(0 0 0 / 12%), 0 12px 28px rgb(0 0 0 / 12%);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: calc(var(--space-300) + var(--space-025));
          padding-bottom: 0;
        }

        /* Company */
        /* =========================================== */
        .logo {
          display: flex;
          justify-content: flex-end;
          align-items: start;
          max-width: 60%;
          max-height: 60%;
          overflow: hidden;
        }

        .logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
          width: auto;
          height: ${logoHeight ? `calc(${logoHeight}px / 1.5)` : "auto"};
        }

        @media (min-width: 500px) {
          .logo img {
            width: auto;
            height: ${logoHeight ? `${logoHeight}px` : "auto"};
          }   
        }

        /* Invert Logic */
        /* =========================================== */
        .type,
        .card-number::part(display) {
          color: ${inverted ? "var(--white)" : "var(--black)"};
          text-shadow: ${inverted ? "0 0px 8px rgb(0 0 0 / 12%);" : "0 0px 8px rgb(255 255 255 / 12%);"};
        }

        img { 
          filter: ${
            inverted
              ? "drop-shadow(0px 1px 0px var(--black-opacity-60))"
              : "drop-shadow(0px 1px 0px var(--white-opacity-60))"
          };
        }


        .inner {
          box-shadow: ${
            inverted
              ? "inset 0 1px 0 0 rgb(255 255 255 / 20%), 0 1px 0 0 rgb(0 0 0 / 10%)"
              : "inset 0 1px 0 0 rgb(255 255 255 / 60%), 0 1px 0 0 rgb(0 0 0 / 40%)"
          };
        }

        .card.animated .inner::after {
          background: linear-gradient(${
            inverted
              ? "120deg, rgb(255 255 255 / 2%) 30%, rgb(255 255 255 / 8%) 40%, rgb(255 255 255 / 4%) 40%"
              : "120deg, rgb(255 255 255 / 2%) 30%, rgb(255 255 255 / 25%) 40%, rgb(255 255 255 / 8%) 40%"
          });
        }

        /* Type */
        /* =========================================== */
        .type {
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
          text-transform: uppercase;
          letter-spacing: var(--space-025);
          font-weight: var(--font-weight-medium);
        }
        @media (min-width: 500px) {
          .type {
            font-size: var(--text-font-size-s);
            line-height: var(--text-line-height-s);
         }    
        }

        /* Card Number */
        /* =========================================== */
        .card-number {
          bottom: calc(var(--space-300) + var(--space-025));
          left: calc(var(--space-300) + var(--space-025));
          position: absolute;
          z-index: 1;
        }

        .card-number::part(display) {
          display: flex;
          gap: var(--space-100);
          box-sizing: border-box;
          font-size: var(--text-font-size-xs);
          line-height: var(--text-line-height-xs);
          font-weight: var(--font-weight-medium);
        }

        @media (min-width: 500px) {
          .card-number::part(display) {
            font-size: var(--text-font-size-s);
            line-height: var(--text-line-height-s);
         }    
        }

        /* Provider */
        /* =========================================== */
        .card-partner {
          height: auto;
          width: auto;
          display: flex;
          justify-content: end;
          align-items: end;
          bottom: calc(var(--space-300) + var(--space-025));
          right: calc(var(--space-300) + var(--space-025));
          position: absolute;
          z-index: 1;
        }

        .card-partner img {
          width: calc(100% / 1.5);
          height: auto;
        }

        @media (min-width: 500px) {
          .card-partner img {
            width: 100%;
          } 
        }

        /* Variant - Base */
        /* =========================================== */
        .card {
          position: relative;
          box-sizing: border-box;
          display: grid;
          grid-template-rows: 1fr auto;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          width: 100%;
          max-width: 395px;
          max-height: 248px;
          min-width: 247px;
          aspect-ratio: 1014 / 638;
        }

        .inner {
          display: grid;
          grid-template-rows: 1fr auto;
          border-radius: var(--radius-300);
        }

        /* Variant - Virtual */
        /* =========================================== */
        .card.animated .inner {
          animation-name: cardAnimationMobile;
          animation-duration: 10s;
          transform: translateZ(0);
          position: relative;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          animation-timing-function: ease-in-out;
        }

        @media (min-width: 500px) {
          .card.animated .inner {
            animation-name: cardAnimationDesktop;
          }
        }

        .card.animated .inner::before {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 1;
          border-radius: 16px;
        }

        .card.animated .inner::after {
          content: "";
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background-size: 150% 150%;
          animation: cardGradient 45s ease-in-out infinite;
          transform: translateZ(0);
          position: absolute;
        }

        /* Frozen State */
        /* =========================================== */
        .frozen {
          filter: grayscale(100%);
          transition: filter 0.2s ease-in-out;
          position: relative;
        }
        .frozen .inner {
          filter: blur(16px);
          transition: filter 0.2s ease-in-out;
        }
        .frozen:hover {
          filter: grayscale(0%);
        }
        .frozen:hover .inner {
          filter: blur(0);
        }
        mui-badge {
          position: absolute;
          z-index: 1;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          opacity: 1;
          transition: opacity 0.2s ease-in-out;
        }

        .frozen:hover mui-badge { opacity: 0; }

      </style>

      <div

        class="${cardClass} 
        ${isFrozen ? "frozen" : ""}" 
        >
        ${isFrozen ? `<mui-badge>Frozen</mui-badge>` : ""}

        <div class="inner" style="${surfaceStyle}">
          <div class="card-top">
            <span class="type">${type ? `${type}` : ""}</span>
            ${
              logo
                ? `
                  <div class="logo">
                    <img src="${logo}" class="logo-img" />
                  </div>`
                : ""
            }
          </div>

          <mui-body class="card-number"><span>••••</span><span>${number}</span></mui-body>

          <div class="card-partner">

            ${
              partner
                ? `
       
                    <img src="${partner}" class="logo-img" alt="partner logo"/>
                 `
                : ""
            }



          </div>
        </div>

      </div>
    `;
  }
}

if (!customElements.get("mui-smart-card")) {
  customElements.define("mui-smart-card", MuiSmartCard);
}
