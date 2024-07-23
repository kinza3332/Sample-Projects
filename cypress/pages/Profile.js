
import {  faker } from "@faker-js/faker";
import { TIMEOUT } from "../Helper";
import { Base } from "./Base";


const basePage = new Base();



export class ProfileClass {

    profileLink = 'a[href="/profile"]';
    viewProfileText = 'View user profile';
    phoneInput = '//div[normalize-space()="Phone"]/following-sibling::input';
    emailInput = 'input[name="email"]';
    oldPasswordInput = 'input[name="oldPassword"]';
    newPasswordInput = 'input[name="newPassword"]';
    confirmPasswordInput = 'input[name="confirmPassword"]';
    passwordErrorDiv = 'div[type="invalid"]';
    passwordErrorMsg1 = 'New password cannot be the same as your old password.';
    passwordErrorMsg2 = 'Password must have a minimum of 8 characters and at least one of each: uppercase, special character, and number.';
    firstNameInput =  'input[name="first_name"]';
    lastNameInput =  'input[name="last_name"]';
    imgProfile = 'img[alt="profile"]';
    logoutButton = '//button[normalize-space()="Logout"]';
    changeProfileInput = 'input[name="avatar[image]"]';
    profileImage = '//div[contains(@title, "Change profile picture")]/preceding-sibling::img';
    avaterImg = 'img.ant-dropdown-trigger';

    verifyProfilePhoneNumber(){
      let phone = '+1 '+'(213) ' + faker.string.numeric(3) + '-' + faker.string.numeric(4);
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.get(this.avaterImg));
      basePage.selectElementFromAnotherDropdown(this.viewProfileText);
      cy.wait(TIMEOUT.shortTimeout);
      basePage.typeElementText(cy.xpath(this.phoneInput) , phone);
      basePage.clickOnElement(cy.xpath(basePage.saveChangesButton));
      basePage.verifyToast('Saved successfully');
      cy.reload();
      cy.wait(TIMEOUT.shortTimeout);
      cy.xpath(this.phoneInput).eq(0).should('have.value' , phone);
    }

    errorMsgForInvalidPassword(){
      cy.fixture('loginCredential.json').then((user)=>{   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.get(this.avaterImg));
        basePage.selectElementFromAnotherDropdown(this.viewProfileText);
        cy.wait(TIMEOUT.shortTimeout);
        basePage.typeElementText(cy.get(this.oldPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.newPasswordInput),'KINZA$$$$');
        basePage.typeElementText(cy.get(this.confirmPasswordInput),'KINZA$$$$');
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.elementVisibility(cy.get(this.passwordErrorDiv).contains(this.passwordErrorMsg2));

      })  
    }

    errorMsgForInvalidEmail(){
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.get(this.avaterImg));
      basePage.selectElementFromAnotherDropdown(this.viewProfileText);
      cy.wait(TIMEOUT.shortTimeout);
      basePage.typeElementText(cy.get(this.emailInput),'randomEmail@');
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.clickOnElement(cy.xpath(basePage.saveChangesButton));
      cy.contains('Email must be a valid email').should('exist');
    }

    errorMsgForSamePassword(){
      cy.fixture('loginCredential.json').then((user)=>{   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.get(this.avaterImg));
        basePage.selectElementFromAnotherDropdown(this.viewProfileText);
        cy.wait(TIMEOUT.shortTimeout);
        basePage.typeElementText(cy.get(this.oldPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.newPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.confirmPasswordInput),user.password);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.elementVisibility(cy.get(this.passwordErrorDiv).contains(this.passwordErrorMsg1));
      })  
    }

    verifyFirstAndLastField(){
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.get(this.avaterImg));
      basePage.selectElementFromAnotherDropdown(this.viewProfileText);
      cy.wait(TIMEOUT.shortTimeout);
      basePage.elementExist(cy.get(this.firstNameInput));
      basePage.elementExist(cy.get(this.lastNameInput));
    }

    typeAlpaNumericOnFirstNameInput(){
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.get(this.avaterImg));
      basePage.selectElementFromAnotherDropdown(this.viewProfileText);
      cy.wait(TIMEOUT.shortTimeout);
      basePage.elementExist(cy.get(this.firstNameInput));
      // type alpaNumeric input 
      basePage.typeElementText(cy.get(this.firstNameInput) ,"Kinza1233");
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.clickOnElement(cy.xpath(basePage.saveChangesButton));
      basePage.verifyToast('Saved successfully');

      cy.wait(TIMEOUT.shortTimeout);
      basePage.elementExist(cy.get(this.firstNameInput));
      // change first name to previous one 
      basePage.typeElementText(cy.get(this.firstNameInput) ,"Kinza");
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.clickOnElement(cy.xpath(basePage.saveChangesButton));
      basePage.verifyToast('Saved successfully');
    }

    changePassword(){
      cy.fixture('loginCredential.json').then((user)=>{   
        let pass = faker.string.alpha(5) + '@' + faker.string.numeric(5);
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.get(this.avaterImg));
        basePage.selectElementFromAnotherDropdown(this.viewProfileText);
        cy.wait(TIMEOUT.shortTimeout);
        // change password 
        basePage.typeElementText(cy.get(this.oldPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.newPasswordInput),pass);
        basePage.typeElementText(cy.get(this.confirmPasswordInput),pass);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.verifyToast('Password changed successfully');
        // verify if fields are empty after password changed successfully 
        basePage.elementHaveValue(cy.get(this.oldPasswordInput), '' );
        basePage.elementHaveValue(cy.get(this.newPasswordInput), '' );
        basePage.elementHaveValue(cy.get(this.confirmPasswordInput), '' );
        // now change password to previous one 
        basePage.typeElementText(cy.get(this.oldPasswordInput),pass);
        basePage.typeElementText(cy.get(this.newPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.confirmPasswordInput),user.password);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.verifyToast('Password changed successfully');
      })        
    }
    
    cancelResetPassword(){
      cy.fixture('loginCredential.json').then((user)=>{   
        let pass = faker.string.alpha(5) + '@' + faker.string.numeric(5);
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.get(this.avaterImg));
        basePage.selectElementFromAnotherDropdown(this.viewProfileText);
        cy.wait(TIMEOUT.shortTimeout);
        // change password 
        basePage.typeElementText(cy.get(this.oldPasswordInput),pass);
        basePage.typeElementText(cy.get(this.newPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.confirmPasswordInput),user.password);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.elementVisibility(cy.xpath(basePage.cancelButton),1)
        basePage.clickOnElement(cy.xpath(basePage.cancelButton),1);
        cy.wait(TIMEOUT.shortTimeout);
         // verify if fields are empty after password changed successfully 
         basePage.elementHaveValue(cy.get(this.oldPasswordInput), '' );
         basePage.elementHaveValue(cy.get(this.newPasswordInput), '' );
         basePage.elementHaveValue(cy.get(this.confirmPasswordInput), '' );
      })  
    }

    enterIncorrectOldPass(){
      cy.fixture('loginCredential.json').then((user)=>{   
        let pass = faker.string.alpha(5) + '@' + faker.string.numeric(5);
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.get(this.avaterImg));
        basePage.selectElementFromAnotherDropdown(this.viewProfileText);
        cy.wait(TIMEOUT.shortTimeout);
        // enter incorrect old  password 
        basePage.typeElementText(cy.get(this.oldPasswordInput),"incorrectpassword");
        basePage.typeElementText(cy.get(this.newPasswordInput),pass);
        basePage.typeElementText(cy.get(this.confirmPasswordInput),pass);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.verifyToast('Wrong password.');
      })    
    }

    // enterNewPassWithOldOne(){
    //   cy.fixture('loginCredential.json').then((user)=>{   
    //     let pass = faker.string.alpha(5) + '@' + faker.string.numeric(5);
    //     basePage.goToDashboardPage();
    //     cy.wait(TIMEOUT.veryShortTimeout);  
    //     basePage.clickOnElement(cy.get(this.avaterImg));
    //     basePage.selectElementFromAnotherDropdown(this.viewProfileText);
    //     cy.wait(TIMEOUT.shortTimeout);
    //     // enter incorrect old  password 
    //     basePage.typeElementText(cy.get(this.oldPasswordInput),"incorrectpassword");
    //     basePage.typeElementText(cy.get(this.newPasswordInput),pass);
    //     basePage.typeElementText(cy.get(this.confirmPasswordInput),pass);
    //     cy.wait(TIMEOUT.veryShortTimeout);
    //     basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
    //     basePage.verifyToast('Wrong password.');
    //   })
    // }
    
    enterNewPassWithNoOldPass(){
      let pass = faker.string.alpha(5) + '@' + faker.string.numeric(5);
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.get(this.avaterImg));
      basePage.selectElementFromAnotherDropdown(this.viewProfileText);
      cy.wait(TIMEOUT.shortTimeout);
      basePage.typeElementText(cy.get(this.newPasswordInput),pass);
      basePage.typeElementText(cy.get(this.confirmPasswordInput),pass);
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
      // verify error message 
      cy.contains('This field is required.').should('exist')
    }
    

    verifyProfileImageClickable(){
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.shortTimeout);  
      basePage.clickOnElement(cy.get(this.avaterImg));
      basePage.selectElementFromAnotherDropdown(this.viewProfileText);
    }

    changeProfileImage(){
      cy.fixture('userData.json').then((user)=>{   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.get(this.avaterImg));
        basePage.selectElementFromAnotherDropdown(this.viewProfileText);
        cy.wait(TIMEOUT.shortTimeout);
        basePage.elementExist(cy.get(this.changeProfileInput));
        // change profile image
        cy.get(this.changeProfileInput).selectFile(user.dummyprofile,{ action: "drag-drop",force: true});
      })        
    }

    checkMultipleImageUpload(){
      cy.fixture('userData.json').then((user)=>{   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.get(this.avaterImg));
        basePage.selectElementFromAnotherDropdown(this.viewProfileText);
        cy.wait(TIMEOUT.shortTimeout);
        basePage.elementExist(cy.get(this.changeProfileInput));
        // change profile image
        cy.get(this.changeProfileInput).selectFile([user.dummyprofile,user.dummyprofile2],{ action: "drag-drop",force: true});
      })      
    }

    resetPassEyeIcon(){
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.get(this.avaterImg));
      basePage.selectElementFromAnotherDropdown(this.viewProfileText);
      cy.wait(TIMEOUT.shortTimeout);
      basePage.elementExist(cy.get(basePage.passEyeIcon))
    }

    verifyBrokenImage(){
      cy.fixture('userData.json').then((user)=>{   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.get(this.avaterImg));
        basePage.selectElementFromAnotherDropdown(this.viewProfileText);
        cy.wait(TIMEOUT.shortTimeout);
        basePage.elementExist(cy.get(this.changeProfileInput));
        // change profile image
        cy.get(this.changeProfileInput).selectFile(user.textFile,{ action: "drag-drop",force: true});
        cy.wait(TIMEOUT.shortTimeout);
        // verify if image is broken (docs image) and we will see profile as a "ALT"
        cy.xpath(this.profileImage).should('be.visible').and(($elem)=>{
          expect($elem[0].naturalWidth).to.be.eq(0);
          expect($elem[0].alt).to.be.eq('profile');
        })
      })      
    }

}