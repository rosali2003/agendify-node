import { Task } from "../models/Task.js";


export const getAllTasks = async (request, response) => {
  try {
    const tasks = await Task.find();
    return response.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
