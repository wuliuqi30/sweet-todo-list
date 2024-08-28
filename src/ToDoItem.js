class ToDoItem {

    #creationTime;
    #ageInMs;
    #task;
    #id;
    #description;
    #deadline; // a Date() object
    #completionDate;
    #priority; // a positive number: 1 is lowest, 3 is highest
    #priorityName;
    #project;
    #complete;
    #constructorWarningFlag = false; // Set this to true if anything goes wrong in the construction of this object
    #constructorWarningInfo = '';
    #modifyWarningFlag = false; // Set this to true if a mistake may have been made when modifying this item.
    #modifyWarningInfo = '';
    #color;

    constructor(task = 'task', description = '', deadline = null, priority = 1) {

        if (this.#invalidPriority(priority)) {
            console.log('The priority was not one of the three allowed priorities of normal, high, or urgent. Automatically setting it to normal.')
            this.#constructorWarningFlag = true;
            this.#constructorWarningInfo = 'Priority was not set to allowed values.';
            priority = 1;
        }

        this.#task = task;
        this.#description = description;

        if (deadline instanceof Date) {
            this.#deadline = deadline; // input is a Date object
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
        return pr < 1;
    }

    // Age of item:
    get creationTime() {
        return this.#creationTime;
    }

    set creationTime(time){
        this.#creationTime = time;
    }

    get id() {
        return this.#id;
    }

    set id(input) {
        this.#id = input;
    }

    get ageInMs() {
        return this.#ageInMs;
    }

    set ageInMs(age) {
        this.#ageInMs = age;
    }

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
        this.#deadline = deadlineIn;
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
        this.#priorityName = this.#getPriorityNameFromNumber(this.#priority);
    }

    get priority() {
        return this.#priority;
    }

    get priorityName() {
        return this.#priorityName;
    }

    set priorityName(name){
        this.#priorityName = name;
    }

    #getPriorityNameFromNumber(prior) {
        if (prior === 1) {
            return 'normal';
        } else if (prior === 2) {
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

    set completeStatus(status) {
        if (this.#complete === status) {
            this.#modifyWarningFlag = true;
            this.#modifyWarningInfo = `This item's complete status is ${this.#complete} already!`;
            return;
        }
        this.#complete = status;
        this.#completionDate = new Date();
    }

    set completionDate(date){
        this.#completionDate = date;
    }

    get completionDate(){
        return this.#completionDate;
    }

    get completeStatus() {
        return this.#complete;
    }

    set color(c) {
        this.#color = c;
    }

    get color() {
        return this.#color;
    }

    toJSON() {
        return {
            creationTime: this.#creationTime,
            ageInMs: this.#ageInMs,
            task : this.#task,
            id : this.#id,
            description : this.#description,
            deadline: this.#deadline, // a Date() object
            priority: this.#priority, // a positive number: 1 is lowest, 3 is highest
            priorityName: this.#priorityName,
            project: this.#project,
            complete: this.#complete,
            constructorWarningFlag: this.#constructorWarningFlag, // Set this to true if anything goes wrong in the construction of this object
            constructorWarningInfo: this.#constructorWarningInfo,
            modifyWarningFlag: this.#modifyWarningFlag, // Set this to true if a mistake may have been made when modifying this item.
            modifyWarningInfo: this.#modifyWarningInfo,
            color: this.#color,
            completionDate: this.#completionDate,
        }
    }

};

export { ToDoItem };