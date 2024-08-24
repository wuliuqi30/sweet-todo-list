import {openTaskEditForm} from './openTaskEditForm.js';

function refreshHeader() {

    const header = document.querySelector('.headerBottom');

    // <ul class="page-actions">
    //     <li><button>New</button></li>
    //     <li><button>Upload</button></li>
    //     <li><button>Share</button></li>
    // </ul>

    const ul = document.createElement('ul');
    ul.classList.add('page-actions');
    header.appendChild(ul);
    const liNewTask = document.createElement('li');
    ul.appendChild(liNewTask);
    const newTaskButton = document.createElement('button');
    liNewTask.appendChild(newTaskButton);
    newTaskButton.textContent = 'Create Task';

    newTaskButton.addEventListener('click',(event)=>{
        openTaskEditForm();
    });

    
};

export { refreshHeader };