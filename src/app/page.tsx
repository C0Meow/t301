import { SignIn, SignInButton, SignedOut, currentUser } from "@clerk/nextjs";
import { api } from "~/trpc/server";
import { sleep } from "~/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import NavigationBar from "./LoggedIn/navbar";
import Link from "next/link";

export default async function Home() {
  await sleep(1000);
  const data = await api.orders.getAll.query();
  if (!data) return <div>No data </div>;

  const user = await currentUser();
  
    if(!user) return ( 
      <main className="flex h-screen w-full justify-center text-black">
        <div className="h-full w-full border-x-2 border-slate-50 bg-gradient-to-b from-[#fca5a5] to-[#f8fafc] ">
          <h1 className="font-extrabold tracking-tight sm:text-[5rem] text-center">
          </h1>
          {/*text-2xl font-extrabold flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <SignedOut>
              <SignInButton>
                <button className="text-2xl font-extrabold flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
                <h3 className="text-2xl font-bold">Login</h3>
                <div className="text-lg">
                </div>
                </button>
              </SignInButton>
            </SignedOut>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" afterSignInUrl="/LoggedIn/"/>
          </div>
          
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
              </div>
            </Link>
          </div> */}
        </div>
      </main>
    );;
  
    return (
      redirect('LoggedIn'));
   }

