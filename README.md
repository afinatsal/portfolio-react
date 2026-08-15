# Muhammad Afin Atsal: Portfolio (React + Tailwind)

This is the portfolio site packaged as a proper React + Tailwind project
(Vite build), so you can run it locally, edit it in your own editor, and
deploy it anywhere that serves static files.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/`; upload that folder to any static host (Vercel,
Netlify, GitHub Pages, etc).

## Features

- Multilingual UI (Bahasa Indonesia, English, 中文, 日本語), auto-detected
  from the browser and switchable from the language pill in the header.
- CLI-style loading screen with a dither-canvas hero background, scroll
  reveal animations, and a floating dock navbar.
- Interactive project detail modal, animated counters, copy-email button,
  and a two-lane skills marquee with brand-colored tool logos.
- Mobile-first responsive layout (scroll snap disabled on small screens,
  safe-area insets for notched phones, compact dock and header).

## Notes

- All markup and the original interactive JS live in `src/App.jsx`
  (`MARKUP` string and `LEGACY_SCRIPT` IIFEs), mounted through React and
  run once the DOM is in place. The translation dictionary lives in
  `src/translations.js` and is exposed to the runtime script via
  `window.__I18N`.
- Tailwind is configured normally via `tailwind.config.js` / PostCSS
  instead of the CDN script, so class purging and production builds work
  correctly.
- Your CV file is referenced from the Contact section as
  `./CV_Afin_Atsal.pdf`; drop your actual PDF into the `public/` folder
  with that exact filename so the "CV" download link works.
- Update the LinkedIn/GitHub URLs in `src/App.jsx` (search for
  `linkedin.com/in/afinatsal` and `github.com/afinatsal`) with your real
  profile links.
- Skill logos come from `cdn.simpleicons.org` (Simple Icons) using each
  tool's slug; items without a slug fall back to a neutral ring marker.

## Structure

```
portfolio-react/
├── index.html          # Vite entry HTML
├── public/             # Static assets (CV PDF, photos)
├── src/
│   ├── main.jsx        # React root
│   ├── App.jsx         # Portfolio markup + original interactive JS
│   ├── index.css       # Tailwind directives + custom CSS (dither, reveal, marquee, dock)
│   └── translations.js # i18n dictionary (id/en/zh/ja)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```
