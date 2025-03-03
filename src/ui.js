import { ProjectList } from "./todo.js";

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
            const listTitle = document.createElement("h2");
            const list = document.createElement("div");
            list.classList.add("todo-list");
            listTitle.innerHTML = project.name;
            listDiv.appendChild(listTitle);
            
            for(const todo of project.todoList) {
                const listItem = document.createElement("div");
                listItem.classList.add("todo-item");
                listItem.innerHTML = todo.title;
                listDiv.appendChild(listItem);
            }
            listDiv.appendChild(list);
            this._contentDiv.appendChild(listDiv);
        }
    }
}