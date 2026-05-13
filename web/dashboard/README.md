# PayStream Dashboard

React + Vite front-end for the PayStream platform.

## Running the dev server

`ash
# From the repo root
pnpm install --no-frozen-lockfile

# Or from this directory
cd web/dashboard
pnpm install
pnpm dev
`

The dev server starts at <http://localhost:5173> by default.

## Environment variables

Copy .env.example to .env and fill in the values:

| Variable | Description | Default |
|---|---|---|
| NEXT_PUBLIC_API_URL | PayStream API base URL | http://localhost:8080 |
| NEXT_PUBLIC_STELLAR_NETWORK | Stellar network (mainnet or 	estnet) | 	estnet |
| NEXT_PUBLIC_HORIZON_URL | Stellar Horizon endpoint | https://horizon-testnet.stellar.org |

## Other commands

| Command | Description |
|---|---|
| pnpm build | Production build |
| pnpm typecheck | TypeScript type-check |
| pnpm lint | ESLint |
| pnpm preview | Preview production build locally |