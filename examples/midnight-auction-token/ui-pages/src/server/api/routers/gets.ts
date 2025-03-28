
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { auctions, auctionsSmartContracts } from '@/server/db/schema';

export const getTableRouter = createTRPCRouter({
  getMany: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.select().from(auctions);
    return data;
  }),
  getSmartContracts: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.select().from(auctionsSmartContracts);
    return data;
  }),
});
