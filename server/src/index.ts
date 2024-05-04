import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {allPresent, present} from './helper/helpers';
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
  console.log('data',data)
  try {
    if (!allPresent(data)) {
      console.log((!data.id || !data.message || !data.completed));
      console.log('data.id present', present(data.id))
      console.log('data.message present',present(data.message))
      console.log('data.completed', present(data.completed))
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

//update task completed
// app.patch('/edit_completed', async (request, response) => {
//   const data = request.body.data;
//   console.log(data);
//   try {
//     if 
//   }
// })

app.patch('/edit')
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });


