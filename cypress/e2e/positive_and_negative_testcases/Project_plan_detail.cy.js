import { TIMEOUT, getProjectName, setProjectName } from '../../Helper';
import {Authentication} from '../../pages/Authentication';
import {Base} from '../../pages/Base';
import {ProjectPlanDetail} from '../../pages/ProjectPlanDetail';
import {Project} from '../../pages/Project';
import {ProjectDetail} from '../../pages/ProjectDetail';

const authenticationPage = new Authentication();
const basePage = new Base();
const projectPlanDetailPage = new ProjectPlanDetail();
const projectPage = new Project();
const projectDetailPage = new ProjectDetail();

let objectiveText = 'Hi objective';
let purposeText = 'Hi purpose';
let note = 'My note';
let editNote = 'Edit note';


describe('Project plan Details',  ()=>{

    beforeEach(()=>{
        cy.fixture('loginCredential.json').then((user)=>{
          authenticationPage.login(user);
        })
    })

    it("Delete project if any", () => { 
       projectPage.deleteFirstProjectIfAny();
    });

    it("Verify that the user is able to add Project plan with required field", () => { 
        let project_Name = setProjectName();
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        projectPage.clickOnNewProjectButton();
        projectPage.addProjectWithRequiredField(project_Name); 
    });

    it("Verify user will be able to see project name on project plan detail page", () => {    
        let project_Name = getProjectName();
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        // verify name input
        basePage.elementExist(cy.get(projectPlanDetailPage.nameInput));
        basePage.elementHaveValue(cy.get(projectPlanDetailPage.nameInput),  project_Name);
    });

    it("Verify user will be able to set project name on project plan detail page", () => {   
        let project_Name = setProjectName(); 
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        // verify name input
        basePage.elementExist(cy.get(projectPlanDetailPage.nameInput));
        basePage.typeElementText(cy.get(projectPlanDetailPage.nameInput),  project_Name );
        cy.wait(TIMEOUT.shortTimeout);
        basePage.clickOnElement(cy.get(projectDetailPage.projectOptionDropdown).prev().siblings('a'));
        basePage.elementVisibility(cy.xpath(projectPage.newProjectButton));
        basePage.elementExist(cy.get('h2:contains("'+project_Name+'")'))
    });

    it("Verify user will be able to set project idea on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        // verify name input
        basePage.elementExist(cy.get(projectPlanDetailPage.nameInput));
        basePage.typeElementText(cy.get(projectPlanDetailPage.ideaInput),  'Brainstorm idea' );
        cy.wait(TIMEOUT.shortTimeout);
        basePage.clickOnElement(cy.get(projectDetailPage.projectOptionDropdown).prev().siblings('a'));
        basePage.elementVisibility(cy.xpath(projectPage.newProjectButton));
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        basePage.elementHaveValue(cy.get(projectPlanDetailPage.ideaInput),  'Brainstorm idea');
    });

    it("Verify user will be able to set project description on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        // verify name input
        basePage.elementExist(cy.get(projectPlanDetailPage.nameInput));
        basePage.typeElementText(cy.get(projectPlanDetailPage.descInput),  'This is testing' );
        cy.wait(TIMEOUT.shortTimeout);
        basePage.clickOnElement(cy.get(projectDetailPage.projectOptionDropdown).prev().siblings('a'));
        basePage.elementVisibility(cy.xpath(projectPage.newProjectButton));
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        basePage.elementHaveValue(cy.get(projectPlanDetailPage.descInput),  'This is testing');
    });

    it("Verify user will be able to verify objective values on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
         //verify objective textarea
         basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
         basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
         basePage.typeElementText(cy.xpath(projectDetailPage.ObjPurposeTextarea),objectiveText);
         basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
         basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),objectiveText)
         cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        // verify objective input
        basePage.elementExist(cy.get(projectPlanDetailPage.objectiveInput));
        basePage.elementHaveValue(cy.get(projectPlanDetailPage.objectiveInput),  objectiveText);
    });

    it("Verify user will be able to edit objective values on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        // verify objective input
        basePage.elementExist(cy.get(projectPlanDetailPage.objectiveInput));
        basePage.typeElementText(cy.get(projectPlanDetailPage.objectiveInput),  'Edit objective' );
        basePage.elementHaveValue(cy.get(projectPlanDetailPage.objectiveInput),  'Edit objective');
        cy.wait(TIMEOUT.veryShortTimeout);
        //verify objective textarea on top upper side
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),'Edit objective')
    });

    it("Verify user will be able to verify purpose values on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
         //verify purpose textarea
        basePage.clickOnElement(cy.xpath(projectDetailPage.purposeButton));
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        basePage.typeElementText(cy.xpath(projectDetailPage.ObjPurposeTextarea),purposeText);
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),purposeText);
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        // verify objective input
        basePage.elementExist(cy.get(projectPlanDetailPage.purposeInput));
        basePage.elementHaveValue(cy.get(projectPlanDetailPage.purposeInput),  purposeText);
    });

    it("Verify user will be able to edit purpose values on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        //  purpose input
        basePage.elementExist(cy.get(projectPlanDetailPage.purposeInput));
        basePage.typeElementText(cy.get(projectPlanDetailPage.purposeInput),  'Edit purpose' );
        basePage.elementHaveValue(cy.get(projectPlanDetailPage.purposeInput),  'Edit purpose');
        cy.wait(TIMEOUT.veryShortTimeout);
        //verify purpose textarea on top upper side
        basePage.clickOnElement(cy.xpath(projectDetailPage.purposeButton));
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),'Edit purpose')
    });

    it("Verify user will be able to add note on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        cy.wait(TIMEOUT.veryShortTimeout);
        // click on add new note 
        basePage.clickOnElement(cy.xpath(projectPlanDetailPage.addNewNoteButton));
        basePage.typeElementText(cy.get(projectPlanDetailPage.noteInput),note);
        basePage.clickOnElement(cy.xpath(projectPlanDetailPage.addButton));
        // verify note 
        basePage.elementTextExist(cy.xpath(projectPlanDetailPage.noteTextSelector),note)
    });

    it("Verify user will be able to edit note on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        cy.wait(TIMEOUT.veryShortTimeout);
        // click on add new note 
        basePage.clickOnElement(cy.get(projectPlanDetailPage.notesHeading).next());
        basePage.selectElementFromAnotherDropdown('Edit Note');
        basePage.typeElementText(cy.get(projectPlanDetailPage.noteInput),editNote);
        basePage.clickOnElement(cy.xpath(projectPlanDetailPage.updateButton));
        // verify note 
        basePage.elementTextExist(cy.xpath(projectPlanDetailPage.noteTextSelector),editNote)
    });

    it("Verify user will be able to delete note on project plan detail page", () => {   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPlanDetailPage.clickOnProjectPlanTab();
        cy.wait(TIMEOUT.veryShortTimeout);
        // click on add new note 
        basePage.clickOnElement(cy.get(projectPlanDetailPage.notesHeading).next());
        basePage.selectElementFromAnotherDropdown('Delete Note');
        basePage.clickOnElement(cy.xpath(projectPage.deletePermanent2));
        // verify note 
        basePage.elementNotExist(cy.xpath(projectPlanDetailPage.noteTextSelector));
    });

    it("Delete every plan", () => {
        basePage.goToDashboardPage();
        projectPage.deleteAllCards();
    });
})   