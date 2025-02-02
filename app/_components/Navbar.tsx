import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white text-black w-full lg:px-20 px-8 py-6 lg:py-8 font-hagrid border-b-2 border-black">
      <Link href="/">
        <h1 className="lg:text-6xl text-4xl font-semibold">Fudgel</h1>
      </Link>

      <SignedOut>
        <SignInButton mode="modal">
          <Button className="px-4 py-2 bg-transparent text-black hover:text-white rounded-lg border-black border-2">
            <User2 className="w-6 h-6" />
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
