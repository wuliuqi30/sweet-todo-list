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
app.loadExample();