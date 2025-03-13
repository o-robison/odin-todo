class Todo {
    constructor(title, description, dueDate, priority, notes) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes;
        this._isDone = false;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
    get description() {
        return this._description;
    }
    set description(desc) {
        this._description = desc;
    }
    get dueDate() {
        return this._dueDate;
    }
    set dueDate(date) {
        this._dueDate = date;
    }
    get priority() {
        return this._priority;
    }
    set priority(pri) {
        this._priority = pri;
    }
    get notes() {
        return this._notes;
    }
    set notes(note) {
        this._notes = note;
    }
    get isDone() {
        return this._isDone;
    }
    set isDone(value) {
        this._isDone = value;
    }
}

class Project {
    constructor(name="Default") {
        this._todoList = [];
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get todoList() {
        return this._todoList;
    }

    addTodo(title, description, dueDate, priority, notes) {
        const newTodo = new Todo(title, description, dueDate, priority, notes);
        this.todoList.push(newTodo);
    }
    toggleChecked(index, value) {
        this.todoList[index].isDone = value;
    }
    removeTodo(index) {
        this.todoList.splice(index, 1);
    }
    editTodo(index, title, description, dueDate, priority, notes) {
        const targetTodo = this.todoList[index];
        targetTodo.title = title;
        targetTodo.description = description;
        targetTodo.dueDate = dueDate;
        targetTodo.priority = priority;
        targetTodo.notes = notes;
    }
    getTodoValues(todoIndex) {
        let returnObj = {};
        let targetTodo = this.todoList[todoIndex];
        returnObj["title"] = targetTodo.title;
        returnObj["description"] = targetTodo.description;
        returnObj["dueDate"] = targetTodo.dueDate;
        returnObj["priority"] = targetTodo.priority;
        returnObj["notes"] = targetTodo.notes;
        returnObj["isDone"] = targetTodo.isDone;
        return returnObj;
    }
}

export class ProjectList {
    constructor() {
        this._projects = [];
        this._projects.push(new Project());
    }
    get projects() {
        return this._projects;
    }

    addProject(name) {
        this.projects.push(new Project(name));
    }

    addTodoToProject(projectIndex, title, description, dueDate, priority, notes) {
        const targetProject = this.projects[projectIndex];
        targetProject.addTodo(title, description, dueDate, priority, notes);
    }

    removeTodoFromProject(projectIndex, todoIndex) {
        this.projects[projectIndex].removeTodo(todoIndex);
    }

    editTodoInProject(projectIndex, todoIndex, title, description, dueDate, priority, notes) {
        this.projects[projectIndex].editTodo(todoIndex, title, description, dueDate, priority, notes);
    } 

    getTodoValuesFromProject(projectIndex, todoIndex){
        return this.projects[projectIndex].getTodoValues(todoIndex);
    }

    toggleTodoCheckedInProject(projectIndex, todoIndex, checkedValue) {
        this.projects[projectIndex].toggleChecked(todoIndex, checkedValue);
    }
}
