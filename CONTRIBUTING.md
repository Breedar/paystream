# Contributing to PayStream

Thank you for contributing!

## Go Module Workflow

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/paystream.git
   cd paystream
   git remote add upstream https://github.com/Breedar/paystream.git
   ```
2. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature
   ```
3. Push your branch and open a pull request against `main`.

## Running Tests

```bash
# Build all Go packages
go build ./...

# Run all Go tests
go test ./...
```

For the dashboard:
```bash
cd web/dashboard
pnpm install
pnpm typecheck
```

## Branch and Commit Conventions

Branch names: `<type>/<short-description>` — e.g. `feat/webhook-retry`, `fix/ci-pnpm`.

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>
```

Common types: `feat`, `fix`, `docs`, `chore`, `ci`, `refactor`, `test`.

## Submitting a Pull Request

- Keep each PR focused on a single concern.
- Ensure `go build ./...` and `go test ./...` pass before opening a PR.
- Reference the related issue with `closes #<number>` in the PR description.
