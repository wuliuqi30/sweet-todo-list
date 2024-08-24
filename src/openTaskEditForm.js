function openTaskEditForm() {

    const body = document.querySelector('body');
    const dialog = document.createElement('dialog');
    // dialog.setAttribute('open', '');
    dialog.returnValue = "initialValue";
    dialog.classList.add('new-task-form-dialog');
    body.appendChild(dialog);
    const title = document.createElement('p');
    dialog.appendChild(title);
    title.textContent = 'Create your task if you like.';
    const fieldSet = document.createElement('fieldset');
    dialog.appendChild(fieldSet);
    const form = document.createElement('form');
    fieldSet.appendChild(form);
    form.classList.add('to-do-input-form')

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
    

    // <div>
    //     <button value="cancel" formmethod="dialog">Cancel</button>
    //     <button id="confirmBtn" value="default">Confirm</button>
    // </div>

    const submitRow = document.createElement('div');
    form.appendChild(submitRow);
    submitRow.classList.add('input-row');
    const cancelButton = document.createElement('button');
    submitRow.appendChild(cancelButton);
    cancelButton.setAttribute('value','cancelValue');
    cancelButton.setAttribute('formmethod','dialog');
    cancelButton.textContent = 'Cancel';

    const submitButton = document.createElement('button');
    submitRow.appendChild(submitButton);
    submitButton.setAttribute('id','confirmBtn');
    submitButton.setAttribute('value','default');
    submitButton.textContent = 'Confirm';


    // dialog.addEventListener("close",(e)=>{
    //     const outputVal = dialog.returnValue === 'default' ? 'No Return Value': `Returned ${dialog.returnValue}`;
    //     alert(outputVal);

    //     // Create the task here?
    //     dialog.remove();
    // })

    // submitButton.addEventListener('click',(event)=>{
    //     event.preventDefault();
    //     dialog.close(taskInput.value);
    // })




}

export { openTaskEditForm };