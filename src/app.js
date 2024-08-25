import {Project} from './Project.js';

const app = (function(){
    const projectList = [];
    let taskId = -1; 
    let projectId = -1;

   

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

    const getProjectIndexFromId = (id) => {
        return projectList.findIndex(item=>item.id === id);
    }

    const addTaskToProject = (task,projectName) => {
        // Find project.name in projectList.
        const projectIdx = projectList.findIndex(proj => proj.name === projectName);
        task.id = getNewTaskId();
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

    const printState = () => {
        console.log('-------------------------------------------------------------------')
        console.log(`State of the Application. Number of projects: ${projectList.length}`)
        
        for (let p = 0; p < projectList.length; p++){
            console.log(`Project Name: ${projectList[p].name}, id: ${projectList[p].id}`)
            console.log('Items in this project:');
            console.table(projectList[p].viewList());
            
        }
    }

    return {projectList, 
        addTaskToProject, 
        getMostRecentTaskId, 
        getNewTaskId, 
        addProject, 
        getProjectByName,
        printState,
        deleteProject }
})();

export {app};