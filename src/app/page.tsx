import { SignIn, SignInButton, SignedIn, SignedOut, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { RouterOutputs } from "~/trpc/shared";

type OrderWithUser = RouterOutputs["orders"]["getAll"][number];
const OrderView = (props: OrderWithUser) =>{
  const {order, author} = props;
      return(<div key= {order.id} className="p-8 border-border-slate-50">{order.id} {order.name } {order.content}
      <img src={author.imageurl} alt="author pfp"/>
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
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl bg-gradient-to-b from-[#fca5a5] to-[#fef2f2] ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[3rem]">
  
            <div className="flex border-b-2 border-slate-50">
            <SignedOut>
              <SignInButton>
                <button className="">Sign in with Clerk</button>
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
      <div className="h-full w-full border-x-1 border-slate-400 md:max-w-2xl bg-gradient-to-b from-[#fca5a5] to-[#fef2f2] ">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-[3rem]">

          <div className="flex h-12 border-slate-50 border-b-2">
          welcome {user?.firstName} →
          <SignedIn>
          <UserButton/>
        </SignedIn>
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
          <input placeholder="Input your order" className="grow w-full h-10 rounded-3xl md:gap-3 text-center bg-white outline-none"/>

          <div className="flex flex-col border-b-2 border-slate-50">
          {[...data]?.map((fullOrder) => (<OrderView {...fullOrder} key={fullOrder.order.id}/>))}   
        </div>
        <CrudShowcase />
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
