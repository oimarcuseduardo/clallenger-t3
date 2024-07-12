import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "chl/server/api/trpc";
import { STATUS_PUBLICATIONS } from "@prisma/client";
import { registrationSFormchema } from "@helpers";

export const eventRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      registrationSFormchema
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.event.create({
        data: {
          title: input.title,
          date: new Date(input.date).toISOString(),
          content: input.content,
          address: input.address,
        },
      });
    }),
    update: publicProcedure
    .input(
      registrationSFormchema
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.event.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          date: input.date,
          content: input.content,
          address: input.address,
        }
      });
    }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      where: {
        status: STATUS_PUBLICATIONS?.PUBLIC,
      },
    });
  }),
  event: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      console.log(`id -> `, input.id);

      return ctx.db.event.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
    deleteEvent: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.event.delete({
        where: {
          id: input,
        }
      });
    })
});
