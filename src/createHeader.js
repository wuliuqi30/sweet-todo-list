import {loadAllDataFromLocalStorage} from './localStorageFiles.js';

function createHeader() {

    const header = document.querySelector('.headerBottom');
    
    // Create the reload session button: 

    const reloadBtn = document.createElement('button');
    header.appendChild(reloadBtn);
    reloadBtn.classList.add('reload-session-button');
    reloadBtn.textContent = 'Reload Previous Session';

    reloadBtn.addEventListener('click',(event)=> {
        loadAllDataFromLocalStorage();
    });


};

export { createHeader };