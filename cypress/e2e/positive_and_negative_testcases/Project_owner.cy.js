import { TIMEOUT, getProjectName, setProjectName } from '../../Helper';
import {Authentication} from '../../pages/Authentication';
import {Base} from '../../pages/Base';
import {Project} from '../../pages/Project';
import mailSlurpCred from '../../mailSlurpCred.json';
import dayjs from 'dayjs';


const authenticationPage = new Authentication();
const basePage = new Base();
const projectPage = new Project();


  it("Add user with required field and Verify that the invitation email is sent", () => { 
    // login with one user 
    cy.fixture('loginCredential.json').then((user)=>{
        authenticationPage.login(user);
    })
    let project_Name = setProjectName();
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.clickOnNewProjectButton();
      cy.wait(TIMEOUT.shortTimeout);
      // fill project name 
      projectPage.fillProjectName(project_Name)
      // fill project owner 
      projectPage.selectOwnerNameFromDropdown(mailSlurpCred.cred.email);
      // fill dates 
      let startDate = dayjs().format("YYYY-MM-DD");
      let endDate = dayjs().add(1, 'day').format("YYYY-MM-DD");
      projectPage.fillDates(startDate, endDate)
      // verify create button is enabled 
      basePage.elementNotDisabled(cy.xpath(basePage.createButton));
      cy.clearInbox(mailSlurpCred.cred.inboxId).then(() => {
      basePage.clickOnElement(cy.xpath(basePage.createButton));
      basePage.elementExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
      // Logic to read invite from the email (using mailslurp service)
      // wait for new mail
      cy.waitForLatestEmail(mailSlurpCred.cred.inboxId, 15000, true).then((mail) => {
        cy.getEmailLink(mail.id).then((linkmail) => {
            // Get the email body
            let body = linkmail.body;
            // Get match strong tag that may contain project name
            let matchedElement = body.match(/(<strong>(.*)<\/strong>)/);
            // verify the project name 
            basePage.elementTextExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'), matchedElement[2])
            
        });
       })
      });
  });

  it("Verify that the already registered user gets notification when he is set as a Project Owner", () => {

    Cypress.session.clearAllSavedSessions();
    let project_Name = getProjectName();
  
    let user = {
      username: mailSlurpCred.cred.email,
      password: mailSlurpCred.cred.password
    }
    cy.wait(TIMEOUT.shortTimeout);
    // login with other user 
    authenticationPage.login(user);
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout)
    // check notification for invite project
    cy.get('div.ant-select-single.ant-select-show-arrow').next('svg').next('div').should('have.length.greaterThan', 0);
    // Click on notification and mark as read
    basePage.clickOnElement(cy.get('div.ant-select-single.ant-select-show-arrow > div'));
    basePage.elementExist(cy.get('div:contains("Notification")'));
    basePage.clickOnElement(cy.get('div:contains("Mark all as read")') , 0, {force:true });  
    cy.wait(TIMEOUT.shortTimeout);
    // check project exist
    basePage.elementExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
  
  })

  it("Verify that its possible to add a new user", () => {

    Cypress.session.clearAllSavedSessions();
    let project_Name = setProjectName();
    cy.wait(TIMEOUT.shortTimeout);
    // login 
    cy.fixture('loginCredential.json').then((user)=>{
        authenticationPage.login(user);
    })
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);
    // logic for creating new email on mailslurp
    cy.createInbox().then(inbox => {
      // verify a new inbox was created
      assert.isDefined(inbox)
      // save the inboxId for later checking the emails
      let  inboxId = inbox.id
      let emailAddress = inbox.emailAddress;
      console.log("emailAddress ==== >", emailAddress);
    
      projectPage.clickOnNewProjectButton();
      cy.wait(TIMEOUT.shortTimeout);
      // fill project name 
      projectPage.fillProjectName(project_Name)
      // fill project owner 
      projectPage.inviteNonRegisterUser(emailAddress);
      // fill project owner 
      projectPage.selectOwnerNameFromDropdown(emailAddress);
      // fill dates 
      let startDate = dayjs().format("YYYY-MM-DD");
      let endDate = dayjs().add(1, 'day').format("YYYY-MM-DD");
      projectPage.fillDates(startDate, endDate)
      // verify create button is enabled 
      basePage.elementNotDisabled(cy.xpath(basePage.createButton));
      // clear all the email before 
      cy.clearInbox(inboxId).then(() => {
        basePage.clickOnElement(cy.xpath(basePage.createButton));
        basePage.elementExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
        // wait for new mail
        cy.waitForLatestEmail(inboxId, 15000, true).then(email => {
          // verify we received an email
          assert.isDefined(email);

          cy.getEmailLink(email.id).then((linkmail) => {
            // Get the email link
            let link = linkmail.links[0]
            console.log(link);
          });
        });
      })
   })
  })

  it("Delete every plan", () => {
    Cypress.session.clearAllSavedSessions();
    let user = {
        username: mailSlurpCred.cred.email,
        password: mailSlurpCred.cred.password
      }
      // login with other user 
    authenticationPage.login(user);
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.shortTimeout);  
    projectPage.deleteAllCards();
  });