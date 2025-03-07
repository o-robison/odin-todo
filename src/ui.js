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
            listDiv.id = `proj${projIndex}`;
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
            newTodoButton.dataset.projectIndex = `${projIndex}`;
            newTodoButton.textContent = "Add Todo";
            newTodoButton.addEventListener("click", this.showNewTodoForm.bind(this));
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
    showNewTodoForm(e){
        const indexStr = e.currentTarget.dataset.projectIndex;
        const listDiv = document.querySelector(`#proj${indexStr}`);
        const addButton = e.currentTarget;
        addButton.style.display = "none";
        this.drawTodoFormInTarget(listDiv, indexStr, this.addTodo.bind(this));
    }
    drawTodoFormInTarget(target, projIndex, callback) {
        const newForm = document.createElement("form");
        const formData = [
            {
                type: "text",
                id: "todoTitle",
                label: "* Title"
            },
            {
                type: "textarea",
                id: "todoDescription",
                label: "* Description"
            },
            {
                type: "date",
                id: "dueDate",
                label: "* Due Date"
            },
            {
                type: "select",
                id: "priority",
                label: "* Priority",
                options: ["Low", "Medium", "High", "Immediate"]
            },
            {
                type: "textarea",
                id: "notes",
                label: "Notes"
            },
        ];
        for(const element of formData) {
            const rowDiv  = document.createElement("div");
            rowDiv.classList.add("formRow");
            const label = document.createElement("label");
            label.htmlFor = element.id;
            label.textContent = element.label;
            rowDiv.appendChild(label);
            if(element.type==="textarea") {
                const textarea = document.createElement("textarea");
                textarea.name = textarea.id = element.id;
                rowDiv.appendChild(textarea);
            }
            else if(element.type==="select") {
                const select = document.createElement("select");
                select.name = select.id = element.id;
                for(const option of element.options) {
                    const newOption = document.createElement("option");
                    newOption.textContent = newOption.value = option;
                    select.appendChild(newOption);
                }
                rowDiv.appendChild(select);
            }
            else {
                const input = document.createElement("input");
                input.type = element.type;
                input.id = element.id;
                rowDiv.appendChild(input);
            }
            newForm.appendChild(rowDiv);
        }
        const submitButton = document.createElement("button");
        submitButton.id = "submitTodo";
        submitButton.textContent = "Submit To Do";
        submitButton.dataset.projectIndex = projIndex;
        submitButton.addEventListener("click", callback);
        newForm.appendChild(submitButton);
        target.appendChild(newForm);
    }
    editTodo(e){
        e.preventDefault();
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
    addTodo(e) {
        e.preventDefault();
        const indexStr = e.currentTarget.dataset.projectIndex;
        const title = document.querySelector("#todoTitle").value;
        const desc = document.querySelector("#todoDescription").value;
        const date = document.querySelector("#dueDate").value;
        const formattedDate = new Date(date).toLocaleDateString();
        const priority = document.querySelector("#priority").value;
        const note = document.querySelector("#notes").value;
        const isDone = false;
        this.projectList.addTodoToProject(indexStr, title, desc, formattedDate, priority, note, isDone);
        this.reset();
        this.draw();
    }
    showNewProjectModal() {
        const projectModal = document.querySelector("#newProject");
        projectModal.showModal();
    }
}