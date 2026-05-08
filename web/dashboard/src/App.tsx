import './App.css';

const CAPABILITIES = [
  { label: 'Batched payouts', detail: 'Up to 1,000 recipients per run, chunked automatically across Stellar transactions.' },
  { label: 'Local-currency delivery', detail: 'Settle in 47 currencies via SEP-31 anchors. Fund in USDC, pay in naira, pesos, or shillings.' },
  { label: 'Recurring schedules', detail: 'Weekly, bi-weekly, monthly, or custom CRON. Set it once and payroll runs itself.' },
  { label: 'Multi-sig funding wallets', detail: 'Configurable 2-of-3 to 20-of-20. PayStream co-signs but can never move funds alone.' },
  { label: 'Webhook events', detail: '18 signed event types for every state change. HMAC-SHA256, idempotent, retry-safe.' },
  { label: 'Audit log streaming', detail: 'Push every action to Splunk, Datadog, S3, or any HTTPS sink in real time.' },
];

const INTEGRATIONS = [
  { label: 'Accounting', names: ['QuickBooks', 'Xero', 'NetSuite', 'Sage Intacct'] },
  { label: 'HRIS', names: ['Rippling', 'BambooHR', 'Gusto', 'Workday'] },
  { label: 'Identity', names: ['Okta', 'Google Workspace', 'Azure AD'] },
  { label: 'Anchors', names: ['Cowrie', 'Vibrant', 'ClickPesa', 'MoneyGram'] },
];

export default function App() {
  return (
    <div className="page">

      {/* Nav */}
      <nav className="nav">
        <span className="nav-logo">PayStream</span>
        <div className="nav-right">
          <a href="https://docs.paystream.dev" target="_blank" rel="noopener noreferrer" className="nav-link">Docs</a>
          <a href="https://github.com/Breedar/paystream" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
          <a href="mailto:licensing@paystream.dev" className="nav-cta">Contact sales</a>
        </div>
      </nav>

      {/* Hero - split layout */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Global payroll infrastructure</p>
          <h1 className="hero-title">Pay anyone,<br />anywhere,<br />on time.</h1>
          <p className="hero-sub">
            PayStream lets finance teams run global payroll over Stellar, with batched stablecoin payouts
            that settle in 47 local currencies, with one approval click.
          </p>
          <div className="hero-actions">
            <a href="https://github.com/Breedar/paystream" className="btn-dark" target="_blank" rel="noopener noreferrer">
              Get started free
            </a>
            <a href="https://docs.paystream.dev" className="btn-ghost" target="_blank" rel="noopener noreferrer">
              Read the docs
            </a>
          </div>
          <p className="hero-note">Free up to $1M ARR. Business Source License 1.1.</p>
        </div>

        <div className="hero-right">
          <div className="code-window">
            <div className="code-bar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="code-filename">POST /v1/payouts/batch</span>
            </div>
            <pre className="code-body">{`{
  "name": "May 2026 contractors",
  "asset": "USDC",
  "items": [
    { "recipient_id": "rec_abc",
      "amount": "1500.00" },
    { "recipient_id": "rec_def",
      "amount": "2200.00" },
    { "recipient_id": "rec_ghi",
      "amount": "950.00" }
  ]
}`}</pre>
            <div className="code-response">
              <span className="response-badge">200 OK</span>
              <span className="response-text">batch_id: bat_01HX...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <div className="trust-bar">
        <span className="trust-label">Trusted for payroll across</span>
        <span className="trust-stat">47 countries</span>
        <span className="trust-sep">·</span>
        <span className="trust-stat">1,000 recipients/run</span>
        <span className="trust-sep">·</span>
        <span className="trust-stat">USDC, EURC + 12 anchored stablecoins</span>
      </div>

      {/* Capabilities */}
      <section className="capabilities">
        <div className="cap-header">
          <h2 className="cap-title">Built for the whole payroll stack</h2>
          <p className="cap-sub">Not just a payment button. A complete payroll primitive for distributed teams.</p>
        </div>
        <div className="cap-grid">
          {CAPABILITIES.map((c) => (
            <div key={c.label} className="cap-item">
              <div className="cap-check">✓</div>
              <div>
                <div className="cap-label">{c.label}</div>
                <div className="cap-detail">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Replaces section */}
      <section className="replaces">
        <div className="replaces-inner">
          <h2 className="replaces-title">One tool instead of many</h2>
          <p className="replaces-sub">
            Finance teams stitching together Deel, Wise Business, and in-house scripts
            collapse it all into a single PayStream funding transaction.
          </p>
          <div className="replaces-table">
            <div className="replaces-row header-row">
              <span>You're replacing</span>
              <span>Because</span>
            </div>
            <div className="replaces-row">
              <span className="rep-tool">Deel / Remote / Papaya Global</span>
              <span className="rep-why">Local-currency delivery is the bottleneck, not the employer-of-record</span>
            </div>
            <div className="replaces-row">
              <span className="rep-tool">Wise Business / Revolut Business</span>
              <span className="rep-why">Built for one-off transfers, not 1,000-row monthly payroll batches</span>
            </div>
            <div className="replaces-row">
              <span className="rep-tool">Internal scripts</span>
              <span className="rep-why">Your engineering team grew the company faster than the finance stack</span>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="integrations">
        <h2 className="int-title">Fits into the tools you already use</h2>
        <div className="int-grid">
          {INTEGRATIONS.map((g) => (
            <div key={g.label} className="int-group">
              <div className="int-label">{g.label}</div>
              <div className="int-names">
                {g.names.map((n) => (
                  <span key={n} className="int-chip">{n}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to run global payroll on Stellar?</h2>
          <p className="cta-sub">Open source. Free up to $1M ARR. No lock-in.</p>
          <div className="cta-actions">
            <a href="https://github.com/Breedar/paystream" className="btn-dark" target="_blank" rel="noopener noreferrer">
              Start on GitHub
            </a>
            <a href="mailto:licensing@paystream.dev" className="btn-ghost">Talk to us</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-logo">PayStream</span>
          <span className="footer-tagline">Global payroll on Stellar.</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/Breedar/paystream" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://docs.paystream.dev" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="mailto:licensing@paystream.dev">Licensing</a>
        </div>
      </footer>

    </div>
  );
}