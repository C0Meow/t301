import { SignIn, SignInButton, SignedIn, SignedOut, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import type { RouterOutputs } from "~/trpc/shared";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";
import { Suspense } from "react";
import { LoadingSpinner } from "~/components/loading";
 
dayjs.extend(relativeTime);

type OrderWithUser = RouterOutputs["orders"]["getAll"][number];
const OrderView = (props: OrderWithUser) =>{
  const {order, author} = props; 
      return(<div key= {order.id} className="flex p-4 gap-4 border-border-slate-50">
      <Image src={author.imageurl} alt={`@${author.username} 's profile picture`} width={56} height={56}  className="h-14 w-14 rounded-full"/>
        <div className="flex flex-col font-bold text-slate-300">
          <div className="flex gap-1">
            <span>
              {`@${author.username}`}
            </span>
            <span className="font-thin">
              {` · ${dayjs(order.createdAt).fromNow()}`}
            </span>
          </div>
           <span>{order.id} {order.name } {order.content}</span>
        </div>
      </div>
    );
  };

export default async function Home() {

  const data = await api.orders.getAll.query();
  if (!data) return <div>No data </div>;

  const user = await currentUser();
  console.log(user);
    if(!user) return ( 
      <main className="flex h-screen w-full justify-center text-black">
        <div className="h-full w-full border-x-2 border-slate-50 md:max-w-2xl bg-gradient-to-b from-[#fca5a5] to-[#fef2f2] ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[3rem]">
  
            <div className="flex border-b-2 border-slate-50">
            <SignedOut>
              <SignInButton>
                <button className="flex gap-4 p-4 justify-center">Click here to sign in</button>
              </SignInButton>
            </SignedOut>
          </div>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
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
      <main className="flex h-screen w-full justify-center text-black">
      <div className="h-full w-full border-x-2 border-slate-400 md:max-w-2xl bg-gradient-to-b from-[#030712] to-[#374151] ">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-[3rem]">

          <div className="flex p-4 gap-4 border-slate-50 border-b-2 text-slate-300">
          welcome {user?.firstName} →
          <SignedIn>
            <div>
              <span className="content-right h-screen">
                  <UserButton/>
              </span>
            </div>
          </SignedIn>
        </div>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </h1>
          <div className="flex w-full p-4 gap-4 border-b-2 border-slate-50">
            <Image src={user.imageUrl} alt={`@${user.username} 's profile picture`} width={56} height={56} className="h-14 w-14 rounded-full"/ >
            <input placeholder="What's up?" className="grow bg-transparent outline-none text-slate-300"/>  
          </div>
          <Suspense fallback={<LoadingSpinner/>}>
            <div className="flex fl ex-col border-b-2 border-slate-50">
              {[...data]?.map((fullOrder) => (<OrderView {...fullOrder} key={fullOrder.order.id}/>))} 
            </div>
        </Suspense>
      </div>
    </main>)
   }

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div className="flex flex-col items-center gap-2">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
