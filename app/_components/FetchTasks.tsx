"use client";

interface Task {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  userId: string;
}

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

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
    <div>
      {tasks.map((task, idx) => (
        <div key={idx}>
          <p>{task.taskTitle}</p>
          <p>{task.taskDescription}</p>
          <p>{task.taskId}</p>
          <p>{task.userId}</p>
          <div className="flex justify-center items-center gap-x-16">
            <p>Update</p>
            <p>Delete</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchTasks;
