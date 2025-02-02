"use client";

interface Task {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  userId: string;
}

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteTask from "./DeleteTask";

const FetchTasks = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasksForAUser = async () => {
      if (!user) return;
      try {
        const response = await axios.get(
          `https://puzzled-maddi-groven-dcf428ee.koyeb.app/api/tasks/${user?.id}`
        );

        setTasks(response.data.data);
      } catch (error) {
        console.log("Error fetching task: ", error);
      }
    };

    getTasksForAUser();
  }, [user]);
  return (
    <div className="flex justify-center items-center flex-col lg:gap-y-6 bg-white text-black font-hagrid mb-10">
      <div className="flex justify-between items-center w-full">
        {tasks.length === 0 ? (
          <h2 className="text-3xl capitalize font-semibold">
            Add your first task
          </h2>
        ) : (
          <h2 className="text-3xl capitalize font-semibold">List of Tasks</h2>
        )}
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-20">
        {tasks.map((task, idx) => (
          <div
            className="flex justify-start items-start flex-col bg-neutral-900 text-white lg:p-10 shadow-md rounded-lg border-2 border-black lg:gap-y-2"
            key={idx}
          >
            <h4 className="lg:text-2xl font-semibold capitalize">
              Title: {task.taskTitle}
            </h4>
            <p className="lg:text-sm capitalize">{task.taskDescription}.</p>
            <div className="flex justify-between items-center w-full lg:mt-6">
              <button>
                <Pen className="w-4 h-4" />
              </button>
              <DeleteTask taskId={task.taskId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchTasks;
