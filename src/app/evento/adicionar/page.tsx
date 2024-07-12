"use client";

import React from "react";
import { Container, Input, Textarea } from "@commons/components";
import { api } from "chl/trpc/react";
import { useRouter } from "next/navigation";
import { type RegistrationFormSchema, registrationSFormchema } from "@helpers";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { STATUS_PUBLICATIONS } from "@prisma/client";

const Adicionar = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationSFormchema),
  });

  const utils = api.useUtils();
  const routes = useRouter();

  const createEvent = api.event.create.useMutation({
    onSuccess: async () => {
      await utils.event.invalidate();
    },
  });

  const onSubmit = (e: RegistrationFormSchema) => {
    console.log(`e -> `, e);
    
    createEvent.mutate({
      title: e.title,
      date: e.date,
      content: e.content,
      address: e.address,
      status: e.status
    });
    routes.push("/");
  };
  return (
    <Container className="relative mt-12 flex w-4/5 flex-col bg-gray-100 px-10 py-8 ring-gray-100">
      <h1 className="text-3xl font-extrabold">Criar um evento</h1>
      <small>É hora de criar um evento</small>
      <hr className="bottom-1 mb-4 mt-4 border-collapse border-solid border-pink-400" />
      <Container className="grid w-full auto-cols-auto grid-flow-row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Nome do evento
            </div>
            <div className="mt-3 w-full">
              <Input
                type="text"
                id="title"
                placeholder="Nome do evento"
                className="w-full px-3 py-3 text-sm font-extralight"
                {...register('title')}
                error={errors.title?.message}
              />
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Data do evento
            </div>
            <div className="mt-3 w-full">
              <Input
                type="datetime-local"
                id="date"
                placeholder="Data do evento"
                className="w-full px-3 py-3 text-sm font-extralight"
                error={errors.date?.message}
                {...register('date')}
              />
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Endereço
            </div>
            <div className="mt-3 w-full">
              <Input
                type="text"
                {...register('address')}
                id="address"
                placeholder="Onde será realizado o evento?"
                className="w-full px-3 py-3 text-sm font-extralight"
                error={errors.address?.message}
              />
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Descrição
            </div>
            <div className="mt-3 w-full">
              <Textarea
                {...register('content')}
                id="content"
                placeholder="Descreva o evento com a maior quantidade de detalhes poss[ivel"
                className="w-full px-3 py-3 text-sm font-extralight"
                error={errors.content?.message}
              />
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Deseja publicar o evento?
            </div>
            <div className="mt-3 flex w-3 flex-col">
              <div className="flex flex-row content-between">
                <Input
                  type="radio"
                  {...register('status')}
                  id="status"
                  placeholder="Descreva o evento com a maior quantidade de detalhes poss[ivel"
                  className="text-sm font-extralight"
                  value={STATUS_PUBLICATIONS.PUBLIC}
                  defaultChecked
                />{" "}
                <div className="ml-1">Sim</div>
              </div>
              <div className="flex flex-row">
                <Input
                  type="radio"
                  {...register('status')}
                  id="status"
                  placeholder="Descreva o evento com a maior quantidade de detalhes poss[ivel"
                  className="text-sm font-extralight"
                  value={STATUS_PUBLICATIONS.DRAFT}
                />{" "}
                <div className="ml-1">Não</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row content-center justify-center">
            <div className="w-6/12">
              <button type="submit" className="w-full rounded-lg bg-rose-500 px-5 py-5 text-white">
                Criar evento
              </button>
            </div>
          </div>
        </form>
      </Container>
    </Container>
  );
};

export default Adicionar;
