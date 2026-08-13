# Andiswa Cebekhulu — Portfolio

Personal portfolio for **Andiswa Cebekhulu** — Software Developer · ICT · Graphic Designer.

**Live site:** [https://drpaks100.github.io/Andiswa-Cebekhulu-s-Portifolio/](https://drpaks100.github.io/Andiswa-Cebekhulu-s-Portifolio/)

**Repository:** [DrPaks100/Andiswa-Cebekhulu-s-Portifolio](https://github.com/DrPaks100/Andiswa-Cebekhulu-s-Portifolio)

---

## What’s included

| Section | Path | Content |
| --- | --- | --- |
| Home | `/` | Hero slideshow, CV button, section cards |
| About | `/about` | Portrait + bio |
| Skills | `/skills` | Tech stack icons + soft skills |
| Journey | `/journey` | Education + internship |
| Projects | `/projects` | Selected work |
| Design | `/design` | Poster / logo gallery + lightbox |
| Contact | `/contact` | Phone, email, address |
| CV | modal / `/cv` | View & download PDF |

**Stack:** Vite, React, React Router, Framer Motion, react-icons  
**Theme:** navy / black / white with purple accents

---

## Run locally (Cursor)

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

Other commands:

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

---

## How updates go live

1. Edit the project in Cursor.
2. Commit and push to `main`:

```bash
git add -A
git commit -m "Describe your change"
git push origin main
```

3. GitHub Actions builds and deploys automatically (see **Actions** tab).
4. After a minute or two, refresh the live link above.

You can also run the workflow manually: **Actions → Deploy to GitHub Pages → Run workflow**.

---

## Project structure

```
src/
  pages/          Home, About, Skills, Journey, Projects, Design, Contact, CV
  components/     Navbar, Footer, TechIcon, CvModal, Lightbox, …
  assets/         Photos, design posters, tech logos
  data.js         Profile text, education, experience, tech stack
  designs.js      Design gallery entries
public/
  Andiswa-Cebekhulu-CV.pdf
```

Edit content mainly in `src/data.js` and `src/designs.js`.

---

## GitHub Pages setup (already configured in this repo)

- Vite `base` is `/Andiswa-Cebekhulu-s-Portifolio/` in production
- Routing uses `HashRouter` so deep links work on GitHub Pages
- Workflow: `.github/workflows/deploy.yml`

In the repo: **Settings → Pages → Source = GitHub Actions**.

---

## Contact (from the site)

- Phone: 071 555 5925  
- Email: andiswacebekhulu17@gmail.com  
- Location: 487 Madtom Street, Sky City, Johannesburg
