# How to Run the Lumifin Website on Your Computer

This is a step-by-step guide for running the website on your own machine, even if you have never touched code before. You'll be able to open `lumifin.io` on your laptop, click around, and see your changes live.

---

## 1. What you need first (one-time setup)

You need three free things installed on your computer:

### a) Node.js
This is the program that runs the website.

- Go to **https://nodejs.org**
- Download the **LTS** version (the green button that says "Recommended For Most Users")
- Run the installer, click Next on everything

To check it worked: open a terminal (on Windows: press `Win + R`, type `cmd`, press Enter) and type:
```
node --version
```
If you see something like `v22.21.1`, you're good.

### b) Git
This is the program that downloads the code from GitLab/GitHub.

- Go to **https://git-scm.com/downloads**
- Download for your OS, run the installer, click Next on everything

To check: in the terminal, type `git --version` — you should see a version number.

### c) A code editor (recommended: VS Code)
You don't strictly need this just to run the site, but you'll want it to view or change the code.

- Go to **https://code.visualstudio.com**
- Download, install.

---

## 2. Get the code onto your computer (one-time)

If you don't already have the project folder:

1. Open a terminal
2. Navigate to wherever you want to store the project. For example:
   ```
   cd C:\
   ```
3. Download the project:
   ```
   git clone https://gitlab.com/tannamesss-group/tannamesss-project.git "Lumi Website"
   ```
4. Go into the folder:
   ```
   cd "Lumi Website\lumi-website"
   ```

If you already have the project (you should — you're reading this file from inside it), skip this step.

---

## 3. Install the website's pieces (one-time)

The website is built from many small open-source pieces (called "packages") that need to be downloaded the first time.

In the terminal, while inside the `lumi-website` folder, type:

```
npm install
```

This will take **2–5 minutes**. You'll see lots of text scroll by — that's normal. When you see your prompt come back (`>` or `$`), it's done.

You only need to do this once, or whenever someone else on the team adds new packages.

---

## 4. Start the website (every time you want to work on it)

In the terminal, inside the `lumi-website` folder, type:

```
npm run dev
```

After 1–2 seconds, you'll see something like:

```
  VITE v6.4.1  ready in 1884 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.44:3000/
```

That `http://localhost:3000/` (or sometimes `5173`) is your local copy of the website.

**Open it in your browser** — copy-paste the URL or Ctrl+click it in the terminal.

You should see the Lumifin homepage. Congrats, you're running the site locally.

---

## 5. Test the site

Click around to make sure everything works. The main pages to check:

| What to test | URL |
|---|---|
| Homepage | http://localhost:3000/ |
| Blog list | http://localhost:3000/blog |
| A blog article | http://localhost:3000/blog/cash-is-king |
| FAQ | http://localhost:3000/faq |
| About / Team | http://localhost:3000/team |
| Careers | http://localhost:3000/careers |
| Security | http://localhost:3000/security |
| Travel money hub | http://localhost:3000/travel-money |
| Thailand corridor page | http://localhost:3000/travel-money/thailand |
| Compare Lumifin vs others | http://localhost:3000/compare |
| Privacy policy | http://localhost:3000/privacy |
| Custom 404 page | http://localhost:3000/this-page-does-not-exist |

Things to also check:
- The **language toggle** in the top-right of the header — switch between English and Français
- The **hamburger menu (···)** on desktop — should open FAQ, Blog, Work With Us
- The **mobile menu** — resize your browser to phone-width and try the hamburger
- The **waitlist form** at the bottom of the homepage — type a fake email like `test@test.com` and submit. (Locally, this won't actually save anything — Netlify only captures form submissions on the deployed site.)

---

## 6. While you're working

The dev server has a magic feature called **hot reload**. While `npm run dev` is running:

- Edit any file in `src/` and save it
- Look at your browser — it'll update instantly, no refresh needed

This makes editing the site really fast.

---

## 7. Stop the website

When you're done, go back to the terminal and press `Ctrl + C` (on both Windows and Mac).
You'll be returned to your normal prompt. The site is no longer running locally.

---

## 8. Common problems

**"npm is not recognized"** — Node.js isn't installed, or you need to close and reopen the terminal after installing it.

**"Port 3000 is already in use"** — Another program is using that port. Either close it, or Vite will auto-pick another port (like 3001 or 5173) — just check the terminal output for the actual URL.

**"Module not found" errors** — You probably skipped step 3. Run `npm install` and try again.

**The page looks broken / unstyled** — Hard refresh your browser with `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac).

**Changes aren't showing up** — Make sure you saved the file. If still nothing, stop the server with `Ctrl + C` and restart with `npm run dev`.

---

## 9. Where things are (quick map)

For when you want to find or change something:

```
lumi-website/
├── public/                      ← images, favicon, robots.txt, sitemap.xml
│   └── assets/
│       ├── blog/                ← blog cover images
│       └── team/                ← team member photos
├── src/
│   ├── pages/                   ← every page on the site (one file = one page)
│   ├── components/              ← reusable UI pieces (Header, Footer, etc.)
│   └── i18n/locales/
│       ├── en.json              ← English text on every page
│       └── fr.json              ← French translations
└── index.html                   ← page that loads first; meta tags + favicon
```

If you want to change the words on a page, you usually edit the `en.json` and `fr.json` files, not the page files themselves.

---

## 10. When you're ready to publish your changes

This is for someone with git knowledge. Don't do this casually — it goes live on lumifin.io.

1. Commit your changes to git
2. Push to the remote (GitLab `origin main` and/or GitHub `anshuman/tanvi`)
3. Netlify auto-deploys from the GitLab `main` branch; the live site updates within ~1 minute

If you're not sure, ask someone on the team to push for you.

---

That's it. Have fun.
