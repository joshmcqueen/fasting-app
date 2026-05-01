# Fast Timer

A lightweight, mobile-first fasting timer app. Pick a duration, start your fast, and watch the countdown ring tick down — with rotating motivational quotes to keep you going.

Built with Vite + React. Self-hosted via Docker.

## Features

- Preset durations: 12h, 16h (16:8 IF), 24h (OMAD), 36h, or custom (up to 168h)
- Animated SVG ring countdown with live HH:MM:SS display
- Motivational quotes that rotate every 30 seconds
- Fast persists across browser closes and device sleep (localStorage + wall-clock time)
- Completion screen when your fast finishes
- Dark theme, mobile-first responsive design

## Development

```bash
pnpm install
pnpm dev
```

## Deploy with Docker

```bash
docker build -t fast-timer .
docker run -p 8080:80 fast-timer
```

The multi-stage Dockerfile builds the Vite bundle and serves it via nginx on port 80. Compatible with [Dokploy](https://dokploy.com) — just point it at this repo.
