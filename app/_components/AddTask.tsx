"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader2 } from "lucide-react";
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
      location.reload();
    }
  };

  return (
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-6 font-hagrid bg-white text-black">
      <h2 className="text-3xl capitalize font-semibold">Type to add task</h2>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-y-6"
      >
        <Input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Title:"
        />
        <Input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Description:"
        />
        <Button
          disabled={loading}
          type="submit"
          className="px-6 py-2 bg-transparent text-black hover:text-white rounded-lg border-2 border-black"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <p>Add Task</p>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddTask;
