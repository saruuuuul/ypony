/**
 * YPO Kids Choir 2026: builds the registration Google Form.
 *
 * How to run it (once):
 *   1. Go to script.google.com and click "New project".
 *   2. Replace the code there with everything in this file.
 *   3. Pick "createRegistrationForm" in the function menu at the top and click Run.
 *   4. Google asks for permission: choose your account and click Allow.
 *   5. The "Execution log" at the bottom shows the form link.
 *      Paste that link into FORM_URL in index.html (SETTINGS block in the <script>).
 *
 * What it does:
 *   - Creates the form with all questions.
 *   - Collects answers in a new Google Sheet.
 *   - Closes the form automatically at 23:59 on 4 November 2026 (Ulaanbaatar time).
 */

const DEADLINE = new Date('2026-11-04T23:59:59+08:00');

function createRegistrationForm() {
  const form = FormApp.create('YPO Kids Choir 2026 — Registration');
  form.setDescription(
    'Choir programme for YPO members\' children aged 5–13.\n' +
    'Rehearsals: Sundays 8, 15, 22 and 29 November at Edupark.\n' +
    '9:00–11:30 choir training with D. Altanzaya, then lunch and activities.\n' +
    'Performance: Friday 4 December, Highland Park.\n' +
    'Fee: 500,000₮ per child.\n' +
    'Registration closes on 4 November at 23:59. One form per family.'
  );
  form.setConfirmationMessage(
    'Thank you! We have your registration. On 5 November we will confirm your place, ' +
    'send payment details and add you to the parents\' group chat.'
  );
  form.setProgressBar(true);

  // --- Parent ---
  form.addSectionHeaderItem().setTitle('Parent');
  form.addTextItem().setTitle('Your name').setRequired(true);
  form.addTextItem().setTitle('Phone number').setRequired(true);

  // --- Children (up to 3; only the first is required) ---
  const ages = ['5', '6', '7', '8', '9', '10', '11', '12', '13'];
  for (let i = 1; i <= 3; i++) {
    const required = i === 1;
    form.addSectionHeaderItem().setTitle('Child ' + i + (required ? '' : ' (if any)'));
    form.addTextItem().setTitle('Child ' + i + ': name').setRequired(required);
    form.addListItem().setTitle('Child ' + i + ': age').setChoiceValues(ages).setRequired(required);
    form.addTextItem()
      .setTitle('Child ' + i + ': allergies or dietary needs')
      .setHelpText('Leave blank if none.');
    form.addTextItem()
      .setTitle('Child ' + i + ': solo performance?')
      .setHelpText('For example a piano piece or a song. Leave blank if not.');
  }

  // --- Transport ---
  form.addSectionHeaderItem().setTitle('Transport');
  form.addMultipleChoiceItem()
    .setTitle('Do you need a ride to and from Edupark?')
    .setChoiceValues(['Yes, please', 'No, we will drive', 'We can carpool other children'])
    .setRequired(true);
  form.addTextItem()
    .setTitle('Pick-up address, if you need a ride')
    .setHelpText('District and building');

  // --- Host a Sunday ---
  form.addListItem()
    .setTitle('Which Sunday could your family co-host?')
    .setHelpText('Two or three families help with lunch and activities each Sunday.')
    .setChoiceValues(['8 Nov', '15 Nov', '22 Nov', '29 Nov', 'Any Sunday', 'We can\'t host this time'])
    .setRequired(true);

  // --- Consent ---
  form.addSectionHeaderItem().setTitle('Consent');
  form.addCheckboxItem().setTitle('Fee')
    .setChoiceValues(['I agree to the fee of 500,000₮ per child']).setRequired(true);
  form.addCheckboxItem().setTitle('Participation')
    .setChoiceValues(['My children may take part in the Sunday programme under the organisers\' supervision']).setRequired(true);
  form.addCheckboxItem().setTitle('Transport consent (if you need a ride)')
    .setChoiceValues(['My children may ride with the programme\'s drivers']);
  form.addCheckboxItem().setTitle('Video journal (optional)')
    .setChoiceValues(['My children may appear in the video journal shared only with participating families']);

  // --- Collect answers in a Google Sheet ---
  const sheet = SpreadsheetApp.create('YPO Kids Choir 2026 — Registrations');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // --- Close the form automatically at the deadline ---
  PropertiesService.getScriptProperties().setProperty('FORM_ID', form.getId());
  ScriptApp.newTrigger('closeRegistration').timeBased().at(DEADLINE).create();

  Logger.log('Form link for members (paste into FORM_URL): ' + form.getPublishedUrl());
  Logger.log('Edit the form: ' + form.getEditUrl());
  Logger.log('Registrations sheet: ' + sheet.getUrl());
}

function closeRegistration() {
  const id = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (!id) return;
  const form = FormApp.openById(id);
  form.setAcceptingResponses(false);
  form.setCustomClosedFormMessage('Registration closed on 4 November. Please message Saruul directly.');
}
