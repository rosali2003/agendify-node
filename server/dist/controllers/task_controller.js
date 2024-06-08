import { allPresent, present } from "../helper/helpers.js";
import { Task } from "../models/Task.js";
export const getAllTasks = async (request, response) => {
    console.log("entering getAllTasks", request);
    try {
        const tasks = await Task.find();
        return response.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
};
export const createNewTask = async (request, response) => {
    const data = request.body.data;
    console.log("data", data);
    try {
        if (!allPresent(data)) {
            console.log(!data.id || !data.message || !data.completed);
            console.log("data.id present", present(data.id));
            console.log("data.message present", present(data.message));
            console.log("data.completed", present(data.completed));
            return response.status(400).send({
                message: "Send all required fields: message, completed",
            });
        }
        const task = await Task.create(data);
        console.log("task successfully created");
        return response.status(201).send(data);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};
export const updateTaskCompleted = async (req, res) => {
    const data = req.body.data;
    console.log("data in patch request", data);
    console.log("data.id", data.id);
    try {
        const filter = { id: data.id };
        const updateDoc = { completed: data.completed.toString() };
        const result = await Task.updateOne(filter, updateDoc);
        console.log("result", result);
        res.status(200).json({ message: "Task successfully updated" });
    }
    catch (err) {
        console.log(err);
        //is this the correct code
        res.status(400);
    }
};
//delete all tasks
export const deleteAllTasks = async (req, res) => {
    try {
        const result = await Task.deleteMany({});
        res.status(200);
        res.json(result);
    }
    catch (error) {
        console.log("Error deleting all tasks", error);
        //is this the correct code?
        res.status(400);
    }
};
// export const deleteOneTask = async (req, res) => {
//   try {
//     const result = await Task.findOneAndDelete({})
//   } catch (error) {
//   }
// }
//# sourceMappingURL=task_controller.js.map