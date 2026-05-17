---
layout: post
title: "How to mirror an Android screen on a Mac"
date: 2026-05-17 14:05:00 +0200
description: A 5-minute setup with scrcpy that I keep re-discovering. Wireless and USB both covered.
tags: tutorials android scrcpy macos
categories: tutorials programming
featured: false
giscus_comments: false
related_posts: false
toc:
  beginning: true
---

Every few months I need to mirror my Android phone onto my Mac for screen
recording, automated testing, or just so I can type with a real keyboard.
And every few months I forget how I did it last time. So here it is, written
down once.

## What we'll use

[`scrcpy`](https://github.com/Genymobile/scrcpy) — open-source, no app to
install on the phone, ~25 MB. It uses Android's `adb` plumbing under the hood.

## Setup

```bash
brew install --cask android-platform-tools
brew install scrcpy
```

That gives you `adb` (Android Debug Bridge) and `scrcpy` itself.

## On the phone

1. Open **Settings → About phone** and tap **Build number** seven times to
   unlock developer mode.
2. Go to **Settings → Developer options** and enable **USB debugging**
   (and **Wireless debugging** if you want cordless mirroring).

## Mirror over USB

Plug the phone in, accept the "Allow USB debugging?" prompt on the phone,
then:

```bash
scrcpy
```

That's it. Bonus flags I always end up wanting:

```bash
scrcpy --max-size=1280 --max-fps=60 --window-title="phone"
```

## Mirror over Wi-Fi

In **Developer options → Wireless debugging**, tap **Pair device with pairing
code**. The phone will show an IP / port and a 6-digit code. On the Mac:

```bash
adb pair <IP>:<PAIR_PORT>      # paste the pairing code when asked
adb connect <IP>:<CONNECT_PORT>
scrcpy
```

After the first pairing on the same Wi-Fi network you usually only need
`adb connect <IP>:<CONNECT_PORT>` and `scrcpy` again.

## Common gotchas

- Mac firewall blocking `adb` — allow it once and you're set.
- "Device unauthorized" — unplug, replug, accept the prompt on the phone.
- Pixel phones sometimes drop wireless debugging when the screen sleeps;
  just reconnect.

That's the whole thing. Save this for next time.
