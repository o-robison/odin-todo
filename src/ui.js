export class ScreenController {
    constructor(target) {
        this._contentDiv = document.querySelector(target);
    }

    reset() {
        this._contentDiv.innerHTML = "";
    }
    draw(projectList) {
        for(const project of projectList.projects) {
            const listDiv = document.createElement("div");
            listDiv.classList.add("project");
            const listTitle = document.createElement("h2");
            const list = document.createElement("div");
            list.classList.add("todo-list");
            listTitle.innerHTML = project.name;
            listDiv.appendChild(listTitle);
            
            for(const todo of project.todoList) {
                const todoDiv = document.createElement("div");
                todoDiv.classList.add("todo-item");
                
                const todoTitleDiv = document.createElement("div");
                todoTitleDiv.classList.add("todo-title");
                this.drawMaterialIconButton(todoTitleDiv, "expand_circle_down");

                const buttonRow = document.createElement("div");
                buttonRow.classList.add("button-row");
                this.drawMaterialIconButton(buttonRow, "edit");
                this.drawMaterialIconButton(buttonRow, "remove");

                const todoTitle = document.createElement("h3");
                todoTitle.innerHTML = todo.title;
                todoTitleDiv.appendChild(todoTitle);
                todoTitleDiv.appendChild(buttonRow);
                todoDiv.appendChild(todoTitleDiv);

                const expandDiv = document.createElement("div");
                expandDiv.classList.add("expandable");
                
                this.drawLabelValue(expandDiv, "Description:", todo.description);
                this.drawLabelValue(expandDiv, "Due Date:", todo.dueDate);
                this.drawLabelValue(expandDiv, "Priority:", todo.priority);
                this.drawLabelValue(expandDiv, "Notes:", todo.notes);

                todoDiv.appendChild(expandDiv);
                listDiv.appendChild(todoDiv);
            }
            listDiv.appendChild(list);
            this._contentDiv.appendChild(listDiv);
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
    drawMaterialIconButton(target, iconName) {
        const myButton = document.createElement("button");
        myButton.classList.add("icon-button");
        myButton.classList.add("material-symbols-outlined");
        myButton.textContent = iconName;
        target.appendChild(myButton);
    }
}