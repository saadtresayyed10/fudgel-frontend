"use client";

interface Task {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  userId: string;
}

import { SignedIn, useUser } from "@clerk/nextjs";
import axios from "axios";
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
    <div className="flex justify-center items-center flex-col gap-y-6 bg-white text-black font-hagrid mb-10 mt-6 lg:mt-0">
      <SignedIn>
        <div className="flex justify-between items-center w-full">
          <h2 className="lg:text-3xl text-2xl capitalize font-semibold">
            List of Tasks
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 lg:gap-20">
          {tasks.map((task, idx) => (
            <div
              className="flex justify-start items-start flex-col bg-neutral-900 text-white lg:p-10 p-8 rounded-lg border-2 border-black gap-y-2"
              key={idx}
            >
              <h4 className="lg:text-2xl text-xl font-semibold capitalize">
                Title: {task.taskTitle}
              </h4>
              <p className="lg:text-sm text-sm capitalize">
                {task.taskDescription}.
              </p>
              <div className="flex justify-between items-center w-full mt-6">
                <button></button>
                <DeleteTask taskId={task.taskId} />
              </div>
            </div>
          ))}
        </div>
      </SignedIn>
    </div>
  );
};

export default FetchTasks;
