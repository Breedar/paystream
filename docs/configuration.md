# Configuration Options

PayStream is configured entirely through environment variables. Copy
`.env.example` to `.env` and adjust as needed.

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | *(required)* | Postgres connection string. |
| `REDIS_URL` | *(required)* | Redis connection string, used for queues/caching. |
| `STELLAR_NETWORK` | `testnet` | Stellar network to operate against (`testnet` or `public`). |
| `STELLAR_HORIZON_URL` | — | Horizon API base URL for the chosen network. |
| `KMS_KEY_ID` | — | Key ID used for envelope encryption of signing keys. |
| `API_PORT` | `8080` | Port `paystream-api` listens on. |
| `API_SECRET` | — | Shared secret for authenticating internal API calls. Change in production. |
| `ANCHOR_<NAME>_DOMAIN` | — | Stellar anchor domain for the `<NAME>` corridor (one per anchor, e.g. `ANCHOR_VIBRANT_DOMAIN`). |

Variables with no default must be set before starting `paystream-api` or
`paystream-worker`; see `internal/config` for how defaults are resolved.
