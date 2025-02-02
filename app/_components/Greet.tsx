"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

const Greet = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-center items-center flex-col gap-y-6 bg-white text-black font-hagrid w-full p-6 mt-10 text-center">
      <SignedIn>
        <h1 className="lg:text-6xl text-3xl">Hi, {user?.fullName}!</h1>
      </SignedIn>
      <SignedOut>
        <h1 className="text-4xl">
          You must be logged-in, in order to use this application.
        </h1>
        <SignInButton mode="modal">
          <Button className="lg:px-10 px-6 lg:py-4 py-6 bg-transparent text-black hover:text-white rounded-lg border-black border-2 w-full lg:w-min mt-10">
            Login
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Greet;
