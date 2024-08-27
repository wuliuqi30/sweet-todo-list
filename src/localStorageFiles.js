import { app } from './app.js';
function saveAllDataToLocalStorage(){

    // Test
    const appString = JSON.stringify(app);
    localStorage.setItem('appData',appString);
    
}

function loadAllDataFromLocalStorage(){
    const storedAppString = localStorage.getItem('appData');
    console.log(`Loaded appdatastring: ${storedAppString}`);
    const storedApp = JSON.parse(storedAppString);
    console.log(`loaded app: ${storedApp}`);
    return storedApp;

    // The application is essentially a list of projects and a list of tasks.


}

function saveToDoItemToLocalStorage(item){
    
}

function saveProjectToLocalStorage(){

}


export {saveAllDataToLocalStorage,loadAllDataFromLocalStorage};