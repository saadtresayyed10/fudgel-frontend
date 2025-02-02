"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";

const AddTask = () => {
  const { user } = useUser();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      await axios.post(
        `https://puzzled-maddi-groven-dcf428ee.koyeb.app/api/tasks`,
        {
          taskTitle: taskTitle,
          taskDescription: taskDescription,
          userId: user.id,
        }
      );

      console.log(`Task added to user: ${user.fullName}`);
      setTaskTitle("");
      setTaskDescription("");
    } catch (error) {
      console.log("Error adding task: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-y-6"
      >
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Title:"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Description:"
        />
        <button
          disabled={loading}
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md"
        >
          {loading ? <p className="animate-pulse">...</p> : <p>Add Task</p>}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
