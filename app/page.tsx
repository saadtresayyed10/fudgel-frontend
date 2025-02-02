"use client";

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: { emailAddress: string }[];
}

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import Greet from "./_components/Greet";
import FetchTasks from "./_components/FetchTasks";

const HomePage = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUser = async (user: User) => {
      if (!user) return;
      try {
        await axios.post(
          `https://puzzled-maddi-groven-dcf428ee.koyeb.app/api/users`,
          {
            userId: user.id,
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.emailAddresses[0]?.emailAddress ?? "",
          }
        );

        console.log("User added to DB");
      } catch (error) {
        console.error("Error saving user to DB", error);
      }
    };

    if (user) {
      saveUser(user);
    }
  });

  return (
    <div className="flex justify-center items-center flex-col lg:gap-y-10 w-full min-h-screen">
      <Greet />
      <FetchTasks />
    </div>
  );
};

export default HomePage;
