export class ScreenController {
    constructor(target, projectList) {
        this._contentDiv = document.querySelector(target);
        this._projectList = projectList;
    }
    get projectList() {
        return this._projectList;
    }
    get contentDiv() {
        return this._contentDiv;
    }

    reset() {
        this.contentDiv.innerHTML = "";
    }
    draw() {
        for(const [projIndex, project] of this.projectList.projects.entries()) {
            const listDiv = document.createElement("div");
            listDiv.classList.add("project");
            const listTitle = document.createElement("h2");
            const list = document.createElement("div");
            list.classList.add("todo-list");
            listTitle.innerHTML = project.name;
            listDiv.appendChild(listTitle);
            
            for(const [listIndex, todo] of project.todoList.entries()) {
                const todoDiv = document.createElement("div");
                todoDiv.classList.add("todo-item");
                
                const todoTitleDiv = document.createElement("div");
                todoTitleDiv.classList.add("todo-title");
                const listenButton = this.drawMaterialIconButton(todoTitleDiv, "expand_circle_down", projIndex, listIndex, this.toggleExpandableVisibility);

                const buttonRow = document.createElement("div");
                buttonRow.classList.add("button-row");
                this.drawMaterialIconButton(buttonRow, "edit", projIndex, listIndex, this.editTodo.bind(this));
                this.drawMaterialIconButton(buttonRow, "remove", projIndex, listIndex, this.removeTodo.bind(this));

                const todoTitle = document.createElement("h3");
                todoTitle.innerHTML = todo.title;
                todoTitleDiv.appendChild(todoTitle);
                todoTitleDiv.appendChild(buttonRow);
                todoDiv.appendChild(todoTitleDiv);

                const expandDiv = document.createElement("div");
                expandDiv.classList.add("expandable");
                expandDiv.dataset.todoIndex = `${projIndex}${listIndex}`;
                expandDiv.style.display = "none";
                this.drawLabelValue(expandDiv, "Description:", todo.description);
                this.drawLabelValue(expandDiv, "Due Date:", todo.dueDate);
                this.drawLabelValue(expandDiv, "Priority:", todo.priority);
                this.drawLabelValue(expandDiv, "Notes:", todo.notes);

                todoDiv.appendChild(expandDiv);
                list.appendChild(todoDiv);
            }
            const newTodoButton = document.createElement("button");
            newTodoButton.classList.add("new-button");
            newTodoButton.textContent = "Add Todo";
            newTodoButton.addEventListener("click", this.showNewTodoModal);
            list.appendChild(newTodoButton);

            listDiv.appendChild(list);
            this.contentDiv.appendChild(listDiv);
        }
    }
    drawLabelValue(target, label, value) {
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("label-value");
        const labelDiv = document.createElement("div");
        labelDiv.classList.add("label");
        labelDiv.innerHTML = label;
        containerDiv.appendChild(labelDiv);
        const valueDiv = document.createElement("div");
        valueDiv.classList.add("value");
        valueDiv.innerHTML = value;
        containerDiv.appendChild(valueDiv);
        target.appendChild(containerDiv);
    }
    drawMaterialIconButton(target, iconName, projIndex, listIndex, callback) {
        const myButton = document.createElement("button");
        myButton.classList.add("icon-button");
        myButton.classList.add("material-symbols-outlined");
        myButton.textContent = iconName;
        myButton.dataset.todoIndex = `${projIndex}${listIndex}`;
        myButton.addEventListener("click", callback);
        target.appendChild(myButton);
    }
    toggleExpandableVisibility(e) {
        const index = e.currentTarget.dataset.todoIndex;
        const target = document.querySelector(`.expandable[data-todo-index="${index}"]`);
        if(target.style.display === "flex") target.style.display = "none";
        else target.style.display = "flex";
    }
    removeTodo(e){
        const indexStr = e.currentTarget.dataset.todoIndex;
        const indexArray = indexStr.split("");
        this.projectList.removeTodoFromProject(indexArray[0], indexArray[1]);
        this.reset();
        this.draw();
    }
    editTodo(e){
        const indexStr = e.currentTarget.dataset.todoIndex;
        const indexArray = indexStr.split("");
        const title = "testTitle";
        const desc = "test description";
        const date = new Date().toLocaleDateString();
        const priority = "test priority";
        const note = "test note";
        const isDone = true;
        this.projectList.editTodoInProject(indexArray[0], indexArray[1], title, desc, date, priority, note, isDone);
        this.reset();
        this.draw();
    }
    showNewTodoModal() {
        const todoModal = document.querySelector("#newTodo");
        todoModal.showModal();
    }
    showNewProjectModal() {
        const projectModal = document.querySelector("#newProject");
        projectModal.showModal();
    }
}