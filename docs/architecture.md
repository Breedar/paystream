# Architecture Overview

PayStream is split into two binaries that communicate through a shared PostgreSQL database.

## API (`cmd/paystream-api`)

The HTTP API server listens on `:8080` and handles all synchronous client requests:

- Payout batch creation and status queries
- Recipient registration and payout method management
- Schedule CRUD (recurring payroll runs)
- Webhook endpoint registration
- Health check at `GET /health`

The API writes jobs to the database (e.g. pending payouts, scheduled runs) and returns immediately. It never submits Stellar transactions directly.

## Worker (`cmd/paystream-worker`)

The background worker processes jobs written by the API:

- **Signing queue** — constructs and signs Stellar multi-operation transactions for pending payout batches
- **Horizon polling** — monitors submitted transactions for settlement confirmation
- **Webhook delivery** — emits events (`payout.completed`, etc.) to registered endpoints with HMAC-SHA256 signatures and exponential-backoff retries
- **Schedule engine** — triggers recurring payroll runs on their CRON schedule

## Communication

```
Client → API (HTTP :8080) → PostgreSQL ← Worker (background)
                                       ↓
                               Stellar Horizon (Testnet / Mainnet)
                                       ↓
                               Recipient webhooks (HTTPS)
```

The API and worker share no in-process state. Scaling either component independently is safe — run multiple API replicas behind a load balancer, and multiple worker replicas with advisory locks on job rows to prevent double-processing.

## Key Internal Packages

| Package | Responsibility |
|---|---|
| `internal/health` | Health check handler used by the API |
| `internal/payout` | Batch chunking, Stellar transaction construction |
| `internal/recipient` | Recipient CRUD and payout method storage |
| `internal/schedule` | CRON-based recurring schedule engine |
| `internal/webhook` | Event emission, HMAC signing, delivery with retries |
| `internal/anchor` | SEP-31 corridor adapters (one file per anchor) |
| `internal/compliance` | Audit log emission and SOC 2 evidence hooks |
