import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { auctionsSmartContracts } from '@/server/db/schema';

export const postTableRouter = createTRPCRouter({
  postSmartContract: publicProcedure.input(z.object({ smartContract: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(auctionsSmartContracts).values({ smartContract: input.smartContract });
  }),
});
