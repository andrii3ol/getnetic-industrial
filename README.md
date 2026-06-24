# Getnetic — New Website

Industrial diagnostics, inspections, and field engineering support for critical environments and hard-to-access infrastructure.

## Project Structure

```
new.getnetic.com/
├── docs/                       Project documentation, content briefs, visual direction
├── assets-source/
│   └── source-material/        Raw client-supplied photos and video (not optimised)
├── site/                       Production-ready website — self-contained, upload-ready
│   ├── assets/
│   │   ├── css/                Bootstrap, animate, remixicon, custom styles
│   │   ├── fonts/              Remixicon and Flaticon web fonts
│   │   ├── images/             Optimised images used on the site
│   │   ├── js/                 jQuery, WOW.js, Bootstrap, form scripts
│   │   ├── php/                Server-side contact form handler
│   │   └── videos/             Hero video slot (reserved for future use)
│   ├── index.html              Main page (MVP)
│   └── privacy-policy.html     Privacy policy / terms stub
├── archive/
│   └── old-template/           Reference only — old Getnetic logistics template + assets
└── README.md
```

## Local Preview

Open `site/index.html` directly in a browser for a static preview.

For the contact form (`assets/php/form-process.php`) to work, run a local PHP server from the `site/` directory:

```bash
cd site
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

## Deployment

Upload the entire contents of `site/` to the web hosting root. The folder is self-contained — no build step required.

## Notes

- `assets-source/source-material/` contains raw client assets. Do not put these in `site/` — optimise and rename before adding to `site/assets/images/`.
- Stock images in the current MVP will be replaced with real GFE/Getnetic assets in a future pass.
- Hero video is optional; reserved slot at `site/assets/videos/`.
