export const compositions = {
      signupFlow: {
        type: "Container",
        id: "signup_container",
        props: {
          center: true,
          size: "medium",
          style: "padding-block: var(--space-800);",
        },
        children: [
          {
            type: "Card",
            id: "signup_card",
            props: {
              style: "width: 100%; max-width: 32rem; margin-inline: auto;",
            },
            children: [
              {
                type: "CardBody",
                id: "signup_card_body",
                props: { style: "padding: var(--space-500);" },
                children: [
                  {
                    type: "VStack",
                    id: "signup_stack",
                    props: { space: "var(--space-400)", alignX: "stretch" },
                    children: [
                      {
                        type: "Heading",
                        id: "signup_title",
                        props: {
                          text: "Create your account",
                          size: "2",
                          level: "1",
                        },
                        children: [],
                      },
                      {
                        type: "Body",
                        id: "signup_intro",
                        props: {
                          text: "Start with your work email and a secure password.",
                          size: "small",
                          variant: "secondary",
                        },
                        children: [],
                      },
                      {
                        type: "FormGroup",
                        id: "signup_fields",
                        props: { variant: "vertical", "hide-label": true },
                        children: [
                          {
                            type: "Field",
                            id: "signup_name_field",
                            props: { label: "Name" },
                            children: [
                              {
                                type: "Input",
                                id: "signup_name",
                                props: {
                                  label: "Name",
                                  placeholder: "Jane Smith",
                                  name: "name",
                                },
                                children: [],
                              },
                            ],
                          },
                          {
                            type: "Field",
                            id: "signup_email_field",
                            props: { label: "Email" },
                            children: [
                              {
                                type: "Input",
                                id: "signup_email",
                                props: {
                                  label: "Email",
                                  type: "email",
                                  placeholder: "jane@company.com",
                                  name: "email",
                                },
                                children: [],
                              },
                            ],
                          },
                          {
                            type: "Field",
                            id: "signup_password_field",
                            props: { label: "Password" },
                            children: [
                              {
                                type: "Input",
                                id: "signup_password",
                                props: {
                                  label: "Password",
                                  type: "password",
                                  placeholder: "Create password",
                                  name: "password",
                                },
                                children: [],
                              },
                            ],
                          },
                          {
                            type: "Checkbox",
                            id: "signup_terms",
                            props: {
                              text: "I agree to the terms",
                              size: "small",
                            },
                            children: [],
                          },
                        ],
                      },
                      {
                        type: "Button",
                        id: "signup_submit",
                        props: {
                          text: "Create account",
                          variant: "primary",
                          size: "large",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      rewardsCard: {
        type: "Container",
        id: "root",
        props: { size: "medium", center: true },
        children: [
          {
            type: "Card",
            id: "card",
            props: {},
            children: [
              {
                type: "CardHeader",
                id: "header",
                props: {},
                children: [
                  {
                    type: "Heading",
                    id: "title",
                    props: { text: "Diamond Rewards", size: "4", level: "4" },
                    children: [],
                  },
                ],
              },
              {
                type: "CardBody",
                id: "body",
                props: {},
                children: [
                  {
                    type: "VStack",
                    id: "content",
                    props: { space: "var(--space-200)", alignX: "center" },
                    children: [
                      {
                        type: "SmartCard",
                        id: "smart-card",
                        props: {
                          inverted: true,
                          "bg-image": "https://muibook.com/diamond.png",
                          partner: "https://muibook.com/emerald.svg",
                          number: "1234",
                          type: "Diamond",
                          variant: "animated",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      contactForm: {
        type: "VStack",
        id: "root",
        props: {
          space: "var(--space-300)",
          style: "width: 100%; max-width: 960px;",
        },
        children: [
          {
            type: "Heading",
            id: "title",
            props: { text: "Contact Us", size: "1", level: "1" },
            children: [],
          },
          {
            type: "Alert",
            id: "info",
            props: { variant: "info", label: "Info" },
            children: [
              {
                type: "Span",
                id: "copy",
                props: { text: "Reply in 24h." },
                children: [],
              },
            ],
          },
          {
            type: "VStack",
            id: "form",
            props: { space: "var(--space-200)" },
            children: [
              {
                type: "Input",
                id: "email",
                props: { label: "Email", type: "email" },
                children: [],
              },
              {
                type: "Select",
                id: "subject",
                props: {
                  label: "Subject",
                  options: [
                    { value: "general", label: "General" },
                    { value: "support", label: "Support" },
                    { value: "billing", label: "Billing" },
                  ],
                },
                children: [],
              },
              {
                type: "Input",
                id: "message",
                props: {
                  label: "Message",
                  type: "text",
                  placeholder: "How can we help?",
                },
                children: [],
              },
            ],
          },
          {
            type: "Button",
            id: "submit",
            props: { text: "Send Message", variant: "primary" },
            children: [],
          },
        ],
      },

      analyticsSummary: {
        type: "Container",
        id: "analytics_container",
        props: {
          center: true,
          size: "large",
          style: "padding-block: var(--space-700);",
        },
        children: [
          {
            type: "Card",
            id: "analytics_card",
            props: {},
            children: [
              {
                type: "CardHeader",
                id: "analytics_header",
                props: {},
                children: [
                  {
                    type: "Heading",
                    id: "analytics_title",
                    props: { text: "Weekly performance", size: "3", level: "2" },
                    children: [],
                  },
                  {
                    type: "Button",
                    id: "analytics_export",
                    props: {
                      text: "Export",
                      variant: "secondary",
                      size: "small",
                    },
                    children: [],
                  },
                ],
              },
              {
                type: "CardBody",
                id: "analytics_body",
                props: {},
                children: [
                  {
                    type: "Grid",
                    id: "analytics_metrics",
                    props: {
                      columns: "repeat(3, minmax(0, 1fr))",
                      gap: "var(--space-300)",
                    },
                    children: [
                      {
                        type: "VStack",
                        id: "metric_revenue",
                        props: { space: "var(--space-050)" },
                        children: [
                          {
                            type: "Body",
                            id: "metric_revenue_label",
                            props: { text: "Revenue", size: "small", variant: "secondary" },
                            children: [],
                          },
                          {
                            type: "Heading",
                            id: "metric_revenue_value",
                            props: { text: "$42.8K", size: "4", level: "3" },
                            children: [],
                          },
                        ],
                      },
                      {
                        type: "VStack",
                        id: "metric_orders",
                        props: { space: "var(--space-050)" },
                        children: [
                          {
                            type: "Body",
                            id: "metric_orders_label",
                            props: { text: "Orders", size: "small", variant: "secondary" },
                            children: [],
                          },
                          {
                            type: "Heading",
                            id: "metric_orders_value",
                            props: { text: "1,284", size: "4", level: "3" },
                            children: [],
                          },
                        ],
                      },
                      {
                        type: "VStack",
                        id: "metric_conversion",
                        props: { space: "var(--space-050)" },
                        children: [
                          {
                            type: "Body",
                            id: "metric_conversion_label",
                            props: { text: "Conversion", size: "small", variant: "secondary" },
                            children: [],
                          },
                          {
                            type: "Heading",
                            id: "metric_conversion_value",
                            props: { text: "7.4%", size: "4", level: "3" },
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      onboarding: {
        type: "Container",
        id: "onboarding_container",
        props: {
          center: true,
          size: "small",
        },
        children: [
          {
            type: "Card",
            id: "signup_card",
            props: {},
            children: [
              {
                type: "CardHeader",
                id: "signup_header",
                props: {},
                children: [
                  {
                    type: "Heading",
                    id: "signup_title",
                    props: { text: "Sign up for our product!", size: "3" },
                    children: [],
                  },
                ],
              },
              {
                type: "CardBody",
                id: "signup_body",
                props: {},
                children: [
                  {
                    type: "VStack",
                    id: "signup_stack",
                    props: { space: "var(--space-400)" },
                    children: [
                      {
                        type: "Field",
                        id: "firstNameField",
                        props: { label: "First Name" },
                        children: [{ type: "Input", id: "firstName", props: { placeholder: "John" }, children: [] }],
                      },
                      {
                        type: "Field",
                        id: "lastNameField",
                        props: { label: "Last Name" },
                        children: [{ type: "Input", id: "lastName", props: { placeholder: "Doe" }, children: [] }],
                      },
                      {
                        type: "Field",
                        id: "emailField",
                        props: { label: "Email" },
                        children: [{ type: "Input", id: "email", props: { type: "email", placeholder: "john@example.com" }, children: [] }],
                      },
                      {
                        type: "Field",
                        id: "passwordField",
                        props: { label: "Password" },
                        children: [{ type: "Input", id: "password", props: { type: "password" }, children: [] }],
                      },
                      {
                        type: "Field",
                        id: "confirmPasswordField",
                        props: { label: "Confirm Password" },
                        children: [{ type: "Input", id: "confirmPassword", props: { type: "password" }, children: [] }],
                      },
                      {
                        type: "Field",
                        id: "termsField",
                        props: {},
                        children: [
                          {
                            type: "Checkbox",
                            id: "agreeTerms",
                            props: { text: "I agree to the terms and conditions" },
                            children: [],
                          },
                        ],
                      },
                      {
                        type: "ButtonGroup",
                        id: "signup_actions",
                        props: { align: "right" },
                        children: [
                          {
                            type: "Button",
                            id: "signup_submit",
                            props: { text: "Sign up", variant: "primary" },
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      wallet: {
        type: "VStack",
        id: "wallet_root",
        props: {
          alignX: "stretch",
          style: "max-width: 365px; margin: 0 auto; padding-top: var(--space-700); padding-bottom: var(--space-700)",
        },
        children: [
          {
            type: "SmartCard",
            id: "wallet_card",
            props: {
              variant: "animated",
              partner: "https://muibook.com/visa-black.svg",
              type: "Debit",
              number: "1234",
              logo: "https://muibook.com/mui.svg",
              "logo-height": "100",
              "bg-image": "https://muibook.com/snowy-mint.png",
            },
            children: [],
          },
          {
            type: "TabController",
            id: "wallet_tabs",
            props: {},
            children: [
              {
                type: "VStack",
                id: "tab_stack",
                props: { alignX: "stretch", space: "var(--space-300)" },
                children: [
                  {
                    type: "TabBar",
                    id: "tab_bar",
                    props: { inset: true, stroke: "none", "active-inset": true, radius: "500" },
                    children: [
                      { type: "TabItem", id: "transactions", props: { active: true, text: "Transactions" }, children: [] },
                      { type: "TabItem", id: "statements", props: { text: "Statements" }, children: [] },
                    ],
                  },
                  {
                    type: "TabPanel",
                    id: "panel_tx",
                    props: { item: "transactions" },
                    children: [
                      {
                        type: "SlatGroup",
                        id: "tx_group",
                        props: {},
                        children: [
                          {
                            type: "Slat",
                            id: "tx_header",
                            props: { variant: "header" },
                            children: [
                              { type: "Heading", id: "tx_header_title", props: { text: "Today", size: "6" }, children: [] },
                              { type: "Body", id: "tx_header_date", slot: "end", props: { text: "22 July 2025", size: "small" }, children: [] },
                            ],
                          },
                          {
                            type: "Slat",
                            id: "palace_cinema",
                            props: { variant: "row", col: "1fr auto" },
                            children: [
                              {
                                type: "Avatar",
                                id: "palace_icon",
                                slot: "accessory", props: {},
                                children: [{ type: "_Icon", id: "palace_icon_glyph", props: { icon: "mui-icon-movie-clapper", size: "small" }, children: [] }],
                              },
                              {
                                type: "VStack",
                                id: "palace_details",
                                slot: "start", props: { space: "0" },
                                children: [
                                  { type: "Body", id: "palace_title", props: { text: "Palace Cinema", size: "medium", weight: "bold" }, children: [] },
                                  { type: "Body", id: "palace_meta", props: { text: "Entertainment", size: "small" }, children: [] },
                                ],
                              },
                              {
                                type: "VStack",
                                id: "palace_amount",
                                slot: "end", props: { space: "0", alignX: "end" },
                                children: [
                                  { type: "Body", id: "palace_status", props: { text: "Pending", size: "small" }, children: [] },
                                  { type: "Body", id: "palace_value", props: { text: "-$8.12", size: "small" }, children: [] },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Slat",
                            id: "app_store",
                            props: { variant: "row", col: "1fr auto" },
                            children: [
                              {
                                type: "Avatar",
                                id: "app_store_icon",
                                slot: "accessory", props: {},
                                children: [{ type: "_Icon", id: "app_store_icon_glyph", props: { icon: "mui-icon-game-controller", size: "small" }, children: [] }],
                              },
                              {
                                type: "VStack",
                                id: "app_store_details",
                                slot: "start", props: { space: "0" },
                                children: [
                                  { type: "Body", id: "app_store_title", props: { text: "Apple App Store", size: "medium", weight: "bold" }, children: [] },
                                  { type: "Body", id: "app_store_meta", props: { text: "Entertainment", size: "small" }, children: [] },
                                ],
                              },
                              {
                                type: "VStack",
                                id: "app_store_amount",
                                slot: "end", props: { space: "0", alignX: "end" },
                                children: [
                                  { type: "Body", id: "app_store_status", props: { text: "Pending", size: "small" }, children: [] },
                                  { type: "Body", id: "app_store_value", props: { text: "-$4.99", size: "small" }, children: [] },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Slat",
                            id: "tx_yesterday_header",
                            props: { variant: "header" },
                            children: [
                              { type: "Heading", id: "tx_yesterday_title", props: { text: "Yesterday", size: "6" }, children: [] },
                              { type: "Body", id: "tx_yesterday_date", slot: "end", props: { text: "21 July 2025", size: "small" }, children: [] },
                            ],
                          },
                          {
                            type: "Slat",
                            id: "record_south_yarra",
                            props: { variant: "row", col: "1fr auto" },
                            children: [
                              {
                                type: "Avatar",
                                id: "record_icon",
                                slot: "accessory", props: {},
                                children: [{ type: "_Icon", id: "record_icon_glyph", props: { icon: "mui-icon-music-microphone", size: "small" }, children: [] }],
                              },
                              {
                                type: "VStack",
                                id: "record_details",
                                slot: "start", props: { space: "0" },
                                children: [
                                  { type: "Body", id: "record_title", props: { text: "Record South Yarra", size: "medium", weight: "bold" }, children: [] },
                                  { type: "Body", id: "record_meta", props: { text: "Entertainment", size: "small" }, children: [] },
                                ],
                              },
                              {
                                type: "VStack",
                                id: "record_amount",
                                slot: "end", props: { space: "0", alignX: "end" },
                                children: [
                                  { type: "Body", id: "record_status", props: { text: "Pending", size: "small" }, children: [] },
                                  { type: "Body", id: "record_value", props: { text: "-$26.89", size: "medium" }, children: [] },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "TabPanel",
                    id: "panel_statements",
                    props: { item: "statements" },
                    children: [
                      {
                        type: "SlatGroup",
                        id: "statement_group",
                        props: {},
                        children: [
                          {
                            type: "Slat",
                            id: "statement_recent_header",
                            props: { variant: "header" },
                            children: [{ type: "Heading", id: "statement_recent_title", props: { text: "Recents", size: "6" }, children: [] }],
                          },
                          {
                            type: "Slat",
                            id: "statement_report",
                            props: { variant: "action" },
                            children: [
                              {
                                type: "Avatar",
                                id: "statement_report_icon",
                                slot: "accessory", props: {},
                                children: [{ type: "_Icon", id: "statement_report_glyph", props: { icon: "mui-icon-rectangle-media-text", size: "small" }, children: [] }],
                              },
                              {
                                type: "VStack",
                                id: "statement_report_copy",
                                slot: "start", props: { space: "0" },
                                children: [
                                  { type: "Body", id: "statement_report_title", props: { text: "Transactions Report", size: "medium", weight: "bold" }, children: [] },
                                  { type: "Body", id: "statement_report_meta", props: { text: "Generate a PDF", size: "small" }, children: [] },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Slat",
                            id: "statement_2025",
                            props: { variant: "action" },
                            children: [
                              {
                                type: "Avatar",
                                id: "statement_2025_icon",
                                slot: "accessory", props: {},
                                children: [{ type: "_Icon", id: "statement_2025_glyph", props: { icon: "mui-icon-calendar", size: "small" }, children: [] }],
                              },
                              { type: "Body", id: "statement_2025_label", slot: "start", props: { text: "2025", size: "medium", weight: "bold" }, children: [] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "VStack",
            id: "wallet_settings",
            props: { alignX: "stretch", space: "var(--space-200)" },
            children: [
              { type: "Heading", id: "wallet_settings_title", props: { text: "Personalise Card", size: "3", level: "2" }, children: [] },
              {
                type: "Card",
                id: "wallet_artwork_card",
                props: { "data-group": "card-artwork" },
                children: [
                  {
                    type: "CardBody",
                    id: "wallet_artwork_body",
                    props: { size: "none" },
                    children: [
                      {
                        type: "Slat",
                        id: "wallet_artwork_slat",
                        props: { variant: "row", style: "grid-template-columns: 2fr auto; background: var(--app-wallet-slat-background, var(--slat-background));" },
                        children: [
                          {
                            type: "VStack",
                            id: "wallet_artwork_copy",
                            slot: "start", props: { space: "0" },
                            children: [
                              { type: "Body", id: "wallet_artwork_title", props: { text: "Artwork", size: "medium", weight: "bold" }, children: [] },
                              { type: "Body", id: "wallet_artwork_preferred_size", props: { text: "Preferred size: 395x248", size: "small", "data-preferred-size": true }, children: [] },
                            ],
                          },
                          {
                            type: "HStack",
                            id: "wallet_artwork_actions",
                            slot: "end", props: { space: "0", alignX: "end" },
                            children: [
                              { type: "Button", id: "wallet_artwork_reset", props: { text: "Reset", variant: "tertiary", "data-background-reset": true, style: "display: none;" }, children: [] },
                              {
                                type: "Dropdown",
                                id: "wallet_artwork_dropdown",
                                props: { "data-toggle-dropdown": "background", "data-file-preview": true, position: "center", class: "card-artwork" },
                                children: [
                                  {
                                    type: "Button",
                                    id: "wallet_artwork_action",
                                    slot: "action", props: { variant: "tertiary", size: "small" },
                                    children: [{ type: "_IconToggle", id: "wallet_artwork_toggle", props: { "data-toggle-control": "background", rotate: true, size: "small" }, children: [] }],
                                  },
                                  {
                                    type: "VStack",
                                    id: "wallet_artwork_menu",
                                    props: { space: "var(--space-300)", style: "padding: var(--space-300) var(--space-500) var(--space-500) var(--space-500);" },
                                    children: [
                                      { type: "Heading", id: "wallet_artwork_preview_title", props: { text: "Preview", size: "3", level: "2" }, children: [] },
                                      {
                                        type: "SmartCard",
                                        id: "wallet_artwork_preview",
                                        props: {
                                          type: "Debit",
                                          number: "1234",
                                          partner: "https://muibook.com/visa-black.svg",
                                          logo: "https://muibook.com/image-220.png",
                                          variant: "plain",
                                        },
                                        children: [],
                                      },
                                      {
                                        type: "FileUpload",
                                        id: "wallet_artwork_upload",
                                        props: { acceptedFileTypes: ".pdf,.jpg,.png,.svg", currentFileName: "Upload Artwork" },
                                        children: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      muitube: {
        type: "VStack",
        id: "muitube_root",
        props: {
          alignX: "stretch",
          alignY: "start",
          space: "var(--space-000)",
          style: "background: var(--surface-elevated-100);",
        },
        children: [
          {
            type: "HStack",
            id: "muitube_header",
            props: {
              alignX: "space-between",
              alignY: "center",
              style: "padding: var(--space-400); background: var(--surface-elevated-100);",
            },
            children: [
              {
                type: "HStack",
                id: "header_left",
                props: { alignX: "start", alignY: "center", space: "var(--space-000)" },
                children: [
                  {
                    type: "Responsive",
                    id: "muitube_menu_button",
                    props: { breakpoint: "768" },
                    children: [
                      {
                        type: "Button",
                        id: "muitube_menu_toggle_desktop",
                        slot: "showAbove", props: { variant: "tertiary", "aria-label": "Toggle menu", size: "medium" },
                        children: [{ type: "_Icon", id: "muitube_menu_icon_desktop", props: { icon: "mui-icon-menu", size: "medium" }, children: [] }],
                      },
                      {
                        type: "Button",
                        id: "muitube_menu_toggle_mobile",
                        slot: "showBelow", props: { variant: "tertiary", "aria-label": "Open menu", size: "medium" },
                        children: [{ type: "_Icon", id: "muitube_menu_icon_mobile", props: { icon: "mui-icon-menu", size: "medium" }, children: [] }],
                      },
                    ],
                  },
                  {
                    type: "HStack",
                    id: "muitube_brand",
                    props: { alignX: "start", alignY: "center", space: "var(--space-200)" },
                    children: [
                      { type: "Heading", id: "logo", props: { text: "Premium", size: "3", level: "1" }, children: [] },
                      { type: "Badge", id: "country", props: { text: "AU" }, children: [] },
                    ],
                  },
                ],
              },
              {
                type: "Responsive",
                id: "header_search",
                props: { breakpoint: "768", style: "max-width: 70rem; width: 100%;" },
                children: [
                  {
                    type: "HStack",
                    id: "header_search_desktop",
                    slot: "showAbove", props: { alignX: "center", alignY: "center", space: "var(--space-300)", width: "100%" },
                    children: [
                      {
                        type: "Input",
                        id: "search_input",
                        props: { placeholder: "Search" },
                        children: [
                          {
                            type: "Button",
                            id: "search_btn",
                            slot: "after", props: { variant: "secondary", "aria-label": "Search" },
                            children: [{ type: "_Icon", id: "search_icon", props: { icon: "mui-icon-search", size: "medium" }, children: [] }],
                          },
                        ],
                      },
                      {
                        type: "Button",
                        id: "settings_btn",
                        props: { variant: "tertiary", "aria-label": "Settings" },
                        children: [{ type: "_Icon", id: "settings_icon", props: { icon: "mui-icon-gear", size: "medium" }, children: [] }],
                      },
                    ],
                  },
                ],
              },
              {
                type: "HStack",
                id: "header_actions",
                props: { alignX: "start", alignY: "center", space: "var(--space-300)" },
                children: [
                  {
                    type: "Responsive",
                    id: "create_action",
                    props: { breakpoint: "768" },
                    children: [
                      { type: "Button", id: "create_desktop", slot: "showAbove", props: { text: "Create", variant: "primary" }, children: [] },
                      {
                        type: "Button",
                        id: "create_mobile",
                        slot: "showBelow", props: { variant: "primary", "aria-label": "Create" },
                        children: [{ type: "_Icon", id: "create_mobile_icon", props: { icon: "mui-icon-add", size: "medium" }, children: [] }],
                      },
                    ],
                  },
                  {
                    type: "Button",
                    id: "notifications",
                    props: { variant: "tertiary", "aria-label": "Notifications" },
                    children: [{ type: "_Icon", id: "notification_icon", props: { icon: "mui-icon-notification", size: "medium" }, children: [] }],
                  },
                ],
              },
            ],
          },
          {
            type: "Responsive",
            id: "muitube_layout",
            props: { breakpoint: "768" },
            children: [
              {
                type: "Drawer",
                id: "sidebar_drawer",
                slot: "showAbove", props: { width: "240px", variant: "push", open: true, side: "left", "drawer-space": "none" },
                children: [
                  {
                    type: "VStack",
                    id: "sidebar_menu",
                    props: { space: "var(--space-000)" },
                    children: [
                      { type: "Button", id: "menu_home", props: { text: "Home", variant: "tertiary" }, children: [] },
                      { type: "Button", id: "menu_shorts", props: { text: "Shorts", variant: "tertiary" }, children: [] },
                      { type: "Button", id: "menu_subscriptions", props: { text: "Subscriptions", variant: "tertiary" }, children: [] },
                    ],
                  },
                  {
                    type: "VStack",
                    id: "muitube_page_desktop",
                    slot: "page", props: { space: "var(--space-000)", alignX: "stretch" },
                    children: [
                      {
                        type: "ChipRail",
                        id: "video_filters_desktop",
                        props: { size: "medium", "aria-label": "Video filters" },
                        children: [
                          { type: "Chip", id: "filter_all", props: { text: "All", active: true, variant: "clickable" }, children: [] },
                          { type: "Chip", id: "filter_gaming", props: { text: "Gaming", variant: "clickable" }, children: [] },
                          { type: "Chip", id: "filter_music", props: { text: "Music", variant: "clickable" }, children: [] },
                          { type: "Chip", id: "filter_japan", props: { text: "Japan", variant: "clickable" }, children: [] },
                        ],
                      },
                      {
                        type: "Grid",
                        id: "video_grid_desktop",
                        props: { col: "repeat(auto-fit, minmax(268px, 1fr))", space: "var(--space-600)", alignX: "start", alignY: "start" },
                        children: [
                          {
                            type: "Link",
                            id: "video_card_1",
                            props: { href: "#", variant: "tertiary" },
                            children: [
                              {
                                type: "VStack",
                                id: "video_card_1_stack",
                                props: { alignX: "start", alignY: "start", space: "var(--space-300)" },
                                children: [
                                  {
                                    type: "VideoThumbnail",
                                    id: "video_card_1_thumbnail",
                                    props: {
                                      src: "/images/muitube/mui-video-light.png",
                                      "src-light": "/images/muitube/mui-video-light.png",
                                      "src-dark": "/images/muitube/mui-video-dark.png",
                                      "src-mui-light": "/images/muitube/mui-video-light.png",
                                      "src-mui-dark": "/images/muitube/mui-video-dark.png",
                                      alt: "Muibook video thumbnail",
                                    },
                                    children: [],
                                  },
                                  { type: "Body", id: "video_card_1_title", props: { text: "Designing with Muibook", size: "large", weight: "bold" }, children: [] },
                                  { type: "Body", id: "video_card_1_author", props: { text: "Michael Trilford", size: "x-small", weight: "bold" }, children: [] },
                                  { type: "Body", id: "video_card_1_meta", props: { text: "12K views · 4 days ago", size: "x-small", weight: "bold" }, children: [] },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Link",
                            id: "video_card_2",
                            props: { href: "#", variant: "tertiary" },
                            children: [
                              {
                                type: "VStack",
                                id: "video_card_2_stack",
                                props: { alignX: "start", alignY: "start", space: "var(--space-300)" },
                                children: [
                                  {
                                    type: "VideoThumbnail",
                                    id: "video_card_2_thumbnail",
                                    props: {
                                      src: "/images/muitube/sensei-video-light.png",
                                      "src-light": "/images/muitube/sensei-video-light.png",
                                      "src-dark": "/images/muitube/sensei-video-dark.png",
                                      alt: "Sensei video thumbnail",
                                    },
                                    children: [],
                                  },
                                  { type: "Body", id: "video_card_2_title", props: { text: "Building design system flows", size: "large", weight: "bold" }, children: [] },
                                  { type: "Body", id: "video_card_2_author", props: { text: "Sensei", size: "x-small", weight: "bold" }, children: [] },
                                  { type: "Body", id: "video_card_2_meta", props: { text: "8.4K views · 1 week ago", size: "x-small", weight: "bold" }, children: [] },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "VStack",
                id: "muitube_mobile",
                slot: "showBelow", props: { alignX: "stretch", space: "var(--space-000)" },
                children: [
                  {
                    type: "Drawer",
                    id: "sidebar_drawer_mobile",
                    props: { variant: "overlay", width: "260px", side: "left", "z-index": "200", "drawer-space": "none" },
                    children: [
                      {
                        type: "VStack",
                        id: "mobile_sidebar_menu",
                        props: { space: "var(--space-000)" },
                        children: [
                          { type: "Button", id: "mobile_menu_home", props: { text: "Home", variant: "tertiary" }, children: [] },
                          { type: "Button", id: "mobile_menu_shorts", props: { text: "Shorts", variant: "tertiary" }, children: [] },
                          { type: "Button", id: "mobile_menu_subscriptions", props: { text: "Subscriptions", variant: "tertiary" }, children: [] },
                        ],
                      },
                    ],
                  },
                  {
                    type: "VStack",
                    id: "muitube_page_mobile",
                    props: { space: "var(--space-000)", alignX: "stretch" },
                    children: [
                      {
                        type: "ChipRail",
                        id: "video_filters_mobile",
                        props: { size: "medium", "aria-label": "Video filters" },
                        children: [
                          { type: "Chip", id: "mobile_filter_all", props: { text: "All", active: true, variant: "clickable" }, children: [] },
                          { type: "Chip", id: "mobile_filter_music", props: { text: "Music", variant: "clickable" }, children: [] },
                          { type: "Chip", id: "mobile_filter_japan", props: { text: "Japan", variant: "clickable" }, children: [] },
                        ],
                      },
                      {
                        type: "Grid",
                        id: "video_grid_mobile",
                        props: { col: "repeat(auto-fit, minmax(268px, 1fr))", space: "var(--space-600)" },
                        children: [
                          {
                            type: "Link",
                            id: "mobile_video_card",
                            props: { href: "#", variant: "tertiary" },
                            children: [
                              {
                                type: "VideoThumbnail",
                                id: "mobile_video_thumbnail",
                                props: {
                                  src: "/images/muitube/mui-video-light.png",
                                  "src-light": "/images/muitube/mui-video-light.png",
                                  "src-dark": "/images/muitube/mui-video-dark.png",
                                  alt: "Muibook video thumbnail",
                                },
                                children: [],
                              },
                              { type: "Body", id: "mobile_video_title", props: { text: "Designing with Muibook", size: "large", weight: "bold" }, children: [] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      songPage: {
        type: "Container",
        id: "song_container",
        props: { size: "large", center: true },
        children: [
          {
            type: "HStack",
            id: "song_header",
            props: { alignX: "space-between", alignY: "center", style: "margin-block-end: var(--space-500);" },
            children: [
              { type: "Heading", id: "logo", props: { text: "Amp", size: "3" }, children: [] },
              {
                type: "Dropdown",
                id: "account_dropdown",
                props: {},
                children: [
                  {
                    type: "AvatarChip",
                    id: "user_avatar",
                    props: {
                      primary: "Mike Trilford",
                      secondary: "Creator",
                      image: "https://muibook.com/images/mui/avatar-mike.jpg",
                      label: "Mike Trilford",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: "VStack",
            id: "song_content",
            props: { space: "var(--space-500)", alignX: "stretch" },
            children: [
              {
                type: "MediaPlayer",
                id: "song_player",
                props: {
                  type: "audio",
                  src: "https://muibook.com/audio/twilight.m4a",
                  artwork: "https://muibook.com/audio/artwork-light.png",
                  waveform: true,
                  height: "14rem",
                },
                children: [
                  {
                    type: "AvatarChip",
                    id: "player_meta",
                    props: {
                      slot: "meta-before",
                      href: "#creator-profile",
                      image: "https://muibook.com/images/mui/avatar-mike.jpg",
                      label: "Mike Trilford",
                    },
                    children: [
                      {
                        type: "Body",
                        id: "song_title",
                        slot: "primary", props: { text: "Twilight", weight: "bold" },
                        children: [],
                      },
                      {
                        type: "Link",
                        id: "song_creator",
                        slot: "secondary", props: { href: "#creator-profile", text: "by Michael Trilford", weight: "medium" },
                        children: [],
                      },
                    ],
                  },
                  {
                    type: "Button",
                    id: "player_buy",
                    slot: "meta-after", props: { text: "Buy now", variant: "overlay" },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },

      videoMetadataAction: {
        type: "MediaPlayer",
        id: "video_metadata_action",
        props: {
          type: "video",
          src: "https://muibook.com/video/japan.mp4",
          poster: "https://muibook.com/video/japan-poster.jpg",
        },
        children: [
          {
            type: "AvatarChip",
            id: "video_creator",
            props: {
              slot: "meta-before",
              href: "#creator-profile",
              image: "https://muibook.com/images/mui/avatar-mike.jpg",
              label: "Mike Trilford",
            },
            children: [
              {
                type: "Body",
                id: "video_channel",
                slot: "primary", props: { text: "Sugoi Travels", weight: "bold" },
                children: [],
              },
              {
                type: "Link",
                id: "video_subscribers",
                slot: "secondary", props: { href: "#creator-profile", text: "77k subscribers", weight: "medium" },
                children: [],
              },
            ],
          },
          {
            type: "Button",
            id: "video_subscribe",
            slot: "meta-after", props: { text: "Subscribe", variant: "overlay" },
            children: [],
          },
        ],
      },

      customSelectWastePicker: {
        type: "Select",
        id: "waste_picker",
        props: {
          label: "Waste stream",
          appearance: "custom",
          "selected-content": "label",
          col: "1fr 1fr",
          space: "var(--space-100)",
        },
        children: [
          {
            type: "Option",
            id: "waste_recyclable",
            props: { value: "recyclable", label: "Recyclable" },
            children: [
              {
                type: "VStack",
                id: "waste_recyclable_stack",
                props: { space: "var(--space-100)", alignX: "center" },
                children: [
                  {
                    type: "_Illustration",
                    id: "waste_recyclable_bin",
                    props: { illustration: "mui-illustration-trash", size: "medium", color: "var(--feedback-positive-border-color)" },
                    children: [],
                  },
                  { type: "Body", id: "waste_recyclable_label", props: { text: "Recyclable", weight: "bold" }, children: [] },
                ],
              },
            ],
          },
          {
            type: "Option",
            id: "waste_general",
            props: { value: "waste", label: "Waste" },
            children: [
              {
                type: "VStack",
                id: "waste_general_stack",
                props: { space: "var(--space-100)", alignX: "center" },
                children: [
                  {
                    type: "_Illustration",
                    id: "waste_general_bin",
                    props: { illustration: "mui-illustration-trash", size: "medium", color: "var(--feedback-info-border-color)" },
                    children: [],
                  },
                  { type: "Body", id: "waste_general_label", props: { text: "Waste", weight: "bold" }, children: [] },
                ],
              },
            ],
          },
          {
            type: "Option",
            id: "waste_organic",
            props: { value: "organic", label: "Organic" },
            children: [
              {
                type: "VStack",
                id: "waste_organic_stack",
                props: { space: "var(--space-100)", alignX: "center" },
                children: [
                  {
                    type: "_Illustration",
                    id: "waste_organic_bin",
                    props: { illustration: "mui-illustration-trash", size: "medium", color: "var(--feedback-warning-border-color)" },
                    children: [],
                  },
                  { type: "Body", id: "waste_organic_label", props: { text: "Organic", weight: "bold" }, children: [] },
                ],
              },
            ],
          },
          {
            type: "Option",
            id: "waste_burnable",
            props: { value: "burnable", label: "Burnable" },
            children: [
              {
                type: "VStack",
                id: "waste_burnable_stack",
                props: { space: "var(--space-100)", alignX: "center" },
                children: [
                  {
                    type: "_Illustration",
                    id: "waste_burnable_bin",
                    props: { illustration: "mui-illustration-trash", size: "medium", color: "var(--feedback-attention-border-color)" },
                    children: [],
                  },
                  { type: "Body", id: "waste_burnable_label", props: { text: "Burnable", weight: "bold" }, children: [] },
                ],
              },
            ],
          },
        ],
      },

      drawerWorkspace: {
        type: "Drawer",
        id: "workspace_drawer",
        props: {
          variant: "workspace",
          "resize-rail": true,
          "left-open": true,
          "right-open": true,
          "left-width": "24rem",
          "right-width": "30rem",
          "resize-min-left-width": "200",
          "resize-min-right-width": "200",
          "resize-min-page-width": "400",
          "resize-close-threshold": "96",
          breakpoint: "1400",
          height: "80dvh",
        },
        children: [
          {
            type: "VStack",
            id: "workspace_left_panel",
            slot: "left", props: { space: "var(--space-300)", padding: "var(--space-400)" },
            children: [
              { type: "Heading", id: "workspace_left_heading", props: { text: "Components", size: "4", level: "2" }, children: [] },
              { type: "Button", id: "workspace_media_card", props: { text: "Media Card", variant: "tertiary" }, children: [] },
              { type: "Button", id: "workspace_sidebar", props: { text: "Sidebar", variant: "tertiary" }, children: [] },
            ],
          },
          {
            type: "VStack",
            id: "workspace_canvas",
            slot: "page", props: { space: "var(--space-400)", padding: "var(--space-500)", alignX: "center" },
            children: [
              { type: "Heading", id: "workspace_canvas_heading", props: { text: "Canvas", size: "3", level: "1" }, children: [] },
              {
                type: "Card",
                id: "workspace_selected_card",
                props: {},
                children: [
                  {
                    type: "CardBody",
                    id: "workspace_selected_body",
                    props: {},
                    children: [
                      { type: "Heading", id: "workspace_selected_title", props: { text: "Customer Portal", size: "4", level: "2" }, children: [] },
                      {
                        type: "Body",
                        id: "workspace_selected_description",
                        props: { text: "A selected page region sits between the component library and inspector panels." },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "VStack",
            id: "workspace_right_panel",
            slot: "right", props: { space: "var(--space-300)", padding: "var(--space-400)" },
            children: [
              { type: "Heading", id: "workspace_right_heading", props: { text: "Inspector", size: "4", level: "2" }, children: [] },
              { type: "AccordionBlock", id: "workspace_styles", props: { heading: "Styles" }, children: [] },
              { type: "AccordionBlock", id: "workspace_layout", props: { heading: "Layout" }, children: [] },
            ],
          },
        ],
      },

      modelViewerProductPreview: {
        type: "ModelViewer",
        id: "model_viewer_product_preview",
        props: {
          src: "https://muibook.com/models/chair.glb",
          "ios-src": "https://muibook.com/models/chair.usdz",
          poster: "https://muibook.com/models/chair-poster.jpg",
          alt: "Three dimensional preview of a lounge chair.",
          controls: true,
          ar: true,
        },
        children: [
          {
            type: "Body",
            id: "model_viewer_fallback",
            props: { text: "Download the product model or view the gallery if 3D preview is unavailable.", size: "small" },
            children: [],
          },
        ],
      },

      dashboard: {
        type: "VStack",
        id: "dashboard_root",
        props: { space: "var(--space-500)", alignX: "stretch", style: "max-width: 112rem; margin: 0 auto;" },
        children: [
          {
            type: "HStack",
            id: "dashboard_header",
            props: { alignX: "space-between", alignY: "center" },
            children: [
              {
                type: "VStack",
                id: "header_title_stack",
                props: { space: "var(--space-000)" },
                children: [
                  { type: "Heading", id: "title", props: { text: "Revenue operations", size: "2" }, children: [] },
                  { type: "Body", id: "subtitle", props: { text: "Track activation health...", size: "small" }, children: [] },
                ],
              },
              {
                type: "ButtonGroup",
                id: "header_actions",
                props: { align: "right" },
                children: [
                  { type: "Button", id: "export_btn", props: { text: "Export report", variant: "secondary" }, children: [] },
                  { type: "Button", id: "create_btn", props: { text: "Create task", variant: "primary" }, children: [] },
                ],
              },
            ],
          },
          {
            type: "Grid",
            id: "dashboard_metric_grid",
            props: { col: "repeat(4, minmax(0, 1fr))", space: "var(--space-300)", alignX: "stretch" },
            children: [
              {
                type: "Card",
                id: "metric_revenue_card",
                props: {},
                children: [
                  {
                    type: "CardBody",
                    id: "metric_revenue_body",
                    props: {},
                    children: [
                      {
                        type: "VStack",
                        id: "metric_revenue_stack",
                        props: { space: "var(--space-200)", alignX: "stretch" },
                        children: [
                          { type: "Body", id: "metric_revenue_label", props: { text: "Monthly revenue", size: "small", variant: "secondary" }, children: [] },
                          { type: "Heading", id: "metric_revenue_value", props: { text: "$128.4K", size: "3", level: "2" }, children: [] },
                          { type: "Badge", id: "metric_revenue_delta", props: { text: "+12.8%", size: "small", variant: "positive" }, children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                id: "metric_accounts_card",
                props: {},
                children: [
                  {
                    type: "CardBody",
                    id: "metric_accounts_body",
                    props: {},
                    children: [
                      {
                        type: "VStack",
                        id: "metric_accounts_stack",
                        props: { space: "var(--space-200)", alignX: "stretch" },
                        children: [
                          { type: "Body", id: "metric_accounts_label", props: { text: "Active accounts", size: "small", variant: "secondary" }, children: [] },
                          { type: "Heading", id: "metric_accounts_value", props: { text: "24,892", size: "3", level: "2" }, children: [] },
                          { type: "Badge", id: "metric_accounts_delta", props: { text: "+4.2%", size: "small", variant: "positive" }, children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                id: "metric_conversion_card",
                props: {},
                children: [
                  {
                    type: "CardBody",
                    id: "metric_conversion_body",
                    props: {},
                    children: [
                      {
                        type: "VStack",
                        id: "metric_conversion_stack",
                        props: { space: "var(--space-200)", alignX: "stretch" },
                        children: [
                          { type: "Body", id: "metric_conversion_label", props: { text: "Trial conversion", size: "small", variant: "secondary" }, children: [] },
                          { type: "Heading", id: "metric_conversion_value", props: { text: "8.6%", size: "3", level: "2" }, children: [] },
                          { type: "Badge", id: "metric_conversion_delta", props: { text: "-1.1%", size: "small", variant: "warning" }, children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                id: "metric_uptime_card",
                props: {},
                children: [
                  {
                    type: "CardBody",
                    id: "metric_uptime_body",
                    props: {},
                    children: [
                      {
                        type: "VStack",
                        id: "metric_uptime_stack",
                        props: { space: "var(--space-200)", alignX: "stretch" },
                        children: [
                          { type: "Body", id: "metric_uptime_label", props: { text: "Platform uptime", size: "small", variant: "secondary" }, children: [] },
                          { type: "Heading", id: "metric_uptime_value", props: { text: "99.98%", size: "3", level: "2" }, children: [] },
                          { type: "Badge", id: "metric_uptime_delta", props: { text: "Stable", size: "small", variant: "neutral" }, children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "Grid",
            id: "dashboard_main_grid",
            props: { col: "minmax(0, 1.55fr) minmax(26rem, 1fr)", space: "var(--space-300)", alignX: "stretch" },
            children: [
              {
                type: "Card",
                id: "activation_health_card",
                props: {},
                children: [
                  {
                    type: "CardHeader",
                    id: "activation_health_header",
                    props: {},
                    children: [
                      { type: "Heading", id: "activation_health_title", props: { text: "Activation health", size: "3", level: "2" }, children: [] },
                      { type: "Body", id: "activation_health_description", props: { text: "Performance across the last 30 days.", size: "small", variant: "secondary" }, children: [] },
                    ],
                  },
                  {
                    type: "CardBody",
                    id: "activation_health_body",
                    props: {},
                    children: [
                      {
                        type: "VStack",
                        id: "activation_health_stack",
                        props: { space: "var(--space-400)", alignX: "stretch" },
                        children: [
                          {
                            type: "VStack",
                            id: "feature_adoption",
                            props: { space: "var(--space-100)", alignX: "stretch" },
                            children: [
                              {
                                type: "HStack",
                                id: "feature_adoption_header",
                                props: { alignX: "space-between", alignY: "center" },
                                children: [
                                  { type: "Body", id: "feature_adoption_label", props: { text: "Feature adoption", size: "small", weight: "bold" }, children: [] },
                                  { type: "Badge", id: "feature_adoption_delta", props: { text: "+15%", size: "x-small", variant: "positive" }, children: [] },
                                ],
                              },
                              { type: "Progress", id: "feature_adoption_progress", props: { progress: "45" }, children: [] },
                            ],
                          },
                          {
                            type: "VStack",
                            id: "retention",
                            props: { space: "var(--space-100)", alignX: "stretch" },
                            children: [
                              {
                                type: "HStack",
                                id: "retention_header",
                                props: { alignX: "space-between", alignY: "center" },
                                children: [
                                  { type: "Body", id: "retention_label", props: { text: "30-day retention", size: "small", weight: "bold" }, children: [] },
                                  { type: "Badge", id: "retention_delta", props: { text: "+4%", size: "x-small", variant: "positive" }, children: [] },
                                ],
                              },
                              { type: "Progress", id: "retention_progress", props: { progress: "68" }, children: [] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                id: "priority_tasks_card",
                props: {},
                children: [
                  {
                    type: "CardHeader",
                    id: "priority_tasks_header",
                    props: {},
                    children: [{ type: "Heading", id: "priority_tasks_title", props: { text: "Priority tasks", size: "3", level: "2" }, children: [] }],
                  },
                  {
                    type: "CardBody",
                    id: "priority_tasks_body",
                    props: {},
                    children: [
                      {
                        type: "SlatGroup",
                        id: "priority_tasks",
                        props: {},
                        children: [
                          {
                            type: "Slat",
                            id: "billing_alerts_task",
                            props: { variant: "action" },
                            children: [
                              {
                                type: "VStack",
                                id: "billing_alerts_copy",
                                slot: "start", props: { space: "var(--space-000)" },
                                children: [
                                  { type: "Body", id: "billing_alerts_title", props: { text: "Review billing alerts", size: "small", weight: "bold" }, children: [] },
                                  { type: "Body", id: "billing_alerts_meta", props: { text: "Finance operations", size: "x-small", variant: "secondary" }, children: [] },
                                ],
                              },
                              { type: "Badge", id: "billing_alerts_badge", slot: "end", props: { text: "Urgent", size: "x-small", variant: "attention" }, children: [] },
                            ],
                          },
                          {
                            type: "Slat",
                            id: "campaign_task",
                            props: { variant: "action" },
                            children: [
                              {
                                type: "VStack",
                                id: "campaign_copy",
                                slot: "start", props: { space: "var(--space-000)" },
                                children: [
                                  { type: "Body", id: "campaign_title", props: { text: "Approve campaign launch", size: "small", weight: "bold" }, children: [] },
                                  { type: "Body", id: "campaign_meta", props: { text: "Growth team", size: "x-small", variant: "secondary" }, children: [] },
                                ],
                              },
                              { type: "Badge", id: "campaign_badge", slot: "end", props: { text: "Pending", size: "x-small", variant: "warning" }, children: [] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "Responsive",
            id: "dashboard_activity",
            props: { breakpoint: "767" },
            children: [
              {
                type: "Card",
                id: "activity_table_card",
                slot: "showAbove", props: {},
                children: [
                  {
                    type: "CardHeader",
                    id: "activity_table_header",
                    props: {},
                    children: [{ type: "Heading", id: "activity_table_title", props: { text: "Recent account activity", size: "3", level: "2" }, children: [] }],
                  },
                  {
                    type: "CardBody",
                    id: "activity_table_body",
                    props: {},
                    children: [
                      {
                        type: "Table",
                        id: "activity_table",
                        props: {},
                        children: [
                          {
                            type: "RowGroup",
                            id: "activity_rows",
                            props: {},
                            children: [
                              {
                                type: "Row",
                                id: "activity_acme",
                                props: { columns: "1.5fr 1fr 1fr auto", size: "small" },
                                children: [
                                  { type: "Cell", id: "activity_acme_account", props: {}, children: [{ type: "Body", id: "activity_acme_name", props: { text: "Acme Studios", size: "small" }, children: [] }] },
                                  { type: "Cell", id: "activity_acme_event", props: {}, children: [{ type: "Body", id: "activity_acme_event_text", props: { text: "Renewal", size: "small" }, children: [] }] },
                                  { type: "Cell", id: "activity_acme_status", props: {}, children: [{ type: "Badge", id: "activity_acme_paid", props: { text: "Paid", size: "small", variant: "positive" }, children: [] }] },
                                  { type: "Cell", id: "activity_acme_action", props: { action: true }, children: [{ type: "Button", id: "activity_acme_view", props: { text: "View", size: "small", variant: "tertiary" }, children: [] }] },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                id: "activity_slat_card",
                slot: "showBelow", props: {},
                children: [
                  {
                    type: "CardBody",
                    id: "activity_slat_body",
                    props: {},
                    children: [
                      {
                        type: "SlatGroup",
                        id: "activity_mobile_slats",
                        props: {},
                        children: [
                          {
                            type: "Slat",
                            id: "activity_mobile_acme",
                            props: { variant: "action" },
                            children: [
                              {
                                type: "VStack",
                                id: "activity_mobile_acme_copy",
                                slot: "start", props: { space: "var(--space-000)" },
                                children: [
                                  { type: "Body", id: "activity_mobile_acme_title", props: { text: "Acme Studios", size: "small", weight: "bold" }, children: [] },
                                  { type: "Body", id: "activity_mobile_acme_meta", props: { text: "Renewal payment", size: "x-small", variant: "secondary" }, children: [] },
                                ],
                              },
                              { type: "Badge", id: "activity_mobile_acme_status", slot: "end", props: { text: "Paid", size: "x-small", variant: "positive" }, children: [] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      agentChat: {
        type: "VStack",
        id: "agent_chat_root",
        props: { space: "var(--space-600)", alignX: "stretch", style: "max-width: 78rem; margin: 0 auto;" },
        children: [
          {
            type: "ChatMessage",
            id: "agent_chat_user_message",
            props: { align: "end", width: "medium", "footer-position": "outside" },
            children: [
              { type: "Body", id: "agent_chat_user_copy", props: { text: "Review this implementation and summarise the changed files.", size: "medium" }, children: [] },
            ],
          },
          {
            type: "ChatMessage",
            id: "agent_chat_response",
            props: { variant: "ghost", size: "medium" },
            children: [
              {
                type: "WorkLog",
                id: "agent_chat_work_log",
                slot: "header",
                props: { label: "Worked for 4m 10s", rule: true },
                children: [
                  { type: "Body", id: "agent_chat_work_summary", props: { text: "Reviewed the component APIs, composition, and generated documentation.", size: "x-small" }, children: [] },
                ],
              },
              { type: "Heading", id: "agent_chat_response_title", props: { text: "Updated the implementation and documentation.", level: "2", size: "6" }, children: [] },
              { type: "Body", id: "agent_chat_response_copy", props: { text: "The response keeps work detail, reviewable output, and follow-up context within one document flow.", size: "small" }, children: [] },
              {
                type: "ResultBar",
                id: "agent_chat_result",
                props: { variant: "accordion", label: "Edited 4 files", rule: true, open: true },
                children: [
                  { type: "Button", id: "agent_chat_undo", slot: "actions", props: { text: "Undo", variant: "tertiary", size: "x-small" }, children: [] },
                  { type: "Button", id: "agent_chat_review", slot: "actions", props: { text: "Review", variant: "secondary", size: "x-small" }, children: [] },
                ],
              },
            ],
          },
          {
            type: "Prompt",
            id: "agent_chat_prompt",
            props: { placeholder: "Ask for follow-up changes...", "enter-submit": true, "context-mode": "icon", "actions-fan": true },
            children: [
              { type: "PreviewChip", id: "agent_chat_preview", slot: "preview", props: { value: "Review the agent chat response", badge: "MD", clickable: true }, children: [] },
              {
                type: "ContextBar",
                id: "agent_chat_context",
                slot: "context",
                props: {},
                children: [
                  { type: "Body", id: "agent_chat_context_copy", props: { text: "Keep the current implementation scope", size: "x-small" }, children: [] },
                ],
              },
              {
                type: "ActionToggle",
                id: "agent_chat_web_toggle",
                slot: "actions",
                props: {},
                children: [
                  { type: "Button", id: "agent_chat_web_action", props: { "context-toggle": true, variant: "tertiary", "icon-only": true, "aria-label": "Toggle web context" }, children: [] },
                  { type: "Chip", id: "agent_chat_web_chip", props: { "context-chip": true, dismiss: true, hidden: true, text: "Web" }, children: [] },
                ],
              },
            ],
          },
        ],
      },
    } as const;

export const compositionStories = {
  agentChat: {
    title: "Agent Chat",
    description: "Composition example for an agent chat surface with response content, generated previews, work detail, reviewable results, and a prompt composer.",
    github: "https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/agent-chat/index.js",
    storybook: "https://storybook.muibook.com/?path=/story/compositions-agent-chat--agent-chat",
    stories: {
      items: [
        { key: "agent-chat", title: "Agent Chat", description: "A complete chat layout composed from message framing, work detail, reviewable output, previews, and prompt controls.", list: ["Use Chat Message for user and agent turns.", "Use Work Log for collapsible execution detail and Result Bar for reviewable output.", "Keep response content as normal document structure so it can contain headings, paragraphs, lists, code, previews, and controls."] },
        { key: "steer", title: "Steer", description: "Keeps compact, editable task context attached to the follow-up composer.", list: ["Use the Prompt context slot for task context, selected text, constraints, examples, or attachments.", "Keep the context row compact and truncated.", "Use Action Toggle for application-controlled context state such as Web, Files, or Canvas."] },
        { key: "thinking", title: "Thinking", description: "Shows an agent response while only the top-level work status is available.", list: ["Use pending on Work Log for active thinking states.", "Omit rule when the status should remain a quiet top-level indicator."] },
        { key: "working", title: "Working", description: "Shows nested execution detail such as elapsed work, files read, and active updates.", list: ["Nest Work Log rows for secondary execution detail.", "Use pending only on work that is still active.", "Keep nested rows compact so the response remains the primary content."] },
      ],
    },
  },
} as const;

export const compositionConfig = {
  signupFlow: { includeInAgent: true, detail: "compact" },
  rewardsCard: { includeInAgent: true, detail: "compact" },
  contactForm: { includeInAgent: true, detail: "compact" },
  analyticsSummary: { includeInAgent: false, detail: "full" },
  onboarding: { includeInAgent: false, detail: "full" },
  wallet: { includeInAgent: false, detail: "full" },
  muitube: { includeInAgent: false, detail: "full" },
  songPage: { includeInAgent: false, detail: "full" },
  videoMetadataAction: { includeInAgent: false, detail: "full" },
  customSelectWastePicker: { includeInAgent: false, detail: "full" },
  drawerWorkspace: { includeInAgent: false, detail: "full" },
  modelViewerProductPreview: { includeInAgent: false, detail: "full" },
  dashboard: { includeInAgent: false, detail: "full" },
  agentChat: { includeInAgent: true, detail: "full" },
} satisfies Record<keyof typeof compositions, { includeInAgent: boolean; detail: "compact" | "full" }>;

type CompositionKey = keyof typeof compositions;

export const agentCompositionKeys = (Object.keys(compositionConfig) as CompositionKey[]).filter(
  (key) => compositionConfig[key].includeInAgent,
);

export type AgentCompositionKey = (typeof agentCompositionKeys)[number];

export const agentCompositions = agentCompositionKeys.reduce(
  (items, key) => ({
    ...items,
    [key]: compositions[key],
  }),
  {} as Pick<typeof compositions, AgentCompositionKey>,
);
