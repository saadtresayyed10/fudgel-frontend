"use client";

import { SignInButton, useUser } from "@clerk/nextjs";

const HomePage = () => {
  const { user } = useUser();
  return (
    <div>
      <SignInButton />
      <h1>{user?.firstName}</h1>
    </div>
  );
};

export default HomePage;
