
import dayjs from "dayjs";
import { PROJECTDROPDOWNOPTION, PROJECTFILTEROPTION, TIMEOUT, getFullMonthName, getMonthName, getProjectName, setProjectName } from "../Helper";
import { Base } from "./Base";
import { ProjectPlanDetail } from "./ProjectPlanDetail";

const basePage = new Base();
const projectPlanDetailPage = new ProjectPlanDetail();


export class Project {

   newProjectButton = '//button[normalize-space()="+ new project"]';
   projectNameInput = 'input[placeholder="Enter a project name"]';
   projectRenumeInput = 'input[placeholder="Plan Name"]';
   projectOwnerInputDiv = '//input[contains(@id, "rc_select_3")]/parent::span/parent::div'; 
   projectOwnerInputSpan = '//input[contains(@id, "rc_select_3")]/parent::span/following-sibling::span'; 
   projectOwnerInput = '//input[contains(@id, "rc_select_3")]'; 
   inviteEmailUserButton = 'div.ownerTag > div[role="listbox"] > button > span';
   inviteButton = 'button > span:contains("Invite")';
   startLineInput = 'input[name="start_line"]';
   deadLineInput = 'input[name="dead_line"]';
   noteInput ='textarea[placeholder="Add note"]';
   projectThreeDotIcon = '#test > svg';
   cardDiv = 'div[test-id="card"]';
   deletePermanent = '//button/span[normalize-space()="Delete Permanently"]';
   deletePermanent2 = '//button/span[normalize-space()="Delete PERMANENTLY"]';
   modelTitle = 'div.ant-modal-title';
   sendToArchiveButton = '//button/span[normalize-space()="Send To Archive"]';
   sendToUnarchiveButton = '//button/span[normalize-space()="Send To Unarchive"]';
   filterPlan = "#rc_select_2";
   sortPlanInput = "#rc_select_1";
   monthPickerBth = 'div.ant-picker-header-view > button.ant-picker-month-btn';
   yearPickerBth = 'div.ant-picker-header-view > button.ant-picker-year-btn';
   resourceLink = 'div >a:contains("Resources")';
   copyLinkButton = 'button:contains("Copy Link")';
   viewOnlyText = 'div >span:contains("View Only")';
   searchInput = 'input[placeholder="Search projects"]';
   addPeopleButton = '//div[normalize-space()="People"]/following-sibling::div/button';
   addToolButton = '//div[normalize-space()="Project tools"]/following-sibling::div/button';
   addPeopleInput = 'input[placeholder="Choose a collaborator"]';
   addToolInput = 'input[placeholder="Choose a tool"]';
   uploadDocsInput = "div.ant-upload-select-picture-card > span > input";
   uploadDocsInfo = "div.ant-upload-list-picture-card-container > div.ant-upload-list-item-list-type-picture-card > div.ant-upload-list-item-info";
   removeDocsButton = "span.ant-upload-list-item-actions > button[title='Remove file']";
   resourceTab = 'a:contains("Resources")';
   

   clickOnNewProjectButton(){
     basePage.elementVisibility(cy.xpath(this.newProjectButton));
     basePage.clickOnElement(cy.xpath(this.newProjectButton));
   }

   clickOnFirstProject(){
      basePage.clickOnElement(cy.get(this.cardDiv));
   }

   deleteFirstProjectIfAny(){
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.shortTimeout);
      cy.get("body").then(($body) => {
         if ($body.find(this.projectThreeDotIcon).length) {
           return this.projectThreeDotIcon;
         }
         return false;
       }).then((selector) => {
         if (selector) {
            basePage.clickOnElement(cy.get(this.projectThreeDotIcon));
            cy.wait(TIMEOUT.veryShortTimeout);
            basePage.selectElementFromAnotherDropdown(PROJECTDROPDOWNOPTION.Delete_Project);
            basePage.elementVisibility(cy.xpath(this.deletePermanent));
            basePage.clickOnElement(cy.xpath(this.deletePermanent));
            cy.wait(TIMEOUT.shortTimeout);
         }
       });
   }

   fillProjectName(name){
    // fill project name 
    basePage.elementVisibility(cy.get(this.projectNameInput));
    basePage.typeElementText(cy.get(this.projectNameInput),name);
   }

   fillNotes(){
      cy.wait(TIMEOUT.veryShortTimeout);
      // fill project name 
      basePage.elementVisibility(cy.get(this.noteInput));
      basePage.typeElementText(cy.get(this.noteInput),'Adding note');
   }

   inviteNonRegisterUser(name){
      basePage.clickOnElement(cy.xpath(this.projectOwnerInput),0,{force:true});
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.typeElementWithoutClear(cy.xpath(this.projectOwnerInput),name,0,{force:true});
      cy.wait(TIMEOUT.veryShortTimeout);
      // click on invite email button 
      basePage.clickOnElement(cy.get(this.inviteEmailUserButton),0,{force:true});
      cy.wait(TIMEOUT.shortTimeout);
      basePage.clickOnElement(cy.get(this.inviteButton));
      cy.wait(TIMEOUT.shortTimeout);
   }

   selectOwnerNameFromDropdown(name){
      basePage.clickOnElement(cy.xpath(this.projectOwnerInput),0,{force:true});
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.typeElementWithoutClear(cy.xpath(this.projectOwnerInput),name,0,{force:true});
      cy.wait(TIMEOUT.veryShortTimeout);
      // verify invite button
      basePage.selectElementFromDropdown(name);
      let string = '';
      // if mail is so much longer then truncate(cut) it like this someone@gmail... 
      // check the mail length
      if(name.length > 28){
         string = name.substring(0, 28);
         // if the substring contain '.' at the end then add only '..' on it 
         // like substring = someone@gmail. then add '..' 
         // Final result is someone@gmail...
         // Else add '...' dot
         if(string.substring(string.length - 1) === '.'){
            string = string + '...';
         }else {
            string = string + '...';
         } 
      }else {
         string = name;
      }
      basePage.elementTextExist(cy.xpath(this.projectOwnerInputSpan),string);
   }

   fillDates(startDate,endDate){
      
      let splitedStartDate = startDate.split('-');
      let splitedEndDate = endDate.split('-');
       // Get month in english 
       let start_month = getMonthName(splitedStartDate[1]);
       let start_year = splitedStartDate[0];
       let start_day = splitedStartDate[2];

       // Get month in english 
       let end_month = getMonthName(splitedEndDate[1]);
       let end_year = splitedEndDate[0];
       let end_day = splitedEndDate[2];
       cy.wait(TIMEOUT.shortTimeout);
      //  click on start date input 
       basePage.clickOnElement(cy.get(this.startLineInput));
      //  click on  month input 
       basePage.clickOnElement(cy.get(this.monthPickerBth));
      //  select month 
       basePage.clickOnElement(cy.get('tbody > tr > td.ant-picker-cell-in-view > div:contains("'+start_month+'")'));
       // click on year input
       basePage.clickOnElement(cy.get(this.yearPickerBth));
       // select year
       basePage.clickOnElement(cy.get('tbody > tr > td.ant-picker-cell-in-view > div:contains("'+start_year+'")'));
       // select day
       basePage.clickOnElement(cy.get('tbody > tr > td.ant-picker-cell-in-view > div:contains("'+start_day.replace(/^0+/, "")+'")'));
       // verify start input date
       basePage.elementHaveValue(cy.get(this.startLineInput), startDate );
       cy.wait(TIMEOUT.veryShortTimeout);

       //  click on dead date input 
       basePage.clickOnElement(cy.get(this.deadLineInput));
      //  click on  month input 
       basePage.clickOnElement(cy.get(this.monthPickerBth),1);
      //  select month 
       basePage.clickOnElement(cy.get('tbody > tr > td.ant-picker-cell-in-view > div:contains("'+end_month+'")'));
       // click on year input
       basePage.clickOnElement(cy.get(this.yearPickerBth),1);
       // select year
       basePage.clickOnElement(cy.get('tbody > tr > td.ant-picker-cell-in-view > div:contains("'+end_year+'")'));
       // select day
       basePage.clickOnElement(cy.get('tbody > tr > td.ant-picker-cell-in-view > div:contains("'+end_day.replace(/^0+/, "")+'"):visible'));
       // verify dead input date
       basePage.elementHaveValue(cy.get(this.deadLineInput), endDate );
    
   }

   addProjectWithRequiredField(projectName){
     cy.fixture('loginCredential.json').then((user)=>{
        cy.wait(TIMEOUT.shortTimeout);
        // fill project name 
        this.fillProjectName(projectName)
        // fill project owner 
        this.selectOwnerNameFromDropdown(user.username);
        // fill dates 
        let startDate = dayjs().format("YYYY-MM-DD");
        let endDate = dayjs().add(1, 'day').format("YYYY-MM-DD");
        this.fillDates(startDate, endDate)
        // verify create button is enabled 
        basePage.elementNotDisabled(cy.xpath(basePage.createButton));
        basePage.clickOnElement(cy.xpath(basePage.createButton));
        basePage.elementExist(cy.get('[test-id="card"] > div > h2:contains("'+projectName+'")'));

    })  
   }

   addProjectWithAllFields(projectName){
      cy.fixture('loginCredential.json').then((user)=>{
       cy.fixture('userData.json').then((data)=>{
         cy.wait(TIMEOUT.shortTimeout);
         // fill project name 
         this.fillProjectName(projectName)
         // fill project owner 
         this.selectOwnerNameFromDropdown(user.username);
         // fill dates 
         let startDate = dayjs().format("YYYY-MM-DD");
         let endDate = dayjs().add(1, 'day').format("YYYY-MM-DD");
         this.fillDates(startDate, endDate)
         // fill notes 
         this.fillNotes();
         // verify create button is enabled 
         basePage.elementNotDisabled(cy.xpath(basePage.createButton));
         basePage.clickOnElement(cy.xpath(basePage.createButton));
         basePage.elementExist(cy.get('[test-id="card"] > div > h2:contains("'+projectName+'")'));
         
       })  
     })  
    }

   deleteProjectFunc(deleteName =PROJECTDROPDOWNOPTION.Delete_Project ){
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.selectElementFromAnotherDropdown(deleteName);
      basePage.elementVisibility(cy.xpath(this.deletePermanent));
      basePage.clickOnElement(cy.xpath(this.deletePermanent));
   } 

   deleteProject(projectName,projectNumber = 0){
      cy.wait(TIMEOUT.shortTimeout);
      basePage.clickOnElement(cy.get(this.projectThreeDotIcon), projectNumber);
      this.deleteProjectFunc();
      basePage.elementNotExist(cy.get('[test-id="card"] > div > h2:contains("'+projectName+'")'));
   }

   deleteAllCards(){
      cy.wait(TIMEOUT.shortTimeout);
      cy.get("body").then(($body) => {
         if ($body.find(this.projectThreeDotIcon).length) {
           return this.projectThreeDotIcon;
         }
         return false;
       }).then((selector) => {
         if (selector) {
            cy.get(this.projectThreeDotIcon).then(($value) => {
               // fetch lenght 
               length = $value.length
              
               for (let index = 0; index < length; index++) {
                 basePage.clickOnElement(cy.get(this.projectThreeDotIcon));
                 cy.wait(TIMEOUT.veryShortTimeout);
                 basePage.selectElementFromAnotherDropdown(PROJECTDROPDOWNOPTION.Delete_Project);
                 basePage.elementVisibility(cy.xpath(this.deletePermanent));
                 basePage.clickOnElement(cy.xpath(this.deletePermanent));
                 cy.wait(TIMEOUT.shortTimeout);
               }
           })
         }
       });

      
   }

   shareProject(projectNumber = 0){
      cy.wait(TIMEOUT.shortTimeout);
      basePage.clickOnElement(cy.get(this.projectThreeDotIcon), projectNumber);
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.selectElementFromAnotherDropdown(PROJECTDROPDOWNOPTION.Share);
      // verify resourceLink 
      basePage.elementVisibility(cy.get(this.resourceLink));
      // select copy link 
      cy.get(this.copyLinkButton).prev().children('input').then(($elem)=>{
         cy.visit($elem.val());
         // verify 
         basePage.elementExist(cy.get(this.viewOnlyText));
      })
   }

   makeShareLinkCopy(username){
        basePage.clickOnElement(cy.xpath('//button[normalize-space()="Make a copy"]'));
        basePage.verifyToast('Copy created successfully');
        // verify 
        basePage.elementExist(cy.get(projectPlanDetailPage.projectPlanTab));
        basePage.elementExist(cy.get(this.resourceTab));
        basePage.clickOnElement(cy.get(this.resourceTab));
        basePage.elementExist(cy.xpath('//div[normalize-space()="People"]/following-sibling::div/div[normalize-space()="'+username.substr(0, 2)+'"]'))
        basePage.elementExist(cy.xpath('//div[normalize-space()="Project tools"]/following-sibling::div/span[normalize-space()="Project Plan"]')) 
   }

   addPeopleIntoResource(username){
      basePage.clickOnElement(cy.xpath(this.addPeopleButton));
      basePage.elementVisibility(cy.get(this.addPeopleInput));
      cy.wait(TIMEOUT.shortTimeout);
      cy.get("body").then(($body) => {
        if ($body.find('div.peopleHeight > div > button.addedButton').length) {
          basePage.clickOnElement(cy.get('div.peopleHeight > div > button.addedButton'))
        }
      })
      
      basePage.typeElementText(cy.get(this.addPeopleInput),  username );
      cy.wait(TIMEOUT.veryShortTimeout);
      // select the people 
      basePage.clickOnElement(cy.get('div.peopleHeight > div > button')); 
      basePage.clickOnElement(cy.xpath(basePage.saveButton));
      cy.wait(TIMEOUT.veryShortTimeout);
      // verify name
      basePage.elementExist(cy.xpath('//div[normalize-space()="People"]/following-sibling::div/div[normalize-space()="'+username.substr(0, 2)+'"]'))
      
   }

   addToolIntoResource(){
      basePage.clickOnElement(cy.xpath(this.addToolButton));
      basePage.elementVisibility(cy.get(this.addToolInput));
      cy.wait(TIMEOUT.shortTimeout);
      cy.get("body").then(($body) => {
         if ($body.find('div.peopleHeight > div > span > span.ant-tag-close-icon').length) {
           basePage.clickOnElement(cy.get('div.peopleHeight > div > span > span.ant-tag-close-icon'))
         }
       })
      basePage.typeElementText(cy.get(this.addToolInput),  'Project Plan' );
      cy.wait(TIMEOUT.veryShortTimeout);
      // select the tool 
      basePage.clickOnElement(cy.get('div:contains("Project Plan")').parent('div').next('button')); 
      basePage.clickOnElement(cy.xpath(basePage.saveButton),1);
      cy.wait(TIMEOUT.veryShortTimeout);
      // verify name
      basePage.elementExist(cy.xpath('//div[normalize-space()="Project tools"]/following-sibling::div/span[normalize-space()="Project Plan"]')) 
   }

   addProjectDocsIntoResource(){
      cy.get(this.uploadDocsInput).selectFile("cypress/fixtures/files/images.png", {
         force:true
      });
      basePage.elementExist(cy.get(this.uploadDocsInfo));
   }

   deleteProjectDocsIntoResource(){
      basePage.clickOnElement(cy.get(this.removeDocsButton), 0, {force:true});
      basePage.elementNotExist(cy.get(this.uploadDocsInfo));
   }

   renameProjectFunc(projectName){
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.selectElementFromAnotherDropdown(PROJECTDROPDOWNOPTION.Rename);
      basePage.elementVisibility(cy.get(this.projectRenumeInput));
      basePage.typeElementText(cy.get(this.projectRenumeInput) ,projectName);
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.clickOnElement(cy.xpath(basePage.saveButton));
   }
   
   renameProject(projectNumber = 0){  
      let project_Name = setProjectName();
      cy.wait(TIMEOUT.shortTimeout);
      basePage.clickOnElement(cy.get(this.projectThreeDotIcon), projectNumber);
      this.renameProjectFunc(project_Name);
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.elementExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
   }

   archiveProjectFunc(){
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.selectElementFromAnotherDropdown(PROJECTDROPDOWNOPTION.Archive_Plan);
      basePage.elementVisibility(cy.xpath(this.sendToArchiveButton));
      basePage.clickOnElement(cy.xpath(this.sendToArchiveButton));
      cy.wait(TIMEOUT.shortTimeout);
   }

   archiveProject(projectNumber = 0){ 
         let project_Name = getProjectName(); 
         cy.wait(TIMEOUT.shortTimeout);
         basePage.clickOnElement(cy.get(this.projectThreeDotIcon), projectNumber);
         this.archiveProjectFunc();
         basePage.elementNotExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
   }

   unArchiveProject(projectNumber = 0){
         let project_Name = getProjectName();  
         cy.wait(TIMEOUT.shortTimeout);
         basePage.clickOnElement(cy.get(this.filterPlan));
         cy.wait(TIMEOUT.veryShortTimeout);
         basePage.elementVisibility(cy.get('label.ant-checkbox-wrapper > span:contains("'+PROJECTFILTEROPTION.Archive+'")'));
         basePage.clickOnElement(cy.get('label.ant-checkbox-wrapper > span:contains("'+PROJECTFILTEROPTION.Archive+'")'));
         basePage.clickOnElement(cy.xpath(basePage.closeButton));
         basePage.elementExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
         cy.wait(TIMEOUT.shortTimeout);
         basePage.clickOnElement(cy.get(this.projectThreeDotIcon), projectNumber);
         cy.wait(TIMEOUT.veryShortTimeout);
         basePage.selectElementFromAnotherDropdown('Unarchive Plan');
         basePage.elementVisibility(cy.xpath(this.sendToUnarchiveButton));
         basePage.clickOnElement(cy.xpath(this.sendToUnarchiveButton));
         basePage.elementNotExist(cy.get('[test-id="card"] > div > h2:contains("'+project_Name+'")'));
   }


}