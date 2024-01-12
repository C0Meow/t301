import { User } from "@clerk/backend/dist/types/api";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return { id: user.id, username: user.username, imageurl: user.imageUrl };
};

// Create a new ratelimiter, that allows 10 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const orderRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.order.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const order = await ctx.db.order.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: order.map((order) => order.userId),
        limit: 100,
      })
    ).map(filterUserForClient);

    console.log(users);

    return order.map((order) => {
      const author = users.find((user) => user.id === order.userId);
      if (!author?.id) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "AUTHOR NOT FOUND",
        });
      }
      return {
        order,
        author: {
          ...author,
          username: author.username,
        },
      };
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        contentInput: z.string().min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      const { success } = await ratelimit.limit(ctx.userId);

      if (!success) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      }

      const order = await ctx.db.order.create({
        data: {
          userId: ctx.userId,
          name: ctx.userId,
          content: input.contentInput,
        },
      });
      return order;
    }),
});
