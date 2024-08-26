import {Project} from './Project.js';
import {getRandomColor} from './general-functions.js';

const app = (function(){
    const projectList = [];
    let taskId = -1; 
    let projectId = -1;
    let currentProjectDisplayedId = 0;  // default is 0, which is general-tasks

   

    console.log('created app IIFE');

    const addProject = (project) => {
        projectId++;
        project.id = projectId;
        projectList.push(project);
        
    }

    const deleteProject = (pId) => {
        const projIndex = getProjectIndexFromId(pId);
        
        console.log(`Deleting Project ${projectList[projIndex].name} from application. All tasks within will be deleted.`)
        projectList.splice(projIndex,1);
        printState();
    }

    addProject(new Project('general-tasks'));

    const getProjectByName = (name) =>{
        return projectList.find((item)=>item.name === name);
    }

    const getProjectById = (id) => {
        return projectList.find((item)=>item.id === id);
    }

    const getProjectIndexFromId = (id) => {
        return projectList.findIndex(item=>item.id === id);
    }
    
    const getCurrentDisplayedProject = () => {
        return getProjectById(getCurrentProjectId())
    }

    const addToDoItemToProject = (toDoItem,projectName) => {
        // Find project.name in projectList.
        const projectIdx = projectList.findIndex(proj => proj.name === projectName);
        toDoItem.id = getNewTaskId();
        toDoItem.color = getRandomColor();
        
        // If found, put toDoItem in it.
        if (projectIdx > -1){
            projectList[projectIdx].addToDoItem(toDoItem); 
        } else { // If not found, put in general (which is always the 0th project in projectList)
            projectList[0].addToDoItem(toDoItem); 
        }        
    }



    const getMostRecentTaskId = () =>{
        return taskId;
    }

    const getNewTaskId = () => {
        return ++taskId;
    }

    const printState = () => {
        console.log('-------------------------------------------------------------------')
        console.log(`State of the Application. Number of projects: ${projectList.length}`)
        
        for (let p = 0; p < projectList.length; p++){
            console.log(`Project Name: ${projectList[p].name}, id: ${projectList[p].id}`)
            console.log('Items in this project:');
            console.table(projectList[p].viewList());
            
        }
    }

    const setCurrentProjectId = (id) => {
        currentProjectDisplayedId = id;
    }

    const getCurrentProjectId = () => {
        return currentProjectDisplayedId;
    }

    return {projectList, 
        addToDoItemToProject, 
        getMostRecentTaskId, 
        getNewTaskId, 
        addProject, 
        getProjectByName,
        getProjectById,
        getProjectIndexFromId,
        getCurrentDisplayedProject,
        printState,
        deleteProject,
        setCurrentProjectId,
        getCurrentProjectId}
})();

export {app};