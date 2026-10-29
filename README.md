# YPO Kids Choir 2026

Pitch and registration page for the YPO Family New Year 2026 kids choir: four Sunday rehearsals at Edupark in November and a performance at Highland Park on Friday, 4 December. Registration closes on 4 November at 23:59 (Ulaanbaatar time).

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole site: content (HTML), design (CSS in `<style>`) and form logic (JavaScript in `<script>`) |
| `netlify.toml` | Tells Netlify there is no build step and keeps the page out of search engines |

## How the page is built

`index.html` has three parts, top to bottom:

1. **`<style>`**: the design. The `:root` block at the top holds the colours and fonts as named tokens (`--gold`, `--night` and so on). Change a token there and it changes everywhere. The dark-mode colours sit in the two blocks right after it.
2. **`<body>`**: the content, one `<section>` per part of the pitch (Why, Programme, Logistics, Cost, Ask, Registration). To change wording, edit the text between the tags.
3. **`<script>`**: the form logic. It adds and removes child rows, checks the form, builds a summary, and sends the registration to Netlify.

## Common edits

- **Deadline or fee:** change `DEADLINE` and `FEE` in the `SETTINGS` block at the top of the `<script>`. If you change the fee, also update the amounts in the Cost section and the consent line, which are plain text.
- **Rehearsal dates:** edit the `<ol class="timeline">` list and the `Host a Sunday` dropdown (`<select id="host">`).
- **Sunday schedule:** edit the table under "A typical Sunday".

After an edit, commit and push to `main`. Netlify redeploys automatically in about a minute.

## How registrations work

The form uses [Netlify Forms](https://docs.netlify.com/manage/forms/setup). Netlify reads the `<form name="choir-registration" data-netlify="true">` tag when it deploys, then stores every submission. Children are added on the page by JavaScript, so their details go into hidden fields (`children`, `child_count`, `total_fee`, `summary`) just before the form is sent.

Registrations live in the Netlify dashboard under **Forms**, not in this repo. The repo is public, so never commit registration data or contact lists here.

## One-time Netlify setup

1. On netlify.com: **Add new site → Import an existing project → GitHub → `saruuuuul/ypony`**. Leave the build settings empty, since `netlify.toml` covers them.
2. **Forms → Enable form detection**, then **Deploys → Trigger deploy** once. Detection only applies from the next deploy.
3. **Forms → Submission notifications → Add notification → Email** to receive each registration by email.
4. Submit one test registration, check that it appears under Forms, then delete it.

---

Information classification: Internal. For YPO chapter members and their families. Drafted with the help of generative AI and reviewed by the organiser.
