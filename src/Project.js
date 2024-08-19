class Project{

    #toDoList = [];

    constructor(name = 'project', id = 0){
        this.name = name;
        this.id = id;

    }

    addToDoItem(item){
        this.#toDoList.push(item);
    }

    get toDoList(){
        return this.#toDoList;
    }
};

export{Project};