import {Project} from './Project.js';

const app = (function(){
    const projectList = [];
    projectList[0] = new Project('general-tasks',0);

    console.log('created app IIFE');

    const addTaskToProject = (task,projectName) => {
        // Find project.name in projectList.
        const projectIdx = projectList.findIndex(proj => proj.name === project);
        // If found, put task in it.
        if (projectIdx > -1){
            projectList[projectIdx].addToDoItem(task); 
        } else { // If not found, put in general (which is always the 0th project in projectList)
            projectList[0].addToDoItem(task); 
        }        
    }
})();

export {app};