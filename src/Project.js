import { compareDesc,compareAsc } from "date-fns";
class Project {

    #toDoList = [];
    #id = null;

    constructor(name = 'project') {
        this.name = name;
    }

    get id() {
        return this.#id;
    }

    set id(input) {
        this.#id = input;
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

        if (this.findItemId(item.id) < 0) { // Didn't find this in the current project, good.
            item.project = this.name;
            this.#toDoList.push(item);

            console.log(`Added item with id ${item.id} to project. Project now:`);
            this.view('all');
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
            this.view('all');
            return true;
        }
    }

    get toDoList() {
        return this.#toDoList;
    }

    get completedItems() {
        return this.#toDoList.filter((item) => item.completeStatus);
    }

    get incompleteItems() {
        return this.#toDoList.filter((item) => !item.completeStatus);
    }

    viewList() {
        if (this.#toDoList.length > 0) {
            console.table(this.#toDoList);
        } else {
            console.log('No Items in this project!');
        }
    }

    get Ids() {
        return this.#toDoList.map(item => item.id);
    }

    view(attribute) {
        if (attribute === 'all') {
            console.table(this.#toDoList);
        } else if (attribute === 'id') {
            console.log(`ID: ${this.#toDoList.map(item => item.id)}`);
        } else if (attribute === 'deadline') {
            console.log(`Deadline:  ${this.#toDoList.map(item => item.deadline)}`);
        }
        else if (attribute === 'priority') {
            console.log(`Priority: ${this.#toDoList.map(item => item.priority)}`);
        }
    }

    sortByAge() {
        // Reorganize the todolist based on the age of the items
        console.log('Before sorting by age:');

        // Get a current time stamp to use for all comparisons regardless when processed in the below loop: 
        const currentTimeMs = new Date().getTime();

        for (const item of this.#toDoList) {
            item.ageInMs = currentTimeMs - item.creationTime;
        }
        this.view('all');
        this.#toDoList.sort((a, b) => a.ageInMs - b.ageInMs);

        console.log('After sorting by age:');
        this.view('all');
    }

    sortByPriority() {
        // Returns a priority list from high priority to lowest priority
        // Reorganize the todolist based on the age of the items
        console.log('Before sorting by priority:');

        this.view('priority');
        this.#toDoList.sort((a, b) => {
            return b.priority - a.priority;
        }); 

        console.log('After sorting by priority:');
        this.view('priority');
    }

    sortByDeadline() {
        console.log('Before sorting by deadline:');

        this.view('deadline');
        this.#toDoList.sort(function (a, b) {
            return compareAsc(a.deadline, b.deadline);
        });

        console.log('After sorting by deadline:');
        this.view('deadline');
    }

    static transferItemBetweenProjects(projectA, projectB, itemIdInA) {
        // Move item with id itemIdInA from project A to project B:
        console.log(`Attempting to move item with id ${itemIdInA} from project ${projectA.name} to project ${projectB.name}.`)
        // Check to make sure this item is in Project A 
        const itemIdx = projectA.findItemId(itemIdInA);
        if (itemIdx > -1) {
            // console.log('Project A before transfer:')
            // projectA.viewList();
            // console.log('Project B before transfer:')
            // projectB.viewList();
            if (projectA.id === projectB.id){
                return; // do nothing
            } else {
            projectB.addToDoItem(projectA.getItem(itemIdInA));
            projectA.deleteToDoItem(itemIdInA);
        }
            // console.log('Project A after transfer:')
            // projectA.viewList();
            // console.log('Project B after transfer:')
            // projectB.viewList();
        } else {
            console.log(`Failed to find item with id ${itemIdInA} in project ${projectA.name}. Couldn't do it.`);
        }

    }

    toJSON() {
        return {
            name: this.name,
            tasks: this.toDoList,
            id: this.#id,
        }
    }
};

export { Project }; 