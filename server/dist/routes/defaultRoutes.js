import express from "express";
export const defaultRouter = express.Router();
import { getAllTasks } from "../controllers/default_controller.js";
console.log('enters default router');
defaultRouter.get('/', getAllTasks);
//# sourceMappingURL=defaultRoutes.js.map