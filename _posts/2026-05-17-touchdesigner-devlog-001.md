---
layout: post
title: "TouchDesigner devlog #001 — getting started"
date: 2026-05-17 14:10:00 +0200
description: First entry of an ongoing devlog. Setup, first patch, and what I'm aiming for next.
tags: touchdesigner devlog setup
categories: touchdesigner weekly
featured: false
giscus_comments: false
related_posts: false
toc:
  beginning: true
---

Starting a public devlog so I have to actually keep working on this. The plan:
short entries, posted weekly (sometimes daily), with whatever I made plus
whatever broke.

## This week

- Installed TouchDesigner (non-commercial license).
- Worked through the first official tutorial.
- Built a small patch that maps audio amplitude to a noise field.

## Embedding images

To include a screenshot, drop the file into
`assets/img/<post-slug>/screenshot.png` and reference it like so:

```liquid
{% raw %}{% include figure.liquid loading="eager"
   path="assets/img/2026-05-17-touchdesigner-devlog-001/patch-01.png"
   class="img-fluid rounded z-depth-1"
   zoomable=true %}{% endraw %}
```

(Once you drop the actual image into that folder, the figure will render
here.)

## Next up

- Get a render running headless and write a script that captures a 10-second
  clip on every save.
- Wire MIDI input from a small controller into the noise field.

If any of that sounds wrong it probably is — corrections welcome over
[email](mailto:ozren@protonmail.ch).
