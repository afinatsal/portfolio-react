# Muhammad Afin Atsal — Portfolio (React + Tailwind)

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

Output goes to `dist/` — upload that folder to any static host (Vercel,
Netlify, GitHub Pages, etc).

## Notes

- The interactive parts (dithered canvas background, scroll-reveal, floating
  dock navbar, project detail modal, email-copy button, skills marquee) are
  the original vanilla JS, now loaded through `src/App.jsx` instead of a
  `<script>` tag in the HTML head — same behavior, proper build pipeline.
- Tailwind is configured normally via `tailwind.config.js` / PostCSS instead
  of the CDN script, so class purging and production builds work correctly.
- Your CV file is referenced from the Contact section as
  `./CV_Afin_Atsal.pdf` — drop your actual PDF into the `public/` folder
  with that exact filename so the "CV" download link works.
- Update the LinkedIn/GitHub URLs in `src/App.jsx` (search for
  `linkedin.com/in/afinatsal` and `github.com/afinatsal`) with your real
  profile links.

## Structure

```
portfolio-react/
├── index.html          # Vite entry HTML
├── src/
│   ├── main.jsx         # React root
│   ├── App.jsx          # Portfolio markup + original interactive JS
│   └── index.css        # Tailwind directives + custom CSS (dither, reveal, marquee, dock)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```
