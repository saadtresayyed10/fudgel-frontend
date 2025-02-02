"use client";

import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

interface Task {
  taskId: string;
}

const DeleteTask = ({ taskId }: Task) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `https://puzzled-maddi-groven-dcf428ee.koyeb.app/api/tasks/${taskId}`
      );

      console.log("Task deleted...");
      location.reload();
    } catch (error) {
      console.log("Task cant be deleted", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button disabled={loading} onClick={handleClick}>
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash className="w-4 h-4" />
      )}
    </button>
  );
};

export default DeleteTask;
