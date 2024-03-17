import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import React from "react";
import TaskProps from "./types";

const Task: React.FC<TaskProps> = ({ id, message, completed }) => {
  return (
    <div>
      <TableRow key={id}>
        <TableCell>
          <Checkbox id={id.toString()} />
        </TableCell>
        <TableCell className="font-medium">{message}</TableCell>
      </TableRow>
    </div>
  );
};

export default Task;
