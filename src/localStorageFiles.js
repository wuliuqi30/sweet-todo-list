import { app } from './app.js';
function saveAllDataToLocalStorage(){

    // Test
    const appString = JSON.stringify(app);
    localStorage.setItem('appData',appString);
    
}

function loadAllDataFromLocalStorage(){
    const storedAppString = localStorage.getItem('appData');
    console.log(`Loaded appdatastring: ${storedAppString}`);
    const appData = JSON.parse(storedAppString);
    console.log(`loaded app: ${appData}`);

    app.overwriteFromLocalStorage(appData);
    return appData;

    // The application is essentially a list of projects and a list of tasks.


}



export {saveAllDataToLocalStorage,loadAllDataFromLocalStorage};