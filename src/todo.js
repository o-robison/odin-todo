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
    get description() {
        return this._description;
    }
    get dueDate() {
        return this._dueDate;
    }
    get priority() {
        return this._priority;
    }
    get notes() {
        return this._notes;
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
        this._todoList.push(newTodo);
    }
    completeTodo(index) {
        this._todoList[index].isDone = true;
    }
    removeTodo(index) {
        this._todoList.splice(index, 1);
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
        this._projects.push(new Project(name));
    }

    addTodoToProject(projectIndex, title, description, dueDate, priority, notes) {
        const targetProject = this._projects[projectIndex];
        targetProject.addTodo(title, description, dueDate, priority, notes);
    }
}
