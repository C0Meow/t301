"use client";

import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "~/trpc/react";
import SmallLoading from "../smallloading";

export default function CreateOrderWizard(){

    const user = useUser();
    const [input, setInput] = useState("");
    const ctx = api.useUtils();
    const {mutate, isLoading: isPosting} = api.orders.create.useMutation({onSuccess: () =>{
        setInput("");
        void ctx.orders.getAll.invalidate();
        toast.success("留言成功! 請手動刷新去查看你最新的留言!");
    },
    onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage?.[0]){
          toast.error(errorMessage[0]!);
        }
        else {
          toast.error("留言失敗, 請稍候再嘗試");
        }
    }});
  
    if(!user) return null;
    if(!user?.user?.imageUrl) return null;
    
    return (
      <div className="flex w-full p-4 gap-4 border-b-2 border-slate-50">
            <Toaster/>
            <Image src={user?.user?.imageUrl} alt={`@${user?.user?.username} 's profile picture`} width={56} height={56} className="h-14 w-14 rounded-full"/>
            <input placeholder="輸入留言後請按'Post'或Enter, 然後手動刷新網站" className="grow bg-transparent outline-none text-slate-300" type="text" value={input} onChange={(e)=>setInput(e.target.value)} disabled={isPosting} onKeyDown={(e)=>{
              if (e.key=== "Enter"){
                e.preventDefault();
                if (input !== ""){
                  mutate({contentInput: input});
                }
              }
            }}/> 
            {input !== "" && !isPosting && (<button className="text-white" onClick={()=>mutate({contentInput: input})} disabled={isPosting}>Post</button>)}
            {isPosting && (<div className="flex flex-col justify-center">
              <SmallLoading/>
              </div>)}
      </div>
    )
  }