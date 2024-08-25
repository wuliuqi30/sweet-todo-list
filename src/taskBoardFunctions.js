import {getRandomColor} from './general-functions.js';

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

};



export{updateTaskBoard};