import { Project } from './Project.js';
import { getRandomColor } from './general-functions.js';
import { createTaskForm, createCloseTaskFormEventListener } from './taskFormFunctions.js';
import { createProjectForm, createProjectFormEventListener } from './projectFormFunctions.js';
import { updateTaskBoard, updateProjectDisplay } from './taskBoardFunctions.js';

import { format, compareAsc } from "date-fns";
import { ToDoItem } from './ToDoItem.js';

// Nothing in this IIFE will update the display directly.
const app = (function () {
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
        projectList.splice(projIndex, 1);
        printState();
    }

    addProject(new Project('general-tasks'));

    const getProjectByName = (name) => {
        return projectList.find((item) => item.name === name);
    }

    const getProjectById = (id) => {
        return projectList.find((item) => item.id === id);
    }

    const getProjectIndexFromId = (id) => {
        return projectList.findIndex(item => item.id === id);
    }

    const getCurrentDisplayedProject = () => {
        return getProjectById(getCurrentProjectId())
    }

    const addToDoItemToProject = (toDoItem, projectName) => {
        // Find project.name in projectList.
        const projectIdx = projectList.findIndex(proj => proj.name === projectName);
        toDoItem.id = getNewTaskId();
        toDoItem.color = getRandomColor();

        // If found, put toDoItem in it.
        if (projectIdx > -1) {
            projectList[projectIdx].addToDoItem(toDoItem);
        } else { // If not found, put in general (which is always the 0th project in projectList)
            projectList[0].addToDoItem(toDoItem);
        }
    }

    const modifyToDoItem = (toDoItemId,projectName, taskName,description,deadline,priority) => {
        const proj = getProjectByName(projectName);
        const item = getTaskFromId(toDoItemId);
        item.task = taskName;
        item.description = description;
        item.deadline = deadline;
        item.priority = priority;
        Project.transferItemBetweenProjects( getProjectByName(item.project),proj,toDoItemId);
    }

    const getMostRecentTaskId = () => {
        return taskId;
    }

    const getNewTaskId = () => {
        return ++taskId;
    }

    const printState = () => {
        console.log('-------------------------------------------------------------------')
        console.log(`State of the Application. Number of projects: ${projectList.length}`)

        for (let p = 0; p < projectList.length; p++) {
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

    const getAllTasks = () => {
        let taskArray = [];
        for (let p = 0; p < projectList.length; p++) {
            const proj = projectList[p];
            taskArray = [...taskArray, ...proj.toDoList];
        }
        return taskArray;
    }

    const getTaskFromId = (id) => {
        // Look through all projects and look for the task
        const allTasks = getAllTasks();
        return allTasks.find(item => item.id === id);
    }

    const getUpcomingTasks = (n, whichProjects) => {
        // Find the n tasks among all of your projects that have the soonest deadline.

        // n: any integer greater than 0
        // whichProjects: either 'all' or a specific project name


        // Put all tasks in one giant list:
        // if (whichProjects !== 'all'){
        //     // Get n most pressing tasks of this particular project.
        //     const thisProj = getProjectByName(whichProjects);
        // }

        // For now, return from all projects. Later can implement individual projects:
        let taskArray = getAllTasks();
        console.log('All tasks');
        console.table(taskArray);
        let filteredByNull = taskArray.filter(item => item.deadline)
        console.log('All tasks (filtered by null deadlines but unsorted):')
        console.table(filteredByNull);
        filteredByNull.sort((a, b) => {return compareAsc(a.deadline, b.deadline)});
        console.log('All tasks (sorted):')
        console.table(filteredByNull);
        let filteredByCompletionArray = filteredByNull.filter(item=>!item.completeStatus);
        // const dates = [
        //   new Date(1995, 6, 2),
        //   new Date(1987, 1, 11),
        //   new Date(1989, 6, 10),
        // ];
        // console.log(dates.sort(compareAsc));
        // //=> [
        // //   Wed Feb 11 1987 00:00:00,
        // //   Mon Jul 10 1989 00:00:00,
        // //   Sun Jul 02 1995 00:00:00
        // // 
        let returnVal = null;

        // If there was any result from the filtering, return that. if not, returns null.
        if (filteredByCompletionArray){
         returnVal = filteredByCompletionArray.slice(0,n);
        } 
        return returnVal;
    }

    const overwriteFromLocalStorage = (appData) => {
        // From the appData object, overwrite all the data on projects and tasks into here: 
        taskId = appData.taskId
        projectId = appData.projectId;
        currentProjectDisplayedId = appData.currentProjectDisplayedId;
        // Project
        for (let p = 0; p<appData.projectList.length; p++){
            const thisProj = appData.projectList[p];
            projectList[p] = new Project(thisProj.name);
            projectList[p].id = thisProj.id;

            // Tasks in project:
            const tasksList = appData.projectList[p].tasks;
            for (let t = 0; t < tasksList.length; t ++ ){
                const thisTask = tasksList[t];

                
                let deadline = thisTask.deadline;
                if (!deadline){
                    deadline = null;
                } else {
                    deadline = new Date(Number(deadline.slice(0,4)),Number(deadline.slice(5,7)),Number(deadline.slice(8,10)));
                }
                const creationTime = thisTask.creationTime;

                const newToDoItem = new ToDoItem(
                    thisTask.task,
                    thisTask.description,
                    deadline,
                    thisTask.priority
                );
                
                newToDoItem.id = thisTask.id;
                newToDoItem.creationTime = new Date(Number(creationTime.slice(0,4)),Number(creationTime.slice(5,7)),Number(creationTime.slice(8,10)));
                newToDoItem.priorityName = thisTask.priorityName;
                newToDoItem.project = thisTask.project;

                newToDoItem.complete = thisTask.complete;
                
                newToDoItem.constructorWarningFlag = thisTask.constructorWarningFlag; // Set this to true if anything goes wrong in the construction of this object
                newToDoItem.constructorWarningInfo = thisTask.constructorWarningInfo;
                newToDoItem.modifyWarningFlag = thisTask.modifyWarningFlag; // Set this to true if a mistake may have been made when modifying this item.
                newToDoItem.modifyWarningInfo = thisTask.modifyWarningInfo;
                newToDoItem.color = thisTask.color;

                projectList[p].addToDoItem(newToDoItem);
                

            }

        }
        
    }

    const toJSON = () => {
        return {
            projectList: projectList,
            taskId: taskId,
            projectId: projectId, 
            currentProjectDisplayedId:currentProjectDisplayedId
        }
    }

    return {
        projectList,
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
        getCurrentProjectId,
        getUpcomingTasks,
        modifyToDoItem,
        getTaskFromId,
        toJSON,
        overwriteFromLocalStorage
    }
})();

export { app };