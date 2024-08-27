import "./styles.css";
import { ToDoItem } from './ToDoItem.js';
import { Project } from './Project.js';
import { createHeader } from "./createHeader.js";
import { createTaskForm,createCloseTaskFormEventListener } from './taskFormFunctions.js';
import {  createProjectForm,createProjectFormEventListener } from './projectFormFunctions.js';
import {refreshEverything} from './contentFunctions.js';
import {saveAllDataToLocalStorage,loadAllDataFromLocalStorage} from './localStorageFiles.js';

window.ToDoItem = ToDoItem;
window.Project = Project;
window.loadAllDataFromLocalStorage = loadAllDataFromLocalStorage;
window.saveAllDataToLocalStorage = saveAllDataToLocalStorage;
window.refreshEverything = refreshEverything;

// Create an 'app' object which keeps track of all the high level application information as an IIFE
import { app } from './app.js';

window.app = app;

// Create the project input form:
createProjectForm();
createProjectFormEventListener();

// Create the task input form (starts closed though):
createTaskForm();
createCloseTaskFormEventListener();

// Create the header which also creates the create task button
createHeader();

// Example:
// By default tasks go into the 'general-tasks' project:
app.addToDoItemToProject(new ToDoItem('Bills', 'Open the mail and pay the bills', new Date(2024, 9, 1), 2), app.projectList[0].name);
app.addToDoItemToProject(new ToDoItem('Eat', 'Make breakfast and eat it.', new Date(2024, 9, 4), 2), app.projectList[0].name);
app.addToDoItemToProject(new ToDoItem('Poop', 'Go to the toilet and do your duty.', new Date(2024, 10, 1), 2), app.projectList[0].name);
app.addToDoItemToProject(new ToDoItem('Go outside', 'Take a nice walk around the neighborhood', new Date(2024, 10, 12), 2), app.projectList[0].name);
app.addProject(new Project('school'));
app.addToDoItemToProject(new ToDoItem('Study for physics', 'Study chapters 2 and 3', new Date(2024, 11, 1), 2), 'school');
app.addToDoItemToProject(new ToDoItem('Study for chemistry', 'chaps 34 and 36', new Date(2025, 11, 12), 2), 'school');
app.addProject(new Project('work'));
app.addToDoItemToProject(new ToDoItem('Bring laptop', 'put laptop in bag to bring to work', new Date(2024, 6, 1), 2), 'work');
app.addToDoItemToProject(new ToDoItem('Clean work clothes', 'clean and iron shirt and pants', new Date(2024, 7, 1), 2), 'work');

refreshEverything();