import { Button } from "../ui/button";
import React, { useState, useContext } from "react";
import { context } from "./context";
import { Input } from "../ui/input";
import axios from "axios";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ToastAction } from "../ui/toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { toast } from "../ui/use-toast";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import { TaskProps } from "./types";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Task: React.FC<TaskProps> = ({ id, message, completed }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [addDate, setAddDate] = useState<boolean>(false);
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");

  //change checkbox value
  const handleCheckboxChange = async () => {
    let updateTask: any;
    //update React app
    setIsChecked((prevState) => {
      const newState = !prevState;
      updateTask = { id, message, completed: newState };
      return newState;
    });
    console.log("updateTask", updateTask);
    const result = await axios
      .patch(`${serverUrl}/tasks/edit_completed`, { data: updateTask })
      .then((response) => {
        console.log("response status: ", response.status);
        console.log("response data: ", response.data);
      })
      .catch((error) => {
        console.log("Error sending patch request:", error);
      });
  };

  const handleUpdateTask = () => {};

  const handleAddDate = () => {
    setAddDate(true);
  };

  const handleAddToCalendar = async () => {
    setAddDate(false);
    const result = await axios
      .get(`${serverUrl}/auth/schedule_event`)
      .then((response) => {
        console.log("response status: ", response.status);
        console.log("response data: ", response.data);
      })
      .catch((error) => {
        console.log("Error sending get request:", error);
      });
    toast({
      title: "Scheduled: Catch up ",
      description: "dnskngs",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  };

  const handleSetEndDateTime = (event: any) => {
    const endDate = event.target.value;
    console.log("endDate", endDate);
    if (endDate > startDateTime) {
      setEndDateTime(endDate);
    } else {
      throw console.error("end date must be after start date");
    }
  };

  const {tasks, setTasks} = useContext(context);
  const handleDeleteOneTask = async () => {
    const result = await axios
      .delete(`${serverUrl}/task/delete_one`, { data: id })
      .then((response) => {
        console.log(`${response.data}`);
        console.log(`${response.status}`);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    const newTasks = tasks.filter((task: any) => (Number(task.id) !== id));
    console.log("typeof id in newTasks", typeof newTasks[0].id)
    console.log("typeof id", typeof id)
    console.log('newTasks', newTasks);
    setTasks(newTasks);
  };

  return (
    <div>
      <TableRow className="flex justify-between" key={id}>
        <TableRow>
          <TableCell>
            <Checkbox
              id={id.toString()}
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
            />
          </TableCell>
          <TableCell>{message}</TableCell>
        </TableRow>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDeleteOneTask}>
              Delete Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddDate}>
              Add to Calendar
            </DropdownMenuItem>
            <DropdownMenuItem>Update task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <TableCell>
          <Button size="sm" onClick={handleAddDate}>
            add Date
          </Button>
        </TableCell> */}
      </TableRow>
      {addDate && (
        <div>
          <div>
            <label htmlFor="task-time-start">Start time:</label>

            <input
              type="datetime-local"
              id="task-time-start"
              name="meeting-time"
              value={startDateTime}
              onChange={(event) => {
                setStartDateTime(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="task-time-end">End time:</label>

            <input
              type="datetime-local"
              id="task-time-end"
              name="meeting-time"
              value={endDateTime}
              onChange={handleSetEndDateTime}
            />
          </div>
          <Button size="sm" onClick={handleAddToCalendar}>
            Add To Calendar
          </Button>
        </div>
      )}
    </div>
  );
};

export default Task;
