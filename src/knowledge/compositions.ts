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
    } as const;

export const agentCompositionKeys = ["signupFlow", "rewardsCard", "contactForm"] as const;

export type AgentCompositionKey = (typeof agentCompositionKeys)[number];

export const agentCompositions = agentCompositionKeys.reduce(
  (items, key) => ({
    ...items,
    [key]: compositions[key],
  }),
  {} as Pick<typeof compositions, AgentCompositionKey>,
);
