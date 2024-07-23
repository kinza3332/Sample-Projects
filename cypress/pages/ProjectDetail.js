import dayjs from "dayjs";
import { PROJECTDROPDOWNOPTION, PROJECTFILTEROPTION, TIMEOUT, getFullMonthName, getMonthName, getProjectName, setProjectName } from "../Helper";
import { Base } from "./Base";
import { Project } from "./Project";

const basePage = new Base();
const projectPage = new Project();

export class ProjectDetail {

    projectOptionDropdown = '[data-testid="project_options_dropdown"]';
    objectiveButton = '//button[normalize-space()="Objective"]';
    purposeButton = '//button[normalize-space()="Purpose"]';
    editObjPurposeBtn = '//button[normalize-space()="Objective"]/parent::div/following-sibling::button';
    ObjPurposeTextarea = '//button[normalize-space()="Objective"]/parent::div/parent::div/following-sibling::textarea';
    actionItemsTab = "a:contains('Action Items')";
    // first button for plus and second for collapse
    actionItemsIconBtn = 'button[data-testid="expand-collapse-all-button"]';

    editCatInput = 'input[name="name"]';
    actionNameDiv = "//span[contains(@data-testid, 'name-value')]";
    addNoteButton = "//button[contains(@data-testid, 'add-note-button')]";
    addActionButton = "//button[contains(@data-testid, 'add-item-button')]";
    catNameDiv = "//button[contains(@data-testid, 'delete-button')]/parent::div/following-sibling::div/span";
    noteInput = 'textarea[placeholder="Enter Note"]';
    unitIconDiv = '//p[normalize-space()="Unit"]/following-sibling::div';
    startInput = 'input[name="start"]';
    currentInput = 'input[name="current"]';
    targetInput = 'input[name="target"]';
    weeklyDurationTableDiv = '[data-testid="duration-select"] > div > span.ant-select-selection-item';
    weightTableDiv = '//div[contains(@data-testid, "weight-select")]/div/span[contains(@class, "ant-select-selection-item")]';
    planProgressDiv = '//div[contains(@data-testid, "progress-select")]/div/span[contains(@class, "ant-select-selection-search")]/following-sibling::span';
    responsePersonDiv = '//div[contains(@data-testid, "owner-select")]/div/span[contains(@class, "ant-select-selection-item")]';
    responsiblePersonInput = '#responsible_person';

    deleteProject(){
        let project_Name = getProjectName();
        cy.wait(TIMEOUT.shortTimeout);
        basePage.clickOnElement(cy.get(this.projectOptionDropdown));
        projectPage.deleteProjectFunc('Delete Plan');
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.elementNotExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
    }

    renameProject(){   
          let project_Name = setProjectName();
          basePage.clickOnElement(cy.get(this.projectOptionDropdown));
          projectPage.renameProjectFunc(project_Name);
          cy.wait(TIMEOUT.veryShortTimeout);
          basePage.elementExist(cy.get('span:contains("'+project_Name+'")'));
   }

   archiveProject(){ 
       let project_Name = getProjectName();
       cy.wait(TIMEOUT.shortTimeout);
       basePage.clickOnElement(cy.get(this.projectOptionDropdown));
       projectPage.archiveProjectFunc();
       basePage.elementNotExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
   }

   clickOnActionItemsTab(){
      basePage.clickOnElement(cy.get(this.actionItemsTab));
   }
  
   

}