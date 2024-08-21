class ToDoItem {

    #creationTime;
    #ageInMs;
    #task;
    #id;
    #description;
    #deadline;
    #priority; // a positive number: 1 is lowest, 3 is highest
    #project;
    #constructorWarningFlag = false; // Set this to true if anything goes wrong in the construction of this object
    #modifyWarningFlag = false; // Set this to true if a mistake may have been made when modifying this item.



    constructor(task = 'task', id = 0, description = '', deadline = '', priority = 1){
        
        if (id < 0){
            console.log(`You are attempting to create an item with a negative id (${id}), which is not allowed. Automatically setting its ID to 0.`);
            this.#constructorWarningFlag = true;
            id = 0;
        }

        if (this.#invalidPriority(priority)){
            console.log('The priority was not one of the three allowed priorities of normal, high, or urgent. Automatically setting it to normal.')
            this.#constructorWarningFlag = true;
            priority = 1;
        }

        this.#task = task;
        this.#id = id;
        this.#description = description;
        this.#deadline = deadline;
        this.#priority = priority; // Can be 1 2 or 3
        this.#creationTime = new Date();
        console.log(`Created New To Do Item:`);
        console.table(this);
    }

    // Check for invalid inputs:
    #invalidPriority(pr){
        //  return ((pr !== 'normal') && (pr !== 'high') && (pr !== 'urgent'));
        return pr < 1;
    }

    // Need to check for a valid deadline time format: 


    // Age of item:
    get creationTime(){
        return this.#creationTime;
    }

    get id(){
        return this.#id;
    }

    get ageInMs(){
        return this.#ageInMs;
    }

    set ageInMs(age){
        this.#ageInMs = age;
    }


    // Edit the item later: 

    set task(taskIn){
        this.#task = taskIn;
    }

    get task(){
        return this.#task;
    }

    set description(descriptionIn){
        this.#description = descriptionIn;
    }

    get description(){
        return this.#description;
    }

    set deadline(deadlineIn){
        this.#deadline = deadlineIn;
    }

    get deadline(){
        return this.#deadline;
    }

    set priority(priorityIn){
        if ( this.#invalidPriority(priorityIn)){
            console.log(`The priority input (${priorityIn}) was not one of the three allowed priorities of normal, high, or urgent. Automatically setting it to 1 (normal).`)
            this.#modifyWarningFlag = true;
            priorityIn = 1;
        }
        this.#priority = priorityIn;
    }

    get priority(){
        return this.#priority;
    }

    set project(projectIn){
        this.#project = projectIn;
    }

    get project(){
        return this.#project;
    }


};

export {ToDoItem};