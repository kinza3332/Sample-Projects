import mailSlurpCred from '../mailSlurpCred.json';
const { default: MailSlurp } = require('mailslurp-client');


require('@4tw/cypress-drag-drop');


const apiKey = mailSlurpCred.API_KEY;
  
const mailslurp = new MailSlurp({ apiKey });


Cypress.Commands.add("clearInbox", (inboxId) => {
  return mailslurp.emptyInbox(inboxId);
});

Cypress.Commands.add("createInbox", () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add(
  "waitForLatestEmail",
  (inboxId, timeout = 30_000, unread = true) => {
    return mailslurp.waitForLatestEmail(inboxId, timeout, unread);
  }
);

Cypress.Commands.add("getEmailLink", (emailId) => {
  return mailslurp.emailController.getEmailLinks({
    emailId: emailId,
  });
});



Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, callback = () => {}) => {
  // For more info on targeting inside iframes refer to this GitHub issue:
  // https://github.com/cypress-io/cypress/issues/136
 
  return cy
    .wrap($iframe,{timeout:50000}).first()
    .should(iframe => expect(iframe.contents().find('body')).to.exist)
    .then(iframe => cy.wrap(iframe.contents().find('body')))
    .within({}, callback)
})


