import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren)=>{
    return (
        <main className="flex h-screen w-full justify-center text-black">
            <div className="h-full w-full border-x-2 border-slate-400 md:max-w-2xl bg-gradient-to-b from-[#030712] to-[#374151] overflow-y-scroll">
                    {props.children}
            </div>
        </main>
    )
}