# Changelog.md

## 2026-06-24 — Two GFE videos added to site

Added two YouTube embeds from GFE Solutions as credibility and capability content.

| Video | YouTube ID | Placement | Use |
|---|---|---|---|
| GFE TechOps | `cao3FG4MK-E` | New Chapter 03 — standalone section between Services and Industries | Services / capabilities narrative |
| Technical Operations Division | `8R12Zsj746o` | Inside Chapter 06 (About / Backed by GFE), below the about-grid | Credibility supplement |

Both embeds are click-to-play (no autoplay). Standard 16:9 `<iframe>` with `loading="lazy"`. No new JS dependencies.

Section chapter labels renumbered: Industries 03→04, Process 04→05, About 05→06, Contact 06→07. Hero image unchanged — neither video is hero.

---

## 2026-06-24 — Project restructure to agency layout

Reorganised project from nested experimental structure into clean agency-style layout.

**Why:** The `getnetic-industrial/` subfolder implied multiple parallel Getnetic variants. This is the single, definitive Getnetic website. The new structure separates production site, source assets, documentation, and archived reference material clearly.

**What moved:**

| From | To | Reason |
|---|---|---|
| `getnetic-industrial/` | `site/` | MVP becomes the production site root |
| `context/` | `docs/` | Standard docs folder naming |
| `assets/source-material/` | `assets-source/source-material/` | Keep raw source separate from site assets |
| `website.getnetic.html/` | `archive/old-template/` | Old logistics template, reference only |
| `media/` | `archive/old-template/media/` | Old logistics site images, reference only |
| `psd/` | `archive/old-template/psd/` | Old logistics PSD sources, reference only |

**What was created:**

- `site/privacy-policy.html` — stub page (was linked from footer but file was missing)
- `site/assets/videos/` — reserved slot for future hero video
- `README.md` — project overview and local preview instructions

**No path changes needed in site/index.html:** all asset paths are relative and the internal structure was preserved during the move.

---

## 2026-06-24 — Initial setup

Initial MVP documentation structure created.

Existing files:
- ProjectContext.md
- Content.md
- References.md

Added missing planning files:
- Tasks.md
- InformationArchitecture.md
- VisualDirection.md
- Deployment.md
- TechnicalNotes.md
- Assets.md
- ClaudeRules.md
- Changelog.md

Project direction confirmed:

Field Engineering for Hard-to-Access Infrastructure

Current goal:

Create a separate MVP/staging version for Getnetic without replacing the existing live website.