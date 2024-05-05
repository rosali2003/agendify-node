"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.taskRouter = express_1.default.Router();
const task_controller_1 = require("../controllers/task_controller");
console.log('enters task router');
exports.taskRouter.get("/", task_controller_1.getAllTasks);
exports.taskRouter.post("/add_task", task_controller_1.createNewTask);
exports.taskRouter.patch("/edit_completed", task_controller_1.updateTaskCompleted);
exports.taskRouter.delete("/delete_all", task_controller_1.deleteAllTasks);
//# sourceMappingURL=taskRoutes.js.map