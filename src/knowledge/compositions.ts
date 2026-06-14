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
                          variant: "optional",
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
                    props: { text: "Rewards", size: "4", level: "4" },
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
                          "bg-image": "https://muibook.com/images/diamond.png",
                          partner: "https://muibook.com/images/emerald.svg",
                          number: "1234",
                          type: "Rewards",
                          variant: "plain",
                          state: "default",
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
                            props: { text: "Revenue", size: "small", variant: "optional" },
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
                            props: { text: "Orders", size: "small", variant: "optional" },
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
                            props: { text: "Conversion", size: "small", variant: "optional" },
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
              partner: "Visa",
              type: "Debit",
              number: "1234",
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
                    props: { inset: true, stroke: "none", radius: "500" },
                    children: [
                      { type: "TabItem", id: "tab_item_tx", props: { active: true, text: "Transactions" }, children: [] },
                      { type: "TabItem", id: "tab_item_st", props: { text: "Statements" }, children: [] },
                    ],
                  },
                  {
                    type: "TabPanel",
                    id: "panel_tx",
                    props: { item: "tab_item_tx" },
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
                            ],
                          },
                          {
                            type: "Slat",
                            id: "tx_item_1",
                            props: { variant: "row", col: "1fr auto" },
                            children: [
                              { type: "Avatar", id: "tx_item_1_icon", props: {}, children: [] },
                              { type: "VStack", id: "tx_item_1_details", props: {}, children: [] },
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
                props: { alignX: "start", alignY: "center", space: "var(--space-200)" },
                children: [
                  { type: "Heading", id: "logo", props: { text: "Premium", size: "3" }, children: [] },
                  { type: "Badge", id: "country", props: { text: "AU" }, children: [] },
                ],
              },
              {
                type: "HStack",
                id: "header_search",
                props: { alignX: "center", alignY: "center" },
                children: [
                  {
                    type: "Input",
                    id: "search_input",
                    props: { placeholder: "Search" },
                    children: [
                      { type: "Button", id: "search_btn", props: { variant: "secondary" }, children: [] },
                    ],
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
                props: { width: "240px", variant: "push", open: true, side: "left" },
                children: [
                  {
                    type: "VStack",
                    id: "sidebar_menu",
                    props: { space: "var(--space-000)" },
                    children: [
                      { type: "Button", id: "menu_home", props: { text: "Home", variant: "tertiary" }, children: [] },
                      { type: "Button", id: "menu_shorts", props: { text: "Shorts", variant: "tertiary" }, children: [] },
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
              { type: "Heading", id: "logo", props: { text: "SoundAmp", size: "3" }, children: [] },
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
                        props: { slot: "primary", text: "Twilight", weight: "bold" },
                        children: [],
                      },
                      {
                        type: "Link",
                        id: "song_creator",
                        props: { slot: "secondary", href: "#creator-profile", text: "by Michael Trilford", weight: "medium" },
                        children: [],
                      },
                    ],
                  },
                  {
                    type: "Button",
                    id: "player_buy",
                    props: { slot: "meta-after", text: "Buy now", variant: "overlay" },
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
                props: { slot: "primary", text: "Sugoi Travels", weight: "bold" },
                children: [],
              },
              {
                type: "Link",
                id: "video_subscribers",
                props: { slot: "secondary", href: "#creator-profile", text: "77k subscribers", weight: "medium" },
                children: [],
              },
            ],
          },
          {
            type: "Button",
            id: "video_subscribe",
            props: { slot: "meta-after", text: "Subscribe", variant: "overlay" },
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
            props: { slot: "left", space: "var(--space-300)", padding: "var(--space-400)" },
            children: [
              { type: "Heading", id: "workspace_left_heading", props: { text: "Components", size: "4", level: "2" }, children: [] },
              { type: "Button", id: "workspace_media_card", props: { text: "Media Card", variant: "tertiary" }, children: [] },
              { type: "Button", id: "workspace_sidebar", props: { text: "Sidebar", variant: "tertiary" }, children: [] },
            ],
          },
          {
            type: "VStack",
            id: "workspace_canvas",
            props: { slot: "page", space: "var(--space-400)", padding: "var(--space-500)", alignX: "center" },
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
            props: { slot: "right", space: "var(--space-300)", padding: "var(--space-400)" },
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
        props: { space: "var(--space-500)", alignX: "stretch" },
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
        ],
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
