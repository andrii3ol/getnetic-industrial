# GIT_WORKFLOW.md

## Branch Structure

```
main
 ↓  (user approves feature set)
stable
 ↓  (user says "release" or "publish")
production
```

## Branch Definitions

### main
- Active development branch.
- Claude always works here.
- All commits, experiments, media changes, design iterations go here.
- Never deployed publicly.
- Never manually edited on GitHub web UI.

### stable
- Last validated / QA-approved version.
- Candidate for production release.
- Source for rollback if production breaks.
- Only receives merges from main after explicit user approval.

### production
- Public live website.
- GitHub Pages deploys ONLY from this branch.
- Never edited directly.
- Only receives merges from stable at release time.

---

## Daily Workflow (Claude)

Claude always works on `main`.

```bash
# After every completed task:
git add <files>
git commit -m "Task description"
git push origin main
```

---

## User Approval Flow

When the user approves a feature set or review iteration:

```bash
git checkout stable
git merge main
git push origin stable
git checkout main
```

---

## Release Flow

When the user explicitly says **"release"** or **"publish"**:

```bash
git checkout production
git merge stable
git push origin production
git checkout main
```

GitHub Actions deploys automatically when `production` receives a push.

---

## Rollback Procedures

### Roll back production to last stable

```bash
git checkout production
git reset --hard stable
git push --force origin production
git checkout main
```

### Roll back development (main) to last stable

```bash
git checkout main
git reset --hard stable
git push --force origin main
```

### Roll back to a specific commit

```bash
# Find the commit hash
git log --oneline production

# Revert cleanly (preferred — creates a new commit, non-destructive)
git checkout production
git revert <commit-hash> --no-edit
git push origin production
git checkout main
```

---

## Checkpoint Commits

Before any risky change on main, create a checkpoint:

```bash
git add -p  # or specific files
git commit -m "Checkpoint: before <description of risky change>"
git push origin main
```

If the change goes wrong, revert to the checkpoint:

```bash
git revert HEAD --no-edit
# or
git reset --hard <checkpoint-hash>
```

---

## Rules

| Rule | Detail |
|---|---|
| Claude works on | `main` only |
| Never commit directly to | `stable`, `production` |
| Deployment triggers on | `production` push only |
| After every task | commit + push to main |
| Before risky change | checkpoint commit |
| Report always includes | branch, commit hash, files changed |

---

## GitHub Actions

Workflow file: `.github/workflows/deploy.yml`

- Triggers on push to `production`
- Deploys `site/` folder to GitHub Pages
- Uses `actions/deploy-pages@v4`

---

## Branch Status Summary

| Branch | Purpose | Deploys | Who touches it |
|---|---|---|---|
| `main` | Development | No | Claude |
| `stable` | QA / approved | No | User approval merges from main |
| `production` | Live website | Yes (GitHub Pages) | Release merges from stable |
