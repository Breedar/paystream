# PayStream

Global payroll on Stellar. Pay distributed teams in stablecoins, settle in 47 local currencies, close the books on time. PayStream is built for finance and people-ops teams running distributed workforces of 10 to 10,000 people. It replaces:

- **Deel, Remote, Papaya Global** for contractor and EOR payouts where local-currency delivery is the bottleneck
- **Wise Business, Revolut Business** for batched cross-border salary runs
- **Custom scripts** wired together by an engineering team that grew the company faster than the finance stack

If you currently pay your team via 14 different vendor invoices on the 1st of every month, PayStream collapses that into one funding transaction and one approval click.

## Repository Structure

```
paystream/
├── cmd/
│   ├── paystream-api/      # Go API server (entry point: main.go)
│   └── paystream-worker/   # Background jobs: signing, Horizon polling, webhook delivery
├── internal/
│   ├── payout/             # Core payout logic, batch chunking, Stellar tx construction
│   ├── recipient/          # Recipient CRUD, payout method management
│   ├── schedule/           # CRON-based recurring schedule engine
│   ├── webhook/            # Event emission, HMAC signing, delivery with retries
│   ├── anchor/             # SEP-31 corridor adapters (one file per anchor)
│   └── compliance/         # Audit log emission, SOC 2 evidence hooks
├── web/
│   └── dashboard/          # React + TypeScript admin UI (Vite, App.tsx is the root)
│       ├── src/
│       │   ├── App.tsx     # Landing page and top-level routing
│       │   └── App.css     # Global styles
│       └── index.html
├── sdks/
│   ├── go/                 # Official Go client SDK
│   ├── python/             # Official Python client SDK
│   ├── node/               # Official Node.js client SDK
│   └── ruby/               # Official Ruby client SDK
├── deploy/
│   ├── helm/               # Helm charts for Kubernetes deployments
│   └── terraform/          # Terraform modules for cloud infrastructure
├── examples/
│   └── webhook_verification/ # HMAC verification samples (Go, Python, Node, Ruby)
├── migrations/             # PostgreSQL migration files (sequential numbered)
├── Makefile                # Developer commands (see below)
└── README.md
```

## Quickstart

### Prerequisites

- Go 1.22+
- Node.js 20+ and pnpm 9+
- PostgreSQL 14+
- A Stellar testnet wallet funded with testnet USDC (get one at the Stellar Laboratory)
- Anchor credentials for at least one corridor (optional for local dev; mock anchors are included)

### Run locally

```bash
git clone https://github.com/Breedar/paystream.git
cd paystream
make bootstrap     # installs Go deps, pnpm deps, runs DB migrations
make dev           # starts API on :8080, dashboard on :3000
```

### Send your first batch

```bash
curl -X POST http://localhost:8080/v1/payouts/batch \
  -H "Authorization: Bearer $PAYSTREAM_API_KEY" \
  -H "Idempotency-Key: payroll-2026-05-01" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "May 2026 contractors",
    "asset": "USDC",
    "items": [
      {"recipient_id": "rec_abc", "amount": "1500.00"},
      {"recipient_id": "rec_def", "amount": "2200.00"}
    ]
  }'
```

The response returns a `batch_id`. PayStream signs and submits the underlying Stellar transactions, monitors settlement on Horizon, and emits `payout.completed` webhooks as each recipient confirms receipt.

## API Reference

The full reference is at `https://docs.paystream.dev`. The REST API covers four primary resources: **payouts** (single and batched), **recipients** (registration and payout method management), **schedules** (recurring runs), and **webhooks** (endpoint registration and 18 event types). All mutating endpoints accept an `Idempotency-Key` header; replays within 24 hours return the original response.

## Security and Compliance

### Funding wallet

PayStream never holds customer funds. The funding wallet is a Stellar account owned by the customer, configured with multi-sig:

- Default: 2-of-3 (CFO, CEO, PayStream service signer)
- Configurable up to 20-of-20 for enterprise tier
- The PayStream service signer can only co-sign; it cannot unilaterally move funds
- Daily and per-transaction limits enforced via signer weights and pre-authorized time-bounds

### Compliance posture

| Area | Status |
|---|---|
| SOC 2 Type II | Audit underway; target Q3 2026 |
| Data residency | US, EU, or APAC (customer choice) |
| Encryption | TLS 1.3 in transit; AES-256 at rest; per-customer KMS for PII |
| Audit logs | Every state-changing action streamed to Splunk, Datadog, S3, or any HTTPS endpoint |

## Integrations

**Accounting:** QuickBooks Online, Xero, NetSuite, Sage Intacct

**HRIS:** Rippling, BambooHR, Gusto, Workday, HiBob

**Identity:** Okta, Google Workspace, Azure AD (SAML 2.0 + SCIM 2.0)

**Stellar anchors:** Cowrie, Vibrant, Pendo, ClickPesa, Saldo, MoneyGram Access

**Notifications:** Slack, Teams, Discord, Email, PagerDuty

## Stellar Primitives Used

- Multi-operation transactions (up to 100 ops/tx) for batched payouts
- Multi-sig accounts with weighted signers for the funding wallet
- Horizon `/transactions` and `/payments` ingestion for settlement confirmation
- `MEMO_HASH` memos carrying payout reference IDs that link back to batch records
- SEP-31 cross-border anchor flow for local-currency delivery
- SEP-10 authentication for the dashboard and API key issuance

## Contributing

External PRs are welcome for SDK improvements, anchor configurations, webhook examples, and bug fixes. For larger features, open a GitHub Discussion first to align on approach before writing code.

### Development commands

```bash
make bootstrap      # install deps and run DB migrations
make dev            # start API (:8080) and dashboard (:3000) with hot reload
make test           # run the full test suite (Go + TypeScript)
make test-api       # Go tests only
make test-dashboard # TypeScript/Vitest tests only
make lint           # golangci-lint (Go) + eslint + prettier (TypeScript)
make build          # production build of API binary and dashboard bundle
```

### Branch naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/<short-description>` | `feat/mexico-corridor` |
| Bug fix | `fix/<short-description>` | `fix/webhook-retry-backoff` |
| Docs | `docs/<short-description>` | `docs/sep31-anchor-guide` |
| Chore | `chore/<short-description>` | `chore/update-golangci` |

### Commit messages

Follow Conventional Commits:

```
feat(anchor): add ClickPesa corridor for Tanzania and Uganda
fix(webhook): cap retry backoff at 1 hour to prevent stale deliveries
docs(sdk/node): add idempotency key example to batch payout snippet
```

### PR checklist

- `make test` passes locally
- `make lint` passes with no new warnings
- New behaviour is covered by at least one test
- PR description links the relevant issue (`closes #N`)
- Migrations are numbered sequentially and reversible where possible

### Code conventions

**Go:** Follow standard Go idioms. Exported types and functions must have doc comments. Keep packages focused; prefer multiple small files over one large one.

**TypeScript:** Strict mode is on. Prefer named exports. Component files are PascalCase; utility files are camelCase.

