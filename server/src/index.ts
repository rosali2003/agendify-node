import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { allPresent, present } from "./helper/helpers";
import { Task } from "./models/Task.js";
const app = express();
const PORT = 5000;
dotenv.config();

// Middleware for parsing request body
app.use(
  express.json(),
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

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
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.patch("/tasks/edit_completed", async (req, res) => {
  const data = req.body.data;
  console.log("data in patch request", data);
  console.log('data.id', data.id)
  try {
    const filter = { id: data.id };
    const updateDoc = { completed: data.completed.toString()};

    const result = await Task.updateOne(filter, updateDoc);
    console.log("result", result);
    res.status(200).json({ message: "Task successfully updated" });
  } catch (err) {
    console.log(err);
    //is this the correct code
    res.status(400);
  }
});

app.delete("/tasks/delete_all", async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    res.status(200);
    res.json(result);
  } catch (error) {
    console.log("Error deleting all tasks", error);
    //is this the correct code?
    res.status(400);
  }
});
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });


//move routes from this file to task_controller. if request matches /tasks/ forward to tasks_controller
//or look up how to create controller in nodejs