import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white text-black w-full lg:px-10 px-6 py-3 lg:py-4">
      <Link href="/">
        <h1 className="text-4xl font-semibold">Fudgel</h1>
      </Link>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-6 py-2 bg-black text-white rounded-full shadow-md">
            Login
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex justify-center items-center lg:gap-x-10 gap-x-6">
          <Link href="/addTask">
            <h4 className="hover:underline underline-offset-2">Add Task</h4>
          </Link>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Navbar;
