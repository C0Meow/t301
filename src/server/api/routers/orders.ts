import { User } from "@clerk/backend/dist/types/api";
import { clerkClient, useUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { RouterOutputs } from "~/trpc/shared";

const filterUserForClient = (user: User) => {
  return { id: user.id, username: user.username, imageurl: user.imageUrl };
};

export const orderRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        userId: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.order.create({
        data: {
          userId: input.userId,
          name: input.name,
          content: input.content,  
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.order.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const order = await ctx.db.order.findMany({
      take: 100,
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
      if (!author || !author.username) {
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
});
