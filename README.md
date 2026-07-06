# Renzhi He — Personal Homepage

A static, single-page academic homepage rebuilt to match the layout of
`cubhe.mystrikingly.com`, ready to host for free on **GitHub Pages**.

Pure HTML/CSS/JS — no build step, no framework.

## Structure

```
cubhe.github.io/
├── index.html        # all page content
├── css/style.css     # styling (Josefin Slab / Unna / Cardo web fonts)
├── js/main.js        # mobile nav toggle + footer year
├── images/           # all photos, posters, logo, favicon
└── README.md
```

Sections, in order: **About → News → quote → Research (7 entries) →
quote → Projects (3) → Beyond the Lab → footer** — the same order as the
original site. All text, links, and images were copied from the live site.

## Preview locally

Just open `index.html` in a browser, or serve the folder:

```bash
py -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

Because the folder is named `cubhe.github.io`, it will publish as a
**user site** at `https://cubhe.github.io/`.

```bash
cd "path/to/cubhe.github.io"
git init
git add .
git commit -m "Personal homepage"
git branch -M main
git remote add origin https://github.com/cubhe/cubhe.github.io.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source:
Deploy from a branch → `main` / `root`**. The site goes live at
`https://cubhe.github.io/` within a minute or two.

> Note: `cubhe.github.io` currently hosts an Academic Pages Jekyll site.
> Pushing this repo replaces it. To keep both, deploy this into a
> subfolder repo (e.g. `homepage`) instead — it will then live at
> `https://cubhe.github.io/homepage/`.

## Editing

- **Text / links** — edit `index.html` directly.
- **Colors / spacing / fonts** — the CSS variables at the top of
  `css/style.css` (`--bg-news`, `--serif-title`, …) control the theme.
- **Images** — drop replacements into `images/` and update the `src`
  attributes in `index.html`.
