"use client";

import axios from "axios";
import { Trash } from "lucide-react";

interface Task {
  taskId: string;
}

const DeleteTask = ({ taskId }: Task) => {
  const handleClick = async () => {
    try {
      await axios.delete(
        `https://puzzled-maddi-groven-dcf428ee.koyeb.app/api/tasks/${taskId}`
      );

      console.log("Task deleted...");
      location.reload();
    } catch (error) {
      console.log("Task cant be deleted", error);
    }
  };
  return (
    <button onClick={handleClick}>
      <Trash className="w-4 h-4" />
    </button>
  );
};

export default DeleteTask;
