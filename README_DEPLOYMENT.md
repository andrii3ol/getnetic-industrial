# README_DEPLOYMENT.md

## Live URL

https://andrii3ol.github.io/getnetic-industrial/

## Deployment Source

GitHub Pages — deploys from `production` branch via GitHub Actions.

Workflow: `.github/workflows/deploy.yml`
Trigger: push to `production`
Published folder: `site/`

---

## Branch Map

```
main          ← Claude works here (all development)
  ↓ user approval
stable        ← last validated version / rollback source
  ↓ "release" or "publish"
production    ← live website (GitHub Pages)
```

---

## Quick Reference

### Promote approved work to stable

```bash
git checkout stable
git merge main
git push origin stable
git checkout main
```

### Release to production (publish live)

```bash
git checkout production
git merge stable
git push origin production
git checkout main
```

### Rollback production

```bash
git checkout production
git reset --hard stable
git push --force origin production
git checkout main
```

---

## GitHub Actions

File: `.github/workflows/deploy.yml`

Deploys when `production` receives a push.
Uses `actions/upload-pages-artifact` → `actions/deploy-pages`.
Pages source is configured as "GitHub Actions" in repo settings.

---

## Repository

https://github.com/andrii3ol/getnetic-industrial

---

## Staging Note

This GitHub Pages URL is the interim staging environment while
a custom domain (new.getnetic.com) is being arranged.
DNS and hosting migration require separate confirmation from stakeholders.

See `docs/Deployment.md` for full deployment rules and pre-launch checklist.
