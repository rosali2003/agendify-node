import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import {Task} from './models/Task.js';
const app = express();
const PORT = 5555;
dotenv.config();

// Middleware for parsing request body
app.use(express.json());

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
}


app.post("/tasks", async (request, response) => {
  try {
    if (!request.body.id || !request.body.message || !request.body.completed) {
      return response.status(400).send({
        message: "Send all required fields: message, completed",
      });
    }
    const task = await Task.create(newTask);
    console.log("task successfully created");
    return response.status(201).send(newTask);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
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
