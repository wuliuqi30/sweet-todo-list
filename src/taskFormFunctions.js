import { format} from "date-fns";
import { app } from './app.js';
import { ToDoItem } from './ToDoItem.js';
import { updateTaskBoard,updateUpcoming } from './contentFunctions.js';


function createTaskForm() {

    const body = document.querySelector('body');
    const dialog = document.createElement('dialog');
    // dialog.setAttribute('open', '');
    dialog.returnValue = "initialValue";
    dialog.classList.add('task-form-dialog');
    body.appendChild(dialog);
    const title = document.createElement('p');
    dialog.appendChild(title);
    title.textContent = 'Create a task.';
    const fieldSet = document.createElement('fieldset');
    dialog.appendChild(fieldSet);
    const form = document.createElement('form');
    fieldSet.appendChild(form);
    form.classList.add('to-do-input-form')

    // Task Name:
    const inputRow1 = document.createElement('div');
    form.appendChild(inputRow1);
    inputRow1.classList.add('input-row');

    const taskLabel = document.createElement('label');
    inputRow1.appendChild(taskLabel);
    taskLabel.setAttribute('for', 'task');
    taskLabel.textContent = 'Task:'
    const taskInput = document.createElement('input');
    inputRow1.appendChild(taskInput);
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('id', 'task');
    taskInput.setAttribute('name', 'task-input');
    taskInput.setAttribute('placeholder', 'do the laundry');
    taskInput.setAttribute('required', '');

    // Task Description: 
    const inputRow2 = document.createElement('div');
    form.appendChild(inputRow2);
    inputRow2.classList.add('input-row');

    const descripLabel = document.createElement('label');
    inputRow2.appendChild(descripLabel);
    descripLabel.setAttribute('for', 'description');
    descripLabel.textContent = 'Description (optional):'
    const descripInput = document.createElement('textarea');
    inputRow2.appendChild(descripInput);
    descripInput.setAttribute('id', 'description');
    descripInput.setAttribute('name', 'description-input');
    descripInput.setAttribute('placeholder', 'Additional Description Goes Here');

    // Deadline
    const inputRow3 = document.createElement('div');
    form.appendChild(inputRow3);
    inputRow3.classList.add('input-row');

    const deadlineLabel = document.createElement('label');
    inputRow3.appendChild(deadlineLabel);
    deadlineLabel.setAttribute('for', 'deadline');
    deadlineLabel.textContent = 'Deadline (optional)'
    const deadlineInput = document.createElement('input');
    inputRow3.appendChild(deadlineInput);
    deadlineInput.setAttribute('type', 'date');
    deadlineInput.setAttribute('id', 'deadline');
    deadlineInput.setAttribute('name', 'deadline-input');
    deadlineInput.setAttribute('min', format(new Date(), "yyyy-MM-dd")); // Today or later

    // Priority
    const inputRow4 = document.createElement('div');
    form.appendChild(inputRow4);
    inputRow4.classList.add('input-row');
    const priorityLabel = document.createElement('label');
    inputRow4.appendChild(priorityLabel);
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'Priority (optional)'

    const select = document.createElement('select');
    select.setAttribute('name', 'priority-input');
    select.setAttribute('id', 'priority');
    inputRow4.appendChild(select);

    const opDefault = document.createElement('option');
    select.appendChild(opDefault);
    opDefault.setAttribute('value', 1);
    opDefault.textContent = '--Choose Priority--';
    const opNormal = document.createElement('option');
    select.appendChild(opNormal);
    opNormal.setAttribute('value', 1);
    opNormal.textContent = 'normal'
    const opHigh = document.createElement('option');
    select.appendChild(opHigh);
    opHigh.setAttribute('value', 2);
    opHigh.textContent = 'high';
    const opUrgent = document.createElement('option');
    select.appendChild(opUrgent);
    opUrgent.setAttribute('value', 3);
    opUrgent.textContent = 'urgent';

    // Project
    const inputRow5 = document.createElement('div');
    form.appendChild(inputRow5);
    inputRow5.classList.add('input-row');
    inputRow5.classList.add('project-input-row');
    const projectLabel = document.createElement('label');
    inputRow5.appendChild(projectLabel);
    projectLabel.setAttribute('for', 'project');
    projectLabel.textContent = 'Project (optional)'

    updateProjectListSelect();

    const submitRow = document.createElement('div');
    form.appendChild(submitRow);
    submitRow.classList.add('input-row');

    const cancelButton = document.createElement('button');
    submitRow.appendChild(cancelButton);
    cancelButton.setAttribute('value', 'cancelValue');
    cancelButton.setAttribute('formmethod', 'dialog');
    cancelButton.textContent = 'Cancel';
    cancelButton.setAttribute('id','task-form-cancel-button')
    // Clear the form and close the dialog when the "Cancel" button is clicked
    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        // Close the dialog
        dialog.close('cancel');
    });

    const submitButton = document.createElement('button');
    submitRow.appendChild(submitButton);
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'task-form-submit-button');
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


function updateProjectListSelect() {

    const selectOld = document.getElementById('project');
    if (selectOld) {
        selectOld.remove();
    }
    const selectNew = document.createElement('select');
    selectNew.setAttribute('name', 'project-input');
    selectNew.setAttribute('id', 'project');
    const inputRow5 = document.querySelector('.project-input-row');
    inputRow5.appendChild(selectNew);

    // Add the remaining projects
    for (let i = 0; i < app.projectList.length; i++) {
        const option = document.createElement('option');
        selectNew.appendChild(option);
        option.setAttribute('value', app.projectList[i].name);
        option.textContent = app.projectList[i].name;
    }

}

function openTaskEditForm(prefillToDoItem) {
    const dialog = document.querySelector('.task-form-dialog');
    updateProjectListSelect();
    if (prefillToDoItem){
        dialog.id = prefillToDoItem.id;
        prefillToDoItemForm(prefillToDoItem);
    } else{
        dialog.id = '';
    }

    dialog.showModal();
}

function prefillToDoItemForm(item){

  
    const task = document.getElementById('task');
    task.value = item.task;
    const descrip = document.getElementById('description');
    descrip.value = item.description;
    if (item.deadline){
    const deadline = document.getElementById('deadline');
    const val = format(item.deadline, "yyyy-MM-dd");
    deadline.value = val;
}
    const priority = document.getElementById('priority');
    priority.value = item.priority;
    const project = document.getElementById('project');
    project.value = item.project;

}

function clearTaskEditForm() {
    const dialog = document.querySelector('.task-form-dialog');
    const inputs = dialog.querySelectorAll('input');
    inputs.forEach(input => input.value = '');

    // Also clear the text area
    const descrip = dialog.querySelector('textarea');
    descrip.value = '';

    const sel = document.getElementById('project');
    sel.selectedIndex = 0;
}

function updateTaskForm() {
    updateProjectListSelect();
}

function createCloseTaskFormEventListener() {
    const taskDialog = document.querySelector('.task-form-dialog');
    // Below covers both cancel and submitting the form.
    taskDialog.addEventListener("close", (e) => {
        const outputVal = taskDialog.returnValue === 'default' ? 'No Return Value' : taskDialog.returnValue;

        if (outputVal === 'submit') {
            createTaskCloseFormProcessing()
        }

        // Whether it was a submit or cancel, we're clearing the form now.
        clearTaskEditForm();

    })
}


function createTaskCloseFormProcessing() {
    const dialog = document.querySelector('.task-form-dialog');

    const taskElement = document.getElementById('task');
    
    const descriptionFromForm = document.getElementById('description');
  
    const deadlineFromForm = document.getElementById('deadline');
  
    const projectFromForm = document.getElementById('project');

    let inputDeadline = null;
    // If the deadline from the form is empty, dont make a date from it.
    if (deadlineFromForm.value) {
      inputDeadline = new Date(Number(deadlineFromForm.value.slice(0, 4)),
        Number(deadlineFromForm.value.slice(5, 7) - 1),
        Number(deadlineFromForm.value.slice(8, 10)));
    }
  
  
    const priorityFromForm = document.getElementById('priority');
  
    // If this todoitem already exists, modify existing item.
    // Dialog will have an ID if this is modification of an existing task.
    if (dialog.id){
       
        app.modifyToDoItem(Number(dialog.id),
        projectFromForm.value,
        taskElement.value,
        descriptionFromForm.value,
        inputDeadline,
        Number(priorityFromForm.value)
      )
    } else {
    // Else create a new item.

    // The application assigns each new task a new unique id
    const id = app.getNewTaskId();

    const newToDoItem = new ToDoItem(
        taskElement.value,
        descriptionFromForm.value,
        inputDeadline,
        Number(priorityFromForm.value));
    
      
      app.addToDoItemToProject(newToDoItem, projectFromForm.value);
    }

  
    app.printState();
    // updateTaskBoard(app.getProjectByName(projectFromForm.value));
    updateTaskBoard(app.getProjectById(app.getCurrentProjectId()));
    updateUpcoming();
  }



export { createTaskForm, openTaskEditForm, clearTaskEditForm, updateTaskForm,createCloseTaskFormEventListener };