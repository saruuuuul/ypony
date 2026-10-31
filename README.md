# YPO Kids Choir 2026

Pitch page for the YPO Family New Year 2026 kids choir: four Sundays at Edupark in November (9:00–11:30 choir training with D. Altanzaya, then lunch and activities) and a performance at Highland Park on Friday, 4 December. Registration is a form on the page itself and closes on 4 November at 23:59 (Ulaanbaatar time).

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole page: content (HTML), design (CSS in `<style>`) and a small script (`<script>`) |
| `assets/altanzaya.jpg` | The instructor's photo |
| `tools/registration-backend.gs` | Google Apps Script that receives each registration from the page and saves it in a private Google Sheet |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## How the page is built

`index.html` has three parts:

1. **`<style>`**: the design. The `:root` block at the top holds colours and fonts as named tokens (`--gold`, `--night` and so on). Change one there and it changes everywhere. Type is set large so the page reads on a small display.
2. **`<body>`**: the content, one `<section>` per topic (Why, Programme, Instructor, Concert, Logistics, Cost, Registration). Edit the text between the tags.
3. **`<script>`**: draws the music staff in the header, shows the countdown, draws the QR code, and runs the registration form (adding children, checking answers, sending them to `SUBMIT_URL`).

## Common edits

All the settings are in the `SETTINGS` block at the top of the `<script>`:

- **`SUBMIT_URL`**: the backend's web app link (ends in `/exec`). Until it is set, the form explains that registration isn't switched on yet.
- **`PAGE_URL`**: this page's public address. The QR code points here.
- **`DEADLINE`**: the moment registration closes. After it, the form is replaced by a "closed" message.
- **`FEE`** and **`MAX_CHILDREN`**: used for the running total and the "Add another child" button.

Other edits: rehearsal dates are in `<ol class="timeline">`, the Sunday times in `<div class="day">`, and the fee in the Cost section.

After an edit, commit and push to `main`. GitHub Pages republishes in about a minute.

## Registration

The form is part of `index.html`, but a website on GitHub Pages cannot store anything. So when a parent presses **Send registration**, the page sends the answers to a small Google Apps Script (`tools/registration-backend.gs`). It checks them again, refuses anything after the deadline, adds one row per child to a private Google Sheet, and emails you a short summary.

```
parent's phone ──► index.html form ──► Apps Script web app ──► private Google Sheet
                   (GitHub Pages)       (your Google account)   (+ email to you)
```

Set-up steps are at the top of `tools/registration-backend.gs` (about 5 minutes). Then paste the `/exec` link into `SUBMIT_URL`.

**Changing a question** means changing both files: the HTML field and `collect()` in `index.html`, and `findProblem()`, `save()` and `HEADERS` in the backend. After changing the backend, publish a new version (Deploy > Manage deployments > edit > New version), or the live web app keeps running the old code.

The repo is public. Registrations stay in your Google Sheet, so never commit them or any contact list here.

---

Information classification: Internal. For YPO chapter members and their families. Drafted with the help of generative AI and reviewed by the organiser.
