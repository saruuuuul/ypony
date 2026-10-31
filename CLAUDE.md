# YPO Kids Choir 2026 — project context

Owner: Saruul, YPO chapter Family Officer. He is learning to code: explain changes briefly so he can follow and edit himself.

## What this is
English pitch page for YPO members (`index.html`, served by GitHub Pages from `main`, root) plus an Apps Script that builds the Google Form for registration (`tools/create-registration-form.gs`).

## Facts (confirmed by Saruul)
- Members' children only, ages 5–13, about 20 kids. Prospects cannot join (membership takes ~2 weeks).
- Rehearsals: Sundays 8, 15, 22, 29 Nov at Edupark. 9:00–11:30 choir training, then lunch and fun activities at Edupark. End time not yet confirmed.
- Performance: Fri 4 Dec, Highland Park New Year party. 2–3 choir songs, solos, closing family song (kids start, parents join).
- Instructor: D. Altanzaya (Д.Алтанзаяа), founder/director of Muza Hall, piano and choir teacher, 15 years. Photo in `assets/`.
- Fee: 500,000₮ per child (300,000₮ training, 200,000₮ lunch/activities/materials/video journal).
- Registration closes Wed 4 Nov 23:59 (UTC+8); places confirmed 5 Nov.
- Registration is a Google Form built by the Apps Script. An on-page form with its own backend was tried and dropped on 31 Oct; don't propose it again unless asked.
- Parents do NOT join rehearsals. Two drivers provide transport.
- Pitch opening (spoken): "Raise your hand if you have a child 5–13… look around, that's our choir", plus a line welcoming prospects to the 2027 family programme. Never compare with past parties (it reads as criticism of the previous Family Officer).

## Language
- Members: English website.
- Instructor only: Mongolian PDF (kept outside this repo).

## Open items
- [ ] Enable GitHub Pages (Settings → Pages → main, root).
- [ ] Run the Apps Script, then set `FORM_URL` in the SETTINGS block of `index.html`.
- [ ] Confirm the Sunday end time and add it to the page.
- [ ] Confirm the instructor is fine with her photo on a public repo/site.
- [ ] Instructor's answers on songs, assistants, solo time, equipment → update the page.

## Rules
- Repo is public: never commit registration data or contact details.
- Keep the Gen AI and information-classification lines in the footer.
