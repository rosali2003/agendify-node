"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTasks = exports.updateTaskCompleted = exports.createNewTask = exports.getAllTasks = void 0;
const helpers_1 = require("../helper/helpers");
const Task_1 = require("../models/Task");
const getAllTasks = async (request, response) => {
    console.log(request);
    return response.status(234).send("response sent");
};
exports.getAllTasks = getAllTasks;
const createNewTask = async (request, response) => {
    const data = request.body.data;
    console.log("data", data);
    try {
        if (!(0, helpers_1.allPresent)(data)) {
            console.log(!data.id || !data.message || !data.completed);
            console.log("data.id present", (0, helpers_1.present)(data.id));
            console.log("data.message present", (0, helpers_1.present)(data.message));
            console.log("data.completed", (0, helpers_1.present)(data.completed));
            return response.status(400).send({
                message: "Send all required fields: message, completed",
            });
        }
        const task = await Task_1.Task.create(data);
        console.log("task successfully created");
        return response.status(201).send(data);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};
exports.createNewTask = createNewTask;
const updateTaskCompleted = async (req, res) => {
    const data = req.body.data;
    console.log("data in patch request", data);
    console.log("data.id", data.id);
    try {
        const filter = { id: data.id };
        const updateDoc = { completed: data.completed.toString() };
        const result = await Task_1.Task.updateOne(filter, updateDoc);
        console.log("result", result);
        res.status(200).json({ message: "Task successfully updated" });
    }
    catch (err) {
        console.log(err);
        //is this the correct code
        res.status(400);
    }
};
exports.updateTaskCompleted = updateTaskCompleted;
//delete all tasks
const deleteAllTasks = async (req, res) => {
    try {
        const result = await Task_1.Task.deleteMany({});
        res.status(200);
        res.json(result);
    }
    catch (error) {
        console.log("Error deleting all tasks", error);
        //is this the correct code?
        res.status(400);
    }
};
exports.deleteAllTasks = deleteAllTasks;
//# sourceMappingURL=task_controller.js.map