class ToDoItem {

    #creationTime;

    constructor(task = 'task', id = 0, description = '', deadline = '', priority = 'normal', project='general'){
        this.task = task;
        this.id = id;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.project = project;
        this.#creationTime = new Date();
    }

    get creationTime(){
        return this.#creationTime;
    }

    getAgeInMs(){
        const currentTimeMs = new Date().getTime();
        return currentTimeMs - this.#creationTime.getTime();
    }

};

export {ToDoItem};