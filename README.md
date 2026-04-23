# Manafa SCF Explainer Video

A ~2 minute browser-playable motion graphic explainer video for Manafa, a SAMA-licensed Supply Chain Finance platform in Saudi Arabia.

Built with React + Vite + Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal.

## Build

```bash
npm run build
npm run serve
```

## Structure

- `src/components/video/scenes/` — 15 scenes across 4 acts
- `src/components/video/VideoTemplate.tsx` — playback engine
- `src/lib/video/` — timing hooks and utilities
- `public/vo/` — voiceover audio clips
- `public/logos/` — brand assets
- `SCRIPT.md` — full script and timing reference

## Vite plugin note

The original project uses Replit-specific Vite plugins. If `vite.config.ts` references `@replit/vite-plugin-*` packages and you're not running on Replit, remove those plugin imports from `vite.config.ts` before running `npm install`.
