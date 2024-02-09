"use client";

import { useUser } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'
import { StyledButton } from "./loggedin.styles";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as React from 'react';
import Button from '@mui/material/Button';


export async function ProductPage(router: AppRouterInstance) {
  router.push("Product")
}

export async function CommentPage(router: AppRouterInstance) {
  router.push("LoggedIn")
}

export default function NavigationBar(){
    const router = useRouter()
    const user = useUser();
  
    if(!user) return null;
    if(!user?.user?.imageUrl) return null;
    
    return (
      <p className="flex w-full p-4 gap-4 border-slate-50 border-b-2 ">
        <StyledButton onClick={()=>ProductPage(router)}>
              <Button variant="contained">Product Page</Button>
        </StyledButton>
        <div>
        <StyledButton onClick={()=>CommentPage(router)}>
              <Button variant="contained">Comment Page</Button>
        </StyledButton>
        </div>
        </p>
            )}