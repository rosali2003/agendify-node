import React, { useState, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableBody } from "../ui/table";
import Task from "./Task";

interface Task {
  message: String;
  completed: boolean;
}

const TasksCard = () => {
  const [newTaskMessage, setNewTaskMessage] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]); // Start with an empty array

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskMessage(event.target.value);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Check if newTaskMessage is not empty before adding
    if (newTaskMessage.trim() !== "") {
      const newTask = { message: newTaskMessage, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskMessage(""); // Reset input field after adding
    }
  };

  const displayTasks = () => {
    return tasks.map((task, index) => {
      console.log("task.message", task.message);
      return (
        <Task id={index} message={task.message} completed={task.completed} />
      );
    });
  };

  return (
    <div className="bg-primary-foreground m-5 p-8 w-full max-w-md mx-auto mt-4 rounded-lg">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="New task"
          type="text"
          id="new-task"
          value={newTaskMessage}
          onChange={handleInputChange}
        />
        <Button type="submit" onClick={onClick}>
          Add
        </Button>
      </div>
      <div className="border rounded-lg w-full mt-4">
        <Table>
          <TableBody>{displayTasks()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksCard;
