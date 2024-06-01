import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { allPresent, present } from "./helper/helpers";
import { Task } from "./models/Task.js";
import { taskRouter } from "./routes/taskRoutes";
const app = express();
dotenv.config();
// Middleware for parsing request body
app.use(
  express.json(),
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(`/tasks`, taskRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is listening to port: ${process.env.PORT}`);
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
