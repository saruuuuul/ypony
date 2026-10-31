# YPO Kids Choir 2026

Pitch page for the YPO Family New Year 2026 kids choir: four Sundays at Edupark in November (9:00–11:30 choir training with D. Altanzaya, then lunch and activities) and a performance at Highland Park on Friday, 4 December. Registration is a Google Form and closes on 4 November at 23:59 (Ulaanbaatar time).

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole page: content (HTML), design (CSS in `<style>`) and a small script (`<script>`) |
| `assets/altanzaya.jpg` | The instructor's photo |
| `tools/create-registration-form.gs` | Google Apps Script that builds the registration form and its response sheet |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## How the page is built

`index.html` has three parts:

1. **`<style>`**: the design. The `:root` block at the top holds colours and fonts as named tokens (`--gold`, `--night` and so on). Change one there and it changes everywhere. Type is set large so the page reads on a small display.
2. **`<body>`**: the content, one `<section>` per topic (Why, Programme, Instructor, Concert, Logistics, Cost, Registration). Edit the text between the tags.
3. **`<script>`**: draws the music staff in the header, shows the countdown, and turns the registration button and QR code on once `FORM_URL` is set.

## Common edits

All the settings are in the `SETTINGS` block at the top of the `<script>`:

- **`FORM_URL`**: paste the Google Form link between the quotes. The button and QR code update automatically.
- **`DEADLINE`**: the moment registration closes. After it, the button is replaced by a "closed" message.

Other edits: rehearsal dates are in `<ol class="timeline">`, the Sunday times in `<div class="day">`, and the fee in the Cost section.

After an edit, commit and push to `main`. GitHub Pages republishes in about a minute.

## Registration form

Run `tools/create-registration-form.gs` once (instructions at the top of the file). It creates the form, a Google Sheet for the answers, and a timer that closes the form at the deadline. To get an email for each new registration, turn on notifications in the form's **Responses** tab.

The repo is public. Registrations stay in Google, so never commit them or any contact list here.

---

Information classification: Internal. For YPO chapter members and their families. Drafted with the help of generative AI and reviewed by the organiser.
