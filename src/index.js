import "./reset.css";
import "./styles.css";
import { ProjectList } from "./todo.js";
import { ScreenController } from "./ui.js";


/////////////////////////////
const myProjectList = new ProjectList();
myProjectList.addProject("Home");
const today = new Date();
myProjectList.addTodoToProject(1, "myTName", "desc", today.toLocaleDateString(), "low", "");
myProjectList.addTodoToProject(0, "finish this project", "description", today.toLocaleDateString(), "high", "notes");
myProjectList.addTodoToProject(0, "finish this project2", "description2", today.toLocaleDateString(), "high", "notes");

const screenController = new ScreenController("#content");
screenController.draw(myProjectList);