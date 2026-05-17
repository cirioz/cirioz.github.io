# Blog operating guide

The day-to-day of running [cirioz.github.io](https://cirioz.github.io) —
how to publish, what tags to use, what happens when you click Publish,
and what to do when something looks wrong.

> The [README](./README.md) covers what the site **is** and how it's
> built. This file covers how you actually **use** it.

---

## TL;DR — the 30-second version

1. Open <https://cirioz.github.io/admin/> in any browser.
2. Sign in with your GitHub PAT (one-time per browser).
3. Click **New Post**, fill in title, set the right tag (see the
   [tag map](#tag--menu-map) below), drag in any images, write the body.
4. Click **Publish**.
5. Wait ~5 min. The site auto-rebuilds and your post is live.

---

## The two ways to publish

You have two equivalent paths to put content on the site:

| Method | When to use it |
|---|---|
| **Sveltia CMS** at `/admin/` | Default. Works from any browser (Mac, iPad, phone). Drag-and-drop images. No git knowledge needed. |
| **Local git** (clone → edit markdown → push) | When you want to write in your IDE, batch-edit many files, restructure things, or work offline. |

Both end up at the same place: a commit on `main` → auto-build → deploy
to `gh-pages` → live in ~5 min.

---

## First-time setup (already done, but for reference)

You only ever do this once per device.

### Sveltia login

1. Open <https://cirioz.github.io/admin/>.
2. Click **Sign in with Token**.
3. The dialog gives you a button that opens GitHub's PAT generation page
   with the right scopes pre-selected. Click it.
4. Name the token (e.g. `cirioz-cms-mac` or `cirioz-cms-ipad`), pick an
   expiration (90 days is reasonable), click **Generate**, copy the
   token.
5. Paste the token back into Sveltia. Done — it's stored in that
   browser's localStorage. Sign in again separately on your iPad or
   phone if you want to publish from there.

If the token expires, just repeat steps 2–5; nothing breaks in between.

### Local git (already configured on your Mac)

The repo lives at `~/Documents/github/githubpages-blog`. Commits
auto-attribute to `cirioz <ozren@protonmail.ch>` (not your work
identity), and pushes use the SSH alias `github-cirioz`. See the README
for the underlying `~/.gitconfig` / `~/.ssh/config` details.

---

## Publishing recipes

### Publishing a drawing (the most common path)

In Sveltia:

1. **New Post**.
2. Title: anything human, e.g. `Sketches — week of May 17`.
3. Date: leave as the current date/time.
4. Tags: type `drawing`, press Enter. Add free-form tags too if you want
   (`studies`, `sketchbook`, `procreate`, …) — these don't affect the
   menu but generate their own `/blog/tag/<tag>/` pages.
5. (Optional) **Thumbnail**: upload one image to show on the blog index.
6. **Body**: drag your image files directly into the editor. They get
   committed to `assets/img/uploads/` automatically.
7. **Publish**.

The post will appear under `blog → drawing` once the build finishes
(~5 min). Direct URL pattern: `/blog/2026/<slug>/`.

### Publishing a C tutorial

Same flow, different tag:

- Tags: `c-tutorials` (this is the tag the menu leaf
  `blog → programming → C → tutorials` listens for).
- Add free-form tags as you like: `pointers`, `beginner`,
  `embedded`, etc.

After publish, the post shows up at:

- `/blog/tag/c-tutorials/` (menu leaf)
- `/blog/` (full firehose)
- `/blog/tag/<each-other-tag>/` (auto-generated for every tag you used)

### Publishing anything else

Pick the right tag from the [Tag → menu map](#tag--menu-map).

---

## Tag → menu map

The `blog` navbar is a multi-level dropdown driven by
[`_data/blog_menu.yml`](./_data/blog_menu.yml). Each leaf in the menu
listens for **exactly one** tag. Use that tag verbatim in the post's
front matter (or the Sveltia Tags field) and the post will appear under
that leaf.

| Menu path | Tag string |
|---|---|
| programming → C → tutorials | `c-tutorials` |
| programming → C → learning | `c-learning` |
| programming → C → projects | `c-projects` |
| programming → C++ → tutorials | `cpp-tutorials` |
| programming → C++ → learning | `cpp-learning` |
| programming → C++ → projects | `cpp-projects` |
| programming → JS/TS → tutorials | `jsts-tutorials` |
| programming → JS/TS → learning | `jsts-learning` |
| programming → JS/TS → projects | `jsts-projects` |
| programming → Python → tutorials | `python-tutorials` |
| programming → Python → learning | `python-learning` |
| programming → Python → projects | `python-projects` |
| biology | `biology` |
| bioinformatics | `bioinformatics` |
| math | `math` |
| touchdesigner | `touchdesigner` |
| drawing | `drawing` |
| music | `music` |

A post can carry multiple tags from this list — it'll appear under each
leaf you tag it with. So a "C tutorial that's also a project writeup"
could have `c-tutorials c-projects` and show up in both.

> **Empty leaves return 404.** A leaf only resolves to a real page once
> at least one post carries that tag. The 12 programming leaves are all
> empty until you write the first post for each. That's normal — write
> the post, the page exists.

---

## What happens when you click Publish

The full chain:

```
Sveltia "Publish" button
        │
        ▼
GitHub API commit to main           (uses your PAT)
        │
        ▼
build.yml workflow auto-triggers    (event=push)
        │
   ~4–5 min build
        │
        ├─ jekyll build              → _site/
        ├─ purgecss                  → trims unused CSS
        └─ JamesIves/github-pages-deploy-action
                                     → force-pushes _site/ to gh-pages
        ▼
gh-pages branch updated
        │
        ▼
GitHub Pages serves gh-pages
        │
        ▼
https://cirioz.github.io/  (live, ~10 sec CDN refresh after push)
```

You can watch any of this happen at
<https://github.com/cirioz/cirioz.github.io/actions>. Each Sveltia
publish is a row labelled `Build site` triggered by `push`.

If you push multiple times in a row, the older builds get cancelled
automatically by the `concurrency: cancel-in-progress` setting — only
the latest commit ever finishes deploying. That's intentional.

---

## Editing an existing post

In Sveltia:

1. Click **Blog posts** in the left sidebar.
2. Click the post you want to edit.
3. Make changes.
4. Click **Save** (drafts auto-save) or **Publish** (commits to main).

Behind the scenes this is a regular commit that modifies the post's
markdown file in `_posts/`. Same auto-deploy path as a new post.

In git: just edit the file in `_posts/` and `git push`.

## Deleting a post

In Sveltia:

1. Open the post.
2. Click the **⋯** menu in the top-right → **Delete entry**.
3. Confirm.

This commits a deletion to main; the next build won't include the post.

In git: `rm _posts/<file>.md`, then commit and push.

---

## Images

### Inside a post body

In Sveltia, just drag the file into the markdown editor. It commits to
`assets/img/uploads/<filename>` and inserts a markdown image reference
that points at `/assets/img/uploads/<filename>`.

In git: drop the file into `assets/img/uploads/` (or a per-post folder
like `assets/img/<post-slug>/`) and reference it in markdown:

```markdown
![alt text](/assets/img/uploads/my-image.png)
```

For the al-folio `figure.liquid` zoom/lightbox version (nicer for
drawings):

```liquid
{% raw %}{% include figure.liquid loading="eager"
   path="assets/img/uploads/my-image.png"
   class="img-fluid rounded z-depth-1"
   zoomable=true %}{% endraw %}
```

### Post thumbnail

Use the **Thumbnail** field in Sveltia (or `thumbnail: assets/img/...`
in front matter). Shown on the blog index card.

---

## Front matter reference

Sveltia fills these in for you. If you're writing a post by hand, this
is the canonical front matter:

```yaml
---
layout: post
title: Your title
date: 2026-05-17 21:34:00 +0200
description: One-line summary shown on the blog index.
tags:
  - c-tutorials       # menu tag — required for menu placement
  - pointers          # free-form, optional
categories: []        # optional secondary axis (e.g. weekly, notes)
featured: false       # show in the "Featured" strip on the blog index
thumbnail: ''         # optional path under assets/img/...
giscus_comments: false
---

Body in Markdown.
```

For a project (`_projects/<slug>.md`):

```yaml
---
layout: page
title: project name
description: One-line description.
img: assets/img/projects/cover.png
importance: 1         # lower = appears earlier
category: meta        # filter chip on the projects page
---

Long description.
```

---

## Extending the menu

Want to add `Rust` under programming, or a new top-level `photography`?
Edit [`_data/blog_menu.yml`](./_data/blog_menu.yml) — that's the single
source of truth for the navbar dropdown.

### Add a new programming language

```yaml
- title: programming
  children:
    # ... existing C / C++ / JS-TS / Python ...
    - title: Rust
      children:
        - { title: tutorials, tag: rust-tutorials }
        - { title: learning,  tag: rust-learning }
        - { title: projects,  tag: rust-projects }
```

Push. Now hovering `blog → programming` shows Rust with the three
sub-leaves. Tag your Rust posts with `rust-tutorials` etc. and they
appear there.

### Add a new top-level category

```yaml
- { title: photography, tag: photography }
```

Add this at the bottom of the file (alongside `touchdesigner`,
`drawing`, `music`). Tag posts with `photography`.

### Rename a menu label without breaking existing posts

Change only `title:` and leave `tag:` alone. The tag is what your old
posts already use; the title is just the visible label.

### Reorder menu items

Reorder the YAML entries — the menu renders in the order they appear.

---

## Common gotchas

| Symptom | Cause | Fix |
|---|---|---|
| Menu leaf returns 404 | No post carries that tag yet | Write a post with that tag — the page comes into existence on next build |
| Edited a post but the live site doesn't change | Build still running | Wait ~5 min. Check <https://github.com/cirioz/cirioz.github.io/actions> |
| Sveltia says "not authorised" | PAT expired | Sign in again with a freshly-generated PAT |
| Image looks broken in the post | Path mismatch | Sveltia commits to `assets/img/uploads/`. If you're writing markdown by hand, use the leading slash: `/assets/img/uploads/<file>` |
| Tag spelled differently in two posts | They generate two separate tag pages | Pick one canonical spelling and stick to it |
| Auto-deploy didn't trigger | Concurrency cancellation if you pushed in rapid succession | Look at the second-most-recent run; the older one gets cancelled by design |
| Post date is in the future | Jekyll skips future-dated posts | Check the `date:` front matter, or set `future: true` in `_config.yml` (currently off) |

---

## Where things live in the repo

```
/                          repo root
├── _config.yml            site-wide settings (title, theme, plugins)
├── _data/
│   ├── blog_menu.yml      ★ navbar dropdown structure (edit to extend)
│   ├── socials.yml        contact/social links in footer
│   └── cv.yml             CV content rendered on /cv/
├── _includes/
│   ├── header.liquid      navbar template
│   └── blog_nav_dropdown.liquid   ★ multi-level dropdown rendering
├── _layouts/              page layouts (post, page, about, …)
├── _pages/                top-level pages (about, blog, projects, cv)
├── _posts/                ★ blog posts you publish
├── _projects/             project cards on /projects/
├── _sass/
│   └── _blog_dropdown.scss   ★ menu hover styles
├── _news/                 unused (news section is hidden in nav)
├── admin/
│   ├── index.html         loads Sveltia CMS
│   └── config.yml         ★ Sveltia collections / fields config
├── assets/
│   └── img/uploads/       where Sveltia puts images you drag in
├── .github/workflows/
│   └── build.yml          ★ build & deploy to gh-pages on push to main
├── README.md              project overview
└── GUIDE.md               this file
```

★ = the files you'll actually edit when extending the site.

---

## Local preview (optional)

Not required — you can publish without ever running anything locally.
But if you want to see changes before pushing, install Ruby 3.3+ and:

```bash
cd ~/Documents/github/githubpages-blog
bundle install
bundle exec jekyll serve --livereload
```

Visit <http://127.0.0.1:4000>. Edits to markdown files reload the page
automatically. The image-processing plugin needs ImageMagick:
`brew install imagemagick`.

---

## When something is genuinely broken

1. Open the **Actions** tab:
   <https://github.com/cirioz/cirioz.github.io/actions>.
2. Click the latest red ✗ run.
3. Click the failing step. The error is usually obvious (a YAML typo,
   a missing image, a Liquid syntax error in a post).
4. If the build is green but the site looks wrong, do a hard refresh
   (Cmd+Shift+R) — GitHub's CDN sometimes serves stale HTML for ~30 sec.

If a single bad post breaks the whole build (e.g. malformed front
matter), the fastest fix is to delete or fix that post in Sveltia (or
locally) and push again. The build pipeline is "all or nothing" — one
bad post blocks the whole site from updating.

---

## Tagging discipline (a small recommendation)

The combined-tags scheme works as long as you're consistent. A few
guidelines that'll save you grief:

- **Always include the menu tag**. If a post doesn't carry one of the
  tags in [`_data/blog_menu.yml`](./_data/blog_menu.yml), it won't
  appear under any menu leaf. It still shows on the global `/blog/`
  index, but nobody will find it via the dropdown.
- **Free-form tags are optional and additive**. Use them for cross-
  cutting themes (`pointers`, `weekly`, `embedded`, `procreate`).
  They don't appear in the menu but each gets its own
  `/blog/tag/<tag>/` page that you can link to in writing.
- **Categories are an optional second axis**. Use them for *format*
  rather than topic — e.g. `categories: weekly notes`. Avoid mixing
  them with tags for the same purpose; pick one and be consistent.
