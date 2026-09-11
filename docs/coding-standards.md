# Coding Standards

These standards apply to all contributions and complement [CONTRIBUTING.md](../CONTRIBUTING.md).

## Go

- Run `gofmt` (or `goimports`) before committing; CI does not auto-format.
- Package comments start with `// Package <name> ...` and describe purpose, not implementation.
- Exported identifiers must have a doc comment starting with their name.
- Wrap errors with context: `fmt.Errorf("package: doing thing: %w", err)`.
- Prefer table-driven tests; name test files `<file>_test.go` alongside the code they test.

## Dashboard (TypeScript)

- Run `pnpm typecheck` in `web/dashboard` before opening a PR.
- Keep components small and colocate types with the component that owns them.

## Commits and PRs

- One logical change per PR; keep new files focused and reasonably small.
- Use Conventional Commits (see CONTRIBUTING.md) and reference the issue with `closes #<number>`.
- Do not commit secrets or `.env` files; use `.env.example` as the template.

## Review Expectations

- All CI checks (`go build`, `go test`, dashboard typecheck) must pass before merge.
- Address review feedback with follow-up commits rather than force-pushing, unless asked to squash.
