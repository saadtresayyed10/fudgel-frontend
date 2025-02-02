"use client";

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: { emailAddress: string }[];
}

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import AddTask from "./_components/AddTask";

const HomePage = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUser = async (user: User) => {
      if (!user) return;
      try {
        await axios.post(`${process.env.BACKEND_URL}/users`, {
          userId: user.id,
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          email: user.emailAddresses[0]?.emailAddress ?? "",
        });

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
    <div>
      <SignInButton>Login</SignInButton>
      <h1>{user?.id}</h1>
      <h1>
        {user?.firstName} {user?.lastName}
      </h1>
      <h2>{user?.emailAddresses[0].emailAddress}</h2>
      <SignOutButton>Logout</SignOutButton>
      <AddTask />
    </div>
  );
};

export default HomePage;
