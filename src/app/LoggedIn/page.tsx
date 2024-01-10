import { SignIn, SignInButton, SignedIn, SignedOut, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import type { RouterOutputs } from "~/trpc/shared";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";
import { sleep } from "~/utils";
import { api } from "~/trpc/server";
import { string } from "zod";
import CreateOrderWizard from "./typesmth";

dayjs.extend(relativeTime);

type OrderWithUser = RouterOutputs["orders"]["getAll"][number];
const OrderView = (props: OrderWithUser) =>{
  const {order, author} = props; 
      return(<div key= {order.id} className="flex p-4 gap-4 border-border-slate-50 border-b-2">
      <Image src={author.imageurl} alt={`@${author.username} 's profile picture`} width={56} height={56}  className="h-14 w-14 rounded-full"/>
        <div className="flex flex-col text-slate-300">
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


export default async function LoggedIn() {
    await sleep(1000);
    const data = await api.orders.getAll.query();
    if (!data) return <div>No data </div>;
  
    const user = await currentUser();
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
          <CreateOrderWizard/>
            <div className="flex flex-col border-b-2 border-slate-50">
              {[...data]?.map((fullOrder) => (<OrderView {...fullOrder} key={fullOrder.order.id}/>))} 
            </div>
            <div>
            </div>
      </div>
      </main>
    )
  }

