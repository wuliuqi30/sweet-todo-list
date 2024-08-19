import "./styles.css";
import {ToDoItem} from './ToDoItem.js';
import {Project} from './Project.js';

const project1 = new Project('general', 20);
const item1 = new ToDoItem('Laundry',1);
console.log(item1.creationTime);
console.log('This is between creation and getting the age');
console.log(`${item1.getAgeInMs()}ms`); 
project1.addToDoItem(item1);
console.log(project1.toDoList);

