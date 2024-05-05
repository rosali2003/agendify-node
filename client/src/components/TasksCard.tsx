import React, { useState, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableBody } from "../ui/table";
import Task from "./Task";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
console.log("serverurl", serverUrl);
interface Task {
  id: Number;
  message: String;
  completed: boolean;
}

const TasksCard = () => {
  const [newTaskMessage, setNewTaskMessage] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]); // Start with an empty array

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskMessage(event.target.value);
  };

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Check if newTaskMessage is not empty before adding
    const newTask = {
      id: tasks.length + 1,
      message: newTaskMessage,
      completed: false,
    };
    if (newTaskMessage.trim() !== "") {
      const result = await axios
        .post(`${serverUrl}/tasks/add_task`, { data: newTask })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskMessage(""); // Reset input field after adding
    }
  };

  const displayTasks = () => {
    return tasks.map((task, index) => {
      console.log("task.id", task.id);
      return (
        <Task
          id={index + 1}
          message={task.message}
          completed={task.completed}
        />
      );
    });
  };

  const onDeleteAllTasks = async () => {
    // if (tasks.length === 0) {
    //   return;
    // }

    const result = await axios
      .delete(`${serverUrl}/tasks/delete_all`)
      .then((response) => {
        console.log("Successfully deleted all tasks");
      })
      .catch((error) => {
        console.log("Error", error);
      });
    setTasks([]);
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
      <div className="flex justify-center m-2">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onDeleteAllTasks}
        >
          Delete all Tasks
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
