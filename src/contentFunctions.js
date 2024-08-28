import { app } from './app.js';
import { Project } from './Project.js';
import { sizeParams } from './globals.js';
import { format, compareAsc } from "date-fns";
import { openTaskEditForm } from './taskFormFunctions.js';
import { openProjectEditForm } from './projectFormFunctions.js';

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
    incompleteBoard.classList.add('tasks-board');
    taskBoard.appendChild(incompleteBoard);


}

function updateTaskBoard(type = 'incomplete') {
    // or type could be 'completed'
    const project = app.getCurrentDisplayedProject();
    const header = document.querySelector('.tasks-header');
    header.innerHTML = '';

    const taskBoardTitle = document.createElement('div');
    taskBoardTitle.classList.add('task-board-title');
    header.appendChild(taskBoardTitle);
    // taskBoardTitle.textContent = `Project: `;

    const taskBoardTitleProjectName = document.createElement('span');
    taskBoardTitle.appendChild(taskBoardTitleProjectName);
    taskBoardTitleProjectName.textContent = project.name;
    taskBoardTitleProjectName.classList.add('acme-regular');

    // New Task Button
    const newTaskButton = document.createElement('button');
    header.appendChild(newTaskButton);
    newTaskButton.textContent = 'New Task';
    newTaskButton.classList.add('new-task-button');

    newTaskButton.addEventListener('click', (event) => {
        openTaskEditForm();
    });


    const toDoBoard = document.querySelector('.tasks-board');
    toDoBoard.innerHTML = '';
    toDoBoard.classList.remove('incomplete-board');
    toDoBoard.classList.remove('complete-board');

    const tasksTitle = document.querySelector('.tasks-board-descriptor');


    if (type === 'incomplete') {
        tasksTitle.textContent = 'Remaining Tasks: ';
        // Update incomplete tasks board
        toDoBoard.classList.add('incomplete-board');
        const incompleteItems = project.incompleteItems;

        for (let i = 0; i < incompleteItems.length; i++) {
            const toDoItem = incompleteItems[i];
            addStickyNoteToTaskBoard(toDoItem, 'incomplete');
        }
    } else {
        tasksTitle.textContent = 'Completed Tasks: ';
        // Update completed tasks board
        toDoBoard.classList.add('complete-board');
        const completeItems = project.completedItems;

        for (let i = 0; i < completeItems.length; i++) {
            const toDoItem = completeItems[i];
            addStickyNoteToTaskBoard(toDoItem, 'completed');
        }
    }

    const footerButton = document.querySelector('.toggle-completed-tasks-button');

    if (type === 'incomplete') {
        footerButton.textContent = 'View Completed Tasks';
        footerButton.addEventListener('click', (event) => {

            updateTaskBoard('completed');
        })

    } else {
        footerButton.textContent = 'View Remaining Tasks';
        footerButton.addEventListener('click', (event) => {

            updateTaskBoard('incomplete');
        })

    }

}

function addStickyNoteToTaskBoard(toDoItem, boardSelect = 'incomplete') {

    let taskBoard = null;
    taskBoard = document.querySelector('.tasks-board');


    // Create the sticky note
    const stickyNote = document.createElement('div');
    taskBoard.appendChild(stickyNote);
    stickyNote.classList.add('sticky-note');
    stickyNote.classList.add(toDoItem.color);

    // Title: task name
    const title = document.createElement('p');
    stickyNote.appendChild(title);
    title.textContent = toDoItem.task;


    const descrip = document.createElement('p');
    stickyNote.appendChild(descrip);
    if (toDoItem.description) {
        descrip.textContent = toDoItem.description;
    }
    descrip.style.overflowX = 'auto';

    const deadline = document.createElement('p');
    stickyNote.appendChild(deadline);
    if (toDoItem.deadline) {
        deadline.textContent = `due ${format(toDoItem.deadline, "M/d/yyyy")}`;

    }
    if (boardSelect !== 'incomplete') {
        deadline.style.textDecoration = 'line-through';
        const completedDate = document.createElement('p');
        stickyNote.appendChild(completedDate);
        completedDate.textContent = `completed on ${format(toDoItem.completionDate, "M/d/yyyy")}`
    }

    const priority = document.createElement('p');
    stickyNote.appendChild(priority);
    priority.textContent = `${toDoItem.priorityName} priority`;


    // Bottom row for buttons: 
    // Delete and Completed Buttons

    const buttonRow = document.createElement('div');
    stickyNote.appendChild(buttonRow);
    buttonRow.classList.add('sticky-note-buttons-row');

    const deleteButton = document.createElement('button');
    buttonRow.appendChild(deleteButton);
    deleteButton.textContent = 'Delete';

    // Clear the form and close the dialog when the "Cancel" button is clicked
    deleteButton.addEventListener('click', (event) => {
        // First delete the task from app
        app.getProjectByName(toDoItem.project).deleteToDoItem(toDoItem.id);
        // Second refresh the project page which will reflect the newly updated project without that task
        // updateTaskBoard(app.getProjectByName(toDoItem.project));
        updateTaskBoard();
        updateUpcoming();
    });

    const completeButton = document.createElement('button');
    buttonRow.appendChild(completeButton);

    if (boardSelect === 'incomplete') {
        completeButton.textContent = 'Done?';
    } else {
        completeButton.textContent = 'Not Done?';
        deadline.style.textDecoration = 'line-through';
    }

    completeButton.addEventListener('click', (event) => {
        // Toggle its completeness state.
        let boardState = toDoItem.completeStatus; // current status of the board
        toDoItem.completeStatus = !toDoItem.completeStatus;
        // Then refresh the display to reflect the item's new status: 
        if (!boardState) {
            updateTaskBoard('incomplete');

        } else {
            updateTaskBoard('completed');
        }
        updateUpcoming();
    })

    // Modify 
    const modifyButton = document.createElement('button');
    buttonRow.appendChild(modifyButton);
    modifyButton.textContent = 'Edit';

    modifyButton.addEventListener('click', (event) => {
        openTaskEditForm(toDoItem);
    });

};

function updateProjectDisplay() {

    const projectNavigation = document.querySelector('.project-nav');

    projectNavigation.innerHTML = '';

    const navHeader = document.createElement('div');
    projectNavigation.appendChild(navHeader);
    navHeader.classList.add('nav-header');

    const navHeaderTitle = document.createElement('h2');
    navHeader.appendChild(navHeaderTitle);
    navHeaderTitle.textContent = 'Projects';

    // New Project Button

    const newProjButton = document.createElement('button');
    navHeader.appendChild(newProjButton);
    newProjButton.textContent = 'New Project';
    newProjButton.classList.add('new-project-button');


    newProjButton.addEventListener('click', (event) => {
        openProjectEditForm();
    });

    for (let p = 0; p < app.projectList.length; p++) {

        const thisProj = app.projectList[p];
        const projectButton = document.createElement('button');
        projectButton.classList.add('project-nav-button');
        projectButton.textContent = thisProj.name;
        projectButton.classList.add('acme-regular');
        if (p < 1) {
            projectButton.classList.add('current-project'); // default select the first one
        }
        // projectButton.style.width = `${sizeParams.projectBarWidth}px`;
        projectNavigation.appendChild(projectButton);
        projectButton.addEventListener('click', (event) => {
            // Refresh the task display
            app.setCurrentProjectId(thisProj.id);
            const projectsAll = document.querySelectorAll('.project-nav-button');
            projectsAll.forEach(button => button.classList.remove('current-project'));
            event.target.classList.add('current-project');
            updateTaskBoard();
        });
    }
}

function calculateTaskBoardWidth(numProjects) {
    // Get width of the entire display which is set in css
    const taskProjectBoard = document.querySelector('.tasks-projects-display');
    const totalWidth = taskProjectBoard.offsetWidth;
    return totalWidth - (numProjects - 1) * sizeParams.projectBarWidth;

}
function updateUpcoming() {
    const upcomingDisplay = document.querySelector('.upcoming');

    upcomingDisplay.innerHTML = '';

    const upcomingHeader = document.createElement('div');
    upcomingDisplay.appendChild(upcomingHeader);
    upcomingHeader.classList.add('nav-header');
    upcomingHeader.textContent = 'Upcoming Deadlines:';

    // Display the 5 most pressing upcoming tasks.
    const upcomingTasks = app.getUpcomingTasks(5, 'all');
    console.log('the 5 latest')
    console.table(upcomingTasks);
    for (let t = 0; t < upcomingTasks.length; t++) {

        const thisToDoItem = upcomingTasks[t];
        const upcomingContainer = document.createElement('div');
        upcomingDisplay.appendChild(upcomingContainer);
        upcomingContainer.classList.add('upcoming-item');

        if (thisToDoItem.deadline) {
            const dueDate = document.createElement('span');
            upcomingContainer.appendChild(dueDate);
            dueDate.textContent = `${format(thisToDoItem.deadline, "MM/dd/yyyy")}: `;
        }

        const taskName = document.createElement('span');
        upcomingContainer.appendChild(taskName);
        taskName.textContent = `${thisToDoItem.task}, `;
        taskName.classList.add('upcoming-task-name');

        const projName = document.createElement('span');
        upcomingContainer.appendChild(projName);
        projName.textContent = `${thisToDoItem.project}`;
        projName.classList.add('upcoming-project-name');
        projName.classList.add('acme-regular');


    }
}

function refreshEverything() {
    updateProjectDisplay();
    updateTaskBoard();
    updateUpcoming();
}

export { createNewTaskBoard, updateTaskBoard, updateProjectDisplay, refreshEverything, updateUpcoming };