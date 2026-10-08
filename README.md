# VibeEdit project page

Static project page for **VibeEdit: Image Editing with Canvas Instructions**.

This `page` branch contains the website at the repository root. The `main` branch is reserved for the project repository.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select **page** and **/ (root)**, then save.

The project page will be available at https://zhaojingjing713.github.io/VibeEdit/ once deployment completes.

No build step or external dependencies are required. `.nojekyll` serves the files as a static website. All asset paths are relative, so the page works under `/VibeEdit/`.

## Local preview

```sh
python3 -m http.server 8087
```

Open http://localhost:8087/.

## Files

- `index.html`: page content and paper metadata.
- `styles.css`: layout and responsive styles.
- `app.js`: image comparisons, animations, gallery and table interactions.
- `assets/`: local images, fonts, logo, paper figures and manuscript source.

GitHub links to this repository. The Paper button is marked **Coming soon** until a public paper URL or compiled PDF is available. Replace its disabled element in `index.html` with a link when the paper is released.

All example images come from the paper. Animations replay recorded results and do not run model inference. The three displayed reward questions are excerpts from the appendix.
