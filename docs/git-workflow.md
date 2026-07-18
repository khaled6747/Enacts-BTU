# Git Workflow

## Branching Strategy

This project follows a trunk-based development workflow with protected integration branches.

### Branch Types

| Branch | Purpose | Lifetime |
|--------|---------|----------|
| `main` | Stable, production-ready code. Never commit directly here. | Permanent |
| `develop` | Main integration branch. All feature branches merge here. | Permanent |
| `feature/<task-name>` | One branch per task or phase. Created from `develop`. | Temporary |

### Branch Flow

```
main
 └── develop
      ├── feature/project-foundation
      ├── feature/jwt-authentication
      ├── feature/realtime-presence
      └── ...
```

### Rules

1. **Never commit directly to `main` or `develop`.**
2. Always create a `feature/<task-name>` branch from `develop`.
3. All work happens on the feature branch.
4. When work is complete, the feature branch is submitted as a Pull Request for review.
5. After review approval, the feature branch is merged into `develop` (not `main`).
6. `main` is only updated when `develop` is promoted to a release.

### Creating Branches

```bash
# Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# When ready to submit
git push -u origin feature/my-new-feature
# Then open a Pull Request on GitHub
```

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | A new feature | `feat(auth): add JWT login endpoint` |
| `fix` | A bug fix | `fix(presence): handle disconnect race condition` |
| `docs` | Documentation only | `docs: update architecture diagram` |
| `chore` | Build, CI, or tooling changes | `chore: update Docker Compose config` |
| `refactor` | Code change that neither fixes a bug nor adds a feature | `refactor(health): extract Redis indicator` |
| `test` | Adding or updating tests | `test(auth): add login integration tests` |
| `style` | Code style changes (formatting, no logic change) | `style: run prettier on server src` |

### Scopes

Optional scopes indicate which part of the codebase is affected:

- `auth` — Authentication and authorization
- `server` — NestJS backend
- `mobile` — Flutter client
- `infra` — Docker, Caddy, infrastructure
- `realtime` — Socket.IO and presence
- `voice` — LiveKit voice integration
- `map` — Virtual office map (Flame)

### Examples

```bash
git commit -m "feat(auth): add JWT access and refresh token generation"
git commit -m "feat(mobile): add splash screen with Enactus Hub branding"
git commit -m "fix(server): handle missing env vars gracefully"
git commit -m "docs: add git workflow documentation"
git commit -m "chore: add Docker Compose for PostgreSQL and Redis"
git commit -m "refactor(health): wire real DB and Redis health checks"
```

## Pull Request Workflow

1. Push your feature branch: `git push -u origin feature/<name>`
2. Open a Pull Request targeting `develop`
3. Fill in the PR description with:
   - What changed
   - Why it changed
   - How to test it
4. Wait for review approval
5. Squash and merge (or regular merge) into `develop`
6. Delete the feature branch after merge
