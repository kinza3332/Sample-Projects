
import {Authentication} from '../pages/Authentication';
import {ProfileClass} from '../pages/Profile';


const authenticationPage = new Authentication();
const profileClass = new ProfileClass();



describe('Profile',  ()=>{
   
    beforeEach(()=>{
        cy.fixture('loginCredential.json').then((user)=>{
          authenticationPage.login(user);
        })
    })


    it("validation error message for email address is displayed", () => {
        profileClass.errorMsgForInvalidEmail();
    });

    it("Password input field have an eye icon", () => {
        profileClass.resetPassEyeIcon();
    });

    it("Back button or Cancel button is displayed on the reset my password page.", () => {
        profileClass.cancelResetPassword();
    });

    it("User is not able to change password(New) without entering old password", () => {
        profileClass.enterNewPassWithNoOldPass();
    });

    it("Verify if the Profile Picture is clickable or not", () => {
        profileClass.verifyProfileImageClickable();
    });

    it("Verify that user is able to see first and last name field", () => {
        profileClass.verifyFirstAndLastField();
    });
    it("Verify that the error message is displayed for invalid password", () => {
        profileClass.errorMsgForInvalidPassword();
    });

    it("Verify that the first name in an input field accepts alphanumeric character.", () => {
        profileClass.typeAlpaNumericOnFirstNameInput();
    });

    it("Verify that the user cant set the same password as the new one ", () => {
        profileClass.errorMsgForSamePassword();
    });

    it("Verify that the user is able to see the linked profile’s phone number", () => {
        profileClass.verifyProfilePhoneNumber();
    });

    it("Verify that the password fields become empty after user saves changes", () => {
        profileClass.changePassword();
    });

    it("Verify appropriate error message if not typed old password correctly", () => {
        profileClass.enterIncorrectOldPass();
        
    });

    it("Verify if the Profile Picture is clickable or not", () => {
        profileClass.changeProfileImage();
    });

    it("User is not able to upload multiple profile images.", () => {
        profileClass.checkMultipleImageUpload();
    });

    it("Broken image(alt ='Profile') is displayed on the profile page, if the profile picture fails to load.", () => {
        profileClass.verifyBrokenImage();
    });

})
