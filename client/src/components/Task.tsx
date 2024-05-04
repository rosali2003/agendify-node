import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import React, {useState} from "react";
import TaskProps from "./types";

const Task: React.FC<TaskProps> = ({ id, message, completed }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    
    setIsChecked(!isChecked);
  }
  return (
    <div>
      <TableRow key={id}>
        <TableCell>
          <Checkbox id={id.toString()} 
          checked={isChecked} onChange={handleCheckboxChange}/>
        </TableCell>
        <TableCell className="font-medium">{message}</TableCell>
      </TableRow>
    </div>
  );
};

export default Task;
