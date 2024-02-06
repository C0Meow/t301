import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { orderRouter } from "./routers/orders";
import { productRouter } from "./routers/proucts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  orders: orderRouter,
  products: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
