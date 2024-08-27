import {loadAllDataFromLocalStorage,saveAllDataToLocalStorage} from './localStorageFiles.js';
import {refreshEverything} from './taskBoardFunctions.js';

function createHeader() {

    const header = document.querySelector('.headerBottom');
    
    // Create the save session button: 

    const saveBtn = document.createElement('button');
    header.appendChild(saveBtn);
    saveBtn.classList.add('reload-session-button');
    saveBtn.textContent = 'Save Session';

    saveBtn.addEventListener('click',(event)=> {
        saveAllDataToLocalStorage();
    });


    // Create the reload session button: 

    const reloadBtn = document.createElement('button');
    header.appendChild(reloadBtn);
    reloadBtn.classList.add('reload-session-button');
    reloadBtn.textContent = 'Reload Previous Session';

    reloadBtn.addEventListener('click',(event)=> {
        loadAllDataFromLocalStorage();
        refreshEverything();
    });




};

export { createHeader };