"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Task_js_1 = require("./models/Task.js");
const app = (0, express_1.default)();
const PORT = 5000;
dotenv_1.default.config();
// Middleware for parsing request body
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("response sent");
});
const newTask = {
    id: 1,
    message: 'clean room',
    completed: false,
};
app.post("/tasks", async (request, response) => {
    try {
        if (!request.body.id || !request.body.message || !request.body.completed) {
            return response.status(400).send({
                message: "Send all required fields: message, completed",
            });
        }
        const task = await Task_js_1.Task.create(newTask);
        console.log("task successfully created");
        return response.status(201).send(newTask);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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