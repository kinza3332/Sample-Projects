import { TIMEOUT } from "../Helper";
import { Base } from "./Base";
import { faker } from "@faker-js/faker";
import mailSlurpCred from '../mailSlurpCred.json';

const basePage = new Base();

export let auth_token_cookie_value = '';
export let email = '';
export let password = '';

export class Authentication {
 
emailField =  "//input[contains(@name, 'email')]";
passwordField = "//input[contains(@name, 'password')]";
loginButton = "//button[normalize-space()='Log In']";
disclaimerTag = "//a[normalize-space()='Disclaimer']";
agreeCheckbox = 'label.form-label';
continueButton = "//button[normalize-space()='Continue']";
signupEmailButton = "//button[normalize-space()='Sign Up With Email']";
signupFirstNameInput = '[name="first_name"]';
signupLastNameInput = '[name="last_name"]';
signupEmailInput = '[name="email"]';
signupPasswordInput = '[name="password"]';
signupConfirmPasswordInput = '[name="confirmPassword"]';
signupButton = "//button[normalize-space()='Sign Up']";
newPasswordInput = '[data-testid="password-input"]';
newPasswordConfirmInput = '[data-testid="password-confirm-input"]';
resetButton = "//button[normalize-space()='Reset']";
passwordChangedMessage = 'Password changed successfully';
navbarTitle = 'a[href="/project-planner"]';



 login(user){
        cy.session([user.username, user.password], () => {
                basePage.goToSigninPage();
                basePage.typeElementText(cy.xpath(this.emailField) , user.username);
                basePage.elementExist(cy.get('input[type="password"]'));
                basePage.typeElementText(cy.xpath(this.passwordField) , user.password);
                basePage.clickOnElement(cy.xpath(this.loginButton));
                cy.wait(TIMEOUT.shortTimeout);
                basePage.verifyUrl(basePage.dashboardUrl); 
                basePage.elementVisibility(cy.get(this.navbarTitle));
         }) 
  }

  Incorrectlogin(username , password){
          basePage.goToSigninPage();
          basePage.typeElementText(cy.xpath(this.emailField) , username);
          basePage.typeElementText(cy.xpath(this.passwordField) , password);
          basePage.clickOnElement(cy.xpath(this.loginButton));
          basePage.verifyToast('Invalid Credentials');
  }


  signup(){
    let first_name = faker.person.firstName().replace("'", "");
    let last_name = faker.person.lastName().replace("'", "");
    
     email  = faker.internet.exampleEmail({first_name ,last_name}).toLowerCase();
     password = first_name+last_name+"@"+ Number(faker.string.numeric(5));

      basePage.goToSignupPage();
      basePage.elementVisibility(cy.xpath(this.disclaimerTag, {timeout: TIMEOUT.longTimeout}) );
      cy.wait(TIMEOUT.shortTimeout);
      basePage.clickOnElement(cy.xpath(this.disclaimerTag));
      cy.wait(TIMEOUT.shortTimeout);
      basePage.clickOnElement(cy.get(this.agreeCheckbox));
      basePage.clickOnElement(cy.xpath(this.continueButton));
      basePage.clickOnElement(cy.xpath(this.signupEmailButton));
      basePage.elementVisibility(cy.get(this.signupFirstNameInput, {timeout: TIMEOUT.longTimeout}) );
      basePage.typeElementText(cy.get(this.signupFirstNameInput), first_name);
      basePage.typeElementText(cy.get(this.signupLastNameInput), last_name);
      basePage.typeElementText(cy.get(this.signupEmailInput), email);
      basePage.typeElementText(cy.get(this.signupPasswordInput), password);
      basePage.typeElementText(cy.get(this.signupConfirmPasswordInput),password);
      basePage.clickOnElement(cy.xpath(this.signupButton));
      cy.wait(TIMEOUT.shortTimeout);
      basePage.verifyUrl(basePage.dashboardUrl); 
  }

  singupWithInvalidAttribute(){
    let first_name = faker.person.firstName().replace("'", "");
    let last_name = faker.person.lastName().replace("'", "");
    
     email  = (first_name + last_name).toLowerCase();
     password = first_name;

      basePage.goToSignupPage();
      basePage.elementVisibility(cy.xpath(this.disclaimerTag, {timeout: TIMEOUT.longTimeout}) );
      cy.wait(TIMEOUT.shortTimeout);
      basePage.clickOnElement(cy.xpath(this.disclaimerTag));
      cy.wait(TIMEOUT.shortTimeout);
      basePage.clickOnElement(cy.get(this.agreeCheckbox));
      basePage.clickOnElement(cy.xpath(this.continueButton));
      basePage.clickOnElement(cy.xpath(this.signupEmailButton));
      basePage.elementVisibility(cy.get(this.signupFirstNameInput, {timeout: TIMEOUT.longTimeout}) );
      // click on signup button 
      basePage.clickOnElement(cy.xpath(this.signupButton));
      basePage.elementExist(cy.xpath('//div[normalize-space()="First name is required"]'));
      basePage.elementExist(cy.xpath('//div[normalize-space()="Email is required"]'));
      basePage.elementExist(cy.xpath('//div[normalize-space()="This field is required."]'));

      basePage.typeElementText(cy.get(this.signupFirstNameInput), first_name);
      basePage.typeElementText(cy.get(this.signupLastNameInput), last_name);
      basePage.typeElementText(cy.get(this.signupEmailInput), email);
      basePage.typeElementText(cy.get(this.signupPasswordInput), password);
      basePage.typeElementText(cy.get(this.signupConfirmPasswordInput),password+"234");
      basePage.clickOnElement(cy.xpath(this.signupButton));
      cy.wait(TIMEOUT.shortTimeout);
      basePage.elementExist(cy.xpath('//div[normalize-space()="Email must be valid"]'));
      basePage.elementExist(cy.xpath('//div[normalize-space()="Password must have a minimum of 8 characters and at least one of each: uppercase, special character, and number."]'));
      basePage.elementExist(cy.xpath('//div[normalize-space()="Password entries do not match."]'))
    }

  resetPassword(){
      basePage.goToForgetPasswordPage();
      basePage.elementVisibility(cy.xpath(this.emailField));
      basePage.typeElementText(cy.xpath(this.emailField) , mailSlurpCred.cred.email);
      basePage.clickOnElement(cy.xpath(this.continueButton));
      // clear all mails before
      cy.clearInbox( mailSlurpCred.cred.inboxId).then(() => {
        // wait for  mail
        cy.waitForLatestEmail(mailSlurpCred.cred.inboxId, 30000, true).then((mail) => {
          cy.getEmailLink(mail.id).then((linkmail) => {
            // get invite link
            let link = linkmail.links[0];
              cy.visit(link);
              basePage.elementVisibility(cy.xpath(this.resetButton));
              basePage.typeElementText(cy.get(this.newPasswordInput) , mailSlurpCred.cred.password );
              basePage.typeElementText(cy.get(this.newPasswordConfirmInput) , mailSlurpCred.cred.password );
              basePage.clickOnElement(cy.xpath(this.resetButton));
              // verify if password changed 
              basePage.verifyToast(this.passwordChangedMessage);
          });
        });
      });
  }
  
 
}