import { TIMEOUT, setProjectName } from '../../Helper';
import {Authentication} from '../../pages/Authentication';
import {Base} from '../../pages/Base';
import {ProjectDetail} from '../../pages/ProjectDetail';
import {Project} from '../../pages/Project';

const authenticationPage = new Authentication();
const basePage = new Base();
const projectDetailPage = new ProjectDetail();
const projectPage = new Project();

let objectiveText = 'Hi objective';
let purposeText = 'Hi purpose';
let noteText = 'Adding notes';
let editNoteText = 'Edit notes';

describe('Project Details',  ()=>{
   
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

    it("Verify that the user is navigate to home page from project detail page", () => { 
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.get(projectDetailPage.projectOptionDropdown).prev().siblings('a'));
        basePage.elementVisibility(cy.xpath(projectPage.newProjectButton));
    });

    it("User is able to click on edit button of objective & purpose from project detail page", () => { 
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        //verify objective textarea
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        //verify purpose textarea
        basePage.clickOnElement(cy.xpath(projectDetailPage.purposeButton));
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
    });

    it("Edit input of objective & purpose is empty initially from project detail page", () => { 
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        //verify objective textarea
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),'' )
        //verify purpose textarea
        basePage.clickOnElement(cy.xpath(projectDetailPage.purposeButton));
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),'' )
    });

    it("Type into the input of objective & purpose from project detail page", () => { 
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
        //verify purpose textarea
        basePage.clickOnElement(cy.xpath(projectDetailPage.purposeButton));
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        basePage.typeElementText(cy.xpath(projectDetailPage.ObjPurposeTextarea),purposeText);
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),purposeText);
    });

    it("Edit the text into the input of objective & purpose from project detail page", () => { 
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        //verify objective textarea
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        basePage.typeElementText(cy.xpath(projectDetailPage.ObjPurposeTextarea),'Edit objective');
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),'Edit objective')
        //verify purpose textarea
        basePage.clickOnElement(cy.xpath(projectDetailPage.purposeButton));
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementVisibility(cy.xpath(projectDetailPage.ObjPurposeTextarea));
        basePage.typeElementText(cy.xpath(projectDetailPage.ObjPurposeTextarea),'Edit purpose');
        basePage.clickOnElement(cy.xpath(projectDetailPage.editObjPurposeBtn));
        basePage.elementHaveValue(cy.xpath(projectDetailPage.ObjPurposeTextarea),'Edit purpose');
    });

    it("Action items have default category and action items on project detail page", () => { 
        cy.fixture('userData.json').then((data)=>{     
            basePage.goToDashboardPage();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectPage.clickOnFirstProject();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectDetailPage.clickOnActionItemsTab();
            // verify category
            basePage.elementExist(cy.xpath("//span[contains(string(), '"+ data.default_category[0]+"')]"));
            // verify items
            data.default_items.forEach((item)=>{
                basePage.elementExist(cy.xpath("//span[contains(@data-testid, 'name-value') and contains(string(), '"+ item+"')]"));  
            })
        })
    });

    it("Collapse the Action items will hide the table items on project detail page", () => { 
        cy.fixture('userData.json').then((data)=>{     
            basePage.goToDashboardPage();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectPage.clickOnFirstProject();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectDetailPage.clickOnActionItemsTab();
            // verify category
            basePage.elementExist(cy.xpath("//span[contains(string(), '"+ data.default_category[0]+"')]"));
            // verify items
            data.default_items.forEach((item)=>{
                basePage.elementVisibility(cy.xpath("//span[contains(@data-testid, 'name-value') and contains(string(), '"+ item+"')]"));  
            });
            // click on collapse button 
            basePage.clickOnElement(cy.get(projectDetailPage.actionItemsIconBtn));
            // verify items
            data.default_items.forEach((item)=>{
                basePage.elementNotVisible(cy.xpath("//span[contains(@data-testid, 'name-value') and contains(string(), '"+ item+"')]"));  
            });
        })
    });

    // it("Verify delete category button is disabled if  1 category exist on project detail page", () => { 
    //     cy.fixture('userData.json').then((data)=>{     
    //         basePage.goToDashboardPage();
    //         cy.wait(TIMEOUT.veryShortTimeout);
    //         projectPage.clickOnFirstProject();
    //         cy.wait(TIMEOUT.veryShortTimeout);
    //         projectDetailPage.clickOnActionItemsTab();
    //         // verify category
    //         basePage.elementExist(cy.xpath("//span[contains(@class, 'd-inline-block') and contains(string(), '"+ data.default_category[0]+"')]"));
    //         // verify delete category disabled
    //         basePage.elementDisabled(cy.xpath("//span[contains(@class, 'd-inline-block') and contains(string(), '"+ data.default_category[0]+"')]/parent::div/following-sibling::button[contains(@data-testid, 'delete-button')]"))
    //     })
    // });

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

    // it("Verify delete category button is active if  more than one category exist on project detail page", () => { 
    //     cy.fixture('userData.json').then((data)=>{     
    //         basePage.goToDashboardPage();
    //         cy.wait(TIMEOUT.veryShortTimeout);
    //         projectPage.clickOnFirstProject();
    //         cy.wait(TIMEOUT.veryShortTimeout);
    //         projectDetailPage.clickOnActionItemsTab();
    //         // verify category
    //         let catSelector = cy.xpath(projectDetailPage.catNameDiv);
    //         basePage.elementExist(catSelector);
    //         // click on add category button
    //         basePage.clickOnElement(cy.get(projectDetailPage.actionItemsIconBtn));
    //         // type into new category 
    //         cy.wait(TIMEOUT.veryShortTimeout);
    //         basePage.typeElementText(cy.get(projectDetailPage.editCatInput),data.new_category[0]+'{enter}' );
    //         cy.wait(TIMEOUT.shortTimeout);
    //         basePage.elementExist(cy.xpath("//div[contains(@class, 'catName') and contains(string(), '"+ data.new_category[0]+"')]"));
                    
    //         // verify delete category not disabled
    //         basePage.elementNotDisabled(cy.xpath("//div[contains(@class, 'catName') and contains(string(), '"+ data.default_category[0]+"')]/following-sibling::div/button[contains(@class, 'deleteCategory')]"))
    //     })
    // });

    it("User should be able to Add note inside of action items table on project detail page", () => {  
            basePage.goToDashboardPage();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectPage.clickOnFirstProject();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectDetailPage.clickOnActionItemsTab();
            // verify item  exist
            let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
            basePage.elementExist(itemSelector);
            // click on add note 
            cy.wait(TIMEOUT.shortTimeout);
            basePage.clickOnElement(cy.xpath(projectDetailPage.addNoteButton));
            cy.wait(TIMEOUT.veryShortTimeout);
            
            basePage.typeElementText(cy.get(projectDetailPage.noteInput),noteText );
            cy.wait(TIMEOUT.veryShortTimeout);
            basePage.clickOnElement(cy.xpath(basePage.saveButton));
            // verify item exist
            basePage.elementExist(cy.xpath("//span[contains(@data-testid, 'note-value') and contains(string(), '"+ noteText+"')]"));
    });

    it("User should be able to Edit note inside of action items table on project detail page", () => {  
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.clickOnActionItemsTab();
        // verify item  exist
        let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
        basePage.elementExist(itemSelector);
        // click on  note 
        cy.wait(TIMEOUT.shortTimeout);
        basePage.clickOnElement(cy.xpath("//span[contains(@data-testid, 'note-value')]"));
        cy.wait(TIMEOUT.veryShortTimeout);
        
        basePage.typeElementText(cy.get(projectDetailPage.noteInput),editNoteText );
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveButton));
        // verify item exist
        basePage.elementExist(cy.xpath("//span[contains(@data-testid, 'note-value') and contains(string(), '"+ editNoteText+"')]"));
    });

    it("User should be able to delete note inside of action items table on project detail page", () => {  
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.clickOnActionItemsTab();
        // verify item  exist
        let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
        basePage.elementExist(itemSelector);
        // click on  note 
        cy.wait(TIMEOUT.shortTimeout);
        basePage.clickOnElement(cy.xpath("//span[contains(@data-testid, 'note-value')]"));
        cy.wait(TIMEOUT.shortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.deleteButton));
        // verify item exist
        basePage.elementNotExist(cy.xpath("//span[contains(@data-testid, 'note-value') and contains(string(), '"+ editNoteText+"')]"));
    });

    it("User should be able to select unit for set your goal on project detail page", () => {     
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.clickOnActionItemsTab();
        cy.wait(TIMEOUT.veryShortTimeout);
        // Hover on unit div 
        basePage.elementMouseOver(cy.xpath(projectDetailPage.unitIconDiv));
        cy.wait(TIMEOUT.veryShortTimeout);
        // Hover on unit name e.g: Weight
        basePage.elementMouseOver(cy.get(basePage.dropdownTitle));
        // Click on unit value e.g: KG
        basePage.clickOnElement(cy.get(basePage.dropdownContent))
    });

    it("User should be able to type into set your goal on project detail page", () => {     
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.clickOnActionItemsTab();
        cy.wait(TIMEOUT.veryShortTimeout);
        // type on start input 
        basePage.typeElementText(cy.get(projectDetailPage.startInput),'0.00');
        cy.wait(TIMEOUT.veryShortTimeout);
        // type on current input 
        basePage.typeElementText(cy.get(projectDetailPage.currentInput),'2.00');
        cy.wait(TIMEOUT.veryShortTimeout);
        // type on target input 
        basePage.typeElementText(cy.get(projectDetailPage.targetInput),'6.00');
        cy.wait(TIMEOUT.shortTimeout);
    });

    it("User should be able to add duration inside of action items table on project detail page", () => {     
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.clickOnActionItemsTab();
        cy.wait(TIMEOUT.veryShortTimeout);
        // verify item  exist
        let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
        basePage.elementExist(itemSelector);
        cy.wait(TIMEOUT.shortTimeout); 
        basePage.clickOnElement(cy.get(projectDetailPage.weeklyDurationTableDiv));
        cy.wait(TIMEOUT.veryShortTimeout); 
        basePage.selectElementFromDropdown('20 Min');
        cy.wait(TIMEOUT.veryShortTimeout); 
        basePage.elementTextExist(cy.get(projectDetailPage.weeklyDurationTableDiv), '20 Min');
        projectDetailPage.clickOnActionItemsTab();
     });

     it("User should be able to add weight inside of action items table on project detail page", () => {     
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.clickOnActionItemsTab();
        cy.wait(TIMEOUT.veryShortTimeout);
        // verify item  exist
        let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
        basePage.elementExist(itemSelector);
        cy.wait(TIMEOUT.shortTimeout); 
        basePage.clickOnElement(cy.xpath(projectDetailPage.weightTableDiv));
        cy.wait(TIMEOUT.veryShortTimeout); 
        basePage.selectElementFromDropdown('10');
        cy.wait(TIMEOUT.veryShortTimeout); 
        basePage.elementTextExist(cy.xpath(projectDetailPage.weightTableDiv), '10');
        projectDetailPage.clickOnActionItemsTab();
        
     });

     it("User should be able to plan progress inside of action items table on project detail page", () => {     
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.clickOnActionItemsTab();
        cy.wait(TIMEOUT.veryShortTimeout);
        // verify item  exist
        let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
        basePage.elementExist(itemSelector);
        cy.wait(TIMEOUT.shortTimeout); 
        basePage.clickOnElement(cy.xpath(projectDetailPage.planProgressDiv), 0 , {force:true});
        cy.wait(TIMEOUT.veryShortTimeout); 
        basePage.selectElementFromDropdown('5');
        cy.wait(TIMEOUT.veryShortTimeout); 
        basePage.elementTextExist(cy.xpath(projectDetailPage.planProgressDiv), '5');
        projectDetailPage.clickOnActionItemsTab();
     });

     it("User should be able to add responsible person inside of action items table on project detail page", () => {     
        cy.fixture('loginCredential.json').then((data)=>{  
            basePage.goToDashboardPage();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectPage.clickOnFirstProject();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectDetailPage.clickOnActionItemsTab();
            cy.wait(TIMEOUT.veryShortTimeout);
            // verify item  exist
            let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
            basePage.elementExist(itemSelector);
            cy.wait(TIMEOUT.shortTimeout); 
            basePage.clickOnElement(cy.xpath(projectDetailPage.responsePersonDiv));
            cy.wait(TIMEOUT.veryShortTimeout); 
            basePage.clickOnElement(cy.xpath('//div[normalize-space()="'+data.username+'"]'));
            projectDetailPage.clickOnActionItemsTab();
        })
     });

    
    it("User should be able to  delete specific item inside of action items table on project detail page", () => { 
        cy.fixture('userData.json').then((data)=>{     
            basePage.goToDashboardPage();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectPage.clickOnFirstProject();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectDetailPage.clickOnActionItemsTab();
            // verify item 1 exist
            basePage.elementExist(cy.xpath("//span[contains(@data-testid, 'name-value') and contains(string(), '"+ data.default_items[0]+"')]"));
            basePage.clickOnElement(cy.xpath("//span[contains(@data-testid, 'name-value') and contains(string(), '"+ data.default_items[0]+"')]/parent::div/following-sibling::button[contains(@data-testid, 'delete-button')]"),0,{force:true});
            basePage.clickOnElement(cy.xpath(projectPage.deletePermanent))
            cy.wait(TIMEOUT.shortTimeout);
            // verify item 1 not exist
            basePage.elementNotExist(cy.xpath("//span[contains(@data-testid, 'name-value') and contains(string(), '"+ data.default_items[0]+"')]"));
        })
    });

    it("User should be able to Add item inside of action items table on project detail page", () => { 
        cy.fixture('userData.json').then((data)=>{     
            basePage.goToDashboardPage();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectPage.clickOnFirstProject();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectDetailPage.clickOnActionItemsTab();
            // verify item  exist
            let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
            basePage.elementExist(itemSelector);
            basePage.clickOnElement(cy.xpath(projectDetailPage.addActionButton),0,{force:true});
            cy.wait(TIMEOUT.veryShortTimeout);
            basePage.typeElementText(cy.get(projectDetailPage.editCatInput),data.new_items[0]+'{enter}' );
            cy.wait(TIMEOUT.shortTimeout);
            // verify item exist
            basePage.elementExist(cy.xpath("//span[contains(@data-testid, 'name-value') and contains(string(), '"+ data.new_items[0]+"')]"));
        })
    });

    it("User should be able to  edit specific item inside of action items table on project detail page", () => { 
        cy.fixture('userData.json').then((data)=>{     
            basePage.goToDashboardPage();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectPage.clickOnFirstProject();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectDetailPage.clickOnActionItemsTab();
            // verify item 1 exist
            let itemSelector = cy.xpath(projectDetailPage.actionNameDiv);
            basePage.elementExist(itemSelector);
            // click on category 
            basePage.clickOnElement(itemSelector);
            cy.wait(TIMEOUT.veryShortTimeout);
            basePage.typeElementText(cy.get(projectDetailPage.editCatInput),data.new_items[0]+'{enter}' );
            cy.wait(TIMEOUT.shortTimeout);
            // verify item exist
            basePage.elementExist(cy.xpath("//span[contains(@data-testid, 'name-value') and contains(string(), '"+ data.new_items[0]+"')]"));
        })
    });

    it("Verify user can edit category name on project detail page", () => { 
        cy.fixture('userData.json').then((data)=>{     
            basePage.goToDashboardPage();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectPage.clickOnFirstProject();
            cy.wait(TIMEOUT.veryShortTimeout);
            projectDetailPage.clickOnActionItemsTab();
            // verify category
            let catSelector = cy.xpath(projectDetailPage.catNameDiv);
            basePage.elementExist(catSelector);
            // click on category 
            basePage.clickOnElement(catSelector);
            cy.wait(TIMEOUT.veryShortTimeout);
            basePage.typeElementText(cy.get(projectDetailPage.editCatInput),data.new_category[0]+'{enter}' );
            cy.wait(TIMEOUT.shortTimeout);
            basePage.elementExist(cy.xpath("//span[contains(string(), '"+ data.new_category[0]+"')]"));
            
        })
    });

    it("Verify that the user is able to resume the Project in project detail page", () => {
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.renameProject();
    });

    it("Verify that the user is able to archieve & unarchieve the Project in project detail page", () => {
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.archiveProject();
        basePage.goToDashboardPage();
        projectPage.unArchiveProject();
    });

    it("Verify that the user is able to delete the Project in project detail page", () => {
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectPage.clickOnFirstProject();
        cy.wait(TIMEOUT.veryShortTimeout);
        projectDetailPage.deleteProject();
    });

    it("Delete every plan", () => {
        basePage.goToDashboardPage();
        projectPage.deleteAllCards();
    });

})