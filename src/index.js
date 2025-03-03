import "./reset.css";
import "./styles.css";
import { ProjectList } from "./todo.js";
import { ScreenController } from "./ui.js";


/////////////////////////////
const myProjectList = new ProjectList();
myProjectList.addProject("Home");
const today = new Date();
myProjectList.addTodoToProject(1, "myTName", "desc", today, "low", "");
myProjectList.addTodoToProject(0, "finish this project", "description", today, "high", "notes");

const screenController = new ScreenController("#content");
screenController.draw(myProjectList);