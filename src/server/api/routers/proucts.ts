import { User } from "@clerk/backend/dist/types/api";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Create a new ratelimiter, that allows 10 requests per 1 minute

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      take: 100,
      orderBy: { id: "asc" },
    });

    return products.map((products) => {
      return { products };
    });
  }),
});
