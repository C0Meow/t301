import { SignIn, SignInButton, SignedIn, SignedOut, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import type { RouterOutputs } from "~/trpc/shared";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";
import { sleep } from "~/utils";
import LoggedIn from "./LoggedIn/page";

export default async function Home() {
  await sleep(1000);
  const data = await api.orders.getAll.query();
  if (!data) return <div>No data </div>;

  const user = await currentUser();
  
  console.log(user);
    if(!user) return ( 
      <main className="flex h-screen w-full justify-center text-black">
        <span>
          loading.tsx
        </span>
        <div className="h-full w-full border-x-2 border-slate-50 md:max-w-2xl bg-gradient-to-b from-[#fca5a5] to-[#fef2f2] ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[3rem]">
  
            <div className="flex border-b-2 border-slate-50">
            <SignedOut>
              <SignInButton>
                <button className="flex gap-4 p-4 justify-center">Click here to sign in</button>
              </SignInButton>
            </SignedOut>
          </div>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" afterSignInUrl="/LoggedIn/page.tsx"/>
          </h1>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
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
          </div>
        </div>
      </main>
    );;
  
    return (
      <LoggedIn/>)
   }

