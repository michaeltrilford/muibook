class CompDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const styles = /*css*/ `
      :host {
        display: block;
      }

      .canvas {
        padding: var(--space-500);
      }

      .dashboard {
        container-name: dashboard;
        container-type: inline-size;
        max-width: 112rem;
        margin: 0 auto;
        padding: var(--space-400) 0;
      }

      .page-header::part(flex-wrap) {
        flex-wrap: wrap;
      }

      .metric-grid::part(grid-template-columns) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .main-grid::part(grid-template-columns) {
        grid-template-columns: minmax(0, 1.55fr) minmax(26rem, 1fr);
      }

      .metric-value {
        white-space: nowrap;
      }

      .activity-table {
        min-width: 0;
      }

      @container dashboard (max-width: 899px) {
        .metric-grid::part(grid-template-columns) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .main-grid::part(grid-template-columns) {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      @container dashboard (max-width: 599px) {
        .metric-grid::part(grid-template-columns) {
          grid-template-columns: minmax(0, 1fr);
        }
      }

      @media (max-width: 599px) {
        .canvas {
          padding: var(--space-300);
        }

        .dashboard {
          padding: var(--space-200) 0;
        }
      }
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${styles}</style>

      <story-template
        title="Dashboard"
        description="A revenue operations dashboard composition translated from a structured design artifact into reusable Mui components."
        github="https://github.com/michaeltrilford/muibook/blob/main/src/muibook/story/compositions/dashboard/index.js"
        storybook="https://stories.muibook.com/?path=/docs/compositions-dashboard--docs"
      >
        <story-card
          id="revenue-operations-dashboard"
          noheader
          composition
        >
          <div slot="body" class="canvas">
            <mui-v-stack class="dashboard" space="var(--space-500)" alignx="stretch">
              <mui-h-stack class="page-header" space="var(--space-400)" alignx="space-between" aligny="center">
                <mui-v-stack space="var(--space-000)" alignx="stretch">
                  <mui-heading size="2" level="1">Revenue operations</mui-heading>
                  <mui-body size="small" variant="secondary">Track recurring revenue, activation health, and actions requiring review.</mui-body>
                </mui-v-stack>
                <mui-button-group align="right">
                  <mui-button size="small" variant="secondary">Export report</mui-button>
                  <mui-button size="small" variant="primary">Create task</mui-button>
                </mui-button-group>
              </mui-h-stack>

              <mui-v-stack space="var(--space-300)" alignx="stretch">
                <mui-grid class="metric-grid" col="repeat(4, minmax(0, 1fr))" space="var(--space-300)" alignx="stretch">
                <mui-card>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-200)" alignx="stretch">
                      <mui-body size="small" variant="secondary">Monthly revenue</mui-body>
                      <mui-heading class="metric-value" size="3" level="2">$128.4K</mui-heading>
                      <mui-badge size="small" variant="positive">+12.8%</mui-badge>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
                <mui-card>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-200)" alignx="stretch">
                      <mui-body size="small" variant="secondary">Active accounts</mui-body>
                      <mui-heading class="metric-value" size="3" level="2">24,892</mui-heading>
                      <mui-badge size="small" variant="positive">+4.2%</mui-badge>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
                <mui-card>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-200)" alignx="stretch">
                      <mui-body size="small" variant="secondary">Trial conversion</mui-body>
                      <mui-heading class="metric-value" size="3" level="2">8.6%</mui-heading>
                      <mui-badge size="small" variant="warning">-1.1%</mui-badge>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
                <mui-card>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-200)" alignx="stretch">
                      <mui-body size="small" variant="secondary">Platform uptime</mui-body>
                      <mui-heading class="metric-value" size="3" level="2">99.98%</mui-heading>
                      <mui-badge size="small" variant="neutral">Stable</mui-badge>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
                </mui-grid>

                <mui-grid class="main-grid" col="minmax(0, 1.55fr) minmax(26rem, 1fr)" space="var(--space-300)" alignx="stretch">
                <mui-card>
                  <mui-card-header>
                    <mui-h-stack alignx="space-between" aligny="center">
                      <mui-v-stack space="var(--space-000)">
                        <mui-heading size="3" level="2">Activation health</mui-heading>
                        <mui-body size="small" variant="secondary">Performance across the last 30 days.</mui-body>
                      </mui-v-stack>
                      <mui-badge size="small" variant="neutral">Last 30 days</mui-badge>
                    </mui-h-stack>
                  </mui-card-header>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-400)" alignx="stretch">
                      <mui-v-stack space="var(--space-100)" alignx="stretch">
                        <mui-h-stack alignx="space-between" aligny="center">
                          <mui-body size="small" weight="bold">Feature adoption</mui-body>
                          <mui-h-stack space="var(--space-200)" aligny="center">
                            <mui-body size="x-small" weight="bold">45%</mui-body>
                            <mui-badge size="x-small" variant="positive">+15%</mui-badge>
                          </mui-h-stack>
                        </mui-h-stack>
                        <mui-progress progress="45"></mui-progress>
                      </mui-v-stack>
                      <mui-v-stack space="var(--space-100)" alignx="stretch">
                        <mui-h-stack alignx="space-between" aligny="center">
                          <mui-body size="small" weight="bold">30-day retention</mui-body>
                          <mui-h-stack space="var(--space-200)" aligny="center">
                            <mui-body size="x-small" weight="bold">68%</mui-body>
                            <mui-badge size="x-small" variant="positive">+4%</mui-badge>
                          </mui-h-stack>
                        </mui-h-stack>
                        <mui-progress progress="68"></mui-progress>
                      </mui-v-stack>
                      <mui-v-stack space="var(--space-100)" alignx="stretch">
                        <mui-h-stack alignx="space-between" aligny="center">
                          <mui-body size="small" weight="bold">Onboarding completion</mui-body>
                          <mui-h-stack space="var(--space-200)" aligny="center">
                            <mui-body size="x-small" weight="bold">81%</mui-body>
                            <mui-badge size="x-small" variant="positive">+11%</mui-badge>
                          </mui-h-stack>
                        </mui-h-stack>
                        <mui-progress progress="81"></mui-progress>
                      </mui-v-stack>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>

                <mui-card>
                  <mui-card-header>
                    <mui-heading size="3" level="2">Priority tasks</mui-heading>
                    <mui-body size="small" variant="secondary">Items requiring owner review today.</mui-body>
                  </mui-card-header>
                  <mui-card-body>
                    <mui-v-stack space="var(--space-300)" alignx="stretch">
                      <mui-slat-group>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="var(--space-000)">
                            <mui-body size="small" weight="bold">Review billing alerts</mui-body>
                            <mui-body size="x-small" variant="secondary">Finance operations</mui-body>
                          </mui-v-stack>
                          <mui-status slot="end" size="small" variant="attention">Urgent</mui-status>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="var(--space-000)">
                            <mui-body size="small" weight="bold">Approve campaign launch</mui-body>
                            <mui-body size="x-small" variant="secondary">Growth team</mui-body>
                          </mui-v-stack>
                          <mui-status slot="end" size="small" variant="warning">Pending</mui-status>
                        </mui-slat>
                        <mui-slat variant="action">
                          <mui-v-stack slot="start" space="var(--space-000)">
                            <mui-body size="small" weight="bold">Invite finance reviewer</mui-body>
                            <mui-body size="x-small" variant="secondary">Workspace admin</mui-body>
                          </mui-v-stack>
                          <mui-status slot="end" size="small">Open</mui-status>
                        </mui-slat>
                      </mui-slat-group>
                      <mui-button variant="tertiary" size="small">View all tasks</mui-button>
                    </mui-v-stack>
                  </mui-card-body>
                </mui-card>
                </mui-grid>

                <mui-responsive breakpoint="767">
                <mui-card class="activity-table" slot="showAbove">
                  <mui-card-header>
                    <mui-h-stack alignx="space-between" aligny="center">
                      <mui-v-stack space="var(--space-000)">
                        <mui-heading size="3" level="2">Recent account activity</mui-heading>
                        <mui-body size="small" variant="secondary">Latest billing and onboarding events.</mui-body>
                      </mui-v-stack>
                      <mui-link size="small" variant="primary">See all</mui-link>
                    </mui-h-stack>
                  </mui-card-header>
                  <mui-card-body>
                    <mui-rule></mui-rule>
                    <mui-table highlight="hover">
                      <mui-row-group heading>
                        <mui-row columns="1.5fr 1fr 1fr auto" size="small">
                          <mui-cell><mui-heading size="6" level="3">Account</mui-heading></mui-cell>
                          <mui-cell><mui-heading size="6" level="3">Event</mui-heading></mui-cell>
                          <mui-cell><mui-heading size="6" level="3">Status</mui-heading></mui-cell>
                          <mui-cell action></mui-cell>
                        </mui-row>
                      </mui-row-group>
                      <mui-row-group>
                        <mui-row columns="1.5fr 1fr 1fr auto" size="small">
                          <mui-cell><mui-body size="small">Acme Studios</mui-body></mui-cell>
                          <mui-cell><mui-body size="small">Renewal</mui-body></mui-cell>
                          <mui-cell><mui-status size="small" variant="positive">Paid</mui-status></mui-cell>
                          <mui-cell action><mui-button size="small" variant="tertiary">View</mui-button></mui-cell>
                        </mui-row>
                        <mui-row columns="1.5fr 1fr 1fr auto" size="small">
                          <mui-cell><mui-body size="small">Northwind Labs</mui-body></mui-cell>
                          <mui-cell><mui-body size="small">Trial review</mui-body></mui-cell>
                          <mui-cell><mui-status size="small" variant="warning">Pending</mui-status></mui-cell>
                          <mui-cell action><mui-button size="small" variant="tertiary">View</mui-button></mui-cell>
                        </mui-row>
                      </mui-row-group>
                    </mui-table>
                  </mui-card-body>
                </mui-card>

                <mui-card slot="showBelow">
                  <mui-card-header>
                    <mui-heading size="3" level="2">Recent account activity</mui-heading>
                    <mui-body size="small" variant="secondary">Latest billing and onboarding events.</mui-body>
                  </mui-card-header>
                  <mui-card-body>
                    <mui-slat-group>
                      <mui-slat variant="action">
                        <mui-v-stack slot="start" space="var(--space-000)">
                          <mui-body size="small" weight="bold">Acme Studios</mui-body>
                          <mui-body size="x-small" variant="secondary">Renewal payment</mui-body>
                        </mui-v-stack>
                        <mui-status slot="end" size="small" variant="positive">Paid</mui-status>
                      </mui-slat>
                      <mui-slat variant="action">
                        <mui-v-stack slot="start" space="var(--space-000)">
                          <mui-body size="small" weight="bold">Northwind Labs</mui-body>
                          <mui-body size="x-small" variant="secondary">Trial review</mui-body>
                        </mui-v-stack>
                        <mui-status slot="end" size="small" variant="warning">Pending</mui-status>
                      </mui-slat>
                    </mui-slat-group>
                  </mui-card-body>
                </mui-card>
                </mui-responsive>
              </mui-v-stack>
            </mui-v-stack>
          </div>

        </story-card>
      </story-template>
    `;
  }
}

if (!customElements.get("comp-dashboard")) {
  customElements.define("comp-dashboard", CompDashboard);
}
