import { SignIn, SignedIn, UserButton, currentUser } from "@clerk/nextjs";
import type { RouterOutputs } from "~/trpc/shared";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";
import { sleep } from "~/utils";
import { api } from "~/trpc/server";
import CreateOrderWizard from "./typesmth";
import { PageLayout } from "../_components/thelayout";
import './loggedin.css';

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
           <span>{order.id} {order.content}</span>
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
        <PageLayout>
          <div className="flex p-4 gap-4 border-slate-50 border-b-2 text-slate-300">
           {user?.firstName}, 歡迎來到草仔留言信箱!
          <SignedIn>
            <div>
              <span className="content-right h-screen">
                  <UserButton/>
              </span>
            </div>
          </SignedIn>
        </div>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          <CreateOrderWizard/>
            <div className="flex flex-col border-b-2 border-slate-50">
              {[...data]?.map((fullOrder) => (<OrderView {...fullOrder} key={fullOrder.order.id}/>))} 
            </div>
            <div>
            </div>
        </PageLayout>
    )
  }

