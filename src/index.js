import "./reset.css";
import "./styles.css";

import { Project } from "./todo.js";


///////////////////////////////////////////////////////////////////////////////////
const myProject = new Project("test");
const today = new Date();
myProject.addTodo("test one", "this is a test", today, "low");
console.log(myProject);