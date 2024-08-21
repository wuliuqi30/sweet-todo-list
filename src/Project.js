class Project {

    #toDoList = [];

    constructor(name = 'project', id = 0) {
        this.name = name;
        this.id = id;

    }

    findItemId(id) {
        // Return -1 if NOT in the project. Return 0 or greater if in the project
        const itemIdx = this.#toDoList.findIndex(item => item.id === id);
        return itemIdx;
    }

    getItem(id) {
        const item = this.findItemId(id);
        if (item > -1) {
            // found the item by id. return the item object
            return this.#toDoList[item];
        }
    }

    addToDoItem(item) {

        if (this.findItemId(item.id) < 0) {
            item.project = this.name;
            this.#toDoList.push(item);
            
            console.log(`Added item with id ${item.id} to project. Project now:`);
            this.viewList();
            return true;
        } else {
            console.log(`Item with id ${item.id} already being used in this project! This project's Ids are: [${this.Ids}]. Check if this item is a duplicate or the ID has already been used.`);
            return false;
        }

    }

    deleteToDoItem(id) {
        const itemIdx = this.findItemId(id);
        if (itemIdx < 0) {
            console.log(`Attempted to remove item with id ${id}, but it doesnt exist in this project. This project's Ids are: ${this.Ids}`);
            return false;
        } else {

            this.#toDoList.splice(itemIdx, 1);
            console.log(`Removed item with id ${id} from the array. Project is now:`);
            this.viewList();
            return true;
        }
    }

    get toDoList() {
        return this.#toDoList;
    }

    viewList() {
        console.table(this.#toDoList);
    }

    get Ids() {
        return this.#toDoList.map(item => item.id);
    }

    viewIds() {
        console.log(this.Ids);
    }

    sortByAge() {
        // Reorganize the todolist based on the age of the items
        console.log('Before sorting by age:');

        // Get a current time stamp to use for all comparisons regardless when processed in the below loop: 
        const currentTimeMs = new Date().getTime();

        for (const item of this.#toDoList) {
            item.ageInMs = currentTimeMs - item.creationTime;
        }
        this.viewList();
        this.#toDoList.sort((a, b) => a.ageInMs - b.ageInMs);

        console.log('After sorting by age:');
        this.viewList();
    }

    sortByPriority() {
        // Returns a priority list from high priority to lowest priority
        // Reorganize the todolist based on the age of the items
        console.log('Before sorting by priority:');

        this.viewList();
        this.#toDoList.sort((a, b) => {
            return b.priority - a.priority;
        });

        console.log('After sorting by priority:');
        this.viewList();
    }

    static transferItemBetweenProjects(projectA, projectB, itemIdInA){
        // Move item with id itemIdInA from project A to project B:

        // Check to make sure this item is in Project A 
        const itemIdx = projectA.findItemId(itemIdInA);
        if (itemIdx > -1){
            // console.log('Project A before transfer:')
            // projectA.viewList();
            // console.log('Project B before transfer:')
            // projectB.viewList();
            
            projectB.addToDoItem(projectA.getItem(itemIdInA));
            projectA.deleteToDoItem(itemIdInA);

            // console.log('Project A after transfer:')
            // projectA.viewList();
            // console.log('Project B after transfer:')
            // projectB.viewList();
        } else {
            console.log(`Failed to find this item with id ${itemIdInA}`);
        }
         
    }
};

export { Project }; 