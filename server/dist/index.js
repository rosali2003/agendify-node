"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helpers_1 = require("./helper/helpers");
const Task_js_1 = require("./models/Task.js");
const app = (0, express_1.default)();
const PORT = 5000;
dotenv_1.default.config();
// Middleware for parsing request body
app.use(express_1.default.json(), (0, cors_1.default)({
    origin: [process.env.CLIENT_URL],
    credentials: true,
}));
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("response sent");
});
//create new task
app.post("/add_task", async (request, response) => {
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
        const task = await Task_js_1.Task.create(data);
        console.log("task successfully created");
        return response.status(201).send(data);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
app.patch("/tasks/edit_completed", async (req, res) => {
    const data = req.body.data;
    console.log("data in patch request", data);
    console.log('data.id', data.id);
    try {
        const filter = { id: data.id };
        const updateDoc = { completed: data.completed.toString() };
        const result = await Task_js_1.Task.updateOne(filter, updateDoc);
        console.log("result", result);
        res.status(200).json({ message: "Task successfully updated" });
    }
    catch (err) {
        console.log(err);
        //is this the correct code
        res.status(400);
    }
});
app.delete("/tasks/delete_all", async (req, res) => {
    try {
        const result = await Task_js_1.Task.deleteMany({});
        res.status(200);
        res.json(result);
    }
    catch (error) {
        console.log("Error deleting all tasks", error);
        //is this the correct code?
        res.status(400);
    }
});
mongoose_1.default
    .connect(process.env.URI)
    .then(() => {
    console.log("connected to db");
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map