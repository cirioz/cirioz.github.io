# cirioz.github.io

Personal site of Ozren Cirkovic (cirioz). Devlogs, tutorials, and projects
across programming, TouchDesigner, drawing, and music.

Live at: <https://cirioz.github.io>

Built on [Jekyll](https://jekyllrb.com/) + the
[al-folio](https://github.com/alshedivat/al-folio) theme. Deployed by GitHub
Actions on every push to `main`.

> **Looking for "how do I publish a post?"** → see [GUIDE.md](./GUIDE.md).
> This README covers the build setup; GUIDE.md covers the day-to-day flow.

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

### Tags drive the navbar dropdown

The "blog" navbar item opens a multi-level dropdown menu. Each *leaf* in
the menu maps to a single tag, and clicking it shows posts with that tag
at `/blog/tag/<tag>/` (al-folio's auto-generated tag index).

The menu structure lives in `_data/blog_menu.yml`. The current taxonomy:

```
blog
├── programming
│   ├── C            ─ c-tutorials, c-learning, c-projects
│   ├── C++          ─ cpp-tutorials, cpp-learning, cpp-projects
│   ├── JS/TS        ─ jsts-tutorials, jsts-learning, jsts-projects
│   └── Python       ─ python-tutorials, python-learning, python-projects
├── touchdesigner    ─ touchdesigner
├── drawing          ─ drawing
└── music            ─ music
```

In each post's front matter, use the tag string verbatim:

```yaml
tags: c-tutorials       # appears under blog → programming → C → tutorials
# or, multiple:
tags: c-tutorials drawing meta
```

A post can carry several leaf tags — it'll appear under each one.

Free-form descriptive tags (e.g. `android`, `scrcpy`, `setup`) can also be
mixed in; they generate their own /blog/tag/<tag>/ pages but aren't shown
in the navbar.

Categories (`categories: notes weekly`) still work too if you want a
secondary axis (e.g. format vs. topic), but the primary navigation is by
tag.

> **Empty leaves return 404.** A leaf only has a working page once at
> least one post carries that tag. If a menu item leads to "Page not
> found", just write your first post for that bucket — the page will
> exist on next build.

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

## Writing without git: the `/admin/` CMS

The site has [Sveltia CMS](https://sveltiacms.app/) wired up at
<https://cirioz.github.io/admin/>. From any browser (desktop, iPad, phone)
you can:

- write a new post in a WYSIWYG editor
- drag images straight into the post body or thumbnail field
- pick tags from the menu vocabulary (drawing, touchdesigner, c-tutorials, …)
- click "Publish" — the CMS commits markdown + images to `main` on your
  behalf, and the deploy workflow rebuilds the site

### First-time login

1. Open <https://cirioz.github.io/admin/> in any browser.
2. Click **Sign in with Token**.
3. The dialog will link you to the GitHub PAT generation page with the
   right scopes pre-selected — generate the token and copy it.
4. Paste the token back into Sveltia. It's stored in your browser's
   localStorage on that device only (regenerate it if it expires).

### Where things are saved

| Field in CMS         | Where it ends up in the repo                             |
|----------------------|----------------------------------------------------------|
| Blog post body       | `_posts/YYYY-MM-DD-<slug>.md`                            |
| Project entry        | `_projects/<slug>.md`                                    |
| Inline images / thumb| `assets/img/uploads/<filename>`                          |

The CMS configuration (which fields exist, where things go) lives in
[`admin/config.yml`](./admin/config.yml). Edit it to add new collections
or fields.

### Drawings, specifically

For a "drawing-of-the-day" workflow:

1. Open `/admin/` → **New Post**.
2. Title: e.g. `2026-05-17 — pencil sketches`.
3. Tags: `drawing` (and optionally finer tags like `studies`, `sketchbook`).
4. Drag the image(s) into the body. They get committed to
   `assets/img/uploads/`.
5. Hit **Publish**. The deploy workflow runs; the post appears under
   `blog → drawing` within a few minutes.

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
