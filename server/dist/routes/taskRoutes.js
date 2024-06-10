import express from "express";
export const taskRouter = express.Router();
import { createNewTask, updateTaskCompleted, deleteAllTasks, deleteOneTask, } from "../controllers/task_controller.js";
console.log('enters task router');
taskRouter.post("/add_task", createNewTask);
taskRouter.patch("/edit_completed", updateTaskCompleted);
taskRouter.delete("/delete_all", deleteAllTasks);
taskRouter.delete("/delete_one", deleteOneTask);
// taskRouter.delete("/delete/one", deleteOneTask);
//# sourceMappingURL=taskRoutes.js.map