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

GitHub links to this repository. Both the hero Paper button and the Paper PDF link open `assets/papers/VibeEdit.pdf`, an identical copy of `asserts/VibeEdit.pdf` on `main`. Keeping the PDF with the site makes it accessible directly through GitHub Pages. When updating the manuscript, replace both copies.

All example images come from the paper. Animations replay recorded results and do not run model inference. The three displayed reward questions are excerpts from the appendix.

The citation section is omitted until the arXiv release. The page uses responsive typography, complete uncropped example images, and a 12-second looping interface demonstration. Animation pauses off-screen and respects reduced-motion preferences.
