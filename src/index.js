import "./styles.css";
import {ToDoItem} from './ToDoItem.js';
import {Project} from './Project.js';
import {timeDelay} from './general-functions.js';

window.ToDoItem = ToDoItem;
window.Project = Project;

const project1 = new Project('general', 20);
const item1 = new ToDoItem('Laundry',1);
// console.log(item1.creationTime);
// console.log('This is between creation and getting the age');
// console.log(`${item1.getAgeInMs()}ms`); 
project1.addToDoItem(item1);
// project1.addToDoItem(item1);
// console.log('changing item 1 priority to urgent');
// item1.priority = 'urgent';
// project1.viewList();
// console.log(item1.priority);
// console.log('changing back to normal')
// item1.priority = 'normal';
// project1.viewList();
// console.log(item1.priority);
// console.log('modifying the item through the project');
// project1.toDoList
// console.log(project1.getItem(1).task);
// console.log('mofidying item task name in the list itself');
// project1.getItem(1).task = 'poopy';
// console.log(project1.getItem(1).task);
// project1.viewList();

// project1.viewList();


const item2 = new ToDoItem('Eat Breakfast',43,'Eat a scrumptious breakfast','2024-08-23',3,'general');
project1.addToDoItem(item2 );
timeDelay(10000);
const item3 = new ToDoItem('Eat Lunch',48,'Eat a scrumptious lunch','2024-08-23',2,'general')

project1.addToDoItem(item3 );
project1.sortByAge();
project1.sortByPriority();
project1.sortByAge();
// project1.deleteToDoItem(43);
// project1.deleteToDoItem(1);
// project1.deleteToDoItem(45);
// project1.deleteToDoItem(1);
// project1.deleteToDoItem(1);
// project1.deleteToDoItem(43);


const project2 = new Project('school', 40);

const item4 = new ToDoItem('Eat Dinner',78,'Eat a scrumptious dinner','2024-08-23',2,'general')
project2.addToDoItem(item4);

project1.viewIds();
project2.viewIds();
Project.transferItemBetweenProjects(project1, project2, 43);
project1.viewIds();
project2.viewIds();
