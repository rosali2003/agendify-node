import express from "express";
export const taskRouter = express.Router();

import {
  getAllTasks,
  createNewTask,
  updateTaskCompleted,
  deleteAllTasks,
} from "../controllers/task_controller.js";

console.log('enters task router');
taskRouter.get("/", getAllTasks);
taskRouter.post("/add_task", createNewTask);
taskRouter.patch("/edit_completed", updateTaskCompleted);
taskRouter.delete("/delete_all", deleteAllTasks);
// taskRouter.delete("/delete/one", deleteOneTask);
