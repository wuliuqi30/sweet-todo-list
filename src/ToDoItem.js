import { format, compareAsc } from "date-fns";
class ToDoItem {

    #creationTime;
    #ageInMs;
    #task;
    #id;
    #description;
    #deadline;
    #priority; // a positive number: 1 is lowest, 3 is highest
    #priorityName;
    #project;
    #complete;
    #constructorWarningFlag = false; // Set this to true if anything goes wrong in the construction of this object
    #constructorWarningInfo = '';
    #modifyWarningFlag = false; // Set this to true if a mistake may have been made when modifying this item.
    #modifyWarningInfo = '';


    constructor(task = 'task', id = 0, description = '', deadline = null, priority = 1) {

        if (id < 0) {
            console.log(`You are attempting to create an item with a negative id (${id}), which is not allowed. Automatically setting its ID to 0.`);
            this.#constructorWarningFlag = true;
            this.#constructorWarningInfo = 'Attemped to create object with negative ID';
            id = 0;
        }

        if (this.#invalidPriority(priority)) {
            console.log('The priority was not one of the three allowed priorities of normal, high, or urgent. Automatically setting it to normal.')
            this.#constructorWarningFlag = true;
            this.#constructorWarningInfo = 'Priority was not set to allowed values.';
            priority = 1;
        }

        this.#task = task;
        this.#id = id;
        this.#description = description;

        const dateRegex = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;

        if (deadline instanceof Date) {
            this.#deadline = format(deadline, "MM/dd/yyyy"); // input is a Date object
        } else if (dateRegex.test(deadline)) {
            this.#deadline = deadline;
        } else {
            this.#deadline = null;
            this.#constructorWarningFlag = true;
            this.#constructorWarningInfo = 'Invalid date was used to create item. Deadline set to null.';
        }

        this.priority = priority; // Can be 1 2 or 3
        this.#complete = false;
        this.#creationTime = new Date();
        console.log(`Created New To Do Item:`);
        console.table(this);
    }

    // Check for invalid inputs:
    #invalidPriority(pr) {
        //  return ((pr !== 'normal') && (pr !== 'high') && (pr !== 'urgent'));
        return pr < 1;
    }

    // Need to check for a valid deadline time format: 


    // Age of item:
    get creationTime() {
        return this.#creationTime;
    }

    get id() {
        return this.#id;
    }

    get ageInMs() {
        return this.#ageInMs;
    }

    set ageInMs(age) {
        this.#ageInMs = age;
    }


    // Edit the item later: 

    set task(taskIn) {
        this.#task = taskIn;
    }

    get task() {
        return this.#task;
    }

    set description(descriptionIn) {
        this.#description = descriptionIn;
    }

    get description() {
        return this.#description;
    }

    set deadline(deadlineIn) {
        this.#deadline = format(deadlineIn, "MM/dd/yyyy");
    }

    get deadline() {
        return this.#deadline;
    }

    set priority(priorityIn) {
        if (this.#invalidPriority(priorityIn)) {
            console.log(`The priority input (${priorityIn}) was not one of the three allowed priorities of normal, high, or urgent. Automatically setting it to 1 (normal).`)
            this.#modifyWarningFlag = true;
            priorityIn = 1;
        }
        this.#priority = priorityIn;
        this.#priorityName =  this.#getPriorityNameFromNumber(this.#priority);
    }

    get priority() {
        return this.#priority;
    }

    get priorityName(){
        return this.#priorityName;
    }

    #getPriorityNameFromNumber(prior){
        if (prior === 1){
            return 'normal';
        } else if (prior === 2){
            return 'high';
        } else if (prior === 3) {
            return 'urgent';
        } else {
            return 'invalid';
        }
    }

    set project(projectIn) {
        this.#project = projectIn;
    }

    get project() {
        return this.#project;
    }

    set completeStatus(status){
        this.#complete = status;
    }

    get completeStatus(){
        return this.#complete;
    }

};

export { ToDoItem };