import { loadAllDataFromLocalStorage, saveAllDataToLocalStorage } from './localStorageFiles.js';
import { refreshEverything } from './contentFunctions.js';

function createHeader() {

    const header = document.querySelector('.header');

    // Create the save session button: 
    const saveBtn = document.createElement('button');
    header.appendChild(saveBtn);
    saveBtn.classList.add('save-session-button');
    saveBtn.textContent = 'Save Session';

    saveBtn.addEventListener('click', (event) => {
        saveAllDataToLocalStorage();
    });

    // Create the reload session button: 
    const reloadBtn = document.createElement('button');
    header.appendChild(reloadBtn);
    reloadBtn.classList.add('reload-session-button');
    reloadBtn.textContent = 'Reload Previous Session';

    reloadBtn.addEventListener('click', (event) => {
        const confirmResult = confirm('Are you sure? This will overwrite all current data and load the previous session.');
        if (confirmResult) {
        loadAllDataFromLocalStorage();
        refreshEverything();
        }
    });

    // Create the clear session button: 
    const clearBtn = document.createElement('button');
    header.appendChild(clearBtn);
    clearBtn.classList.add('clear-session-button');
    clearBtn.textContent = 'Clear Session';

    clearBtn.addEventListener('click', (event) => {
        const confirmResult = confirm('Are you sure? This will delete all current projects and tasks.');
        if (confirmResult) {
            app.clearAllData();
            refreshEverything();
        }
    });

    // Create the load example button: 
    const exampleBtn = document.createElement('button');
    header.appendChild(exampleBtn);
    exampleBtn.classList.add('example-session-button');
    exampleBtn.textContent = 'Show Example';

    exampleBtn.addEventListener('click', (event) => {
        const confirmResult = confirm('Are you sure? This will overwrite all current projects and tasks and replace them with the example.');
        if (confirmResult) {
        app.loadExample();
        }
    });

};

export { createHeader };