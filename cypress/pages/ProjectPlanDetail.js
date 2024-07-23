import { Base } from "./Base";


const basePage = new Base();


export class ProjectPlanDetail {

    nameInput = 'input[name="name"]';
    ideaInput = 'textarea[name="idea"]';
    descInput = 'textarea[name="description"]';
    objectiveInput = 'textarea[name="objective"]';
    purposeInput = 'textarea[name="purpose"]';
    projectPlanTab = "a:contains('Project Plan Details')";
    addNewNoteButton = '//div/p[normalize-space()="Add new note"]';
    noteInput = 'textarea[placeholder="Enter note"]';
    addButton = '//button/span[normalize-space()="Add"]';
    noteTextSelector = '//h4[normalize-space()="Notes"]/parent::div/following-sibling::p';
    updateButton = '//button/span[normalize-space()="Update"]';
    notesHeading = 'h4:contains("Notes")';

    clickOnProjectPlanTab(){
        basePage.clickOnElement(cy.get(this.projectPlanTab));
    }
    
}   