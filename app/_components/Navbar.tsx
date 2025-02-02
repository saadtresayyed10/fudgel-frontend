import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white text-black w-full lg:px-20 px-6 py-3 lg:py-8 font-hagrid">
      <Link href="/">
        <h1 className="lg:text-6xl font-semibold">Fudgel</h1>
      </Link>

      <SignedOut>
        <SignInButton mode="modal">
          <Button className="px-6 py-3 bg-lime-400 text-black rounded-lg shadow-md border-black border-2">
            Login
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex justify-center items-center lg:gap-x-10 gap-x-6">
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Navbar;
