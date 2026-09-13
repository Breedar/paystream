# Security Best Practices

Recommendations for operating PayStream securely in production.

## Secrets Management

Never commit API keys, webhook secrets, or database credentials. Load them
from a secrets manager or environment variables injected at deploy time.

## Webhook Verification

Always verify the `X-Paystream-Signature` header on incoming webhooks
before processing the payload. Reject requests with missing or invalid
signatures.

## Least Privilege

Scope API keys to only the operations they need. Read-only reporting keys
should never have write access to payment initiation endpoints.

## Rate Limiting

Enable rate limiting on public-facing endpoints to reduce exposure to
credential stuffing and abuse (see `internal/ratelimit`).

## Dependency Hygiene

Keep Go modules and dashboard npm dependencies up to date, and monitor
`security/bounty.md` for the responsible disclosure process.

## Two-Factor Authentication

Require two-factor authentication for all dashboard accounts with access
to live-mode data.
