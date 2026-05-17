# cirioz.github.io

Personal site of Ozren Cirkovic (cirioz). Devlogs, tutorials, and projects
across programming, TouchDesigner, drawing, and music.

Live at: <https://cirioz.github.io>

Built on [Jekyll](https://jekyllrb.com/) + the
[al-folio](https://github.com/alshedivat/al-folio) theme. Deployed by GitHub
Actions on every push to `main`.

---

## Writing a new post

1. Create a Markdown file in `_posts/` named `YYYY-MM-DD-some-title.md`.
2. Add front matter at the top:

   ```markdown
   ---
   layout: post
   title: "Your title"
   date: 2026-05-17 09:00:00 +0200
   description: One-sentence summary that shows on the blog index.
   tags: short tags here
   categories: touchdesigner weekly
   featured: false
   giscus_comments: false
   ---

   Body in Markdown.
   ```

3. Push to `main`. GitHub Actions builds and deploys; site updates in ~2 min.

### Categories

Posts are organized by these categories. A post can have several — separate
with spaces in the front matter (e.g. `categories: tutorials programming`).

| Category        | Use for |
|-----------------|---------|
| `programming`   | Code, dev, QA, automation, devops, frontend |
| `tutorials`     | Step-by-step how-tos |
| `touchdesigner` | TouchDesigner patches and devlogs |
| `drawing`       | Sketches, studies, drawing devlogs |
| `music`         | Music projects, theory notes, listening notes |
| `notes`         | Short notes that don't fit a topic |
| `weekly`        | Week / day recaps (works alongside any topic) |

The complete list lives in `_config.yml` under `display_categories`.
Each category gets an auto-generated index at `/blog/category/<name>/`.

### Adding images to a post

Drop the file into `assets/img/<post-slug>/your-image.png`, then in the post:

```liquid
{% include figure.liquid loading="eager"
   path="assets/img/<post-slug>/your-image.png"
   class="img-fluid rounded z-depth-1"
   zoomable=true %}
```

Image processing runs through `imagemagick` during the build to produce
responsive WebP variants automatically.

---

## Adding a project

Create `_projects/<n>_short_slug.md`:

```markdown
---
layout: page
title: project name
description: One-line description.
img: assets/img/projects/your-image.png
importance: 1
category: programming
---

Long description in Markdown.
```

`category` is shown as a filter chip on `/projects/`. `importance` controls
sort order (lower = earlier).

---

## Site map

```
_pages/         top-nav pages (about, blog, projects, cv, news)
_posts/         blog posts
_projects/      project cards
_news/          short homepage announcements
_data/cv.yml    CV content rendered on /cv/
_data/socials.yml  social/contact links shown in footer
_config.yml     all site-wide settings
assets/img/     images (auto-resized via imagemagick)
.github/workflows/deploy.yml   build & deploy on push
```

---

## Local preview (optional)

System Ruby on macOS is too old. Get a modern one:

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Then in this folder:

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open <http://127.0.0.1:4000>. The `imagemagick` plugin needs `imagemagick`
installed too: `brew install imagemagick`.

> Local builds aren't required. Pushing to `main` is enough — GitHub Actions
> handles the build server-side. Local preview is just nicer when iterating.

---

## Account / git setup

This repo lives under the personal GitHub account `cirioz`. The local clone is
configured to commit as `cirioz <ozren@protonmail.ch>` (not the company
identity) via an `includeIf` block in `~/.gitconfig`. The remote uses the
SSH host alias `github-cirioz` so it authenticates with the personal SSH key
(`~/.ssh/id_ed25519`).
