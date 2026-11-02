/**
 * YPO Kids Choir 2026: receives registrations from the website and saves them in a private Google Sheet.
 *
 * The form lives on the website. When a parent presses "Send registration", the page sends the
 * answers here. This script checks them and adds one row per child to the sheet.
 * Nothing is stored on the website or in GitHub.
 *
 * Set it up once (about 5 minutes):
 *   1. Go to script.google.com, click "New project" and name it "YPO Kids Choir backend".
 *   2. Replace the code there with everything in this file, then click Save.
 *   3. Pick "setup" in the function menu at the top and click Run.
 *      Google asks for permission: choose your account and click Allow.
 *      (If you see "Google hasn't verified this app": Advanced, then "Go to ...". It is your own script.)
 *      The Execution log at the bottom shows the link to the new Registrations sheet.
 *   4. Add the drivers' names and numbers. They are kept out of this file on purpose, because the repo is public.
 *      Project Settings (gear icon on the left) > Script Properties > Add script property:
 *        Property:  DRIVERS
 *        Value:     names and phone numbers, as parents should see them
 *      Click "Save script properties". Families who ask for a ride see this on their thank-you screen.
 *   5. Click Deploy > New deployment. Click the gear next to "Select type" and choose "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone   (so members can register without a Google login)
 *      Click Deploy and copy the "Web app" URL (it ends in /exec).
 *   6. Paste that URL into SUBMIT_URL in index.html (SETTINGS block in the <script>).
 *   7. Check it: open the /exec URL in a browser. You should see {"ok":true,"open":true}.
 *      Then send a test registration from the website, look at the sheet, and delete the test rows.
 *
 * Changed this code later? Saving is not enough. Go to Deploy > Manage deployments > pencil icon >
 * Version: "New version" > Deploy. The URL stays the same.
 */

const DEADLINE = new Date('2026-11-04T23:59:59+08:00'); // 23:59 on 4 November, Ulaanbaatar time
const NOTIFY_ME = true;   // true = email me a short summary of each new registration
const MAX_CHILDREN = 4;

// The fixed answers the website offers. Anything else is rejected.
const RIDE_CHOICES = ['Yes, please', 'No, we will drive', 'We can carpool other children'];
const COHOST_CHOICES = ['8 Nov', '15 Nov', '22 Nov', '29 Nov', 'Any Sunday', 'We can\'t host this time'];

const HEADERS = [
  'Submitted', 'Family ref', 'Parent', 'Phone', 'Child', 'Age', 'Age group',
  'Allergies / diet', 'Solo', 'Ride', 'Pick-up address', 'Others who may collect',
  'Co-host Sunday', 'Fee agreed', 'Participation', 'Transport consent', 'Video consent'
];

/** Run once by hand: creates the Registrations sheet and remembers its ID. */
function setup() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('SHEET_ID');
  if (existingId) {
    try {
      Logger.log('The sheet already exists, so nothing new was created: ' + SpreadsheetApp.openById(existingId).getUrl());
      return;
    } catch (e) {
      // The old sheet was deleted, so carry on and make a fresh one.
    }
  }
  const ss = SpreadsheetApp.create('YPO Kids Choir 2026 — Registrations');
  const sheet = ss.getSheets()[0];
  sheet.setName('Registrations');
  sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  props.setProperty('SHEET_ID', ss.getId());
  Logger.log('Registrations sheet: ' + ss.getUrl());
}

/** Opening the web app URL in a browser shows whether it is working and still open. */
function doGet() {
  return reply({ ok: true, open: new Date() <= DEADLINE });
}

/** Google calls this each time the website sends a registration. */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Spam trap: the website has a hidden "website" box that people never see.
    // Bots fill in every box, so if it has text we quietly ignore the message.
    if (data.website) return reply({ ok: true });

    if (new Date() > DEADLINE) return reply({ ok: false, error: 'Registration closed on 4 November.' });

    const problem = findProblem(data);
    if (problem) return reply({ ok: false, error: problem });

    const ref = save(data);
    if (NOTIFY_ME) notify(data, ref);

    // Only families who asked for a ride get the drivers' contacts (set in Script Properties, step 4).
    const drivers = data.ride === 'Yes, please'
      ? (PropertiesService.getScriptProperties().getProperty('DRIVERS') || '')
      : '';
    return reply({ ok: true, ref: ref, drivers: drivers });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: 'Something went wrong on our side.' });
  }
}

/** Returns a message for the parent if something is missing, or '' if all is well. */
function findProblem(d) {
  const consent = d.consent || {};
  if (!d.parent || !filled(d.parent.name) || !filled(d.parent.phone)) {
    return 'Please give your name and phone number.';
  }
  if (!Array.isArray(d.children) || d.children.length < 1 || d.children.length > MAX_CHILDREN) {
    return 'Please add between 1 and ' + MAX_CHILDREN + ' children.';
  }
  for (const child of d.children) {
    const age = Number(child.age);
    if (!filled(child.name) || !Number.isInteger(age) || age < 5 || age > 13) {
      return 'Each child needs a name and an age from 5 to 13.';
    }
  }
  if (RIDE_CHOICES.indexOf(d.ride) === -1) return 'Please answer the transport question.';
  if (d.ride === 'Yes, please' && (!filled(d.address) || !consent.transport)) {
    return 'For a ride, please give the pick-up address and tick the transport consent.';
  }
  if (COHOST_CHOICES.indexOf(d.cohost) === -1) return 'Please choose a Sunday to co-host.';
  if (!consent.fee || !consent.participation) return 'Please tick the fee and participation boxes.';
  return '';
}

/** Adds one row per child and returns a short family reference such as F3A9C1. */
function save(d) {
  // The lock makes two registrations arriving at the same moment wait in line,
  // so their rows never land on top of each other.
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    const sheet = SpreadsheetApp.openById(id).getSheets()[0];
    const ref = 'F' + Utilities.getUuid().slice(0, 6).toUpperCase();
    const now = new Date();
    const consent = d.consent || {};
    const rows = d.children.map(function (child) {
      const age = Number(child.age);
      return [
        now, ref, clean(d.parent.name), clean(d.parent.phone),
        clean(child.name), age, ageGroup(age), clean(child.allergies), clean(child.solo),
        d.ride, clean(d.address), clean(d.collectors), d.cohost,
        yesNo(consent.fee), yesNo(consent.participation), yesNo(consent.transport), yesNo(consent.video)
      ];
    });
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length).setValues(rows);
    return ref;
  } finally {
    lock.releaseLock();
  }
}

/** Emails the script owner (you) a two-line summary. A failed email never loses a registration. */
function notify(d, ref) {
  try {
    const kids = d.children.map(function (c) { return clean(c.name) + ' (' + Number(c.age) + ')'; }).join(', ');
    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      'Kids Choir registration: ' + clean(d.parent.name),
      'Ref ' + ref + '\n' +
      'Parent: ' + clean(d.parent.name) + ', ' + clean(d.parent.phone) + '\n' +
      'Children: ' + kids + '\n' +
      'Ride: ' + d.ride + '\n' +
      'Co-host: ' + d.cohost
    );
  } catch (err) {
    console.error('Email failed', err);
  }
}

// ---------- small helpers ----------

function filled(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Trims text and caps it at 500 characters. Google Sheets treats text that starts with
 * = + - or @ as a formula, so such text gets a leading apostrophe: the sheet then shows
 * it as plain text (a phone number like +976 9911 2233 stays readable).
 */
function clean(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 500);
  return /^[=+\-@]/.test(text) ? '\'' + text : text;
}

function ageGroup(age) {
  if (age <= 7) return '5–7';
  if (age <= 10) return '8–10';
  return '11–13';
}

function yesNo(value) {
  return value ? 'Yes' : 'No';
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
