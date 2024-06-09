import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { allPresent, present } from "./helper/helpers.js";
import { Task } from "./models/Task.js";
import { taskRouter } from "./routes/taskRoutes.js";
import { oauthRouter } from "./routes/oauthRoutes.js";
import {defaultRouter} from "./routes/defaultRoutes.js";
const app = express();
dotenv.config();
// Middleware for parsing request body
app.use(
  express.json(),
  cookieParser(),
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use("/tasks", taskRouter);
app.use("/auth", oauthRouter);
app.use("/", defaultRouter);

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
