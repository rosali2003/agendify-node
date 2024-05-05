import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import React, { useState } from "react";
import axios from "axios";
import TaskProps from "./types";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Task: React.FC<TaskProps> = ({ id, message, completed }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = async () => {
    let updateTask: any;
    //update React app
    setIsChecked((prevState) => {
      const newState = !prevState;
      updateTask = { id, message, completed: newState };
      return newState;
    });
    console.log('updateTask', updateTask)
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

  return (
    <div>
      <TableRow key={id}>
        <TableCell>
          <Checkbox
            id={id.toString()}
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
          />
        </TableCell>
        <TableCell className="font-medium">{message}</TableCell>
      </TableRow>
    </div>
  );
};

export default Task;
