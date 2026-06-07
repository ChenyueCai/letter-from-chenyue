# Fluid Guestbook

A single-page site with a live WebGL fluid-simulation background and a small
contact form (name, address, message). Submissions are emailed to you via
[Formspree](https://formspree.io) — no server required, so it deploys as a plain
static site on GitHub Pages.

The fluid background is reused from
[Amanda Ghassaei's FluidSimulation](https://github.com/amandaghassaei/FluidSimulation)
(MIT). Drag on empty space to stir it.

## Files

```
index.html          The page (canvas + intro text + form)
style.css           Overlay / intro / form styling
form.js             Submits the form to Formspree without leaving the page
assets/fluid/       Prebuilt fluid-simulation bundle
  main.js           The simulation (self-contained, shaders inlined)
  fluid-base.css    Canvas + base styles from the original project
  micromodal.css    Modal styles (used only for the WebGL-error notice)
  img.png           Fallback cover image if WebGL is unavailable
```

## 1. Set up the form (required)

1. Create a free account at <https://formspree.io> and add a new form.
2. Copy its endpoint id (it looks like `https://formspree.io/f/abcd1234`).
3. In `index.html`, replace `YOUR_FORM_ID` in the `<form action="...">` with
   your id.

Until you do this, submitting shows a "not configured" message instead of
sending.

## 2. Edit the intro text

Change the heading and paragraph inside `<header class="intro">` in
`index.html`.

## 3. Run locally

Open the page through a local server (opening the file directly can break the
script/asset loading in some browsers):

```sh
cd fluid-guestbook
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 4. Deploy to GitHub Pages

```sh
cd fluid-guestbook
git init
git add .
git commit -m "Fluid guestbook site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Build and deployment**, set
**Source = Deploy from a branch**, **Branch = main / (root)**, and save. Your
site goes live at `https://<you>.github.io/<repo>/` within a minute or two.

## Notes

- The address field is free-text. Anything users enter is emailed to you via
  Formspree; review their [privacy terms](https://formspree.io/legal/privacy-policy/)
  if you collect personal data.
- A WebGL-capable browser (desktop Chrome/Firefox recommended) is needed for the
  background; otherwise a static cover image is shown and the form still works.
