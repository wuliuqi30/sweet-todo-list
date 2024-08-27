import { app } from './app.js';
import { updateTaskForm } from './taskFormFunctions.js';
import {updateProjectDisplay} from './contentFunctions.js';

// Create a new project form.
function createProjectForm(){

    const body = document.querySelector('body');
    const dialog = document.createElement('dialog');
    // dialog.setAttribute('open', '');
    dialog.returnValue = "initialValue";
    dialog.classList.add('project-form-dialog');
    body.appendChild(dialog);
    const title = document.createElement('p');
    dialog.appendChild(title);
    title.textContent = 'Create a new project if you like.';
    const fieldSet = document.createElement('fieldset');
    dialog.appendChild(fieldSet);
    const form = document.createElement('form');
    fieldSet.appendChild(form);
    form.classList.add('project-input-form')

    // Project Name:
    const inputRow1 = document.createElement('div');
    form.appendChild(inputRow1);
    inputRow1.classList.add('input-row');

    const projLabel = document.createElement('label');
    inputRow1.appendChild(projLabel);
    projLabel.setAttribute('for', 'project-name');
    projLabel.textContent = 'Project Name:'
    const projInput = document.createElement('input');
    inputRow1.appendChild(projInput);
    projInput.setAttribute('type', 'text');
    projInput.setAttribute('id', 'project-name');
    projInput.setAttribute('name', 'project-input');
    projInput.setAttribute('placeholder', 'organizing house');
    projInput.setAttribute('required','');



    const submitRow = document.createElement('div');
    form.appendChild(submitRow);
    submitRow.classList.add('input-row');

    const cancelButton = document.createElement('button');
    submitRow.appendChild(cancelButton);
    cancelButton.setAttribute('value', 'cancelValue');
    cancelButton.setAttribute('formmethod', 'dialog');
    cancelButton.textContent = 'Cancel';

    // Clear the form and close the dialog when the "Cancel" button is clicked
    cancelButton.addEventListener('click', () => {
        // Close the dialog
        event.preventDefault();
        dialog.close();
    });

    const submitButton = document.createElement('button');
    submitRow.appendChild(submitButton);
    submitButton.setAttribute('type','submit');
    submitButton.setAttribute('id', 'projectConfirmBtn');
    submitButton.setAttribute('value', 'default');
    submitButton.textContent = 'Confirm';

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            // If the form is not valid, prevent the dialog from closing
            
            form.reportValidity(); // Optionally display the validation messages
            return;
        }
        // If the form is valid, proceed with closing the dialog
        dialog.close('submit');
    })

}


function openProjectEditForm(){
    const form = document.querySelector('.project-form-dialog');
    form.showModal();
}

function clearProjectEditForm() {
    const dialog = document.querySelector('dialog');
    const inputs = dialog.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
}

function createProjectFormEventListener(){

    const dialogProj = document.querySelector('.project-form-dialog');
    // Below covers both cancel and submitting the form.
    dialogProj.addEventListener("close", (e) => {
      const outputVal = dialogProj.returnValue === 'default' ? 'No Return Value' : dialogProj.returnValue;
      // alert(outputVal);
    
      if (outputVal === 'submit') {
        const projectElement = document.getElementById('project-name');
        const newProject = new Project(projectElement.value);
        app.addProject(newProject);
        

        // The task form needs to update which projects you can choose
        updateTaskForm();
        updateProjectDisplay();
        app.printState();
      }
    
      // Whether it was a submit or cancel, we're clearing the form now.
      clearProjectEditForm();
    })
    
}

export {openProjectEditForm,clearProjectEditForm,createProjectForm,createProjectFormEventListener};