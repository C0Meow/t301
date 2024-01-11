"use client";

import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function CreateOrderWizard(){

    const user = useUser();
    const [input, setInput] = useState("");
    const ctx = api.useUtils();
    const {mutate, isLoading: isPosting} = api.orders.create.useMutation({onSuccess: () =>{
        setInput("");
        ctx.orders.getAll.invalidate();
    }});
  
    if(!user) return null;
    if(!user?.user?.imageUrl) return null;
    
    return (
      <div className="flex w-full p-4 gap-4 border-b-2 border-slate-50">
            <Image src={user?.user?.imageUrl} alt={`@${user?.user?.username} 's profile picture`} width={56} height={56} className="h-14 w-14 rounded-full"/ >
            <input placeholder="What's up?" className="grow bg-transparent outline-none text-slate-300" type="text" value={input} onChange={(e)=>setInput(e.target.value)} disabled={isPosting}/>  
            <button className="text-white" onClick={()=>mutate({contentInput: input})}>Post</button>
      </div>
    )
  }