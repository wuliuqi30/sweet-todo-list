import {getRandomColor} from './general-functions.js';
import { app } from './app.js';
import {Project} from './Project.js';

function updateTaskBoard(project){
    // This function will be kicked off by a clicking a button which contains the name of the project. 

    // Update Header
        // Delete current header.
    const header = document.querySelector('.tasks-header');
    header.textContent = project.name;

    // Update incomplete tasks board
    const incompleteBoard = document.querySelector('.incomplete-tasks-board');
    incompleteBoard.innerHTML = '';


    // let lastChild = incompleteBoard.lastChild;
    // while(lastChild){
    //     lastChild.remove();
    //     lastChild = incompleteBoard.lastChild;
    // }
    const incompleteItems = project.incompleteItems;

    for (let i = 0; i < incompleteItems.length; i++){
        const toDoItem = incompleteItems[i];
        addStickyNoteToTaskBoard(toDoItem,'incomplete');
    }

    // Update completed tasks board
    const completedBoard = document.querySelector('.complete-tasks-board');
    completedBoard.innerHTML = '';

    const completeItems = project.completedItems;

    for (let i = 0; i < completeItems.length; i++){
        const toDoItem = completeItems[i];
        addStickyNoteToTaskBoard(toDoItem,'completed');
    }
    
    app.printState();
}


function addStickyNoteToTaskBoard(toDoItem,boardSelect){

    let taskBoard = null;
    if (boardSelect === 'incomplete'){
        taskBoard = document.querySelector('.incomplete-tasks-board');
    } else {
        taskBoard = document.querySelector('.complete-tasks-board');
    }
    

    // Create the sticky note
    const stickyNote = document.createElement('div');
    taskBoard.appendChild(stickyNote);
    stickyNote.classList.add('sticky-note');
    stickyNote.style.backgroundColor = getRandomColor();

    // Title: task name
    const title = document.createElement('p');
    stickyNote.appendChild(title);
    title.textContent = toDoItem.task;


    const descrip = document.createElement('p');
    stickyNote.appendChild(descrip);
    if (toDoItem.description){
    descrip.textContent = toDoItem.description;
    }
    const deadline = document.createElement('p');
    stickyNote.appendChild(deadline);
    if (toDoItem.deadline){
    deadline.textContent = `Due ${toDoItem.deadline}`;
    }

    
    const priority = document.createElement('p');
    stickyNote.appendChild(priority);
    priority.textContent = `${toDoItem.priorityName} priority`;

    // Delete and Completed Buttons

    const deleteCompleteRow = document.createElement('div');
    stickyNote.appendChild(deleteCompleteRow);
    deleteCompleteRow.classList.add('input-row');

    const deleteButton = document.createElement('button');
    deleteCompleteRow.appendChild(deleteButton);
    deleteButton.textContent = 'Delete';

    // Clear the form and close the dialog when the "Cancel" button is clicked
    deleteButton.addEventListener('click', (event) => {
        // First delete the task from app
        app.getProjectByName(toDoItem.project).deleteToDoItem(toDoItem.id);
        // Second refresh the project page which will reflect the newly updated project without that task
        updateTaskBoard(app.getProjectByName(toDoItem.project));
    });

    // const complete = document.createElement('button');
    // submitRow.appendChild(submitButton);
    // submitButton.setAttribute('type', 'submit');
    // submitButton.setAttribute('id', 'confirmBtn');
    // submitButton.setAttribute('value', 'default');
    // submitButton.textContent = 'Confirm';

    // submitButton.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     if (!form.checkValidity()) {
    //         // If the form is not valid, prevent the dialog from closing

    //         form.reportValidity(); // Optionally display the validation messages
    //         return;
    //     }
    //     // If the form is valid, proceed with closing the dialog
    //     dialog.close('submit');
    // })
};



export{updateTaskBoard};