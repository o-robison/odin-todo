import "./reset.css";
import "./styles.css";
import { ProjectList } from "./todo.js";
import { ScreenController } from "./ui.js";


/////////////////////////////
const myProjectList = new ProjectList();
myProjectList.addProject("Home");
const today = new Date();
myProjectList.addTodoToProject(1, "title", "desc", today, "low", "");

const screenController = new ScreenController("#content");
screenController.draw(myProjectList);