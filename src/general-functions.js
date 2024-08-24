
function deleteContent() {
    const contentDOM = document.getElementById("content")
    let child = contentDOM.lastElementChild;
    while (child) {
        contentDOM.removeChild(child);
        child = contentDOM.lastElementChild;
    }
}

function timeDelay(numCycles){

    let outputString = '';
    for (let i = 0; i < numCycles; i ++ ){
        outputString += i;
        
    }
    console.log(`ran ${numCycles} cycles`);
}
export {deleteContent,timeDelay};