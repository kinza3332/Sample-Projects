
import {Authentication} from '../pages/Authentication';

const authenticationPage = new Authentication()
   
it("Signup with invalid attribute", () => {
  authenticationPage.singupWithInvalidAttribute();
})
 
  // it("Signup", () => {
  //   authenticationPage.signup();
  // })
