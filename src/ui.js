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
                todoDiv.dataset.todoIndex = `${projIndex}${listIndex}`;
                
                const todoTitleDiv = document.createElement("div");
                todoTitleDiv.classList.add("todo-title");
                
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.dataset.index = `${projIndex}${listIndex}`;
                checkbox.addEventListener("click", this.toggleCheckedTodo.bind(this));
                todoTitleDiv.appendChild(checkbox);

                const buttonRow = document.createElement("div");
                buttonRow.classList.add("button-row");
                this.drawMaterialIconButton(buttonRow, "edit", projIndex, listIndex, this.showEditTodoForm.bind(this));
                this.drawMaterialIconButton(buttonRow, "remove", projIndex, listIndex, this.removeTodo.bind(this));
                this.drawMaterialIconButton(buttonRow, "expand_circle_down", projIndex, listIndex, this.toggleExpandableVisibility);

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

        const addProjectButton = document.createElement("button");
        addProjectButton.textContent = "Create New Project";
        addProjectButton.classList.add("new-button");
        addProjectButton.addEventListener("click", this.showNewProjectModal.bind(this));
        this.contentDiv.appendChild(addProjectButton);

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
    drawTodoFormInTarget(target, index, callback, values=null) {
        const newForm = document.createElement("form");
        newForm.classList.add("new-todo-form");
        const formData = [
            {
                type: "text",
                id: "title",
                label: "* Title"
            },
            {
                type: "textarea",
                id: "description",
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
                if(values!=null) {
                    textarea.value = values[element.id];
                }
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
                if(values!=null){
                    const capitalizedValue = values[element.id].charAt(0).toUpperCase() + values[element.id].slice(1);
                    select.value = capitalizedValue;
                }
                rowDiv.appendChild(select);
            }
            else {
                const input = document.createElement("input");
                input.type = element.type;
                input.id = element.id;
                if(values!=null) {
                    if(element.type==="date") {
                        const newDate = new Date(values[element.id]);
                        input.value = newDate.toISOString().substring(0,10);
                    } else {
                        input.value = values[element.id];
                    }
                }
                rowDiv.appendChild(input);
            }
            newForm.appendChild(rowDiv);
        }
        const submitButton = document.createElement("button");
        submitButton.id = "submitTodo";
        submitButton.textContent = "Submit To Do";
        if(index.length===1) submitButton.dataset.projectIndex = index;
        else submitButton.dataset.todoIndex = index;
        submitButton.addEventListener("click", callback);
        newForm.appendChild(submitButton);
        target.appendChild(newForm);
    }
    showEditTodoForm(e){
        e.preventDefault();
        const indexStr = e.currentTarget.dataset.todoIndex;
        const targetDiv = document.querySelector('.todo-item[data-todo-index="'+indexStr+'"]');
        const indexArray = indexStr.split("");
        const currentValues = this.projectList.getTodoValuesFromProject(indexArray[0], indexArray[1]);
        this.drawTodoFormInTarget(targetDiv, indexStr, this.submitEditedTodo.bind(this), currentValues);
    }
    getValuesOfTodoForm() {
        let returnObj = {};
        returnObj["title"] = document.querySelector("#title").value;
        returnObj["desc"] = document.querySelector("#description").value;
        const date = document.querySelector("#dueDate").value;
        returnObj["date"] = new Date(date).toLocaleDateString();
        returnObj["priority"] = document.querySelector("#priority").value;
        returnObj["note"] = document.querySelector("#notes").value;
        return returnObj;
    }
    submitEditedTodo(e){
        e.preventDefault();
        const indexStr = e.currentTarget.dataset.todoIndex;
        const indexArray = indexStr.split("");
        const values = this.getValuesOfTodoForm();
        this.projectList.editTodoInProject(indexArray[0], indexArray[1], values["title"], values["desc"], values["date"], values["priority"], values["note"]);
        this.reset();
        this.draw();
    }
    addTodo(e) {
        e.preventDefault();
        const indexStr = e.currentTarget.dataset.projectIndex;
        const formValues = this.getValuesOfTodoForm();
        const isDone = false;
        this.projectList.addTodoToProject(indexStr, formValues.title, formValues.desc, formValues.date, formValues.priority, formValues.note, isDone);
        this.reset();
        this.draw();
    }
    showNewProjectModal() {
        const projectModal = document.querySelector("#newProject");
        projectModal.showModal();
        const submitButton = document.querySelector("#submitProject");
        submitButton.addEventListener("click", this.createNewProject.bind(this));
    }
    createNewProject(e){
        e.preventDefault();
        const projectTitle = document.querySelector("#projectTitle").value;
        this.projectList.addProject(projectTitle);
        const projectModal = document.querySelector("#newProject");
        projectModal.close();
        this.reset();
        this.draw();
    }
    toggleCheckedTodo(e) {
        const indexStr = e.currentTarget.dataset.index;
        const indexArray = indexStr.split("");
        const checkedValue = e.currentTarget.value;
        this.projectList.toggleTodoCheckedInProject(indexArray[0], indexArray[1], checkedValue);
    }
}