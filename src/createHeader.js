import {createTaskForm,openTaskEditForm} from './taskFormFunctions.js';
import {openProjectEditForm} from './projectFormFunctions.js';

function createHeader() {

    const header = document.querySelector('.headerBottom');

    // <ul class="page-actions">
    //     <li><button>New</button></li>
    //     <li><button>Upload</button></li>
    //     <li><button>Share</button></li>
    // </ul>

    const ul = document.createElement('ul');
    ul.classList.add('page-actions');
    header.appendChild(ul);

    // New Task Button
    const liNewTask = document.createElement('li');
    ul.appendChild(liNewTask);
    const newTaskButton = document.createElement('button');
    liNewTask.appendChild(newTaskButton);
    newTaskButton.textContent = 'Task';

    newTaskButton.addEventListener('click',(event)=>{
        openTaskEditForm();
    });

    // New Project Button
    const liNewProj = document.createElement('li');
    ul.appendChild(liNewProj);
    const newProjButton = document.createElement('button');
    liNewProj.appendChild(newProjButton);
    newProjButton.textContent = 'Project';

    newProjButton.addEventListener('click',(event)=>{
        openProjectEditForm();
    });

    
};

export { createHeader };