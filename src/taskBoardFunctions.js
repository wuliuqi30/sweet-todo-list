import { getRandomColor } from './general-functions.js';
import { app } from './app.js';
import { Project } from './Project.js';
import { sizeParams } from './globals.js';

function createNewTaskBoard() {

    const taskProjectBoard = document.querySelector('.tasks-projects-display');

    const taskBoard = document.createElement('div');
    taskProjectBoard.appendChild(taskBoard);
    taskBoard.classList.add('tasks-board');

    const width = calculateTaskBoardWidth(app.projectList.length);
    taskBoard.style.width = `${width}px`;

    const header = document.createElement('h2');
    header.classList.add('tasks-header');
    taskBoard.appendChild(header);

    const incompleteBoard = document.createElement('div');
    incompleteBoard.classList.add('incomplete-tasks-board');
    taskBoard.appendChild(incompleteBoard);

    const completedBoard = document.createElement('div');
    completedBoard.classList.add('complete-tasks-board');
    taskBoard.appendChild(completedBoard);
}

function updateTaskBoard(project) {
    // This function will be kicked off by a clicking a button which contains the name of the project. 


    const header = document.querySelector('.tasks-header');
    header.textContent = project.name;

    // Update incomplete tasks board

    const incompleteBoard = document.querySelector('.incomplete-tasks-board');
    incompleteBoard.innerHTML = '';

    const incompleteItems = project.incompleteItems;

    for (let i = 0; i < incompleteItems.length; i++) {
        const toDoItem = incompleteItems[i];
        addStickyNoteToTaskBoard(toDoItem, 'incomplete');
    }

    // Update completed tasks board
    const completedBoard = document.querySelector('.complete-tasks-board');
    completedBoard.innerHTML = '';

    const completeItems = project.completedItems;

    for (let i = 0; i < completeItems.length; i++) {
        const toDoItem = completeItems[i];
        addStickyNoteToTaskBoard(toDoItem, 'completed');
    }



}


function addStickyNoteToTaskBoard(toDoItem, boardSelect) {

    let taskBoard = null;
    if (boardSelect === 'incomplete') {
        taskBoard = document.querySelector('.incomplete-tasks-board');
    } else {
        taskBoard = document.querySelector('.complete-tasks-board');
    }


    // Create the sticky note
    const stickyNote = document.createElement('div');
    taskBoard.appendChild(stickyNote);
    stickyNote.classList.add('sticky-note');
    stickyNote.style.backgroundColor = toDoItem.color;

    // Title: task name
    const title = document.createElement('p');
    stickyNote.appendChild(title);
    title.textContent = toDoItem.task;


    const descrip = document.createElement('p');
    stickyNote.appendChild(descrip);
    if (toDoItem.description) {
        descrip.textContent = toDoItem.description;
    }
    const deadline = document.createElement('p');
    stickyNote.appendChild(deadline);
    if (toDoItem.deadline) {
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
        // updateTaskBoard(app.getProjectByName(toDoItem.project));
        updateTaskProjectDisplay();
    });

    const completeButton = document.createElement('button');
    deleteCompleteRow.appendChild(completeButton);

    if (boardSelect === 'incomplete') {
        completeButton.textContent = 'Complete?';
    } else {
        completeButton.textContent = 'Reset as incomplete?';
    }

    completeButton.addEventListener('click', (event) => {
        // Toggle its completeness state.
        toDoItem.completeStatus = !toDoItem.completeStatus;
        // Then refresh the display to reflect the item's new status: 
        updateTaskBoard(app.getProjectById(app.getCurrentProjectId()));
    })

    // Change Project Select:
    const inputRowNew = document.createElement('div');
    inputRowNew.classList.add('input-row');
    stickyNote.appendChild(inputRowNew);

    const changeProjLabel = document.createElement('label');
    changeProjLabel.textContent = 'Change Project?';
    changeProjLabel.setAttribute('for', 'change-project');
    inputRowNew.appendChild(changeProjLabel);

    const changeProjSelect = document.createElement('select');
    changeProjSelect.setAttribute('id', 'change-project');
    inputRowNew.appendChild(changeProjSelect);

    const optionChoose = document.createElement('option');
    changeProjSelect.appendChild(optionChoose);
    optionChoose.textContent = '--Change Project to--';

    optionChoose.setAttribute('value', 'none');

    const currentProjectIndex = app.getProjectIndexFromId(app.getCurrentProjectId());
    // Look at all current projects except the current one:
    for (let i = 0; i < app.projectList.length; i++) {
        if (i !== currentProjectIndex) {
            const option = document.createElement('option');
            changeProjSelect.appendChild(option);
            option.setAttribute('value', app.projectList[i].name);
            option.textContent = app.projectList[i].name;
        }
    }

    changeProjSelect.addEventListener('change', (event) => {
        let val = event.target.value;
        if (val !== 'none') {
            Project.transferItemBetweenProjects(app.getCurrentDisplayedProject(),
                app.getProjectByName(val), toDoItem.id);
            updateTaskBoard(app.getCurrentDisplayedProject());
        }

    })

};

function updateTaskProjectDisplay() {
    // | Task Board            |p|p|
    // |                       |r|r|
    // |                       |o|o|
    // |                       |j|j|
    const taskProjectDisplay = document.querySelector('.tasks-projects-display');

    taskProjectDisplay.innerHTML = '';

    const currentProjectInDisplayId = app.getCurrentProjectId();

    // Refresh the information in the task board. 

    const currentProjectIndex = app.getProjectIndexFromId(app.getCurrentProjectId());

    let reachedCurrentProject = false;
    for (let p = 0; p < app.projectList.length; p++) {

        // If this is before the current project, put the bar before task board: 
        if (p === currentProjectIndex) {
            createNewTaskBoard();
            updateTaskBoard(app.getCurrentDisplayedProject());
        } else {
            // For each project besides the one currently in the display,
            // put a sideways button
            const thisProj = app.projectList[p];

            const projectButton = document.createElement('button');
            projectButton.classList.add('rotated-project');
            projectButton.textContent = thisProj.name;
            projectButton.style.width = `${sizeParams.projectBarWidth}px`;
            taskProjectDisplay.appendChild(projectButton);
            projectButton.addEventListener('click', (event) => {
                // Refresh this whole display again, but with a new project as the current project
                app.setCurrentProjectId(thisProj.id);
                updateTaskProjectDisplay()
            });
        }
    }
}

function calculateTaskBoardWidth(numProjects) {
    // Get width of the entire display which is set in css
    const taskProjectBoard = document.querySelector('.tasks-projects-display');
    const totalWidth = taskProjectBoard.offsetWidth;
    return totalWidth - (numProjects - 1) * sizeParams.projectBarWidth;

}

export { createNewTaskBoard, updateTaskBoard, updateTaskProjectDisplay };