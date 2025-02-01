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

const HomePage = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUser = async (user: User) => {
      if (!user) return;
      try {
        await axios.post("http://localhost:5000/api/users", {
          userId: user.id,
          username: user.firstName ?? "" + user.lastName ?? "",
          email: user.emailAddresses[0]?.emailAddress ?? "",
        });
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
    </div>
  );
};

export default HomePage;
