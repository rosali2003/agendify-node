import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { taskRouter } from "./routes/taskRoutes.js";
import { oauthRouter } from "./routes/oauthRoutes.js";
import { defaultRouter } from "./routes/defaultRoutes.js";
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
// Middleware for parsing request body
app.use(express.json(), cookieParser(), cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
}));
app.use("/tasks", taskRouter);
app.use("/auth", oauthRouter);
app.use("/", defaultRouter);
app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});
mongoose
    .connect(process.env.URI)
    .then(() => {
    console.log("connected to db");
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map