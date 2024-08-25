import "./styles.css";
import { ToDoItem } from './ToDoItem.js';
import { Project } from './Project.js';
import { timeDelay } from './general-functions.js';
import { format, compareAsc } from "date-fns";
import { createHeader } from "./createHeader.js";
import { createTaskForm, openTaskEditForm, clearTaskEditForm, updateTaskForm,createCloseTaskFormEventListener } from './taskFormFunctions.js';
import { openProjectEditForm, clearProjectEditForm, createProjectForm,createProjectFormEventListener } from './projectFormFunctions.js';
import { updateTaskBoard } from './taskBoardFunctions.js';


window.ToDoItem = ToDoItem;
window.Project = Project;
window.updateTaskBoard = updateTaskBoard;

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


app.addTaskToProject(new ToDoItem('Laundry', 'Do all the clothes', new Date(2024, 9, 1), 2), app.projectList[0].name);
updateTaskBoard(app.projectList[0]);
app.addTaskToProject(new ToDoItem('Eat', 'Do all the clothes', new Date(2025, 9, 1), 2), app.projectList[0].name);
updateTaskBoard(app.projectList[0]);
app.addTaskToProject(new ToDoItem('Poop', 'Do all the clothes', new Date(2024, 10, 1), 2), app.projectList[0].name);
updateTaskBoard(app.projectList[0]);
app.addTaskToProject(new ToDoItem('Do Stuff', 'Do all the clothes', new Date(2024, 9, 1), 2), app.projectList[0].name);
updateTaskBoard(app.projectList[0]);


app.addProject(new Project('school'));
app.addProject(new Project('housework'));

app.addTaskToProject(new ToDoItem('Laundry', 'Do all the clothes', new Date(2024, 9, 1), 2), 'school');
updateTaskBoard(app.getProjectByName('school'));
app.addTaskToProject(new ToDoItem('Eat', 'Do all the clothes', new Date(2025, 9, 1), 2), 'school');
updateTaskBoard(app.getProjectByName('school'));

app.addTaskToProject(new ToDoItem('Laundry', 'Do all the clothes', new Date(2024, 9, 1), 2), 'housework');
updateTaskBoard(app.getProjectByName('housework'));


app.deleteProject(1);
// console.log(format(new Date(2014, 1, 11), "MM/dd/yyyy"));
// //=> '02/11/2014'

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
// // ]

// window.ToDoItem = ToDoItem;
// window.Project = Project;
// window.format = format;
// window.compareAsc = compareAsc;

// const project1 = new Project('general', 20);
// const item1 = new ToDoItem('Laundry',1,'do the laundry',new Date(2024,7,24),1);
// // console.log(item1.creationTime);
// // console.log('This is between creation and getting the age');
// // console.log(`${item1.getAgeInMs()}ms`); 
// project1.addToDoItem(item1);
// // project1.addToDoItem(item1);
// // console.log('changing item 1 priority to urgent');
// // item1.priority = 'urgent';
// // project1.viewList();
// // console.log(item1.priority);
// // console.log('changing back to normal')
// // item1.priority = 'normal';
// // project1.viewList();
// // console.log(item1.priority);
// // console.log('modifying the item through the project');
// // project1.toDoList
// // console.log(project1.getItem(1).task);
// // console.log('mofidying item task name in the list itself');
// // project1.getItem(1).task = 'poopy';
// // console.log(project1.getItem(1).task);
// // project1.viewList();

// // project1.viewList();

// const item2 = new ToDoItem('Eat Breakfast',43,'Eat a scrumptious breakfast',new Date(2024,7,28),2,'general');
// project1.addToDoItem(item2 );
// timeDelay(10000);
// const item3 = new ToDoItem('Eat Lunch',48,'Eat a scrumptious lunch',new Date(2024,8,1),3,'general')

// project1.addToDoItem(item3);
// // project1.sortByAge();
// project1.sortByPriority();
// // project1.sortByAge();
// project1.sortByDeadline();


// const project2 = new Project('school', 40);

// const item4 = new ToDoItem('Eat Dinner',78,'Eat a scrumptious dinner','2024-08-23',2,'general')
// project2.addToDoItem(item4);

// project1.view('id');
// project2.view('id');
// Project.transferItemBetweenProjects(project1, project2, 43);
// project1.view('id');
// project2.view('id');
// Project.transferItemBetweenProjects(project2, project1, 43);

// Project.transferItemBetweenProjects(project2, project1, 43);

