"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const Greet = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-center items-center flex-col gap-y-6 bg-white text-black font-hagrid w-full p-6">
      <SignedIn>
        <h1 className="text-6xl">Hi, {user?.fullName}!</h1>
      </SignedIn>
      <SignedOut>
        <h1 className="text-2xl">
          You must be logged-in in order to use this application.
        </h1>
      </SignedOut>
    </div>
  );
};

export default Greet;
