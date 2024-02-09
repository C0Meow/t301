"use client";

import { useUser } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as React from 'react';
import Button from '@mui/material/Button';
import { StyledButton } from "../LoggedIn/loggedin.styles";


export async function ProductPage(router: AppRouterInstance) {
  router.push("Product")
}

export async function CommentPage(router: AppRouterInstance) {
  router.push("LoggedIn")
}

export default function NavigationBarForProduct(){
    const router = useRouter()
    const user = useUser();
  
    if(!user) return null;
    if(!user?.user?.imageUrl) return null;
    
    return (
      <div className="grid grid-cols-8">
        <div className="flex w-full p-4 border-slate-50 border-b-2">
          <StyledButton onClick={()=>ProductPage(router)}>
                <Button variant="contained">Product Page</Button>
          </StyledButton>
        </div>

        <div className="flex w-full p-4 border-slate-50 border-b-2">
          <StyledButton onClick={()=>CommentPage(router)}>
                <Button variant="contained">Comment Page</Button>
          </StyledButton>
        </div>
      </div>
            )}