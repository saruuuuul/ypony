# YPO Kids Choir 2026 — project context

Owner: Saruul, YPO chapter Family Officer. He is learning to code: explain changes briefly so he can follow and edit himself.

## What this is
English pitch page for YPO members (`index.html`, served by GitHub Pages from `main`, root) with the registration form built into the page. Submissions go to an Apps Script web app (`tools/registration-backend.gs`) that writes them to a private Google Sheet.

## Facts (confirmed by Saruul)
- Members' children only, ages 5–13, about 20 kids. Prospects cannot join (membership takes ~2 weeks).
- Rehearsals: Sundays 8, 15, 22, 29 Nov at Edupark. 9:00–11:30 choir training, then lunch and fun activities at Edupark. End time not yet confirmed.
- Performance: Fri 4 Dec, Highland Park New Year party. 2 choir songs (confirmed 2 Nov; page says one Mongolian, one English), solos, closing family song (kids start, parents join).
- Solos get extra emphasis (Saruul, 2 Nov). Parents send a short video of each solo to the event champion so the programme can be planned. The champion's contact lives only in Script Properties (`CHAMPION`) and is shown to every family after registering.
- Instructor: D. Altanzaya (Д.Алтанзаяа), founder/director of Muza Hall, piano and choir teacher, 15 years. Photo in `assets/`.
- Fee: 500,000₮ per child (300,000₮ training, 200,000₮ lunch/activities/materials/video journal). It includes the child's place at the 4 Dec New Year party. Parents' party tickets are a separate fee (amount not on the site).
- Registration closes Thu 5 Nov 23:59 (UTC+8), extended by one day on 5 Nov (was 4 Nov); places confirmed Fri 6 Nov.
- Registration is the form on the website itself, sent to the Apps Script backend. A Google Form was used briefly (merged 31 Oct); Saruul switched back to the on-page form on 2 Nov.
- Parents do NOT join rehearsals. Two drivers provide transport; Saruul may add a third if demand is high (just edit `DRIVERS`, no code change). Their names and numbers live only in the backend's Script Properties (`DRIVERS`), never in this repo; families who ask for a ride see them after registering.
- Pitch opening (spoken): "Raise your hand if you have a child 5–13… look around, that's our choir", plus a line welcoming prospects to the 2027 family programme. Never compare with past parties (it reads as criticism of the previous Family Officer).

## Language
- Members: English website.
- Instructor only: Mongolian PDF (kept outside this repo).

## Open items
- [x] Enable GitHub Pages (Settings → Pages → main, root). Live since 2 Nov.
- [x] Deploy `tools/registration-backend.gs` as a web app, add the `DRIVERS` script property, set `SUBMIT_URL` in `index.html`. Saruul tested it end to end on 2 Nov: working.
- [ ] Add the `CHAMPION` script property, paste the updated backend code, and publish a new version (Deploy > Manage deployments > edit > New version).
- [ ] Confirm the solo video deadline (page says before 15 Nov, when solo pieces are chosen).
- [ ] Update the deadline in the live Apps Script to 5 Nov 23:59 and publish a new version (the repo copy is not what runs).
- [ ] Delete the test registration rows from the sheet before places are confirmed on 6 Nov.
- [ ] Confirm the Sunday end time and add it to the page.
- [ ] Confirm the instructor is fine with her photo on a public repo/site.
- [ ] Instructor's answers on assistants, solo time (page says 20–25 min in total), equipment → update the page.

## Rules
- Repo is public: never commit registration data or contact details.
- Keep the Gen AI and information-classification lines in the footer.
