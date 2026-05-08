import './App.css';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Batched Payouts',
    body: 'Pay up to 1,000 recipients in a single run. PayStream chunks across Stellar transactions automatically, no manual splitting required.',
  },
  {
    icon: '🌍',
    title: '47 Local Currencies',
    body: 'Settle in local currency via SEP-31 anchors. Recipients get paid in what they spend, not what you fund in.',
  },
  {
    icon: '🔁',
    title: 'Recurring Schedules',
    body: 'Set up weekly, bi-weekly, monthly, or custom CRON schedules. Payroll runs itself on time, every time.',
  },
  {
    icon: '🔐',
    title: 'Multi-Sig Wallets',
    body: 'Configurable 2-of-3 to 20-of-20 multi-sig. PayStream co-signs but can never move funds unilaterally.',
  },
  {
    icon: '🔔',
    title: '18 Webhook Events',
    body: 'Real-time events for every payout state change. Signed with HMAC-SHA256 and safe for retry loops.',
  },
  {
    icon: '📊',
    title: 'Audit and Compliance',
    body: 'Full audit log streaming to Splunk, Datadog, or S3. SOC 2 Type II audit in progress (target Q3 2026).',
  },
];

const INTEGRATIONS = [
  { category: 'Accounting', tools: 'QuickBooks Online, Xero, NetSuite, Sage Intacct' },
  { category: 'HRIS', tools: 'Rippling, BambooHR, Gusto, Workday, HiBob' },
  { category: 'Identity', tools: 'Okta, Google Workspace, Azure AD via SAML 2.0 and SCIM' },
  { category: 'Anchors', tools: 'Cowrie, Vibrant, ClickPesa, MoneyGram Access, Pendo' },
  { category: 'Notifications', tools: 'Slack, Microsoft Teams, Discord, PagerDuty, Email' },
  { category: 'Audit Sinks', tools: 'Splunk, Datadog, Amazon S3, any HTTPS endpoint' },
];

const REPLACES = [
  { name: 'Deel / Remote / Papaya Global', reason: 'for cross-border contractor payouts where local-currency delivery is the bottleneck' },
  { name: 'Wise Business / Revolut Business', reason: 'for batched cross-border salary runs at scale' },
  { name: 'Custom internal scripts', reason: 'built by an engineering team that grew the company faster than the finance stack' },
];

export default function App() {
  return (
    <div className="page">
      <nav className="nav">
        <span className="nav-logo">PayStream</span>
        <div className="nav-links">
          <a href="https://docs.paystream.dev" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="#features" className="nav-cta">Get Started</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Built on Stellar · SEP-31 Compliant</div>
          <h1 className="hero-title">Global Payroll,<br />Done Right.</h1>
          <p className="hero-sub">
            Pay distributed teams in stablecoins and settle in 47 local currencies.
            One funding transaction. One approval click. Close the books on time.
          </p>
          <div className="hero-ctas">
            <a href="#features" className="btn-primary">See How It Works</a>
            <a
              href="https://github.com/Breedar/paystream"
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <div className="hero-bg" aria-hidden="true" />
      </section>

      <section className="stats">
        <div className="stat">
          <span className="stat-value">1,000</span>
          <span className="stat-label">Recipients per run</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">47</span>
          <span className="stat-label">Local currencies</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">18</span>
          <span className="stat-label">Webhook event types</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">20-of-20</span>
          <span className="stat-label">Max multi-sig config</span>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-header">
          <h2 className="section-title">Everything finance teams need</h2>
          <p className="section-sub">
            From a single contractor invoice to a 1,000-person global payroll run, PayStream handles the full stack.
          </p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="replaces">
        <div className="section-header">
          <h2 className="section-title">Replace the patchwork</h2>
          <p className="section-sub">
            If you currently pay your team via multiple vendor invoices each month,
            PayStream collapses that into one funding transaction and one approval click.
          </p>
        </div>
        <div className="replaces-list">
          {REPLACES.map((r) => (
            <div key={r.name} className="replace-item">
              <span className="replace-name">{r.name}</span>
              <span className="replace-reason">{r.reason}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="integrations">
        <div className="section-header">
          <h2 className="section-title">Connects with your stack</h2>
          <p className="section-sub">
            Push payouts to your accounting software, sync recipients from your HRIS, and stream audit logs wherever your team already works.
          </p>
        </div>
        <div className="integration-grid">
          {INTEGRATIONS.map((i) => (
            <div key={i.category} className="integration-card">
              <div className="integration-category">{i.category}</div>
              <div className="integration-tools">{i.tools}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Ready to simplify global payroll?</h2>
        <p className="cta-sub">
          Up to $1M ARR free. No vendor lock-in. Built on open Stellar infrastructure.
        </p>
        <a
          href="https://github.com/Breedar/paystream"
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started on GitHub
        </a>
      </section>

      <footer className="footer">
        <div className="footer-logo">PayStream</div>
        <p className="footer-tagline">Global payroll on Stellar. Open source.</p>
        <div className="footer-links">
          <a href="https://github.com/Breedar/paystream" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://docs.paystream.dev" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="mailto:licensing@paystream.dev">Licensing</a>
        </div>
        <p className="footer-legal">
          Released under Business Source License 1.1. Converts to Apache 2.0 four years after each release.
          Production use up to $1M ARR is free.
        </p>
      </footer>
    </div>
  );
}