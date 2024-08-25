import {Project} from './Project.js';

const app = (function(){
    const projectList = [];
    let taskId = -1; 
    let projectId = -1;

    projectList[0] = new Project('general-tasks',0);

    console.log('created app IIFE');

    const addProject = (project) => {
        projectId++;
        project.id = projectId;
        projectList.push(project);
        
    }

    const getProjectByName = (name) =>{
        return projectList.find((item)=>item.name === name);
    }

    const addTaskToProject = (task,projectName) => {
        // Find project.name in projectList.
        const projectIdx = projectList.findIndex(proj => proj.name === projectName);
        // If found, put task in it.
        if (projectIdx > -1){
            projectList[projectIdx].addToDoItem(task); 
        } else { // If not found, put in general (which is always the 0th project in projectList)
            projectList[0].addToDoItem(task); 
        }        
    }



    const getMostRecentTaskId = () =>{
        return taskId;
    }

    const getNewTaskId = () => {
        return ++taskId;
    }

    return {projectList, 
        addTaskToProject, 
        getMostRecentTaskId, 
        getNewTaskId, 
        addProject, 
        getProjectByName }
})();

export {app};