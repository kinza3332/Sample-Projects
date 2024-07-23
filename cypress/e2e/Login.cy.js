import {Authentication} from '../pages/Authentication';

const authenticationPage = new Authentication()

describe('Login',  ()=>{

  it("Incorrect Login with username in Capital letter", () => {
    cy.fixture('loginCredential.json').then((user)=>{
     let username = user.username.toUpperCase();
     let password = user.password;
     authenticationPage.Incorrectlogin(username , password );
    })
  })

  it("Login with correct username and password", () => {
    cy.fixture('loginCredential.json').then((user)=>{
      authenticationPage.login(user);
    })
  })

})
 

