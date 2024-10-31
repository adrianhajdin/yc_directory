import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-6 py-4 bg-gradient-to-r from-purple-800 via-purple-600 to-pink-600 shadow-lg shadow-pink-500/20 border-b border-purple-500 font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} className="hover:scale-105 transition-transform duration-300 drop-shadow-md"/>
        </Link>

        <div className="flex items-center gap-8 text-white text-lg">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400 transition-all duration-300">Create</span>
                <BadgePlus className="sm:hidden text-pink-500 hover:text-yellow-500 size-6" />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="relative flex items-center justify-center px-5 py-2 font-semibold text-sm bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 rounded-lg shadow-lg shadow-pink-500/20 text-white transition-all duration-300 transform hover:scale-105 focus:ring focus:ring-pink-400">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="sm:hidden text-white size-6" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-12 ring-2 ring-purple-400 ring-offset-2 hover:scale-105 transition-transform duration-300">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback className="bg-gray-300 text-gray-700">AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit" className="px-6 py-3 font-semibold text-lg text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full shadow-lg shadow-purple-600/40 hover:shadow-pink-500/60 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
