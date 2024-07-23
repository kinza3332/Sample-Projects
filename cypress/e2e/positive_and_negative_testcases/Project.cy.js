
import {Authentication} from '../../pages/Authentication';
import {Base} from '../../pages/Base';
import {Project} from '../../pages/Project';
import {  PROJECTDROPDOWNOPTION, PROJECTFILTEROPTION, PROJECTSORTOPTION, TIMEOUT, getProjectName, setProjectName } from '../../Helper';
import dayjs from 'dayjs';
import mailSlurpCred from '../../mailSlurpCred.json';


const authenticationPage = new Authentication();
const basePage = new Base();
const projectPage = new Project();


beforeEach(()=>{
    cy.fixture('loginCredential.json').then((user)=>{
      authenticationPage.login(user);
    })
}) 

it("Verify that it’s possible to cancel Project planning ", () => {
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.clickOnNewProjectButton();
    cy.fixture('userData.json').then((data)=>{
       basePage.goToDashboardPage();
       cy.wait(TIMEOUT.veryShortTimeout);  
       projectPage.clickOnNewProjectButton();
       // fill project name 
       projectPage.fillProjectName(data.projectNameData[0]);
       cy.wait(TIMEOUT.shortTimeout);
       basePage.clickOnElement(cy.get(projectPage.modelTitle).parent().prev());
       basePage.elementExist(cy.get(projectPage.modelTitle));
       
    }) 
});

it("Verify that the email popup displays when the user enters non registered email", () => {
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.clickOnNewProjectButton();
    basePage.elementVisibility(cy.get(projectPage.projectNameInput));
    basePage.clickOnElement(cy.xpath(projectPage.projectOwnerInput),0,{force:true});
    cy.wait(TIMEOUT.veryShortTimeout);
    let dummyEmail = "dummyemail@gmail.com";
    basePage.typeElementWithoutClear(cy.xpath(projectPage.projectOwnerInput),dummyEmail,0,{force:true});
    cy.wait(TIMEOUT.veryShortTimeout);
    // verify invite button
    basePage.elementExist(cy.xpath('//button/span[normalize-space()="'+"Invite "+dummyEmail+'"]'));
});

it("Verify that its possible to add a Project Owner", () => {
    cy.fixture('loginCredential.json').then((user)=>{
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        projectPage.clickOnNewProjectButton();
        basePage.elementVisibility(cy.get(projectPage.projectNameInput));
        // fill project owner 
        projectPage.selectOwnerNameFromDropdown(user.username);
    })  
});

it("Verify that the “Create new plan” validates when all fields are filled ", () => {
    cy.fixture('loginCredential.json').then((user)=>{
      cy.fixture('userData.json').then((data)=>{
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        projectPage.clickOnNewProjectButton();
        // fill project name 
        projectPage.fillProjectName(data.projectNameData[0])
        // fill project owner 
        projectPage.selectOwnerNameFromDropdown(user.username);
        // verify create button is disabled 
        basePage.elementDisabled(cy.xpath(basePage.createButton));
        // fill dates 
        let startDate = dayjs().format("YYYY-MM-DD");
        let endDate = dayjs().add(1, 'day').format("YYYY-MM-DD");
        projectPage.fillDates(startDate, endDate)
        // verify create button is enabled 
        basePage.elementNotDisabled(cy.xpath(basePage.createButton));
      })  
    })  
});

it("Verify that the Email field doesn't validate not valid entered email", () => {
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.clickOnNewProjectButton();
    basePage.elementVisibility(cy.get(projectPage.projectNameInput));
    basePage.clickOnElement(cy.xpath(projectPage.projectOwnerInput),0,{force:true});
    cy.wait(TIMEOUT.veryShortTimeout);
    let dummyEmail = "dummyemail";
    basePage.typeElementWithoutClear(cy.xpath(projectPage.projectOwnerInput),dummyEmail,0,{force:true});
    cy.wait(TIMEOUT.veryShortTimeout);
    // verify error message
    basePage.elementExist(cy.xpath('//div[normalize-space()="No results. Enter email to invite"]'));
     dummyEmail = "dummyemail@gmailcom";
     cy.xpath(projectPage.projectOwnerInput).clear({force:true}).type(dummyEmail, {force:true}) 
    cy.wait(TIMEOUT.veryShortTimeout);
    // verify error message
    basePage.elementExist(cy.xpath('//div[normalize-space()="No results. Enter email to invite"]'));
    dummyEmail = "dummyemailgmail.com";
    cy.xpath(projectPage.projectOwnerInput).clear({force:true}).type(dummyEmail, {force:true}) 
    cy.wait(TIMEOUT.veryShortTimeout);
    // verify error message
    basePage.elementExist(cy.xpath('//div[normalize-space()="No results. Enter email to invite"]'));
});

it("Verify that the user is able to add Project plan with required field", () => { 
    let project_Name = setProjectName();
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.clickOnNewProjectButton();
    projectPage.addProjectWithRequiredField(project_Name); 
});


it("Verify that the user is able to add Project plan with all fields", () => {  
      let project_Name = setProjectName();
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      projectPage.clickOnNewProjectButton();
      projectPage.addProjectWithAllFields(project_Name);
});

it("Verify project dropdown option", () => {
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);
    basePage.clickOnElement(cy.get(projectPage.projectThreeDotIcon));
    cy.wait(TIMEOUT.veryShortTimeout);
    basePage.elementExist(cy.get('li.ant-dropdown-menu-item > span.ant-dropdown-menu-title-content > span:contains("'+PROJECTDROPDOWNOPTION.Rename +'")'))
    basePage.elementExist(cy.get('li.ant-dropdown-menu-item > span.ant-dropdown-menu-title-content > span:contains("'+PROJECTDROPDOWNOPTION.Archive_Plan +'")'))
    basePage.elementExist(cy.get('li.ant-dropdown-menu-item > span.ant-dropdown-menu-title-content > span:contains("'+PROJECTDROPDOWNOPTION.Delete_Project +'")'))
    basePage.elementExist(cy.get('li.ant-dropdown-menu-item > span.ant-dropdown-menu-title-content > span:contains("'+PROJECTDROPDOWNOPTION.Share +'")'))
     
});

it("Verify project sort dropdown option", () => {
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);
    basePage.clickOnElement(cy.get(projectPage.sortPlanInput));
    cy.wait(TIMEOUT.veryShortTimeout);
    
    basePage.elementExist(cy.get('div.checkboxDivFilter > label > span:contains("'+PROJECTSORTOPTION.Name+'")'))
    basePage.elementExist(cy.get('div.checkboxDivFilter > label > span:contains("'+PROJECTSORTOPTION.Startline+'")'))
    basePage.elementExist(cy.get('div.checkboxDivFilter > label > span:contains("'+PROJECTSORTOPTION.Deadline+'")'))
    basePage.elementExist(cy.get('div.checkboxDivFilter > label > span:contains("'+PROJECTSORTOPTION.Goal_Progress+'")'))
    basePage.elementExist(cy.get('div.checkboxDivFilter > label > span:contains("'+PROJECTSORTOPTION.Plan_Progress+'")'))
     
});

it("Verify project filter dropdown option", () => {
  basePage.goToDashboardPage();
  cy.wait(TIMEOUT.veryShortTimeout);
  basePage.clickOnElement(cy.get(projectPage.filterPlan));
  cy.wait(TIMEOUT.veryShortTimeout);
  
  basePage.elementExist(cy.get('label > span:contains("'+PROJECTFILTEROPTION.Active+'")'))
  basePage.elementExist(cy.get('label > span:contains("'+PROJECTFILTEROPTION.Completed+'")'))
  basePage.elementExist(cy.get('label > span:contains("'+PROJECTFILTEROPTION.Future+'")'))
  basePage.elementExist(cy.get('label > span:contains("'+PROJECTFILTEROPTION.Archive+'")'))
   
});

it("Verify user can search the project plan with correct keyword", () => {   
    let project_Name = setProjectName();
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);
    projectPage.clickOnNewProjectButton();
    projectPage.addProjectWithRequiredField(project_Name); 
    cy.wait(TIMEOUT.veryShortTimeout);
    basePage.typeElementText(cy.get(projectPage.searchInput),project_Name   );
    cy.wait(TIMEOUT.veryShortTimeout);
    basePage.elementVisibility(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")')); 
});

it("Verify user can't search the project plan with incorrect keyword", () => {   
    let project_Name = getProjectName();
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);
    basePage.typeElementText(cy.get(projectPage.searchInput),'@4rferfer'  );
    cy.wait(TIMEOUT.veryShortTimeout);
    basePage.elementNotExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
});

it("Verify that the user is able to delete the Project", () => {
    let project_Name = getProjectName();
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.deleteProject(project_Name); 
});

it("Verify that the user is able to share the project with no attribute", () => {
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.shareProject(); 
});

it("Verify that the user is able to Add people and tool into the resource tab", () => {
    cy.fixture('loginCredential.json').then((user)=>{  
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.get(projectPage.projectThreeDotIcon));
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.selectElementFromAnotherDropdown(PROJECTDROPDOWNOPTION.Share);
      // verify resourceLink 
      basePage.elementVisibility(cy.get(projectPage.resourceLink));
      projectPage.addPeopleIntoResource(user.username); 
      cy.wait(TIMEOUT.veryShortTimeout);  
      projectPage.addToolIntoResource();
   })
});

it("Verify that the user is able to Add and delete project document into the resource tab", () => {
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.get(projectPage.projectThreeDotIcon));
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.selectElementFromAnotherDropdown(PROJECTDROPDOWNOPTION.Share);
      // verify resourceLink 
      basePage.elementVisibility(cy.get(projectPage.resourceLink));
      projectPage.addProjectDocsIntoResource(); 
      cy.wait(TIMEOUT.veryShortTimeout);  
      projectPage.deleteProjectDocsIntoResource();
});

it("User is able to make a copy of share project and verify the data", () => {
  cy.fixture('loginCredential.json').then((user)=>{   
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.shareProject(); 
    projectPage.makeShareLinkCopy(user.username);
  }) 
});

it("Verify that the user is able to resume the Project", () => {
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.renameProject();
});

it("Verify that the user is able to archive and unarchive the Project", () => {
  basePage.goToDashboardPage();
  cy.wait(TIMEOUT.veryShortTimeout);  
  projectPage.archiveProject(); 
  projectPage.unArchiveProject();
});

it("Verify that the user is able to delete the Project", () => { 
    let project_Name = getProjectName();
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.deleteProject(project_Name); 
});

it("Delete every plan", () => {
    basePage.goToDashboardPage();
    cy.wait(TIMEOUT.veryShortTimeout);  
    projectPage.deleteAllCards();
});
