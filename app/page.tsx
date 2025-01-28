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

const HomePage = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUser = async (user: User) => {
      if (!user) return;
      try {
        await axios.post("http://localhost:8080/api/user", {
          userid: user.id,
          firstname: user.firstName ?? "",
          lastname: user.lastName ?? "",
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

  return <div></div>;
};

export default HomePage;
