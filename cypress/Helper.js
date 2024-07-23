import { faker } from "@faker-js/faker";

var projectName = '';

export const TIMEOUT = {
      clickTimeout : 10000,
      veryShortTimeout : 1000,
      shortTimeout : 3000,
      mediumTimeout: 15000,
      longTimeout : 30000,
      dropdownTimeout: 10000
}

export const PROJECTDROPDOWNOPTION = {
      Rename : 'Rename',
      Archive_Plan : 'Archive Plan',
      Share : 'Share',
      Delete_Project: 'Delete Project',
      
}

export const PROJECTFILTEROPTION = {
      Active : 'Active',
      Completed : 'Completed',
      Future : 'Future',
      Archive: 'Archive'
}

export const PROJECTSORTOPTION = {
      Name : 'Name',
      Startline : 'Startline',
      Deadline : 'Deadline',
      Goal_Progress: 'Goal Progress',
      Plan_Progress:'Plan Progress'
}

export function getFullMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);
      return  date.toLocaleString("en-US", { month: "long" }); // get month Name
      
}

export function getMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);
      return  date.toLocaleString("en-US", { month: "short" }); // get month Name
 }



 export function setProjectName(){
         projectName = faker.person.jobType();
         return projectName;
 }

 export function getProjectName(){
      return projectName;
 }
