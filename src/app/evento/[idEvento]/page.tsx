import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Input, Textarea } from "@commons/components";
import { api } from "chl/trpc/server";
import { format } from "date-fns";

type Props = {
  params: {
    idEvento: string;
  };
};

const Evento = async ({ params }: Props) => {
  const event = await api.event.event({ id: Number(params.idEvento) });
  void api.event.event.prefetch({ id: Number(params.idEvento) });
  
  return (
    <Container className="relative mt-12 flex w-4/5 flex-col bg-gray-100 px-10 py-8 ring-gray-100">
      <h1 className="text-3xl font-extrabold">{event?.title}</h1>
      <div className="w-full flex flex-row mt-2 items-center">
        <div className="font-semibold text-pink-600 text-base">
          Data:
        </div>
        <div className="font-semibold text-sm text-base ml-2">
          event?.date && {format(new Date(), 'dd/MM/yyyy - HH:mm')}
        </div>
      </div>
      <div className="w-full flex flex-row mt-2 items-center">
        <div className="font-semibold text-pink-600 text-base">
          Local:
        </div>
        <div className="font-semibold text-sm text-base ml-2">
          {event?.address}
        </div>
      </div>
      <hr className="bottom-1 mb-4 mt-4 border-collapse border-solid border-pink-400" />
      <Container className="grid w-full auto-cols-auto grid-flow-row">
        <div className="w-full bg-slate-400 h-80"></div>
      </Container>
      <div className="w-full flex flex-row mt-2 items-center">
        <div className="font-semibold text-xl text-base ml-2">
          {event?.content}
        </div>
      </div>
    </Container>
  );
};

export default Evento;
